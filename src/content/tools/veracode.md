---
name: Veracode
slug: veracode
categories:
- code-quality
tags:
- sast
- dast
- sca
- appsec
- devsecops
- compliance
type: comercial
cost_model: suscripción
cost_details: Suscripción por aplicación o por conjunto de aplicaciones, con paquetes que combinan los distintos
  análisis.
website: https://www.veracode.com
cert_url: https://www.veracode.com/trust/
description: Plataforma de seguridad de aplicaciones entregada como servicio con análisis estático sobre binarios,
  dinámico, de composición y pruebas de penetración manuales.
why_reference: 'Veracode es uno de los nombres fundacionales del análisis de seguridad de aplicaciones y el referente
  cuando hay que certificar software de terceros: analiza el binario, sin necesidad de código fuente, lo que permite
  exigir una verificación independiente a un proveedor que no va a entregar sus fuentes.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- FedRAMP
- RGPD / GDPR
company_size:
- mediana
- grande
market_rank:
  code-quality: 4
sources:
- https://www.gartner.com/reviews/market/application-security-testing
- https://en.wikipedia.org/wiki/Veracode
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/veracode.png
needs_review: false
---

La particularidad técnica de Veracode es que su análisis estático trabaja sobre el binario o el bytecode compilado en lugar del código fuente. Eso elimina la necesidad de configurar el entorno de compilación de cada aplicación y, sobre todo, permite evaluar software del que no se tienen las fuentes, que es el caso de casi cualquier componente adquirido a un tercero.

Alrededor de ese motor ofrece análisis dinámico sobre la aplicación en ejecución, análisis de composición de bibliotecas, seguridad de contenedores y un servicio de pruebas de penetración manuales para la lógica de negocio, que ninguna herramienta automática cubre bien.

Su otra seña de identidad es el enfoque de cumplimiento: políticas de aceptación por aplicación, informes de conformidad frente a estándares reconocidos y una certificación de estado que muchas organizaciones exigen contractualmente a sus proveedores de software.
