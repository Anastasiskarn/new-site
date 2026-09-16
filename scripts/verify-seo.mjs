import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { indexableRoutes, locales, pathFor, SITE_URL } from "../lib/routes.ts";
import en from "../content/en.mjs";
import gr from "../content/gr.mjs";

// Inspect HTTP responses, without executing JavaScript or counting RSC script payloads as content.
const base = (process.env.PREVIEW_URL || "http://localhost:5174").replace(/\/$/, "");
const clean = (html) => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
const text = (html) => clean(html).replace(/<[^>]*>/g, "").replace(/&(amp|quot|apos|nbsp|#39|#x27);/gi,
  (_, entity) => ({ amp: "&", quot: '"', apos: "'", nbsp: " ", "#39": "'", "#x27": "'" })[entity.toLowerCase()]).replace(/\s+/g, " ").trim();
const titles = new Set();
const results = [];
const agents = {
  browser: "Mozilla/5.0",
  google: "Googlebot",
  aiSearch: "OAI-SearchBot",
};

async function request(path, agent = agents.browser) {
  const response = await fetch(base + path, { headers: { "User-Agent": agent } });
  assert.equal(response.status, 200, path + " status");
  assert.match(response.headers.get("content-type") || "", /text\/html/, path + " HTML content type");
  assert.equal(response.headers.get("x-robots-tag")?.includes("noindex") || false, false, path + " indexable headers");
  return response.text();
}

for (const { lang, slug, path } of indexableRoutes) {
  const raw = await request(path);
  const html = clean(raw);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
  const title = text(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "");
  assert.ok(title && !titles.has(title), path + " unique nonempty title");
  titles.add(title);
  assert.match(head, /name="description" content="[^"]+"/, path + " description in initial head");
  assert.ok(head.includes(`rel="canonical" href="${SITE_URL + path}"`), path + " canonical in initial head");
  assert.match(html, new RegExp(`<html[^>]*lang="${lang === "gr" ? "el" : "en"}"`), path + " language");
  assert.equal((html.match(/<h1\b/g) || []).length, 1, path + " one HTML h1");
  assert.ok(text(main).length > 100, path + " meaningful main content outside scripts");
  assert.ok(!/name="robots" content="[^"]*noindex/.test(head), path + " indexable");
  for (const [code, locale] of [["en", "en"], ["el", "gr"], ["x-default", "gr"]]) {
    assert.ok(head.includes(`hrefLang="${code}" href="${SITE_URL + pathFor(locale, slug)}"`), path + " hreflang " + code);
  }
  const schemas = [...raw.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]));
  assert.ok(schemas.some((schema) => ["WebPage", "AboutPage", "ContactPage"].includes(schema["@type"]) && schema.url === SITE_URL + path), path + " page entity");
  let questions = 0;
  for (const schema of schemas.filter((schema) => schema["@type"] === "FAQPage")) {
    for (const item of schema.mainEntity) {
      assert.ok(text(main).includes(item.name.replace(/\s+/g, " ").trim()), path + " FAQ question in HTML: " + item.name);
      assert.ok(text(main).includes(item.acceptedAnswer.text.replace(/\s+/g, " ").trim()), path + " FAQ answer in HTML: " + item.name);
      questions++;
    }
  }
  if (!slug) {
    const copy = lang === "en" ? en : gr;
    assert.equal(questions, copy.faq.items.length, path + " all homepage FAQ items");
    const faqSection = main.match(/<section\b[^>]*\bid="faq"[^>]*>([\s\S]*?)<\/section>/i)?.[1] || "";
    assert.equal((faqSection.match(/<summary\b/g) || []).length, copy.faq.items.length, path + " native FAQ controls");
    for (const [name, agent] of Object.entries(agents)) {
      const crawlerMain = clean(await request(path, agent)).match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
      assert.equal(text(crawlerMain), text(main), path + " same readable content for " + name);
    }
  }
  results.push({ path, title, mainTextCharacters: text(main).length, faqQuestions: questions });
}

const sitemapResponse = await fetch(base + "/sitemap.xml");
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
assert.equal((sitemap.match(/<loc>/g) || []).length, indexableRoutes.length, "sitemap route count");
for (const { path } of indexableRoutes) assert.ok(sitemap.includes(`<loc>${SITE_URL + path}</loc>`), path + " in sitemap");
assert.ok(!sitemap.includes("coming-soon"), "noindex routes excluded from sitemap");
assert.ok(sitemap.includes('hreflang="x-default"'), "sitemap language fallback");
const robotsResponse = await fetch(base + "/robots.txt");
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
assert.match(robots, /User-Agent: \*[\s\S]*Allow: \/\s/i, "public crawling allowed, including AI search bots");
assert.match(robots, /Disallow: \/api\//i, "API excluded");
assert.ok(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
for (const lang of locales) {
  const response = await fetch(base + pathFor(lang, "coming-soon"));
  assert.equal(response.status, 200);
  assert.match(await response.text(), /name="robots" content="noindex, follow"/);
  const image = await fetch(base + `/assets/img/og/og-image-${lang}.png`);
  assert.equal(image.status, 200, lang + " social image");
  assert.match(image.headers.get("content-type") || "", /image\//);
}
for (const path of ["/xx/", "/en/unknown/", "/en/about/extra/"]) {
  assert.equal((await fetch(base + path)).status, 404, path + " real 404");
}
await fs.mkdir("validation/seo", { recursive: true });
await fs.writeFile("validation/seo/results.json", JSON.stringify({ checkedAt: new Date().toISOString(), base, routes: results, userAgents: agents, passed: true }, null, 2) + "\n");
for (const lang of locales) await fs.writeFile(`validation/seo/${lang}.html`, clean(await request(pathFor(lang))));
console.log(`SEO checks passed: ${results.length} routes serve readable HTML, complete FAQs, metadata, canonical/hreflang links and page entities. Browser, Googlebot and OAI-SearchBot receive the same homepage content. Sitemap, robots, social images, noindex and 404 checks passed.`);
