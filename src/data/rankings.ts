export interface RankingEntry {
  slug: string;
  rank: number;
  score: number;
  tier: "Líder" | "Visionario" | "Retador" | "Nicho";
}

const rankings: Record<string, RankingEntry[]> = {
  "antivirus": [
    { slug: "microsoft-defender-for-endpoint", rank: 1, score: 55, tier: "Retador" },
    { slug: "bitdefender-gravityzone", rank: 2, score: 45, tier: "Nicho" },
  ],
  "cert-managers": [
    { slug: "venafi-control-plane", rank: 1, score: 50, tier: "Retador" },
  ],
  "config-managers": [
    { slug: "ansible", rank: 1, score: 50, tier: "Retador" },
  ],
  "dlp": [
    { slug: "microsoft-purview-dlp", rank: 1, score: 55, tier: "Retador" },
    { slug: "forcepoint-dlp", rank: 2, score: 45, tier: "Nicho" },
  ],
  "edr": [
    { slug: "crowdstrike-falcon", rank: 1, score: 50, tier: "Retador" },
    { slug: "sentinelone-singularity", rank: 2, score: 50, tier: "Retador" },
  ],
  "firewall": [
    { slug: "palo-alto-firewall", rank: 1, score: 55, tier: "Retador" },
    { slug: "fortinet-fortigate", rank: 2, score: 45, tier: "Nicho" },
  ],
  "identity-managers": [
    { slug: "microsoft-entra-id-azure-ad", rank: 1, score: 50, tier: "Retador" },
    { slug: "okta", rank: 2, score: 50, tier: "Retador" },
  ],
  "ids": [
    { slug: "snort", rank: 1, score: 50, tier: "Retador" },
  ],
  "ips": [
    { slug: "trend-micro-tippingpoint", rank: 1, score: 55, tier: "Retador" },
    { slug: "suricata", rank: 2, score: 45, tier: "Nicho" },
  ],
  "it-asset-managers": [
    { slug: "servicenow-itam", rank: 1, score: 50, tier: "Retador" },
  ],
  "key-managers": [
    { slug: "aws-key-management-service-kms", rank: 1, score: 55, tier: "Retador" },
    { slug: "hashicorp-vault", rank: 2, score: 45, tier: "Nicho" },
  ],
  "kpi-ca-managers": [
    { slug: "servicenow-grc", rank: 1, score: 50, tier: "Retador" },
  ],
  "mdm": [
    { slug: "microsoft-intune", rank: 1, score: 50, tier: "Retador" },
  ],
  "siem": [
    { slug: "microsoft-sentinel", rank: 1, score: 55, tier: "Retador" },
    { slug: "splunk-enterprise-security", rank: 2, score: 55, tier: "Retador" },
    { slug: "wazuh", rank: 3, score: 45, tier: "Nicho" },
  ],
  "soar": [
    { slug: "palo-alto-cortex-xsoar", rank: 1, score: 50, tier: "Retador" },
  ],
};

export default rankings;
