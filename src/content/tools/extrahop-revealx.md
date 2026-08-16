---
name: ExtraHop RevealX
slug: extrahop-revealx
categories:
- ndr
tags:
- ndr
- network-security
- traffic-analysis
- decryption
- threat-detection
- forensics
type: comercial
cost_model: suscripción
cost_details: Suscripción por capacidad de análisis de tráfico (Gbps) y sensores desplegados.
website: https://www.extrahop.com
description: Plataforma de detección y respuesta de red que reconstruye el tráfico en capa 7, descifra selectivamente y correlaciona
  el comportamiento de cada dispositivo.
why_reference: 'ExtraHop es uno de los líderes del mercado de detección y respuesta de red de Gartner y el referente en análisis
  de protocolos de aplicación a gran escala: reconstruye transacciones completas de decenas de protocolos, lo que le permite
  detectar abusos que un análisis basado solo en flujos no ve.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- FedRAMP
- Common Criteria
company_size:
- mediana
- grande
market_rank:
  ndr: 2
sources:
- https://www.gartner.com/reviews/market/network-detection-and-response
- https://en.wikipedia.org/wiki/ExtraHop
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/extrahop-revealx.png
needs_review: false
---

RevealX analiza una copia del tráfico y reconstruye lo que ocurre en la capa de aplicación: consultas a bases de datos, llamadas de autenticación, transferencias de ficheros, peticiones DNS y HTTP, protocolos de directorio y de almacenamiento. Esa reconstrucción, y no la simple metadata de flujo, es lo que permite distinguir un uso normal de una extracción de datos o un abuso de credenciales.

El descifrado selectivo de TLS —con las claves de sesión proporcionadas por la organización— extiende esa visibilidad al tráfico cifrado interno, donde hoy ocurre la mayor parte del movimiento lateral. La plataforma mantiene además un inventario vivo de todos los dispositivos que hablan en la red, incluidos los no gestionados.

Como el sensor es pasivo, no hay agente que desplegar ni riesgo de interferir con el tráfico, lo que lo hace viable en entornos donde no se puede instalar software: sistemas industriales, dispositivos médicos y equipamiento de terceros.
