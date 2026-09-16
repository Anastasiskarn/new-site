import type { Metadata } from "next";
import { getContent, plain } from "./content";
import { getDetail } from "./details";
import { SITE_URL, pathFor, type Locale, type Slug } from "./routes";
import { homepageCopy } from "./homepage";
export function metadataFor(lang: Locale, slug: Slug): Metadata {
  const t = getContent(lang),
    detail = getDetail(lang, slug);
  const key =
    slug === ""
      ? "home"
      : slug === "book-demo"
        ? "bookDemo"
        : slug === "coming-soon"
          ? "comingSoon"
          : slug;
  const known = t.meta[key as keyof typeof t.meta];
  const title =
    slug === "pricing"
      ? lang === "en"
        ? "AiAnchor pricing | Implementation and ongoing support"
        : "Τιμές AiAnchor | Συστήματα AI και αυτοματισμοί"
      : detail
        ? `${detail.title} | AiAnchor`
        : slug === "" ? homepageCopy(lang).meta.title
        : slug === "platform" ? `${homepageCopy(lang).nav.platform} | AiAnchor`
        : known?.title;
  const description =
    slug === "pricing"
      ? [t.pricing.subhead, t.pricing.note, t.pricing.vatNote].join(" ")
      : slug === "" ? homepageCopy(lang).meta.description
      : slug === "platform" ? homepageCopy(lang).platform.body
      : detail?.description || known?.description;
  const canonical = SITE_URL + pathFor(lang, slug),
    image = SITE_URL + `/assets/img/og/og-image-${lang}.png`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        en: SITE_URL + pathFor("en", slug),
        el: SITE_URL + pathFor("gr", slug),
        "x-default": SITE_URL + pathFor("gr", slug),
      },
    },
    robots: {
      index: slug !== "coming-soon",
      follow: true,
      googleBot: { index: slug !== "coming-soon", follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: "AiAnchor",
      locale: lang === "gr" ? "el_GR" : "en_US",
      alternateLocale: lang === "gr" ? "en_US" : "el_GR",
      images: [{ url: image, alt: "AiAnchor" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export function schemasFor(lang: Locale, slug: Slug) {
  const t = getContent(lang),
    detail = getDetail(lang, slug),
    url = SITE_URL + pathFor(lang, slug);
  const language = lang === "gr" ? "el" : "en";
  const organizationId = SITE_URL + "/#organization";
  const websiteId = SITE_URL + "/#website";
  const metadata = metadataFor(lang, slug);
  const schemas: Record<string, unknown>[] = [{
    "@context": "https://schema.org",
    "@type": slug === "about" ? "AboutPage" : slug === "book-demo" ? "ContactPage" : "WebPage",
    "@id": url + "#webpage",
    url,
    name: metadata.title,
    description: metadata.description,
    inLanguage: language,
    isPartOf: { "@id": websiteId },
    publisher: { "@id": organizationId },
  }];
  if (slug === "") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: "AiAnchor",
      url: SITE_URL,
      email: t.footer.contactEmail,
      sameAs: Object.values(t.footer.socials),
      areaServed: { "@type": "Country", name: "Greece" },
    });
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: "AiAnchor",
      url: SITE_URL,
      inLanguage: ["en", "el"],
      publisher: { "@id": organizationId },
    });
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": url + "#software",
      name: "AiAnchor",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: url + "#features",
      description: homepageCopy(lang).meta.description,
      inLanguage: language,
      publisher: { "@id": organizationId },
    });
  }
  if (detail && slug !== "about")
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: detail.title,
      description: detail.description,
      url,
      provider: { "@type": "Organization", "@id": organizationId, name: "AiAnchor", url: SITE_URL },
      areaServed: { "@type": "Country", name: "Greece" },
      availableLanguage: ["en", "el"],
    });
  const faqs = slug === "platform" || !slug ? t.faq.items : detail?.faqs;
  if (faqs?.length)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": url + "#faq",
      url: url + "#faq",
      inLanguage: language,
      isPartOf: { "@id": url + "#webpage" },
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: plain(item.q),
        acceptedAnswer: { "@type": "Answer", text: plain(item.a) },
      })),
    });
  return schemas;
}
