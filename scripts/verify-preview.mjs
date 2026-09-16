import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
const base = process.env.PREVIEW_URL || "http://localhost:5174";
const locales = ["en", "gr"];
const slugs = [
  "",
  "platform",
  "book-demo",
  "terms",
  "privacy",
  "dpa",
  "cookies",
  "ai-policy",
  "trust",
  "ai-consulting",
  "ai-voice-agents",
  "chatbots",
  "crm-automation",
  "about",
  "pricing",
];
const routes = locales.flatMap((lang) =>
  slugs.map((slug) => `/${lang}/${slug ? slug + "/" : ""}`),
);
const headings = new Set(),
  titles = new Set();
let jsonldCount = 0;
const missingLinks = new Set();
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.match(
    html,
    new RegExp(`<html[^>]*lang="${route.startsWith("/gr/") ? "el" : "en"}"`),
    route + " language",
  );
  assert.match(
    html,
    new RegExp(`rel="canonical" href="https://aianchor.online${route}"`),
    route + " canonical",
  );
  for (const [lang, code] of [
    ["en", "en"],
    ["gr", "el"],
  ])
    assert.ok(
      html.includes(
        `hrefLang="${code}" href="https://aianchor.online/${lang}/${route
          .split("/")
          .slice(2)
          .join("/")}"`,
      ),
      route + " reciprocal " + code,
    );
  assert.ok(html.includes('property="og:image"'), route + " social metadata");
  assert.ok(html.includes('name="description"'), route + " description");
  const title = html.match(/<title>([^]*?)<\/title>/)?.[1];
  assert.ok(title, route + " title");
  assert.ok(!titles.has(title), route + " unique title");
  titles.add(title);
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    route + " one main heading",
  );
  assert.match(html, /<main[^>]*id="main"/);
  assert.ok(!html.includes("REPLACE_ME"));
  assert.ok(!html.includes("0.4s"));
  assert.ok(!html.includes("+42%"));
  if (route === "/en/" || route === "/gr/") {
    for (const signature of [
      "operations-home",
      "home-process",
      "home-capabilities",
      "home-dashboard-points",
      "dash-preview",
      "home-final",
    ]) {
      assert.ok(
        html.includes(signature),
        route + " operations homepage: " + signature,
      );
    }
    for (const id of [
      "how-it-works",
      "services",
      "features",
      "setup",
      "pricing",
      "about",
      "faq",
      "contact",
    ]) {
      assert.equal(
        (html.match(new RegExp(`id="${id}"`, "g")) || []).length,
        1,
        route + " unique section " + id,
      );
    }
    assert.equal(
      (html.match(/<main\b[^>]*>([^]*?)<\/main>/)?.[1].match(/<form\b/g) || []).length,
      0,
      route + " demo booking lives on its dedicated page",
    );
    const main = html.match(/<main\b[^>]*>([^]*?)<\/main>/)?.[1] || "";
    assert.equal((main.match(/<section\b/g) || []).length, 10, route + " ten homepage sections");
    assert.equal((main.match(/class="home-capability\b/g) || []).length, 6, route + " six capabilities");
    for (const signature of ["scroll-hero", "scroll-hero-heading", "spotlight-card", "step-badge", "feature-wave", "connector-track"])
      assert.ok(main.includes(signature), route + " original visual styling retained: " + signature);
    assert.ok(!main.includes("—"), route + " no em dashes");
            if (route === "/en/") assert.ok(main.includes("Turn more enquiries into booked appointments."));
  }
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">([^]*?)<\/script>/g,
  )) {
    const schema = JSON.parse(match[1]);
    jsonldCount++;
    assert.ok(schema["@type"]);
    assert.ok(!schema.aggregateRating);
    if (schema["@type"] === "FAQPage")
      for (const item of schema.mainEntity) {
        assert.ok(
          html.includes(
            item.name
              .replaceAll("&", "&amp;")
              .replaceAll('"', "&quot;")
              .replaceAll("'", "&#x27;"),
          ),
          route + " FAQ question visible",
        );
      }
    if (schema["@type"] === "SoftwareApplication") {
      assert.equal(schema.name, "AiAnchor");
      assert.equal(route.split("/").length, 3);
    }
  }
  for (const [, href] of html.matchAll(/href="([^"#]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("/_next/")) continue;
    const destination = href.split(/[?#]/)[0];
    if (
      routes.includes(destination) ||
      destination.endsWith("/coming-soon/") ||
      destination === "/favicon.ico"
    )
      continue;
    missingLinks.add(destination);
  }
  headings.add(route);
}
for (const path of missingLinks) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, "internal link " + path);
}
for (const lang of locales) {
  let response = await fetch(base + `/${lang}/coming-soon/`);
  assert.equal(response.status, 200);
  assert.match(
    await response.text(),
    /name="robots" content="noindex, follow"/,
  );
  response = await fetch(base + `/${lang}/gdpr/`, { redirect: "manual" });
  assert.ok([301, 308].includes(response.status));
  assert.ok(response.headers.get("location").endsWith(`/${lang}/dpa/`));
  response = await fetch(base + `/${lang}`, { redirect: "manual" });
  assert.equal(response.status, 308);
}
for (const path of ["/xx/", "/en/unknown/", "/en/about/extra/"]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 404, path);
  assert.ok(
    (await response.text()).includes("Page not found"),
    path + " branded 404",
  );
}
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
assert.equal((sitemap.match(/<loc>/g) || []).length, 30);
assert.ok(!sitemap.includes("coming-soon"));
assert.ok(!sitemap.includes("<loc>https://aianchor.online/</loc>"));
const robots = await (await fetch(base + "/robots.txt")).text();
assert.match(robots, /Sitemap: https:\/\/aianchor.online\/sitemap.xml/);
const root = await (await fetch(base + "/")).text();
assert.match(root, /rel="canonical" href="https:\/\/aianchor.online\/gr\/"/);
const hostRedirect = await new Promise((resolve, reject) => {
  http
    .get(
      base + "/en/about/?source=preview",
      { headers: { Host: "www.aianchor.online" } },
      (response) => {
        response.resume();
        resolve(response);
      },
    )
    .on("error", reject);
});
assert.equal(hostRedirect.statusCode, 308);
assert.equal(
  hostRedirect.headers.location,
  "https://aianchor.online/en/about/?source=preview",
);
assert.equal(
  (await fetch(base + "/api/book-demo/", { method: "GET" })).status,
  405,
);
assert.equal((await fetch(base + "/api/chat/", { method: "GET" })).status, 405);
assert.equal(
  (
    await fetch(base + "/api/book-demo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://unrelated.example",
      },
      body: "{}",
    })
  ).status,
  403,
);
const summary = `Preview verified: ${headings.size} indexable pages, ${jsonldCount} parsed schemas, localized initial HTML, canonical/alternates/social metadata, sitemap, robots, internal links, 404s, redirects and safe API rejection. No external submissions.\n`;
fs.mkdirSync("validation", { recursive: true });
fs.writeFileSync("validation/preview.txt", summary);
console.log(summary);
