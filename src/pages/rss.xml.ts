/**
 * Feed de novedades del directorio.
 *
 * El sitio promete "actualizado cada lunes" y hasta ahora no había forma de
 * comprobarlo ni de enterarse sin volver a entrar. El feed publica las altas
 * por fecha de incorporación (`first_added`), que es el único dato que
 * distingue una herramienta nueva de una reverificada en el pase semanal.
 *
 * Se escribe el XML a mano en lugar de añadir @astrojs/rss: son treinta líneas
 * y evita una dependencia más en un proyecto que solo tiene dos.
 */
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { toToolEntry, getToolCategories, getCategories } from "@lib/tools";

const SITE = "https://moebiuss1.github.io";
const BASE = "/bbdd-it-tools/";
const MAX_ITEMS = 50;

/** Escapa los cinco caracteres que no pueden viajar en crudo dentro de XML. */
const xml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const GET: APIRoute = async () => {
  const tools = (await getCollection("tools")).map(toToolEntry);
  const categories = await getCategories();
  const catName = (id: string) => categories.find(c => c.id === id)?.name ?? id;

  const items = tools
    .filter(t => t.data.first_added)
    .sort((a, b) => new Date(b.data.first_added!).getTime() - new Date(a.data.first_added!).getTime())
    .slice(0, MAX_ITEMS);

  const lastBuild = items[0]?.data.first_added
    ? new Date(items[0].data.first_added).toUTCString()
    : new Date().toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BBDD IT Tools — nuevas herramientas</title>
    <link>${SITE}${BASE}</link>
    <atom:link href="${SITE}${BASE}rss.xml" rel="self" type="application/rss+xml"/>
    <description>Altas en el directorio de herramientas IT de seguridad, cumplimiento y auditoría.</description>
    <language>es-ES</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items.map(t => {
  const cats = getToolCategories(t.data).map(catName).join(", ");
  const url = `${SITE}${BASE}herramientas/${t.slug}/`;
  const desc = `${t.data.description.replace(/\s+/g, " ").trim()}${cats ? ` — ${cats}.` : ""}`;
  return `    <item>
      <title>${xml(t.data.name)}</title>
      <link>${xml(url)}</link>
      <guid isPermaLink="true">${xml(url)}</guid>
      <pubDate>${new Date(t.data.first_added!).toUTCString()}</pubDate>
      <description>${xml(desc)}</description>
      ${getToolCategories(t.data).map(c => `<category>${xml(catName(c))}</category>`).join("\n      ")}
    </item>`;
}).join("\n")}
  </channel>
</rss>
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
