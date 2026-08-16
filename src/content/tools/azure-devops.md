---
name: Azure DevOps
slug: azure-devops
categories:
- scm
- ci-cd
tags:
- ci-cd
- git
- scm
- azure
- devops
- microsoft
- boards
type: comercial
cost_model: freemium
cost_details: Cinco usuarios gratuitos y minutos de ejecución incluidos; después, por usuario y mes más agentes
  adicionales.
website: https://azure.microsoft.com/products/devops
cert_url: https://learn.microsoft.com/azure/compliance/
description: Suite de Microsoft con repositorios Git, tuberías de construcción y despliegue, tableros de trabajo,
  gestión de artefactos y planes de prueba.
why_reference: Azure DevOps —antes Team Foundation Server— es la plataforma de entrega estándar en organizaciones
  con desarrollo .NET y es uno de los productos que Gartner sigue en el mercado de plataformas DevOps. Sus tuberías
  siguen siendo de las pocas con soporte de primera clase para construcciones en Windows, macOS y Linux por igual.
certifications:
- ISO 27001
- SOC 2 Tipo II
- ISO 27018
- FedRAMP
- ENS Alta
- HIPAA
company_size:
- pequeña
- mediana
- grande
market_rank:
  ci-cd: 7
  scm: 4
sources:
- https://www.gartner.com/reviews/market/devops-platforms
- https://en.wikipedia.org/wiki/Azure_DevOps
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/azure-devops.png
needs_review: false
---

Azure DevOps agrupa cinco servicios que se pueden adoptar por separado: Repos (Git con políticas de rama y revisión), Pipelines (construcción y despliegue en contenedores o máquinas propias), Boards (trabajo pendiente, sprints y tableros), Artifacts (paquetes NuGet, npm, Maven y Python) y Test Plans (pruebas manuales y exploratorias).

Las tuberías se definen en YAML versionado y ejecutan en agentes alojados por Microsoft o propios, con entornos, aprobaciones y puertas de calidad antes de promocionar a producción. Su cobertura multiplataforma es amplia, pero la integración con el ecosistema Microsoft —Active Directory, Azure, Visual Studio— es lo que hace que siga siendo el estándar en su nicho.

Para organizaciones que no pueden usar servicio en la nube, la versión Azure DevOps Server mantiene la misma funcionalidad instalada en el propio centro de datos.
