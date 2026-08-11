import type { ToolEntry, Category, Tag, RankingEntry, ToolFrontmatter } from "@tipos/tool";

/**
 * Devuelve las categorías de una herramienta, con fallback al campo legacy `category`.
 * OJO: `data.categories` por defecto es `[]` (no undefined), así que un simple
 * `data.categories || [data.category]` NUNCA cae al fallback (un array vacío es truthy
 * en JS) y la herramienta desaparecería de cualquier listado agrupado por categoría.
 */
export function getToolCategories(data: Pick<ToolFrontmatter, "categories" | "category">): string[] {
  if (data.categories && data.categories.length > 0) return data.categories;
  return data.category ? [data.category] : [];
}

export interface ScoreAxis {
  label: string;
  value: number;
  max: number;
  detail: string;
}

/**
 * Ejes de la puntuación BBDD IT (0-100). Única fuente de verdad: el total, el
 * desglose de la ficha y los rankings salen todos de aquí.
 *
 * La versión anterior repartía 30 de los 100 puntos entre certificaciones de
 * producto, algo que un proyecto open source no tiene ni necesita tener: Keycloak
 * y HashiCorp Vault —referentes indiscutibles de su categoría— puntuaban 15-20
 * sobre 100, y la media del open source quedaba 16 puntos por debajo de la del
 * software comercial. La puntuación medía el modelo de negocio, no la solvencia.
 *
 * Ahora el eje de garantías admite la evidencia que cada modelo puede aportar:
 * certificaciones auditadas en el comercial, código y licencia públicos en el
 * open source. El resto de ejes (posición, fuentes, frescura, completitud de la
 * ficha) se aplican por igual a ambos.
 */
export function scoreAxes(data: ToolFrontmatter, body = ""): ScoreAxis[] {
  const isOpenSource = data.type === "opensource";
  const certs = data.certifications?.length ?? 0;

  // Una nota del propio fabricante no es evidencia independiente: solo cuentan
  // las fuentes alojadas fuera de su dominio (analistas, laboratorios, prensa).
  const vendorHost = (() => {
    try { return new URL(data.website).hostname.replace(/^www\./, ""); } catch { return ""; }
  })();
  const sources = (data.sources ?? []).filter(url => {
    try { return new URL(url).hostname.replace(/^www\./, "") !== vendorHost; } catch { return false; }
  }).length;

  // 1. Posición de mercado (30) — decrece 3,5 puntos por puesto, suelo de 5
  const rankValue = data.market_rank
    ? Math.max(5, Math.round(30 - (data.market_rank - 1) * 3.5))
    : 8;

  // 2. Garantías verificables (25) — misma exigencia, evidencia distinta
  let guaranteeValue: number;
  let guaranteeDetail: string;
  if (isOpenSource) {
    const repoPts = data.repo ? 10 : 0;
    const licensePts = data.license ? 7 : 0;
    const certPts = Math.min(certs * 4, 8);
    guaranteeValue = Math.min(25, repoPts + licensePts + certPts);
    guaranteeDetail = [
      data.repo ? "código público" : "sin repositorio declarado",
      data.license ? `licencia ${data.license}` : "sin licencia declarada",
      certs > 0 ? `${certs} certificaciones` : null,
    ].filter(Boolean).join(", ");
  } else {
    const certPts = Math.min(certs * 5, 20);
    const urlPts = data.cert_url ? 5 : 0;
    guaranteeValue = certPts + urlPts;
    guaranteeDetail = certs > 0
      ? `${certs} certificaciones${data.cert_url ? ", verificables en la web del fabricante" : ", sin página pública de verificación"}`
      : "sin certificaciones declaradas";
  }

  // 3. Fuentes independientes (20)
  const sourcesValue = Math.min(sources * 5, 20);

  // 4. Actualización del dato (10)
  const days = data.last_verified
    ? (Date.now() - new Date(data.last_verified as unknown as string).getTime()) / 86400000
    : null;
  const freshnessValue = days === null ? 0 : days < 30 ? 10 : days < 90 ? 8 : days < 180 ? 5 : 2;

  // 5. Completitud de la ficha (15) — lo que este directorio sí controla
  const completeness = [
    { ok: body.trim().length >= 300, pts: 5 },
    { ok: (data.why_reference ?? "").length >= 80, pts: 3 },
    { ok: !!data.cost_details, pts: 2 },
    { ok: !!data.logo, pts: 2 },
    { ok: !!(data.cert_url || data.repo), pts: 3 },
  ];
  const completenessValue = data.needs_review
    ? 0
    : completeness.reduce((n, c) => n + (c.ok ? c.pts : 0), 0);

  return [
    {
      label: "Posición de mercado",
      value: rankValue,
      max: 30,
      detail: data.market_rank ? `Puesto #${data.market_rank} en su categoría` : "Sin posición asignada",
    },
    {
      label: isOpenSource ? "Transparencia" : "Garantías auditadas",
      value: guaranteeValue,
      max: 25,
      detail: guaranteeDetail,
    },
    {
      label: "Fuentes independientes",
      value: sourcesValue,
      max: 20,
      detail: sources > 0
        ? `${sources} fuentes externas al fabricante`
        : "sin fuentes independientes del fabricante",
    },
    {
      label: "Actualización",
      value: freshnessValue,
      max: 10,
      detail: data.last_verified
        ? `Verificado el ${new Date(data.last_verified).toLocaleDateString("es-ES")}`
        : "Sin fecha de verificación",
    },
    {
      label: "Ficha completa",
      value: completenessValue,
      max: 15,
      detail: data.needs_review
        ? "Ficha marcada como pendiente de revisión"
        : `${completeness.filter(c => c.ok).length} de ${completeness.length} apartados completos`,
    },
  ];
}

/**
 * Puntuación compuesta BBDD IT (0-100) para una herramienta.
 * Única fuente de verdad — usada en el directorio, la ficha de detalle y los rankings.
 */
export function computeToolScore(data: ToolFrontmatter, body = ""): number {
  return Math.min(100, scoreAxes(data, body).reduce((n, a) => n + a.value, 0));
}

/** Desglose detallado de computeToolScore(), para mostrar en la ficha de detalle. */
export function scoreBreakdown(data: ToolFrontmatter, body = "") {
  return scoreAxes(data, body);
}

/**
 * Obtiene etiquetas únicas con su frecuencia entre todas las herramientas.
 */
export function getTagCounts(tools: ToolEntry[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const tool of tools) {
    for (const tag of tool.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

/**
 * Ordena herramientas por ranking (si existe) o alfabéticamente.
 */
export function sortTools(
  tools: ToolEntry[],
  sortBy: "rank" | "name" | "updated" = "rank"
): ToolEntry[] {
  return [...tools].sort((a, b) => {
    if (sortBy === "rank") {
      return (a.data.market_rank ?? 999) - (b.data.market_rank ?? 999);
    }
    if (sortBy === "name") {
      return a.data.name.localeCompare(b.data.name, "es");
    }
    const da = a.data.last_verified
      ? new Date(a.data.last_verified).getTime()
      : 0;
    const db = b.data.last_verified
      ? new Date(b.data.last_verified).getTime()
      : 0;
    return db - da;
  });
}

/**
 * Carga las categorías desde el módulo de datos.
 */
export async function getCategories(): Promise<Category[]> {
  const mod = await import("@data/categories");
  return mod.default as Category[];
}

export async function getFamilies(): Promise<any[]> {
  const mod = await import("@data/categories");
  return mod.families as any[];
}

/**
 * Carga las etiquetas globales desde el módulo de datos.
 */
export async function getTags(): Promise<Tag[]> {
  const mod = await import("@data/tags");
  return mod.default as Tag[];
}

/**
 * Carga los rankings desde el módulo de datos.
 */
export async function getRankings(): Promise<Record<string, RankingEntry[]>> {
  try {
    const mod = await import("@data/rankings");
    return mod.default as Record<string, RankingEntry[]>;
  } catch {
    return {};
  }
}

/**
 * Convierte entradas de Astro content collection a ToolEntry.
 */
/** Limpia la extensión .md del id de Astro para usarlo como slug */
function cleanSlug(id: string): string {
  return id.replace(/\.md$/, "");
}

export function toToolEntry(entry: {
  id: string;
  body?: string;
  data: Record<string, any>;
}): ToolEntry {
  const slug = entry.data.slug ? cleanSlug(entry.data.slug) : cleanSlug(entry.id);
  return {
    id: entry.id,
    slug,
    body: entry.body ?? "",
    data: {
      ...entry.data,
      slug,
      last_verified: entry.data.last_verified ?? undefined,
    },
  } as ToolEntry;
}
