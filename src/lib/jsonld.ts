/**
 * Serialización segura de grafos schema.org.
 *
 * El contenido de las fichas lo escribe en parte el pipeline semanal a partir
 * de fuentes de internet, así que puede contener cualquier cosa. Dentro de un
 * `<script>` el navegador busca la secuencia `</script` en crudo y cierra el
 * bloque ahí: un nombre de herramienta con esa cadena sacaría el resto del JSON
 * al documento como HTML. Escapar `<`, `>` y `&` en forma de escape Unicode
 * mantiene el JSON válido —los parsers los deshacen— y deja inertes esas
 * secuencias. Se escapan también los separadores de línea U+2028/U+2029, que
 * son válidos en JSON pero rompen algunos consumidores.
 */
export function jsonLdScript(graph: unknown): string {
  return JSON.stringify(graph)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** URL absoluta a partir de una ruta del sitio (incluye ya el base path). */
export function absolute(path: string, site: URL | undefined): string {
  return new URL(path, site ?? "https://moebiuss1.github.io").toString();
}
