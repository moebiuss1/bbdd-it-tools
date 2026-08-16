---
name: AWS WAF
slug: aws-waf
categories:
- waf
tags:
- waf
- aws
- cloud
- ddos
- bot-management
- owasp
type: comercial
cost_model: pago-por-uso
cost_details: Pago por ACL web, por regla y por millón de peticiones inspeccionadas. Grupos de reglas gestionadas
  con coste adicional.
website: https://aws.amazon.com/waf/
cert_url: https://aws.amazon.com/compliance/programs/
description: Firewall de aplicaciones web gestionado que se aplica sobre CloudFront, Application Load Balancer,
  API Gateway y AppSync con reglas propias o gestionadas.
why_reference: 'Es el WAF por defecto de la nube más usada del mundo: se activa sobre los servicios que ya publican
  la aplicación, sin desviar el tráfico ni desplegar nada, y sus grupos de reglas gestionadas cubren el OWASP Top
  10 y las vulnerabilidades conocidas de las plataformas más comunes. Gartner sigue a AWS en el mercado de cloud
  web application and API protection.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- PCI DSS
- FedRAMP
- ENS Alta
- HIPAA
company_size:
- pequeña
- mediana
- grande
market_rank:
  waf: 5
sources:
- https://www.gartner.com/reviews/market/cloud-web-application-and-api-protection
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/aws-waf.png
needs_review: false
---

AWS WAF se engancha directamente a los puntos donde ya se publica la aplicación —CloudFront, el balanceador de aplicación, API Gateway, AppSync o Cognito— y evalúa cada petición contra una lista ordenada de reglas: coincidencias de cadena o expresión regular, condiciones geográficas, listas de reputación de IP, límites de tasa y comprobaciones de tamaño o de inyección.

Los grupos de reglas gestionadas por AWS y por terceros del Marketplace cubren el catálogo OWASP, entradas maliciosas conocidas, reputación de direcciones y protección específica de plataformas muy atacadas. A eso se suman el control de bots y la protección de fraude en el registro y el inicio de sesión.

Su modo de contar aciertos sin bloquear permite desplegar reglas nuevas en observación, medir el impacto sobre tráfico real y activarlas después, que es la única forma sensata de introducir un WAF delante de una aplicación en producción.
