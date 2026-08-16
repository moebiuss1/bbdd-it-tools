---
name: SonarQube
slug: sonarqube
categories:
- code-quality
tags:
- open-source
- ci-cd
- automatizacion
- compliance
- ai
type: opensource
cost_model: freemium
cost_details: SonarQube Community Edition gratuita (LGPL-3.0). Developer/Enterprise/Data Center Edition y SonarQube Cloud
  por suscripción.
website: https://www.sonarsource.com
description: Plataforma de análisis estático de código para detectar bugs, vulnerabilidades, code smells y deuda técnica,
  integrada en pipelines CI/CD. Soporta más de 30 lenguajes de programación y analiza también código generado por asistentes
  de IA.
why_reference: Estándar de facto en análisis estático de código y "quality gates" dentro de pipelines DevOps, con adopción
  masiva tanto en su edición Community gratuita como en despliegues empresariales. Sonar (la empresa) mantiene ISO 27001:2022
  y SOC 2 Tipo II a nivel corporativo para todas sus líneas de producto.
certifications:
- ISO 27001
- SOC 2 Tipo II
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/SonarSource/sonarqube
license: LGPL-3.0
sources:
- https://www.sonarsource.com/trust-center/
- https://www.sonarsource.com/company/press-releases/sonar-iso-certification/
cert_url: https://www.sonarsource.com/trust-center/
first_added: 2026-08-10
last_verified: '2026-08-10'
logo: /logos/sonarqube.png
needs_review: false
market_rank:
  code-quality: 1
---

SonarQube analiza el código en cada commit o pull request y bloquea el
despliegue si no supera un "quality gate" configurable.

- Detección de bugs, vulnerabilidades de seguridad (SAST) y code smells en más de 30 lenguajes
- **SonarQube for IDE**: feedback en tiempo real dentro del editor, antes del commit
- Reglas específicas para evaluar código generado por asistentes de IA ("AI Code Assurance")
- Ayuda a demostrar cumplimiento de DORA y del ciclo de vida de desarrollo seguro exigido por ISO 27001:2022
- ISO 27001:2022 y SOC 2 Tipo II (criterios de seguridad, confidencialidad y disponibilidad) verificados a nivel de compañía,
  cubriendo SonarQube Server, SonarQube Cloud y SonarQube for IDE
