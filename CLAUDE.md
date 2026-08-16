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
│                         #   /ranking, /categorias (índice) + /categorias/[id], /comparar,
│                         #   /calidad (salud del catálogo), /novedades (altas por semana),
│                         #   /glosario, /about, /404,
│                         #   /search-index.json, /compare-data.json, /rss.xml
├── components/          # Header.astro y Footer.astro — navegación compartida (sin islas React)
├── layouts/BaseLayout.astro  # <head> compartido
├── data/                # categories.ts (+families), glossary.ts (términos del glosario),
│                         #   tags.ts, rankings.ts (generado por compute_rankings.py)
├── lib/                 # tools.ts (getToolCategories, computeToolScore, dataGaps, hasMeaningfulRank,
│                         #   rankIn/bestRank — fuente única de verdad), search.ts (config MiniSearch
│                         #   compartida build/cliente), jsonld.ts (serialización segura), constants.ts
├── scripts/             # Módulos de cliente importados por los .astro (home, glosario, comparar,
│                         #   search-shortcut). La CSP prohíbe scripts inline: ver astro.config.mjs
└── types/tool.ts        # Tipos TypeScript (espejo de content.config.ts)
```

`components/` contiene solo `Header.astro` y `Footer.astro`: no hay islas React ni framework de UI. Todo enlace de navegación se declara una única vez ahí — cuando cada página repetía el markup, el enlace al glosario acabó faltando en la portada y en la ficha de herramienta. El resto de la interactividad (filtros, orden, búsqueda, glosario) vive en un `<script>` al final de cada `.astro`.

## Modelo de datos de herramientas

Cada herramienta es un archivo `.md` en `src/content/tools/`. El frontmatter YAML define: name, category, tags, type (opensource/comercial), cost_model, website, description, why_reference, certifications, cert_url, company_size, market_rank, logo, repo, license, sources, first_added, last_verified, needs_review.

**`first_added` vs `last_verified`**: son datos distintos y no intercambiables. `last_verified` lo reescribe el pipeline en bloque cada lunes —las 274 fichas comparten fecha—, así que no sirve para saber qué es nuevo: usarlo marcaba el catálogo entero como novedad en la portada. `first_added` se escribe una sola vez, al crear la ficha, y `yaml_io.merge_frontmatter()` lo protege igual que `name` y `slug`.

El body del markdown es la descripción extendida (editable por humanos, los scripts nunca lo sobrescriben).

## Patrones importantes

- **Datos solo en servidor**: `getCollection("tools")` solo funciona en el frontmatter `---` de un `.astro` (build-time). El filtrado/orden/búsqueda visible en `/herramientas` se resuelve en el cliente sobre el HTML ya renderizado (atributos `data-*` en cada card) más un fetch a `/search-index.json` para la búsqueda de texto — no hay servidor en producción (GitHub Pages es estático).
- **Categorías de una herramienta**: usar siempre `getToolCategories(data)` de `lib/tools.ts`, nunca `data.categories || [data.category]` — `categories` por defecto es `[]`, que es *truthy* en JS, así que ese `||` nunca cae al campo legacy `category` y la herramienta desaparecería de los listados.
- **Puntuación BBDD IT (0-100)**: calculada una única vez en `computeToolScore()` / `scoreBreakdown()` (`lib/tools.ts`) y usada por el directorio, la ficha, los rankings y el comparador. No reimplementar la fórmula inline. Ejes: posición 30, garantías 25, fuentes independientes 25, actualización 5, ficha completa 15. La frescura pesa poco a propósito (todas las fichas se verifican el mismo día y el eje no discriminaba); las fuentes independientes usan rendimientos decrecientes porque el salto que importa es el de ninguna a una.
- **Puestos de mercado**: `market_rank` es un mapa `categoría → puesto` (`{ "enterprise-backup": 3 }`), no un número. Un número suelto por ficha no podía ser cierto en las varias categorías de una herramienta, y `compute_rankings.py` lo empeoraba escribiéndolo una vez por categoría: sobrevivía el de la última procesada y backup corporativo llegó a publicar dos "#1". Leerlo siempre con `rankIn(data, categoriaEnPantalla)`; `bestRank()` solo donde no hay categoría a la vista (puntuación, comparador, índice de búsqueda) y `bestPublishableRank()` cuando además hay que decir de qué categoría es ese puesto. El puesto es **dato editorial**: el pipeline lo lee para ordenar `rankings.ts`, pero ya no lo reescribe, y `validate.py` falla si dos fichas ocupan el mismo puesto en la misma categoría. Con `hasMeaningfulRank()` se sigue ocultando el puesto de una categoría sin competencia.
- **Huecos de datos**: `dataGaps(data, body)` deriva del propio dato qué falta por comprobar (fuente ajena al fabricante, página de certificaciones, licencia…). Se muestra en la ficha y se agrega en `/calidad`. `needs_review` sigue siendo la marca editorial manual, no su sustituto.
- **Novedades**: no hay distintivo "Nuevo" en ninguna página. `first_added` se muestra como fecha y agrupa las altas por semana en `/novedades`; una tanda de altas teñía de verde media pantalla y el color acababa señalando cuándo se creó la ficha, no si la herramienta importa. Nunca derivar novedad de `last_verified`.
- **Orden del directorio**: `/herramientas` se sirve alfabético (colación española) y ese es también el valor por defecto del desplegable de orden. El puesto de mercado sigue disponible como criterio y es el que ordena `/categorias/<id>` y los datos estructurados.
- **Jerarquía de fuentes**: la evidencia primaria es el análisis internacional independiente —mercados de Gartner Peer Insights, Forrester Wave, IDC MarketScape, KuppingerCole, AV-Comparatives, MITRE ATT&CK Evaluations—, y en proyectos abiertos el aval de una fundación (CNCF, Apache, OWASP, Linux Foundation). Un blog, un comparador de afiliados o la nota de prensa del propio fabricante no lo sustituyen: `independentSourceCount()` ya descuenta el dominio del vendedor, y `check_catalog_health.py` lista cada semana las fichas que no citan ningún ranking internacional. Gartner devuelve 403 a todo, así que los slugs de Peer Insights se confirman por búsqueda restringida al dominio antes de escribirlos (ver la memoria del proyecto).
- **Solo productos vivos**: el catálogo lista lo que hoy se puede comprar y desplegar. Un fabricante que cierra (Skybox, febrero de 2025) o una marca que se retira (McAfee MVISION, ForgeRock, ACL) sale del directorio; si el producto sigue con otro dueño, se actualizan nombre y URL en vez de borrarlo (Code42 → Mimecast Incydr, Digital Guardian → Fortra DLP). El síntoma automático es que `website` redirija a otro dominio o que el `<title>` nombre a otra empresa: `scripts/` no lo comprueba, hay que barrerlo a mano de vez en cuando. Una ficha retirada deja su URL redirigida a la categoría en `retiredTools` (astro.config.mjs) — estuvo indexada y no puede pasar a 404.
- **Cinco herramientas por categoría**: ninguna categoría baja de cinco fichas. Una categoría con dos entradas no es una comparativa, es un escaparate; si se crea una nueva hay que poblarla, y si una fusión la deja corta, se fusiona otra vez.
- **Slugs**: derivados del `id` de Astro (nombre del archivo sin `.md`). La función `toToolEntry()` en `lib/tools.ts` normaliza los slugs.
- **`cert_url`**: debe apuntar al *trust center* o página de certificaciones concreta del fabricante, nunca a su home. Si no existe una página verificable, se deja sin valor: la ficha muestra entonces una nota en lugar de un enlace engañoso. Antes de añadir una URL hay que comprobar que resuelve y que efectivamente lista certificaciones.
- **Categorías fusionadas**: el directorio llegó a tener 80 categorías, 37 con una sola herramienta. Las que competían en la misma decisión de compra se fusionaron (56 hoy) y `categoryAliases` en `categories.ts` guarda el mapa `id viejo → id nuevo`. Ese mismo mapa alimenta las redirecciones de `astro.config.mjs`: una URL publicada no puede empezar a devolver 404. Al fusionar hay que tocar también `rankings.ts` (claves) e `infrastructure.ts` (placements).
- **Etiquetas**: `tags` en el frontmatter es un vocabulario ancho que alimenta la búsqueda de texto; `src/data/tags.ts` es el subconjunto curado que se ofrece como faceta en el directorio (conceptos transversales con 4+ usos que no repiten una categoría). Una etiqueta fuera de esa lista sigue filtrando si llega por `?tag=`.
- **Glosario**: `src/data/glossary.ts` es contenido editorial independiente de `categories.ts`. Sus `id` del grupo `producto` nacieron alineados con las categorías; tras la fusión algunos ya no tienen categoría propia (p. ej. `honeypots`, absorbida por `deception`) y eso es deliberado: definir un término y agrupar un mercado son cosas distintas. Para contrastar ambos ficheros hay que pasar por `categoryAliases`. El glosario no enlaza a herramientas — de eso se ocupa el directorio.
- **`<head>` y datos estructurados**: todo el `<head>` vive en `BaseLayout.astro` (canonical, Open Graph, Twitter Card, iconos, RSS). Una página añade schema.org pasando `jsonLd` al layout; se serializa con `jsonLdScript()` (`lib/jsonld.ts`), que escapa `<`, `>` y `&` — el texto de las fichas no es de confianza y `</script>` dentro de un JSON cierra el bloque.
- **Diseño**: tokens y clases utilitarias en `src/styles/global.css` (`.container`, `.card`, `.badge`, `.btn`, `.tool-card`, `.sidebar-box`...). Ver `DESIGN.md` para la guía completa.
