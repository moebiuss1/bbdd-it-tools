"""
Calcula rankings compuestos por categoría basados en múltiples señales.

Score compuesto:
  0.35 * mention_count_normalized
+ 0.25 * gartner_mentions_normalized
+ 0.20 * log10(github_stars + 1)_normalized
+ 0.10 * certification_count_normalized
+ 0.10 * wikidata_sitelinks_normalized

Cada señal se normaliza min-max a 0-100 dentro de su categoría.
"""

import json
import math
import os
import sys
from datetime import date

import yaml

from yaml_io import read_tool, write_tool, list_all_slugs

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
CANDIDATES_FILE = os.path.join(DATA_DIR, "candidates.json")
RANKINGS_FILE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "src", "data", "rankings.ts"
)
CONFIG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.yaml")


def load_config() -> dict:
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_candidates_store() -> dict:
    if os.path.exists(CANDIDATES_FILE):
        with open(CANDIDATES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"candidates": {}, "mention_counts": {}}


def normalize_scores(values: list[float]) -> list[float]:
    """Normaliza valores a rango 0-100 usando min-max."""
    if not values:
        return values
    min_val = min(values)
    max_val = max(values)
    if max_val == min_val:
        return [50.0] * len(values)  # todos iguales -> 50
    return [(v - min_val) / (max_val - min_val) * 100 for v in values]


def compute_rankings(config: dict) -> dict[str, list[dict]]:
    """
    Calcula rankings para todas las categorías.
    Retorna {category_id: [{slug, rank, score, tier}, ...]}
    """
    store = load_candidates_store()
    mention_counts = store.get("mention_counts", {})
    slugs = list_all_slugs()
    weights = config.get("ranking_weights", {})

    # Agrupar herramientas por categoría.
    # OJO: usar SIEMPRE "categories" (lista), con fallback al legacy "category" solo
    # si "categories" está vacío/ausente. Una herramienta puede pertenecer a varias
    # categorías (p.ej. "key-managers" + "secrets-management") y debe rankearse en
    # cada una de ellas — no solo en la primera.
    by_category: dict[str, list[dict]] = {}

    for slug in slugs:
        tool = read_tool(slug)
        if not tool:
            continue

        cats = tool.get("categories") or ([tool["category"]] if tool.get("category") else [])
        if not cats:
            cats = ["unknown"]

        # Señales (independientes de la categoría)
        mentions = sum(mention_counts.get(slug, {}).values())
        gartner_mentions = mention_counts.get(slug, {}).get("gartner", 0)
        github_stars = 0  # se podría obtener de GitHub API
        cert_count = len(tool.get("certifications", []))

        # Log de github stars (evitar log(0))
        gh_log = math.log10(github_stars + 1)

        entry = {
            "slug": slug,
            "name": tool.get("name", slug),
            "mentions": mentions,
            "gartner_mentions": gartner_mentions,
            "github_log10": gh_log,
            "cert_count": cert_count,
            "market_rank": tool.get("market_rank"),
        }

        for category in cats:
            by_category.setdefault(category, []).append(dict(entry))

    # Calcular scores por categoría
    rankings: dict[str, list[dict]] = {}

    for category, tools in by_category.items():
        if len(tools) < 1:
            continue

        # Normalizar cada señal
        m_norm = normalize_scores([t["mentions"] for t in tools])
        g_norm = normalize_scores([t["gartner_mentions"] for t in tools])
        gh_norm = normalize_scores([t["github_log10"] for t in tools])
        c_norm = normalize_scores([t["cert_count"] for t in tools])

        # Wikidata sitelinks: placeholder (mismo valor para todos)
        w_norm = [50.0] * len(tools)

        # Score compuesto
        for i, tool in enumerate(tools):
            score = (
                weights.get("mention_count", 0.35) * m_norm[i]
                + weights.get("gartner_mentions", 0.25) * g_norm[i]
                + weights.get("github_stars_log10", 0.20) * gh_norm[i]
                + weights.get("certification_count", 0.10) * c_norm[i]
                + weights.get("wikidata_sitelinks", 0.10) * w_norm[i]
            )
            tool["score"] = round(score)
            tool["tier"] = get_tier(score, config)

        # Ordenar por score descendente
        tools.sort(key=lambda t: t["score"], reverse=True)

        # Asignar ranks
        rankings[category] = []
        for rank, tool in enumerate(tools, 1):
            rankings[category].append({
                "slug": tool["slug"],
                "rank": rank,
                "score": tool["score"],
                "tier": tool["tier"],
            })

            # Actualizar market_rank en el frontmatter de la herramienta
            existing = read_tool(tool["slug"])
            if existing:
                existing["market_rank"] = rank
                body = existing.pop("_body", "")
                write_tool(tool["slug"], existing, body)

    return rankings


def get_tier(score: float, config: dict) -> str:
    tiers = config.get("ranking_tiers", {})
    if score >= tiers.get("lider", 80):
        return "Líder"
    elif score >= tiers.get("visionario", 65):
        return "Visionario"
    elif score >= tiers.get("retador", 50):
        return "Retador"
    return "Nicho"


def write_rankings_ts(rankings: dict[str, list[dict]]) -> None:
    """Escribe el archivo src/data/rankings.ts con los rankings calculados."""
    content = """export interface RankingEntry {
  slug: string;
  rank: number;
  score: number;
  tier: "Líder" | "Visionario" | "Retador" | "Nicho";
}

const rankings: Record<string, RankingEntry[]> = {
"""

    for category, entries in sorted(rankings.items()):
        content += f'  "{category}": [\n'
        for e in entries:
            content += f'    {{ slug: "{e["slug"]}", rank: {e["rank"]}, score: {e["score"]}, tier: "{e["tier"]}" }},\n'
        content += "  ],\n"

    content += """};

export default rankings;
"""

    os.makedirs(os.path.dirname(RANKINGS_FILE), exist_ok=True)
    with open(RANKINGS_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"  ✅ Rankings escritos en {RANKINGS_FILE}")


if __name__ == "__main__":
    config = load_config()
    rankings = compute_rankings(config)

    if rankings:
        write_rankings_ts(rankings)
        total = sum(len(entries) for entries in rankings.values())
        print(f"\n📊 Rankings calculados: {len(rankings)} categorías, {total} herramientas")
    else:
        print("\n⚠️  No hay herramientas para rankear. Ejecuta enrich_tools.py primero.")
