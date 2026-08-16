---
name: AWS Application Migration Service
slug: aws-application-migration-service
categories:
- cloud-migration
tags:
- cloud-migration
- aws
- lift-and-shift
- replication
- disaster-recovery
type: comercial
cost_model: pago-por-uso
cost_details: Sin coste por servidor migrado durante noventa días; se pagan solo los recursos de replicación y destino.
website: https://aws.amazon.com/application-migration-service/
cert_url: https://aws.amazon.com/compliance/programs/
description: Servicio de migración de servidores a AWS por replicación continua en bloque, con pruebas sin interrupción y
  conmutación final de minutos.
why_reference: 'Heredero de CloudEndure, es el mecanismo estándar de migración masiva a AWS y el que usan la mayoría de proyectos
  de salida de centro de datos: replica el servidor completo sin reinstalar nada, permite ensayar la conmutación las veces
  que haga falta y reduce la ventana de parada real a minutos.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- PCI DSS
- FedRAMP
- ENS Alta
- HIPAA
company_size:
- mediana
- grande
market_rank:
  cloud-migration: 2
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/aws-application-migration-service.png
needs_review: false
---

El servicio instala un agente en el servidor de origen —físico, virtual o en otra nube— y replica sus discos de forma continua a un área de espera en AWS, sin detener la carga de trabajo. Cuando la réplica está al día, se puede lanzar una instancia de prueba aislada para validar que la aplicación arranca y funciona, tantas veces como haga falta.

La conmutación final consiste en detener el origen y arrancar la instancia definitiva a partir del último punto replicado, con lo que la ventana de indisponibilidad se mide en minutos y no en el fin de semana completo que exigía una migración por reinstalación.

El mismo mecanismo sirve para recuperación ante desastres entre regiones, y las acciones posteriores a la migración permiten automatizar la instalación de agentes de monitorización, seguridad o gestión de configuración en el servidor ya migrado.
