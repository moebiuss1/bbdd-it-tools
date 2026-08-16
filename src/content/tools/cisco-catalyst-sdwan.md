---
name: Cisco Catalyst SD-WAN
slug: cisco-catalyst-sdwan
categories:
- sd-wan
tags:
- sd-wan
- networking
- cisco
- wan
- zero-trust
type: comercial
cost_model: suscripción
cost_details: Suscripción por dispositivo y nivel (Essentials, Advantage, Premier), más el hardware Catalyst o ISR.
website: https://www.cisco.com
description: 'Plataforma SD-WAN heredera de Viptela: enrutado por políticas de aplicación, orquestación centralizada
  de sedes y túneles cifrados sobre cualquier transporte.'
why_reference: Cisco es el proveedor con mayor base instalada de SD-WAN del mundo y figura entre los líderes del
  mercado de WAN edge que sigue Gartner. Su plataforma es la referencia en organizaciones con centenares de sedes
  que ya operan equipamiento Cisco y necesitan una migración desde MPLS sin cambiar de fabricante.
certifications:
- ISO 27001
- SOC 2 Tipo II
- Common Criteria
- FedRAMP
company_size:
- mediana
- grande
market_rank:
  sd-wan: 3
sources:
- https://www.gartner.com/reviews/market/wan-edge-infrastructure
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/cisco-catalyst-sdwan.png
needs_review: false
---

Catalyst SD-WAN separa el plano de control del de datos: los controladores (vSmart) distribuyen las políticas, el orquestador (vBond) autentica cada sede que se incorpora y vManage concentra la configuración, la monitorización y las plantillas de despliegue de toda la red.

Sobre ese armazón, la selección dinámica de camino mide pérdida, latencia y jitter de cada enlace —MPLS, banda ancha, 4G/5G— y mueve el tráfico de cada aplicación al que cumple su umbral, con reparación de errores hacia adelante y duplicación de paquetes para voz y vídeo. El reconocimiento de aplicaciones permite escribir políticas por aplicación en vez de por subred.

La seguridad se integra en el propio router (firewall, IPS, filtrado URL y ruptura de tráfico a internet en la sede) o se encadena con la nube de seguridad del fabricante, que es el camino habitual hacia una arquitectura SASE.
