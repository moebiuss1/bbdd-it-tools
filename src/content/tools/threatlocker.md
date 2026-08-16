---
name: ThreatLocker
slug: threatlocker
categories:
- application-control
- usb-device-control
tags:
- endpoint
- zero-trust
- automatizacion
- compliance
type: comercial
cost_model: presupuesto-personalizado
cost_details: Licencia anual por endpoint. Precio a consulta según módulos (Allowlisting, Ringfencing, Storage Control, Network
  Control).
website: https://www.threatlocker.com
description: Plataforma de control de aplicaciones basada en denegación por defecto (deny-by-default). Bloquea toda ejecución
  de software en un endpoint o servidor salvo que esté explícitamente aprobada, con "ringfencing" para limitar qué puede hacer
  cada aplicación permitida.
why_reference: Referente en application allowlisting bajo el modelo Zero Trust. Su enfoque deny-by-default satisface directamente
  los requisitos de control de aplicaciones de NIST, CMMC, CIS Controls y Essential Eight, muy citado en auditorías de cumplimiento
  técnico para MSPs y medianas empresas.
certifications:
- SOC 2 Tipo II
company_size:
- pequeña
- mediana
- grande
sources:
  - https://www.threatlocker.com/software-security-audit
  - https://www.threatlocker.com/capabilities/allowlisting
cert_url: https://www.threatlocker.com/software-security-audit
first_added: 2026-08-10
last_verified: '2026-08-10'
logo: /logos/threatlocker.png
needs_review: false
market_rank:
  application-control: 2
  usb-device-control: 3
---

ThreatLocker invierte el modelo tradicional de antivirus: en lugar de intentar
reconocer software malicioso, deniega por defecto la ejecución de cualquier
aplicación no aprobada explícitamente.

- **Allowlisting**: solo se ejecuta software incluido en una lista de permitidos, gestionada de forma centralizada
- **Ringfencing**: aísla aplicaciones permitidas para impedir que interactúen entre sí de forma no autorizada (p. ej. que Office lance PowerShell)
- **Storage Control**: gestión granular de acceso a almacenamiento local, red y dispositivos extraíbles
- **Network Control**: cortafuegos dinámico a nivel de endpoint con reglas por aplicación
- Auditoría SOC 2 Tipo II anual por un auditor certificado AICPA; certificación ISO 27001 en curso (agosto 2026)
- Ampliamente adoptado por proveedores de servicios gestionados (MSP) como control técnico para CMMC y Essential Eight
