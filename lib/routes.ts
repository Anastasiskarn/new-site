export const SITE_URL = "https://aianchor.online";
export const APP_URL = "https://app.aianchor.online";
export const locales = ["en", "gr"] as const;
export type Locale = (typeof locales)[number];
export const legalSlugs = [
  "terms",
  "privacy",
  "dpa",
  "cookies",
  "ai-policy",
  "trust",
] as const;
export const detailSlugs = [
  "platform",
  "ai-consulting",
  "ai-voice-agents",
  "chatbots",
  "crm-automation",
  "about",
  "pricing",
] as const;
export const slugs = [
  "",
  "book-demo",
  "coming-soon",
  ...legalSlugs,
  ...detailSlugs,
] as const;
export type Slug = (typeof slugs)[number];
export const pathFor = (lang: Locale, slug: string = "") =>
  `/${lang}/${slug ? `${slug}/` : ""}`;
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const isSlug = (value: string): value is Slug =>
  slugs.includes(value as Slug);
export const indexableRoutes = locales.flatMap((lang) =>
  slugs
    .filter((slug) => slug !== "coming-soon")
    .map((slug) => ({ lang, slug, path: pathFor(lang, slug) })),
);
