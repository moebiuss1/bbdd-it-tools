---
name: Cohesity DataProtect
slug: cohesity-dataprotect
categories:
- enterprise-backup
- business-continuity
tags:
- backup
- ransomware
- immutable
- scale-out
- recovery
- data-management
type: comercial
cost_model: suscripción
cost_details: Suscripción por capacidad protegida (front-end TB), sobre appliance propio, hardware certificado o nube.
website: https://www.cohesity.com/products/data-protect/
cert_url: https://www.cohesity.com/trust/
description: Plataforma de protección de datos sobre un sistema de ficheros distribuido que combina copia, recuperación instantánea
  y análisis del contenido protegido.
why_reference: Cohesity es líder del mercado de backup y recuperación empresarial de Gartner y, tras integrar el negocio de
  Veritas, uno de los dos mayores proveedores de protección de datos del mundo. Su arquitectura de escalado horizontal permite
  recuperar máquinas virtuales directamente desde la copia, sin esperar a restaurar.
certifications:
- ISO 27001
- SOC 2 Tipo II
- FIPS 140-2
- Common Criteria
company_size:
- mediana
- grande
market_rank:
  business-continuity: 5
  enterprise-backup: 4
sources:
- https://www.gartner.com/reviews/market/enterprise-backup-and-recovery
- https://en.wikipedia.org/wiki/Cohesity
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/cohesity-dataprotect.png
needs_review: false
---

Cohesity almacena las copias en un sistema de ficheros distribuido propio que deduplica y comprime globalmente y que crece añadiendo nodos. Esa base es la que permite su función más práctica: montar y arrancar una máquina virtual directamente desde el repositorio de copia, con lo que la recuperación empieza en minutos y la restauración real ocurre en segundo plano.

Frente al ransomware aplica instantáneas inmutables que ningún administrador puede borrar dentro del periodo de retención, control de acceso con aprobación por cuórum para las operaciones destructivas y detección de anomalías sobre las tasas de cambio de los datos protegidos.

Como los datos de copia ya están indexados, la plataforma permite además buscar y clasificar información sensible dentro de ellos y ejecutar análisis sin tocar los sistemas de producción, algo que convierte el repositorio de respaldo en una fuente útil para cumplimiento y respuesta a incidentes.
