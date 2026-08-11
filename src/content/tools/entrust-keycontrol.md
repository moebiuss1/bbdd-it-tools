---
name: Entrust KeyControl
slug: entrust-keycontrol
categories:
- certificate-lifecycle
- key-managers
- secrets-management
tags:
- kms
- hsm
- government
- defense
- fips
- common-criteria
type: comercial
cost_model: suscripción
cost_details: Enterprise quote. Desde ~$20,000/año.
website: https://www.entrust.com
cert_url: https://www.entrust.com/legal-compliance/iso-certifications
description: Plataforma de gestión de claves criptográficas con soporte para HSM, multi-cloud y on-premise. Ofrece gestión
  centralizada de claves con cumplimiento FIPS 140-2 y Common Criteria para entornos gubernamentales y defensa.
why_reference: Entrust es uno de los proveedores de confianza digital más veteranos del mercado, con décadas de experiencia
  en criptografía para gobiernos y defensa. Su plataforma KeyControl proporciona gestión unificada de claves en entornos híbridos.
certifications:
- FIPS 140-2
- Common Criteria
- ISO 27001
company_size:
- grande
market_rank: 4
sources:
  - https://www.gartner.com/reviews/market/certificate-lifecycle-management-clm
last_verified: '2026-08-10'
needs_review: false
logo: /logos/entrust-keycontrol.png
---
Entrust KeyControl gestiona el ciclo de vida de claves criptográficas y secretos en entornos híbridos, con un caso de
uso muy asentado: el cifrado de máquinas virtuales y almacenamiento en VMware y en nubes públicas, donde actúa como
servidor de claves conforme al estándar KMIP.

## Dónde encaja

En la raíz de confianza, junto al HSM. Separa la custodia de las claves del sistema que cifra los datos, que es la
condición para que el cifrado sirva de algo frente a un administrador comprometido del propio sistema.

## A tener en cuenta

La disponibilidad del servicio de claves se convierte en crítica: si el gestor no responde, las cargas cifradas no
arrancan. Exige diseño redundante y un procedimiento de recuperación probado. Su encaje es natural en organizaciones
que ya usan HSM de Entrust (nShield); en otros contextos conviene comparar con la solución de claves del propio
proveedor cloud.
