---
name: Serverless Framework
slug: serverless-framework
categories:
- serverless-management
tags:
- cloud
- automatizacion
- open-source
- ci-cd
type: comercial
cost_model: freemium
cost_details: CLI gratuita para organizaciones por debajo del umbral de ingresos que fija su contrato; desde la v4 ya no es
  MIT. Serverless Framework Pro/Dashboard (observabilidad, CI/CD gestionado) por suscripción.
website: https://www.serverless.com
description: Framework de código abierto para definir, desplegar y gestionar aplicaciones serverless sobre AWS Lambda, Azure
  Functions y Google Cloud Functions mediante un único archivo de configuración declarativo.
why_reference: El framework de despliegue serverless más adoptado del mercado, con más de 45.000 estrellas en GitHub. Se convirtió
  en el estándar de facto para definir infraestructura serverless como código antes de la popularización de Terraform/CDK
  para esta capa, y sigue siendo la opción por defecto en muchos pipelines de CI/CD orientados a funciones.
certifications: []
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/serverless/serverless
license: Serverless Customer Agreement (desde la v4; hasta la v3 fue MIT)
sources:
- https://github.com/serverless/serverless
- https://www.serverless.com
first_added: 2026-08-10
last_verified: '2026-08-10'
logo: /logos/serverless-framework.png
needs_review: false
market_rank:
  serverless-management: 1
---

Serverless Framework abstrae el proveedor cloud subyacente y permite declarar
funciones, triggers y recursos en un único `serverless.yml`.

- Soporta AWS Lambda, Azure Functions, Google Cloud Functions y otros proveedores mediante plugins
- CLI de código abierto (licencia MIT) con un ecosistema amplio de plugins de la comunidad
- Serverless Framework Pro añade dashboard de observabilidad, gestión de secretos y flujos CI/CD gestionados como capa comercial
- A partir de la v4, parte del paquete npm distribuido incluye componentes con licencia propietaria orientados al SaaS — el
  núcleo de despliegue permanece MIT
