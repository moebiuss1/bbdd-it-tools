"""
Enriquece candidatos: rellena fichas de herramientas con datos de la web.
Usa Wikipedia, Wikidata, y la web oficial de cada herramienta.
"""

import json
import os
import re
import sys
import time
from datetime import date
from urllib.parse import urlparse

import httpx
import yaml
from bs4 import BeautifulSoup
from slugify import slugify

from models import Candidate, ToolFrontmatter, ToolType
from yaml_io import (
    read_tool,
    write_tool,
    merge_frontmatter,
    list_all_slugs,
    slugify_name,
    format_description,
)

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
CANDIDATES_FILE = os.path.join(DATA_DIR, "candidates.json")
CONFIG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.yaml")
CACHE_DIR = os.path.join(DATA_DIR, "cache", "sites")


def load_config() -> dict:
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_candidates_store() -> dict:
    if os.path.exists(CANDIDATES_FILE):
        with open(CANDIDATES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"candidates": {}, "mention_counts": {}}


def fetch_url(url: str, config: dict) -> str | None:
    """Descarga con caché."""
    import hashlib

    url_hash = hashlib.md5(url.encode()).hexdigest()[:12]
    cache_path = os.path.join(CACHE_DIR, f"{url_hash}.html")
    if os.path.exists(cache_path):
        with open(cache_path, "r", encoding="utf-8") as f:
            return f.read()

    time.sleep(config.get("search", {}).get("rate_limit_seconds", 1.5))
    try:
        with httpx.Client(
            timeout=15,
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


def search_wikipedia(tool_name: str, config: dict) -> dict | None:
    """Busca una herramienta en Wikipedia (ES primero, EN fallback)."""
    for lang in ["es", "en"]:
        url = f"https://{lang}.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "list": "search",
            "srsearch": tool_name,
            "format": "json",
            "srlimit": 3,
        }
        try:
            time.sleep(0.5)
            with httpx.Client(timeout=15) as client:
                resp = client.get(url, params=params)
                if resp.status_code != 200:
                    continue
                data = resp.json()
                pages = data.get("query", {}).get("search", [])
                if not pages:
                    continue

                # Obtener extracto de la primera página
                page_title = pages[0]["title"]
                extract_params = {
                    "action": "query",
                    "prop": "extracts|info",
                    "exintro": 1,
                    "explaintext": 1,
                    "titles": page_title,
                    "format": "json",
                    "inprop": "url",
                }
                resp2 = client.get(url, params=extract_params)
                if resp2.status_code != 200:
                    continue
                data2 = resp2.json()
                pages_data = data2.get("query", {}).get("pages", {})
                for pid, page_data in pages_data.items():
                    if pid != "-1":
                        return {
                            "title": page_data.get("title", ""),
                            "extract": page_data.get("extract", ""),
                            "url": page_data.get("fullurl", ""),
                            "lang": lang,
                        }
        except Exception as e:
            print(f"    ⚠ Wikipedia {lang} error: {e}", file=sys.stderr)

    return None


def probe_website(domain: str, config: dict) -> dict:
    """Sondea la web oficial para extraer descripción, certificaciones, etc."""
    result = {"description": None, "certifications": [], "company_size": []}

    # Intentar página principal
    html = fetch_url(f"https://{domain}", config)
    if not html:
        html = fetch_url(f"http://{domain}", config)
    if not html:
        return result

    soup = BeautifulSoup(html, "html.parser")

    # Extraer meta description
    meta_desc = soup.select_one('meta[name="description"]')
    if meta_desc:
        desc = meta_desc.get("content", "").strip()
        if len(desc) > 50:
            result["description"] = format_description(desc)

    # Buscar certificaciones en el texto
    text = soup.get_text().lower()
    known_certs = config.get("known_certifications", [])
    for cert in known_certs:
        cert_lower = cert.lower()
        if cert_lower in text:
            result["certifications"].append(cert)

    # Intentar página de seguridad/trust/compliance
    for path in ["/trust", "/security", "/compliance", "/legal/security"]:
        sec_url = f"https://{domain}{path}"
        sec_html = fetch_url(sec_url, config)
        if sec_html:
            sec_text = BeautifulSoup(sec_html, "html.parser").get_text().lower()
            for cert in known_certs:
                cert_lower = cert.lower()
                if cert_lower in sec_text and cert not in result["certifications"]:
                    result["certifications"].append(cert)

    return result


def enrich_tool(slug: str, candidate: dict, config: dict, mention_counts: dict) -> bool:
    """
    Enriquece una herramienta con datos de la web.
    Retorna True si se creó o actualizó algo.
    """
    existing = read_tool(slug)
    is_new = existing is None

    name = candidate.get("name", slug.replace("-", " ").title())
    website = candidate.get("website", "")
    category = candidate.get("category", "unknown")

    if not website:
        # Intentar encontrar la web oficial
        for query in [f"{name} official site", f"{name} software"]:
            search_url = f"https://html.duckduckgo.com/html/?q={query}"
            html = fetch_url(search_url, config)
            if html:
                soup = BeautifulSoup(html, "html.parser")
                first_result = soup.select_one(".result__url")
                if first_result:
                    website = first_result.get_text(strip=True)
                    if website and not website.startswith("http"):
                        website = f"https://{website}"
                    break
        if not website:
            website = f"https://www.google.com/search?q={name}"

    # Buscar en Wikipedia
    wiki_info = search_wikipedia(name, config)
    description = candidate.get("description") or ""
    why_reference = ""

    if wiki_info and wiki_info.get("extract"):
        description = format_description(wiki_info["extract"], 300)
        why_reference = wiki_info["extract"][:400].strip()

    # Si no hay descripción, sondear web
    if not description and website:
        domain = urlparse(website).netloc
        if domain:
            web_info = probe_website(domain, config)
            if web_info.get("description"):
                description = web_info["description"]

    # Determinar tipo
    is_open_source = bool(
        candidate.get("repo") or
        "github" in (candidate.get("source_type", "")) or
        "open source" in (description + (wiki_info.get("extract", "") if wiki_info else "")).lower()
    )

    # Construir frontmatter
    # OJO: usar SIEMPRE "categories" (lista) y no "category" (legacy, singular).
    # El front-end resuelve categorías con getToolCategories(data), que solo cae al
    # campo legacy "category" cuando "categories" está *ausente* — pero Zod aplica
    # default([]) a "categories", así que una herramienta con solo "category" set
    # terminaría con categories=[] y desaparecería de todos los listados agrupados.
    new_data = {
        "name": name,
        "slug": slug,
        "categories": [category],
        "tags": candidate.get("tags", [category]),
        "type": ToolType.OPENSOURCE.value if is_open_source else ToolType.COMERCIAL.value,
        "website": website,
        "description": description or f"{name} es una herramienta de {category}.",
        "why_reference": why_reference or f"Referente en el ámbito de {category}.",
        "sources": [s for s in [candidate.get("source_url"), wiki_info.get("url") if wiki_info else None] if s],
        "last_verified": date.today().isoformat(),
        "needs_review": not description or not why_reference,
    }

    # Añadir repo si es open source
    if candidate.get("repo"):
        new_data["repo"] = candidate["repo"]

    merged = merge_frontmatter(existing, new_data)

    # Determinar body
    body = ""
    if existing and existing.get("_body"):
        body = existing["_body"]
    elif wiki_info and wiki_info.get("extract"):
        body = f"## {name}\n\n{wiki_info['extract']}\n"

    write_tool(slug, merged, body)

    return is_new


def enrich_all(config: dict, limit: int = None) -> dict:
    """
    Punto de entrada principal: enriquece todos los candidatos
    que no tengan ficha todavía o necesiten revisión.
    """
    store = load_candidates_store()
    candidates = store.get("candidates", {})
    mention_counts = store.get("mention_counts", {})
    existing_slugs = set(list_all_slugs())

    stats = {"added": 0, "updated": 0, "skipped": 0}
    count = 0

    # Ordenar candidatos por menciones (los más mencionados primero)
    sorted_candidates = sorted(
        candidates.items(),
        key=lambda item: sum(mention_counts.get(item[0], {}).values()),
        reverse=True,
    )

    for slug, candidate in sorted_candidates:
        if limit and count >= limit:
            break

        is_new = slug not in existing_slugs
        label = "NUEVO" if is_new else "EXISTE"

        print(f"  📝 [{label}] {candidate.get('name', slug)[:60]}")

        try:
            was_added = enrich_tool(slug, candidate, config, mention_counts)
            if was_added:
                stats["added" if is_new else "updated"] += 1
            else:
                stats["skipped"] += 1
            count += 1
        except Exception as e:
            print(f"    ❌ Error: {e}", file=sys.stderr)
            stats["skipped"] += 1

    return stats


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Enriquece/crea fichas de herramientas a partir de candidatos descubiertos")
    parser.add_argument("--limit", type=int, default=None, help="Máximo de herramientas a procesar en esta ejecución")
    args = parser.parse_args()

    config = load_config()
    stats = enrich_all(config, limit=args.limit)
    print(f"\n📊 Resultados: {stats['added']} añadidas, {stats['updated']} actualizadas, {stats['skipped']} sin cambios")
