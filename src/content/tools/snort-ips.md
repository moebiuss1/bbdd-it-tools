---
name: Cisco Secure IPS (Firepower)
slug: snort-ips
categories:
- ips
tags:
- ips
- talos
- threat-intelligence
- inline
- cisco
type: comercial
cost_model: suscripción
cost_details: Desde ~$10,000/año. Incluido en Firepower.
website: https://www.cisco.com
cert_url: https://www.cisco.com/c/en/us/solutions/industries/government/global-government-certifications.html
description: Sistema de prevención de intrusiones con inteligencia de amenazas Cisco Talos, inspección profunda de paquetes
  y bloqueo automático de amenazas en línea. Parte del ecosistema Cisco Secure XDR.
why_reference: Cisco Secure IPS se beneficia de Cisco Talos, uno de los mayores equipos de threat intelligence del mundo.
  Su integración con Cisco XDR proporciona respuesta coordinada entre red, endpoint y cloud.
certifications:
- FIPS 140-2
- Common Criteria
- ISO 27001
company_size:
- mediana
- grande
market_rank: 7
sources:
  - https://www.gartner.com/reviews/market/intrusion-prevention-systems
last_verified: '2026-08-10'
needs_review: false
logo: /logos/snort-ips.png
---
Cisco Secure IPS —heredero de la línea Firepower— aplica en línea la inteligencia de amenazas de Talos, uno de los
mayores equipos de investigación del sector, y comparte motor de inspección con Snort, el IDS libre que Cisco
mantiene.

## Dónde encaja

En el perímetro y entre segmentos, normalmente como función integrada en el firewall de la misma familia más que como
equipo separado.

## A tener en cuenta

Su rendimiento depende mucho de cuántas funciones se activen a la vez sobre el mismo aparato: inspección TLS, control
de aplicaciones e IPS compiten por la misma CPU, y el dimensionado del catálogo suele medirse sin todo activado. La
gestión centralizada añade su propio coste de licencia y de operación, algo que conviene incluir en la comparativa.
