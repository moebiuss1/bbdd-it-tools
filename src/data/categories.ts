export interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const categories: CategoryData[] = [
  { id: "antivirus", name: "Soluciones Antivirus", description: "Software de detección y eliminación de malware mediante firmas, heurística y análisis de comportamiento.", icon: "shield" },
  { id: "edr", name: "Soluciones EDR", description: "Endpoint Detection and Response — monitorización continua y respuesta a amenazas en endpoints.", icon: "crosshair" },
  { id: "firewall", name: "Firewalls", description: "Sistemas de defensa perimetral que controlan el tráfico de red entrante y saliente.", icon: "wall" },
  { id: "siem", name: "SIEM", description: "Security Information and Event Management — correlación de eventos y gestión de logs de seguridad.", icon: "activity" },
  { id: "soar", name: "SOAR", description: "Security Orchestration, Automation and Response — automatización de flujos de respuesta a incidentes.", icon: "zap" },
  { id: "identity-managers", name: "Gestores de Identidades", description: "Soluciones IAM para gestión de identidades digitales, autenticación y control de acceso.", icon: "user-check" },
  { id: "key-managers", name: "Gestores de Claves", description: "Gestión del ciclo de vida de claves criptográficas, secretos y certificados.", icon: "key" },
  { id: "kpi-ca-managers", name: "Gestores de KPI y CA", description: "Herramientas para definir, monitorizar y auditar indicadores clave de rendimiento y controles de aseguramiento.", icon: "bar-chart" },
  { id: "it-asset-managers", name: "Gestores de Activos IT", description: "Soluciones ITAM para inventario, ciclo de vida y gestión de activos tecnológicos.", icon: "monitor" },
  { id: "config-managers", name: "Gestores de Configuraciones", description: "Herramientas para automatizar, auditar y mantener la configuración de infraestructura IT.", icon: "settings" },
  { id: "dlp", name: "Soluciones DLP", description: "Data Loss Prevention — prevención de fuga de datos sensibles en reposo, en uso y en tránsito.", icon: "eye-off" },
  { id: "mdm", name: "MDM", description: "Mobile Device Management — administración y seguridad de dispositivos móviles corporativos.", icon: "smartphone" },
  { id: "cert-managers", name: "Gestores de Certificados Digitales", description: "Soluciones PKI y gestión del ciclo de vida de certificados digitales X.509.", icon: "award" },
  { id: "ids", name: "IDS", description: "Intrusion Detection Systems — sistemas de detección de intrusiones en redes y hosts.", icon: "alert-triangle" },
  { id: "ips", name: "IPS", description: "Intrusion Prevention Systems — sistemas de prevención de intrusiones con bloqueo activo de amenazas.", icon: "shield-off" },
];

export default categories;
