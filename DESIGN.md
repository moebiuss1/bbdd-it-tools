---
name: BBDD IT Tools
description: Directorio vivo de herramientas IT para seguridad, cumplimiento y auditoría — diseño editorial, mínima distracción, máxima claridad
colors:
  ink: "#1d1d1f"
  ink-muted: "#6e6e73"
  ink-faint: "#8e8e93"
  paper: "#ffffff"
  paper-warm: "#f5f5f7"
  paper-footer: "#fafafa"
  border: "#e8e8ed"
  border-light: "#d2d2d7"
  blue-accent: "#0071e3"
  blue-text: "#0066cc"
  blue-hover: "#0058b0"
  blue-bg: "#e8f2fd"
  green-bg: "#ecfdf5"
  green-text: "#047857"
  amber-bg: "#fffbeb"
  amber-text: "#b45309"
  teal-bg: "#f0fdfa"
  teal-text: "#0f766e"
  gray-bg: "#f3f4f6"
  gray-text: "#4b5563"
  focus-ring: "0 0 0 2px #ffffff, 0 0 0 4px rgba(0,113,227,0.65)"
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
  tier-nicho-text: "#4b5563"
  tier-nicho-border: "#e5e7eb"
motion:
  ease: "cubic-bezier(0.25, 1, 0.5, 1)"
  fast: "0.15s"
  base: "0.22s"
  slow: "0.4s"
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
    backgroundColor: "{colors.blue-text}"
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
    textColor: "{colors.blue-text}"
    rounded: "{rounded.full}"
    padding: "3px 10px"
  kbd-hint:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
  copy-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
  filter-pill:
    backgroundColor: "{colors.blue-bg}"
    textColor: "{colors.blue-text}"
    rounded: "{rounded.full}"
    padding: "4px 6px 4px 11px"
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
- Sin JavaScript innecesario: el catálogo llega renderizado del build y el filtrado se resuelve en cliente sobre ese HTML, con el estado reflejado en la URL

## 2. Colors

Una paleta restringida construida sobre la temperatura neutra del sistema operativo. Un solo acento cromático —azul Apple (#0071e3)— que aparece en ≤10% de cualquier pantalla.

### Primary
El azul de marca tiene dos papeles, y confundirlos cuesta legibilidad:

- **Blue Accent** (#0071e3): el azul **gráfico**. Trazos, rellenos, anillo de foco, resaltado del diagrama de infraestructura, series de los gráficos, `::selection`. Nunca lleva texto encima ni se usa como color de texto.
- **Blue Text** (#0066cc): el azul de **texto**. Enlaces, botones principales, badges azules, píldoras de filtro. Sobre blanco da 5,13:1; #0071e3 se queda en 4,31:1 y no llega al mínimo en los cuerpos de 12-14px que domina el sitio. Es el mismo color un paso más oscuro: la identidad no cambia, la lectura sí. En hover del botón primario baja a #0058b0.

### Neutral
- **Ink** (#1d1d1f): Texto principal. Casi negro, ligeramente cálido. Contraste ≥12:1 sobre blanco.
- **Ink Muted** (#6e6e73): Texto secundario, descripciones, metadatos. Contraste 5.07:1 sobre blanco — cumple WCAG AA para cualquier tamaño. Usar para body small (13px), descripciones y navegación secundaria.
- **Ink Faint** (#8e8e93): Metadatos de baja prioridad, placeholders, separadores visuales. Contraste 3.23:1 — aceptable para texto decorativo ≤13px. No usar para body copy.
- **Paper** (#ffffff): Fondo principal. Blanco puro.
- **Paper Warm** (#f5f5f7): Fondo alternativo para secciones, hero gradient-to-white, hover de elementos. El gris casi-blanco de Apple.
- **Paper Footer** (#fafafa): Fondo del footer. Un tono más cálido que Paper Warm para cerrar la página.
- **Border** (#e8e8ed): Bordes de cards, separadores, header bottom. Presente pero discreto.
- **Border Light** (#d2d2d7): Bordes de badges outline, separadores en filtros.

### Semantic
Los badges llevan texto de 11-12px sobre fondos casi blancos. Con los tonos -600 de cada familia se quedaban entre 3,0:1 y 4,4:1; el escalón -700 cruza los 4,5:1 sin cambiar el color percibido.

- **Green** (#ecfdf5 bg / #047857 text): Badges de herramientas Open Source. Verde frío, profesional.
- **Amber** (#fffbeb bg / #b45309 text): Badges de ranking (#1, #2, #3). Ámbar cálido, institucional.
- **Teal** (#f0fdfa bg / #0f766e text): Badges de certificaciones. Verde-azulado, técnico.
- **Gray** (#f3f4f6 bg / #4b5563 text): Badges de tamaño de empresa y etiquetas neutras.
- **Red** (#fef2f2 bg / #b91c1c text): Puntuación por debajo de 40.

Los mismos tres tonos (verde / ámbar / rojo) codifican la puntuación BBDD IT en el directorio, los rankings y el anillo de la ficha. Si se toca uno hay que tocar los tres sitios: la función vive duplicada como `scoreColor()` en `herramientas/index.astro` y en línea en `ranking.astro` y `herramientas/[slug].astro`.

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
- **Focus ring** (`0 0 0 2px #fff, 0 0 0 4px rgba(0,113,227,0.65)`): Dos capas —halo blanco y aro azul sólido— alrededor del elemento enfocado. El halo lo despega del fondo, así que se ve igual sobre blanco que sobre gris.
- **Focus ring de campo** (`0 0 0 3px rgba(0,113,227,0.15)` + borde azul): los inputs sí conservan el anillo tenue, porque el borde del propio campo cambia a azul y ya marca el foco.

### Named Rules
**The Flat-By-Default Rule.** Las superficies son planas en reposo. Las sombras aparecen solo en respuesta a estado (hover, focus). Prohibido usar sombras como decoración estática en cards, secciones o headers.

**The Visible Focus Rule.** El anillo de foco se ve. Antes era azul al 15% de opacidad: sobre blanco resultaba casi indistinguible y quien navega con teclado no sabía dónde estaba. Ahora son dos capas (halo blanco de 2px + aro azul sólido de 2px). Nunca usar el outline por defecto del navegador sin estilizar, y nunca quitarlo sin poner otro.

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
- **Style:** 40×40px, 12px radius, fondo Paper Warm. Muestra el logo de la herramienta si existe; si no, la inicial en Ink Muted weight 700. Crece un 6% cuando el cursor entra en su tarjeta.

### Keyboard Hint (`.kbd-hint`)
- **Qué es:** la tecla `/` dibujada dentro del buscador. Anuncia el atajo que enfoca el campo desde cualquier punto de la página.
- **Style:** 20px de alto, borde inferior de 2px (aspecto de tecla), Ink Muted sobre Paper. Se atenúa a opacidad 0 al enfocar el campo.
- **Regla:** solo en dispositivos con puntero fino (`hover:hover and pointer:fine`). En una pantalla táctil no hay tecla que pulsar y el hueco sobra.

### Copy Button (`.copy-link`)
- **Style:** cápsula de ancho completo, borde Border Light. Al copiar pasa a fondo Green Bg + texto Green Text durante 1,8s, con el icono cambiado a un visto, y vuelve solo.
- **Regla:** la confirmación ocurre **en el propio botón**. Nada de avisos flotantes que tapen la ficha o haya que cerrar.

### Filter Pill (`.pill`)
- **Style:** cápsula Blue Bg + Blue Text con una `×` en círculo. Entra con un fundido y escala de 0,92 a 1 en 220ms.
- **Aviso de implementación:** la crea el script del directorio con `createElement`, así que **sus estilos tienen que vivir en `global.css`**. Definirla en el `<style>` de la página la deja sin estilo: Astro sella esos selectores con un atributo que los nodos creados en cliente no llevan.

### Comparison Table (`.compare-table`)
- **Dónde:** `/comparar`. Filas por atributo, columnas por herramienta, hasta tres.
- **Style:** columna de conceptos fija a la izquierda (`position:sticky`) sobre Paper Warm; cabecera fija arriba. La caja se desplaza en horizontal por dentro (`overflow-x:auto`), la página nunca.
- **Regla:** en una comparativa casi todas las filas difieren, así que resaltarlas todas no destaca nada. Solo se marca el mejor valor de las filas numéricas, en Green Text weight 700, con un `.sr-only` que lo dice en palabras.
- **Aviso de implementación:** la tabla la construye el script, así que sus estilos viven en `global.css` (misma razón que la píldora de filtro).

### Data Gaps Note (`.gaps-note`)
- **Qué es:** el bloque ámbar de la ficha que enumera lo que aún no se ha podido comprobar de esa herramienta.
- **Style:** fondo Amber Bg, borde Amber, texto Amber Text. Nunca rojo: la ficha es válida, solo incompleta.
- **Regla:** se deriva del propio dato (`dataGaps()`), no de que alguien recuerde marcar `needs_review`. Un hueco declarado vale más que un hueco disimulado.

### Quality Bars (`.quality-bars`)
- **Dónde:** `/calidad`. Rejilla de tres columnas —etiqueta, barra, número— que baja a dos filas por debajo de 520px.
- **Style:** pista de 8px en Paper Warm; relleno en verde/ámbar/rojo según lo que mida (evidencia disponible) o en Blue Accent cuando es un reparto neutro.
- **Regla:** el número siempre visible junto a la barra. Una barra sin cifra obliga a estimar a ojo.

### Category Count Chip (`.cat-item-n`)
- **Dónde:** índice de categorías y `/calidad`.
- **Style:** cifra tabular sobre Paper Warm. En ámbar cuando la categoría tiene menos de tres herramientas.
- **Regla:** el ámbar aquí no es una alerta, es una declaración: esa categoría todavía no permite comparar y por eso no publica posiciones.

### Scroll Shadows
- **Dónde:** cualquier caja con contenido más ancho que la pantalla (hoy, el diagrama de infraestructura).
- **Cómo:** cuatro degradados de fondo, dos anclados al contenido (`local`) y dos al marco (`scroll`). La sombra solo asoma por el lado donde queda contenido por ver. Sin JavaScript.
- **Regla:** una caja que se desplaza lleva `tabindex="0"` y `role="group"` con etiqueta. Si no recibe foco, quien no usa ratón no puede llegar a lo que hay dentro.

## 6. Motion

Una sola curva para todo el sitio: `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart). Arranca rápido y frena, que es como se mueve algo que responde a un gesto. Sin rebotes, sin elásticos, sin animaciones de scroll.

**Duraciones:** 150ms para respuestas inmediatas (hover, color), 220ms para cambios de estado (elevación, píldoras), 400-800ms para el dibujado de datos (anillo de puntuación, barras). Nada supera los 800ms.

**El movimiento informa, no decora.** El catálogo entero es:

| Gesto | Qué comunica |
|---|---|
| La tarjeta se eleva 2px | esto lleva a algún sitio |
| El botón cede a 0,97 | he registrado la pulsación |
| El recuento late | el filtro ha cambiado el resultado |
| El anillo se dibuja | esta puntuación se compone de estas partes |
| Las barras crecen escalonadas | esto es una medida, no un adorno |
| La flecha del botón avanza 3px | hacia allá vas |

### Named Rules

**The Already-There Rule.** Ninguna animación puede ser la única forma de ver algo. El anillo de puntuación, las barras y las píldoras tienen su estado final en el HTML; la animación solo lo recorre. Si el JavaScript no llega, la pestaña está oculta o el render no anima, la página se ve completa igual. Prohibido revelar contenido con una clase que dispara una transición.

**The Reduced-Motion Rule.** `prefers-reduced-motion: reduce` deja todas las duraciones en 0,01ms y anula los desplazamientos. No es una versión degradada: es la misma interfaz sin movimiento.

## 7. Do's and Don'ts

### Do:
- **Do** usar el espacio negativo como elemento estructural. Secciones separadas por 80px (space-y-20), cards por 12-16px.
- **Do** mantener una sola instancia de Blue Accent fuerte por viewport. Si compite, degradar.
- **Do** mostrar siempre fuentes verificables. Lo que no se ha podido comprobar se enumera en la propia ficha (`dataGaps()`) y se agrega en `/calidad`; `needs_review` queda para la marca editorial manual.
- **Do** usar `text-wrap: balance` en headings, `text-wrap: pretty` en body copy.
- **Do** respetar la jerarquía tipográfica: Display → Headline → Title → Body → Body Small → Label. No saltarse pasos.
- **Do** comprobar el contraste antes de dar por bueno un gris o un badge: 4,5:1 para texto normal, 3:1 a partir de 24px (o 18,66px en negrita). Las ocho páginas del sitio pasan hoy ese umbral, medido sobre el build con Chrome headless.
- **Do** dar 44px de zona sensible a lo que se toca con el dedo. Si el elemento debe seguir siendo pequeño, extender el área con un `::after` invisible (así lo hacen los enlaces de navegación) en vez de agrandarlo.
- **Do** poner los estilos de cualquier elemento creado con `createElement` en `global.css`, nunca en el `<style>` de la página.

### Don't:
- **Don't** usar gradientes, glassmorphism, sombras decorativas, o cualquier efecto que un auditor consideraría "ruido visual".
- **Don't** usar dark mode. La herramienta se usa en oficinas con luz natural; el fondo blanco es funcional.
- **Don't** añadir animaciones de scroll, contadores animados, o ilustraciones vectoriales genéricas. Esto no es una landing de SaaS.
- **Don't** usar texto coloreado como decoración. Si no es un enlace, un badge semántico o un estado de error, va en Ink.
- **Don't** usar #0071e3 como color de texto ni como fondo de texto blanco: para eso está #0066cc (ver *Primary*).
- **Don't** escribir `padding` en atajo sobre un elemento que ya lleva `.container`: anula el margen lateral y pega el contenido al borde en móvil.
- **Don't** usar Ink Faint (#8e8e93) para texto que aporte información. Queda para trazos de iconos y separadores.
- **Don't** usar border-left o border-right mayor de 1px como acento decorativo en cards o callouts.
- **Don't** publicar una posición de mercado (#1, #2) de una categoría con menos de tres herramientas: es un artefacto de la taxonomía, no un dato del mercado. Filtrar siempre con `hasMeaningfulRank()`.
- **Don't** anunciar como novedad lo que solo se ha vuelto a verificar. «Nuevo» se mide contra `first_added`; `last_verified` lo reescribe el pipeline en bloque cada lunes.
- **Don't** meter en una fila de navegación un bloque flex sin `flex-wrap`: no puede encoger por debajo de su ancho mínimo y arrastra el ancho de todo el documento en móvil (le pasó a la cabecera con cinco enlaces y al pie con siete).
- **Don't** escribir buzzwords (streamline, empower, next-generation, cutting-edge). Cada herramienta se describe con datos, no con adjetivos.
- **Don't** superar los 65-75 caracteres por línea en texto de lectura. Si la columna es ancha, partir en grid.
- **Don't** usar más de una familia tipográfica. San Francisco cubre todos los pesos y tamaños necesarios.
