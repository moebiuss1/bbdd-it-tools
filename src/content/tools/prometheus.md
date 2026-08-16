---
name: Prometheus
slug: prometheus
categories:
- infra-monitoring
tags:
- monitoring
- metrics
- kubernetes
- opensource
- cncf
- alerting
- timeseries
type: opensource
cost_model: gratis
cost_details: Proyecto graduado de la CNCF bajo licencia Apache 2.0, sin coste de licencia.
website: https://prometheus.io
description: Sistema de monitorización y alertado basado en series temporales, con recogida por sondeo, lenguaje de consulta
  propio y descubrimiento automático de objetivos.
why_reference: 'Prometheus es el estándar de facto de la monitorización de infraestructura moderna y el segundo proyecto graduado
  de la CNCF tras Kubernetes. Su formato de exposición de métricas es hoy un estándar del sector: casi cualquier componente
  de infraestructura publica sus métricas en él.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/prometheus/prometheus
license: Apache-2.0
market_rank:
  infra-monitoring: 2
sources:
- https://www.cncf.io/projects/prometheus/
- https://en.wikipedia.org/wiki/Prometheus_(software)
- https://prometheus.io/
certifications: []
first_added: 2026-08-14
last_verified: '2026-08-16'
logo: /logos/prometheus.png
needs_review: false
---

Prometheus recoge métricas sondeando puntos finales HTTP que exponen los propios componentes, las almacena como series temporales identificadas por nombre y etiquetas, y permite consultarlas con PromQL, un lenguaje pensado para agregar, derivar y comparar series en el tiempo.

El descubrimiento automático de objetivos es lo que lo hace encajar en entornos dinámicos: en Kubernetes detecta los pods y servicios nuevos y empieza a recogerlos sin reconfigurar nada, algo imposible con las herramientas de monitorización basadas en inventario estático.

Las alertas se definen como expresiones sobre esas mismas consultas y se envían a Alertmanager, que las agrupa, silencia y encamina a los destinos correspondientes. El almacenamiento local está pensado para semanas; para retención larga y consultas globales se combina con Thanos, Mimir o Cortex.
