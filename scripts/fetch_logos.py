"""
Descarga y normaliza logos de herramientas.
Cadena de fuentes:
1. Clearbit Logo API (logo.clearbit.com)
2. DuckDuckGo favicon
3. Google favicon
4. Logo no encontrado -> se deja vacío (el frontend usa monograma)
"""

import os
import sys
import time
from datetime import date, timedelta
from urllib.parse import urlparse

import httpx
import yaml
from PIL import Image
from io import BytesIO

from yaml_io import read_tool, write_tool, list_all_slugs

LOGO_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "public", "logos"
)
CONFIG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.yaml")
LOGO_SIZE = (128, 128)


def load_config() -> dict:
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def fetch_image(url: str, config: dict) -> bytes | None:
    """Descarga una imagen desde una URL."""
    time.sleep(0.5)
    try:
        with httpx.Client(
            timeout=10,
            headers={"User-Agent": config.get("search", {}).get("user_agent", "BBDD-IT-Tools/1.0")},
            follow_redirects=True,
        ) as client:
            resp = client.get(url)
            if resp.status_code == 200:
                content_type = resp.headers.get("content-type", "")
                if "image" in content_type or url.endswith((".png", ".ico", ".svg")):
                    return resp.content
    except Exception:
        pass
    return None


def normalize_logo(image_bytes: bytes, slug: str) -> str | None:
    """
    Normaliza una imagen a PNG 128x128 con fondo blanco.
    Retorna el nombre del archivo o None si falla.
    """
    try:
        img = Image.open(BytesIO(image_bytes))
        img = img.convert("RGBA")

        # Crear canvas blanco
        canvas = Image.new("RGBA", LOGO_SIZE, (255, 255, 255, 255))

        # Redimensionar manteniendo aspect ratio
        img.thumbnail(LOGO_SIZE, Image.LANCZOS)

        # Centrar en canvas
        x = (LOGO_SIZE[0] - img.width) // 2
        y = (LOGO_SIZE[1] - img.height) // 2
        canvas.paste(img, (x, y), img if img.mode == "RGBA" else None)

        # Guardar como PNG
        filename = f"{slug}.png"
        filepath = os.path.join(LOGO_DIR, filename)
        canvas = canvas.convert("RGB")  # quitar alpha para PNG más pequeño
        canvas.save(filepath, "PNG", optimize=True)

        return filename
    except Exception as e:
        print(f"    ⚠ Error normalizando logo: {e}", file=sys.stderr)
        return None


def fetch_logo(slug: str, website: str, config: dict) -> str | None:
    """
    Intenta descargar el logo de una herramienta desde múltiples fuentes.
    Retorna el nombre del archivo o None.
    """
    if not website:
        return None

    try:
        domain = urlparse(website).netloc
    except Exception:
        return None

    if not domain:
        return None

    # Fuente 1: Clearbit Logo API
    clearbit_url = f"https://logo.clearbit.com/{domain}?size=128"
    img = fetch_image(clearbit_url, config)
    if img and len(img) > 100:
        result = normalize_logo(img, slug)
        if result:
            print(f"    ✅ Clearbit: {clearbit_url}")
            return result

    # Fuente 2: DuckDuckGo favicon
    ddg_url = f"https://icons.duckduckgo.com/ip3/{domain}.ico"
    img = fetch_image(ddg_url, config)
    if img and len(img) > 100:
        result = normalize_logo(img, slug)
        if result:
            print(f"    ✅ DuckDuckGo: {ddg_url}")
            return result

    # Fuente 3: Google favicon
    google_url = f"https://www.google.com/s2/favicons?domain={domain}&sz=128"
    img = fetch_image(google_url, config)
    if img and len(img) > 100:
        result = normalize_logo(img, slug)
        if result:
            print(f"    ✅ Google: {google_url}")
            return result

    print(f"    ❌ No se encontró logo para {domain}")
    return None


def fetch_all_logos(config: dict) -> int:
    """
    Descarga logos para todas las herramientas que no tengan uno.
    Solo procesa si el logo actual no existe o tiene más de 7 días.
    """
    os.makedirs(LOGO_DIR, exist_ok=True)
    slugs = list_all_slugs()
    fetched = 0
    today = date.today()

    for slug in slugs:
        tool = read_tool(slug)
        if not tool:
            continue

        logo = tool.get("logo", "")
        logo_path = os.path.join(LOGO_DIR, logo) if logo else None

        # Saltar si ya tiene logo y es reciente
        if logo and logo_path and os.path.exists(logo_path):
            last_verified = tool.get("last_verified")
            if last_verified:
                try:
                    lv = date.fromisoformat(str(last_verified))
                    if (today - lv).days < 7:
                        continue
                except (ValueError, TypeError):
                    pass

        website = tool.get("website", "")
        if not website:
            continue

        print(f"  🖼️  {tool.get('name', slug)[:60]}")
        logo_file = fetch_logo(slug, website, config)

        if logo_file:
            # Actualizar frontmatter
            tool["logo"] = f"/logos/{logo_file}"
            body = tool.pop("_body", "")
            write_tool(slug, tool, body)
            fetched += 1

    return fetched


if __name__ == "__main__":
    config = load_config()
    count = fetch_all_logos(config)
    print(f"\n📊 Logos descargados: {count}")
