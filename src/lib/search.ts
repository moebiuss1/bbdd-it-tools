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
    combineWith: "OR" as const,
    boost: {
      name: 3,
      tags: 2,
      category: 2,
      certifications: 1.5,
      description: 1,
      why_reference: 0.5,
    },
  },
};

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
