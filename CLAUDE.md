# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

**BBDD IT Tools** — Directorio vivo de herramientas IT para seguridad, cumplimiento y auditoría. Aplicación web estática con actualización semanal automatizada mediante GitHub Actions.

- **Idioma**: Español (interfaz y contenido)
- **Hosting**: GitHub Pages (`https://moebiuss1.github.io/bbdd-it-tools`)
- **Diseño**: Apple-like minimalista (CSS propio, sin framework — ver `src/styles/global.css` y `DESIGN.md`)

## Stack

| Capa | Tecnología |
|------|-----------|
| SSG | Astro 5, 100% páginas `.astro` server-rendered en build (`output: "static"`, sin islas React) |
| UI | Astro + CSS propio (utilidades tipo Tailwind escritas a mano en `global.css`) |
| Búsqueda | MiniSearch — índice generado en build (`/search-index.json`) y consumido client-side en `/herramientas` |
| Datos | Markdown + YAML frontmatter en `src/content/tools/` |
| Validación | Zod (Astro Content Collections) |
| Scripts | Python 3.12 (`scripts/`) |
| CI/CD | GitHub Actions (cron semanal + deploy) |

> Nota: `react`, `@astrojs/react`, `tailwindcss` y `lucide-react` figuraron en versiones tempranas del proyecto pero nunca se llegaron a integrar (no hay ni un `.tsx` ni una llamada a `tailwindcss()` en `astro.config.mjs`). Se retiraron de `package.json` — toda la interactividad vive en `<script>` inline dentro de los `.astro`.

## Comandos

```bash
npm run dev          # Servidor de desarrollo (localhost:4321)
npm run build        # Build estático → dist/
npm run preview      # Previsualizar build
npx astro check      # TypeScript check sin build
```

## Estructura clave

```
src/
├── content/tools/       # LA BASE DE DATOS — un .md por herramienta
├── content.config.ts    # Schema Zod (contrato de datos)
├── pages/               # Rutas, cada una monta Header + contenido + Footer + su <script>:
│                         #   /, /herramientas (directorio+búsqueda+filtros), /herramientas/[slug],
│                         #   /ranking, /categorias/[id], /glosario, /about, /404, /search-index.json
├── components/          # Header.astro y Footer.astro — navegación compartida (sin islas React)
├── layouts/BaseLayout.astro  # <head> compartido
├── data/                # categories.ts (+families), glossary.ts (términos del glosario),
│                         #   tags.ts, rankings.ts (generado por compute_rankings.py)
├── lib/                 # tools.ts (getToolCategories, computeToolScore — fuente única de verdad),
│                         #   search.ts (config MiniSearch compartida build/cliente), constants.ts
└── types/tool.ts        # Tipos TypeScript (espejo de content.config.ts)
```

`components/` contiene solo `Header.astro` y `Footer.astro`: no hay islas React ni framework de UI. Todo enlace de navegación se declara una única vez ahí — cuando cada página repetía el markup, el enlace al glosario acabó faltando en la portada y en la ficha de herramienta. El resto de la interactividad (filtros, orden, búsqueda, glosario) vive en un `<script>` al final de cada `.astro`.

## Modelo de datos de herramientas

Cada herramienta es un archivo `.md` en `src/content/tools/`. El frontmatter YAML define: name, category, tags, type (opensource/comercial), cost_model, website, description, why_reference, certifications, cert_url, company_size, market_rank, logo, repo, license, sources, last_verified, needs_review.

El body del markdown es la descripción extendida (editable por humanos, los scripts nunca lo sobrescriben).

## Patrones importantes

- **Datos solo en servidor**: `getCollection("tools")` solo funciona en el frontmatter `---` de un `.astro` (build-time). El filtrado/orden/búsqueda visible en `/herramientas` se resuelve en el cliente sobre el HTML ya renderizado (atributos `data-*` en cada card) más un fetch a `/search-index.json` para la búsqueda de texto — no hay servidor en producción (GitHub Pages es estático).
- **Categorías de una herramienta**: usar siempre `getToolCategories(data)` de `lib/tools.ts`, nunca `data.categories || [data.category]` — `categories` por defecto es `[]`, que es *truthy* en JS, así que ese `||` nunca cae al campo legacy `category` y la herramienta desaparecería de los listados.
- **Puntuación BBDD IT (0-100)**: calculada una única vez en `computeToolScore()` / `scoreBreakdown()` (`lib/tools.ts`) y usada por el directorio, la ficha de detalle y los rankings. No reimplementar la fórmula inline.
- **Slugs**: derivados del `id` de Astro (nombre del archivo sin `.md`). La función `toToolEntry()` en `lib/tools.ts` normaliza los slugs.
- **`cert_url`**: debe apuntar al *trust center* o página de certificaciones concreta del fabricante, nunca a su home. Si no existe una página verificable, se deja sin valor: la ficha muestra entonces una nota en lugar de un enlace engañoso. Antes de añadir una URL hay que comprobar que resuelve y que efectivamente lista certificaciones.
- **Glosario**: `src/data/glossary.ts` es contenido editorial independiente de `categories.ts`. Los `id` del grupo `producto` coinciden con los de las categorías para poder contrastar ambos ficheros, pero el glosario no enlaza a herramientas — de eso se ocupa el directorio.
- **Diseño**: tokens y clases utilitarias en `src/styles/global.css` (`.container`, `.card`, `.badge`, `.btn`, `.tool-card`, `.sidebar-box`...). Ver `DESIGN.md` para la guía completa.
