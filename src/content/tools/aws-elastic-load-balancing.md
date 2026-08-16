---
name: AWS Elastic Load Balancing
slug: aws-elastic-load-balancing
categories:
- load-balancers
tags:
- load-balancing
- aws
- cloud
- high-availability
- tls
type: comercial
cost_model: pago-por-uso
cost_details: Pago por hora de balanceador y por unidad de capacidad consumida (LCU). Sin coste de licencia ni compromiso.
website: https://aws.amazon.com/elasticloadbalancing/
cert_url: https://aws.amazon.com/compliance/programs/
description: Servicio gestionado de balanceo de carga de AWS en sus variantes de aplicación (ALB), red (NLB), gateway (GWLB)
  y clásico, con escalado automático y alta disponibilidad entre zonas.
why_reference: 'Es el balanceador más desplegado en la nube pública y la pieza de entrada obligada de casi cualquier arquitectura
  en AWS: integra certificados gestionados, autenticación, WAF y registro de acceso sin administrar servidores. Gartner sigue
  a AWS en el mercado de application delivery controllers.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- PCI DSS
- FedRAMP
- ENS Alta
- HIPAA
company_size:
- pequeña
- mediana
- grande
market_rank:
  load-balancers: 3
sources:
- https://www.gartner.com/reviews/market/application-delivery-controllers
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/aws-elastic-load-balancing.png
needs_review: false
---

Elastic Load Balancing agrupa cuatro balanceadores con propósitos distintos. El Application Load Balancer trabaja en capa 7 con enrutado por ruta, cabecera o método, soporta HTTP/2 y gRPC y puede exigir autenticación OIDC o Cognito antes de dejar pasar una petición. El Network Load Balancer opera en capa 4 con latencias de microsegundos y direcciones IP estáticas. El Gateway Load Balancer inserta appliances de seguridad de terceros de forma transparente, y el clásico se mantiene por compatibilidad.

Todos escalan solos según la demanda, reparten entre zonas de disponibilidad, comprueban la salud de los destinos y se integran con AWS Certificate Manager para gestionar los certificados TLS sin intervención, con AWS WAF para filtrar tráfico y con CloudWatch para métricas y registros de acceso.

Al facturarse por uso, no hay capacidad ociosa que dimensionar, lo que lo convierte en la opción por defecto salvo que se necesite un ADC con funciones avanzadas de entrega.
