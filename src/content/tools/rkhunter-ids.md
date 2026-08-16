---
name: Rkhunter
slug: rkhunter-ids
categories:
- ids
tags:
- ids
- rootkit
- linux
- open-source
- anti-malware
type: opensource
cost_model: suscripción
cost_details: Gratuito. Detector de rootkits para UNIX/Linux.
website: https://rkhunter.sourceforge.net
description: Herramienta de detección de rootkits, backdoors y exploits locales para sistemas UNIX/Linux. Escanea el sistema
  en busca de malware conocido, configuraciones sospechosas y modificaciones no autorizadas en binarios del sistema.
why_reference: Rkhunter es una de las herramientas de detección de rootkits más veteranas y respetadas del ecosistema Linux.
  Su inclusión en prácticamente todas las guías de hardening Linux y su facilidad de automatización la hacen imprescindible.
certifications: []
company_size:
- pequeña
- mediana
- grande
market_rank:
  ids: 12
repo: https://sourceforge.net/projects/rkhunter/
license: GPL-2.0
sources:
- https://www.gartner.com/reviews/market/intrusion-prevention-systems
first_added: 2026-08-10
last_verified: '2026-08-10'
needs_review: false
logo: /logos/rkhunter-ids.png
---

Rkhunter busca en un sistema UNIX o Linux las huellas típicas de un compromiso: rootkits conocidos, puertas traseras,
binarios del sistema alterados, permisos sospechosos y configuraciones peligrosas.

## Dónde encaja

En el servidor, como comprobación periódica de higiene. Se ejecuta desde una tarea programada y notifica los cambios
detectados respecto a la última pasada.

## A tener en cuenta

Detecta amenazas conocidas y desviaciones evidentes; un atacante que sabe que Rkhunter está instalado tiene formas de
evitarlo, así que no sustituye a un EDR ni a la monitorización de integridad con base de datos externa. Genera falsos
positivos tras las actualizaciones del sistema, y su valor real depende de que alguien lea los informes: un correo
diario que nadie abre no es un control.
