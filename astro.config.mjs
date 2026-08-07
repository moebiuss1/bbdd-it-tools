import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const SITE = "https://moebiuss1.github.io";
const BASE = "/bbdd-it-tools";

export default defineConfig({
  site: SITE,
  base: BASE,
  output: "static",
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
