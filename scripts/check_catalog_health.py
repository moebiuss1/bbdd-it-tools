"""
Vigilancia semanal del catálogo: avisa de lo que ningún otro script detecta.

El pipeline comprueba que los datos cumplan el esquema, pero no que la
herramienta siga existiendo. Skybox Security llevaba meses en el directorio con
la empresa cerrada, y ForgeRock y ACL seguían listadas cuando sus marcas ya se
habían disuelto en Ping y en Diligent. El síntoma es siempre el mismo y es
automatizable: la web del fabricante empieza a redirigir a otro dominio.

Tres comprobaciones, todas sobre datos ya presentes en el repositorio:

  1. Cambio de dominio: se resuelve el `website` de cada ficha y se compara con
     el dominio que se anotó la semana anterior en data/domains.json.
  2. Fuentes: fichas sin ninguna referencia ajena al fabricante y fichas que no
     citan ningún ranking internacional del sector, que es la evidencia que este
     directorio considera primaria.
  3. Descubrimiento: cuántos candidatos nuevos ha traído fetch_candidates.py. Si
     lleva semanas en cero, el catálogo deja de enterarse de los jugadores
     nuevos y eso hay que verlo, no suponerlo.

Nunca falla el pipeline (exit 0): escribe data/catalog-health.md y el flujo de
trabajo abre el aviso si hay algo que contar.
"""

import json
import os
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from urllib.parse import urlparse

import httpx
import yaml

from yaml_io import list_all_slugs, read_tool

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
DOMAINS_FILE = os.path.join(DATA_DIR, "domains.json")
CANDIDATES_FILE = os.path.join(DATA_DIR, "candidates.json")
REPORT_FILE = os.path.join(DATA_DIR, "catalog-health.md")

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

# Rankings internacionales que este directorio acepta como fuente primaria.
# Una nota de prensa del fabricante no es evidencia; un mercado de Gartner Peer
# Insights, una Forrester Wave o un laboratorio de pruebas independiente, sí.
RANKING_SOURCES = (
    "gartner.com", "forrester.com", "idc.com", "kuppingercole.com",
    "av-comparatives.org", "av-test.org", "mitre.org", "nss.com",
    "peerspot.com", "g2.com", "info-tech.com", "radicati.com",
)

# Para un proyecto abierto el equivalente no es un cuadrante de analista sino el
# aval de una fundación: la CNCF gradúa proyectos con criterios públicos y eso
# dice más de su adopción que cualquier informe de pago.
FOUNDATION_SOURCES = (
    "cncf.io", "apache.org", "linuxfoundation.org", "owasp.org",
    "lfaidata.foundation", "openssf.org", "eclipse.org",
)


def registered_domain(url: str) -> str:
    """Dominio de segundo nivel, que es lo que identifica al fabricante."""
    host = (urlparse(url).hostname or "").lower().removeprefix("www.")
    parts = host.split(".")
    return ".".join(parts[-2:]) if len(parts) > 1 else host


def brand(url_or_domain: str) -> str:
    """La etiqueta de marca, sin dominio de primer nivel.

    `kaspersky.com` y `kaspersky.es` son la misma empresa: los sitios grandes
    redirigen por geolocalización y el runner de GitHub está en otro país que
    esta máquina. Comparar la marca y no el dominio entero evita que ese vaivén
    llene el aviso semanal de falsos positivos.
    """
    dom = url_or_domain if "." in url_or_domain and "/" not in url_or_domain \
        else registered_domain(url_or_domain)
    return dom.split(".")[0]


def resolve(item: tuple[str, str, str]) -> dict:
    slug, name, website = item
    try:
        with httpx.Client(timeout=25, follow_redirects=True,
                          headers={"User-Agent": UA}) as client:
            r = client.get(website)
        final, status = str(r.url), r.status_code
    except Exception:
        final, status = website, 0
    return {"slug": slug, "name": name, "website": website,
            "domain": registered_domain(final), "status": status}


def check_domains(tools: list[tuple[str, str, str]]) -> tuple[list[str], dict]:
    """Compara el dominio efectivo de cada ficha con el de la semana pasada."""
    previo = {}
    if os.path.exists(DOMAINS_FILE):
        previo = json.load(open(DOMAINS_FILE, encoding="utf-8"))

    with ThreadPoolExecutor(max_workers=10) as pool:
        actual = list(pool.map(resolve, tools))

    avisos, baseline = [], {}
    for row in actual:
        slug, dominio = row["slug"], row["domain"]
        anterior = previo.get(slug, {}).get("domain")
        declarado = registered_domain(row["website"])

        # Una web que no responde puede ser un bloqueo antibots: solo se anota
        # cuando el dominio declarado ya no resuelve a nada (status 0).
        if row["status"] == 0:
            baseline[slug] = {"domain": anterior or declarado, "status": 0}
            continue

        baseline[slug] = {"domain": dominio, "status": row["status"]}

        if anterior and brand(anterior) != brand(dominio):
            avisos.append(
                f"- **{row['name']}** (`{slug}`): su web pasó de `{anterior}` a "
                f"`{dominio}`. Comprobar si la marca se ha vendido, absorbido o retirado."
            )
        elif not anterior and brand(dominio) != brand(declarado):
            # Primera vez que se mira esta ficha y ya redirige fuera de casa
            avisos.append(
                f"- **{row['name']}** (`{slug}`): `{declarado}` redirige a `{dominio}`."
            )
        if row["status"] in (404, 410):
            avisos.append(f"- **{row['name']}** (`{slug}`): su web devuelve {row['status']}.")

    return avisos, baseline


def check_sources() -> tuple[list[str], list[str]]:
    """Fichas sin evidencia ajena al fabricante o sin ranking internacional."""
    sin_externa, sin_ranking = [], []
    for slug in list_all_slugs():
        tool = read_tool(slug)
        if not tool:
            continue
        propio = registered_domain(tool.get("website", ""))
        fuentes = tool.get("sources") or []
        externas = [s for s in fuentes if registered_domain(s) != propio]
        aceptadas = RANKING_SOURCES
        if tool.get("type") == "opensource":
            aceptadas = RANKING_SOURCES + FOUNDATION_SOURCES
        if not externas:
            sin_externa.append(f"{tool.get('name', slug)} (`{slug}`)")
        elif not any(registered_domain(s) in aceptadas for s in externas):
            sin_ranking.append(f"{tool.get('name', slug)} (`{slug}`)")
    return sin_externa, sin_ranking


def check_discovery() -> list[str]:
    """¿Está trayendo candidatos nuevos el rastreo de fuentes?"""
    if not os.path.exists(CANDIDATES_FILE):
        return ["- El rastreo de candidatos no ha dejado ningún fichero: `fetch_candidates.py` no llegó a ejecutarse."]
    store = json.load(open(CANDIDATES_FILE, encoding="utf-8"))
    candidatos = store.get("candidates") or {}
    menciones = store.get("mention_counts") or {}
    if not candidatos and not menciones:
        return [
            "- El rastreo de candidatos está devolviendo **cero** resultados, así que el "
            "catálogo no se está enterando de los jugadores nuevos. Las fuentes de "
            "`fetch_candidates.py` (DuckDuckGo y itsm.tools) llevan tiempo bloqueando el "
            "scraping; hay que sustituirlas o alimentar las altas a mano."
        ]
    return []


def main() -> int:
    tools = []
    for slug in list_all_slugs():
        tool = read_tool(slug)
        if tool and tool.get("website"):
            tools.append((slug, tool.get("name", slug), tool["website"]))

    avisos_dominio, baseline = check_domains(tools)
    sin_externa, sin_ranking = check_sources()
    avisos_descubrimiento = check_discovery()

    os.makedirs(DATA_DIR, exist_ok=True)
    with open(DOMAINS_FILE, "w", encoding="utf-8") as f:
        json.dump(baseline, f, indent=1, ensure_ascii=False, sort_keys=True)

    partes = []
    if avisos_dominio:
        partes.append("### Fichas que han cambiado de dominio\n\n"
                      "Una herramienta cuya web redirige a otra empresa suele estar vendida, "
                      "absorbida o descatalogada. Si ya no se vende, se borra la ficha y se "
                      "añade su redirección en `retiredTools` (astro.config.mjs); si sigue "
                      "viva con otro dueño, se actualizan nombre y URL.\n\n"
                      + "\n".join(avisos_dominio))
    if sin_externa:
        partes.append(f"### {len(sin_externa)} fichas sin ninguna fuente ajena al fabricante\n\n"
                      + ", ".join(sin_externa))
    if sin_ranking:
        partes.append(f"### {len(sin_ranking)} fichas sin ranking internacional entre sus fuentes\n\n"
                      "La evidencia primaria de este directorio es el análisis independiente "
                      "(Gartner Peer Insights, Forrester, IDC, KuppingerCole, AV-Comparatives…). "
                      "Un blog o la web del fabricante no lo sustituyen.\n\n"
                      + ", ".join(sin_ranking))
    if avisos_descubrimiento:
        partes.append("### Altas nuevas\n\n" + "\n".join(avisos_descubrimiento))

    if not partes:
        if os.path.exists(REPORT_FILE):
            os.remove(REPORT_FILE)
        print("✅ Catálogo sin avisos: ningún cambio de dominio y las fuentes cuadran.")
        return 0

    informe = (f"_Revisión automática del {date.today().isoformat()} sobre "
               f"{len(tools)} fichas._\n\n" + "\n\n".join(partes) + "\n")
    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        f.write(informe)
    print(informe)
    print(f"\n⚠️  {len(avisos_dominio)} cambios de dominio; informe en data/catalog-health.md")
    return 0


if __name__ == "__main__":
    sys.exit(main())
