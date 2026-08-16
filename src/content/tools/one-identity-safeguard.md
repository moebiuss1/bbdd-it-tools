---
name: One Identity Safeguard
slug: one-identity-safeguard
categories:
- pam
tags:
- pam
- session-management
- behavior-analytics
- appliance
- credential-vault
type: comercial
cost_model: licencia-perpetua
cost_details: Licencia por usuario o por activo gestionado, sobre appliance físico endurecido o virtual.
website: https://www.oneidentity.com/products/one-identity-safeguard/
description: Plataforma de accesos privilegiados con bóveda en appliance endurecido, gestión y grabación de sesiones
  y análisis del comportamiento del administrador.
why_reference: 'Safeguard es uno de los productos que Gartner sigue en gestión de accesos privilegiados y destaca
  por dos cosas: la bóveda se entrega en un appliance endurecido con superficie de ataque mínima, y su análisis
  de comportamiento detecta al usuario privilegiado suplantado por patrones tan finos como su cadencia de tecleo.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- Common Criteria
- FIPS 140-2
company_size:
- mediana
- grande
market_rank:
  pam: 4
sources:
- https://www.gartner.com/reviews/market/privileged-access-management
- https://en.wikipedia.org/wiki/One_Identity
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/one-identity-safeguard.png
needs_review: false
---

Safeguard se compone de tres piezas. La bóveda custodia y rota las credenciales privilegiadas con flujos de solicitud y aprobación, y se entrega en un appliance endurecido —sin sistema operativo de propósito general accesible— precisamente porque es el sistema que un atacante querría comprometer primero.

El módulo de sesiones actúa como proxy transparente: registra en vídeo y en texto indexable todo lo que ocurre en las conexiones SSH, RDP y web, permite buscar por comando o por ventana y puede bloquear en tiempo real una orden prohibida.

El análisis de comportamiento es lo que lo diferencia: construye un perfil de cada administrador —qué sistemas usa, a qué horas, con qué comandos, incluso con qué ritmo de tecleo y movimiento de ratón— y alerta cuando la sesión no encaja con la persona que dice ser, que es el escenario de credencial privilegiada robada.
