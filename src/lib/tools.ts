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

/**
 * Puntuación compuesta BBDD IT (0-100) para una herramienta.
 * Única fuente de verdad — usada en el directorio, la ficha de detalle y los rankings.
 */
export function computeToolScore(data: ToolFrontmatter): number {
  const rankScore = data.market_rank ? Math.max(0, 40 - (data.market_rank - 1) * 5) : 10;
  const certScore = Math.min((data.certifications?.length ?? 0) * 6, 30);
  const sourcesScore = Math.min((data.sources?.length ?? 0) * 5, 20);
  const freshnessScore = data.last_verified
    ? (() => {
        const days = (Date.now() - new Date(data.last_verified as unknown as string).getTime()) / 86400000;
        return days < 30 ? 10 : days < 90 ? 7 : days < 180 ? 5 : 3;
      })()
    : 0;
  return Math.min(100, rankScore + certScore + sourcesScore + freshnessScore);
}

/** Desglose detallado de computeToolScore(), para mostrar en la ficha de detalle. */
export function scoreBreakdown(data: ToolFrontmatter) {
  const rankScore = data.market_rank ? Math.max(0, 40 - (data.market_rank - 1) * 5) : 10;
  const certScore = Math.min((data.certifications?.length ?? 0) * 6, 30);
  const sourcesScore = Math.min((data.sources?.length ?? 0) * 5, 20);
  const freshnessScore = data.last_verified
    ? (() => {
        const days = (Date.now() - new Date(data.last_verified as unknown as string).getTime()) / 86400000;
        return days < 30 ? 10 : days < 90 ? 7 : days < 180 ? 5 : 3;
      })()
    : 0;
  return [
    { label: "Ranking de mercado", value: rankScore, max: 40, detail: data.market_rank ? `Posición #${data.market_rank} en su categoría` : "Sin ranking asignado" },
    { label: "Certificaciones", value: certScore, max: 30, detail: `${data.certifications?.length ?? 0} certificaciones verificadas` },
    { label: "Fuentes", value: sourcesScore, max: 20, detail: `${data.sources?.length ?? 0} fuentes referenciadas` },
    { label: "Actualización", value: freshnessScore, max: 10, detail: data.last_verified ? `Verificado el ${new Date(data.last_verified).toLocaleDateString("es-ES")}` : "Sin fecha de verificación" },
  ];
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
