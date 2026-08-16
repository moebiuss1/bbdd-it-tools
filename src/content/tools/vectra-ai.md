---
name: Vectra AI
slug: vectra-ai
categories:
- ndr
tags:
- ndr
- ai
- threat-detection
- identity
- cloud
- lateral-movement
type: comercial
cost_model: suscripción
cost_details: Suscripción por número de identidades y dispositivos monitorizados.
website: https://www.vectra.ai
description: Plataforma de detección y respuesta basada en el comportamiento del atacante sobre red, identidad y
  nube, con priorización automática de los incidentes relevantes.
why_reference: 'Vectra es uno de los líderes del mercado de detección y respuesta de red de Gartner y el fabricante
  que más ha desarrollado la detección por comportamiento del atacante en lugar de por firma: modela las técnicas
  —reconocimiento, movimiento lateral, exfiltración— y las puntúa por urgencia sobre el activo afectado.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- RGPD / GDPR
company_size:
- mediana
- grande
market_rank:
  ndr: 3
sources:
- https://www.gartner.com/reviews/market/network-detection-and-response
- https://en.wikipedia.org/wiki/Vectra_AI
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/vectra-ai.png
needs_review: false
---

Vectra no busca ficheros ni firmas: observa la conducta en la red, en la identidad y en la nube, y la contrasta con los comportamientos que caracterizan a un atacante dentro de un entorno —escaneo interno, uso anómalo de credenciales de administrador, túneles ocultos sobre protocolos permitidos, acumulación de datos antes de la salida.

Cada detección se asocia al host o a la cuenta implicada y se puntúa por certeza y por impacto, de modo que el equipo de operaciones recibe una lista corta ordenada por urgencia en lugar de un flujo continuo de alertas sueltas. Esa priorización es su principal argumento frente al ruido de los sistemas tradicionales.

La cobertura de identidad —Active Directory y Entra ID— y de plataformas SaaS es lo que le permite seguir al atacante cuando salta de la red al plano de identidad y a la nube, que es el recorrido habitual de un compromiso actual.
