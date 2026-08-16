---
name: Acalvio ShadowPlex
slug: acalvio-shadowplex
categories:
- deception
tags:
- deception
- honeypot
- identity-protection
- active-directory
- lateral-movement
- ai
type: comercial
cost_model: suscripción
cost_details: Suscripción por número de endpoints y subredes cubiertas; disponible también sobre infraestructura de terceros.
website: https://www.acalvio.com
description: Plataforma de engaño autónomo que genera y distribuye señuelos adaptados a la topología real de la red, con foco
  en la protección de identidades y de Active Directory.
why_reference: 'Acalvio es el fabricante que más ha automatizado la parte cara del engaño: en lugar de diseñar los señuelos
  a mano, analiza la red y despliega los que resultan verosímiles en cada segmento. Es una de las cinco plataformas de deception
  que las comparativas independientes del sector citan de forma recurrente.'
certifications:
- SOC 2 Tipo II
company_size:
- mediana
- grande
market_rank:
  deception: 3
sources:
- https://guptadeepak.com/tools/top-5-honeypots-deception-tools-2026/
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/acalvio-shadowplex.png
needs_review: false
---

El talón de Aquiles del engaño es la verosimilitud: un señuelo que no encaja con el entorno se ignora, y diseñarlos a mano para cada segmento no escala. ShadowPlex analiza la topología, los sistemas operativos y los servicios reales de cada subred y genera automáticamente los señuelos y las migas de pan coherentes con lo que hay alrededor, ajustándolos según cambia la red.

Su especialización más útil es la identidad: además de sistemas falsos, siembra credenciales, tíquets y objetos de Active Directory que solo un atacante enumerando el directorio encontraría, lo que detecta las técnicas de robo de credenciales y escalada de privilegios en la fase en que todavía se pueden detener.

La arquitectura proyecta muchos señuelos desde pocos recursos reales, de modo que cubrir cientos de subredes no implica desplegar cientos de máquinas virtuales.
