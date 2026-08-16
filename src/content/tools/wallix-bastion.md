---
name: WALLIX Bastion
slug: wallix-bastion
categories:
- pam
tags:
- pam
- session-recording
- compliance
- ot
- europe
- least-privilege
type: comercial
cost_model: suscripción
cost_details: Licencia por número de sesiones o dispositivos gestionados, en appliance virtual o como servicio.
website: https://www.wallix.com
description: Solución europea de gestión de accesos privilegiados con bóveda de credenciales, proxy de sesiones con grabación
  y control de accesos de proveedores externos.
why_reference: WALLIX es el referente europeo de PAM y una de las pocas soluciones del mercado con certificación de seguridad
  de primer nivel emitida por una autoridad nacional europea, lo que la convierte en la opción habitual en administraciones
  públicas e infraestructuras críticas del continente por requisitos de soberanía.
certifications:
- ISO 27001
- Common Criteria
- ENS Alta
company_size:
- mediana
- grande
market_rank:
  pam: 5
sources:
- https://www.gartner.com/reviews/market/privileged-access-management
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/wallix-bastion.png
needs_review: false
---

Bastion se despliega como proxy: los administradores y los proveedores externos se conectan a él en lugar de al sistema final, se autentican con su propia identidad y la solución inyecta la credencial privilegiada sin revelarla. Toda la sesión —SSH, RDP, web, bases de datos— queda grabada y es reproducible e indexable.

Ese modelo tiene dos ventajas prácticas: no exige agentes en los sistemas destino, lo que permite cubrir equipamiento antiguo e industrial, y produce la evidencia que piden los auditores sin trabajo adicional, incluida la trazabilidad de qué persona concreta ejecutó cada acción con una cuenta compartida.

Su arquitectura ligera y sus certificaciones nacionales explican su implantación en operadores de servicios esenciales, sanidad y administración pública europea, donde la exigencia normativa sobre el acceso de terceros a los sistemas es explícita.
