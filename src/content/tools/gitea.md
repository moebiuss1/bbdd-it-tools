---
name: Gitea
slug: gitea
categories:
- scm
tags:
- git
- scm
- opensource
- self-hosted
- code-review
- lightweight
type: opensource
cost_model: freemium
cost_details: Software libre bajo licencia MIT. Gitea Cloud y el soporte empresarial se contratan aparte.
website: https://about.gitea.com
description: Servicio Git autoalojado, ligero y escrito en Go, con incidencias, revisión de código, registro de
  paquetes y acciones de integración continua compatibles con GitHub.
why_reference: 'Gitea es la alternativa autoalojada de referencia cuando el código no puede salir de la organización
  y GitLab resulta demasiado pesado: arranca en un binario, consume unos pocos cientos de megabytes y cubre repositorios,
  revisión e integración continua. Es la opción habitual en administraciones y laboratorios con infraestructura
  propia.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/go-gitea/gitea
license: MIT
market_rank:
  scm: 6
sources:
- https://en.wikipedia.org/wiki/Gitea
certifications: []
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/gitea.png
needs_review: false
---

Gitea nació como bifurcación de Gogs con el objetivo de ofrecer una plataforma Git completa que quepa en una máquina modesta. Se distribuye como un único binario, admite SQLite, PostgreSQL o MySQL y se puede tener funcionando en minutos, incluso en un equipo de laboratorio o en un dispositivo de bajo consumo.

Pese a su tamaño cubre lo esperable: organizaciones y equipos con permisos, solicitudes de incorporación con revisión, incidencias y hitos, wiki, releases, registro de paquetes para los formatos más habituales y Gitea Actions, un motor de integración continua compatible con la sintaxis de los flujos de trabajo de GitHub, lo que facilita migrar tuberías existentes.

Su licencia MIT y la ausencia de funciones reservadas a una edición de pago lo hacen predecible a largo plazo, que es justo lo que se busca cuando la plataforma de código es infraestructura interna.
