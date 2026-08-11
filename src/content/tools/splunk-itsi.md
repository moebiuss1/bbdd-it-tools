---
name: Splunk IT Service Intelligence (ITSI)
slug: splunk-itsi
categories:
- kpi-ca-managers
tags:
- monitorizacion
- kpi
- observabilidad
- itsm
- ai
type: comercial
cost_model: suscripción
cost_details: Complemento de pago sobre Splunk Enterprise o Splunk Cloud. Precio por volumen de datos o por carga de trabajo.
website: https://www.splunk.com/en_us/products/it-service-intelligence.html
cert_url: https://www.splunk.com/en_us/about-splunk/splunk-data-security-and-privacy/compliance-at-splunk.html
description: Solución de Splunk para definir servicios de negocio, medirlos mediante KPI y vigilar su salud de forma continua.
  Traduce las métricas de infraestructura en indicadores agregados por servicio con umbrales adaptativos.
why_reference: Es la vía habitual para pasar de monitorizar máquinas a monitorizar servicios en organizaciones que ya operan
  sobre Splunk. Su modelo de árbol de servicios y KPI con umbrales calculados por aprendizaje automático evita el mantenimiento
  manual de cientos de umbrales fijos.
certifications:
- ISO 27001
- SOC 2 Tipo II
- FedRAMP
company_size:
- grande
market_rank: 4
sources:
  - https://www.splunk.com/en_us/products/it-service-intelligence.html
last_verified: '2026-08-11'
needs_review: false
logo: /logos/splunk-itsi.png
---

Splunk IT Service Intelligence (ITSI) se instala como aplicación premium sobre
Splunk Enterprise o Splunk Cloud y reutiliza los datos ya ingestados en la
plataforma. Su aportación no es recoger más telemetría, sino organizarla:
define qué servicios existen, de qué dependen y cómo se mide que estén sanos.

- Servicios y dependencias: árbol que relaciona el servicio de negocio con la infraestructura que lo sostiene
- KPI: búsquedas recurrentes que devuelven el valor de un indicador y se agregan en una puntuación de salud por servicio
- Umbrales adaptativos: los límites se calculan a partir del comportamiento histórico en lugar de fijarse a mano
- Service Analyzer: vista de conjunto del estado de todos los servicios, punto de entrada de la operación diaria
- Glass tables: cuadros de mando sobre un diagrama del servicio, pensados para presentar a negocio
- Event Analytics: agrupa alertas relacionadas en episodios para reducir el ruido en el centro de operaciones

Para auditoría interesa sobre todo la capacidad de fijar un indicador con su
umbral, su responsable y su histórico consultable, que es exactamente la
evidencia que exige un control de nivel de servicio. Conviene comprobar, eso sí,
que los KPI definidos midan el resultado percibido por el usuario y no la
disponibilidad del servidor, que es el error habitual al desplegarlo.
