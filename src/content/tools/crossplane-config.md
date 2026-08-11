---
name: Crossplane
slug: crossplane-config
categories:
- config-managers
tags:
- iac
- kubernetes
- cncf
- cloud-native
- crossplane
type: opensource
cost_model: suscripción
cost_details: Gratuito (Apache 2.0). Proyecto CNCF.
website: https://www.crossplane.io
description: Plataforma de orquestación de infraestructura cloud-native que extiende Kubernetes para gestionar recursos cloud
  (AWS, Azure, GCP) como recursos de Kubernetes. Infraestructura declarativa con controladores y composiciones.
why_reference: Crossplane es un proyecto incubado en la CNCF que está redefiniendo la gestión de infraestructura cloud-native.
  Su modelo de composiciones y proveedores permite a las organizaciones definir sus propias abstracciones de infraestructura.
certifications: []
company_size:
- mediana
- grande
market_rank: 7
repo: https://github.com/crossplane/crossplane
license: Apache-2.0
sources:
  - https://www.gartner.com/reviews/
last_verified: '2026-08-10'
needs_review: false
logo: /logos/crossplane-config.png
---
Crossplane convierte a Kubernetes en el plano de control de toda la infraestructura, no solo de los contenedores: una
base de datos gestionada, un bucket o una red virtual se declaran como recursos de Kubernetes y el clúster se encarga
de crearlos en AWS, Azure o GCP y de mantenerlos en ese estado.

## Dónde encaja

Entre el desarrollo y la infraestructura cloud. Frente a un Terraform ejecutado desde un pipeline, aquí la
reconciliación es continua: si alguien modifica el recurso a mano en la consola del proveedor, el controlador lo
devuelve al estado declarado.

## A tener en cuenta

Ese poder implica que el clúster de Kubernetes pasa a custodiar credenciales con permisos amplios sobre la cuenta
cloud; comprometerlo equivale a comprometer la infraestructura entera. Exige un modelo de permisos cuidadoso, y su
adopción tiene sentido cuando ya existe madurez en Kubernetes, no como primer paso.
