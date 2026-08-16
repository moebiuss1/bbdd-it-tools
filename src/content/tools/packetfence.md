---
name: PacketFence
slug: packetfence
categories:
- nac
tags:
- nac
- opensource
- 802.1x
- radius
- network-security
- byod
type: opensource
cost_model: freemium
cost_details: Software libre bajo GPLv2. Inverse ofrece soporte comercial y suscripciones de mantenimiento.
website: https://www.packetfence.com
description: Solución de control de acceso a la red de código abierto con portal cautivo, 802.1X, registro de dispositivos,
  aislamiento por VLAN y detección de anomalías.
why_reference: PacketFence es el único NAC libre con recorrido y despliegues reales de tamaño en universidades, hospitales
  y administraciones, y la alternativa habitual cuando el coste por puerto de un NAC comercial hace inviable el proyecto.
  Soporta la electrónica de red de prácticamente todos los fabricantes.
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/inverse-inc/packetfence
license: GPL-2.0
market_rank:
  nac: 6
sources:
- https://www.gartner.com/reviews/market/network-access-control
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/packetfence.png
needs_review: false
---

PacketFence cubre el repertorio completo de un NAC: portal cautivo con múltiples métodos de autenticación, 802.1X con su propio servidor RADIUS, registro y perfilado de dispositivos, comprobación de cumplimiento del puesto, aislamiento en VLAN de cuarentena y gestión del ciclo de vida de invitados con validación por SMS, correo o patrocinador.

Su ventaja diferencial es la compatibilidad: soporta conmutadores y controladores inalámbricos de decenas de fabricantes mediante los mecanismos estándar (RADIUS, SNMP, CoA), lo que permite aplicar una política homogénea sobre una red heredada y mezclada, que es la situación real de la mayoría de campus.

Al ser libre, el coste no crece con el número de puertos, y eso lo convierte en la opción practicable para entornos con miles de tomas y presupuestos que no admiten licencias por dispositivo. La contrapartida es que exige un equipo con conocimiento de red dispuesto a operarlo.

El proyecto lo mantiene Akamai desde la compra de Inverse, y sigue publicándose bajo GPLv2.
