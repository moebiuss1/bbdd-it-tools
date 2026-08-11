---
name: Google Cloud KMS
slug: google-cloud-kms
categories:
- key-managers
- secrets-management
tags:
- kms
- cloud
- google
- hsm
- ekm
- fips
type: comercial
cost_model: suscripción
cost_details: $0.06/clave/mes + $0.03/10,000 operaciones.
website: https://cloud.google.com
description: Servicio de gestión de claves criptográficas cloud-native con soporte para claves simétricas y asimétricas, envoltura
  de claves y HSM con certificación FIPS 140-2 Nivel 3. Integración con Cloud HSM y Cloud EKM.
why_reference: Google Cloud KMS destaca por su arquitectura de seguridad con claves residentes en HSM y su modelo de External
  Key Manager (EKM) que permite a las organizaciones mantener el control de las claves fuera de Google Cloud.
certifications:
- ISO 27001
- SOC 2 Tipo II
- FedRAMP
- FIPS 140-2
company_size:
- mediana
- grande
market_rank: 4
cert_url: https://cloud.google.com/security/compliance
sources:
  - https://www.gartner.com/reviews/
last_verified: '2026-08-10'
needs_review: false
logo: /logos/google-cloud-kms.png
---
Google Cloud KMS gestiona claves criptográficas como un servicio: la aplicación pide cifrar o firmar y la clave nunca
sale del servicio. Ofrece claves protegidas por software, por HSM y externas, además de la opción de importar
material generado fuera de Google.

## Dónde encaja

En la raíz de confianza de las cargas alojadas en Google Cloud. Sostiene el cifrado de almacenamiento, bases de datos
y secretos, con permisos gobernados por la misma gestión de identidades que el resto de la plataforma.

## A tener en cuenta

Lo que se audita no es el algoritmo, sino quién puede usar cada clave y quién puede administrarla: son permisos
distintos y conviene que recaigan en personas distintas. La rotación automática protege frente al desgaste de la
clave, no frente a un permiso mal concedido. Si el requisito normativo es que el proveedor no pueda acceder al
material de clave en ningún caso, hay que valorar claves externas o un HSM propio.
