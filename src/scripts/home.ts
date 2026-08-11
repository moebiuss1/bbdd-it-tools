/**
 * Interacción de la portada. Vive en un módulo propio —y no en un <script>
 * embebido— para que Astro lo emita como fichero externo: así la política CSP
 * puede prohibir el script inline, que es por donde entra un XSS.
 */
// Atajo: "/" enfoca el buscador
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      document.getElementById('hero-search')?.focus();
    }
  });
