"""
Población inicial de herramientas conocidas por categoría.
Garantiza un conjunto base de datos de calidad incluso si el
scraping web no funciona perfectamente desde GitHub Actions.

Ejecutar: python scripts/seed_tools.py
"""

from datetime import date

from yaml_io import read_tool, write_tool, merge_frontmatter, slugify_name

SEED_TOOLS = [
    # --- Antivirus ---
    {
        "name": "Microsoft Defender for Endpoint",
        "category": "antivirus",
        "type": "comercial",
        "cost_model": "suscripción",
        "cost_details": "Incluido en Microsoft 365 E5. Plan autónomo desde ~$5/usuario/mes.",
        "website": "https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint",
        "description": "Plataforma de protección de endpoints empresarial integrada en el ecosistema Microsoft 365. Combina antivirus de nueva generación, EDR, y gestión de vulnerabilidades.",
        "why_reference": "Líder en Gartner Magic Quadrant para Endpoint Protection. Su integración nativa con el ecosistema Microsoft lo convierte en la opción por defecto para entornos Windows empresariales.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "HIPAA", "FedRAMP", "ENS Alta"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["endpoint", "cloud", "ai", "xdr", "microsoft", "vulnerability-management"],
    },
    {
        "name": "Bitdefender GravityZone",
        "category": "antivirus",
        "type": "comercial",
        "cost_model": "suscripción",
        "cost_details": "Desde ~$30/endpoint/año. Ediciones: Business, Enterprise, Elite.",
        "website": "https://www.bitdefender.com/business/",
        "description": "Plataforma de seguridad de endpoints con prevención de amenazas multicapa, EDR, y análisis de riesgo. Reconocida por su motor antimalware de alta eficacia.",
        "why_reference": "Consistentemente en el cuadrante de Líderes de Gartner. Motor antimalware con una de las tasas de detección más altas en tests independientes (AV-Comparatives, AV-Test).",
        "certifications": ["ISO 27001", "SOC 2", "HIPAA", "PCI DSS"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["endpoint", "ai", "compliance", "vulnerability-management"],
    },
    # --- EDR ---
    {
        "name": "SentinelOne Singularity",
        "category": "edr",
        "type": "comercial",
        "cost_model": "suscripción",
        "cost_details": "Desde ~$45/endpoint/año. Ediciones: Core, Control, Complete.",
        "website": "https://www.sentinelone.com",
        "description": "Plataforma de seguridad autónoma que utiliza IA para prevenir, detectar y responder a amenazas en endpoints, containers, y dispositivos IoT.",
        "why_reference": "Líder en Gartner MQ. Primer EDR con motor de IA que opera de forma autónoma (sin necesidad de conexión cloud permanente). Su tecnología de rollback automatizado es un diferenciador clave.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "HIPAA", "PCI DSS", "FedRAMP", "ENS Alta"],
        "company_size": ["mediana", "grande"],
        "tags": ["endpoint", "ai", "cloud", "xdr", "iot", "container", "incident-response"],
    },
    # --- SIEM ---
    {
        "name": "Microsoft Sentinel",
        "category": "siem",
        "type": "comercial",
        "cost_model": "pago-por-uso",
        "cost_details": "Basado en volumen de datos analizados. Sin costes de infraestructura. Desde ~$2/GB ingerido.",
        "website": "https://azure.microsoft.com/en-us/products/microsoft-sentinel/",
        "description": "SIEM cloud-native en Azure que combina SIEM y SOAR con inteligencia artificial a escala cloud. Analiza datos de toda la empresa sin necesidad de infraestructura propia.",
        "why_reference": "Líder en Gartner MQ para SIEM. Su arquitectura serverless elimina la gestión de infraestructura. Integración nativa con el ecosistema Microsoft 365 y Azure.",
        "certifications": ["ISO 27001", "ISO 27018", "SOC 2 Tipo II", "HIPAA", "FedRAMP", "PCI DSS"],
        "company_size": ["mediana", "grande"],
        "tags": ["cloud", "ai", "microsoft", "saas", "soar", "compliance", "monitorizacion"],
    },
    # --- SOAR ---
    {
        "name": "Palo Alto Cortex XSOAR",
        "category": "soar",
        "type": "comercial",
        "cost_model": "presupuesto-personalizado",
        "cost_details": "Licencia anual. Precio según número de playbooks y usuarios.",
        "website": "https://www.paloaltonetworks.com/cortex/xsoar",
        "description": "Plataforma SOAR líder que automatiza y orquesta la respuesta a incidentes de seguridad. Incluye un marketplace con más de 900 playbooks predefinidos.",
        "why_reference": "Líder en Gartner MQ para SOAR. El marketplace de playbooks más extenso del mercado. Su capacidad de threat intelligence integrada y gestión de casos lo diferencian.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "FedRAMP"],
        "company_size": ["grande"],
        "tags": ["automatizacion", "incident-response", "threat-hunting", "ai", "compliance"],
    },
    # --- Firewall ---
    {
        "name": "Fortinet FortiGate",
        "category": "firewall",
        "type": "comercial",
        "cost_model": "suscripción",
        "cost_details": "Modelos FortiGate 40F a 4400F. Licencia FortiGuard desde ~$1,000/año.",
        "website": "https://www.fortinet.com/products/next-generation-firewall",
        "description": "Firewall de nueva generación con procesador de seguridad propietario (SPU) que ofrece inspección SSL/TLS completa y prevención de amenazas a alto rendimiento.",
        "why_reference": "Líder en Gartner MQ para Network Firewalls. Su enfoque de ASIC propietario (FortiASIC) ofrece mejor relación precio/rendimiento que la competencia en gamas medias.",
        "certifications": ["ISO 27001", "SOC 2", "PCI DSS", "ENS Alta", "CCN-STIC"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["red", "ips", "ids", "ai", "cloud", "on-premise", "zero-trust"],
    },
    # --- IAM ---
    {
        "name": "Microsoft Entra ID (Azure AD)",
        "category": "identity-managers",
        "type": "comercial",
        "cost_model": "freemium",
        "cost_details": "Free para funciones básicas. Premium P1 (~$6/user/mes), P2 (~$9/user/mes).",
        "website": "https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id",
        "description": "Plataforma de identidad y acceso cloud-native. Proporciona SSO, MFA, acceso condicional, identity governance, y privileged identity management.",
        "why_reference": "Líder en Gartner MQ para Access Management. Es el directorio de identidad más usado del mundo, con más de 400 millones de usuarios. Su integración con el ecosistema Microsoft 365 lo hace ubicuo en el entorno empresarial.",
        "certifications": ["ISO 27001", "ISO 27018", "SOC 2 Tipo II", "HIPAA", "FedRAMP", "ENS Alta", "RGPD / GDPR"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["sso", "mfa", "cloud", "zero-trust", "microsoft", "compliance", "saas"],
    },
    # --- DLP ---
    {
        "name": "Microsoft Purview DLP",
        "category": "dlp",
        "type": "comercial",
        "cost_model": "suscripción",
        "cost_details": "Incluido en Microsoft 365 E5. Planes independientes desde ~$10/usuario/mes.",
        "website": "https://www.microsoft.com/en-us/security/business/information-protection/microsoft-purview-data-loss-prevention",
        "description": "Solución DLP integrada en el ecosistema Microsoft 365 que protege datos sensibles en endpoints, aplicaciones cloud, y servicios on-premise.",
        "why_reference": "Líder en Gartner MQ para DLP. Su capacidad de clasificación automática con machine learning y su integración nativa con Office 365, Teams, y SharePoint lo hacen el DLP más desplegado.",
        "certifications": ["ISO 27001", "ISO 27701", "SOC 2", "HIPAA", "RGPD / GDPR"],
        "company_size": ["mediana", "grande"],
        "tags": ["compliance", "cloud", "ai", "microsoft", "monitorizacion"],
    },
    # --- MDM ---
    {
        "name": "Microsoft Intune",
        "category": "mdm",
        "type": "comercial",
        "cost_model": "suscripción",
        "cost_details": "Incluido en Microsoft 365 E3/E5. Plan autónomo desde ~$6/usuario/mes.",
        "website": "https://www.microsoft.com/en-us/security/business/endpoint-management/microsoft-intune",
        "description": "Plataforma unificada de gestión de endpoints que combina MDM y MAM para dispositivos Windows, macOS, iOS, Android y Linux.",
        "why_reference": "Líder en Gartner MQ para UEM. Con más de 200 millones de dispositivos gestionados, Intune es la plataforma de gestión de endpoints de más rápido crecimiento gracias a su integración con el ecosistema Microsoft.",
        "certifications": ["ISO 27001", "ISO 27018", "SOC 2 Tipo II", "HIPAA", "FedRAMP"],
        "company_size": ["pequeña", "mediana", "grande"],
        "tags": ["cloud", "microsoft", "compliance", "saas", "zero-trust"],
    },
    # --- IDS/IPS ---
    {
        "name": "Snort",
        "category": "ids",
        "type": "opensource",
        "cost_model": "gratis",
        "cost_details": "Gratuito (GPLv2). Reglas de Cisco Talos disponibles por suscripción (~$30/año uso personal).",
        "website": "https://www.snort.org",
        "description": "Sistema de detección y prevención de intrusiones de red (IDS/IPS) open source mantenido por Cisco Talos, el equipo de inteligencia de amenazas más grande del mundo.",
        "why_reference": "Snort es el IDS/IPS más longevo y ampliamente desplegado. Su motor de reglas es el estándar de facto en detección de intrusiones, y la comunidad de Cisco Talos publica actualizaciones diarias de firmas.",
        "certifications": ["PCI DSS"],
        "company_size": ["pequeña", "mediana", "grande"],
        "repo": "https://github.com/snort3/snort3",
        "license": "GPL-2.0",
        "tags": ["red", "open-source", "incident-response", "on-premise", "linux"],
    },
    # --- Gestores de configuraciones ---
    {
        "name": "Ansible",
        "category": "config-managers",
        "type": "opensource",
        "cost_model": "freemium",
        "cost_details": "Gratuito (GPL). Ansible Automation Platform desde ~$13,000/año por 100 nodos.",
        "website": "https://www.ansible.com",
        "description": "Herramienta de automatización de código abierto para gestión de configuraciones, despliegues y orquestación. Define el estado deseado de la infraestructura como código (YAML).",
        "why_reference": "Estándar de facto en automatización IT. Su arquitectura agentless (sin software en los nodos gestionados, solo SSH) simplifica la adopción. Adquirido por Red Hat/IBM en 2015, es la base de Ansible Automation Platform.",
        "certifications": ["ISO 27001"],
        "company_size": ["pequeña", "mediana", "grande"],
        "repo": "https://github.com/ansible/ansible",
        "license": "GPL-3.0",
        "tags": ["automatizacion", "open-source", "linux", "cloud", "on-premise", "compliance"],
    },
    # --- Gestores de activos IT ---
    {
        "name": "ServiceNow ITAM",
        "category": "it-asset-managers",
        "type": "comercial",
        "cost_model": "presupuesto-personalizado",
        "cost_details": "Licencia anual según número de activos gestionados.",
        "website": "https://www.servicenow.com/products/it-asset-management.html",
        "description": "Gestión integral de activos IT en la plataforma ServiceNow. Cubre todo el ciclo de vida: adquisición, inventario, cumplimiento de licencias, y disposición.",
        "why_reference": "Líder en Gartner MQ para ITAM. Su integración con ITSM en una única plataforma (ServiceNow) elimina silos entre la gestión de activos y los procesos de soporte IT.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II", "FedRAMP"],
        "company_size": ["mediana", "grande"],
        "tags": ["compliance", "saas", "cloud", "automatizacion", "monitorizacion"],
    },
    # --- Gestores de certificados ---
    {
        "name": "Venafi Control Plane",
        "category": "cert-managers",
        "type": "comercial",
        "cost_model": "presupuesto-personalizado",
        "cost_details": "Licencia anual según número de certificados gestionados.",
        "website": "https://www.venafi.com",
        "description": "Plataforma de gestión del ciclo de vida de certificados digitales y claves criptográficas para entornos empresariales. Automatiza emisión, renovación y revocación de certificados.",
        "why_reference": "Líder en gestión de identidades de máquinas. Venafi es el referente en PKI empresarial y machine identity management, protegiendo las identidades de máquinas que ya superan en número a las humanas.",
        "certifications": ["ISO 27001", "SOC 2 Tipo II"],
        "company_size": ["grande"],
        "tags": ["pki", "encryption", "automatizacion", "compliance", "zero-trust"],
    },
]


def seed() -> int:
    """Puebla el directorio con herramientas conocidas. Retorna el número de herramientas creadas."""
    created = 0
    updated = 0

    for tool_data in SEED_TOOLS:
        name = tool_data["name"]
        slug = slugify_name(name)
        existing = read_tool(slug)

        new_data = {
            **tool_data,
            "slug": slug,
            "tags": tool_data.get("tags", [tool_data["category"]]),
            "sources": tool_data.get("sources", []),
            "last_verified": date.today().isoformat(),
            "needs_review": False,
            "certifications": tool_data.get("certifications", []),
            "company_size": tool_data.get("company_size", []),
            "market_rank": None,
            "logo": None,
            "repo": tool_data.get("repo"),
            "license": tool_data.get("license"),
        }

        merged = merge_frontmatter(existing, new_data)

        # Generar body markdown
        body = existing.get("_body", "") if existing else ""
        if not body:
            body = f"""## {name}

{new_data['description']}

### Por qué es referente

{new_data['why_reference']}

### Información de coste

{new_data.get('cost_details', 'Consultar con el proveedor.')}
"""

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
