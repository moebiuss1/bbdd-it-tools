"""
Modelos Pydantic v2 para validación de herramientas IT.
Espejo del schema Zod en src/content.config.ts
"""

from datetime import date, datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field, HttpUrl


class ToolType(str, Enum):
    OPENSOURCE = "opensource"
    COMERCIAL = "comercial"


class CostModel(str, Enum):
    GRATIS = "gratis"
    FREEMIUM = "freemium"
    SUSCRIPCION = "suscripción"
    LICENCIA_PERPETUA = "licencia-perpetua"
    PAGO_POR_USO = "pago-por-uso"
    PRESUPUESTO_PERSONALIZADO = "presupuesto-personalizado"


class CompanySize(str, Enum):
    PEQUENA = "pequeña"
    MEDIANA = "mediana"
    GRANDE = "grande"


class RankingTier(str, Enum):
    LIDER = "Líder"
    VISIONARIO = "Visionario"
    RETADOR = "Retador"
    NICHO = "Nicho"


class Candidate(BaseModel):
    """Herramienta candidata descubierta por los scrapers."""
    name: str
    slug: Optional[str] = None  # se genera si no existe
    category: str
    website: Optional[str] = None
    description: Optional[str] = None
    source_type: str  # "gartner", "editorial", "community", "github", "web_search"
    source_url: Optional[str] = None
    mention_context: Optional[str] = None  # snippet de dónde se encontró


class CandidateStore(BaseModel):
    """Almacén persistente de candidatos con contadores."""
    candidates: dict[str, Candidate] = Field(default_factory=dict)
    mention_counts: dict[str, dict[str, int]] = Field(default_factory=dict)
    # slug -> {source_type: count}


class ToolFrontmatter(BaseModel):
    """Schema completo de una herramienta (frontmatter YAML)."""
    name: str
    slug: str
    category: str
    tags: list[str] = Field(min_length=1)
    type: ToolType
    cost_model: Optional[CostModel] = None
    cost_details: Optional[str] = None
    website: str
    description: str
    why_reference: str
    certifications: list[str] = Field(default_factory=list)
    company_size: list[CompanySize] = Field(default_factory=list)
    market_rank: Optional[int] = None
    logo: Optional[str] = None
    repo: Optional[str] = None
    license: Optional[str] = None
    sources: list[str] = Field(default_factory=list)
    first_added: Optional[date] = None
    last_verified: Optional[date] = None
    needs_review: bool = False


class RankingEntry(BaseModel):
    """Entrada de ranking para una categoría."""
    slug: str
    rank: int
    score: int
    tier: RankingTier


class UpdateReport(BaseModel):
    """Reporte generado tras cada ejecución del pipeline."""
    run_date: date
    tools_added: int = 0
    tools_updated: int = 0
    tools_unchanged: int = 0
    tools_flagged_review: int = 0
    logos_fetched: int = 0
    errors: list[str] = Field(default_factory=list)
    new_tools: list[str] = Field(default_factory=list)
    updated_tools: list[str] = Field(default_factory=list)
