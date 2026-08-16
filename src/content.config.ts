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
  "SOC 2",
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
  "ISO 42001",
  "FIPS 140-2",
  "FIPS 140-2 Nivel 3",
  "FIPS 140-3",
  "Common Criteria",
  "Common Criteria EAL4+",
  "WebTrust",
] as const;

/**
 * `z.string().url()` acepta cualquier esquema, incluido `javascript:`: una URL
 * así, escrita por el pipeline automático en un .md, se convertiría en un enlace
 * ejecutable en la ficha. Todas las URLs del catálogo deben ser http(s).
 */
const httpUrl = (msg = "URL inválida: debe empezar por http:// o https://") =>
  z.string().url(msg).refine(
    v => { try { return ["http:", "https:"].includes(new URL(v).protocol); } catch { return false; } },
    msg,
  );

/** Los logos son rutas locales servidas por el propio sitio, nunca URLs externas. */
const localPath = z.string().refine(
  v => v.startsWith("/") && !v.startsWith("//") && !v.includes(":"),
  "El logo debe ser una ruta local del sitio (empezando por /)",
);

export const toolsCollection = defineCollection({
  type: "content",
  schema: z.object({
    slug: z.string().optional(),
    name: z.string().min(1, "El nombre es obligatorio"),
    category: z.string().optional(), // legacy — single category, kept for backwards compat
    categories: z.array(z.string()).default([]), // new — multiple categories per tool
    tags: z.array(z.string()).min(1, "Al menos una etiqueta"),
    type: z.enum(TOOL_TYPES),
    cost_model: z.enum(COST_MODELS).optional(),
    cost_details: z.string().optional(),
    website: httpUrl("URL del sitio web inválida"),
    description: z.string().min(1, "La descripción es obligatoria"),
    why_reference: z.string().min(1, "Indica por qué es referente"),
    certifications: z.array(z.string()).default([]),
    company_size: z.array(z.enum(COMPANY_SIZES)).default([]),
    /**
     * Puesto de mercado, **por categoría**: `{ "enterprise-backup": 3 }`.
     *
     * Era un único número por herramienta, y como una ficha pertenece a varias
     * categorías el dato no podía ser correcto en todas a la vez: backup
     * corporativo llegó a mostrar dos "#1" porque cada uno lo era en otro
     * mercado. `compute_rankings.py` lo agravaba escribiendo el campo una vez
     * por categoría, así que sobrevivía el de la última procesada.
     *
     * Se acepta todavía un número suelto por compatibilidad: se interpreta como
     * el puesto en la categoría principal (la primera de `categories`).
     */
    market_rank: z
      .union([
        z.number().int().positive(),
        z.record(z.string(), z.number().int().positive()),
      ])
      .nullable()
      .optional(),
    logo: localPath.nullable().optional(),
    repo: httpUrl().nullable().optional(),
    license: z.string().nullable().optional(),
    cert_url: httpUrl().nullable().optional(),
    sources: z.array(httpUrl()).default([]),
    /**
     * Fecha de alta en el directorio. Es un dato distinto de `last_verified`:
     * el pipeline semanal reescribe la verificación de todas las fichas a la
     * vez, así que sin este campo no había forma de saber cuál era realmente
     * nueva — y la portada acababa marcando las 182 como "Nuevo".
     * No lo toca el pipeline: se escribe una sola vez, al crear la ficha.
     */
    first_added: z.coerce.date().optional(),
    last_verified: z.coerce.date().optional(),
    needs_review: z.boolean().default(false),
  }),
});

export const collections = {
  tools: toolsCollection,
};
