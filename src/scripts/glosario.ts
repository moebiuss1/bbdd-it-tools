/**
 * Buscador y filtros del glosario. En módulo externo (no inline) para que la
 * política CSP pueda prohibir `script-src 'unsafe-inline'`.
 */
const input = document.getElementById("glos-q") as HTMLInputElement | null;
const countEl = document.getElementById("glos-count");
const emptyEl = document.getElementById("glos-empty") as HTMLElement | null;
const chips = Array.from(document.querySelectorAll<HTMLElement>(".glos-chip"));
const items = Array.from(document.querySelectorAll<HTMLElement>(".glos-term"));
const blocks = Array.from(document.querySelectorAll<HTMLElement>(".glos-letter-block"));
const azLinks = Array.from(document.querySelectorAll<HTMLElement>(".glos-az a"));
const fams = Array.from(document.querySelectorAll<HTMLElement>(".glos-fam"));
const famNote = document.getElementById("glos-fam-note") as HTMLElement | null;

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

  // Las familias son el mapa del sector, no resultados de búsqueda: siempre
  // quedan a la vista. Con una consulta activa, las que casan se destacan y
  // se colocan primero; el resto se atenúa.
  let famHits = 0;
  for (const fam of fams) {
    const hit = !!q && fold(fam.dataset.text || "").includes(q);
    fam.classList.toggle("is-match", hit);
    fam.classList.toggle("is-dim", !!q && !hit);
    if (hit) famHits++;
  }
  if (famNote) {
    famNote.hidden = !q;
    famNote.textContent = !q
      ? ""
      : famHits > 0
      ? `${famHits} de ${fams.length} familias coinciden con la búsqueda.`
      : `Ninguna familia coincide con la búsqueda; se muestran todas.`;
  }

  if (countEl) countEl.textContent = `${visible} término${visible === 1 ? "" : "s"}`;
  if (emptyEl) emptyEl.hidden = visible > 0;
}

let debounce: ReturnType<typeof setTimeout>;
input?.addEventListener("input", () => {
  query = input.value;
  clearTimeout(debounce);
  debounce = setTimeout(render, 120);
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
