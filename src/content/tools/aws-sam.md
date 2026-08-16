---
name: AWS Serverless Application Model (SAM)
slug: aws-sam
categories:
- serverless-management
tags:
- serverless
- aws
- iac
- lambda
- opensource
- deployment
type: opensource
cost_model: gratis
cost_details: Marco de trabajo y CLI gratuitos bajo licencia Apache 2.0; se paga solo el consumo de los recursos desplegados.
website: https://aws.amazon.com/serverless/sam/
description: Marco de trabajo oficial de AWS para definir, probar y desplegar aplicaciones serverless con una sintaxis abreviada
  que se traduce a CloudFormation.
why_reference: 'SAM es la vía oficial y más directa para llevar una aplicación de funciones a producción en AWS: reduce a
  unas pocas líneas la plantilla que en CloudFormation ocuparía cientos, y su CLI permite ejecutar y depurar las funciones
  en local antes de desplegarlas.'
company_size:
- pequeña
- mediana
- grande
repo: https://github.com/aws/serverless-application-model
license: Apache-2.0
certifications: []
market_rank:
  serverless-management: 2
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/aws-sam.png
needs_review: false
---

SAM es una extensión de CloudFormation especializada en cargas serverless. Los tipos abreviados de función, API, tabla y máquina de estados se expanden en el conjunto completo de recursos, roles y permisos que harían falta escribir a mano, lo que reduce drásticamente el tamaño y los errores de la plantilla.

Su CLI cubre el ciclo completo de desarrollo: construye el paquete con las dependencias, invoca la función en local dentro de un contenedor que emula el entorno de ejecución, levanta una API local para probar la integración, y despliega con seguimiento de los eventos del cambio. También permite seguir los registros y las trazas de la función ya desplegada desde el terminal.

Para el despliegue progresivo se apoya en CodeDeploy, con desplazamiento gradual del tráfico entre versiones y vuelta atrás automática si una alarma se dispara, que es la forma sensata de publicar cambios en funciones que atienden tráfico real.
