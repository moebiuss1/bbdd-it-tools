---
name: Azure API Management
slug: azure-api-management
categories:
- api-management
tags:
- api-management
- api-gateway
- azure
- cloud
- governance
type: comercial
cost_model: pago-por-uso
cost_details: Niveles Consumo (pago por llamada), Básico, Estándar y Premium por unidad y hora.
website: https://azure.microsoft.com/products/api-management
cert_url: https://learn.microsoft.com/azure/compliance/
description: Servicio gestionado de Azure para publicar, proteger, transformar y monitorizar APIs, con portal de
  desarrollador y pasarela autoalojada para entornos híbridos.
why_reference: Es la pasarela de APIs por defecto del ecosistema Microsoft y uno de los productos que Gartner sigue
  en gestión de APIs de ciclo completo. Su integración nativa con Entra ID, Application Insights y las funciones
  de Azure la convierte en la elección obvia para organizaciones ya asentadas en esa nube.
certifications:
- ISO 27001
- SOC 2 Tipo II
- PCI DSS
- FedRAMP
- ENS Alta
- HIPAA
company_size:
- pequeña
- mediana
- grande
market_rank:
  api-management: 5
sources:
- https://www.gartner.com/reviews/market/full-life-cycle-api-management
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/azure-api-management.png
needs_review: false
---

API Management publica cualquier backend —funciones, contenedores, servicios locales— como API gobernada y aplica políticas declarativas en XML sobre la petición y la respuesta: validación de JWT contra Entra ID, límites de tasa por suscripción, listas de IP, caché, reescritura de cabeceras y transformación entre JSON y XML.

El portal del desarrollador, personalizable, publica la documentación y permite el alta autoservicio de aplicaciones con sus claves; la analítica se integra con Application Insights para correlacionar el uso de la API con el rendimiento del servicio que hay detrás.

La pasarela autoalojada, distribuida como contenedor, permite ejecutar el plano de datos dentro del propio centro de datos o en otra nube manteniendo la gestión centralizada en Azure, que es el patrón habitual cuando el dato no puede salir pero el gobierno sí se quiere unificar.
