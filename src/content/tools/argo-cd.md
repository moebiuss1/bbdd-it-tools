---
name: Argo CD
slug: argo-cd
categories:
- ci-cd
tags:
- gitops
- kubernetes
- ci-cd
- opensource
- cncf
- deployment
type: opensource
cost_model: gratis
cost_details: Proyecto graduado de la CNCF bajo licencia Apache 2.0, sin coste de licencia.
website: https://argoproj.github.io/cd/
description: Herramienta de entrega continua declarativa para Kubernetes que sincroniza el estado del clúster con lo definido
  en un repositorio Git.
why_reference: Argo CD es el estándar de facto de GitOps y un proyecto graduado de la CNCF, el nivel de madurez que la fundación
  reserva a las piezas con adopción probada en producción. En despliegues sobre Kubernetes ha sustituido a la lógica de despliegue
  dentro del servidor de integración continua.
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/argoproj/argo-cd
license: Apache-2.0
market_rank:
  ci-cd: 6
sources:
- https://www.cncf.io/projects/argo/
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/argo-cd.png
needs_review: false
---

Argo CD invierte el modelo clásico de despliegue: en vez de que la tubería empuje cambios contra el clúster con credenciales de administrador, un agente dentro del clúster observa un repositorio Git y reconcilia continuamente el estado real con el declarado. Git deja de ser un almacén de código para convertirse en la única fuente de verdad de lo que debe estar corriendo.

Eso tiene consecuencias operativas concretas: cualquier desviación manual sobre el clúster se detecta y se marca, la vuelta atrás es revertir un commit, y el historial de despliegues es el historial del repositorio, con su revisión por pares y su trazabilidad.

Soporta manifiestos planos, Helm, Kustomize y plantillas propias, gestiona decenas de clústeres desde una única instancia y ofrece una interfaz que muestra el árbol de recursos de cada aplicación con su estado de sincronización y de salud.
