"""
Descubrimiento de herramientas nuevas, con las fuentes que de verdad responden.

Durante meses este script devolvió cero candidatos y nadie se enteró porque el
paso corre con `continue-on-error`: raspaba el HTML de DuckDuckGo, que bloquea a
los clientes automatizados, y los listados de itsm.tools, cuyos artículos ni
siquiera existían. Un catálogo que quiere estar al día no puede depender de dos
fuentes caídas.

Ahora se usan dos que devuelven datos estructurados y no ponen trabas:

  · **API de búsqueda de GitHub** — repositorios por tema y por palabra clave,
    ordenados por estrellas. Descubre el software libre de cada categoría y, de
    paso, trae el número de estrellas, que es la señal de adopción que
    compute_rankings.py llevaba puesta a cero.
  · **Landscape de la CNCF** — el inventario que mantiene la fundación con los
    proyectos cloud native y su grado de madurez (graduado, incubación, sandbox).
    La graduación es un aval público con criterios conocidos.

Los contadores de menciones se acumulan igual que antes en data/candidates.json,
así que el resto del pipeline no cambia.
"""

import json
import os
import re
import sys
import time
from datetime import date

import httpx
import yaml
from slugify import slugify

from models import Candidate
from yaml_io import slugify_name, list_all_slugs, read_tool

DATA_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "data"
)
CANDIDATES_FILE = os.path.join(DATA_DIR, "candidates.json")
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


def github_search(query: str, config: dict) -> list[dict]:
    """Una consulta a la API de búsqueda de repositorios de GitHub."""
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": config.get("search", {}).get("user_agent", "BBDD-IT-Tools/1.0"),
    }
    # En Actions hay token y el límite pasa de 10 a 30 consultas por minuto.
    token = os.environ.get("GITHUB_TOKEN", "")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    time.sleep(config.get("search", {}).get("rate_limit_seconds", 2))
    try:
        with httpx.Client(timeout=20, headers=headers) as client:
            resp = client.get(
                "https://api.github.com/search/repositories",
                params={"q": query, "sort": "stars", "order": "desc", "per_page": 15},
            )
        if resp.status_code != 200:
            print(f"  ⚠ GitHub respondió {resp.status_code} a «{query}»", file=sys.stderr)
            return []
        return resp.json().get("items", [])
    except Exception as e:
        print(f"  ⚠ GitHub falló en «{query}»: {e}", file=sys.stderr)
        return []


# Un repositorio muy estrellado no siempre es una herramienta: las listas
# "awesome", los cursos y los libros dominan cualquier búsqueda por texto.
NO_ES_HERRAMIENTA = re.compile(
    r"\bawesome\b|\bguide\b|\btutorial\b|\bcourse\b|\bcheat[- ]?sheet\b|\broadmap\b|"
    r"\bexamples?\b|\bdemo\b|\bbook\b|\bnotes\b|\blearning\b|\bcollection\b|"
    r"\blist of\b|\bresources\b|\bstudy\b|\btraining\b|\bwriteups?\b", re.I)


def search_github(category: str, config: dict, estrellas: dict = None) -> list[Candidate]:
    """Proyectos abiertos relevantes de una categoría, por tema declarado.

    Solo se consulta por `topic:`, que es la etiqueta que pone el propio
    mantenedor. La búsqueda por texto libre se probó y devolvía sobre todo
    ruido —listas "awesome", cursos, repositorios de apuntes—: en una tanda
    trajo 264 resultados de los que apenas una decena eran herramientas.
    """
    cat_config = config.get("categories", {}).get(category, {})
    topic = (cat_config.get("github_topic")
             or config.get("github_topics", {}).get(category)
             or category.replace("-", ""))
    termino = cat_config.get("github_query", category.replace("-", " "))
    minimo = config.get("search", {}).get("github_min_stars", 150)

    estrellas = {} if estrellas is None else estrellas
    vistos, candidatos = set(), []
    for query in (f"topic:{topic} stars:>{minimo}",):
        for repo in github_search(query, config):
            full = repo.get("full_name", "")
            if full in vistos:
                continue
            vistos.add(full)
            nombre = repo.get("name", "")
            descripcion = (repo.get("description") or "").strip()
            if not nombre or not descripcion:
                continue
            if NO_ES_HERRAMIENTA.search(nombre) or NO_ES_HERRAMIENTA.search(descripcion):
                continue
            if repo.get("archived"):
                continue
            candidatos.append(Candidate(
                name=nombre,
                slug=slugify(nombre),
                category=category,
                website=repo.get("homepage") or repo.get("html_url", ""),
                description=(repo.get("description") or "")[:300],
                source_type="github",
                source_url=repo.get("html_url", ""),
                mention_context=f"{repo.get('stargazers_count', 0)} estrellas en GitHub",
            ))
            estrellas[repo.get("html_url", "")] = repo.get("stargazers_count", 0)
    return candidatos


def fetch_cncf_landscape(config: dict) -> list[Candidate]:
    """Proyectos del landscape de la CNCF, con su grado de madurez.

    Es un YAML público de un megabyte largo, sin API key ni bloqueo. Para este
    catálogo interesa sobre todo la madurez: un proyecto graduado ha pasado una
    auditoría de seguridad y tiene adopción demostrada, que es justo lo que
    distingue a un referente de una promesa.
    """
    url = ("https://raw.githubusercontent.com/cncf/landscape/master/landscape.yml")
    candidatos = []
    try:
        with httpx.Client(timeout=40, follow_redirects=True) as client:
            resp = client.get(url)
        if resp.status_code != 200:
            print(f"  ⚠ El landscape de la CNCF respondió {resp.status_code}", file=sys.stderr)
            return candidatos
        data = yaml.safe_load(resp.text)
    except Exception as e:
        print(f"  ⚠ No se pudo leer el landscape de la CNCF: {e}", file=sys.stderr)
        return candidatos

    # El YAML trae subcategorías y listas vacías como `null`, no como lista
    for categoria in data.get("landscape") or []:
        for subcat in categoria.get("subcategories") or []:
            for item in subcat.get("items") or []:
                madurez = item.get("project")  # graduated | incubating | sandbox
                if madurez not in ("graduated", "incubating"):
                    continue
                nombre = item.get("name", "")
                if not nombre:
                    continue
                candidatos.append(Candidate(
                    name=nombre,
                    slug=slugify(nombre),
                    category="unknown",
                    website=item.get("homepage_url", ""),
                    description=f"{categoria.get('name', '')} · {subcat.get('name', '')}",
                    source_type="cncf",
                    source_url=item.get("homepage_url", ""),
                    mention_context=f"proyecto {madurez} de la CNCF",
                ))
    return candidatos


def categorias_del_catalogo(config: dict) -> list[str]:
    """Las categorías reales del directorio, no solo las descritas en config.yaml.

    config.yaml enumera quince y el catálogo tiene cincuenta y seis: buscar solo
    por las primeras dejaba dos tercios de las categorías sin vigilancia de
    jugadores nuevos.
    """
    ids = set(config.get("categories", {}))
    for slug in list_all_slugs():
        tool = read_tool(slug)
        if not tool:
            continue
        cats = tool.get("categories") or ([tool["category"]] if tool.get("category") else [])
        ids.update(cats)
    return sorted(ids)


def registrar(store: dict, candidatos: list[Candidate]) -> int:
    """Acumula candidatos y menciones en el almacén. Devuelve cuántos son nuevos."""
    nuevos = 0
    for c in candidatos:
        slug = c.slug or slugify_name(c.name)
        c.slug = slug
        menciones = store["mention_counts"].setdefault(slug, {})
        menciones[c.source_type] = menciones.get(c.source_type, 0) + 1
        if slug not in store["candidates"]:
            store["candidates"][slug] = c.model_dump()
            nuevos += 1
        else:
            existente = store["candidates"][slug]
            for campo in ("website", "description", "source_url", "mention_context"):
                if getattr(c, campo, None) and not existente.get(campo):
                    existente[campo] = getattr(c, campo)
    return nuevos


def fetch_all_candidates(config: dict, categories: list[str] = None) -> None:
    """Recorre las fuentes vivas y actualiza el almacén de candidatos."""
    store = load_candidates_store()
    store.setdefault("candidates", {})
    store.setdefault("mention_counts", {})
    # Estrellas por repositorio: es la única señal de adopción medible que tiene
    # el pipeline, y compute_rankings.py la llevaba puesta a cero.
    estrellas = store.setdefault("github_stars", {})

    if categories is None:
        categories = categorias_del_catalogo(config)

    total_new = 0

    for category in categories:
        print(f"\n📡 GitHub: {category}")
        try:
            candidatos = search_github(category, config, estrellas)
            nuevos = registrar(store, candidatos)
            total_new += nuevos
            print(f"  ✅ {len(candidatos)} repositorios ({nuevos} nuevos)")
        except Exception as e:
            print(f"  ❌ Error en {category}: {e}", file=sys.stderr)

    print("\n📡 Landscape de la CNCF")
    try:
        candidatos = fetch_cncf_landscape(config)
        nuevos = registrar(store, candidatos)
        total_new += nuevos
        print(f"  ✅ {len(candidatos)} proyectos graduados o en incubación ({nuevos} nuevos)")
    except Exception as e:
        print(f"  ❌ Error con la CNCF: {e}", file=sys.stderr)

    save_candidates_store(store)
    print(f"\n📊 Total: {len(store['candidates'])} candidatos en almacén ({total_new} nuevos)")


if __name__ == "__main__":
    config = load_config()
    fetch_all_candidates(config)
