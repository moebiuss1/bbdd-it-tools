import { defineCollection, z } from "astro:content";

const COMPANY_SIZES = ["pequeña", "mediana", "grande"] as const;
const TOOL_TYPES = ["opensource", "comercial"] as const;
const COST_MODELS = [
  "gratis",
  "freemium",
  "suscripción",
  "licencia-perpetua",
  "pago-por-uso",
  "presupuesto-personalizado",
] as const;

export const KNOWN_CERTIFICATIONS = [
  "ISO 27001",
  "ISO 27017",
  "ISO 27018",
  "ISO 27701",
  "ISO 22301",
  "ISO 9001",
  "SOC 1",
  "SOC 2 Tipo I",
  "SOC 2 Tipo II",
  "SOC 3",
  "ENS Básica",
  "ENS Media",
  "ENS Alta",
  "RGPD / GDPR",
  "HIPAA",
  "PCI DSS",
  "FedRAMP",
  "CSA STAR Nivel 1",
  "CSA STAR Nivel 2",
  "C5",
  "CIS Controls",
  "IRAP",
  "Cyber Essentials",
  "CCN-STIC",
  "OWASP",
] as const;

export const toolsCollection = defineCollection({
  type: "content",
  schema: z.object({
    slug: z.string().optional(),
    name: z.string().min(1, "El nombre es obligatorio"),
    category: z.string().min(1, "La categoría es obligatoria"),
    tags: z.array(z.string()).min(1, "Al menos una etiqueta"),
    type: z.enum(TOOL_TYPES),
    cost_model: z.enum(COST_MODELS).optional(),
    cost_details: z.string().optional(),
    website: z.string().url("URL del sitio web inválida"),
    description: z.string().min(1, "La descripción es obligatoria"),
    why_reference: z.string().min(1, "Indica por qué es referente"),
    certifications: z.array(z.string()).default([]),
    company_size: z.array(z.enum(COMPANY_SIZES)).default([]),
    market_rank: z.number().int().positive().nullable().optional(),
    logo: z.string().nullable().optional(),
    repo: z.string().url().nullable().optional(),
    license: z.string().nullable().optional(),
    sources: z.array(z.string().url()).default([]),
    last_verified: z.coerce.date().optional(),
    needs_review: z.boolean().default(false),
  }),
});

export const collections = {
  tools: toolsCollection,
};
