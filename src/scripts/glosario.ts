/**
 * Buscador y filtros del glosario. En módulo externo (no inline) para que la
 * política CSP pueda prohibir `script-src 'unsafe-inline'`.
 */
import { focusOnSlash } from "./search-shortcut";

const input = document.getElementById("glos-q") as HTMLInputElement | null;
const countEl = document.getElementById("glos-count");
const emptyEl = document.getElementById("glos-empty") as HTMLElement | null;
const chips = Array.from(document.querySelectorAll<HTMLElement>(".glos-chip"));
const items = Array.from(document.querySelectorAll<HTMLElement>(".glos-term"));
const blocks = Array.from(document.querySelectorAll<HTMLElement>(".glos-letter-block"));
const azLinks = Array.from(document.querySelectorAll<HTMLElement>(".glos-az a"));
const famSection = document.getElementById("familias") as HTMLElement | null;

let group = "";
let query = "";

// Sin acentos: "cortafuegos" debe encontrar también lo escrito con tilde
const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function render() {
  const q = fold(query.trim());
  let visible = 0;

  for (const el of items) {
    const matchGroup = !group || el.dataset.group === group;
    const matchText = !q || fold(el.dataset.text || "").includes(q);
    const show = matchGroup && matchText;
    el.hidden = !show;
    if (show) visible++;
  }

  // Ocultar la letra y su entrada del índice cuando se queda sin términos
  const live = new Set<string>();
  for (const block of blocks) {
    const any = Array.from(block.querySelectorAll<HTMLElement>(".glos-term")).some(t => !t.hidden);
    block.hidden = !any;
    if (any) live.add(block.dataset.letterBlock || "");
  }
  for (const a of azLinks) a.hidden = !live.has(a.dataset.letter || "");

  // El mapa de familias y subcategorías solo estorba mientras se busca: se
  // oculta al escribir y vuelve en cuanto el buscador queda vacío.
  if (famSection) famSection.hidden = !!q;

  if (countEl) countEl.textContent = `${visible} término${visible === 1 ? "" : "s"}`;
  if (emptyEl) emptyEl.hidden = visible > 0;
}

let debounce: ReturnType<typeof setTimeout>;
input?.addEventListener("input", () => {
  query = input.value;
  clearTimeout(debounce);
  debounce = setTimeout(render, 120);
});

// Mismo par de atajos que en el directorio: "/" enfoca, Escape vacía.
focusOnSlash(input);
input?.addEventListener("keydown", e => {
  if (e.key !== "Escape" || !input.value) return;
  e.preventDefault();
  input.value = "";
  query = "";
  render();
});

for (const chip of chips) {
  chip.addEventListener("click", () => {
    group = chip.dataset.group || "";
    for (const c of chips) {
      const active = c === chip;
      c.classList.toggle("active", active);
      c.setAttribute("aria-pressed", String(active));
    }
    render();
  });
}

// Un enlace "Véase también" puede apuntar a un término que el filtro oculta
window.addEventListener("hashchange", () => {
  if (!location.hash.startsWith("#t-")) return;
  const target = document.querySelector<HTMLElement>(location.hash);
  if (target?.hidden) {
    group = "";
    query = "";
    if (input) input.value = "";
    for (const c of chips) {
      const active = c.dataset.group === "";
      c.classList.toggle("active", active);
      c.setAttribute("aria-pressed", String(active));
    }
    render();
    target.scrollIntoView();
  }
});
