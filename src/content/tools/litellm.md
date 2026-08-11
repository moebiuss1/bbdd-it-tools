---
name: LiteLLM
slug: litellm
categories:
- llm-gateway
tags:
- ai
- open-source
- automatizacion
- monitorizacion
- saas
type: opensource
cost_model: freemium
cost_details: Proxy y SDK open source (MIT) gratuitos. LiteLLM Enterprise (SSO, soporte, funciones adicionales) por suscripción.
website: https://www.litellm.ai
description: Gateway y proxy open source para LLMs que expone una API única, compatible con el formato de OpenAI, para llamar
  a más de 100 proveedores de modelos (Bedrock, Azure OpenAI, Vertex AI, Anthropic, Cohere, modelos locales...). Añade control
  de gasto, balanceo de carga, "guardrails" y registro centralizado.
why_reference: El gateway de LLMs open source más popular del ecosistema, con más de 50.000 estrellas en GitHub y un núcleo
  en Rust orientado a rendimiento. Se ha convertido en la capa de abstracción por defecto para organizaciones que necesitan
  evitar el bloqueo (lock-in) a un único proveedor de modelos y auditar de forma centralizada el gasto y uso de IA generativa.
certifications: []
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/BerriAI/litellm
license: MIT (el directorio enterprise/ tiene licencia propia)
sources:
  - https://github.com/BerriAI/litellm
  - https://www.litellm.ai
last_verified: '2026-08-10'
needs_review: false
market_rank: 1
---

LiteLLM actúa como una capa intermedia entre las aplicaciones de una
organización y los distintos proveedores de modelos de lenguaje.

- Punto único de control de gasto ("cost tracking") y límites de uso por equipo, proyecto o API key
- Balanceo de carga y fallback automático entre proveedores en caso de error o límite de tasa
- Guardrails configurables (filtrado de contenido, PII) aplicables antes de reenviar peticiones al modelo
- Registro centralizado de todas las llamadas a LLMs de la organización, útil como evidencia de auditoría de uso de IA
- Núcleo con licencia MIT; LiteLLM Enterprise añade SSO, soporte comercial y funciones adicionales de gobernanza
