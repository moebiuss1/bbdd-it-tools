export interface RankingEntry {
  slug: string;
  rank: number;
  score: number;
  tier: "Líder" | "Visionario" | "Retador" | "Nicho";
}

const rankings: Record<string, RankingEntry[]> = {
  "edr": [
    { slug: "crowdstrike-falcon", rank: 1, score: 50, tier: "Retador" },
  ],
  "firewall": [
    { slug: "palo-alto-firewall", rank: 1, score: 50, tier: "Retador" },
  ],
  "identity-managers": [
    { slug: "okta", rank: 1, score: 50, tier: "Retador" },
  ],
  "key-managers": [
    { slug: "hashicorp-vault", rank: 1, score: 50, tier: "Retador" },
  ],
  "siem": [
    { slug: "splunk-enterprise-security", rank: 1, score: 55, tier: "Retador" },
    { slug: "wazuh", rank: 2, score: 45, tier: "Nicho" },
  ],
};

export default rankings;
