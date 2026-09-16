import { notFound } from "next/navigation";
import Script from "next/script";
import { getContent, labels } from "../../lib/content";
import {
  isLocale,
  isSlug,
  slugs,
  locales,
  legalSlugs,
  pathFor,
  type Locale,
  type Slug,
} from "../../lib/routes";
import { metadataFor, schemasFor } from "../../lib/seo";
import { Navigation } from "../../components/navigation";
import { Consent } from "../../components/consent";
import { Chat } from "../../components/chat";
import {
  Home,
  PlatformPage,
  Comparison,
  Footer,
  DetailPage,
  BookingPage,
  LegalPage,
  PageIntro,
} from "../../components/marketing";
import { Pricing } from "../../components/pricing";
import { Action } from "../../components/ui";
type Params = { path?: string[] };
function route(path: string[] = []): {
  lang: Locale;
  slug: Slug;
  root: boolean;
} {
  if (!path.length) return { lang: "gr", slug: "", root: true };
  if (path.length > 2 || !isLocale(path[0]) || !isSlug(path[1] || ""))
    notFound();
  return { lang: path[0], slug: (path[1] || "") as Slug, root: false };
}
// Known marketing routes stay prerendered; invalid paths reach our branded 404.
export const dynamicParams = true;
export function generateStaticParams() {
  return [
    { path: [] },
    ...locales.flatMap((lang) =>
      slugs.map((slug) => ({ path: slug ? [lang, slug] : [lang] })),
    ),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { path } = await params;
  const { lang, slug } = route(path);
  return metadataFor(lang, slug);
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { path } = await params;
  const { lang, slug, root } = route(path);
  const t = getContent(lang);
  let content;
  if (!slug) content = <Home lang={lang} />;
  else if (slug === "platform") content = <PlatformPage lang={lang} />;
  else if (slug === "book-demo") content = <BookingPage lang={lang} />;
  else if (slug === "coming-soon")
    content = (
      <main id="main">
        <PageIntro title={t.comingSoon.heading} lead={t.comingSoon.body}>
          <div className="mt-8 mb-12">
            <Action href={pathFor(lang, "book-demo")}>
              {t.comingSoon.ctaPrimary}
            </Action>
            <a
              className="ml-6 text-primary underline"
              href={`${pathFor(lang)}#pricing`}
            >
              {t.comingSoon.ctaSecondary}
            </a>
          </div>
        </PageIntro>
      </main>
    );
  else if (slug === "pricing")
    content = (
      <main id="main">
        <PageIntro title={t.nav.pricing} lead={labels[lang].pricing} />
        <Pricing lang={lang} copy={t.pricing} />
        <Comparison lang={lang} t={t} />
      </main>
    );
  else if (legalSlugs.includes(slug as (typeof legalSlugs)[number]))
    content = <LegalPage lang={lang} slug={slug} />;
  else content = <DetailPage lang={lang} slug={slug} />;
  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>
      <Consent lang={lang} copy={t.cookieConsent} />
      <Navigation lang={lang} slug={slug} copy={t.nav} />
      {content}
      <Footer lang={lang} copy={t} />
      <Chat lang={lang} copy={t.assistant} />
      {schemasFor(lang, slug).map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      {root && (
        <Script
          id="root-language"
          strategy="beforeInteractive"
        >{`try { var lang=localStorage.getItem('aianchor-lang') || navigator.language || ''; if(lang.toLowerCase().indexOf('en')===0) location.replace('/en/'); } catch(e) {}`}</Script>
      )}
    </>
  );
}
