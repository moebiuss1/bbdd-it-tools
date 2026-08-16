---
name: Bitbucket
slug: bitbucket
categories:
- scm
- ci-cd
tags:
- git
- scm
- ci-cd
- atlassian
- code-review
- devops
type: comercial
cost_model: freemium
cost_details: Gratuito hasta cinco usuarios; planes Standard y Premium por usuario y mes. Bitbucket Data Center con licencia
  anual.
website: https://bitbucket.org/product
cert_url: https://www.atlassian.com/trust/compliance
description: Plataforma de repositorios Git de Atlassian con revisión de código, ramas por incidencia y tuberías de integración
  continua integradas, muy ligada a Jira.
why_reference: 'Bitbucket es uno de los tres grandes alojamientos Git empresariales y la elección natural en organizaciones
  que ya trabajan con Jira: la trazabilidad entre incidencia, rama, revisión y despliegue funciona sin integraciones de terceros.
  Su edición Data Center es además una de las pocas opciones autoalojadas con soporte comercial.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- ISO 27018
- PCI DSS
- RGPD / GDPR
company_size:
- pequeña
- mediana
- grande
market_rank:
  ci-cd: 5
  scm: 3
sources:
- https://www.gartner.com/reviews/market/devops-platforms
- https://en.wikipedia.org/wiki/Bitbucket
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/bitbucket.png
needs_review: false
---

Bitbucket ofrece el repertorio esperable de una plataforma Git: repositorios privados, solicitudes de incorporación con revisión obligatoria, permisos por rama, reglas de fusión y despliegues por entorno con aprobaciones.

Lo que lo distingue es la integración con el resto de Atlassian. Una incidencia de Jira crea su rama, la solicitud de incorporación actualiza el estado de la incidencia y el despliegue queda registrado en ella; para equipos que planifican en Jira, esa cadena elimina el trabajo manual de mantener sincronizados dos sistemas.

Bitbucket Pipelines ejecuta la integración continua en contenedores definidos en un fichero del propio repositorio, con caché, ejecución paralela y despliegues por entorno. Para quien no puede llevar el código a la nube, Bitbucket Data Center se instala en la propia infraestructura con alta disponibilidad y espejos para equipos distribuidos.
