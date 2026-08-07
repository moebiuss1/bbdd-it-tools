"""
Lectura, escritura y merge idempotente de archivos Markdown con frontmatter YAML.

Regla de merge: los scripts NUNCA sobrescriben campos que ya tienen valor.
Solo rellenan campos vacíos, actualizan last_verified, y añaden a listas.
"""

import os
import re
import yaml
from datetime import date
from typing import Optional
from slugify import slugify

# Ruta a los tools markdown
TOOLS_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "..",
    "src",
    "content",
    "tools",
)

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n(.*)", re.DOTALL)


def slugify_name(name: str) -> str:
    """Genera un slug kebab-case a partir del nombre."""
    return slugify(name, lowercase=True)


def tool_path(slug: str) -> str:
    """Ruta completa al archivo .md de una herramienta."""
    return os.path.join(TOOLS_DIR, f"{slug}.md")


def read_tool(slug: str) -> Optional[dict]:
    """Lee el frontmatter de una herramienta. Retorna None si no existe."""
    path = tool_path(slug)
    if not os.path.exists(path):
        return None

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    match = FRONTMATTER_RE.match(content)
    if not match:
        return None

    try:
        frontmatter = yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError:
        frontmatter = {}

    frontmatter["_body"] = match.group(2).strip()
    frontmatter["_raw"] = content
    return frontmatter


def write_tool(slug: str, frontmatter: dict, body: str = "") -> str:
    """Escribe una herramienta al disco. Retorna la ruta del archivo."""
    path = tool_path(slug)
    os.makedirs(TOOLS_DIR, exist_ok=True)

    # Eliminar claves internas
    fm = {k: v for k, v in frontmatter.items() if not k.startswith("_")}

    yaml_str = yaml.dump(
        fm,
        default_flow_style=False,
        allow_unicode=True,
        sort_keys=False,
        width=120,
    ).strip()

    content = f"---\n{yaml_str}\n---\n\n{body}\n"
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

    return path


def merge_frontmatter(
    existing: Optional[dict],
    new_data: dict,
    preserve_lists: bool = True,
) -> dict:
    """
    Merge idempotente: solo rellena campos vacíos en `existing`.
    - Campos escalares: solo se copian si existing está vacío/None
    - Listas: se concatenan (sin duplicados) si preserve_lists=True
    - last_verified: siempre se actualiza
    - name y slug: solo se protegen si ya existen (no se sobrescriben)
    """
    if existing is None:
        existing = {}

    # Campos que no se sobrescriben si ya tienen valor
    protected_if_exists = {"name", "slug"}
    always_skip = {"_body", "_raw"}

    merged = dict(existing)

    for key, value in new_data.items():
        if key in always_skip:
            continue
        if key.startswith("_"):
            continue

        existing_val = existing.get(key)

        # Proteger name/slug solo si ya existen
        if key in protected_if_exists and existing_val:
            continue

        if existing_val is None or existing_val == "" or existing_val == []:
            merged[key] = value
        elif isinstance(existing_val, list) and isinstance(value, list) and preserve_lists:
            combined = list(existing_val)
            for item in value:
                if item not in combined:
                    combined.append(item)
            merged[key] = combined

    # Siempre actualizar last_verified
    merged["last_verified"] = date.today().isoformat()

    return merged


def list_all_slugs() -> list[str]:
    """Lista todos los slugs de herramientas existentes."""
    if not os.path.exists(TOOLS_DIR):
        return []
    return [
        f.replace(".md", "")
        for f in os.listdir(TOOLS_DIR)
        if f.endswith(".md")
    ]


def format_description(text: str, max_len: int = 300) -> str:
    """Formatea una descripción para el frontmatter (una línea o folded block)."""
    text = text.strip().replace("\n", " ").replace('"', "'")
    if len(text) > max_len:
        text = text[:max_len].rsplit(" ", 1)[0] + "."
    return text
