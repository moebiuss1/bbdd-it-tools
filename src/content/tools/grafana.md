---
name: Grafana
slug: grafana
categories:
- infra-monitoring
tags:
- monitoring
- dashboards
- observability
- opensource
- metrics
- logs
- alerting
type: opensource
cost_model: freemium
cost_details: Grafana OSS gratuito (AGPLv3). Grafana Cloud con plan gratuito y niveles de pago; Grafana Enterprise
  por suscripción.
website: https://grafana.com
description: Plataforma de visualización y alertado que consulta decenas de orígenes —Prometheus, Elasticsearch,
  bases SQL, servicios cloud— y los combina en cuadros de mando unificados.
why_reference: 'Grafana es la capa de visualización estándar de la observabilidad moderna: prácticamente cualquier
  sistema de métricas se acaba mirando a través de ella, y su capacidad de mezclar orígenes distintos en un mismo
  panel evita tener una consola por herramienta.'
certifications:
- ISO 27001
- SOC 2 Tipo II
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/grafana/grafana
license: AGPL-3.0
market_rank:
  infra-monitoring: 3
sources:
- https://www.gartner.com/reviews/market/observability-platforms
- https://en.wikipedia.org/wiki/Grafana
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/grafana.png
needs_review: false
---

Grafana no almacena datos: se conecta a los sistemas que ya los tienen. Con más de cien orígenes soportados —Prometheus, Loki, Elasticsearch, InfluxDB, bases de datos relacionales, CloudWatch, Azure Monitor— permite construir un cuadro de mando que combine la métrica de infraestructura, el registro de la aplicación y el dato de negocio en la misma pantalla.

Sus paneles admiten variables, de modo que un mismo cuadro de mando sirve para cualquier entorno, servicio o cliente sin duplicarlo, y las anotaciones permiten marcar despliegues e incidencias sobre la línea temporal, que es lo que convierte una gráfica en una explicación.

El alertado unificado define reglas sobre cualquier origen y las encamina a los canales habituales con silencios y horarios de guardia. Grafana Cloud añade el almacenamiento gestionado de métricas, registros y trazas para quien no quiere operar la pila completa.
