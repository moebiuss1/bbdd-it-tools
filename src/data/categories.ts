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
  { id: "deception", name: "Deception y honeypots", description: "Señuelos, credenciales falsas y sistemas trampa que solo un atacante tiene motivo para tocar: alta señal, muy poco ruido.", family: "cybersecurity", icon: "👁️" },
  { id: "ndr", name: "NDR y análisis de tráfico", description: "Detección y respuesta basadas en el tráfico de red, desde el análisis de flujos hasta la investigación de sesiones completas.", family: "cybersecurity", icon: "📡" },
  { id: "swg", name: "Secure Web Gateway", description: "Control de la salida a internet: filtrado HTTP/HTTPS, inspección de descargas, seguridad de navegación y resolución DNS protegida.", family: "cybersecurity", icon: "🌐" },
  { id: "waf", name: "WAF", description: "Web Application Firewall — protección de aplicaciones web frente a ataques como SQL injection y XSS.", family: "cybersecurity", icon: "🖥️" },
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
  { id: "infra-monitoring", name: "Monitorización de infraestructura", description: "Supervisión de servidores, contenedores, clústeres de Kubernetes y recursos cloud con métricas, alertas y cuadros de mando.", family: "monitoring", icon: "📈" },
  { id: "log-management", name: "Log Management", description: "Centralización, análisis y retención de logs de sistemas, aplicaciones y seguridad.", family: "monitoring", icon: "📄" },
  { id: "kpi-ca-managers", name: "Gestores de KPI y CA", description: "Herramientas para definir, monitorizar y auditar indicadores clave de rendimiento y controles.", family: "monitoring", icon: "📊" },

  // === BACKUP & DISASTER RECOVERY ===
  { id: "enterprise-backup", name: "Backup corporativo", description: "Copia y restauración de servidores, endpoints y cargas cloud, incluido el almacenamiento inmutable frente a borrado o cifrado malicioso.", family: "backup-dr", icon: "💾" },
  { id: "saas-backup", name: "Backup de SaaS", description: "Copia de seguridad de los datos que viven en aplicaciones SaaS —Microsoft 365, Google Workspace, Salesforce— fuera del propio proveedor.", family: "backup-dr", icon: "🔄" },

  // === CLOUD & INFRASTRUCTURE ===
  { id: "cloud-migration", name: "Cloud Migration", description: "Herramientas y servicios para migrar cargas de trabajo a entornos cloud.", family: "cloud-infra", icon: "🚛" },
  { id: "serverless-management", name: "Serverless Management", description: "Gestión de funciones serverless (AWS Lambda, Azure Functions) y entornos sin servidor.", family: "cloud-infra", icon: "⚡" },
  { id: "cloud-cost", name: "Cloud Cost Management", description: "Optimización y control de costes en entornos multi-cloud.", family: "cloud-infra", icon: "💲" },

  // === DEVOPS & SOFTWARE SECURITY ===
  { id: "scm", name: "Gestión de código fuente", description: "Control de versiones y plataformas de colaboración sobre el código, con revisión, permisos e integración con la cadena de despliegue.", family: "devops-software", icon: "👨‍💻" },
  { id: "ci-cd", name: "CI/CD", description: "Integración y entrega continua — automatización de build, test y despliegue de software.", family: "devops-software", icon: "▶️" },
  { id: "config-managers", name: "Gestores de Configuraciones", description: "Herramientas para automatizar, auditar y mantener la configuración de infraestructura IT.", family: "devops-software", icon: "⚙️" },
  { id: "secrets-management", name: "Secrets Management", description: "Gestión segura de secretos, claves API, tokens y credenciales en entornos DevOps.", family: "devops-software", icon: "🔐" },
  { id: "api-management", name: "API Management", description: "Plataformas de gestión del ciclo de vida de APIs con control de acceso y monetización.", family: "devops-software", icon: "💻" },
  { id: "api-testing", name: "API Testing", description: "Herramientas de prueba de APIs para funcionalidad, rendimiento y seguridad.", family: "devops-software", icon: "✔️" },
  { id: "code-quality", name: "Code Quality", description: "Análisis estático y dinámico de código para detectar bugs, vulnerabilidades y malas prácticas.", family: "devops-software", icon: "☑️" },
  { id: "key-managers", name: "Gestores de Claves", description: "Gestión del ciclo de vida de claves criptográficas, secretos y certificados.", family: "devops-software", icon: "🔐" },

  // === ITSM & IT OPERATIONS ===
  { id: "incident-management", name: "Gestión de incidencias y cambios", description: "Ciclo de vida de incidencias, problemas, peticiones y cambios de servicio: los módulos que una suite ITSM vende y se implantan juntos.", family: "itsm-itops", icon: "⚠️" },
  { id: "it-asset-managers", name: "IT Asset Management (ITAM)", description: "Soluciones ITAM para inventario, ciclo de vida y gestión de activos tecnológicos.", family: "itsm-itops", icon: "📦" },

  // === GRC, RISK & COMPLIANCE ===
  { id: "risk-management", name: "Risk Management", description: "Identificación, evaluación y tratamiento de riesgos empresariales y tecnológicos.", family: "grc-risk", icon: "📈" },
  { id: "compliance-management", name: "Compliance Management", description: "Gestión de cumplimiento normativo con mapeo de controles y evidencias.", family: "grc-risk", icon: "☑️" },
  { id: "audit-management", name: "Audit Management", description: "Planificación, ejecución y seguimiento de auditorías internas y externas.", family: "grc-risk", icon: "🔍" },
  { id: "policy-management", name: "Policy Management", description: "Creación, distribución y attestation de políticas corporativas y de seguridad.", family: "grc-risk", icon: "📖" },
  { id: "security-awareness", name: "Security Awareness", description: "Plataformas de formación y concienciación en seguridad informática.", family: "grc-risk", icon: "👥" },
  { id: "business-continuity", name: "Continuidad y recuperación", description: "Planes de continuidad de negocio, recuperación ante desastres y vuelta a producción tras un incidente de ransomware.", family: "grc-risk", icon: "🛡️" },
  { id: "third-party-security", name: "Third-Party Security Assessment", description: "Evaluación y monitorización de riesgos de seguridad en proveedores y terceros.", family: "grc-risk", icon: "🔗" },

  // === PKI & CRYPTOGRAPHY ===
  { id: "cert-managers", name: "Gestores de Certificados Digitales", description: "Soluciones PKI y gestión del ciclo de vida de certificados digitales X.509.", family: "pki-crypto", icon: "🏅" },
  { id: "certificate-lifecycle", name: "Certificate Lifecycle Management", description: "Automatización del ciclo de vida de certificados: emisión, renovación y revocación.", family: "pki-crypto", icon: "🔃" },
  { id: "eidas-trust", name: "Servicios de confianza (eIDAS)", description: "Firma y sello electrónicos, sellado de tiempo y validación conforme al reglamento eIDAS.", family: "pki-crypto", icon: "📄" },

  // === AI & AI SECURITY ===
  { id: "ai-governance", name: "Gobernanza y riesgo de modelos", description: "Ciclo de vida, trazabilidad, validación y riesgo de los modelos de IA: quién aprobó qué, con qué datos y cuándo toca revisarlo.", family: "ai-security", icon: "🤖" },
  { id: "llm-security", name: "Seguridad de IA y LLM", description: "Protección de modelos y de su uso: prompt injection, jailbreak, fuga de datos, pasarelas de acceso y postura de seguridad de los entornos de IA.", family: "ai-security", icon: "💬" },
];

export default categories;

/**
 * Categorías absorbidas por otra, con su destino.
 *
 * El directorio llegó a tener 80 categorías, 37 de ellas con una sola
 * herramienta: un "ranking" de un elemento y una faceta que no filtra nada. Se
 * fusionaron las que compiten en la misma decisión de compra, y este mapa
 * conserva los identificadores antiguos para dos cosas: las redirecciones de
 * `/categorias/<id>` (astro.config.mjs) y el contraste con `glossary.ts`, que
 * sí mantiene los términos por separado porque definir «honeypot» y «deception»
 * son dos entradas distintas de diccionario aunque se compren en el mismo
 * producto.
 */
export const categoryAliases: Record<string, string> = {
  "ai-data-security": "llm-security",
  "ai-firewall": "llm-security",
  "ai-security-tool": "llm-security",
  "ai-spm": "llm-security",
  "change-management": "incident-management",
  "cloud-backup": "enterprise-backup",
  "cloud-monitoring": "infra-monitoring",
  "container-monitoring": "infra-monitoring",
  "dns-security": "swg",
  "endpoint-backup": "enterprise-backup",
  "git": "scm",
  "google-workspace-backup": "saas-backup",
  "honeypots": "deception",
  "immutable-backup": "enterprise-backup",
  "kubernetes-monitoring": "infra-monitoring",
  "llm-gateway": "llm-security",
  "m365-backup": "saas-backup",
  "model-risk": "ai-governance",
  "nta": "ndr",
  "problem-management": "incident-management",
  "ransomware-recovery": "business-continuity",
  "request-management": "incident-management",
  "server-monitoring": "infra-monitoring",
  "timestamping": "eidas-trust",
  "web-security": "swg",
};
