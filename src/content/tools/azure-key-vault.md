---
name: Azure Key Vault
slug: azure-key-vault
categories:
- key-managers
- secrets-management
tags:
- kms
- cloud
- azure
- hsm
- secrets-management
- fips
type: comercial
cost_model: suscripción
cost_details: $0.03/10,000 operaciones. HSM desde ~$1/hora.
website: https://azure.microsoft.com
description: Servicio cloud de gestión de claves, secretos y certificados integrado con el ecosistema Azure. Ofrece HSM gestionado
  (Azure Dedicated HSM) con certificación FIPS 140-2 Nivel 3 para entornos regulados.
why_reference: Azure Key Vault es el servicio de gestión de claves nativo de Microsoft Azure, utilizado por organizaciones
  de todos los tamaños. Su integración con Azure AD, Azure Monitor y el resto del ecosistema Azure proporciona una gestión
  de secretos sin fricción.
certifications:
- ISO 27001
- SOC 2 Tipo II
- FedRAMP
- FIPS 140-2
company_size:
- pequeña
- mediana
- grande
market_rank: 3
cert_url: https://learn.microsoft.com/en-us/azure/compliance/
sources:
- https://www.gartner.com/reviews/market/multicloud-key-management-as-a-service-kmaas
- https://learn.microsoft.com/azure/key-vault/general/overview
last_verified: '2026-08-12'
needs_review: false
logo: /logos/azure-key-vault.png
---

Azure Key Vault cubre tres necesidades que suelen ir juntas: claves criptográficas, secretos de aplicación
(contraseñas, cadenas de conexión, tokens) y certificados. Su integración con las identidades gestionadas de Azure
permite que una aplicación obtenga un secreto sin que nadie haya escrito jamás una credencial en el código.

## Dónde encaja

Entre el desarrollo y la infraestructura. Es la pieza que rompe la costumbre de guardar contraseñas en ficheros de
configuración o variables de entorno del servidor, y la que hace viable rotarlas sin desplegar.

## A tener en cuenta

El control real es el modelo de acceso: un almacén con permisos amplios centraliza el riesgo en lugar de reducirlo.
Conviene separar almacenes por entorno y aplicación, activar el borrado reversible y la protección contra purga, y
auditar los accesos. El nivel estándar usa claves protegidas por software; para HSM validado hay que optar por el
nivel premium o por HSM gestionado, con coste distinto.
