---
name: Zerto
slug: zerto
categories:
- cloud-migration
- business-continuity
tags:
- disaster-recovery
- replication
- ransomware
- cloud-migration
- cdp
- hpe
type: comercial
cost_model: suscripción
cost_details: Licencia por máquina virtual protegida, por suscripción o perpetua. Forma parte de HPE.
website: https://www.zerto.com
description: Plataforma de recuperación ante desastres y movilidad de cargas basada en protección continua de datos,
  con puntos de recuperación de segundos y migración entre plataformas.
why_reference: 'Zerto es la referencia en recuperación ante desastres basada en replicación continua a nivel de
  hipervisor: sus objetivos de punto de recuperación se miden en segundos, no en horas, y su registro de cambios
  permite volver al instante anterior a un cifrado por ransomware. Esa misma tecnología es la que usa para migrar
  cargas entre plataformas sin apenas parada.'
certifications:
- ISO 27001
- SOC 2 Tipo II
company_size:
- mediana
- grande
market_rank:
  business-continuity: 6
  cloud-migration: 4
sources:
- https://en.wikipedia.org/wiki/Zerto
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/zerto.png
needs_review: false
---

En lugar de hacer instantáneas periódicas, Zerto intercepta cada escritura en el hipervisor y la replica al destino de forma continua, manteniendo un diario de cambios de horas o días. Recuperar consiste en elegir un punto de ese diario con granularidad de segundos, lo que en un incidente de ransomware permite volver justo al instante anterior al cifrado en lugar de perder la jornada completa.

La replicación agrupa las máquinas en grupos de protección consistentes, de modo que una aplicación de varios servidores se recupera con todos sus componentes en el mismo instante lógico. Las pruebas de recuperación se ejecutan en una red aislada sin interrumpir la protección, que es lo que permite ensayar el plan con la frecuencia que exige una auditoría.

El mismo motor sirve para migrar: replicar hacia otra plataforma o nube y conmutar cuando convenga, con una ventana de indisponibilidad mínima.
