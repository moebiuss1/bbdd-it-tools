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

/*
 * No hay distintivo de "Nuevo" en el catálogo.
 *
 * `first_added` se sigue registrando y se muestra como fecha —en la ficha, en la
 * portada y en /novedades, que agrupa las altas por semana—, pero sin badge: una
 * tanda de altas pinta de verde media pantalla y el color acaba señalando cuándo
 * se dio de alta la ficha, no si la herramienta merece atención.
 */

/**
 * Puesto de la herramienta en una categoría concreta.
 *
 * El puesto solo significa algo dentro de un mercado: Rubrik y Druva son ambas
 * "#1" —una en backup corporativo, otra en backup de SaaS— y publicarlo como un
 * número suelto por ficha hacía que las dos apareciesen como #1 en las dos
 * listas. Por eso el campo es un mapa `categoría → puesto` y toda la interfaz
 * pide el puesto indicando en qué categoría se está mostrando la herramienta.
 */
export function rankIn(
  data: Pick<ToolFrontmatter, "market_rank" | "categories" | "category">,
  categoryId: string,
): number | null {
  const rank = data.market_rank;
  if (!rank) return null;
  // Compatibilidad: un número suelto es el puesto en la categoría principal.
  if (typeof rank === "number") {
    return getToolCategories(data)[0] === categoryId ? rank : null;
  }
  return rank[categoryId] ?? null;
}

/**
 * Mejor puesto de la herramienta entre todas sus categorías.
 * Para los sitios donde no hay categoría en pantalla (puntuación, comparador,
 * índice de búsqueda) y hay que resumir su posición en un solo número.
 */
export function bestRank(
  data: Pick<ToolFrontmatter, "market_rank" | "categories" | "category">,
): number | null {
  const rank = data.market_rank;
  if (!rank) return null;
  if (typeof rank === "number") return rank;
  const values = Object.values(rank);
  return values.length > 0 ? Math.min(...values) : null;
}

/** Nº de herramientas por categoría, para decidir si un puesto significa algo. */
export function categorySizes(tools: ToolEntry[]): Map<string, number> {
  const sizes = new Map<string, number>();
  for (const t of tools) {
    for (const c of getToolCategories(t.data)) sizes.set(c, (sizes.get(c) ?? 0) + 1);
  }
  return sizes;
}

/** Mínimo de competidores para que un puesto en una categoría sea publicable. */
export const MIN_RANKED_PEERS = 3;

/**
 * ¿Merece esta herramienta lucir su puesto (#1, #2…) en un listado?
 *
 * Un "#1" en una categoría sin competencia no es una posición de mercado sino un
 * artefacto de la taxonomía: el badge solo aparece cuando la categoría en la que
 * ocupa ese puesto tiene al menos MIN_RANKED_PEERS herramientas.
 */
export function hasMeaningfulRank(
  data: Pick<ToolFrontmatter, "market_rank" | "categories" | "category">,
  sizes: Map<string, number>,
): boolean {
  if (!data.market_rank) return false;
  return getToolCategories(data).some(
    c => rankIn(data, c) !== null && (sizes.get(c) ?? 0) >= MIN_RANKED_PEERS,
  );
}

/**
 * Puesto publicable de una herramienta cuando el listado no está agrupado por
 * categoría: el mejor de los que ocupa, con la categoría a la que corresponde
 * para poder decirlo en el tooltip. Sin ella, un "#2" suelto no dice en qué.
 */
export function bestPublishableRank(
  data: Pick<ToolFrontmatter, "market_rank" | "categories" | "category">,
  sizes: Map<string, number>,
): { rank: number; category: string } | null {
  let best: { rank: number; category: string } | null = null;
  for (const c of getToolCategories(data)) {
    const rank = rankIn(data, c);
    if (rank === null || (sizes.get(c) ?? 0) < MIN_RANKED_PEERS) continue;
    if (!best || rank < best.rank) best = { rank, category: c };
  }
  return best;
}

export interface DataGap {
  /** Texto corto para listar el hueco en la ficha */
  label: string;
  /** Campo del frontmatter que lo resolvería */
  field: string;
}

/**
 * Huecos verificables de una ficha.
 *
 * `needs_review` es una marca editorial que hay que poner a mano y que llevaba
 * 0/182 activaciones pese a que 89 fichas no tienen página de certificaciones y
 * 19 no citan ninguna fuente ajena al fabricante. Esto lo deriva del dato, así
 * que la transparencia deja de depender de que alguien se acuerde.
 */
export function dataGaps(data: ToolFrontmatter, body = ""): DataGap[] {
  const gaps: DataGap[] = [];
  const isOpenSource = data.type === "opensource";

  if (independentSourceCount(data) === 0) {
    gaps.push({ label: "Sin ninguna fuente ajena al fabricante", field: "sources" });
  }
  if (!isOpenSource && data.certifications.length > 0 && !data.cert_url) {
    gaps.push({ label: "Certificaciones declaradas sin página pública donde comprobarlas", field: "cert_url" });
  }
  if (!isOpenSource && data.certifications.length === 0) {
    gaps.push({ label: "Sin certificaciones declaradas", field: "certifications" });
  }
  if (isOpenSource && !data.repo) {
    gaps.push({ label: "Proyecto abierto sin repositorio declarado", field: "repo" });
  }
  if (isOpenSource && !data.license) {
    gaps.push({ label: "Proyecto abierto sin licencia identificada", field: "license" });
  }
  if (body.trim().length < 300) {
    gaps.push({ label: "Descripción extendida demasiado breve", field: "body" });
  }
  if (!data.first_added) {
    gaps.push({ label: "Sin fecha de alta en el directorio", field: "first_added" });
  }
  return gaps;
}

/**
 * Fuentes citadas que no están alojadas en el dominio del propio fabricante.
 * Una nota de prensa del vendedor no es evidencia independiente.
 */
export function independentSourceCount(data: Pick<ToolFrontmatter, "sources" | "website">): number {
  const vendorHost = (() => {
    try { return new URL(data.website).hostname.replace(/^www\./, ""); } catch { return ""; }
  })();
  return (data.sources ?? []).filter(url => {
    try { return new URL(url).hostname.replace(/^www\./, "") !== vendorHost; } catch { return false; }
  }).length;
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
 *
 * Reparto de pesos, revisado sobre el catálogo real: la frescura bajó de 10 a 5
 * puntos y esos 5 se movieron a las fuentes independientes. El motivo es que el
 * pipeline reverifica las 182 fichas el mismo día, así que el eje de frescura
 * daba la nota máxima a todas y ocupaba una décima parte de la escala sin
 * distinguir nada; las fuentes, en cambio, van de 0 a 4 y sí separan una ficha
 * documentada de una que solo repite al fabricante.
 */
export function scoreAxes(data: ToolFrontmatter, body = ""): ScoreAxis[] {
  const isOpenSource = data.type === "opensource";
  const certs = data.certifications?.length ?? 0;

  // Una nota del propio fabricante no es evidencia independiente: solo cuentan
  // las fuentes alojadas fuera de su dominio (analistas, laboratorios, prensa).
  const sources = independentSourceCount(data);

  // 1. Posición de mercado (30) — decrece 3,5 puntos por puesto, suelo de 5.
  // Se toma el mejor puesto entre sus categorías: una herramienta que lidera un
  // mercado y es secundaria en otro puntúa por lo que lidera.
  const rank = bestRank(data);
  const rankValue = rank ? Math.max(5, Math.round(30 - (rank - 1) * 3.5)) : 8;

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

  // 3. Fuentes independientes (25) — rendimientos decrecientes: el salto que
  // más importa es el de ninguna a una, porque separa la ficha comprobable de
  // la que solo repite lo que dice el fabricante.
  const SOURCE_STEPS = [0, 10, 17, 21, 25];
  const sourcesValue = SOURCE_STEPS[Math.min(sources, SOURCE_STEPS.length - 1)];

  // 4. Actualización del dato (5)
  const days = data.last_verified
    ? (Date.now() - new Date(data.last_verified as unknown as string).getTime()) / 86400000
    : null;
  const freshnessValue = days === null ? 0 : days < 30 ? 5 : days < 90 ? 4 : days < 180 ? 2 : 1;

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
      detail: rank ? `Puesto #${rank} en su categoría` : "Sin posición asignada",
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
      max: 25,
      detail: sources > 0
        ? `${sources} ${sources === 1 ? "fuente externa" : "fuentes externas"} al fabricante`
        : "sin fuentes independientes del fabricante",
    },
    {
      label: "Actualización",
      value: freshnessValue,
      max: 5,
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
      return (bestRank(a.data) ?? 999) - (bestRank(b.data) ?? 999);
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
