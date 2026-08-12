---
name: Elastic Security
slug: elastic-security
categories:
- edr
- log-management
- siem
tags:
- open-source
- siem
- edr
- threat-hunting
- kibana
- elasticsearch
type: opensource
cost_model: freemium
cost_details: Open source (gratuito). Elastic Cloud desde $95/mes. Funcionalidades avanzadas de seguridad en licencia Platinum/Enterprise.
website: https://www.elastic.co/security
description: Plataforma SIEM + XDR construida sobre la pila ELK (Elasticsearch, Logstash, Kibana) que unifica la ingesta de
  logs, detección de amenazas, hunting y respuesta en un solo stack. La versión open source ofrece detección SIEM completa
  con reglas predefinidas de MITRE ATT&CK.
why_reference: Elastic Security es la evolución del stack ELK —el estándar de facto en análisis de logs y observabilidad—
  hacia la seguridad. Su capacidad para ingestar cualquier tipo de dato, la velocidad de búsqueda de Elasticsearch (respuestas
  en milisegundos sobre petabytes) y las más de 700 reglas de detección predefinidas mapeadas a MITRE ATT&CK la convierten
  en una alternativa SIEM extremadamente popular, especialmente en equipos con cultura DevOps.
certifications:
- ISO 27001
- SOC 2 Tipo II
- PCI DSS
- HIPAA
company_size:
- pequeña
- mediana
- grande
market_rank: 5
repo: https://github.com/elastic/elasticsearch
license: Elastic License 2.0
sources:
- https://www.gartner.com/reviews/market/security-information-event-management
- https://www.elastic.co/
last_verified: '2026-08-12'
needs_review: false
logo: /logos/elastic-security.png
---

Elastic Security integra SIEM, detección de amenazas y respuesta en endpoints sobre
la plataforma Elastic (ELK). Aprovecha la velocidad de búsqueda y escalabilidad
horizontal de Elasticsearch para ofrecer una experiencia de threat hunting en
tiempo real difícil de igualar por los SIEM tradicionales.
- Elasticsearch: Motor de búsqueda y almacenamiento distribuido de logs y eventos
- Kibana: Interfaz de visualización con dashboards de seguridad y caso de uso
- Integrations: Más de 300 integraciones predefinidas para ingestar datos de seguridad
- Elastic Defend: Protección de endpoints con prevención de malware y ransomware
- Detection Engine: 700+ reglas de detección alineadas con MITRE ATT&CK
- Osquery Manager: Consultas SQL en tiempo real sobre endpoints para hunting
- Stack unificado que elimina la necesidad de herramientas separadas para logs, SIEM y endpoints
- Búsqueda federada sobre datos históricos y en tiempo real desde una sola interfaz
- Informes exportables con evidencia para requisitos de cumplimiento
