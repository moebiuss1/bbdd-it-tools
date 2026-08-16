---
name: Jenkins
slug: jenkins
categories:
- ci-cd
tags:
- ci-cd
- automation
- opensource
- devops
- pipelines
- java
type: opensource
cost_model: gratis
cost_details: Software libre bajo licencia MIT. Coste limitado a la infraestructura donde se ejecuta.
website: https://www.jenkins.io
description: Servidor de automatización de código abierto para construir, probar y desplegar software, con más de mil ochocientos
  complementos y tuberías definidas como código.
why_reference: 'Jenkins es el servidor de integración continua más desplegado de la historia y sigue sosteniendo las cadenas
  de construcción de una enorme parte de la industria. Su catálogo de complementos no tiene equivalente: integra prácticamente
  cualquier herramienta, incluidas las heredadas que ninguna plataforma moderna soporta.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/jenkinsci/jenkins
license: MIT
market_rank:
  ci-cd: 2
sources:
- https://en.wikipedia.org/wiki/Jenkins_(software)
- https://github.com/jenkinsci/jenkins
certifications: []
first_added: 2026-08-14
last_verified: '2026-08-16'
logo: /logos/jenkins.png
needs_review: false
---

Jenkins ejecuta trabajos en agentes distribuidos y define las tuberías como código en un fichero versionado junto al proyecto, con etapas, ejecución paralela, aprobaciones manuales y reanudación tras un reinicio del servidor.

Su ventaja histórica es el ecosistema: más de mil ochocientos complementos cubren desde el control de versiones y los gestores de artefactos hasta los analizadores de calidad, las nubes públicas y los sistemas de despliegue más antiguos. Cuando una organización tiene una pieza que ninguna plataforma SaaS integra, casi siempre existe un complemento de Jenkins que sí.

Esa misma flexibilidad es su coste: el servidor hay que operarlo, actualizarlo y asegurarlo, y los complementos son la principal superficie de riesgo. La práctica recomendada es tratar la configuración como código, limitar los complementos a los imprescindibles y ejecutar las construcciones en agentes efímeros.
