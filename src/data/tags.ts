export interface TagData {
  id: string;
  name: string;
  color: string;
}

const tags: TagData[] = [
  { id: "endpoint", name: "Endpoint", color: "blue" },
  { id: "red", name: "Red", color: "red" },
  { id: "cloud", name: "Cloud", color: "sky" },
  { id: "on-premise", name: "On-Premise", color: "amber" },
  { id: "hibrido", name: "Híbrido", color: "purple" },
  { id: "ai", name: "IA / Machine Learning", color: "violet" },
  { id: "threat-hunting", name: "Threat Hunting", color: "orange" },
  { id: "incident-response", name: "Respuesta a Incidentes", color: "red" },
  { id: "compliance", name: "Cumplimiento", color: "green" },
  { id: "auditoria", name: "Auditoría", color: "teal" },
  { id: "monitorizacion", name: "Monitorización", color: "cyan" },
  { id: "automatizacion", name: "Automatización", color: "indigo" },
  { id: "forense", name: "Análisis Forense", color: "rose" },
  { id: "vulnerability-management", name: "Gestión de Vulnerabilidades", color: "orange" },
  { id: "patch-management", name: "Gestión de Parches", color: "lime" },
  { id: "encryption", name: "Cifrado", color: "slate" },
  { id: "zero-trust", name: "Zero Trust", color: "zinc" },
  { id: "xdr", name: "XDR", color: "fuchsia" },
  { id: "mfa", name: "MFA / 2FA", color: "emerald" },
  { id: "sso", name: "Single Sign-On", color: "sky" },
  { id: "pki", name: "PKI", color: "amber" },
  { id: "network", name: "Red", color: "blue" },
  { id: "container", name: "Contenedores", color: "cyan" },
  { id: "iot", name: "IoT / OT", color: "stone" },
  { id: "microsoft", name: "Microsoft", color: "blue" },
  { id: "linux", name: "Linux", color: "orange" },
  { id: "macos", name: "macOS", color: "gray" },
  { id: "saas", name: "SaaS", color: "purple" },
  { id: "open-source", name: "Open Source", color: "green" },
];

export default tags;
