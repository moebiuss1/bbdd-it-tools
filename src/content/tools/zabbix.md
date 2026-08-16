---
name: Zabbix
slug: zabbix
categories:
- infra-monitoring
tags:
- monitoring
- opensource
- networking
- snmp
- alerting
- agents
type: opensource
cost_model: gratis
cost_details: Software libre bajo AGPLv3 sin límite de funcionalidad ni de dispositivos. Soporte y formación de pago.
website: https://www.zabbix.com
description: Solución de monitorización empresarial de código abierto para servidores, redes, servicios y aplicaciones, con
  agentes, SNMP, IPMI y descubrimiento automático.
why_reference: 'Zabbix es la plataforma de monitorización libre más completa para infraestructura clásica: cubre servidores,
  electrónica de red, sistemas de alimentación y entornos industriales sin límites de licencia, y es la opción habitual en
  organizaciones que monitorizan miles de dispositivos con presupuesto de software cero.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/zabbix/zabbix
license: AGPL-3.0
market_rank:
  infra-monitoring: 6
sources:
- https://en.wikipedia.org/wiki/Zabbix
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/zabbix.png
needs_review: false
---

Zabbix cubre un terreno donde las plataformas modernas de observabilidad flojean: la infraestructura física y de red. Recoge datos por agente propio, SNMP, IPMI, JMX, consultas a bases de datos, comprobaciones sintéticas y ejecución remota, lo que le permite vigilar desde un conmutador o un sistema de alimentación ininterrumpida hasta una aplicación Java.

Su modelo de plantillas y descubrimiento de bajo nivel evita configurar dispositivo por dispositivo: una plantilla define qué recoger y qué disparadores aplicar, y el descubrimiento crea automáticamente los elementos para cada interfaz, sistema de ficheros o instancia encontrada.

Los disparadores se expresan como condiciones sobre los datos recogidos, con dependencias entre ellos para evitar tormentas de alertas cuando cae un elemento del que cuelgan otros, y la escalada dirige el aviso al siguiente nivel si nadie lo atiende.
