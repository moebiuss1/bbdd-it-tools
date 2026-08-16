---
name: Dynatrace
slug: dynatrace
categories:
- infra-monitoring
tags:
- apm
- observability
- monitoring
- ai
- tracing
- kubernetes
type: comercial
cost_model: suscripción
cost_details: 'Pago por consumo: por hora de host monitorizado, gigabyte de registro ingerido y unidades de análisis.'
website: https://www.dynatrace.com
cert_url: https://www.dynatrace.com/company/trust-center
description: Plataforma de observabilidad con instrumentación automática, mapa de dependencias en tiempo real y análisis de
  causa raíz asistido por su motor Davis.
why_reference: 'Dynatrace es líder reconocido del mercado de plataformas de observabilidad de Gartner y el referente en instrumentación
  sin configuración: un único agente descubre procesos, servicios y dependencias, y el análisis de causa raíz señala el componente
  responsable en lugar de dejar mil alertas correlacionadas al equipo de guardia.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- ISO 27017
- ISO 27018
- FedRAMP
- PCI DSS
company_size:
- mediana
- grande
market_rank:
  infra-monitoring: 4
sources:
- https://www.gartner.com/reviews/market/observability-platforms
- https://en.wikipedia.org/wiki/Dynatrace
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/dynatrace.png
needs_review: false
---

El agente OneAgent se instala una vez por host y detecta solo los procesos que se ejecutan, los instrumenta y empieza a enviar métricas, trazas, registros y datos de código sin configuración por aplicación. A partir de ahí construye Smartscape, un mapa vivo de dependencias entre procesos, servicios, contenedores y hosts.

Sobre ese mapa trabaja Davis, el motor de análisis: cuando algo se degrada, correlaciona las señales siguiendo las dependencias reales y presenta un único problema con su causa probable, en lugar de una avalancha de alertas de todos los componentes afectados aguas abajo. Esa reducción de ruido es su argumento principal en entornos grandes.

La plataforma cubre además experiencia de usuario real y sintética, seguridad de aplicaciones en ejecución —detectando qué vulnerabilidades de biblioteca se ejecutan de verdad— y automatización de respuestas.
