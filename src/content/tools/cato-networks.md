---
name: Cato SASE Cloud
slug: cato-networks
categories:
- sd-wan
- swg
tags:
- sase
- sd-wan
- sse
- zero-trust
- cloud
type: comercial
cost_model: suscripción
cost_details: Suscripción por sede y por usuario remoto, con la red privada global incluida en el servicio.
website: https://www.catonetworks.com
cert_url: https://www.catonetworks.com/compliance-certifications/
description: 'SASE de un solo proveedor construido sobre una red privada global propia: SD-WAN, seguridad web, CASB,
  DLP y acceso remoto de confianza cero entregados como servicio.'
why_reference: Cato es el fabricante que definió la categoría de SASE de un solo proveedor y aparece de forma consistente
  entre los mejor valorados de security service edge y WAN edge en Gartner Peer Insights. Su red privada propia,
  con decenas de puntos de presencia, es lo que le permite sustituir a la vez al MPLS y a la pila de seguridad perimetral.
certifications:
- ISO 27001
- SOC 2 Tipo II
- ISO 27017
- ISO 27018
company_size:
- mediana
- grande
market_rank:
  sd-wan: 5
  swg: 4
sources:
- https://www.gartner.com/reviews/market/security-service-edge
- https://www.gartner.com/reviews/market/wan-edge-infrastructure
- https://en.wikipedia.org/wiki/Cato_Networks
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/cato-networks.png
needs_review: false
---

Cato invierte el orden habitual: en vez de vender cajas para la sede y añadirles seguridad, opera una red privada global con decenas de puntos de presencia y conecta a ella sedes, nubes y usuarios remotos. Todo el tráfico atraviesa un único motor de inspección que aplica firewall, filtrado web, antimalware, IPS, CASB, DLP y control de acceso de confianza cero.

La sede se conecta con un dispositivo ligero que agrega los enlaces disponibles y elige camino según la calidad medida; el usuario remoto, con un cliente que lo lleva al punto de presencia más cercano. Al vivir la política en la nube del fabricante, no hay que replicar reglas por sede ni mantener una pila de appliances por ubicación.

El resultado es una arquitectura que consolida en un contrato lo que antes eran MPLS, firewalls perimetrales, proxy web y VPN, con la contrapartida de depender de un único proveedor para red y seguridad.
