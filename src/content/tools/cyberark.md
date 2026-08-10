---
name: CyberArk
slug: cyberark
category: key-managers
tags:
- pam
- privileged-access
- vault
- session-management
- machine-identity
- compliance
type: comercial
cost_model: suscripción
cost_details: Licencia anual basada en número de cuentas privilegiadas gestionadas. Desde ~$50,000/año para despliegues básicos.
website: https://www.cyberark.com
description: 'Plataforma líder de gestión de accesos privilegiados (PAM) que protege cuentas administrativas,
  credenciales y secretos en entornos híbridos. Incluye vaulting de contraseñas, rotación automática,
  grabación de sesiones y gestión de identidades de máquina con CyberArk Conjur.'
why_reference: 'CyberArk es el líder indiscutido en el Magic Quadrant de Gartner para PAM, posición que mantiene
  desde hace más de una década. Es el estándar de referencia en sectores regulados (banca, seguros, energía)
  para el control de accesos privilegiados. Su adquisición de Venafi en 2025 refuerza su posición como plataforma
  integral de seguridad de identidad que cubre tanto identidades humanas como de máquina.'
certifications:
- ISO 27001
- SOC 2 Tipo II
- FedRAMP
- PCI DSS
- HIPAA
company_size:
- grande
market_rank: 1
sources:
- https://www.gartner.com/en/documents/privileged-access-management
- https://www.decryptiondigest.com/blog/gartner-magic-quadrant-pam-2026-vendor-evaluation-guide
last_verified: '2026-08-10'
needs_review: false
logo: null
---

CyberArk es la plataforma de seguridad de identidad más completa del mercado para
la gestión de accesos privilegiados. Su enfoque de "privilegio cero" (Zero Standing
Privileges) elimina las credenciales permanentes, sustituyéndolas por acceso
just-in-time con elevación temporal de privilegios.

### Componentes principales

- **CyberArk Privileged Access Manager**: Vaulting, rotación y sesiones de cuentas privilegiadas
- **CyberArk Endpoint Privilege Manager (EPM)**: Principio de mínimo privilegio en endpoints
- **CyberArk Conjur**: Gestión de secretos para pipelines CI/CD y entornos cloud-native
- **CyberArk Secrets Hub**: Sincronización bidireccional con AWS/Azure/GCP secret managers
- **CyberArk Secure Cloud Access**: Acceso just-in-time a consolas cloud sin credenciales permanentes

### Valor para cumplimiento

- Trazabilidad completa de quién accedió, a qué y qué hizo (grabación de sesiones)
- Rotación automática de credenciales con intervalo configurable
- Informes predefinidos para PCI DSS (Req. 7, 8), SOX, NIST 800-53, ISO 27001 (A.9)
