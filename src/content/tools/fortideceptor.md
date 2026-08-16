---
name: Fortinet FortiDeceptor
slug: fortideceptor
categories:
- deception
tags:
- deception
- honeypot
- threat-detection
- ot
- fortinet
- lateral-movement
type: comercial
cost_model: suscripción
cost_details: Licencia por appliance virtual y número de señuelos desplegados, con suscripción de actualización de contenidos.
website: https://www.fortinet.com/products/fortideceptor
cert_url: https://www.fortinet.com/corporate/about-us/product-certifications
description: Plataforma de engaño que despliega señuelos de sistemas, servicios y credenciales en la red corporativa y en
  entornos industriales para detectar movimiento lateral.
why_reference: 'FortiDeceptor es la plataforma de deception más desplegada dentro de un ecosistema de seguridad completo:
  la alerta de un señuelo se traduce automáticamente en bloqueo en el firewall y aislamiento del endpoint, que es lo que convierte
  la detección en contención. Destaca además por sus señuelos de protocolos industriales.'
certifications:
- ISO 27001
- Common Criteria
company_size:
- mediana
- grande
market_rank:
  deception: 2
sources:
- https://en.wikipedia.org/wiki/Fortinet
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/fortideceptor.png
needs_review: false
---

FortiDeceptor levanta sistemas señuelo que imitan servidores, puestos, dispositivos médicos o autómatas industriales, y siembra en los equipos reales credenciales, recursos compartidos y entradas de configuración falsas que apuntan hacia ellos. Un usuario legítimo no tiene ningún motivo para tocarlos, de modo que cualquier interacción es una señal casi sin falsos positivos.

Ese es el argumento central de la tecnología: frente a la detección basada en anomalías, que exige ajustar umbrales y convivir con el ruido, el señuelo produce una alerta que siempre significa algo. Además revela la fase de reconocimiento y movimiento lateral, que es donde el atacante pasa la mayor parte del tiempo y donde otras capas ven menos.

Su integración con el resto de la plataforma del fabricante permite responder automáticamente: bloquear el origen en el firewall, aislar el endpoint implicado y enviar los indicadores al resto de la infraestructura de seguridad.
