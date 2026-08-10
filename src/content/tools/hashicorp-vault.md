---
name: HashiCorp Vault
slug: hashicorp-vault
categories:
- certificate-lifecycle
- key-managers
- secrets-management
tags:
- encryption
- pki
- cloud
- on-premise
- automatizacion
- zero-trust
- open-source
type: opensource
cost_model: freemium
cost_details: Community Edition gratuita. Vault Enterprise desde ~$15,000/año. HCP Vault (cloud gestionado) desde $0.50/hora.
website: https://www.hashicorp.com/products/vault
description: 'Gestor de secretos y claves criptográficas que centraliza la gestión, rotación y control de acceso a credenciales,
  claves API, certificados y datos sensibles.

  '
why_reference: 'HashiCorp Vault es el estándar de facto en gestión de secretos para entornos cloud-native y DevOps. Adoptado
  por más del 80% del Fortune 500. Su motor de secretos dinámicos —que genera credenciales temporales bajo demanda en lugar
  de almacenar secretos estáticos— representa un cambio de paradigma en la seguridad de credenciales.

  '
certifications:
- SOC 2 Tipo II
- ISO 27001
- FedRAMP
company_size:
- mediana
- grande
market_rank: 64
repo: https://github.com/hashicorp/vault
license: BSL
sources:
- https://itsm.tools/best-secrets-management
- https://github.com/hashicorp/vault
last_verified: '2026-08-07'
needs_review: false
logo: /logos/hashicorp-vault.png
---

Vault resuelve el problema de la dispersión de secretos (API keys, contraseñas,
certificados, tokens) proporcionando una única fuente de verdad con cifrado,
control de acceso detallado y auditoría completa.
- KV (Key-Value): Almacenamiento de secretos estáticos con versionado
- Dynamic Secrets: Generación de credenciales temporales para bases de datos,
  nubes, etc.
- PKI: Autoridad certificadora interna con emisión y revocación automatizada
- Transit: Cifrado como servicio (encrypt/decrypt sin acceder a las claves)
- Kubernetes Auth: Autenticación nativa para cargas de trabajo en Kubernetes
- Registro de auditoría inmutable de cada acceso a secretos
- Políticas de acceso basadas en least privilege (HCL)
- Cumplimiento con rotación automática de credenciales (requisito PCI DSS 3.6)
- Sellado/desellado con Shamir Secret Sharing o HSM (requisito ENS Alta)
