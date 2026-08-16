---
name: Carbon Black App Control
slug: carbon-black-app-control
categories:
- application-control
tags:
- application-control
- allowlisting
- endpoint
- hardening
- compliance
- ot
type: comercial
cost_model: suscripción
cost_details: Licencia por endpoint protegido; disponible para servidores, puestos fijos y sistemas de propósito
  único.
website: https://www.broadcom.com/products/carbon-black
description: Control de aplicaciones por lista de permitidos con bloqueo de todo lo no autorizado, supervisión de
  la integridad de ficheros y protección de sistemas de propósito fijo.
why_reference: 'Carbon Black App Control —antes Bit9— es el producto que definió el control de aplicaciones por
  lista de permitidos en el endpoint y sigue siendo la referencia en sistemas de función fija: cajeros, terminales
  de punto de venta, equipamiento industrial y servidores críticos donde nada debería cambiar nunca.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- PCI DSS
- Common Criteria
company_size:
- mediana
- grande
market_rank:
  application-control: 3
sources:
- https://www.gartner.com/reviews/market/endpoint-protection-platforms
- https://en.wikipedia.org/wiki/Carbon_Black_(company)
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/carbon-black-app-control.png
needs_review: false
---

El planteamiento es el inverso al del antivirus: en lugar de enumerar lo malo, se congela el sistema en un estado conocido y se bloquea la ejecución de cualquier binario, script o controlador que no esté aprobado. En sistemas que no cambian —una terminal, un autómata, un servidor de aplicación— ese modelo elimina de raíz la ejecución de código desconocido, incluido el malware sin firma previa.

Para que sea operable, el producto aprueba software por múltiples vías: reputación en la nube del fabricante, firma del editor, actualizadores de confianza que pueden instalar por sí mismos, o aprobación explícita del administrador. Los cambios en ficheros críticos quedan registrados con quién y cuándo, lo que cubre también los requisitos de supervisión de integridad que exigen normas como PCI DSS.

El coste real está en la fase inicial de descubrimiento y modelado del inventario de software; a cambio, el estado final es un sistema donde la superficie de ejecución está explícitamente definida.
