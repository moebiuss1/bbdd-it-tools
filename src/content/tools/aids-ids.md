---
name: AIDE
slug: aids-ids
categories:
- ids
tags:
  - ids
  - hids
  - fim
  - linux
  - open-source
type: opensource
cost_model: suscripción
cost_details: Gratuito. Advanced Intrusion Detection Environment.
website: https://aide.github.io
description: Sistema de detección de intrusiones en host (HIDS) basado en monitorización de integridad de ficheros. Alternativa
  moderna a Tripwire open source con soporte para múltiples algoritmos de hash y reglas flexibles.
why_reference: AIDE es el HIDS de integridad de ficheros más utilizado en entornos Linux, especialmente en distribuciones
  orientadas a seguridad como SELinux y sistemas embebidos. Su simplicidad y fiabilidad la hacen ideal para cumplimiento PCI
  DSS.
certifications: []
company_size:
- pequeña
- mediana
market_rank:
  ids: 9
repo: https://github.com/aide/aide
license: GPL-2.0
sources:
- https://www.gartner.com/reviews/market/intrusion-prevention-systems
first_added: 2026-08-10
last_verified: '2026-08-10'
logo: /logos/aids-ids.png
needs_review: false
---

AIDE (Advanced Intrusion Detection Environment) no vigila la red: vigila el propio sistema de ficheros. Calcula un
resumen criptográfico de cada fichero relevante y avisa cuando alguno cambia sin motivo, que es la señal clásica de
un binario sustituido o de una configuración manipulada.

## Dónde encaja

Es un HIDS de integridad, en el servidor y en el puesto. Complementa al antivirus y al EDR, que buscan comportamiento
malicioso, con una pregunta distinta y muy barata de responder: ¿este sistema sigue siendo el que instalamos?

## A tener en cuenta

La base de datos de referencia debe generarse sobre un sistema limpio y guardarse fuera de la máquina vigilada: si
el atacante puede reescribirla, el control desaparece. Genera ruido tras cada actualización de paquetes, así que
requiere una política clara de re-línea base ligada a la gestión de cambios. Muchos marcos —PCI DSS entre ellos—
exigen monitorización de integridad de ficheros, y AIDE la cubre sin coste de licencia.
