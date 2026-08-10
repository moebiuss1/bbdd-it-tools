export interface RankingEntry {
  slug: string;
  rank: number;
  score: number;
  tier: "Líder" | "Visionario" | "Retador" | "Nicho";
}

const rankings: Record<string, RankingEntry[]> = {
  "antivirus": [
    { slug: "microsoft-defender-for-endpoint", rank: 1, score: 55, tier: "Retador" },
    { slug: "sophos-intercept-x", rank: 2, score: 52, tier: "Retador" },
    { slug: "bitdefender-gravityzone", rank: 3, score: 52, tier: "Retador" },
    { slug: "eset-protect", rank: 4, score: 48, tier: "Nicho" },
    { slug: "kaspersky-endpoint-security", rank: 5, score: 45, tier: "Nicho" },
  ],
  "cert-managers": [
    { slug: "digicert-certcentral", rank: 1, score: 55, tier: "Retador" },
    { slug: "globalsign-certificate-manager", rank: 2, score: 52, tier: "Retador" },
    { slug: "keyfactor-command", rank: 3, score: 52, tier: "Retador" },
    { slug: "venafi-control-plane", rank: 4, score: 48, tier: "Nicho" },
    { slug: "sectigo-certificate-manager", rank: 5, score: 45, tier: "Nicho" },
  ],
  "config-managers": [
    { slug: "ansible", rank: 1, score: 55, tier: "Retador" },
    { slug: "puppet-enterprise", rank: 2, score: 55, tier: "Retador" },
    { slug: "chef-infra", rank: 3, score: 55, tier: "Retador" },
    { slug: "terraform", rank: 4, score: 45, tier: "Nicho" },
    { slug: "saltstack", rank: 5, score: 45, tier: "Nicho" },
  ],
  "dlp": [
    { slug: "microsoft-purview-dlp", rank: 1, score: 55, tier: "Retador" },
    { slug: "forcepoint-dlp", rank: 2, score: 52, tier: "Retador" },
    { slug: "trellix-dlp", rank: 3, score: 45, tier: "Nicho" },
    { slug: "digital-guardian-dlp", rank: 4, score: 45, tier: "Nicho" },
    { slug: "symantec-dlp", rank: 5, score: 45, tier: "Nicho" },
  ],
  "edr": [
    { slug: "crowdstrike-falcon", rank: 1, score: 55, tier: "Retador" },
    { slug: "sentinelone-singularity", rank: 2, score: 55, tier: "Retador" },
    { slug: "cisco-secure-endpoint", rank: 3, score: 49, tier: "Nicho" },
    { slug: "trellix-endpoint-security", rank: 4, score: 45, tier: "Nicho" },
    { slug: "cybereason-edr", rank: 5, score: 45, tier: "Nicho" },
  ],
  "firewall": [
    { slug: "palo-alto-firewall", rank: 1, score: 55, tier: "Retador" },
    { slug: "fortinet-fortigate", rank: 2, score: 53, tier: "Retador" },
    { slug: "cloudflare-waf", rank: 3, score: 51, tier: "Retador" },
    { slug: "check-point-firewall", rank: 4, score: 51, tier: "Retador" },
    { slug: "zscaler-zero-trust", rank: 5, score: 45, tier: "Nicho" },
  ],
  "identity-managers": [
    { slug: "microsoft-entra-id-azure-ad", rank: 1, score: 55, tier: "Retador" },
    { slug: "okta", rank: 2, score: 55, tier: "Retador" },
    { slug: "jumpcloud", rank: 3, score: 47, tier: "Nicho" },
    { slug: "ping-identity", rank: 4, score: 45, tier: "Nicho" },
    { slug: "sailpoint", rank: 5, score: 45, tier: "Nicho" },
  ],
  "ids": [
    { slug: "cisco-secure-ids", rank: 1, score: 55, tier: "Retador" },
    { slug: "darktrace", rank: 2, score: 52, tier: "Retador" },
    { slug: "snort", rank: 3, score: 48, tier: "Nicho" },
    { slug: "zeek-ids", rank: 4, score: 45, tier: "Nicho" },
    { slug: "ossec", rank: 5, score: 45, tier: "Nicho" },
  ],
  "ips": [
    { slug: "trend-micro-tippingpoint", rank: 1, score: 55, tier: "Retador" },
    { slug: "palo-alto-threat-prevention", rank: 2, score: 50, tier: "Retador" },
    { slug: "cisco-firepower-ngips", rank: 3, score: 45, tier: "Nicho" },
    { slug: "f5-bigip-ips", rank: 4, score: 45, tier: "Nicho" },
    { slug: "suricata", rank: 5, score: 45, tier: "Nicho" },
  ],
  "it-asset-managers": [
    { slug: "servicenow-itam", rank: 1, score: 55, tier: "Retador" },
    { slug: "snow-software", rank: 2, score: 50, tier: "Retador" },
    { slug: "flexera-one", rank: 3, score: 45, tier: "Nicho" },
    { slug: "ivanti-neurons-itam", rank: 4, score: 45, tier: "Nicho" },
    { slug: "lansweeper", rank: 5, score: 45, tier: "Nicho" },
  ],
  "key-managers": [
    { slug: "aws-key-management-service-kms", rank: 1, score: 55, tier: "Retador" },
    { slug: "cyberark", rank: 2, score: 52, tier: "Retador" },
    { slug: "hashicorp-vault", rank: 3, score: 48, tier: "Nicho" },
    { slug: "fortanix-dsm", rank: 4, score: 47, tier: "Nicho" },
    { slug: "thales-ciphertrust", rank: 5, score: 45, tier: "Nicho" },
  ],
  "kpi-ca-managers": [
    { slug: "qualys-vmdr", rank: 1, score: 55, tier: "Retador" },
    { slug: "tenable-one", rank: 2, score: 53, tier: "Retador" },
    { slug: "servicenow-grc", rank: 3, score: 49, tier: "Nicho" },
    { slug: "metricstream", rank: 4, score: 45, tier: "Nicho" },
    { slug: "rsa-archer", rank: 5, score: 45, tier: "Nicho" },
  ],
  "mdm": [
    { slug: "microsoft-intune", rank: 1, score: 55, tier: "Retador" },
    { slug: "omnissa-workspace-one", rank: 2, score: 50, tier: "Retador" },
    { slug: "jamf", rank: 3, score: 48, tier: "Nicho" },
    { slug: "manageengine-mdm", rank: 4, score: 48, tier: "Nicho" },
    { slug: "hexnode-uem", rank: 5, score: 45, tier: "Nicho" },
  ],
  "siem": [
    { slug: "ibm-qradar", rank: 1, score: 55, tier: "Retador" },
    { slug: "microsoft-sentinel", rank: 2, score: 55, tier: "Retador" },
    { slug: "splunk-enterprise-security", rank: 3, score: 55, tier: "Retador" },
    { slug: "elastic-security", rank: 4, score: 48, tier: "Nicho" },
    { slug: "wazuh", rank: 5, score: 48, tier: "Nicho" },
    { slug: "securonix", rank: 6, score: 45, tier: "Nicho" },
  ],
  "soar": [
    { slug: "palo-alto-cortex-xsoar", rank: 1, score: 55, tier: "Retador" },
    { slug: "splunk-soar", rank: 2, score: 50, tier: "Retador" },
    { slug: "torq", rank: 3, score: 45, tier: "Nicho" },
    { slug: "tines", rank: 4, score: 45, tier: "Nicho" },
    { slug: "swimlane-turbine", rank: 5, score: 45, tier: "Nicho" },
  ],
};

export default rankings;
