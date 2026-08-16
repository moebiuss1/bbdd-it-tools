---
name: Microsoft Defender for Office 365
slug: microsoft-defender-office-365
categories:
- email-security
tags:
- email-security
- phishing
- microsoft-365
- sandbox
- xdr
- collaboration
type: comercial
cost_model: suscripción
cost_details: Planes 1 y 2 por usuario y mes; el Plan 2 está incluido en Microsoft 365 E5.
website: https://www.microsoft.com/en-us/security/business/siem-and-xdr/microsoft-defender-office-365
cert_url: https://learn.microsoft.com/compliance/regulatory/offering-home
description: Protección del correo y las herramientas de colaboración de Microsoft 365 frente a phishing, suplantación
  y malware, con detonación de adjuntos y enlaces.
why_reference: Es la protección de correo con mayor base instalada del mundo, sencillamente porque protege la plataforma
  de correo corporativo más usada y sin desviar el flujo de mensajes. Gartner lo sigue en el mercado de seguridad
  del correo electrónico, donde su ventaja es la telemetría de señales de todo el ecosistema Microsoft.
certifications:
- ISO 27001
- SOC 2 Tipo II
- ISO 27018
- FedRAMP
- ENS Alta
- HIPAA
company_size:
- pequeña
- mediana
- grande
market_rank:
  email-security: 3
sources:
- https://www.gartner.com/reviews/market/email-security
first_added: &id001 2026-08-14
last_verified: *id001
logo: /logos/microsoft-defender-office-365.png
needs_review: false
---

Defender for Office 365 actúa dentro del propio servicio de correo, sin registros MX intermedios: analiza el mensaje antes de la entrega y también después, retirando de los buzones un correo que resultó malicioso horas más tarde, algo que una pasarela externa no puede hacer.

Sus controles centrales son la detonación de adjuntos y enlaces en entorno aislado, la protección contra suplantación de identidad —que aprende los patrones de comunicación habituales de cada usuario para detectar el fraude del directivo—, la reescritura de enlaces con comprobación en el momento del clic y la aplicación de las mismas comprobaciones a los ficheros compartidos en SharePoint, OneDrive y Teams.

Al integrarse con el resto de la plataforma XDR del fabricante, un correo malicioso entregado se correlaciona con lo que después ocurrió en el endpoint y en la identidad, lo que acorta mucho la investigación de un incidente que empezó por correo.
