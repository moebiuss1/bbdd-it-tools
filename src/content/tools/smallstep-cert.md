---
name: Smallstep
slug: smallstep-cert
categories:
- cert-managers
tags:
- pki
- acme
- devops
- ssh
- device-identity
type: opensource
cost_model: suscripción
cost_details: Gratuito (Apache 2.0). Smallstep SaaS desde ~$10/host/mes.
website: https://smallstep.com
description: Plataforma de gestión de certificados para entornos DevOps y cloud-native con emisión automatizada mediante ACME,
  soporte para device identity y SSH. Simplifica la PKI para equipos de desarrollo.
why_reference: Smallstep ha sido destacada en la comunidad DevOps como la herramienta más accesible para implementar PKI interna.
  Su soporte para ACME, device identity (X.509 para dispositivos) y certificados SSH la hace única en el ecosistema cloud-native.
certifications: []
company_size:
- pequeña
- mediana
market_rank:
  cert-managers: 10
repo: https://github.com/smallstep/certificates
license: Apache-2.0
sources:
  - https://www.gartner.com/reviews/market/certificate-lifecycle-management-clm
first_added: 2026-08-10
last_verified: '2026-08-10'
needs_review: false
logo: /logos/smallstep-cert.png
---
Smallstep lleva la PKI al terreno de la automatización: una autoridad de certificación propia, ligera, que emite
certificados de vida muy corta mediante ACME y los renueva sin intervención humana, tanto para TLS como para acceso
SSH.

## Dónde encaja

En la raíz de confianza de entornos cloud-native y DevOps. Su premisa es que un certificado que dura horas y se
renueva solo es más seguro que uno de dos años custodiado a mano, porque la revocación deja de ser el problema.

## A tener en cuenta

El núcleo (step-ca) es open source y suficiente para muchos escenarios; las funciones de gestión a escala pertenecen
a la oferta comercial. Montar una CA propia implica asumir su custodia y su plan de recuperación: la clave raíz debe
protegerse en hardware o, como mínimo, fuera de línea.
