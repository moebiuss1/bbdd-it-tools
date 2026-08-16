---
name: T-Pot
slug: t-pot-honeypot
categories:
- deception
tags:
- honeypot
- deception
- opensource
- threat-intelligence
- docker
- research
type: opensource
cost_model: gratis
cost_details: Proyecto libre de Deutsche Telekom Security bajo licencia GPLv3, sin coste.
website: https://github.com/telekom-security/tpotce
description: Plataforma de honeypots todo en uno que despliega en contenedores más de veinte trampas distintas con
  visualización y análisis integrados.
why_reference: 'T-Pot, mantenido por Deutsche Telekom Security, es la plataforma de honeypots libre más usada del
  mundo y la puerta de entrada habitual a la disciplina: reúne en un solo despliegue las trampas de referencia de
  cada protocolo y las conecta a un panel de análisis, lo que en instalación manual costaría semanas.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/telekom-security/tpotce
license: GPL-3.0
certifications: []
market_rank:
  deception: 5
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/t-pot-honeypot.png
needs_review: false
---

T-Pot empaqueta en contenedores una colección de honeypots especializados —SSH y Telnet, servicios web, SCADA e industriales, bases de datos, correo, protocolos de red— y los expone simultáneamente en un mismo sistema, cada uno registrando quién intenta qué contra él.

Toda esa telemetría se envía a una pila de análisis con almacenamiento, cuadros de mando y mapas de ataque, además de la integración con servicios de reputación que permite contrastar el origen de cada intento. Para un equipo de seguridad es la forma más rápida de tener visibilidad real de qué se está intentando contra sus direcciones públicas.

Sus usos habituales son tres: investigación y formación, alimentar listas propias de indicadores con lo observado en la propia infraestructura, y detección interna —un T-Pot en un segmento donde no debería haber tráfico produce alertas de altísima calidad.
