import type { ToolEntry, Category, Tag, RankingEntry } from "@tipos/tool";

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
