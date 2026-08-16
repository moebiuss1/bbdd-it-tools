---
name: Ivanti Application Control
slug: ivanti-application-control
categories:
- application-control
tags:
- application-control
- allowlisting
- privilege-management
- endpoint
- windows
type: comercial
cost_model: suscripción
cost_details: Licencia por dispositivo o usuario, habitualmente dentro de la suite Ivanti de gestión del puesto.
website: https://www.ivanti.com/products/application-control
cert_url: https://www.ivanti.com/resources/security-compliance
description: 'Control de ejecución de aplicaciones combinado con gestión de privilegios en el endpoint: lista de permitidos
  por propiedad del fichero y elevación puntual por aplicación.'
why_reference: 'Ivanti Application Control resuelve a la vez los dos controles que suelen exigirse juntos en el puesto Windows:
  impedir que se ejecute software no autorizado y quitar los derechos de administrador local sin romper el trabajo diario,
  elevando solo las aplicaciones concretas que lo necesitan.'
certifications:
- ISO 27001
- SOC 2 Tipo II
company_size:
- mediana
- grande
market_rank:
  application-control: 4
sources:
- https://en.wikipedia.org/wiki/Ivanti
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/ivanti-application-control.png
needs_review: false
---

La lista de permitidos de Ivanti se apoya en la propiedad del fichero: si un ejecutable fue instalado por un administrador o por un proceso de despliegue de confianza, se ejecuta; si lo ha depositado el usuario, no. Ese criterio evita mantener a mano un catálogo de hashes, que es lo que hunde la mayoría de proyectos de control de aplicaciones.

La segunda mitad del producto es la gestión de privilegios: retirar el grupo de administradores locales y, en su lugar, elevar de forma controlada las aplicaciones o tareas concretas que lo requieren —instalar una impresora, ejecutar una herramienta de ingeniería—, con registro de cada elevación.

Ambos controles son de los que más reducen el impacto de un compromiso del puesto, y aparecen de forma explícita en la mayoría de esquemas de endurecimiento y guías de cumplimiento.
