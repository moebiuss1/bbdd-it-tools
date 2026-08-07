# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

**BBDD IT Tools** — Directorio vivo de herramientas IT para seguridad, cumplimiento y auditoría. Aplicación web estática con actualización semanal automatizada mediante GitHub Actions.

- **Idioma**: Español (interfaz y contenido)
- **Hosting**: GitHub Pages (`https://xavicalero.github.io/bbdd-it-tools`)
- **Diseño**: Apple-like minimalista (Tailwind CSS + tokens CSS propios)

## Stack

| Capa | Tecnología |
|------|-----------|
| SSG | Astro 5 (App Router, `output: "static"`) |
| UI | React 19 + Tailwind CSS 4 |
| Búsqueda | MiniSearch (cliente-side) |
| Datos | Markdown + YAML frontmatter en `src/content/tools/` |
| Validación | Zod (Astro Content Collections) |
| Scripts | Python 3.12 (próximamente) |
| CI/CD | GitHub Actions (cron semanal + deploy) |

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
├── pages/               # Rutas: /, /herramientas, /herramientas/[slug], /ranking, /categorias/[id]
├── components/          # React islands (solo lo interactivo: búsqueda, filtros)
│   ├── layout/          # Header, Footer, SearchBar
│   ├── tools/           # ToolCard, ToolLogo, ToolDetail
│   ├── filters/         # DirectoryPage (listado con filtros)
│   ├── ranking/         # Componentes de ranking
│   └── ui/              # Badge, EmptyState, Card
├── data/                # categories.ts, tags.ts, rankings.ts (datos estáticos)
├── lib/                 # tools.ts (utilidades), search.ts (MiniSearch), constants.ts
└── types/tool.ts        # Tipos TypeScript
```

## Modelo de datos de herramientas

Cada herramienta es un archivo `.md` en `src/content/tools/`. El frontmatter YAML define: name, category, tags, type (opensource/comercial), cost_model, website, description, why_reference, certifications, company_size, market_rank, logo, repo, license, sources, last_verified, needs_review.

El body del markdown es la descripción extendida (editable por humanos, los scripts nunca lo sobrescriben).

## Patrones importantes

- **Datos solo en servidor**: `getCollection("tools")` solo funciona en `.astro` (server-side). Las páginas `.astro` cargan datos y los pasan como props a componentes React.
- **Slugs**: derivados del `id` de Astro (nombre del archivo sin `.md`). La función `toToolEntry()` en `lib/tools.ts` normaliza los slugs.
- **Diseño**: tokens CSS en `src/styles/global.css`. Usar las clases utilitarias `container-app`, `card`, `chip` para consistencia.
