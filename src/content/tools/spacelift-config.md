---
name: Spacelift
slug: spacelift-config
categories:
- config-managers
tags:
- iac
- terraform
- pulumi
- drift-detection
- compliance
type: comercial
cost_model: suscripción
cost_details: Desde ~$200/mes. Plataforma de IaC gestionada.
website: https://spacelift.io
cert_url: https://spacelift.io/security
description: Plataforma de infraestructura como código gestionada con soporte para Terraform, Pulumi, CloudFormation y Kubernetes.
  Ofrece políticas de cumplimiento automatizadas, drift detection y flujos de aprobación.
why_reference: Spacelift ha sido destacada en informes de analistas como la plataforma de gestión de IaC más innovadora. Su
  capacidad de detectar drift (desviaciones entre código y realidad) y aplicar políticas de cumplimiento la hace valiosa para
  entornos regulados.
certifications:
- SOC 2 Tipo II
company_size:
- mediana
- grande
market_rank:
  config-managers: 5
sources:
- https://docs.spacelift.io/concepts/stack
first_added: 2026-08-10
last_verified: '2026-08-12'
needs_review: false
logo: /logos/spacelift-config.png
---

Spacelift orquesta infraestructura como código gestionada: ejecuta Terraform, OpenTofu, Pulumi, CloudFormation o
manifiestos de Kubernetes con control de estado, aprobaciones y políticas escritas en Open Policy Agent.

## Dónde encaja

Entre el repositorio y la infraestructura. Su aportación frente a lanzar Terraform desde un pipeline genérico está en
el control: qué cambios requieren aprobación humana, qué recursos no pueden crearse nunca y quién puede ejecutar
sobre qué entorno.

## A tener en cuenta

Como cualquier orquestador de IaC gestionado, necesita credenciales con permisos amplios sobre la cuenta cloud y
custodia el estado de Terraform, que contiene datos sensibles. Antes de adoptarlo hay que revisar dónde se almacena
ese estado, cómo se cifra y qué opciones de ejecución en la propia infraestructura del cliente existen.
