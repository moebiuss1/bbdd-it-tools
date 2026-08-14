/**
 * Comparador de herramientas (/comparar).
 *
 * Los selectores ya vienen renderizados del servidor; este script solo mantiene
 * sincronizados tres estados: lo elegido, la dirección de la página y la tabla.
 * La tabla se construye con nodos del DOM y `textContent`, nunca con innerHTML:
 * los nombres y descripciones los escribe en parte el pipeline semanal a partir
 * de fuentes de internet y no son contenido de confianza.
 */

interface Axis { label: string; value: number; max: number }

interface CompareTool {
  slug: string;
  name: string;
  logo: string | null;
  description: string;
  why: string;
  type: string;
  isOpenSource: boolean;
  categories: string[];
  categoryIds: string[];
  rank: number | null;
  cost: string | null;
  costDetails: string | null;
  sizes: string[];
  certifications: string[];
  certUrl: string | null;
  license: string | null;
  repo: string | null;
  website: string;
  score: number;
  axes: Axis[];
  independentSources: number;
  gaps: number;
  verified: string | null;
  added: string | null;
}

const BASE = document.querySelector("a.brand")?.getAttribute("href") || "/";
const SLOTS = ["a", "b", "c"] as const;
type Slot = (typeof SLOTS)[number];

const selects = new Map<Slot, HTMLSelectElement>();
for (const s of SLOTS) {
  const el = document.getElementById(`slot-${s}`) as HTMLSelectElement | null;
  if (el) selects.set(s, el);
}

const wrap = document.getElementById("compare-wrap") as HTMLElement | null;
const head = document.getElementById("compare-head") as HTMLElement | null;
const bodyEl = document.getElementById("compare-body") as HTMLElement | null;
const empty = document.getElementById("compare-empty") as HTMLElement | null;
const statusEl = document.getElementById("compare-status") as HTMLElement | null;
const clearBtn = document.getElementById("compare-clear") as HTMLButtonElement | null;

let data: CompareTool[] | null = null;
let byslug = new Map<string, CompareTool>();

/** Estado inicial desde la URL, para que un enlace compartido abra la misma comparativa. */
const params = new URLSearchParams(location.search);
for (const s of SLOTS) {
  const value = params.get(s) || "";
  const el = selects.get(s);
  if (el && value && Array.from(el.options).some(o => o.value === value)) el.value = value;
}

function selected(): string[] {
  const out: string[] = [];
  for (const s of SLOTS) {
    const v = selects.get(s)?.value || "";
    // Una herramienta repetida en dos casillas no compara nada: se ignora la
    // segunda aparición en vez de pintar dos columnas idénticas.
    if (v && !out.includes(v)) out.push(v);
  }
  return out;
}

function syncUrl() {
  const p = new URLSearchParams();
  for (const s of SLOTS) {
    const v = selects.get(s)?.value;
    if (v) p.set(s, v);
  }
  const qs = p.toString();
  history.replaceState(null, "", location.pathname + (qs ? `?${qs}` : ""));
}

function markSet() {
  for (const el of selects.values()) el.classList.toggle("is-set", !!el.value);
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K, opts: { text?: string; className?: string; attrs?: Record<string, string> } = {},
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (opts.text !== undefined) node.textContent = opts.text;
  if (opts.className) node.className = opts.className;
  for (const [k, v] of Object.entries(opts.attrs ?? {})) node.setAttribute(k, v);
  return node;
}

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : "—";

/** Cabecera de columna: logo, nombre enlazado a su ficha y puntuación. */
function headerCell(t: CompareTool): HTMLTableCellElement {
  const th = el("th", { attrs: { scope: "col" } });
  const link = el("a", { attrs: { href: `${BASE}herramientas/${t.slug}/` } });
  link.style.cssText = "display:flex;align-items:center;gap:10px;font-weight:600;color:#1d1d1f";

  if (t.logo) {
    const img = el("img", {
      attrs: { src: `${BASE}${t.logo.replace(/^\//, "")}`, alt: "", width: "28", height: "28", loading: "lazy" },
    });
    img.style.cssText = "border-radius:8px;object-fit:contain;flex-shrink:0";
    link.appendChild(img);
  }
  link.appendChild(el("span", { text: t.name }));
  th.appendChild(link);

  const sub = el("span", { text: `${t.score}/100` });
  sub.style.cssText = `display:inline-block;margin-top:6px;font-size:12px;font-weight:600;color:${
    t.score >= 70 ? "#047857" : t.score >= 40 ? "#b45309" : "#b91c1c"}`;
  th.appendChild(sub);
  return th;
}

type CellValue = { text: string; node?: HTMLElement };

function textCell(text: string): CellValue { return { text }; }

function listCell(items: string[], emptyText = "—"): CellValue {
  if (items.length === 0) return { text: emptyText };
  const ul = el("ul");
  ul.style.cssText = "list-style:none;display:flex;flex-wrap:wrap;gap:4px";
  for (const item of items) {
    const li = el("li", { text: item, className: "badge badge-gray badge-sm" });
    ul.appendChild(li);
  }
  return { text: items.join(", "), node: ul };
}

function linkCell(href: string | null, label: string): CellValue {
  if (!href) return { text: "—" };
  const a = el("a", { text: label, attrs: { href, target: "_blank", rel: "noopener noreferrer" } });
  return { text: label, node: a };
}

interface Row {
  label: string;
  value: (t: CompareTool, all: CompareTool[]) => CellValue;
  /** Se omite la fila si ninguna de las seleccionadas aporta nada */
  relevant?: (all: CompareTool[]) => boolean;
  /**
   * Filas numéricas comparables: el valor que gana se marca. `max` para lo que
   * suma (puntuación, fuentes), `min` para lo que resta (datos pendientes).
   */
  best?: { of: (t: CompareTool) => number; dir: "max" | "min" };
}

const ROWS: Row[] = [
  { label: "Puntuación BBDD IT", value: t => textCell(`${t.score} / 100`), best: { of: t => t.score, dir: "max" } },
  {
    label: "Posición en su categoría",
    value: t => textCell(t.rank ? `#${t.rank}` : "Sin puesto publicado"),
  },
  { label: "Tipo", value: t => textCell(t.type) },
  { label: "Categorías", value: t => listCell(t.categories) },
  { label: "Modelo de coste", value: t => textCell(t.cost ?? "—") },
  { label: "Detalle de coste", value: t => textCell(t.costDetails ?? "—") },
  { label: "Tamaño de empresa", value: t => listCell(t.sizes) },
  {
    label: "Certificaciones",
    value: t => listCell(t.certifications, "Sin certificaciones declaradas"),
  },
  {
    label: "Verificación de certificaciones",
    value: t => t.certUrl
      ? linkCell(t.certUrl, "Página del fabricante")
      : textCell(t.certifications.length ? "Sin página pública" : "—"),
    relevant: all => all.some(t => t.certifications.length > 0),
  },
  {
    label: "Licencia",
    value: t => textCell(t.license ?? "—"),
    relevant: all => all.some(t => t.isOpenSource),
  },
  {
    label: "Repositorio",
    value: t => linkCell(t.repo, "Código fuente"),
    relevant: all => all.some(t => t.isOpenSource),
  },
  {
    label: "Fuentes independientes",
    value: t => textCell(String(t.independentSources)),
    best: { of: t => t.independentSources, dir: "max" },
  },
  {
    label: "Datos pendientes",
    value: t => textCell(t.gaps === 0 ? "Ninguno" : `${t.gaps}`),
    best: { of: t => t.gaps, dir: "min" },
  },
  { label: "En el directorio desde", value: t => textCell(fmtDate(t.added)) },
  { label: "Última verificación", value: t => textCell(fmtDate(t.verified)) },
  { label: "Sitio del fabricante", value: t => linkCell(t.website, new URL(t.website).hostname.replace(/^www\./, "")) },
];

/** Los cinco ejes de la puntuación, como filas propias tras el total. */
function axisRows(all: CompareTool[]): Row[] {
  const labels = all[0]?.axes.map(a => a.label) ?? [];
  return labels.map(label => ({
    label: `↳ ${label}`,
    value: (t: CompareTool) => {
      const a = t.axes.find(x => x.label === label);
      // Open source y comercial no comparten el nombre del segundo eje: si esta
      // herramienta no lo tiene, se dice cuál es el suyo en vez de un hueco.
      if (!a) {
        const own = t.axes[1];
        return textCell(own ? `${own.value} / ${own.max} (${own.label.toLowerCase()})` : "—");
      }
      return textCell(`${a.value} / ${a.max}`);
    },
    best: {
      of: (t: CompareTool) => t.axes.find(x => x.label === label)?.value ?? -1,
      dir: "max" as const,
    },
  }));
}

function render() {
  markSet();
  syncUrl();
  if (!wrap || !head || !bodyEl || !empty) return;

  const slugs = selected();
  const chosen = slugs.map(s => byslug.get(s)).filter((t): t is CompareTool => !!t);

  if (chosen.length < 2) {
    wrap.hidden = true;
    empty.hidden = false;
    if (statusEl) statusEl.hidden = true;
    return;
  }
  empty.hidden = true;
  wrap.hidden = false;

  head.replaceChildren();
  const corner = el("th", { text: "", attrs: { scope: "col" } });
  head.appendChild(corner);
  for (const t of chosen) head.appendChild(headerCell(t));

  const rows = [...ROWS];
  rows.splice(1, 0, ...axisRows(chosen));

  bodyEl.replaceChildren();
  for (const row of rows) {
    if (row.relevant && !row.relevant(chosen)) continue;
    const tr = el("tr");
    tr.appendChild(el("th", { text: row.label, attrs: { scope: "row" } }));

    const values = chosen.map(t => row.value(t, chosen));

    // El mejor valor solo se marca si hay algo que ganar: con todas las
    // columnas empatadas, señalarlas todas no dice nada.
    let winners: boolean[] = values.map(() => false);
    if (row.best) {
      const nums = chosen.map(row.best.of);
      const target = row.best.dir === "max" ? Math.max(...nums) : Math.min(...nums);
      if (new Set(nums).size > 1) winners = nums.map(n => n === target);
    }

    values.forEach((v, i) => {
      const td = el("td");
      if (v.node) td.appendChild(v.node);
      else td.textContent = v.text;
      if (winners[i]) {
        td.classList.add("compare-best");
        td.appendChild(el("span", {
          text: row.best!.dir === "max" ? " (valor más alto)" : " (valor más bajo)",
          className: "sr-only",
        }));
      }
      tr.appendChild(td);
    });
    bodyEl.appendChild(tr);
  }

  if (statusEl) {
    statusEl.hidden = false;
    statusEl.textContent = `Comparando ${chosen.length} herramientas: ${chosen.map(t => t.name).join(", ")}.`;
  }
}

async function load() {
  try {
    const res = await fetch(`${BASE}compare-data.json`);
    if (!res.ok) throw new Error(String(res.status));
    data = (await res.json()) as CompareTool[];
    byslug = new Map(data.map(t => [t.slug, t]));
    render();
  } catch {
    // Sin datos no se puede comparar: decirlo es mejor que dejar la tabla vacía
    // como si la selección no tuviera resultados.
    if (statusEl) {
      statusEl.hidden = false;
      statusEl.textContent = "No se han podido cargar los datos de comparación. Recarga la página para intentarlo de nuevo.";
    }
  }
}

for (const s of selects.values()) s.addEventListener("change", render);
clearBtn?.addEventListener("click", () => {
  for (const s of selects.values()) s.value = "";
  render();
});

load();
