---
name: Wazuh
slug: wazuh
category: siem
tags:
- open-source
- endpoint
- compliance
- monitorizacion
- ids
- vulnerability-management
- incident-response
- cloud
- on-premise
type: opensource
cost_model: gratis
cost_details: Gratuito (AGPLv3). Soporte empresarial y Wazuh Cloud desde $500/mes.
website: https://wazuh.com
description: 'Plataforma SIEM + XDR de código abierto que unifica monitorización de seguridad, detección de intrusiones, análisis
  de logs, evaluación de cumplimiento y gestión de vulnerabilidades en un solo sistema.

  '
why_reference: 'Wazuh es la plataforma SIEM/XDR open source más desplegada del mundo, con más de 20 millones de endpoints
  protegidos. Ha sido adoptada por empresas Fortune 500 y gobiernos como alternativa a soluciones propietarias. Su integración
  nativa con el stack Elastic (ELK) y sus módulos de cumplimiento preconfigurados para PCI DSS, HIPAA, GDPR y ENS la convierten
  en referente para auditoría y cumplimiento.

  '
certifications:
- PCI DSS
- HIPAA
- RGPD / GDPR
- ENS Media
company_size:
- pequeña
- mediana
- grande
market_rank: 3
repo: https://github.com/wazuh/wazuh
license: AGPL-3.0
sources:
- https://itsm.tools/best-open-source-siem
- https://github.com/wazuh/wazuh
last_verified: '2026-08-07'
needs_review: false
logo: /logos/wazuh.png
---

Wazuh nació como un fork de OSSEC en 2015 y ha evolucionado hasta convertirse en una
plataforma completa de seguridad. Combina funcionalidades de SIEM (gestión de logs y
correlación), HIDS (detección de intrusiones en host), evaluación de cumplimiento y
gestión de vulnerabilidades.

### Componentes clave

- **Wazuh Agent**: Agente ligero desplegado en endpoints (Windows, Linux, macOS)
- **Wazuh Server**: Motor de análisis, correlación y alertas
- **Wazuh Indexer**: Basado en OpenSearch para almacenamiento y visualización
- **Wazuh Dashboard**: Interfaz web con paneles de seguridad y cumplimiento

### Módulos de cumplimiento destacados

- PCI DSS (todos los requisitos técnicos)
- HIPAA (controles administrativos y técnicos)
- ISO 27001 (Anexo A)
- ENS (Esquema Nacional de Seguridad español) — niveles Básico y Medio
- GDPR (monitorización de acceso a datos personales)
