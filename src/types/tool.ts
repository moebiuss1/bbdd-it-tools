export type CompanySize = "pequeña" | "mediana" | "grande";
export type ToolType = "opensource" | "comercial";
export type CostModel =
  | "gratis"
  | "freemium"
  | "suscripción"
  | "licencia-perpetua"
  | "pago-por-uso"
  | "presupuesto-personalizado";

export interface ToolFrontmatter {
  name: string;
  slug?: string;
  category?: string;
  categories: string[];
  tags: string[];
  type: ToolType;
  cost_model?: CostModel;
  cost_details?: string;
  website: string;
  description: string;
  why_reference: string;
  certifications: string[];
  company_size: CompanySize[];
  market_rank?: number;
  logo?: string;
  repo?: string;
  license?: string;
  cert_url?: string;
  sources: string[];
  /** Alta en el directorio — no se reescribe nunca (ver content.config.ts) */
  first_added?: Date;
  last_verified?: Date;
  needs_review: boolean;
}

export interface ToolEntry {
  id: string;
  slug: string;
  body: string;
  data: ToolFrontmatter;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  family: string;
  icon: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface RankingEntry {
  slug: string;
  rank: number;
  score: number;
  tier: "Líder" | "Visionario" | "Retador" | "Nicho";
}

export interface SearchIndexEntry {
  id: string;
  slug: string;
  name: string;
  category: string;
  tags: string[];
  type: ToolType;
  market_rank?: number;
  description: string;
  certifications: string[];
  /** Texto editorial: mejora el recall de las búsquedas en español */
  why_reference: string;
}
