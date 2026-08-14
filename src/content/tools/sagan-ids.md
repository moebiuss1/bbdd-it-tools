---
name: Sagan
slug: sagan-ids
categories:
- ids
tags:
- ids
- open-source
- hids
- nids
- snort-compatible
type: opensource
cost_model: suscripción
cost_details: Gratuito. HIDS/NIDS open source compatible con Snort.
website: https://sagan.io
description: Sistema de detección de intrusiones HIDS/NIDS open source compatible con reglas de Snort y Suricata. Destaca
  por su integración con herramientas de correlación y su capacidad de ejecutar scripts de respuesta.
why_reference: Sagan es uno de los IDS open source más versátiles, combinando capacidades HIDS y NIDS con compatibilidad con
  reglas de las principales plataformas IDS. Su integración con herramientas de correlación de eventos la hace única.
certifications: []
company_size:
- pequeña
- mediana
market_rank: 9
repo: https://github.com/quadrantsec/sagan
license: GPL-2.0
sources:
- https://www.gartner.com/reviews/market/intrusion-prevention-systems
first_added: 2026-08-10
last_verified: '2026-08-12'
needs_review: false
logo: /logos/sagan-ids.png
---

Sagan analiza logs en tiempo real aplicando reglas con la misma sintaxis que Snort y Suricata. Eso permite reutilizar
en la capa de registro el conocimiento y las reglas ya escritas para la capa de red.

## Dónde encaja

Entre la gestión de logs y la detección: es un IDS de host que correlaciona eventos de sistemas, aplicaciones y
dispositivos, y puede alimentar el mismo flujo de alertas que el IDS de red.

## A tener en cuenta

Es un proyecto pequeño en comparación con Suricata o Wazuh, con comunidad reducida y documentación escasa; su encaje
natural es un equipo que ya domina el ecosistema de reglas de Snort y quiere aplicarlo a los logs sin desplegar una
plataforma completa. En la mayoría de organizaciones, una suite integrada cubre el mismo caso de uso con menos
trabajo de mantenimiento.
