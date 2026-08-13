/**
 * Atajo de teclado "/" para enfocar un buscador.
 *
 * Está aquí, y no repetido en cada página, porque el gesto tiene que ser el
 * mismo en la portada, el directorio y el glosario: si en una página "/" enfoca
 * y en otra escribe una barra, el atajo deja de existir para el usuario.
 *
 * Vive en un módulo externo —no en un <script> embebido— para que la política
 * CSP pueda seguir prohibiendo `script-src 'unsafe-inline'`.
 */

/** ¿Está el usuario escribiendo en algún campo ahora mismo? */
function estaEscribiendo(el: EventTarget | null) {
  const node = el as HTMLElement | null;
  return !!node && (node.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(node.tagName));
}

/**
 * Enfoca `input` al pulsar "/" en cualquier punto de la página.
 * Se ignora mientras se escribe en un campo y cuando la pulsación lleva
 * modificador, para no pisar los atajos del navegador (⌘/ , Ctrl+/…).
 */
export function focusOnSlash(input: HTMLInputElement | null) {
  if (!input) return;
  document.addEventListener("keydown", e => {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (estaEscribiendo(e.target)) return;
    e.preventDefault();
    input.focus();
    input.select();
  });
}
