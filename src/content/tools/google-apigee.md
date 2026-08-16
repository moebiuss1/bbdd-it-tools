---
name: Google Apigee
slug: google-apigee
categories:
- api-management
tags:
- api-management
- api-gateway
- google-cloud
- monetization
- analytics
type: comercial
cost_model: suscripción
cost_details: Suscripción por volumen de llamadas y entorno. Existe una edición de evaluación gratuita.
website: https://cloud.google.com/apigee
cert_url: https://cloud.google.com/security/compliance
description: 'Plataforma de gestión del ciclo de vida completo de APIs: pasarela, portal del desarrollador, políticas de seguridad
  y cuota, analítica de uso y monetización.'
why_reference: 'Apigee es, junto a MuleSoft e IBM, uno de los tres nombres que Gartner lleva años situando en la zona alta
  del mercado de gestión de APIs de ciclo completo. Es la referencia cuando la API es un producto: control de contratos, cuotas
  por consumidor, portal y facturación por uso.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- ISO 27017
- ISO 27018
- PCI DSS
- HIPAA
company_size:
- mediana
- grande
market_rank:
  api-management: 2
sources:
- https://www.gartner.com/reviews/market/full-life-cycle-api-management
- https://en.wikipedia.org/wiki/Apigee
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/google-apigee.png
needs_review: false
---

Apigee se sitúa delante de los servicios existentes y los publica como API gobernada: aplica autenticación (claves, OAuth, JWT, mTLS), limita la tasa por consumidor, transforma formatos entre lo que el backend habla y lo que el cliente espera, y encadena políticas sin tocar el código del servicio.

Su valor está en lo que rodea a la pasarela. El portal del desarrollador publica la documentación y gestiona el alta de aplicaciones y credenciales; la analítica muestra qué consumidor llama a qué operación, con qué latencia y qué errores; y la capa de monetización permite asociar planes de tarifa a los productos de API cuando estos se venden a terceros.

Se despliega en Google Cloud, en modo híbrido con la pasarela en el propio centro de datos del cliente o en otras nubes, lo que evita tener que mover los backends para poder gobernarlos.
