---
name: AWS CloudHSM
slug: aws-cloudhsm
categories:
- key-managers
tags:
- hsm
- kms
- cloud
- aws
- fips
- dedicated
type: comercial
cost_model: suscripción
cost_details: Desde ~$1.45/hora por HSM dedicado.
website: https://aws.amazon.com
description: Servicio de módulos de seguridad hardware (HSM) dedicados en la nube de AWS con certificación FIPS 140-2 Nivel
  3. Proporciona control total sobre las claves criptográficas con acceso exclusivo al HSM.
why_reference: AWS CloudHSM es la solución de HSM en la nube más desplegada del mercado, utilizada por organizaciones que
  necesitan cumplir con requisitos estrictos de control de claves (PCI DSS, eIDAS, GDPR). Su modelo de HSM dedicado proporciona
  aislamiento completo.
certifications:
- FIPS 140-2
- PCI DSS
- SOC 2 Tipo II
company_size:
- mediana
- grande
market_rank:
  key-managers: 7
sources:
- https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html
first_added: 2026-08-10
last_verified: '2026-08-12'
needs_review: false
logo: /logos/aws-cloudhsm.png
---

AWS CloudHSM entrega módulos de seguridad hardware dedicados dentro de la nube de AWS. A diferencia de KMS, donde
las claves viven en un servicio multiinquilino gestionado por Amazon, aquí el cliente controla el clúster, gestiona
sus usuarios criptográficos y AWS no tiene acceso al material de clave.

## Dónde encaja

En la raíz de confianza. Sostiene autoridades de certificación privadas, firma de documentos y transacciones, y
cifrado de bases de datos cuando la normativa exige que las claves nunca salgan de un dispositivo certificado.

## A tener en cuenta

Ese control tiene contrapartida operativa: la gestión de usuarios, el respaldo y la alta disponibilidad del clúster
son responsabilidad del cliente, y perder las credenciales criptográficas significa perder los datos cifrados. Se
factura por hora de HSM activo, así que un clúster redundante es un coste fijo relevante. Para la mayoría de casos
de uso, KMS resulta suficiente; CloudHSM se justifica cuando hay un requisito explícito de FIPS 140-2 Nivel 3 o de
custodia exclusiva.
