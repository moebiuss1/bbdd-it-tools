---
name: Terraform
slug: terraform
categories:
- cloud-migration
- config-managers
tags:
- iac
- multi-cloud
- declarative
- hcl
- state-management
- modules
type: opensource
cost_model: gratis
cost_details: Open source (BSL). Terraform Cloud gratuito hasta 500 recursos. Terraform Enterprise desde ~$20,000/año.
website: https://www.terraform.io
description: Herramienta de infraestructura como código (IaC) que permite definir, aprovisionar y versionar infraestructura
  cloud y on-premise usando un lenguaje declarativo (HCL). Gestiona el ciclo de vida completo de los recursos con planificación
  previa y estado como fuente de verdad.
why_reference: Terraform es el estándar de facto en infraestructura como código multi-cloud. Con más de 3,000 providers oficiales
  y un ecosistema de módulos reutilizables, es la herramienta más adoptada para automatizar el aprovisionamiento de infraestructura
  en AWS, Azure, GCP y cientos de servicios. La creación del fork OpenTofu tras el cambio de licencia de HashiCorp en 2023
  demuestra su importancia crítica en el ecosistema IT.
certifications: []
company_size:
- pequeña
- mediana
- grande
market_rank:
  cloud-migration: 1
  config-managers: 2
repo: https://github.com/hashicorp/terraform
license: BSL
sources:
- https://www.automq.com/blog/ansible-alternatives-2025-terraform-chef-salt-puppet-cfengine
- https://www.hashicorp.com/
first_added: 2026-08-10
last_verified: '2026-08-10'
needs_review: false
logo: /logos/terraform.png
---

Terraform es la herramienta que definió la categoría de infraestructura como código
multi-cloud. A diferencia de las herramientas de gestión de configuración (Ansible,
Puppet, Chef) que gestionan el software sobre servidores existentes, Terraform se
centra en el aprovisionamiento de la infraestructura misma: redes, máquinas
virtuales, bases de datos, balanceadores, clústeres Kubernetes y cientos de
servicios cloud.
- HCL (HashiCorp Configuration Language): Lenguaje declarativo para definir infraestructura
- Providers: Plugins para interactuar con APIs de AWS, Azure, GCP, Kubernetes, etc.
- State: Archivo de estado que mapea la configuración declarada con los recursos reales
- Plan: Vista previa de cambios antes de aplicarlos (plan → apply)
- Modules: Componentes reutilizables de infraestructura
- Infraestructura como código versionada en Git con trazabilidad completa de cambios
- Plan de ejecución revisable antes de cada despliegue
- Integración con herramientas de policy-as-code (Sentinel/OPA) para controles automáticos
