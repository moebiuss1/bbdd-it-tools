import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const SITE = "https://moebiuss1.github.io";
const BASE = "/bbdd-it-tools/";

export default defineConfig({
  site: SITE,
  base: BASE,
  output: "static",
  integrations: [sitemap()],
});
