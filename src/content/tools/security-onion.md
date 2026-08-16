---
name: Security Onion
slug: security-onion
categories:
- ids
- log-management
- siem
tags:
  - ids
  - monitorizacion
  - open-source
  - siem
  - forensics
  - suricata
type: opensource
cost_model: suscripción
cost_details: Gratuito. Plataforma de seguridad de red open source.
website: https://securityonionsolutions.com
description: Plataforma integrada de seguridad de red que combina IDS (Suricata/Zeek), monitorización de red, hunting, SIEM
  (Elasticsearch) y análisis forense en una sola distribución Linux lista para usar.
why_reference: Security Onion es la distribución de seguridad de red open source más completa del mercado. Utilizada por SOCs
  de todo el mundo como plataforma todo-en-uno que integra las mejores herramientas open source de seguridad de red.
certifications: []
company_size:
- pequeña
- mediana
- grande
market_rank:
  ids: 9
  log-management: 8
  siem: 11
repo: https://github.com/Security-Onion-Solutions/securityonion
license: GPL-2.0
sources:
  - https://www.gartner.com/reviews/market/intrusion-prevention-systems
first_added: 2026-08-10
last_verified: '2026-08-10'
needs_review: false
logo: /logos/security-onion.png
---
Security Onion empaqueta en una distribución lista para desplegar buena parte del arsenal libre de monitorización de
red y análisis de seguridad: Suricata y Zeek para el tráfico, Elasticsearch para el almacenamiento y la búsqueda, y
un conjunto de interfaces para investigar alertas y hacer hunting.

## Dónde encaja

En la red interna y en el SOC a la vez: captura el tráfico en un puerto espejo, lo convierte en evidencia y lo deja
consultable junto con los logs de los sistemas. Para una organización sin presupuesto de SIEM comercial, es la vía
más directa a una capacidad de detección real.

## A tener en cuenta

Lo gratuito es la licencia, no el proyecto: exige dimensionar almacenamiento y CPU con criterio —la captura de
paquetes crece muy rápido—, ajustar reglas para que las alertas sean manejables y alguien que investigue lo que
aparece. Sin ese equipo, se convierte en un archivo de alertas que nadie mira.
