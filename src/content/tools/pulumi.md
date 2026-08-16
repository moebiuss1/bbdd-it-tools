---
name: Pulumi
slug: pulumi
categories:
- serverless-management
- cloud-migration
tags:
- iac
- devops
- opensource
- multi-cloud
- kubernetes
- automation
type: opensource
cost_model: freemium
cost_details: Motor de código abierto gratuito (Apache 2.0). Pulumi Cloud gratuito para uso individual y por usuario
  al mes en equipos.
website: https://www.pulumi.com
description: Infraestructura como código escrita en lenguajes de programación reales —TypeScript, Python, Go, C#—
  con gestión de estado, previsualización de cambios y gobierno por políticas.
why_reference: 'Pulumi es la principal alternativa a Terraform y la referencia cuando la infraestructura necesita
  lógica de verdad: bucles, condiciones, abstracciones y pruebas unitarias escritas en el mismo lenguaje que la
  aplicación, con las herramientas y el entorno de desarrollo que el equipo ya usa.'
certifications:
- SOC 2 Tipo II
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/pulumi/pulumi
license: Apache-2.0
market_rank:
  cloud-migration: 5
  serverless-management: 4
sources:
- https://en.wikipedia.org/wiki/Pulumi
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/pulumi.png
needs_review: false
---

Pulumi sustituye el lenguaje declarativo propio por un lenguaje de programación general. La infraestructura se describe en TypeScript, Python, Go, Java o C#, lo que permite factorizar componentes reutilizables, escribir pruebas unitarias sobre la definición y usar el entorno de desarrollo, el depurador y los gestores de paquetes habituales.

El motor mantiene el estado, calcula el plan de cambios y lo muestra antes de aplicarlo, con la misma disciplina que cualquier herramienta de infraestructura como código. Cubre las principales nubes, Kubernetes y decenas de proveedores, y puede importar recursos creados a mano o convertir plantillas existentes de otras herramientas, que es el camino habitual en una migración.

Pulumi Cloud añade el almacén de estado gestionado, historial de despliegues, secretos cifrados y CrossGuard, un motor de políticas que impide aplicar cambios que incumplan las reglas de la organización.
