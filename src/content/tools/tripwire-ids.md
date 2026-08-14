---
name: Tripwire SecureCheq
slug: tripwire-ids
categories:
- ids
tags:
- ips
- fim
- compliance
- change-detection
type: comercial
cost_model: suscripción
cost_details: Enterprise quote. Desde ~$8,000/año.
website: https://www.tripwire.com
cert_url: https://trust.fortra.com/
description: Plataforma de prevención de intrusiones con monitorización de integridad de ficheros (FIM), detección de cambios
  no autorizados y cumplimiento normativo automatizado.
why_reference: Tripwire (parte de Fortra) es el referente histórico en monitorización de integridad de ficheros y detección
  de cambios. Su capacidad de generar evidencias de cumplimiento para PCI DSS, SOX y NIST la hace imprescindible en auditorías.
certifications:
- Common Criteria
- ISO 27001
company_size:
- mediana
- grande
market_rank: 5
sources:
- https://www.gartner.com/reviews/market/intrusion-prevention-systems
first_added: 2026-08-10
last_verified: '2026-08-10'
needs_review: false
logo: /logos/tripwire-ids.png
---

La línea de Tripwire tiene su origen en la monitorización de integridad de ficheros: detectar que un fichero de
sistema, una configuración o una clave de registro han cambiado sin una orden de cambio detrás. SecureCheq comprueba
además la configuración del sistema frente a referencias de bastionado reconocidas.

## Dónde encaja

En el servidor y en el puesto. Responde a una pregunta distinta de la del antivirus: no si hay malware, sino si el
sistema sigue estando como se decidió que estuviera.

## A tener en cuenta

Su utilidad depende por completo de la integración con la gestión de cambios: sin ella, cada actualización legítima
genera alertas y el equipo aprende a ignorarlas. La monitorización de integridad es un requisito explícito de PCI DSS
y de varios marcos de bastionado, y ahí es donde este tipo de herramienta se justifica sola.
