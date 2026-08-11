import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

const SITE = "https://moebiuss1.github.io";
const BASE = "/bbdd-it-tools/";

/**
 * El cuerpo de las fichas lo escribe en parte el pipeline semanal de scripts a
 * partir de fuentes de internet: no es contenido de confianza. Se sanea el HTML
 * resultante para que ningún `<script>`, `<iframe>` ni atributo `on*` colado en
 * un .md llegue a la página. Markdown normal (títulos, listas, énfasis, enlaces)
 * pasa intacto.
 */
const markdownSchema = {
  ...defaultSchema,
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto"],
    src: ["http", "https"],
  },
};

/**
 * Astro incrusta en el HTML los scripts cuyo bundle resulta pequeño. Eso obliga
 * a abrir la CSP con `script-src 'unsafe-inline'`, que es justo la directiva que
 * detiene un XSS. Esta integración los extrae a /_astro tras el build, con el
 * hash del contenido en el nombre para que la caché no sirva versiones viejas.
 */
function externalizeInlineScripts() {
  return {
    name: "externalize-inline-scripts",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const htmlFiles = [];
        const walk = (p) => {
          for (const name of readdirSync(p)) {
            const full = join(p, name);
            if (statSync(full).isDirectory()) walk(full);
            else if (full.endsWith(".html")) htmlFiles.push(full);
          }
        };
        walk(root);

        let extracted = 0;
        for (const file of htmlFiles) {
          const html = readFileSync(file, "utf8");
          const updated = html.replace(
            /<script type="module">([\s\S]*?)<\/script>/g,
            (_match, code) => {
              const hash = createHash("sha256").update(code).digest("hex").slice(0, 8);
              const assetName = `inline.${hash}.js`;
              writeFileSync(join(root, "_astro", assetName), code);
              extracted++;
              return `<script type="module" src="${BASE}_astro/${assetName}"></script>`;
            },
          );
          if (updated !== html) writeFileSync(file, updated);
        }
        if (extracted > 0) {
          logger.info(`${extracted} scripts inline extraídos a /_astro (CSP sin 'unsafe-inline')`);
        }
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  base: BASE,
  output: "static",
  integrations: [sitemap(), externalizeInlineScripts()],
  markdown: {
    rehypePlugins: [[rehypeSanitize, markdownSchema]],
  },
});
