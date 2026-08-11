---
name: HashiCorp Vault PKI
slug: hashicorp-vault-pki
categories:
- cert-managers
tags:
- pki
- certificates
- vault
- cloud-native
- ephemeral
type: opensource
cost_model: suscripción
cost_details: Gratuito (MPL). Enterprise desde ~$15,000/año.
website: https://developer.hashicorp.com/vault/docs/secrets/pki
description: Motor PKI integrado en HashiCorp Vault que permite emitir, rotar y revocar certificados X.509 de forma dinámica
  mediante API. Ideal para entornos cloud-native y microservicios que necesitan certificados efímeros.
why_reference: Vault PKI es la solución de gestión de certificados más adoptada en entornos cloud-native. Su capacidad de
  emitir certificados efímeros de corta duración elimina el problema de la renovación manual de certificados en entornos de
  microservicios.
certifications: []
company_size:
- mediana
- grande
market_rank: 9
repo: https://github.com/hashicorp/vault
license: MPL-2.0
sources:
  - https://www.gartner.com/reviews/market/certificate-lifecycle-management-clm
last_verified: '2026-08-10'
needs_review: false
logo: /logos/hashicorp-vault-pki.png
---

El motor de secretos PKI de HashiCorp Vault convierte a Vault en una autoridad de
certificación interna: emite certificados X.509 bajo demanda a través de su API,
sin pasar por el circuito manual de solicitud y firma.

- Emisión dinámica: cada servicio pide su certificado en el arranque y Vault lo firma al vuelo
- Vida corta por diseño: TTL de horas o minutos, de modo que la renovación sustituye a la revocación
- Roles y restricciones: dominios permitidos, usos de clave y duración máxima por rol
- CA raíz o intermedia: puede actuar como raíz propia o encadenarse a una PKI corporativa existente
- Registro completo en el log de auditoría de Vault, con el solicitante identificado

Su encaje natural es el entorno cloud-native, donde el número de identidades de
máquina y su rotación hacen inviable la gestión manual de certificados. A cambio,
la disponibilidad de Vault pasa a ser crítica: si Vault no responde, los servicios
no pueden renovar y acaban cayendo por certificado caducado.
