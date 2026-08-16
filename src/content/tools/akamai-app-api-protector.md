---
name: Akamai App & API Protector
slug: akamai-app-api-protector
categories:
- waf
- api-security
tags:
- waf
- waap
- cdn
- ddos
- api-security
- bot-management
type: comercial
cost_model: suscripción
cost_details: Suscripción por volumen de tráfico y número de propiedades protegidas, sobre la plataforma de distribución
  de Akamai.
website: https://www.akamai.com/products/app-and-api-protector
description: 'Protección de aplicaciones y APIs en el borde de la red de distribución de Akamai: WAF adaptativo,
  mitigación de DDoS, control de bots y descubrimiento de APIs.'
why_reference: Akamai opera una de las mayores redes de distribución del mundo y ve una fracción enorme del tráfico
  web global, lo que le da una ventaja real para distinguir tráfico legítimo de abuso automatizado. Gartner lo sitúa
  entre los líderes de cloud web application and API protection.
certifications:
- ISO 27001
- SOC 2 Tipo II
- PCI DSS
- FedRAMP
- ISO 27018
company_size:
- mediana
- grande
market_rank:
  api-security: 3
  waf: 1
sources:
- https://www.gartner.com/reviews/market/cloud-web-application-and-api-protection
- https://en.wikipedia.org/wiki/Akamai_Technologies
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/akamai-app-api-protector.png
needs_review: false
---

App & API Protector se ejecuta en los miles de puntos de presencia de Akamai, es decir, antes de que el tráfico llegue a la infraestructura del cliente. El WAF combina reglas del catálogo OWASP con puntuación adaptativa: en lugar de bloquear por una sola coincidencia, agrega señales de la petición y decide con un umbral, lo que reduce mucho el ruido en aplicaciones complejas.

La gestión de bots es el apartado donde su escala pesa más: clasifica los clientes automatizados conocidos, detecta los que se disfrazan de navegador y ofrece respuestas graduadas —retardo, desafío, contenido alternativo— en lugar del bloqueo binario que un atacante usa para aprender.

Para APIs descubre puntos finales no documentados a partir del tráfico real, los contrasta con la especificación declarada y aplica límites de tasa y validación de esquema, que es donde suelen aparecer las fugas de datos por objetos mal autorizados.
