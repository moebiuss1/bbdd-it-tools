---
name: HAProxy
slug: haproxy
categories:
- load-balancers
tags:
- load-balancing
- proxy
- opensource
- high-availability
- http
type: opensource
cost_model: freemium
cost_details: HAProxy Community gratuito (GPLv2). HAProxy Enterprise con soporte, WAF y bot management por suscripción.
website: https://www.haproxy.org
description: Balanceador de carga y proxy TCP/HTTP de altísimo rendimiento, referencia en entornos donde la disponibilidad
  y la latencia son críticas.
why_reference: HAProxy es el balanceador de software con mayor rendimiento por núcleo del mercado y la elección
  habitual delante de bases de datos, APIs y plataformas de alto tráfico. Gartner lo sigue en el mercado de application
  delivery controllers, y su versión libre sostiene infraestructuras de escala pública sin coste de licencia.
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/haproxy/haproxy
license: GPL-2.0
market_rank:
  load-balancers: 5
sources:
- https://www.gartner.com/reviews/market/application-delivery-controllers
- https://en.wikipedia.org/wiki/HAProxy
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/haproxy.png
needs_review: false
---

HAProxy lleva dos décadas resolviendo un problema muy concreto: repartir millones de conexiones por segundo con una latencia predecible y sin caídas durante los recargados de configuración. Su modelo de un solo proceso multihilo, sin bloqueos, es el motivo de que aparezca delante de cargas donde el balanceador no puede ser el cuello de botella.

Ofrece comprobaciones de salud activas y pasivas, enrutado por contenido en capa 7, límites de tasa, terminación TLS, observabilidad detallada por servidor y backend, y una consola de estadísticas que permite sacar un nodo de servicio en caliente. La edición Enterprise añade WAF, gestión de bots, alta disponibilidad gestionada y soporte comercial.

Su fichero de configuración declarativo y su API de tiempo de ejecución lo hacen fácil de automatizar, y el proyecto mantiene versiones LTS con soporte de varios años, algo relevante cuando el balanceador es infraestructura crítica.
