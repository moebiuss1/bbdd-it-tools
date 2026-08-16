---
name: Samhain
slug: samhain-ids
categories:
- ids
tags:
  - ids
  - hids
  - unix
  - linux
  - rootkit
  - fim
type: opensource
cost_model: suscripción
cost_details: Gratuito. HIDS con base de datos centralizada.
website: https://www.la-samhna.de/samhain/
description: Sistema de detección de intrusiones en host (HIDS) con monitorización de integridad de ficheros, detección de
  rootkits, monitorización de logs y puertos. Diseñado para entornos con múltiples servidores UNIX/Linux.
why_reference: Samhain es uno de los HIDS más completos para entornos UNIX/Linux, con capacidades de monitorización de integridad,
  detección de rootkits y gestión centralizada. Su diseño para entornos multi-servidor con cliente sigiloso la diferencia.
certifications: []
company_size:
- mediana
- grande
market_rank:
  ids: 11
repo: https://www.la-samhna.de/samhain/
license: GPL-2.0
sources:
- https://www.gartner.com/reviews/market/intrusion-prevention-systems
first_added: 2026-08-10
last_verified: '2026-08-10'
logo: /logos/samhain-ids.png
needs_review: false
---

Samhain es un HIDS que combina monitorización de integridad de ficheros con detección de rootkits, vigilancia de
logs y de puertos abiertos. Su rasgo distintivo es la operación centralizada: los agentes reportan cifrados a un
servidor que guarda las líneas base fuera del alcance del sistema vigilado.

## Dónde encaja

En el servidor, como control de integridad. Esa arquitectura cliente-servidor es lo que lo hace apto para parques
grandes, donde mantener una base de datos local por máquina resulta ingobernable.

## A tener en cuenta

Su configuración es notablemente más laboriosa que la de AIDE, y la documentación es densa. A cambio, protege el
punto débil clásico del control de integridad: que el atacante reescriba la referencia. Sigue siendo una opción sin
coste de licencia para cubrir el requisito de FIM que exigen PCI DSS y buena parte de los marcos de seguridad.
