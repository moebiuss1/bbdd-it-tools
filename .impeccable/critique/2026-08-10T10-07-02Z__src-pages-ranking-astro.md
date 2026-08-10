---
target: todas las superficies
total_score: 28
p0_count: 0
p1_count: 3
timestamp: 2026-08-10T10-07-02Z
slug: src-pages-ranking-astro
---
# Critique: BBDD IT Tools

## Design Health Score: 28/40 (Good)

| # | Heurística | Nota | Hallazgo clave |
|---|-----------|------|----------------|
| 1 | Visibilidad del estado | 3/4 | Filtros activos visibles, conteo de resultados. Falta feedback al clickar checkboxes |
| 2 | Mundo real | 4/4 | Lenguaje técnico apropiado para CISO y auditores |
| 3 | Control y libertad | 3/4 | Limpiar filtros, Esc cierra modal, back/forward. Falta undo |
| 4 | Consistencia | 3/4 | Cards, badges y tipografía consistentes. Inline styles mezclados con CSS |
| 5 | Prevención de errores | 3/4 | Empty state con CTA, búsqueda tolerante. Falta confirmación al limpiar filtros |
| 6 | Reconocer vs recordar | 3/4 | Chips de filtros, badges de selección. Checkboxes ocultos en modal |
| 7 | Flexibilidad y eficiencia | 2/4 | Sin atajos de teclado, sin comparación, sin favoritos |
| 8 | Estética minimalista | 3/4 | Limpio, sin ruido visual. Hero con métricas es cliché SaaS |
| 9 | Recuperación de errores | 3/4 | Empty state con guía. Sin mensajes de error específicos |
| 10 | Ayuda y documentación | 1/4 | Sin tooltips, sin ayuda contextual, sin explicación de puntuación in-situ |
| **Total** | | **28/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment**: Pasa el slop test. Sin glassmorphism, gradient text, side-stripes ni uppercase eyebrows. Una sola familia tipográfica. El hero con métricas es el único cliché SaaS. La home con 15 secciones de cards idénticas resulta monótona.

**Detector**: 1 finding — `layout-transition` en ranking.astro (transición de width en barras del gráfico). Menor, sin impacto real.

## Priority Issues

- [P1] Home interminable con 15 secciones de cards idénticas → acordeones colapsables
- [P1] Sin ayuda contextual en la puntuación → barra de percentil, tooltips, escala de referencia
- [P1] Checkboxes del modal son divs → input type="checkbox" reales con focus-visible
- [P2] Sin atajos de teclado → atajo "/" para buscar
- [P2] Hero con métricas genéricas → reemplazado con buscador prominente

## Persona Red Flags

**Alex (CISO)**: Sin atajos, sin vista de novedades, sin comparación de herramientas.
**Jordan (nuevo)**: Puntuación sin explicación, categorías técnicas sin descripción.
**Sam (lector de pantalla)**: Checkboxes invisibles para el lector, sin roles ARIA.
