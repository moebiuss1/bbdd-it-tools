---
name: FortiNAC
slug: fortinac
categories:
- nac
tags:
- nac
- network-security
- iot
- zero-trust
- fortinet
- 802.1x
type: comercial
cost_model: suscripción
cost_details: Licencia por dispositivo gestionado, con appliance físico o virtual y niveles Base, Plus y Pro.
website: https://www.fortinet.com/products/network-access-control
cert_url: https://www.fortinet.com/corporate/about-us/product-certifications
description: Control de acceso a la red con descubrimiento e inventario de dispositivos, perfilado de IoT, cuarentena
  automática y respuesta integrada con el resto del ecosistema Fortinet.
why_reference: FortiNAC es el NAC de referencia para quien ya opera red y firewall de Fortinet, y uno de los productos
  que Gartner sigue en el mercado de network access control. Su fuerte es el inventario y el perfilado de dispositivos
  no gestionados —cámaras, PLCs, equipamiento médico— que ni admiten agente ni hablan 802.1X.
certifications:
- ISO 27001
- Common Criteria
- FIPS 140-2
company_size:
- mediana
- grande
market_rank:
  nac: 4
sources:
- https://www.gartner.com/reviews/market/network-access-control
- https://en.wikipedia.org/wiki/Fortinet
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/fortinac.png
needs_review: false
---

FortiNAC empieza por lo que casi siempre falta antes de poder controlar nada: saber qué hay conectado. Descubre dispositivos por múltiples métodos —consultas SNMP a la electrónica de red, DHCP, tráfico observado, escaneo activo— y los clasifica por tipo, fabricante y sistema operativo, incluidos los que no admiten agente.

Con ese inventario aplica política: segmenta por VLAN o etiqueta según el perfil del dispositivo y el resultado de la comprobación de cumplimiento del puesto, pone en cuarentena lo que no cumple y automatiza el acceso de invitados y contratistas con portales y patrocinadores.

La respuesta es su otro punto fuerte: al integrarse con el firewall, el SIEM y el EDR del fabricante, un indicio de compromiso puede traducirse en el aislamiento del puerto físico donde está conectado el equipo, que es la contención más rápida disponible en una red cableada.
