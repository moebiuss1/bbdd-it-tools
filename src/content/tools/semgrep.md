---
name: Semgrep
slug: semgrep
categories:
- code-quality
tags:
- sast
- opensource
- devsecops
- static-analysis
- secrets
- custom-rules
- code-quality
type: opensource
cost_model: freemium
cost_details: Motor y reglas de la comunidad gratuitos (LGPL 2.1). Semgrep AppSec Platform por desarrollador y mes.
website: https://semgrep.dev
description: Analizador estático de código ligero cuyas reglas se escriben con la sintaxis del propio lenguaje analizado,
  con catálogo comunitario y detección de secretos.
why_reference: 'Semgrep ha cambiado la economía del análisis estático: escribir una regla propia cuesta minutos en vez de
  días, así que los equipos codifican sus propios estándares en vez de limitarse al catálogo del fabricante. Es la herramienta
  libre de referencia en el mercado de application security testing.'
certifications:
- SOC 2 Tipo II
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/semgrep/semgrep
license: LGPL-2.1
market_rank:
  code-quality: 6
sources:
- https://www.gartner.com/reviews/market/application-security-testing
- https://en.wikipedia.org/wiki/Semgrep
- https://github.com/semgrep/semgrep
first_added: 2026-08-14
last_verified: '2026-08-31'
logo: /logos/semgrep.png
needs_review: false
---

La idea de Semgrep es que una regla se parezca al código que busca: en lugar de escribir consultas sobre un árbol sintáctico, se escribe el patrón con la sintaxis del lenguaje y comodines. Detectar que alguien llama a una función peligrosa con una entrada de usuario cabe en tres líneas, y eso hace viable que cada equipo codifique sus propias normas internas.

El catálogo público reúne miles de reglas mantenidas por la comunidad y por el fabricante, cubriendo el OWASP Top 10, malas prácticas por marco de trabajo y errores frecuentes por lenguaje. La ejecución es rápida porque no requiere compilar el proyecto, lo que permite analizar en cada solicitud de incorporación solo el código modificado.

La plataforma comercial añade análisis de dependencias con alcance, detección de secretos filtrados, gestión de hallazgos y flujo de trabajo entre desarrollo y seguridad.
