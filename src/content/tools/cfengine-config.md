---
name: CFEngine
slug: cfengine-config
categories:
- config-managers
tags:
- iac
- declarative
- autonomous
- low-footprint
type: opensource
cost_model: suscripción
cost_details: Gratuito (GPL). CFEngine Enterprise desde ~$100/nodo/año.
website: https://cfengine.com
description: Herramienta de gestión de configuración pionera (creada en 1993) con un modelo declarativo ligero y autónomo.
  Cada nodo converge hacia el estado deseado sin depender de un servidor central.
why_reference: CFEngine es la herramienta de gestión de configuración más veterana del mercado y sigue siendo utilizada en
  entornos de misión crítica por su fiabilidad y bajo consumo de recursos. Su arquitectura descentralizada la hace ideal para
  entornos con conectividad limitada.
certifications: []
company_size:
- mediana
- grande
market_rank:
  config-managers: 9
repo: https://github.com/cfengine/core
license: GPL-3.0
sources:
- https://docs.cfengine.com/docs/master/
- https://github.com/cfengine/core
first_added: 2026-08-10
last_verified: '2026-08-12'
needs_review: false
logo: /logos/cfengine-config.png
---

CFEngine es la herramienta que inauguró la gestión de configuración moderna, en 1993, y sigue defendiendo un enfoque
propio: cada nodo ejecuta un agente autónomo que converge periódicamente hacia el estado declarado, sin depender de
que un servidor central le empuje los cambios.

## Dónde encaja

Sobre servidores ya desplegados, en la capa de cargas de trabajo. Su modelo de convergencia continua significa que
una desviación introducida a mano se corrige sola en la siguiente pasada, en lugar de persistir hasta el próximo
despliegue.

## A tener en cuenta

Es extremadamente ligero —escrito en C, con una huella mínima— y por eso encaja en parques muy grandes o en equipos
con recursos limitados, pero su lenguaje de políticas tiene una curva de aprendizaje más pronunciada que la de
alternativas basadas en YAML. La comunidad es menor que la de Ansible o Puppet, algo a valorar al calcular el coste
de mantenimiento a largo plazo.
