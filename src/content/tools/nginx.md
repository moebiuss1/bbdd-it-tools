---
name: NGINX
slug: nginx
categories:
- load-balancers
tags:
- load-balancing
- proxy
- web-server
- opensource
- http
- kubernetes
type: opensource
cost_model: freemium
cost_details: NGINX Open Source gratuito. F5 NGINX One (soporte, WAF y gestión centralizada) por suscripción.
website: https://nginx.org
description: Servidor web y proxy inverso que actúa como balanceador de carga HTTP, TCP y UDP. Sirve o intermedia
  una parte enorme de los sitios más visitados del mundo.
why_reference: 'NGINX es el proxy inverso más desplegado de internet y la puerta de entrada por defecto de la mayoría
  de arquitecturas web y de contenedores: el Ingress Controller de Kubernetes más usado se apoya en él. Gartner
  lo sigue en el mercado de application delivery controllers junto a F5 y NetScaler.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/nginx/nginx
license: BSD-2-Clause
market_rank:
  load-balancers: 2
sources:
- https://www.gartner.com/reviews/market/application-delivery-controllers
- https://en.wikipedia.org/wiki/Nginx
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/nginx.png
needs_review: false
---

NGINX nació como respuesta al problema de las diez mil conexiones simultáneas: una arquitectura orientada a eventos, con un consumo de memoria muy inferior al de los servidores basados en procesos o hilos. Ese diseño explica por qué acabó delante de tantas aplicaciones como proxy inverso, terminador TLS y balanceador de carga.

Como balanceador reparte tráfico HTTP, TCP y UDP con varios algoritmos (round-robin, menos conexiones, hash de IP), comprueba la salud de los destinos, mantiene sesiones persistentes y descarga el cifrado TLS de los servidores de aplicación. La versión comercial de F5 añade balanceo activo, API de configuración dinámica, telemetría detallada y el módulo NGINX App Protect para filtrado de aplicaciones web.

En infraestructuras de contenedores es la base del Ingress Controller más extendido de Kubernetes, lo que lo convierte en pieza de facto del plano de entrada de un clúster.
