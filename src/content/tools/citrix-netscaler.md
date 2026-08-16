---
name: NetScaler ADC
slug: citrix-netscaler
categories:
- load-balancers
tags:
- load-balancing
- adc
- ssl-offload
- waf
- citrix
type: comercial
cost_model: licencia-perpetua
cost_details: Licencia por appliance físico, virtual (VPX) o suscripción cloud. Ediciones Standard, Advanced y Premium.
website: https://www.netscaler.com
description: Controlador de entrega de aplicaciones (ADC) con balanceo de carga global y local, descarga SSL, conmutación
  por contenido, WAF integrado y analítica de experiencia de usuario.
why_reference: NetScaler es uno de los tres ADC de referencia del mercado empresarial junto a F5 y A10, y el estándar de facto
  delante de las plataformas de escritorio virtual y las aplicaciones críticas de banca y administración pública. Gartner
  lo sigue en el mercado de application delivery controllers.
certifications:
- ISO 27001
- SOC 2 Tipo II
- Common Criteria
- FIPS 140-2
company_size:
- mediana
- grande
market_rank:
  load-balancers: 4
sources:
- https://www.gartner.com/reviews/market/application-delivery-controllers
- https://en.wikipedia.org/wiki/NetScaler
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/citrix-netscaler.png
needs_review: false
---

NetScaler ADC —antes Citrix ADC y, antes aún, NetScaler— es un controlador de entrega de aplicaciones completo: balanceo local (LB) y global (GSLB), descarga y aceleración TLS por hardware, conmutación por contenido, compresión, caché e inspección de capa 7.

Su papel más reconocible es el de puerta de entrada de las plataformas de escritorio y aplicaciones virtuales, donde termina el tráfico de usuarios remotos, aplica autenticación previa y publica los servicios internos sin exponerlos. También incorpora un WAF con perfiles de aprendizaje, protección de APIs y mitigación de denegación de servicio en capa 7.

Se despliega como appliance físico (MPX/SDX), virtual (VPX) o contenedor (CPX), lo que permite mantener la misma política de entrega en centro de datos y en nube pública.
