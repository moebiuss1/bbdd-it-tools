---
name: MLflow
slug: mlflow
categories:
- ai-governance
tags:
- mlops
- model-registry
- experiment-tracking
- opensource
- lineage
- reproducibility
type: opensource
cost_model: gratis
cost_details: Proyecto libre bajo licencia Apache 2.0. Disponible gestionado dentro de plataformas de datos comerciales.
website: https://mlflow.org
description: 'Plataforma abierta para el ciclo de vida del aprendizaje automático: registro de experimentos, empaquetado
  reproducible, registro de modelos con etapas y despliegue.'
why_reference: 'MLflow es el estándar de facto para registrar y versionar modelos: su registro es la pieza que permite
  saber qué versión está en producción, con qué datos y qué código se entrenó y quién la aprobó. Sin ese rastro
  no hay gobierno de modelos posible, y es la implementación libre que casi todo el sector ha adoptado.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/mlflow/mlflow
license: Apache-2.0
certifications: []
market_rank:
  ai-governance: 5
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/mlflow.png
needs_review: false
---

MLflow resuelve un problema básico y muy real: en cuanto un equipo entrena decenas de variantes de un modelo, nadie recuerda qué configuración produjo el resultado que se llevó a producción. Su registro de experimentos guarda automáticamente parámetros, métricas, artefactos y versión del código de cada ejecución, y permite compararlas.

El registro de modelos añade la parte de gobierno: cada modelo tiene versiones, etapas —desarrollo, preproducción, producción, archivado—, anotaciones y transiciones que pueden requerir aprobación, con el historial completo de quién promovió qué y cuándo. Es el equivalente al control de cambios para activos de aprendizaje automático.

El formato de empaquetado estandariza cómo se guarda un modelo junto con su entorno de ejecución, de modo que se puede servir en distintos destinos sin reescribir el envoltorio, y la evaluación integrada permite comparar candidatos con las mismas métricas antes de decidir el paso a producción.
