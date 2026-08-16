---
name: Dell PowerProtect Data Manager
slug: dell-powerprotect
categories:
- enterprise-backup
tags:
- backup
- kubernetes
- immutable
- vmware
- cyber-recovery
- dell
type: comercial
cost_model: suscripción
cost_details: Licencia por capacidad protegida; se integra con los sistemas de almacenamiento de copia PowerProtect DD (Data
  Domain).
website: https://www.dell.com/en-us/dt/data-protection/powerprotect-data-manager.htm
cert_url: https://www.dell.com/security
description: Software de protección de datos de Dell para máquinas virtuales, bases de datos, Kubernetes y cargas cloud, integrado
  con los sistemas de almacenamiento Data Domain.
why_reference: Dell es el mayor proveedor de infraestructura de protección de datos del mundo por cuota de mercado y figura
  entre los líderes de backup y recuperación empresarial de Gartner. Sus sistemas Data Domain son el destino de copia deduplicado
  más extendido del centro de datos, y PowerProtect es la capa de software que los orquesta.
certifications:
- ISO 27001
- SOC 2 Tipo II
- FIPS 140-2
- Common Criteria
company_size:
- mediana
- grande
market_rank:
  enterprise-backup: 6
sources:
- https://www.gartner.com/reviews/market/enterprise-backup-and-recovery
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/dell-powerprotect.png
needs_review: false
---

PowerProtect Data Manager protege máquinas virtuales, bases de datos Oracle, SQL Server y SAP HANA, sistemas de ficheros, contenedores de Kubernetes y cargas en nube pública, con descubrimiento automático de los activos nuevos y protección por política en lugar de por trabajo.

Su encaje natural es con los sistemas PowerProtect DD, herederos de Data Domain, donde la deduplicación en origen reduce drásticamente el dato que viaja por la red y el que se almacena, y donde el modo de retención de cumplimiento impide borrar una copia antes de tiempo ni siquiera con credenciales de administrador.

Para el peor escenario, la familia incorpora una bóveda cibernética aislada: una copia en una red desconectada, con análisis de integridad de los datos allí depositados, pensada para sobrevivir a un compromiso completo del entorno de producción, incluida la consola de copia.
