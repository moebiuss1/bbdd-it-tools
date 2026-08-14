export interface TagData {
  id: string;
  /** Rótulo legible; es lo que se muestra en la faceta y en la píldora de filtro */
  name: string;
}

/**
 * Vocabulario de etiquetas con valor de faceta.
 *
 * El campo `tags` de las fichas es más ancho que esta lista: contiene también
 * términos de cola larga —nombres de fabricante, protocolos concretos,
 * tecnologías— que mejoran la búsqueda de texto pero que como filtro no sirven,
 * porque devuelven una sola herramienta. Aquí están los conceptos transversales
 * que sí agrupan: los que aparecen en cuatro fichas o más y que no repiten una
 * categoría (filtrar por «EDR» ya lo hace la faceta de categoría).
 *
 * Las etiquetas que no figuran en esta lista siguen funcionando si llegan por
 * URL desde una ficha (`?tag=…`); simplemente no se ofrecen en el desplegable.
 */
const tags: TagData[] = [
  { id: "acme", name: "ACME" },
  { id: "ai", name: "IA y aprendizaje automático" },
  { id: "auditoria", name: "Auditoría" },
  { id: "automatizacion", name: "Automatización" },
  { id: "behavior-analytics", name: "Análisis de comportamiento" },
  { id: "case-management", name: "Gestión de casos" },
  { id: "cloud", name: "Cloud" },
  { id: "cloud-native", name: "Cloud native" },
  { id: "compliance", name: "Cumplimiento normativo" },
  { id: "discovery", name: "Descubrimiento de activos" },
  { id: "encryption", name: "Cifrado" },
  { id: "endpoint", name: "Endpoint" },
  { id: "fim", name: "Integridad de ficheros (FIM)" },
  { id: "fips", name: "FIPS" },
  { id: "forensics", name: "Análisis forense" },
  { id: "government", name: "Sector público" },
  { id: "grc", name: "GRC" },
  { id: "hids", name: "HIDS" },
  { id: "hsm", name: "HSM" },
  { id: "iac", name: "Infraestructura como código" },
  { id: "iam", name: "Gestión de identidades" },
  { id: "incident-response", name: "Respuesta a incidentes" },
  { id: "iot", name: "IoT y OT" },
  { id: "itam", name: "Inventario de activos IT" },
  { id: "kms", name: "Gestión de claves (KMS)" },
  { id: "linux", name: "Linux" },
  { id: "microsoft", name: "Ecosistema Microsoft" },
  { id: "monitorizacion", name: "Monitorización" },
  { id: "network", name: "Red" },
  { id: "network-security", name: "Seguridad de red" },
  { id: "ngav", name: "Antivirus de nueva generación" },
  { id: "on-premise", name: "On-premise" },
  { id: "open-source", name: "Open source" },
  { id: "pki", name: "PKI" },
  { id: "ransomware", name: "Ransomware" },
  { id: "saas", name: "SaaS" },
  { id: "sam", name: "Gestión de licencias (SAM)" },
  { id: "smb", name: "Pequeña y mediana empresa" },
  { id: "threat-hunting", name: "Threat hunting" },
  { id: "threat-intelligence", name: "Inteligencia de amenazas" },
  { id: "uem", name: "Gestión unificada de dispositivos" },
  { id: "vulnerability-management", name: "Gestión de vulnerabilidades" },
  { id: "xdr", name: "XDR" },
  { id: "zero-trust", name: "Zero Trust" },
];

export default tags;
