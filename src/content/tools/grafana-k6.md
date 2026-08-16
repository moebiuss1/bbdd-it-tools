---
name: Grafana k6
slug: grafana-k6
categories:
- api-testing
tags:
- api-testing
- load-testing
- performance
- opensource
- devops
- automation
type: opensource
cost_model: freemium
cost_details: k6 de código abierto gratuito (AGPLv3). Grafana Cloud k6 por suscripción según usuarios virtuales.
website: https://k6.io
description: Herramienta moderna de pruebas de carga y fiabilidad con guiones en JavaScript, pensada para ejecutarse
  dentro de la tubería de despliegue.
why_reference: 'k6 es la referencia actual de las pruebas de rendimiento como código: los escenarios se escriben
  en JavaScript, se versionan junto al servicio y se ejecutan en cada despliegue con umbrales que fallan la construcción.
  Es el enfoque que ha sustituido a las pruebas de carga puntuales en los equipos que practican entrega continua.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/grafana/k6
license: AGPL-3.0
market_rank:
  api-testing: 3
sources:
- https://en.wikipedia.org/wiki/K6_(software)
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/grafana-k6.png
needs_review: false
---

k6 sustituye la interfaz gráfica por código: un guion en JavaScript describe el escenario, los perfiles de carga —rampas, carga constante, picos, saturación— y los umbrales de aceptación, por ejemplo que el percentil 95 del tiempo de respuesta no supere los 500 milisegundos. Si el umbral no se cumple, el proceso devuelve error y la tubería de despliegue se detiene.

El motor está escrito en Go, así que genera mucha carga con pocos recursos, y admite HTTP, WebSocket, gRPC y navegador real para medir métricas de experiencia de usuario. Los resultados se exportan a Prometheus, InfluxDB o Grafana Cloud, donde se comparan entre ejecuciones para detectar regresiones de rendimiento entre versiones.

Al pertenecer a Grafana Labs, encaja de forma natural en pilas de observabilidad ya montadas sobre Prometheus y Grafana, cerrando el círculo entre la prueba sintética y la métrica de producción.
