/**
 * Datos de comparación, uno por herramienta.
 *
 * La comparativa se arma en el navegador (GitHub Pages no tiene servidor y las
 * combinaciones de tres herramientas sobre 182 no se pueden pregenerar), así
 * que necesita los datos aparte. Se sirve en su propio fichero y no dentro del
 * HTML de /comparar porque son ~180 KB que solo hacen falta en esa página.
 *
 * Todo lo que va aquí sale de las mismas funciones que usan las fichas
 * (`computeToolScore`, `scoreBreakdown`, `dataGaps`): la comparativa no puede
 * decir una puntuación distinta de la que muestra la ficha.
 */
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import {
  toToolEntry, getToolCategories, getCategories, computeToolScore,
  scoreBreakdown, dataGaps, independentSourceCount, categorySizes, bestPublishableRank,
} from "@lib/tools";
import { COST_MODEL_LABELS, COMPANY_SIZE_LABELS, TOOL_TYPE_LABELS } from "@lib/constants";

export const GET: APIRoute = async () => {
  const tools = (await getCollection("tools")).map(toToolEntry);
  const categories = await getCategories();
  const sizes = categorySizes(tools);
  const catName = (id: string) => categories.find(c => c.id === id)?.name ?? id;

  const entries = tools.map(t => {
    const d = t.data;
    return {
      slug: t.slug,
      name: d.name,
      logo: d.logo ?? null,
      description: d.description.replace(/\s+/g, " ").trim(),
      why: d.why_reference.replace(/\s+/g, " ").trim(),
      type: TOOL_TYPE_LABELS[d.type] ?? d.type,
      isOpenSource: d.type === "opensource",
      categories: getToolCategories(d).map(catName),
      categoryIds: getToolCategories(d),
      rank: bestPublishableRank(d, sizes)?.rank ?? null,
      cost: d.cost_model ? COST_MODEL_LABELS[d.cost_model] ?? d.cost_model : null,
      costDetails: d.cost_details ?? null,
      sizes: (d.company_size ?? []).map(s => COMPANY_SIZE_LABELS[s] ?? s),
      certifications: d.certifications ?? [],
      certUrl: d.cert_url ?? null,
      license: d.license ?? null,
      repo: d.repo ?? null,
      website: d.website,
      score: computeToolScore(d, t.body),
      axes: scoreBreakdown(d, t.body).map(a => ({ label: a.label, value: a.value, max: a.max })),
      independentSources: independentSourceCount(d),
      gaps: dataGaps(d, t.body).length,
      verified: d.last_verified ? new Date(d.last_verified).toISOString().slice(0, 10) : null,
      added: d.first_added ? new Date(d.first_added).toISOString().slice(0, 10) : null,
    };
  }).sort((a, b) => a.name.localeCompare(b.name, "es"));

  return new Response(JSON.stringify(entries), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
