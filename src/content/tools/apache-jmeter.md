---
name: Apache JMeter
slug: apache-jmeter
categories:
- api-testing
tags:
- api-testing
- load-testing
- performance
- opensource
- automation
- qa
type: opensource
cost_model: gratis
cost_details: Software libre bajo licencia Apache 2.0, sin coste ni límite de ejecuciones.
website: https://jmeter.apache.org
description: Herramienta de la Apache Software Foundation para pruebas de carga y funcionales sobre HTTP, APIs REST, SOAP,
  bases de datos, colas y otros protocolos.
why_reference: 'JMeter es el estándar libre de las pruebas de carga desde hace más de veinte años: es la herramienta que aparece
  en los pliegos cuando se exige demostrar el comportamiento de un servicio bajo concurrencia, y su formato de plan de pruebas
  lo entienden casi todas las plataformas comerciales de rendimiento.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/apache/jmeter
license: Apache-2.0
market_rank:
  api-testing: 2
sources:
- https://en.wikipedia.org/wiki/Apache_JMeter
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/apache-jmeter.png
needs_review: false
---

JMeter modela una prueba como un plan: grupos de hilos que representan usuarios concurrentes, muestreadores que ejecutan las peticiones, controladores lógicos que reproducen el recorrido real y aserciones que deciden si la respuesta es válida. Sobre eso se colocan escuchadores que agregan tiempos de respuesta, percentiles y tasa de error.

Aunque se popularizó para HTTP, cubre JDBC, JMS, FTP, LDAP, SMTP y TCP, lo que permite medir un sistema completo y no solo su capa web. Los planes se ejecutan sin interfaz gráfica desde la línea de órdenes, que es como debe hacerse en una tubería de integración continua, y admiten ejecución distribuida entre varias máquinas para generar carga real.

Su ecosistema de complementos añade gráficas, integración con contenedores y publicación de resultados, y su longevidad garantiza que cualquier problema que uno encuentre ya está documentado.
