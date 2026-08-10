"""
Población inicial de herramientas conocidas por categoría.
Garantiza un conjunto base de datos de calidad.

Ejecutar: python scripts/seed_tools.py
"""

from datetime import date
from yaml_io import read_tool, write_tool, merge_frontmatter, slugify_name

SEED_TOOLS = [
    # === Antivirus ===
    {
        "name": "Microsoft Defender for Endpoint",
        "categories": ["antivirus"], "type": "comercial", "cost_model": "suscripción",
        "cost_details": "Incluido en Microsoft 365 E5. Plan autónomo desde ~$5/usuario/mes.",
        "website": "https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint",
        "description": "Plataforma de protección de endpoints empresarial integrada en el ecosistema Microsoft 365. Combina antivirus NG, EDR, y gestión de vulnerabilidades.",
        "why_reference": "Líder en Gartner MQ para Endpoint Protection. Integración nativa con el ecosistema Microsoft lo convierte en la opción por defecto para entornos Windows empresariales.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "HIPAA", "FedRAMP", "ENS Alta"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["endpoint", "cloud", "ai", "xdr", "microsoft", "vulnerability-management"],
    },
    {
        "name": "Bitdefender GravityZone",
        "categories": ["antivirus"], "type": "comercial", "cost_model": "suscripción",
        "cost_details": "Desde ~$30/endpoint/año. Ediciones: Business, Enterprise, Elite.",
        "website": "https://www.bitdefender.com/business/",
        "description": "Plataforma de seguridad de endpoints con prevención de amenazas multicapa, EDR, y análisis de riesgo. Motor antimalware de alta eficacia en tests independientes.",
        "why_reference": "Consistentemente en el cuadrante de Líderes de Gartner. Motor antimalware con una de las tasas de detección más altas en AV-Comparatives y AV-Test.",
        "certifications": ["ISO 27001", "SOC 2", "HIPAA", "PCI DSS"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["endpoint", "ai", "compliance", "vulnerability-management"],
    },
    # === EDR ===
    {
        "name": "SentinelOne Singularity",
        "categories": ["edr"], "type": "comercial", "cost_model": "suscripción",
        "cost_details": "Desde ~$45/endpoint/año. Ediciones: Core, Control, Complete.",
        "website": "https://www.sentinelone.com",
        "description": "Plataforma de seguridad autónoma con IA para prevenir, detectar y responder a amenazas en endpoints, containers, cloud workloads y dispositivos IoT.",
        "why_reference": "Líder en Gartner MQ. Primer EDR con motor de IA que opera de forma autónoma sin necesidad de conexión cloud permanente. Rollback automatizado como diferenciador clave.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "HIPAA", "PCI DSS", "FedRAMP", "ENS Alta"],
        "company_size": ["mediana", "grande"],
        "tags": ["endpoint", "ai", "cloud", "xdr", "iot", "container", "incident-response"],
    },
    # === Firewall ===
    {
        "name": "Fortinet FortiGate",
        "categories": ["firewall"], "type": "comercial", "cost_model": "suscripción",
        "cost_details": "Modelos FortiGate 40F a 4400F. Licencia FortiGuard desde ~$1,000/año.",
        "website": "https://www.fortinet.com/products/next-generation-firewall",
        "description": "Firewall de nueva generación con procesador de seguridad propietario (SPU) que ofrece inspección SSL/TLS completa y prevención de amenazas a alto rendimiento.",
        "why_reference": "Líder en Gartner MQ para Network Firewalls. Su enfoque de ASIC propietario (FortiASIC) ofrece mejor relación precio/rendimiento que la competencia en gamas medias y altas.",
        "certifications": ["ISO 27001", "SOC 2", "PCI DSS", "ENS Alta", "CCN-STIC"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["red", "ips", "ids", "ai", "cloud", "on-premise", "zero-trust"],
    },
    # === SIEM ===
    {
        "name": "Microsoft Sentinel",
        "categories": ["siem"], "type": "comercial", "cost_model": "pago-por-uso",
        "cost_details": "Basado en volumen de datos analizados. Sin costes de infraestructura. Desde ~$2/GB ingerido.",
        "website": "https://azure.microsoft.com/en-us/products/microsoft-sentinel/",
        "description": "SIEM cloud-native en Azure que combina SIEM y SOAR con inteligencia artificial a escala cloud. Analiza datos de toda la empresa sin infraestructura propia.",
        "why_reference": "Líder en Gartner MQ para SIEM. Arquitectura serverless sin gestión de infraestructura. Integración nativa con ecosistema Microsoft 365 y Azure.",
        "certifications": ["ISO 27001", "ISO 27018", "SOC 2 Tipo II", "HIPAA", "FedRAMP", "PCI DSS"],
        "company_size": ["mediana", "grande"],
        "tags": ["cloud", "ai", "microsoft", "saas", "soar", "compliance", "monitorizacion"],
    },
    # === SOAR ===
    {
        "name": "Palo Alto Cortex XSOAR",
        "categories": ["soar"], "type": "comercial", "cost_model": "presupuesto-personalizado",
        "cost_details": "Licencia anual según número de playbooks y usuarios.",
        "website": "https://www.paloaltonetworks.com/cortex/xsoar",
        "description": "Plataforma SOAR líder que automatiza y orquesta la respuesta a incidentes de seguridad. Incluye un marketplace con más de 900 playbooks predefinidos.",
        "why_reference": "Líder en Gartner MQ para SOAR. Marketplace de playbooks más extenso del mercado. Threat intelligence integrada y gestión de casos completa.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "FedRAMP"],
        "company_size": ["grande"],
        "tags": ["automatizacion", "incident-response", "threat-hunting", "ai", "compliance"],
    },
    # === IAM ===
    {
        "name": "Microsoft Entra ID (Azure AD)",
        "categories": ["identity-managers"], "type": "comercial", "cost_model": "freemium",
        "cost_details": "Free para funciones básicas. Premium P1 (~$6/usuario/mes), P2 (~$9/usuario/mes).",
        "website": "https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id",
        "description": "Plataforma de identidad y acceso cloud-native. SSO, MFA, acceso condicional, identity governance, y privileged identity management para el ecosistema Microsoft y más de 3,000 apps.",
        "why_reference": "Líder en Gartner MQ para Access Management. Directorio de identidad más usado del mundo con más de 400M de usuarios. Ubicuo en entorno empresarial Microsoft.",
        "certifications": ["ISO 27001", "ISO 27018", "SOC 2 Tipo II", "HIPAA", "FedRAMP", "ENS Alta", "RGPD / GDPR"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["sso", "mfa", "cloud", "zero-trust", "microsoft", "compliance", "saas"],
    },
    # === DLP ===
    {
        "name": "Microsoft Purview DLP",
        "categories": ["dlp"], "type": "comercial", "cost_model": "suscripción",
        "cost_details": "Incluido en Microsoft 365 E5. Planes independientes desde ~$10/usuario/mes.",
        "website": "https://www.microsoft.com/en-us/security/business/information-protection/microsoft-purview-data-loss-prevention",
        "description": "Solución DLP integrada en el ecosistema Microsoft 365 que protege datos sensibles en endpoints, aplicaciones cloud, y servicios on-premise.",
        "why_reference": "Líder en Gartner MQ para DLP. Su capacidad de clasificación automática con ML y su integración nativa con Office 365, Teams y SharePoint lo hacen el DLP más desplegado.",
        "certifications": ["ISO 27001", "ISO 27701", "SOC 2", "HIPAA", "RGPD / GDPR"],
        "company_size": ["mediana", "grande"],
        "tags": ["compliance", "cloud", "ai", "microsoft", "monitorizacion"],
    },
    # === MDM ===
    {
        "name": "Microsoft Intune",
        "categories": ["mdm"], "type": "comercial", "cost_model": "suscripción",
        "cost_details": "Incluido en Microsoft 365 E3/E5. Plan autónomo desde ~$6/usuario/mes.",
        "website": "https://www.microsoft.com/en-us/security/business/endpoint-management/microsoft-intune",
        "description": "Plataforma unificada de gestión de endpoints (UEM) que combina MDM y MAM para Windows, macOS, iOS, Android y Linux.",
        "why_reference": "Líder en Gartner MQ para UEM. Con más de 200M de dispositivos gestionados, Intune es la plataforma de gestión de endpoints de más rápido crecimiento.",
        "certifications": ["ISO 27001", "ISO 27018", "SOC 2 Tipo II", "HIPAA", "FedRAMP"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["cloud", "microsoft", "compliance", "saas", "zero-trust"],
    },
    # === IDS ===
    {
        "name": "Snort",
        "categories": ["ids"], "type": "opensource", "cost_model": "gratis",
        "cost_details": "Gratuito (GPLv2). Reglas de Cisco Talos por suscripción (~$30/año uso personal, ~$400/año empresa).",
        "website": "https://www.snort.org",
        "description": "Sistema de detección y prevención de intrusiones de red open source mantenido por Cisco Talos, el equipo de inteligencia de amenazas más grande del mundo.",
        "why_reference": "IDS/IPS más longevo y ampliamente desplegado. Su motor de reglas es el estándar de facto en detección de intrusiones de red. Cisco Talos publica actualizaciones diarias de firmas.",
        "certifications": ["PCI DSS"],
        "company_size": ["pequeña", "mediana", "grande"],
        "repo": "https://github.com/snort3/snort3", "license": "GPL-2.0",
        "tags": ["red", "open-source", "incident-response", "on-premise", "linux"],
    },
    # === IPS ===
    {
        "name": "Suricata",
        "categories": ["ips"], "type": "opensource", "cost_model": "gratis",
        "cost_details": "Gratuito (GPLv2). Suricata Enterprise con soporte comercial disponible.",
        "website": "https://suricata.io",
        "description": "Motor IDS/IPS de red de alto rendimiento con inspección profunda de paquetes y análisis de protocolos. Soporta multi-threading nativo para redes de alta velocidad.",
        "why_reference": "Motor IDS/IPS open source más rápido gracias a su arquitectura multi-hilo. Adoptado por gobiernos y grandes empresas. Su motor de detección alimenta Elastic Security.",
        "certifications": ["PCI DSS"],
        "company_size": ["pequeña", "mediana", "grande"],
        "repo": "https://github.com/OISF/suricata", "license": "GPL-2.0",
        "tags": ["red", "open-source", "linux", "incident-response", "threat-hunting"],
    },
    {
        "name": "Trend Micro TippingPoint",
        "categories": ["ips"], "type": "comercial", "cost_model": "suscripción",
        "cost_details": "Modelos hardware TPS 5000-9000. Licencia Digital Vaccine (firmas de vulnerabilidad) incluida.",
        "website": "https://www.trendmicro.com/en_us/business/products/network/ips/tippingpoint.html",
        "description": "NGIPS con inspección profunda de paquetes y filtros de vulnerabilidad Digital Vaccine actualizados continuamente. Enfoque en vulnerabilidades, no solo exploits.",
        "why_reference": "Líder en Gartner MQ para IPS. Enfoque de filtros de vulnerabilidad reduce falsos positivos drásticamente. Digital Vaccine es el feed de inteligencia de amenazas más completo para IPS.",
        "certifications": ["ISO 27001", "SOC 2", "PCI DSS", "ENS Alta", "CCN-STIC"],
        "company_size": ["mediana", "grande"],
        "tags": ["red", "ai", "threat-hunting", "on-premise"],
    },
    # === Config Managers ===
    {
        "name": "Ansible",
        "categories": ["config-managers"], "type": "opensource", "cost_model": "freemium",
        "cost_details": "Gratuito (GPL). Ansible Automation Platform desde ~$13,000/año por 100 nodos.",
        "website": "https://www.ansible.com",
        "description": "Herramienta de automatización open source para gestión de configuraciones, despliegues y orquestación. Define el estado deseado de la infraestructura como código (YAML).",
        "why_reference": "Estándar de facto en automatización IT. Arquitectura agentless (solo SSH) simplifica la adopción. Adquirido por Red Hat/IBM en 2015.",
        "certifications": ["ISO 27001"],
        "company_size": ["pequeña", "mediana", "grande"],
        "repo": "https://github.com/ansible/ansible", "license": "GPL-3.0",
        "tags": ["automatizacion", "open-source", "linux", "cloud", "on-premise", "compliance"],
    },
    # === IT Asset Managers ===
    {
        "name": "ServiceNow ITAM",
        "categories": ["it-asset-managers"], "type": "comercial", "cost_model": "presupuesto-personalizado",
        "cost_details": "Licencia anual según número de activos gestionados.",
        "website": "https://www.servicenow.com/products/it-asset-management.html",
        "description": "Gestión integral de activos IT en la plataforma ServiceNow. Cubre todo el ciclo de vida: adquisición, inventario, cumplimiento de licencias, y disposición.",
        "why_reference": "Líder en Gartner MQ para ITAM. Integración con ITSM en una única plataforma elimina silos entre gestión de activos y procesos de soporte IT.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "FedRAMP"],
        "company_size": ["mediana", "grande"],
        "tags": ["compliance", "saas", "cloud", "automatizacion", "monitorizacion"],
    },
    # === Cert Managers ===
    {
        "name": "Venafi Control Plane",
        "categories": ["cert-managers"], "type": "comercial", "cost_model": "presupuesto-personalizado",
        "cost_details": "Licencia anual según número de certificados gestionados.",
        "website": "https://www.venafi.com",
        "description": "Plataforma de gestión del ciclo de vida de certificados digitales y claves criptográficas. Automatiza emisión, renovación y revocación de certificados a escala empresarial.",
        "why_reference": "Líder en gestión de identidades de máquinas. Referente en PKI empresarial y machine identity management, protegiendo las identidades de máquinas que superan en número a las humanas.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II"],
        "company_size": ["grande"],
        "tags": ["pki", "encryption", "automatizacion", "compliance", "zero-trust"],
    },
    # === KPI / CA Managers ===
    {
        "name": "ServiceNow GRC",
        "categories": ["kpi-ca-managers"], "type": "comercial", "cost_model": "presupuesto-personalizado",
        "cost_details": "Licencia anual. Precio según módulos: Policy, Risk, Audit, Vendor Risk.",
        "website": "https://www.servicenow.com/products/governance-risk-and-compliance.html",
        "description": "Plataforma GRC integrada para gestión de riesgos, cumplimiento, auditoría y políticas. Automatiza la monitorización de controles y KPI de cumplimiento continuo.",
        "why_reference": "Líder en Gartner MQ para IT Risk Management. Conecta GRC con ITSM, ITAM y SecOps proporcionando una visión holística del riesgo y cumplimiento IT.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "FedRAMP"],
        "company_size": ["mediana", "grande"],
        "tags": ["compliance", "auditoria", "automatizacion", "monitorizacion", "saas"],
    },
    # === DLP adicional ===
    {
        "name": "Forcepoint DLP",
        "categories": ["dlp"], "type": "comercial", "cost_model": "presupuesto-personalizado",
        "cost_details": "Licencia anual por usuario. Precio según módulos y número de endpoints.",
        "website": "https://www.forcepoint.com/product/dlp-data-loss-prevention",
        "description": "Solución DLP empresarial con análisis de comportamiento para prevenir fugas de datos en endpoints, red, email y aplicaciones cloud.",
        "why_reference": "Líder en Gartner MQ para DLP. Su enfoque en análisis de comportamiento de usuarios (UEBA) integrado diferencia el uso legítimo del riesgo real de fuga de datos.",
        "certifications": ["ISO 27001", "SOC 2", "HIPAA", "PCI DSS"],
        "company_size": ["mediana", "grande"],
        "tags": ["compliance", "ai", "monitorizacion", "cloud", "endpoint"],
    },
    # === Gestores de claves adicional ===
    {
        "name": "AWS Key Management Service (KMS)",
        "categories": ["key-managers"], "type": "comercial", "cost_model": "pago-por-uso",
        "cost_details": "$1/clave/mes + $0.03/10,000 operaciones. HSM desde $1.45/hora.",
        "website": "https://aws.amazon.com/kms/",
        "description": "Servicio gestionado de claves criptográficas integrado con el ecosistema AWS. Permite crear, rotar y auditar claves con integración nativa en S3, RDS, Lambda y más de 100 servicios AWS.",
        "why_reference": "KMS más usado en entornos cloud. Su integración nativa con el ecosistema AWS y su soporte para claves gestionadas por el cliente (CMK) lo hacen la opción por defecto en AWS.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "HIPAA", "PCI DSS", "FedRAMP", "ENS Alta", "C5"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["cloud", "encryption", "pki", "compliance", "automatizacion"],
    },
]


def seed() -> int:
    """Puebla el directorio con herramientas conocidas."""
    created = 0
    updated = 0

    for tool_data in SEED_TOOLS:
        name = tool_data["name"]
        slug = slugify_name(name)
        existing = read_tool(slug)

        new_data = {
            **tool_data,
            "slug": slug,
            "last_verified": date.today().isoformat(),
            "needs_review": False,
            "sources": [],
        }

        merged = merge_frontmatter(existing, new_data)

        body = existing.get("_body", "") if existing else ""
        if not body:
            body = f"## {name}\n\n{new_data['description']}\n\n### Por qué es referente\n\n{new_data['why_reference']}\n\n### Información de coste\n\n{new_data.get('cost_details', 'Consultar con el proveedor.')}\n"

        write_tool(slug, merged, body)

        if existing:
            updated += 1
            print(f"  🔄 Actualizada: {name}")
        else:
            created += 1
            print(f"  ✅ Creada: {name}")

    print(f"\n📊 {created} herramientas nuevas, {updated} actualizadas")
    return created + updated


if __name__ == "__main__":
    seed()
