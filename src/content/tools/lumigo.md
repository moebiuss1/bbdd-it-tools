---
name: Lumigo
slug: lumigo
categories:
- serverless-management
tags:
- serverless
- observability
- aws
- lambda
- tracing
- debugging
type: comercial
cost_model: freemium
cost_details: Plan gratuito con volumen limitado de trazas; planes de pago por número de invocaciones al mes.
website: https://lumigo.io
cert_url: https://lumigo.io/security
description: 'Plataforma de observabilidad especializada en arquitecturas serverless y de contenedores: traza cada invocación
  de extremo a extremo con los datos de la petición y la respuesta.'
why_reference: 'Lumigo es la herramienta de referencia para depurar aplicaciones serverless, donde las técnicas clásicas no
  sirven: no hay servidor al que conectarse ni proceso que inspeccionar, y sin trazado distribuido un fallo entre funciones
  y colas es prácticamente imposible de reconstruir.'
certifications:
- ISO 27001
- SOC 2 Tipo II
company_size:
- pequeña
- mediana
- grande
market_rank:
  serverless-management: 3
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/lumigo.png
needs_review: false
---

Depurar una arquitectura de funciones tiene un problema estructural: la ejecución salta entre funciones, colas, temas y bases de datos gestionadas, cada salto vive en un registro distinto y el proceso desaparece en cuanto termina. Lumigo instrumenta automáticamente esos servicios y reconstruye la transacción completa como una sola traza.

Cada traza incluye el contenido real de la petición y la respuesta en cada salto —con enmascarado de datos sensibles—, lo que permite ver el valor concreto que rompió la ejecución en lugar de deducirlo de un registro de error. También mide la duración y el coste de cada invocación, detecta arranques en frío y señala funciones sobredimensionadas o con tiempo de espera mal ajustado.

El despliegue no requiere cambiar el código: se conecta a la cuenta y añade la instrumentación mediante capas y variables de entorno, lo que hace que la adopción sea cuestión de minutos.
