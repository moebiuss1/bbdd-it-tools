---
name: GitLab CI/CD
slug: gitlab-ci-config
categories:
- ci-cd
- scm
tags:
- iac
- cicd
- devops
- yaml
- gitops
type: opensource
cost_model: suscripción
cost_details: Gratuito (MIT). GitLab Ultimate desde ~$99/usuario/mes.
website: https://about.gitlab.com
description: Plataforma DevOps integrada con pipeline CI/CD, gestión de configuración como código y despliegue automatizado.
  Permite definir infraestructura y configuraciones en YAML con control de versiones integrado.
why_reference: GitLab es una de las plataformas DevOps más adoptadas del mundo, con más de 30 millones de usuarios. Su enfoque
  de configuración como código integrado en el pipeline CI/CD la convierte en herramienta esencial de configuración para equipos
  DevOps.
certifications:
- ISO 27001
- SOC 2 Tipo II
company_size:
- pequeña
- mediana
- grande
market_rank: 2
repo: https://gitlab.com/gitlab-org/gitlab
license: MIT
sources:
- https://www.gartner.com/reviews/market/devops-platforms
- https://docs.gitlab.com/ci/pipelines/
last_verified: '2026-08-12'
needs_review: false
logo: /logos/gitlab-ci-config.png
---

GitLab CI/CD integra el repositorio, la revisión de código y el pipeline de despliegue en una sola plataforma. Los
trabajos se declaran en un fichero versionado junto al código, de modo que el propio proceso de construcción y
despliegue queda bajo control de cambios.

## Dónde encaja

En la cadena que lleva del código a producción. Es también el punto donde se aplican los requisitos de segregación de
funciones: revisión obligatoria por un tercero, aprobaciones por entorno y ramas protegidas.

## A tener en cuenta

Un pipeline con permisos de despliegue equivale a un administrador de producción. Sus variables protegidas y sus
tokens de despliegue deben tratarse como credenciales privilegiadas —alcance mínimo, rotación, registro— y los
ejecutores (runners) compartidos entre proyectos son un vector de contaminación entre equipos. Para auditoría, el
historial de aprobaciones y ejecuciones es una evidencia de primer orden sobre cómo llegó cada cambio a producción.
