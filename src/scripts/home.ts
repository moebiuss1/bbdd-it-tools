/**
 * Interacción de la portada. Vive en un módulo propio —y no en un <script>
 * embebido— para que Astro lo emita como fichero externo: así la política CSP
 * puede prohibir el script inline, que es por donde entra un XSS.
 */
import { focusOnSlash } from "./search-shortcut";

focusOnSlash(document.getElementById("hero-search") as HTMLInputElement | null);
