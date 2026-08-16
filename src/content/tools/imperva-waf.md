---
name: Imperva Web Application Firewall
slug: imperva-waf
categories:
- waf
- api-security
tags:
- waf
- waap
- ddos
- api-security
- bot-management
- owasp
type: comercial
cost_model: suscripción
cost_details: Suscripción por dominio o por volumen de tráfico. Disponible como servicio cloud o appliance en el
  centro de datos.
website: https://www.imperva.com/products/web-application-firewall-waf/
cert_url: https://www.imperva.com/trust-center/
description: Firewall de aplicaciones web con protección frente a OWASP Top 10, mitigación de DDoS, gestión de bots
  y seguridad de APIs, en modalidad cloud o local.
why_reference: Imperva es uno de los nombres fundacionales del mercado WAF y aparece de forma sostenida entre los
  líderes de cloud web application and API protection de Gartner. Su motor de reglas y su investigación de amenazas
  son la referencia con la que se comparan el resto de WAF cuando lo que importa es la tasa de falsos positivos.
certifications:
- ISO 27001
- SOC 2 Tipo II
- PCI DSS
- ISO 27017
- ISO 27018
company_size:
- mediana
- grande
market_rank:
  api-security: 4
  waf: 3
sources:
- https://www.gartner.com/reviews/market/cloud-web-application-and-api-protection
- https://en.wikipedia.org/wiki/Imperva
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/imperva-waf.png
needs_review: false
---

El WAF de Imperva inspecciona las peticiones HTTP en busca de inyección SQL, cross-site scripting, deserialización insegura y el resto del catálogo OWASP, pero su rasgo distintivo es el modelo de seguridad positiva: aprende la estructura legítima de cada aplicación —parámetros, tipos, longitudes— y trata como sospechoso lo que se sale de ella.

Alrededor del filtrado hay tres capas que hoy son inseparables del WAF: mitigación de denegación de servicio volumétrica y de capa 7, gestión de bots capaz de distinguir un rastreador legítimo de uno que hace credential stuffing, y descubrimiento y protección de APIs a partir de las especificaciones OpenAPI.

Se puede desplegar como servicio en la nube, delante del origen, o como appliance en el centro de datos para aplicaciones que no pueden salir, manteniendo una política común en ambos casos.
