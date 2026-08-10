export interface CategoryData {
  id: string;
  name: string;
  description: string;
  family: string;
  icon: string;
}

export interface FamilyData {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const families: FamilyData[] = [
  { id: "cybersecurity", name: "Cybersecurity", icon: "🛡️", description: "Detección, prevención y respuesta ante amenazas de seguridad informática." },
  { id: "identity-access", name: "Identity & Access", icon: "✅", description: "Gestión de identidades digitales, autenticación y control de acceso." },
  { id: "networking", name: "Networking", icon: "📶", description: "Infraestructura de red, conectividad y seguridad perimetral." },
  { id: "endpoint-device", name: "Endpoint & Device Management", icon: "🖥️", description: "Protección y gestión de dispositivos finales y móviles." },
  { id: "monitoring", name: "Monitoring & Observability", icon: "📊", description: "Supervisión de infraestructura, aplicaciones y seguridad en tiempo real." },
  { id: "backup-dr", name: "Backup & Disaster Recovery", icon: "💾", description: "Copia de seguridad, recuperación ante desastres y continuidad de negocio." },
  { id: "cloud-infra", name: "Cloud & Infrastructure", icon: "☁️", description: "Servicios cloud, migración y gestión de infraestructura como código." },
  { id: "devops-software", name: "DevOps & Software Security", icon: "👨‍💻", description: "Desarrollo seguro, integración continua y gestión del ciclo de vida del software." },
  { id: "itsm-itops", name: "ITSM & IT Operations", icon: "⚙️", description: "Gestión de servicios IT, operaciones y activos tecnológicos." },
  { id: "grc-risk", name: "GRC, Risk & Compliance", icon: "📄", description: "Gobierno, gestión de riesgos y cumplimiento normativo." },
  { id: "pki-crypto", name: "PKI & Cryptography", icon: "🔐", description: "Infraestructura de clave pública, criptografía y servicios de confianza digital." },
  { id: "ai-security", name: "AI & AI Security", icon: "🤖", description: "Gobernanza y seguridad de inteligencia artificial, LLMs y modelos de ML." },
];

const categories: CategoryData[] = [
  // === CYBERSECURITY ===
  { id: "antivirus", name: "Soluciones Antivirus", description: "Software de detección y eliminación de malware mediante firmas, heurística y análisis de comportamiento.", family: "cybersecurity", icon: "🛡️" },
  { id: "edr", name: "Soluciones EDR", description: "Endpoint Detection and Response — monitorización continua y respuesta a amenazas en endpoints.", family: "cybersecurity", icon: "🎯" },
  { id: "firewall", name: "Firewalls", description: "Sistemas de defensa perimetral que controlan el tráfico de red entrante y saliente.", family: "cybersecurity", icon: "🧱" },
  { id: "siem", name: "SIEM", description: "Security Information and Event Management — correlación de eventos y gestión de logs de seguridad.", family: "cybersecurity", icon: "📊" },
  { id: "soar", name: "SOAR", description: "Security Orchestration, Automation and Response — automatización de flujos de respuesta a incidentes.", family: "cybersecurity", icon: "⚡" },
  { id: "dlp", name: "Soluciones DLP", description: "Data Loss Prevention — prevención de fuga de datos sensibles en reposo, en uso y en tránsito.", family: "cybersecurity", icon: "👁️‍🗨️" },
  { id: "ids", name: "IDS", description: "Intrusion Detection Systems — sistemas de detección de intrusiones en redes y hosts.", family: "cybersecurity", icon: "⚠️" },
  { id: "ips", name: "IPS", description: "Intrusion Prevention Systems — sistemas de prevención de intrusiones con bloqueo activo de amenazas.", family: "cybersecurity", icon: "🛡️" },
  { id: "deception", name: "Deception Technology", description: "Tecnología de señuelos y entornos simulados para detectar y analizar atacantes en la red.", family: "cybersecurity", icon: "👁️" },
  { id: "honeypots", name: "Honeypots", description: "Sistemas trampa diseñados para atraer, detectar y analizar intentos de intrusión.", family: "cybersecurity", icon: "📍" },
  { id: "ndr", name: "NDR", description: "Network Detection and Response — detección y respuesta a amenazas basada en análisis de tráfico de red.", family: "cybersecurity", icon: "📡" },
  { id: "nta", name: "Network Traffic Analysis", description: "Análisis de tráfico de red para identificar anomalías, amenazas y patrones de comportamiento sospechosos.", family: "cybersecurity", icon: "📈" },
  { id: "swg", name: "Secure Web Gateway", description: "Pasarela de seguridad web que filtra tráfico HTTP/HTTPS, malware y contenido no deseado.", family: "cybersecurity", icon: "🌐" },
  { id: "waf", name: "WAF", description: "Web Application Firewall — protección de aplicaciones web frente a ataques como SQL injection y XSS.", family: "cybersecurity", icon: "🖥️" },
  { id: "web-security", name: "Web Security", description: "Seguridad de navegación web, protección anti-phishing y filtrado de contenido.", family: "cybersecurity", icon: "🧭" },
  { id: "dns-security", name: "DNS Security", description: "Protección del sistema de nombres de dominio frente a envenenamiento, tunneling y ataques DGA.", family: "cybersecurity", icon: "🔗" },
  { id: "email-security", name: "Email Security", description: "Protección del correo electrónico frente a phishing, spam, malware y fugas de datos.", family: "cybersecurity", icon: "📧" },
  { id: "api-security", name: "API Security", description: "Protección de APIs frente a ataques, abuso y exposición de datos.", family: "cybersecurity", icon: "💻" },

  // === IDENTITY & ACCESS ===
  { id: "identity-managers", name: "Gestores de Identidades", description: "Soluciones IAM para gestión de identidades digitales, autenticación y control de acceso.", family: "identity-access", icon: "✅" },
  { id: "pam", name: "PAM", description: "Privileged Access Management — gestión y monitorización de accesos privilegiados.", family: "identity-access", icon: "🔒" },
  { id: "sso", name: "SSO", description: "Single Sign-On — autenticación unificada para múltiples aplicaciones con una sola credencial.", family: "identity-access", icon: "🔑" },
  { id: "mfa", name: "MFA", description: "Multi-Factor Authentication — verificación de identidad mediante múltiples factores.", family: "identity-access", icon: "📱" },
  { id: "nac", name: "Network Access Control (NAC)", description: "Control de acceso a la red basado en políticas de seguridad y cumplimiento del endpoint.", family: "identity-access", icon: "🚫" },

  // === NETWORKING ===
  { id: "ngfw", name: "NGFW", description: "Next-Generation Firewall — firewall con inspección profunda de paquetes y control de aplicaciones.", family: "networking", icon: "🛡️" },
  { id: "sd-wan", name: "SD-WAN", description: "Software-Defined Wide Area Network — gestión definida por software de redes de área extensa.", family: "networking", icon: "🔀" },
  { id: "load-balancers", name: "Load Balancers", description: "Balanceadores de carga que distribuyen el tráfico entre servidores para optimizar rendimiento y disponibilidad.", family: "networking", icon: "🌿" },

  // === ENDPOINT & DEVICE MANAGEMENT ===
  { id: "mdm", name: "MDM", description: "Mobile Device Management — administración y seguridad de dispositivos móviles corporativos.", family: "endpoint-device", icon: "📱" },
  { id: "mam", name: "MAM", description: "Mobile Application Management — gestión y seguridad de aplicaciones móviles corporativas.", family: "endpoint-device", icon: "📚" },
  { id: "application-control", name: "Application Control", description: "Control de aplicaciones permitidas y bloqueadas en endpoints corporativos.", family: "endpoint-device", icon: "🚫" },
  { id: "usb-device-control", name: "USB / Device Control", description: "Control de dispositivos extraíbles y periféricos conectados a endpoints.", family: "endpoint-device", icon: "🔌" },

  // === MONITORING & OBSERVABILITY ===
  { id: "server-monitoring", name: "Server Monitoring", description: "Monitorización de servidores físicos y virtuales con alertas y dashboards de rendimiento.", family: "monitoring", icon: "🖥️" },
  { id: "container-monitoring", name: "Container Monitoring", description: "Supervisión de contenedores Docker, Podman y entornos de ejecución de contenedores.", family: "monitoring", icon: "📦" },
  { id: "kubernetes-monitoring", name: "Kubernetes Monitoring", description: "Monitorización de clústeres Kubernetes, pods, servicios y recursos de orquestación.", family: "monitoring", icon: "🔲" },
  { id: "log-management", name: "Log Management", description: "Centralización, análisis y retención de logs de sistemas, aplicaciones y seguridad.", family: "monitoring", icon: "📄" },
  { id: "cloud-monitoring", name: "Cloud Monitoring", description: "Supervisión de recursos y servicios en entornos cloud (AWS, Azure, GCP).", family: "monitoring", icon: "☁️" },
  { id: "kpi-ca-managers", name: "Gestores de KPI y CA", description: "Herramientas para definir, monitorizar y auditar indicadores clave de rendimiento y controles.", family: "monitoring", icon: "📊" },

  // === BACKUP & DISASTER RECOVERY ===
  { id: "enterprise-backup", name: "Enterprise Backup", description: "Soluciones de copia de seguridad empresarial para grandes volúmenes de datos.", family: "backup-dr", icon: "💾" },
  { id: "endpoint-backup", name: "Endpoint Backup", description: "Copia de seguridad de dispositivos finales como portátiles y estaciones de trabajo.", family: "backup-dr", icon: "💻" },
  { id: "cloud-backup", name: "Cloud Backup", description: "Copia de seguridad en la nube con replicación geográfica y recuperación automatizada.", family: "backup-dr", icon: "🌧️" },
  { id: "saas-backup", name: "SaaS Backup", description: "Protección de datos en aplicaciones SaaS como Microsoft 365, Google Workspace y Salesforce.", family: "backup-dr", icon: "🔄" },
  { id: "m365-backup", name: "Microsoft 365 Backup", description: "Copia de seguridad especializada para Exchange Online, SharePoint, OneDrive y Teams.", family: "backup-dr", icon: "🗄️" },
  { id: "google-workspace-backup", name: "Google Workspace Backup", description: "Copia de seguridad para Gmail, Drive, Calendar y Sites de Google Workspace.", family: "backup-dr", icon: "🗄️" },
  { id: "immutable-backup", name: "Immutable Backup", description: "Copias de seguridad inmutables que no pueden ser modificadas ni eliminadas, incluso por administradores.", family: "backup-dr", icon: "🔒" },
  { id: "ransomware-recovery", name: "Ransomware Recovery", description: "Soluciones especializadas en recuperación tras ataques de ransomware con restauración limpia.", family: "backup-dr", icon: "↩️" },

  // === CLOUD & INFRASTRUCTURE ===
  { id: "cloud-migration", name: "Cloud Migration", description: "Herramientas y servicios para migrar cargas de trabajo a entornos cloud.", family: "cloud-infra", icon: "🚛" },
  { id: "serverless-management", name: "Serverless Management", description: "Gestión de funciones serverless (AWS Lambda, Azure Functions) y entornos sin servidor.", family: "cloud-infra", icon: "⚡" },
  { id: "cloud-cost", name: "Cloud Cost Management", description: "Optimización y control de costes en entornos multi-cloud.", family: "cloud-infra", icon: "💲" },

  // === DEVOPS & SOFTWARE SECURITY ===
  { id: "git", name: "Git", description: "Sistema de control de versiones distribuido para seguimiento de cambios en código fuente.", family: "devops-software", icon: "🌿" },
  { id: "scm", name: "Source Code Management", description: "Plataformas de gestión de código fuente con colaboración, revisión y CI/CD integrado.", family: "devops-software", icon: "👨‍💻" },
  { id: "ci-cd", name: "CI/CD", description: "Integración y entrega continua — automatización de build, test y despliegue de software.", family: "devops-software", icon: "▶️" },
  { id: "config-managers", name: "Gestores de Configuraciones", description: "Herramientas para automatizar, auditar y mantener la configuración de infraestructura IT.", family: "devops-software", icon: "⚙️" },
  { id: "secrets-management", name: "Secrets Management", description: "Gestión segura de secretos, claves API, tokens y credenciales en entornos DevOps.", family: "devops-software", icon: "🔐" },
  { id: "api-management", name: "API Management", description: "Plataformas de gestión del ciclo de vida de APIs con control de acceso y monetización.", family: "devops-software", icon: "💻" },
  { id: "api-testing", name: "API Testing", description: "Herramientas de prueba de APIs para funcionalidad, rendimiento y seguridad.", family: "devops-software", icon: "✔️" },
  { id: "code-quality", name: "Code Quality", description: "Análisis estático y dinámico de código para detectar bugs, vulnerabilidades y malas prácticas.", family: "devops-software", icon: "☑️" },
  { id: "key-managers", name: "Gestores de Claves", description: "Gestión del ciclo de vida de claves criptográficas, secretos y certificados.", family: "devops-software", icon: "🔐" },

  // === ITSM & IT OPERATIONS ===
  { id: "incident-management", name: "Incident Management", description: "Gestión del ciclo de vida de incidentes IT desde la detección hasta la resolución.", family: "itsm-itops", icon: "⚠️" },
  { id: "problem-management", name: "Problem Management", description: "Identificación y resolución de causas raíz de incidentes recurrentes.", family: "itsm-itops", icon: "❓" },
  { id: "change-management", name: "Change Management", description: "Control de cambios en infraestructura IT con flujos de aprobación y análisis de riesgos.", family: "itsm-itops", icon: "🔀" },
  { id: "request-management", name: "Request Management", description: "Gestión de solicitudes de servicio, catálogo de servicios y automatización de fulfillment.", family: "itsm-itops", icon: "📥" },
  { id: "it-asset-managers", name: "IT Asset Management (ITAM)", description: "Soluciones ITAM para inventario, ciclo de vida y gestión de activos tecnológicos.", family: "itsm-itops", icon: "📦" },

  // === GRC, RISK & COMPLIANCE ===
  { id: "risk-management", name: "Risk Management", description: "Identificación, evaluación y tratamiento de riesgos empresariales y tecnológicos.", family: "grc-risk", icon: "📈" },
  { id: "compliance-management", name: "Compliance Management", description: "Gestión de cumplimiento normativo con mapeo de controles y evidencias.", family: "grc-risk", icon: "☑️" },
  { id: "audit-management", name: "Audit Management", description: "Planificación, ejecución y seguimiento de auditorías internas y externas.", family: "grc-risk", icon: "🔍" },
  { id: "policy-management", name: "Policy Management", description: "Creación, distribución y attestation de políticas corporativas y de seguridad.", family: "grc-risk", icon: "📖" },
  { id: "security-awareness", name: "Security Awareness", description: "Plataformas de formación y concienciación en seguridad informática.", family: "grc-risk", icon: "👥" },
  { id: "business-continuity", name: "Business Continuity Management", description: "Planificación de continuidad de negocio y recuperación ante desastres.", family: "grc-risk", icon: "🛡️" },
  { id: "third-party-security", name: "Third-Party Security Assessment", description: "Evaluación y monitorización de riesgos de seguridad en proveedores y terceros.", family: "grc-risk", icon: "🔗" },

  // === PKI & CRYPTOGRAPHY ===
  { id: "cert-managers", name: "Gestores de Certificados Digitales", description: "Soluciones PKI y gestión del ciclo de vida de certificados digitales X.509.", family: "pki-crypto", icon: "🏅" },
  { id: "certificate-lifecycle", name: "Certificate Lifecycle Management", description: "Automatización del ciclo de vida de certificados: emisión, renovación y revocación.", family: "pki-crypto", icon: "🔃" },
  { id: "timestamping", name: "Timestamping", description: "Servicios de sellado de tiempo para integridad y no repudio de documentos electrónicos.", family: "pki-crypto", icon: "🕐" },
  { id: "eidas-trust", name: "eIDAS / Trust Services", description: "Servicios de confianza digital conforme al reglamento eIDAS: firma electrónica, sellos y validación.", family: "pki-crypto", icon: "📄" },

  // === AI & AI SECURITY ===
  { id: "ai-governance", name: "AI Governance", description: "Gobernanza y gestión del ciclo de vida de modelos de IA con trazabilidad y auditoría.", family: "ai-security", icon: "🤖" },
  { id: "ai-security-tool", name: "AI Security", description: "Herramientas de seguridad para proteger sistemas de IA contra ataques adversariales y envenenamiento.", family: "ai-security", icon: "🛡️" },
  { id: "ai-spm", name: "AI Security Posture Management (AI-SPM)", description: "Gestión de la postura de seguridad de modelos, pipelines y entornos de IA.", family: "ai-security", icon: "📈" },
  { id: "ai-firewall", name: "AI Firewall", description: "Firewalls especializados en proteger APIs y endpoints de servicios de IA.", family: "ai-security", icon: "🛡️" },
  { id: "llm-security", name: "LLM Security", description: "Seguridad para Large Language Models: prompt injection, jailbreak y fuga de datos.", family: "ai-security", icon: "💬" },
  { id: "llm-gateway", name: "LLM Gateway", description: "Pasarela de gestión y seguridad para APIs de LLMs con control de acceso y auditoría.", family: "ai-security", icon: "🖥️" },
  { id: "model-risk", name: "Model Risk Management", description: "Gestión del riesgo asociado a modelos de ML/IA con validación y monitorización continua.", family: "ai-security", icon: "⚠️" },
  { id: "ai-data-security", name: "AI Data Security", description: "Protección de datos utilizados para entrenamiento e inferencia de modelos de IA.", family: "ai-security", icon: "🗄️" },
];

export default categories;
