---
name: Cisco Umbrella
slug: cisco-umbrella
categories:
- swg
tags:
- dns-security
- web-security
- sse
- cloud
- cisco
type: comercial
cost_model: suscripción
cost_details: Suscripción por usuario y año. Paquetes DNS Essentials, DNS Advantage y SIG Essentials/Advantage.
website: https://umbrella.cisco.com
cert_url: https://trustportal.cisco.com/c/r/ctp/home.html
description: Seguridad entregada desde la nube con filtrado DNS como primera capa, proxy web, firewall de capa 7 y sandbox,
  heredera de OpenDNS.
why_reference: 'Umbrella es la referencia en seguridad DNS: resuelve una parte enorme del tráfico DNS mundial y esa telemetría
  alimenta un bloqueo de dominios maliciosos que actúa antes de que se establezca la conexión. Es la vía más rápida de dar
  cobertura a sedes pequeñas y equipos fuera de la red, y Gartner la sigue en security service edge.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- FedRAMP
- PCI DSS
company_size:
- pequeña
- mediana
- grande
market_rank:
  swg: 6
sources:
- https://www.gartner.com/reviews/market/security-service-edge
- https://en.wikipedia.org/wiki/Cisco_Umbrella
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/cisco-umbrella.png
needs_review: false
---

Umbrella parte de una idea sencilla: casi toda conexión empieza por una consulta DNS, así que bloquear la resolución de un dominio malicioso corta el ataque antes de que exista tráfico que inspeccionar. Al heredar la infraestructura de OpenDNS, resuelve una porción muy grande del DNS mundial y usa esa telemetría para clasificar dominios y detectar infraestructura de mando y control recién levantada.

Sobre esa capa añade un proxy web selectivo que inspecciona el tráfico de los dominios dudosos, control de aplicaciones en la nube, firewall de capa 3/4 con reglas de aplicación, sandbox de ficheros y aislamiento remoto del navegador en los paquetes superiores.

El despliegue es su punto fuerte: cambiar los servidores DNS de una sede da cobertura inmediata sin instalar nada, y el cliente en el equipo extiende la misma política a los portátiles fuera de la oficina.
