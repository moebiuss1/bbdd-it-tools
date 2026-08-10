import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import type { SearchIndexEntry } from "@tipos/tool";
import { toToolEntry } from "@lib/tools";
import { buildSearchIndex, serializeIndex } from "@lib/search";

export const GET: APIRoute = async () => {
  const rawTools = await getCollection("tools");
  const tools = rawTools.map(toToolEntry);

  const entries: SearchIndexEntry[] = tools.map((t) => ({
    id: t.id,
    slug: t.slug,
    name: t.data.name,
    category: (t.data.categories?.[0] || t.data.category || ''),
    tags: t.data.tags,
    type: t.data.type,
    market_rank: t.data.market_rank ?? undefined,
    description: t.data.description,
    certifications: t.data.certifications,
  }));

  const index = buildSearchIndex(entries);
  const json = serializeIndex(index);

  return new Response(json, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
