"""
Cosecha en las webs de los fabricantes las referencias a analistas.

Gartner responde 403 a cualquier petición automatizada, así que sus mercados no
se pueden rastrear desde el origen. Pero los fabricantes presumen: casi todos
publican una página de reconocimientos con el cuadrante en el que salen y, muy a
menudo, con un enlace directo a su mercado de Gartner Peer Insights. Ese enlace
es una URL de gartner.com verificada sin tocar Gartner —la ha publicado el
fabricante— y sirve como fuente independiente de la ficha.

Qué hace, por herramienta:

  1. Descarga la portada del fabricante y sigue los enlaces que hablen de
     analistas (Gartner, Forrester, IDC, KuppingerCole, reconocimientos).
  2. Extrae los enlaces a `gartner.com/reviews/market/<slug>` y los nombres de
     los mercados citados ("Magic Quadrant for Email Security").
  3. Añade el mercado de Peer Insights a `sources` si la ficha no cita todavía
     ninguna fuente de analista. Nunca sobrescribe nada: solo añade.

Deja en data/analyst-sources.json lo encontrado, incluidos los mercados que el
catálogo aún no cubre, que es la pista para saber qué categorías faltan.
"""

import json
import os
import re
import sys
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urljoin, urlparse

import httpx

from yaml_io import list_all_slugs, read_tool, write_tool

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
OUT_FILE = os.path.join(DATA_DIR, "analyst-sources.json")

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

LINK_RE = re.compile(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', re.S | re.I)
INTERESA = re.compile(r"gartner|magic[-_ ]?quadrant|forrester|wave|idc[-_ ]|marketscape|"
                      r"analyst|recognition|leader", re.I)
DESCARTA = re.compile(r"\.pdf$|/es/|/fr/|/de/|/jp/|/ja/|/zh|linkedin|twitter|facebook|youtube", re.I)

PEER_RE = re.compile(r"gartner\.com/reviews/market/([a-z0-9\-]{4,60})", re.I)
MQ_RE = re.compile(
    r"(?:Magic Quadrant|MQ)\s*(?:for|para)\s+(?:the\s+)?([A-Z][A-Za-z0-9,&/\-\+\. ]{6,70}?)"
    r"(?=[,\.\|<\(\n]|\s+20\d\d|\s*$)", re.I)
WAVE_RE = re.compile(
    r"Forrester Wave[™\s:]*(?:for|:)?\s*([A-Z][A-Za-z0-9,&/\-\+\. ]{6,70}?)"
    r"(?=[,\.\|<\(\n]|\s+Q[1-4]|\s+20\d\d|\s*$)", re.I)

ANALISTAS = ("gartner.com", "forrester.com", "idc.com", "kuppingercole.com")
MAX_PAGINAS = 6


def get(client: httpx.Client, url: str) -> str:
    try:
        r = client.get(url)
        if r.status_code != 200:
            return ""
        return r.text[:400_000]
    except Exception:
        return ""


def sin_etiquetas(html: str) -> str:
    html = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.S | re.I)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html))


def scan(item: tuple) -> dict:
    slug, name, website = item
    host = urlparse(website).netloc
    resultado = {"slug": slug, "name": name, "peer_markets": [], "mq": [], "wave": []}
    with httpx.Client(timeout=20, follow_redirects=True, headers={"User-Agent": UA}) as client:
        home = get(client, f"https://{host}")
        if not home:
            return resultado

        paginas, vistas = [f"https://{host}"], set()
        for href, texto in LINK_RE.findall(home):
            etiqueta = re.sub(r"<[^>]+>", " ", texto)
            if not (INTERESA.search(href) or INTERESA.search(etiqueta)):
                continue
            if DESCARTA.search(href):
                continue
            url = urljoin(f"https://{host}/", href.split("#")[0])
            if urlparse(url).netloc.split(".")[-2:] != host.split(".")[-2:]:
                continue
            if url not in vistas:
                vistas.add(url)
                paginas.append(url)

        peers, mqs, waves = set(), set(), set()
        for url in paginas[:MAX_PAGINAS]:
            html = home if url == f"https://{host}" else get(client, url)
            if not html:
                continue
            peers.update(p.lower() for p in PEER_RE.findall(html))
            texto = sin_etiquetas(html)
            mqs.update(re.sub(r"\s+", " ", m).strip(" .,-") for m in MQ_RE.findall(texto))
            waves.update(re.sub(r"\s+", " ", m).strip(" .,-") for m in WAVE_RE.findall(texto))

    resultado["peer_markets"] = sorted(peers)
    resultado["mq"] = sorted(mqs)
    resultado["wave"] = sorted(waves)
    return resultado


def tiene_fuente_de_analista(tool: dict) -> bool:
    for src in tool.get("sources") or []:
        host = (urlparse(src).hostname or "").removeprefix("www.")
        if any(host.endswith(a) for a in ANALISTAS):
            return True
    return False


def main() -> int:
    tools = []
    for slug in list_all_slugs():
        tool = read_tool(slug)
        if tool and tool.get("website"):
            tools.append((slug, tool.get("name", slug), tool["website"]))

    # Mercados que el catálogo ya cita, para separar lo nuevo de lo conocido
    ya_citados = set()
    for slug in list_all_slugs():
        tool = read_tool(slug) or {}
        for src in tool.get("sources") or []:
            m = PEER_RE.search(src)
            if m:
                ya_citados.add(m.group(1).lower())

    print(f"🔎 Rastreando referencias de analistas en {len(tools)} fabricantes…")
    hallazgos = {}
    with ThreadPoolExecutor(max_workers=8) as pool:
        for r in pool.map(scan, tools):
            if r["peer_markets"] or r["mq"] or r["wave"]:
                hallazgos[r["slug"]] = r

    # Añadir a la ficha el mercado de Peer Insights que publica su propio fabricante
    añadidas = 0
    for slug, r in hallazgos.items():
        if not r["peer_markets"]:
            continue
        tool = read_tool(slug)
        if not tool or tiene_fuente_de_analista(tool):
            continue
        # El primero es suficiente: son el mercado del producto, no una lista
        url = f"https://www.gartner.com/reviews/market/{r['peer_markets'][0]}"
        sources = list(tool.get("sources") or [])
        if url in sources:
            continue
        sources.append(url)
        tool["sources"] = sources
        body = tool.pop("_body", "")
        tool.pop("_raw", None)
        write_tool(slug, tool, body)
        añadidas += 1
        print(f"  + {r['name']}: {url}")

    os.makedirs(DATA_DIR, exist_ok=True)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(hallazgos, f, indent=1, ensure_ascii=False, sort_keys=True)

    mercados = Counter(m for r in hallazgos.values() for m in r["peer_markets"])
    print(f"\n{len(hallazgos)} de {len(tools)} fabricantes publican referencias de analistas")
    print(f"{añadidas} fichas se quedan con una fuente de analista que no tenían")
    print(f"{len(mercados)} mercados de Peer Insights distintos enlazados desde webs de fabricantes:")
    for m, n in mercados.most_common():
        marca = "" if m in ya_citados else "  ← el catálogo no lo cita"
        print(f"  {n:3}  {m}{marca}")

    # Lo que de verdad interesa vigilar: el mercado que el sector nombra y este
    # catálogo no. Unas veces es una categoría que falta (exposure assessment,
    # seguridad de la cadena de suministro) y otras es el mismo mercado de
    # siempre con nombre nuevo —Gartner rebautizó los firewalls de red como
    # "hybrid mesh firewall"—, y en ese caso lo que hay que actualizar es la URL
    # que citan las fichas.
    nuevos = sorted(set(mercados) - ya_citados)
    if nuevos:
        print(f"\n⚠️  {len(nuevos)} mercados que el catálogo todavía no cita:")
        for m in nuevos:
            print(f"    https://www.gartner.com/reviews/market/{m}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
