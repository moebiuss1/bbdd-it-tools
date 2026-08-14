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

/**
 * Categorías fusionadas: sus URLs siguen existiendo.
 *
 * `/categorias/honeypots` estuvo publicada e indexada; al absorberse en
 * `deception` no puede devolver un 404. Astro genera para cada una una página de
 * redirección con `<meta http-equiv="refresh">` y su enlace canónico, que es lo
 * único que permite GitHub Pages (no hay cabeceras HTTP que emitir un 301).
 * El mapa es el mismo `categoryAliases` de src/data/categories.ts.
 */
const categoryRedirects = Object.fromEntries(
  Object.entries({
    "ai-data-security": "llm-security",
    "ai-firewall": "llm-security",
    "ai-security-tool": "llm-security",
    "ai-spm": "llm-security",
    "change-management": "incident-management",
    "cloud-backup": "enterprise-backup",
    "cloud-monitoring": "infra-monitoring",
    "container-monitoring": "infra-monitoring",
    "dns-security": "swg",
    "endpoint-backup": "enterprise-backup",
    "git": "scm",
    "google-workspace-backup": "saas-backup",
    "honeypots": "deception",
    "immutable-backup": "enterprise-backup",
    "kubernetes-monitoring": "infra-monitoring",
    "llm-gateway": "llm-security",
    "m365-backup": "saas-backup",
    "model-risk": "ai-governance",
    "nta": "ndr",
    "problem-management": "incident-management",
    "ransomware-recovery": "business-continuity",
    "request-management": "incident-management",
    "server-monitoring": "infra-monitoring",
    "timestamping": "eidas-trust",
    "web-security": "swg",
    // Astro antepone el `base` a la ruta de origen, pero no a la de destino:
    // sin escribirlo aquí, la redirección apunta fuera del sitio publicado.
  }).map(([from, to]) => [`/categorias/${from}`, `${BASE}categorias/${to}`]),
);

export default defineConfig({
  site: SITE,
  base: BASE,
  output: "static",
  redirects: categoryRedirects,
  integrations: [sitemap(), externalizeInlineScripts()],
  markdown: {
    rehypePlugins: [[rehypeSanitize, markdownSchema]],
  },
});
