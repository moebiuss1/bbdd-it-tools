---
name: Postman
slug: postman
categories:
- api-testing
tags:
- api-testing
- api
- developer-tools
- automation
- documentation
type: comercial
cost_model: freemium
cost_details: Plan gratuito para equipos pequeños; planes Basic, Professional y Enterprise por usuario y mes.
website: https://www.postman.com
cert_url: https://www.postman.com/trust/
description: Plataforma de desarrollo y prueba de APIs con colecciones, entornos, aserciones automatizadas, simulación
  de servidores y ejecución en integración continua.
why_reference: 'Postman es la herramienta con la que se prueba una API por defecto: decenas de millones de desarrolladores
  la usan y sus colecciones se han convertido en un formato de intercambio de facto para documentar y compartir
  pruebas de API entre equipos.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- RGPD / GDPR
company_size:
- pequeña
- mediana
- grande
market_rank:
  api-testing: 1
sources:
- https://en.wikipedia.org/wiki/Postman_(software)
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/postman.png
needs_review: false
---

Postman empezó como una extensión para lanzar peticiones HTTP a mano y hoy cubre el ciclo completo: diseño de la especificación, generación de la documentación, simulación de servidores antes de que exista el backend, pruebas automatizadas y monitorización periódica de puntos finales en producción.

Para pruebas, cada petición admite aserciones en JavaScript sobre código de estado, cabeceras, tiempo de respuesta o contenido del cuerpo, y las colecciones se agrupan por entorno —desarrollo, preproducción, producción— con variables y secretos separados. El ejecutor de línea de órdenes permite lanzar la misma colección desde una tubería de integración continua y fallar la construcción si una aserción no pasa.

En organizaciones grandes su papel es también de catálogo: un espacio de trabajo compartido donde queda registrado qué APIs existen, cómo se autentican y qué contratos cumplen.
