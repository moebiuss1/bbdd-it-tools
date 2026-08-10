#!/usr/bin/env python3
"""
Orquestador del pipeline de actualización semanal.

Fases (ejecutables independientemente):
  python run_all.py                  # todas las fases
  python run_all.py --skip enrich    # saltar enrich_tools
  python run_all.py --only logos     # solo logos

Genera data/report.md con el resumen de la ejecución.
"""

import argparse
import os
import sys
from datetime import date, datetime

import yaml

# Importar módulos del pipeline
from fetch_candidates import fetch_all_candidates, load_config
from enrich_tools import enrich_all
from seed_tools import seed as seed_tools
from fetch_logos import fetch_all_logos
from compute_rankings import compute_rankings, write_rankings_ts
from validate import validate_all

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.join(SCRIPTS_DIR, "..")
DATA_DIR = os.path.join(PROJECT_DIR, "data")
CONFIG_PATH = os.path.join(SCRIPTS_DIR, "config.yaml")
REPORT_PATH = os.path.join(DATA_DIR, "report.md")

os.makedirs(DATA_DIR, exist_ok=True)


def generate_report(
    start_time: datetime,
    phases_run: list[str],
    stats: dict,
    errors: list[str],
) -> str:
    """Genera un reporte markdown del pipeline."""
    elapsed = (datetime.now() - start_time).total_seconds()
    today = date.today().isoformat()

    lines = [
        f"# 📊 Reporte de actualización — {today}",
        "",
        f"**Ejecutado:** {start_time.strftime('%Y-%m-%d %H:%M UTC')}",
        f"**Duración:** {elapsed:.0f}s",
        f"**Fases ejecutadas:** {', '.join(phases_run)}",
        "",
        "## Resultados",
        "",
    ]

    if stats.get("candidates_new"):
        lines.append(f"- 🔍 **Candidatos nuevos:** {stats['candidates_new']}")
    if stats.get("tools_added") is not None:
        lines.append(f"- 📝 **Herramientas añadidas:** {stats['tools_added']}")
        lines.append(f"- 🔄 **Herramientas actualizadas:** {stats.get('tools_updated', 0)}")
    if stats.get("logos_fetched") is not None:
        lines.append(f"- 🖼️  **Logos descargados:** {stats['logos_fetched']}")
    if stats.get("categories_ranked"):
        lines.append(f"- 🏆 **Categorías rankeadas:** {stats['categories_ranked']}")
    if stats.get("tools_ranked"):
        lines.append(f"- 📊 **Herramientas rankeadas:** {stats['tools_ranked']}")
    if stats.get("validation_errors") is not None:
        status = "✅ Sin errores" if stats["validation_errors"] == 0 else f"❌ {stats['validation_errors']} errores"
        lines.append(f"- 🔍 **Validación:** {status}")

    if stats.get("new_tools"):
        lines.append("")
        lines.append("## 🆕 Nuevas herramientas")
        for t in stats["new_tools"]:
            lines.append(f"- {t}")

    if errors:
        lines.append("")
        lines.append("## ⚠️ Errores")
        for e in errors:
            lines.append(f"- {e}")

    lines.append("")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Pipeline de actualización BBDD IT Tools")
    parser.add_argument(
        "--skip",
        nargs="+",
        choices=["fetch", "enrich", "seed", "logos", "rank", "validate"],
        default=[],
        help="Fases a saltar",
    )
    parser.add_argument(
        "--only",
        nargs="+",
        choices=["fetch", "enrich", "seed", "logos", "rank", "validate"],
        default=None,
        help="Ejecutar solo estas fases",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Limitar número de herramientas a enriquecer (modo prueba)",
    )
    args = parser.parse_args()

    start_time = datetime.now()
    config = load_config()
    phases_run = []
    stats = {}
    errors = []

    should_run = lambda phase: (
        (args.only is None or phase in args.only)
        and phase not in args.skip
    )

    print("=" * 60)
    print("🔄 BBDD IT Tools — Pipeline de actualización semanal")
    print(f"   Inicio: {start_time.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    # Fase 1: Fetch candidates (busca en Internet: DuckDuckGo, GitHub, itsm.tools)
    if should_run("fetch"):
        print("\n" + "─" * 60)
        print("📡 FASE 1/6: Búsqueda de candidatos")
        print("─" * 60)
        try:
            fetch_all_candidates(config)
            phases_run.append("fetch")
        except Exception as e:
            errors.append(f"fetch: {e}")
            print(f"❌ Error: {e}", file=sys.stderr)

    # Fase 2: Enrich tools (crea/enriquece fichas a partir de los candidatos)
    if should_run("enrich"):
        print("\n" + "─" * 60)
        print("📝 FASE 2/6: Enriquecimiento de herramientas")
        print("─" * 60)
        try:
            enrich_stats = enrich_all(config, limit=args.limit)
            stats["tools_added"] = enrich_stats.get("added", 0)
            stats["tools_updated"] = enrich_stats.get("updated", 0)
            phases_run.append("enrich")
        except Exception as e:
            errors.append(f"enrich: {e}")
            print(f"❌ Error: {e}", file=sys.stderr)

    # Fase 3: Seed tools (refuerza el set curado; merge idempotente, nunca sobrescribe ediciones manuales)
    if should_run("seed"):
        print("\n" + "─" * 60)
        print("🌱 FASE 3/6: Refuerzo de datos semilla curados")
        print("─" * 60)
        try:
            seed_tools()
            phases_run.append("seed")
        except Exception as e:
            errors.append(f"seed: {e}")
            print(f"❌ Error: {e}", file=sys.stderr)

    # Fase 4: Fetch logos
    if should_run("logos"):
        print("\n" + "─" * 60)
        print("🖼️  FASE 4/6: Descarga de logos")
        print("─" * 60)
        try:
            logos_count = fetch_all_logos(config)
            stats["logos_fetched"] = logos_count
            phases_run.append("logos")
        except Exception as e:
            errors.append(f"logos: {e}")
            print(f"❌ Error: {e}", file=sys.stderr)

    # Fase 5: Compute rankings
    if should_run("rank"):
        print("\n" + "─" * 60)
        print("🏆 FASE 5/6: Cálculo de rankings")
        print("─" * 60)
        try:
            rankings = compute_rankings(config)
            if rankings:
                write_rankings_ts(rankings)
                stats["categories_ranked"] = len(rankings)
                stats["tools_ranked"] = sum(len(e) for e in rankings.values())
            else:
                print("  ⚠️  No hay herramientas para rankear")
            phases_run.append("rank")
        except Exception as e:
            errors.append(f"rank: {e}")
            print(f"❌ Error: {e}", file=sys.stderr)

    # Fase 6: Validate
    if should_run("validate"):
        print("\n" + "─" * 60)
        print("🔍 FASE 6/6: Validación")
        print("─" * 60)
        try:
            validation_errors = validate_all()
            stats["validation_errors"] = len(validation_errors)
            if validation_errors:
                for ve in validation_errors:
                    print(f"  {ve}")
                    errors.append(ve)
            phases_run.append("validate")
        except Exception as e:
            errors.append(f"validate: {e}")
            print(f"❌ Error: {e}", file=sys.stderr)

    # Generar reporte
    print("\n" + "=" * 60)
    print("📊 Generando reporte...")

    report = generate_report(start_time, phases_run, stats, errors)

    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(report)

    print(report)
    print(f"\n📄 Reporte guardado en: {REPORT_PATH}")
    print("=" * 60)

    # Exit code
    if errors:
        print("⚠️  Pipeline completado con errores.")
        sys.exit(1)
    else:
        print("✅ Pipeline completado exitosamente.")
        sys.exit(0)


if __name__ == "__main__":
    main()
