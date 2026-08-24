---
name: ModSecurity
slug: modsecurity
categories:
- waf
tags:
- waf
- opensource
- owasp
- apache
- nginx
- web-security
type: opensource
cost_model: gratis
cost_details: Motor y conjunto de reglas básicas (OWASP CRS) gratuitos bajo licencia Apache 2.0.
website: https://modsecurity.org
description: Motor de firewall de aplicaciones web libre, integrable en Apache, NGINX e IIS, y base del conjunto de reglas
  OWASP Core Rule Set.
why_reference: ModSecurity es el WAF de código abierto de referencia desde hace dos décadas y el motor sobre el que se escribió
  el OWASP Core Rule Set, el conjunto de reglas que casi todos los WAF comerciales usan como línea base de comparación. Hoy
  el proyecto lo mantiene la propia OWASP.
certifications:
- OWASP
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/owasp-modsecurity/ModSecurity
license: Apache-2.0
market_rank:
  waf: 6
sources:
- https://owasp.org/www-project-modsecurity/
- https://en.wikipedia.org/wiki/ModSecurity
- https://github.com/owasp-modsecurity/ModSecurity
first_added: 2026-08-14
last_verified: '2026-08-24'
logo: /logos/modsecurity.png
needs_review: false
---

ModSecurity es un motor de inspección de tráfico HTTP que se carga como módulo del servidor web y evalúa cada fase de la transacción —cabeceras, cuerpo, respuesta— contra reglas escritas en su propio lenguaje. Esa granularidad es la razón de que siga usándose para virtual patching: cuando aparece una vulnerabilidad en una aplicación que no se puede parchear de inmediato, una regla la bloquea mientras llega el arreglo.

Su valor práctico no está solo en el motor sino en el OWASP Core Rule Set, el conjunto de reglas genéricas contra inyección, cross-site scripting, inclusión de ficheros y escaneo automatizado, con niveles de paranoia configurables para equilibrar detección y falsos positivos.

Tras el fin del mantenimiento por parte de Trustwave, el proyecto pasó a la OWASP Foundation, que mantiene la versión 3 y la integración con NGINX. Es la opción cuando el WAF debe ir en el propio servidor, sin servicio externo ni coste de licencia.
