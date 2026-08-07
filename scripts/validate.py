"""
Validador pre-build: verifica que todas las herramientas cumplan el schema.
Falla con exit code 1 si hay errores (para que GitHub Actions detenga el pipeline).
"""

import os
import re
import sys
from datetime import date

from models import ToolFrontmatter, ToolType, CostModel, CompanySize
from yaml_io import read_tool, list_all_slugs, TOOLS_DIR

LOGO_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "public", "logos"
)


def validate_all() -> list[str]:
    """Valida todas las herramientas. Retorna lista de errores."""
    errors = []
    slugs = list_all_slugs()

    if not slugs:
        errors.append("❌ No se encontraron herramientas en src/content/tools/")
        return errors

    for slug in slugs:
        tool = read_tool(slug)
        if not tool:
            errors.append(f"❌ [{slug}] No se pudo leer el archivo")
            continue

        name = tool.get("name", slug)
        prefix = f"[{name}]"

        # Campos obligatorios
        required = ["name", "slug", "category", "tags", "type", "website", "description", "why_reference"]
        for field in required:
            if not tool.get(field):
                errors.append(f"❌ {prefix} Falta campo obligatorio: {field}")

        # Tipo válido
        tool_type = tool.get("type", "")
        if tool_type not in [e.value for e in ToolType]:
            errors.append(f"❌ {prefix} Tipo inválido: '{tool_type}'")

        # Tags mínimo 1
        tags = tool.get("tags", [])
        if not isinstance(tags, list) or len(tags) < 1:
            errors.append(f"❌ {prefix} Debe tener al menos 1 tag")

        # URL válida
        website = tool.get("website", "")
        if website and not (website.startswith("http://") or website.startswith("https://")):
            errors.append(f"❌ {prefix} URL inválida: {website}")

        # Logo existe
        logo = tool.get("logo", "")
        if logo:
            logo_path = os.path.join(LOGO_DIR, os.path.basename(logo))
            if not os.path.exists(logo_path):
                errors.append(f"⚠️  {prefix} Logo no encontrado en disco: {logo}")

        # Open source debe tener repo y licencia
        if tool_type == ToolType.OPENSOURCE.value:
            if not tool.get("repo"):
                errors.append(f"⚠️  {prefix} Open Source sin URL de repositorio")
            if not tool.get("license"):
                errors.append(f"⚠️  {prefix} Open Source sin licencia especificada")

        # last_verified formato fecha
        last_verified = tool.get("last_verified")
        if last_verified:
            try:
                date.fromisoformat(str(last_verified))
            except (ValueError, TypeError):
                errors.append(f"⚠️  {prefix} last_verified no es fecha ISO: {last_verified}")

    return errors


if __name__ == "__main__":
    print("🔍 Validando herramientas...")
    errors = validate_all()

    if errors:
        print(f"\n❌ {len(errors)} errores encontrados:\n")
        for e in errors:
            print(f"  {e}")
        print(f"\n⚠️  Pipeline detenido por errores de validación.")
        sys.exit(1)
    else:
        slugs = list_all_slugs()
        print(f"\n✅ {len(slugs)} herramientas validadas correctamente.")
