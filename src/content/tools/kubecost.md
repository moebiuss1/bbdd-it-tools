---
name: Kubecost
slug: kubecost
categories:
- cloud-cost
tags:
- kubernetes
- finops
- cloud-cost
- opensource
- containers
- chargeback
type: opensource
cost_model: freemium
cost_details: Versión gratuita con quince días de retención. Enterprise por número de nodos monitorizados. El motor
  OpenCost es libre bajo Apache 2.0.
website: https://www.kubecost.com
description: Medición y reparto del coste de Kubernetes por espacio de nombres, despliegue, etiqueta o equipo, construida
  sobre el proyecto OpenCost de la CNCF.
why_reference: 'Kubecost resuelve el punto ciego más caro del FinOps: la factura de la nube ve una máquina, no los
  veinte servicios que comparten su clúster. Su motor OpenCost es el proyecto de la CNCF que se ha convertido en
  la forma estándar de asignar coste dentro de Kubernetes.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/opencost/opencost
license: Apache-2.0
market_rank:
  cloud-cost: 4
sources:
- https://www.cncf.io/projects/opencost/
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/kubecost.png
needs_review: false
---

Kubecost toma las métricas de uso de cada contenedor —CPU, memoria, almacenamiento, red y GPU— y las cruza con los precios reales del proveedor, incluidos descuentos por capacidad reservada e instancias interrumpibles, para repartir el coste del clúster entre espacios de nombres, despliegues, etiquetas o equipos.

Con ese reparto aparecen las conversaciones útiles: qué servicio pide diez veces más memoria de la que consume, cuánto cuesta un entorno de preproducción encendido de noche, o qué parte de la factura corresponde a cada producto. Las recomendaciones de ajuste de peticiones y límites son la fuente de ahorro más inmediata en la mayoría de clústeres.

El motor de cálculo, OpenCost, es un proyecto de la CNCF con especificación abierta, de modo que la metodología de asignación es auditable y no una caja negra del fabricante.
