---
name: BBDD IT Tools
description: Directorio vivo de herramientas IT para seguridad, cumplimiento y auditoría — diseño editorial, mínima distracción, máxima claridad
colors:
  ink: "#1d1d1f"
  ink-muted: "#86868b"
  ink-faint: "#aeaeb2"
  paper: "#ffffff"
  paper-warm: "#f5f5f7"
  paper-footer: "#fafafa"
  border: "#e8e8ed"
  border-light: "#d2d2d7"
  blue-accent: "#0071e3"
  blue-hover: "#0066cc"
  blue-bg: "#e8f2fd"
  green-bg: "#ecfdf5"
  green-text: "#059669"
  amber-bg: "#fffbeb"
  amber-text: "#d97706"
  teal-bg: "#f0fdfa"
  teal-text: "#0d9488"
  gray-bg: "#f3f4f6"
  gray-text: "#6b7280"
  rank-gold-bg: "rgba(251,243,219,0.4)"
  tier-lider-bg: "#fffbeb"
  tier-lider-text: "#92400e"
  tier-lider-border: "#fde68a"
  tier-visionario-bg: "#eff6ff"
  tier-visionario-text: "#1e40af"
  tier-visionario-border: "#bfdbfe"
  tier-retador-bg: "#ecfdf5"
  tier-retador-text: "#065f46"
  tier-retador-border: "#a7f3d0"
  tier-nicho-bg: "#f9fafb"
  tier-nicho-text: "#6b7280"
  tier-nicho-border: "#e5e7eb"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.47059
  body-small:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.04em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  "2xl": "24px"
  "3xl": "32px"
  "4xl": "40px"
  "5xl": "48px"
  "6xl": "64px"
  "7xl": "80px"
components:
  button-primary:
    backgroundColor: "{colors.blue-accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  badge-filled:
    backgroundColor: "{colors.blue-bg}"
    textColor: "{colors.blue-accent}"
    rounded: "{rounded.full}"
    padding: "3px 10px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "20px"
  chip-tag:
    backgroundColor: "{colors.gray-bg}"
    textColor: "{colors.gray-text}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  nav-link:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  nav-link-hover:
    backgroundColor: "{colors.paper-warm}"
    textColor: "{colors.ink}"
---

# Design System: BBDD IT Tools

## 1. Overview

**Creative North Star: "La Base de Datos Tipográfica"**

BBDD IT Tools se viste como lo que es: una base de datos con criterio tipográfico. No es una revista, no es un SaaS, no es un portfolio. Es información estructurada que se lee con la misma fluidez que un informe bien maquetado. El diseño no compite con el contenido; lo sirve con la precisión de un editor, no con el entusiasmo de un marketer.

La paleta es monocromática con un solo acento azul (#0071e3) que aparece con moderación —enlaces, botones principales, foco— y nunca compite consigo mismo. Los fondos alternan entre blanco puro y grises casi-blancos para crear zonas sin recurrir a sombras decorativas. La tipografía es el sistema operativo: San Francisco en Apple, Helvetica Neue como respaldo, sin fuentes web que cargar. La jerarquía se construye con peso (400 → 500 → 600 → 700) y escala (11px → 13px → 15px → 16px → 22px → 28px → clamp display), no con color ni decoración.

Este sistema rechaza explícitamente: gradientes, glassmorphism, bordes laterales decorativos, texto en degradado, contadores animados, ilustraciones vectoriales genéricas, dark mode forzado, y cualquier elemento que un auditor consideraría "ruido". Si un dato no tiene fuente, se marca; si un diseño no sirve al dato, se elimina.

**Key Characteristics:**
- Monocromático con un solo acento azul, usado con contención
- Tipografía de sistema: cero fuentes web, carga instantánea
- Espacios generosos, densidad controlada
- Sin sombras decorativas: la profundidad responde al estado, no decora
- Sin JavaScript innecesario: todo el filtrado es server-side vía URL params

## 2. Colors

Una paleta restringida construida sobre la temperatura neutra del sistema operativo. Un solo acento cromático —azul Apple (#0071e3)— que aparece en ≤10% de cualquier pantalla.

### Primary
- **Blue Accent** (#0071e3): Enlaces, botones principales, anillo de foco, texto de marca. El único color que afirma presencia. En hover se oscurece a #0066cc.

### Neutral
- **Ink** (#1d1d1f): Texto principal. Casi negro, ligeramente cálido. Contraste ≥12:1 sobre blanco.
- **Ink Muted** (#86868b): Texto secundario, descripciones, metadatos. Contraste ~3.5:1 — justo en el límite WCAG AA para 14px+. Usar solo en cuerpo pequeño (13px+) o labels.
- **Ink Faint** (#aeaeb2): Metadatos de baja prioridad, placeholders, separadores visuales. No usar para texto que deba leerse.
- **Paper** (#ffffff): Fondo principal. Blanco puro.
- **Paper Warm** (#f5f5f7): Fondo alternativo para secciones, hero gradient-to-white, hover de elementos. El gris casi-blanco de Apple.
- **Paper Footer** (#fafafa): Fondo del footer. Un tono más cálido que Paper Warm para cerrar la página.
- **Border** (#e8e8ed): Bordes de cards, separadores, header bottom. Presente pero discreto.
- **Border Light** (#d2d2d7): Bordes de badges outline, separadores en filtros.

### Semantic
- **Green** (#ecfdf5 bg / #059669 text): Badges de herramientas Open Source. Verde frío, profesional.
- **Amber** (#fffbeb bg / #d97706 text): Badges de ranking (#1, #2, #3). Ámbar cálido, institucional.
- **Teal** (#f0fdfa bg / #0d9488 text): Badges de certificaciones. Verde-azulado, técnico.
- **Gray** (#f3f4f6 bg / #6b7280 text): Badges de tamaño de empresa y etiquetas neutras.

### Tier Colors (Ranking)
- **Líder** (#fffbeb bg, #92400e text, #fde68a border): Oro institucional.
- **Visionario** (#eff6ff bg, #1e40af text, #bfdbfe border): Azul profundo.
- **Retador** (#ecfdf5 bg, #065f46 text, #a7f3d0 border): Verde bosque.
- **Nicho** (#f9fafb bg, #6b7280 text, #e5e7eb border): Gris neutro.

### Named Rules
**The One Accent Rule.** Blue Accent (#0071e3) ocupa ≤10% de la superficie de cualquier pantalla. Su rareza es el punto. Si dos elementos azules compiten por atención en el mismo viewport, uno debe degradarse a Ink Muted.

**The Ink-Only Rule.** Todo texto que no sea un enlace o un badge semántico se renderiza en Ink (#1d1d1f) o sus derivados (Muted, Faint). Nunca texto coloreado como decoración.

## 3. Typography

**Font Stack:** San Francisco (sistema operativo) → Helvetica Neue → Arial → sans-serif. Cero fuentes web. La tipografía del sistema garantiza carga instantánea, renderizado nativo, y coherencia con el entorno del usuario.

**Character:** San Francisco es la voz del sistema operativo: neutral, legible, invisible. No tiene personalidad propia; la hereda del contenido que viste. En Display y Headline, el tracking negativo (-0.02em) aporta tensión controlada. En Body, el tracking neutro y la altura de línea generosa (1.47) priorizan la lectura prolongada.

### Hierarchy
- **Display** (700, clamp(2rem, 5vw, 3.25rem), 1.1): Hero principal. Una sola instancia por página. Tracking -0.02em. Usar `text-wrap: balance`.
- **Headline** (700, clamp(1.5rem, 4vw, 2.5rem), 1.15): Títulos de herramienta en detalle. Tracking -0.02em.
- **Title** (600, 22px, 1.15): Títulos de sección, nombres de herramienta en cards. Tracking -0.01em.
- **Body** (400, 16px, 1.47): Texto de lectura. Máximo 65-75 caracteres por línea en columna ancha. Usar `text-wrap: pretty`.
- **Body Small** (400, 13px, 1.5): Descripciones en cards, metadatos, conteos de filtros.
- **Label** (500, 11px, 1.3, 0.04em): Badges, etiquetas, categorías en cards. Uppercase solo en este nivel y solo para ≤4 palabras.

## 4. Elevation

**Elevación por estado.** Las superficies son planas en reposo. Las sombras aparecen solo como respuesta a un cambio de estado (hover, focus), nunca como decoración estática. Esto mantiene la interfaz limpia y evita el "ruido de elevación" que distrae de los datos.

### Shadow Vocabulary
- **Card rest** (`0 1px 3px rgba(0,0,0,0.04)`): Una sombra casi imperceptible. Solo existe para separar la card del fondo en el eje Z sin que el usuario la note.
- **Card hover** (`0 4px 16px rgba(0,0,0,0.08)`): Elevación suave que responde al cursor. La card "se levanta" ligeramente, indicando que es interactiva.
- **Focus ring** (`0 0 0 3px rgba(0,113,227,0.15)`): Anillo de foco sutil alrededor de inputs y elementos interactivos. Sin offset, sin blur grande.

### Named Rules
**The Flat-By-Default Rule.** Las superficies son planas en reposo. Las sombras aparecen solo en respuesta a estado (hover, focus). Prohibido usar sombras como decoración estática en cards, secciones o headers.

**The Ghost Focus Rule.** El anillo de foco es azul (#0071e3) al 15% de opacidad, sin offset. Visible pero no estridente. Nunca usar el outline por defecto del navegador sin estilizar.

## 5. Components

### Buttons
- **Shape:** Cápsula completa (9999px radius). Sin bordes rectos, sin esquinas redondeadas intermedias.
- **Primary:** Fondo Blue Accent, texto blanco. Padding 10px 20px. Transición 0.15s en background. Hover: #0066cc.
- **Ghost:** Fondo blanco, texto Ink, borde Border Light. Padding 10px 20px. Hover: fondo Paper Warm.
- **Focus:** Anillo Ghost Focus (3px, Blue Accent al 15%).

### Chips / Badges
- **Style:** Cápsula completa, padding 3px 10px (md) o 2px 8px (sm). Font: Label.
- **Filled:** Los chips activos usan su color semántico de fondo con texto del mismo tono (blue-bg + blue-accent, green-bg + green-text, etc.).
- **Outline:** Los chips inactivos usan borde Border Light + texto Ink Muted. Hover: fondo Paper Warm.
- **Selected state:** Un chip está seleccionado cuando su fondo es el color semántico; inactivo cuando es outline.

### Cards
- **Corner Style:** 16px radius. Suficientemente redondeado para ser amable, no tanto para ser un botón.
- **Background:** Paper (#ffffff). Borde Border (#e8e8ed) de 1px.
- **Shadow Strategy:** Card rest en reposo, Card hover en hover. La sombra de reposo es casi invisible; existe por separación Z, no por estética.
- **Internal Padding:** 20px (tool-card). Suficiente para que el contenido respire sin parecer vacío.

### Inputs
- **Style:** Cápsula completa, fondo Paper Warm, borde Border Light. Placeholder en Ink Faint.
- **Focus:** Borde cambia a Blue Accent, fondo a Paper, anillo Ghost Focus exterior.

### Navigation
- **Style:** Header sticky con backdrop-blur(20px) y fondo rgba(255,255,255,0.85). 48px de altura.
- **Links:** Texto Ink Muted, 13px, padding 6px 12px, cápsula completa. Hover: fondo Paper Warm + texto Ink.
- **Brand:** Texto Ink, 15px, weight 600. Sin subrayado, sin decoración.

### Tool Avatar
- **Style:** 40×40px, 12px radius, fondo Paper Warm. Muestra el logo de la herramienta si existe; si no, la inicial en Ink Faint weight 700.

## 6. Do's and Don'ts

### Do:
- **Do** usar el espacio negativo como elemento estructural. Secciones separadas por 80px (space-y-20), cards por 12-16px.
- **Do** mantener una sola instancia de Blue Accent fuerte por viewport. Si compite, degradar.
- **Do** mostrar siempre fuentes verificables. Si un dato no está confirmado, marcarlo como `needs_review`.
- **Do** usar `text-wrap: balance` en headings, `text-wrap: pretty` en body copy.
- **Do** respetar la jerarquía tipográfica: Display → Headline → Title → Body → Body Small → Label. No saltarse pasos.

### Don't:
- **Don't** usar gradientes, glassmorphism, sombras decorativas, o cualquier efecto que un auditor consideraría "ruido visual".
- **Don't** usar dark mode. La herramienta se usa en oficinas con luz natural; el fondo blanco es funcional.
- **Don't** añadir animaciones de scroll, contadores animados, o ilustraciones vectoriales genéricas. Esto no es una landing de SaaS.
- **Don't** usar texto coloreado como decoración. Si no es un enlace, un badge semántico o un estado de error, va en Ink.
- **Don't** usar border-left o border-right mayor de 1px como acento decorativo en cards o callouts.
- **Don't** escribir buzzwords (streamline, empower, next-generation, cutting-edge). Cada herramienta se describe con datos, no con adjetivos.
- **Don't** superar los 65-75 caracteres por línea en texto de lectura. Si la columna es ancha, partir en grid.
- **Don't** usar más de una familia tipográfica. San Francisco cubre todos los pesos y tamaños necesarios.
