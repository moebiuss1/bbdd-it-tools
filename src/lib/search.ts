import MiniSearch from "minisearch";
import type { SearchIndexEntry } from "@tipos/tool";

/**
 * Configuración compartida de MiniSearch usada en build-time y runtime.
 */
export const SEARCH_OPTIONS = {
  fields: ["name", "description", "tags", "category", "certifications", "why_reference"],
  storeFields: ["id", "slug", "name", "category", "tags", "type", "market_rank"],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    // AND, no OR: con OR, "copia de seguridad inmutable" devolvía 326 de 327
    // herramientas —cualquiera que contuviera "de"— y el buscador parecía roto.
    combineWith: "AND" as const,
    boost: {
      name: 3,
      tags: 2,
      category: 2,
      certifications: 1.5,
      description: 1,
      why_reference: 0.7,
    },
  },
};

/**
 * Busca herramientas y devuelve el conjunto de slugs que casan, o `null` si la
 * consulta está vacía (equivale a "no filtrar").
 *
 * Exigir todos los términos es lo correcto para una consulta descriptiva, pero
 * deja sin resultados a quien mezcla sinónimos ("antivirus endpoint linux").
 * Por eso, si AND no devuelve nada, se reintenta con OR y se recorta a los
 * resultados cercanos al mejor: filtrar de menos es un fallo tan visible como
 * no filtrar.
 */
export function searchSlugs(mini: MiniSearch, query: string): Set<string> | null {
  const q = query.trim();
  if (!q) return null;

  let hits = mini.search(q, { ...SEARCH_OPTIONS.searchOptions, combineWith: "AND" });

  if (hits.length === 0) {
    const loose = mini.search(q, { ...SEARCH_OPTIONS.searchOptions, combineWith: "OR" });
    if (loose.length > 0) {
      const best = loose[0].score;
      hits = loose.filter(h => h.score >= best * 0.45).slice(0, 40);
    }
  }

  return new Set(hits.map(h => String((h as unknown as { slug: string }).slug)));
}

/**
 * Construye un índice MiniSearch a partir de una lista de herramientas.
 */
export function buildSearchIndex(tools: SearchIndexEntry[]): MiniSearch {
  const miniSearch = new MiniSearch(SEARCH_OPTIONS);
  miniSearch.addAll(tools);
  return miniSearch;
}

/**
 * Serializa un índice para almacenarlo como JSON estático.
 */
export function serializeIndex(miniSearch: MiniSearch): string {
  return JSON.stringify(miniSearch);
}

/**
 * Reconstruye un índice desde JSON.
 */
export function loadIndex(json: string): MiniSearch {
  return MiniSearch.loadJSON(json, SEARCH_OPTIONS);
}
