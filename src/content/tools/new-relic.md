---
name: New Relic
slug: new-relic
categories:
- infra-monitoring
tags:
- apm
- observability
- monitoring
- logs
- tracing
- opentelemetry
type: comercial
cost_model: freemium
cost_details: Cien gigabytes de ingesta y un usuario completo gratuitos al mes; después, por gigabyte ingerido y
  por usuario.
website: https://newrelic.com
cert_url: https://newrelic.com/security
description: Plataforma de observabilidad todo en uno con monitorización de aplicaciones, infraestructura, registros,
  trazas, navegador y móvil sobre una única base de datos de telemetría.
why_reference: New Relic fue la empresa que popularizó la monitorización de rendimiento de aplicaciones como servicio
  y sigue siendo uno de los referentes del mercado de observabilidad que sigue Gartner. Su modelo de precio por
  dato ingerido y usuario, con un nivel gratuito amplio, la hace accesible a equipos pequeños que necesitan trazado
  completo.
certifications:
- ISO 27001
- SOC 2 Tipo II
- ISO 27017
- ISO 27018
- FedRAMP
- HIPAA
company_size:
- pequeña
- mediana
- grande
market_rank:
  infra-monitoring: 5
sources:
- https://www.gartner.com/reviews/market/observability-platforms
- https://en.wikipedia.org/wiki/New_Relic
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/new-relic.png
needs_review: false
---

New Relic reúne en un mismo almacén las métricas, los eventos, los registros y las trazas, y los consulta con un lenguaje propio parecido a SQL. Esa unificación evita el salto entre consolas: desde una transacción lenta se llega a la traza distribuida, de ahí al registro del contenedor que la sirvió y de ahí a la métrica del host.

La cobertura es amplia: agentes para los lenguajes principales, monitorización de infraestructura y Kubernetes, experiencia de usuario real y sintética, aplicaciones móviles y más de cuatrocientas integraciones con servicios cloud. Es compatible con OpenTelemetry, lo que permite instrumentar de forma neutral y no quedar atado al agente del fabricante.

Su cambio de modelo comercial —pago por datos ingeridos y por usuario con acceso completo, en lugar de por host— resulta especialmente favorable en arquitecturas con muchos contenedores efímeros.
