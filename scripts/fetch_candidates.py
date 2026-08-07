"""
Descubrimiento de herramientas: busca candidatos en múltiples fuentes
y acumula contadores de menciones en data/candidates.json.
"""

import json
import os
import sys
import time
import hashlib
from datetime import date
from urllib.parse import urljoin, urlparse
from typing import Optional

import httpx
import yaml
from bs4 import BeautifulSoup
from slugify import slugify

from models import Candidate
from yaml_io import slugify_name

DATA_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "data"
)
CANDIDATES_FILE = os.path.join(DATA_DIR, "candidates.json")
CACHE_DIR = os.path.join(DATA_DIR, "cache", "sites")
CONFIG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.yaml")


def load_config() -> dict:
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_candidates_store() -> dict:
    """Carga el almacén persistente de candidatos."""
    if os.path.exists(CANDIDATES_FILE):
        with open(CANDIDATES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"candidates": {}, "mention_counts": {}}


def save_candidates_store(store: dict) -> None:
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(CANDIDATES_FILE, "w", encoding="utf-8") as f:
        json.dump(store, f, indent=2, ensure_ascii=False, default=str)


def get_cache_path(url: str) -> str:
    """Genera ruta de caché basada en hash de URL."""
    url_hash = hashlib.md5(url.encode()).hexdigest()[:12]
    return os.path.join(CACHE_DIR, f"{url_hash}.html")


def fetch_url(url: str, config: dict) -> Optional[str]:
    """Descarga una URL con caché y rate-limiting."""
    cache_path = get_cache_path(url)
    if os.path.exists(cache_path):
        with open(cache_path, "r", encoding="utf-8") as f:
            return f.read()

    time.sleep(config.get("search", {}).get("rate_limit_seconds", 1.5))

    try:
        with httpx.Client(
            timeout=config.get("search", {}).get("timeout_seconds", 15),
            headers={"User-Agent": config.get("search", {}).get("user_agent", "BBDD-IT-Tools/1.0")},
            follow_redirects=True,
        ) as client:
            resp = client.get(url)
            resp.raise_for_status()

            os.makedirs(CACHE_DIR, exist_ok=True)
            html = resp.text
            with open(cache_path, "w", encoding="utf-8") as f:
                f.write(html)
            return html
    except Exception as e:
        print(f"  ⚠ Error fetching {url}: {e}", file=sys.stderr)
        return None


def search_duckduckgo(query: str, config: dict) -> list[dict]:
    """
    Búsqueda con DuckDuckGo HTML (sin API key).
    Retorna lista de {title, url, snippet}.
    """
    url = f"https://html.duckduckgo.com/html/?q={query}"
    html = fetch_url(url, config)
    if not html:
        return []

    soup = BeautifulSoup(html, "html.parser")
    results = []
    for result in soup.select(".result"):
        title_el = result.select_one(".result__title a")
        snippet_el = result.select_one(".result__snippet")
        if title_el:
            results.append({
                "title": title_el.get_text(strip=True),
                "url": title_el.get("href", ""),
                "snippet": snippet_el.get_text(strip=True) if snippet_el else "",
            })

    return results[: config.get("search", {}).get("max_results_per_query", 10)]


def extract_candidates_from_results(
    results: list[dict],
    category: str,
    source_type: str,
) -> list[Candidate]:
    """Extrae nombres de herramientas de resultados de búsqueda."""
    candidates = []

    for r in results:
        title = r.get("title", "")
        snippet = r.get("snippet", "")

        # Heurística simple: el título suele contener el nombre de la herramienta
        # Intentamos extraer nombres que parezcan herramientas
        # (esto se refina en enrich_tools.py)
        name = title.split(" - ")[0].split(" | ")[0].split(" – ")[0].strip()
        if len(name) < 3 or len(name) > 80:
            continue
        if any(
            word in name.lower()
            for word in ["best", "top", "mejores", "guide", "list", "review",
                         "comparison", "magic quadrant", "gartner", "2026",
                         "software", "solutions", "tools", "platform"]
        ):
            continue

        candidates.append(Candidate(
            name=name,
            category=category,
            source_type=source_type,
            source_url=r.get("url"),
            mention_context=snippet[:200] if snippet else None,
        ))

    return candidates


def scrape_itsm_tools(config: dict) -> list[Candidate]:
    """Scrapea itsm.tools en busca de listas de herramientas."""
    candidates = []
    html = fetch_url("https://itsm.tools", config)
    if not html:
        return candidates

    soup = BeautifulSoup(html, "html.parser")

    # Buscar enlaces a artículos que puedan ser listas/comparativas
    for link in soup.select("a[href]"):
        href = link.get("href", "")
        text = link.get_text(strip=True).lower()
        if not href.startswith("http"):
            continue
        if any(
            kw in text or kw in href.lower()
            for kw in ["tool", "software", "solution", "platform",
                       "comparison", "guide", "best", "top", "review"]
        ):
            candidates.append(Candidate(
                name=link.get_text(strip=True)[:80],
                category="unknown",
                source_type="editorial",
                source_url=href,
                mention_context=text[:200],
            ))

    return candidates


def scrape_github_trending(category: str, config: dict) -> list[Candidate]:
    """
    Busca repositorios relevantes en GitHub.
    Requiere GITHUB_TOKEN para más rate limit.
    """
    token = os.environ.get("GITHUB_TOKEN", "")
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": config.get("search", {}).get("user_agent", "BBDD-IT-Tools/1.0"),
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"

    candidates = []

    # Mapeo de categorías a topics de GitHub
    topic_map = {
        "edr": "edr",
        "siem": "siem",
        "soar": "soar",
        "firewall": "firewall",
        "antivirus": "antivirus",
        "identity-managers": "iam",
        "dlp": "dlp",
        "ids": "ids",
        "ips": "ips",
    }

    topic = topic_map.get(category, category.replace("-", ""))

    try:
        time.sleep(config.get("search", {}).get("rate_limit_seconds", 1.5))
        with httpx.Client(timeout=15, headers=headers) as client:
            resp = client.get(
                f"https://api.github.com/search/repositories",
                params={
                    "q": f"topic:{topic} stars:>100",
                    "sort": "stars",
                    "order": "desc",
                    "per_page": 10,
                },
            )
            if resp.status_code == 200:
                data = resp.json()
                for repo in data.get("items", []):
                    candidates.append(Candidate(
                        name=repo.get("name", ""),
                        slug=slugify(repo.get("name", "")),
                        category=category,
                        website=repo.get("html_url", ""),
                        description=repo.get("description", ""),
                        source_type="github",
                        source_url=repo.get("html_url", ""),
                    ))
    except Exception as e:
        print(f"  ⚠ GitHub API error for {category}: {e}", file=sys.stderr)

    return candidates


def fetch_all_candidates(config: dict, categories: list[str] = None) -> None:
    """
    Punto de entrada principal: busca candidatos para todas las categorías
    y actualiza el almacén persistente.
    """
    store = load_candidates_store()

    if categories is None:
        categories = list(config.get("categories", {}).keys())

    total_new = 0

    for category in categories:
        cat_config = config["categories"].get(category, {})
        queries = cat_config.get("queries", [])
        print(f"\n📡 Buscando: {category} ({len(queries)} queries)")

        for query in queries:
            print(f"  🔍 {query[:60]}...")
            try:
                results = search_duckduckgo(query, config)
                candidates = extract_candidates_from_results(results, category, "web_search")

                for c in candidates:
                    slug = c.slug or slugify_name(c.name)
                    c.slug = slug

                    # Actualizar contadores de menciones
                    if slug not in store["mention_counts"]:
                        store["mention_counts"][slug] = {}
                    store["mention_counts"][slug][c.source_type] = (
                        store["mention_counts"][slug].get(c.source_type, 0) + 1
                    )

                    # Guardar candidato
                    if slug not in store["candidates"]:
                        store["candidates"][slug] = c.model_dump()
                        total_new += 1
                    else:
                        # Actualizar si el nuevo tiene más info
                        existing = store["candidates"][slug]
                        if c.website and not existing.get("website"):
                            existing["website"] = c.website
                        if c.description and not existing.get("description"):
                            existing["description"] = c.description

            except Exception as e:
                print(f"  ❌ Error en query '{query[:40]}': {e}", file=sys.stderr)

        # GitHub search
        try:
            gh_candidates = scrape_github_trending(category, config)
            for c in gh_candidates:
                slug = c.slug or slugify_name(c.name)
                c.slug = slug
                if slug not in store["candidates"]:
                    store["candidates"][slug] = c.model_dump()
                    total_new += 1
        except Exception as e:
            print(f"  ⚠ GitHub search error: {e}", file=sys.stderr)

    # ITSM.tools
    print("\n📡 Escaneando itsm.tools...")
    try:
        itsm_candidates = scrape_itsm_tools(config)
        for c in itsm_candidates:
            slug = c.slug or slugify_name(c.name)
            c.slug = slug
            if slug not in store["candidates"]:
                store["candidates"][slug] = c.model_dump()
                total_new += 1
        print(f"  ✅ {len(itsm_candidates)} candidatos de itsm.tools")
    except Exception as e:
        print(f"  ⚠ itsm.tools error: {e}", file=sys.stderr)

    save_candidates_store(store)
    print(f"\n📊 Total: {len(store['candidates'])} candidatos en almacén ({total_new} nuevos)")


if __name__ == "__main__":
    config = load_config()
    fetch_all_candidates(config)
