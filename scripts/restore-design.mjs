// Compile the approved local layouts into native React elements. No HTML parser
// or legacy browser handlers are shipped. Run again after editing source copy.
import fs from "node:fs";
import en from "../content/en.mjs";
import gr from "../content/gr.mjs";
import * as templates from "../templates/sections.mjs";
import { renderFooter } from "../templates/layout.mjs";

const renderers = {
  process: templates.renderHowItWorks,
  services: templates.renderServices,
  consulting: templates.renderConsulting,
  voice: templates.renderVoiceAgentFull,
  features: templates.renderFeatures,
  about: templates.renderAbout,
  contact: templates.renderContact,
  faq: templates.renderFaq,
  footer: renderFooter,
};
const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
const attributeNames = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  viewbox: "viewBox",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  preserveAspectRatio: "preserveAspectRatio",
};
const decode = (value) =>
  value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (_, code) =>
    code.startsWith("#")
      ? String.fromCodePoint(
          code[1].toLowerCase() === "x"
            ? parseInt(code.slice(2), 16)
            : Number(code.slice(1)),
        )
      : { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" }[
          code.toLowerCase()
        ],
  );
function parse(html) {
  const root = { tag: "", attrs: {}, children: [] };
  const stack = [root];
  for (const token of html.matchAll(
    /<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|[^<]+/g,
  )) {
    const value = token[0];
    if (value.startsWith("<!--")) continue;
    if (value.startsWith("</")) {
      const expected = value.slice(2, -1).trim();
      const closed = stack.pop();
      if (closed.tag !== expected)
        throw new Error(`Unbalanced ${closed.tag}/${expected}`);
    } else if (value.startsWith("<")) {
      const tag = /^<([^\s/>]+)/.exec(value)[1];
      const attrs = {};
      const rest = value.slice(tag.length + 1).replace(/\/?\s*>$/, "");
      for (const match of rest.matchAll(
        /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+)))?/g,
      ))
        attrs[match[1]] = decode(match[2] ?? match[3] ?? match[4] ?? "");
      const node = { tag, attrs, children: [] };
      stack.at(-1).children.push(node);
      if (!voidTags.has(tag) && !value.endsWith("/>")) stack.push(node);
    } else if (value.trim())
      stack.at(-1).children.push(decode(value.replace(/\s+/g, " ")));
  }
  if (stack.length !== 1) throw new Error("Unclosed template tags");
  return root.children;
}
function emit(node, section, locale) {
  if (typeof node === "string") return `{${JSON.stringify(node)}}`;
  if (node.attrs["data-cookie-settings"] !== undefined)
    return "<CookieSettings label={cookieLabel} />";
  if (node.attrs.id === "contact-form") node.children = ["__CONTACT_SLOT__"];
  if (node.attrs.class?.includes("cookie-settings-item"))
    delete node.attrs.class;
  let attributes = "";
  for (const [name, value] of Object.entries(node.attrs)) {
    if (/^on/i.test(name)) throw new Error("Inline handlers are not allowed");
    if (name === "style") {
      const style = Object.fromEntries(
        value
          .split(";")
          .filter(Boolean)
          .map((part) => {
            const colon = part.indexOf(":");
            const key = part.slice(0, colon).trim();
            return [
              key.startsWith("--")
                ? key
                : key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
              part.slice(colon + 1).trim(),
            ];
          }),
      );
      attributes += ` style={${JSON.stringify(style)} as CSSProperties}`;
    } else
      attributes += ` ${attributeNames[name] ?? name}={${JSON.stringify(
        value,
      )}}`;
  }
  if (
    node.tag === "svg" &&
    !("aria-label" in node.attrs) &&
    !("aria-hidden" in node.attrs)
  )
    attributes += ' aria-hidden="true"';
  if (voidTags.has(node.tag)) return `<${node.tag}${attributes} />`;
  let children = node.children
    .map((child) =>
      child === "__CONTACT_SLOT__"
        ? "{children}"
        : emit(child, section, locale),
    )
    .join("\n");
  if (section === "services" && node.tag === "section")
    children +=
      '\n<div className="mx-auto max-w-8xl px-6"><ServiceLinks lang={lang} /></div>';
  if (section === "features" && node.tag === "section")
    children += `\n<div className="mx-auto mt-8 max-w-8xl px-6 text-sm text-gray-300"><p>{${JSON.stringify(
      locale.comingSoon.body,
    )}}</p><a className="mt-4 inline-flex min-h-11 items-center text-primary underline" href="https://app.aianchor.online">{${JSON.stringify(
      locale.nav.clientLogin,
    )}}</a></div>`;
  if (section === "about" && node.tag === "section")
    children += `\n<div className="mx-auto max-w-5xl px-6"><a href={pathFor(lang,'about')} className="mt-8 inline-flex min-h-11 items-center text-primary underline">{${JSON.stringify(
      locale.lang === "en" ? "Learn more" : "Μάθετε περισσότερα",
    )}}</a></div>`;
  return `<${node.tag}${attributes}>\n${children}\n</${node.tag}>`;
}
let output = `// Generated by scripts/restore-design.mjs from the approved local templates.\n// Edit templates/sections.mjs or content/*, then run npm run design:sync.\nimport type { CSSProperties, ReactNode } from 'react';\nimport type { Locale } from '../lib/routes';\nimport { pathFor } from '../lib/routes';\nimport { CookieSettings } from './consent';\nimport { ServiceLinks } from './marketing';\nexport type RestoredSectionName = ${Object.keys(
  renderers,
)
  .map((key) => JSON.stringify(key))
  .join(
    " | ",
  )};\nexport function RestoredSection({lang,section,children,cookieLabel='Cookie settings'}: {lang:Locale;section:RestoredSectionName;children?:ReactNode;cookieLabel?:string}) {\n`;
for (const locale of [en, gr]) {
  output += `if (lang === ${JSON.stringify(
    locale.lang,
  )}) { switch(section) {\n`;
  for (const [section, renderer] of Object.entries(renderers)) {
    let html = renderer(locale, locale.lang);
    // Preserve layout while localizing fixed labels present in the old templates.
    if (locale.lang === "gr")
      html = html
        .replaceAll(">SOLUTION<", ">ΛΥΣΗ<")
        .replaceAll(">OUTCOME<", ">ΑΠΟΤΕΛΕΣΜΑ<")
        .replaceAll(">Deliverables<", ">Παραδοτέα<")
        .replaceAll(">Timeline<", ">Χρονοδιάγραμμα<");
    output += `case ${JSON.stringify(section)}: return (<>${parse(html)
      .map((node) => emit(node, section, locale))
      .join("\n")}</>);\n`;
  }
  output += "} }\n";
}
output += "return null;\n}\n";
fs.writeFileSync("components/restored-sections.tsx", output, "utf8");
console.log(
  "Restored nine original section layouts in both languages as native React elements.",
);
