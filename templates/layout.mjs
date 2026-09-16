import { SITE_URL, LANGS } from './config.mjs';
import { iconMarkup } from './icons.mjs';

function hreflangTags(urlPathByLang, rootIsGr) {
  const tags = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l === 'gr' ? 'el' : l}" href="${SITE_URL}${urlPathByLang(l)}" />`
  );
  tags.push(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${urlPathByLang(rootIsGr ? 'gr' : 'gr')}" />`);
  return tags.join('\n    ');
}

export function renderHead({ title, description, canonical, urlPathByLang, ogImage, locale, jsonLd, extraHead = '', robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', assetVersion = '' }) {
  return `<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${SITE_URL}${canonical}" />
    ${hreflangTags(urlPathByLang, true)}

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE_URL}${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${SITE_URL}${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="AiAnchor" />
    <meta property="og:locale" content="${locale}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${SITE_URL}${ogImage}" />

    <meta name="theme-color" content="#050507" />
    <link rel="icon" href="/favicon.ico" sizes="any" />

    <!-- Brand typefaces: DM Sans body + Space Grotesk display (ui-ux-pro-max pairing for AI/SaaS). Preconnect + swap keeps first paint unblocked. -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" /></noscript>

    <link rel="stylesheet" href="/assets/css/styles.css${assetVersion ? `?v=${assetVersion}` : ''}" />

    ${jsonLd}
    ${extraHead}`;
}

export function renderNav(content, lang, appUrl, otherLangHref) {
  const other = lang === 'en' ? 'gr' : 'en';
  const home = `/${lang}/`;
  const otherHref = otherLangHref || `/${other}/`;
  const otherHreflang = other === 'en' ? 'en' : 'el';
  // Client Login goes straight to the app (APP_URL); the coming-soon page stays as the
  // fallback so the link is never dead if the app URL isn't configured for a build.
  const loginHref = appUrl || `${home}coming-soon/`;
  // Compact pill showing the OTHER language's code — small enough to sit beside the CTA
  // without competing with it. data-lang-switch lets main.js append the current #hash
  // (when present) so switching languages preserves the section you're on.
  const langSwitch = (extraClass) =>
    `<a href="${otherHref}" data-lang-switch class="lang-switch btn-interactive shrink-0 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-gray-300 hover:border-primary/50 hover:text-primary ${extraClass}" hreflang="${otherHreflang}" aria-label="${content.nav.langSwitchLabel}">${other.toUpperCase()}</a>`;
  return `<header class="site-nav fixed top-0 inset-x-0 z-50">
    <nav class="mx-auto flex max-w-8xl items-center justify-between px-6" aria-label="Primary">
      <a href="${home}" class="flex items-center gap-2 group">
        <span class="rounded-lg bg-gradient-to-tr from-primary to-secondary p-2 transition-shadow group-hover:shadow-[0_0_20px_rgba(0,240,255,0.45)]">
          ${iconMarkup('anchor', 'w-5 h-5 text-white')}
        </span>
        <span class="font-display font-bold tracking-wider text-white">AI <span class="text-primary">ANCHOR</span></span>
      </a>

      <div class="flex items-center gap-3 xl:hidden">
        ${langSwitch('')}
        <button id="nav-toggle" type="button" class="p-2 text-white relative z-50" aria-expanded="false" aria-controls="mobile-menu">
          <span class="sr-only">Menu</span>
          ${iconMarkup('menu', 'w-6 h-6 nav-open-icon')}
          ${iconMarkup('close', 'w-6 h-6 nav-close-icon hidden')}
        </button>
      </div>

      <div class="hidden xl:flex items-center gap-4 text-[13px] whitespace-nowrap">
        <a href="${home}#services" class="nav-link text-gray-300 hover:text-white">${content.nav.services}</a>
        <a href="${home}#consulting" class="nav-link text-gray-300 hover:text-white">${content.nav.consulting}</a>
        <a href="${home}#voice-agent" class="nav-link text-gray-300 hover:text-white">${content.nav.voiceAgent}</a>
        <a href="${home}#features" class="nav-link text-gray-300 hover:text-white">${content.nav.commandHub}</a>
        <a href="${home}#pricing" class="nav-link text-gray-300 hover:text-white">${content.nav.pricing}</a>
        <a href="${home}#faq" class="nav-link text-gray-300 hover:text-white">${content.nav.faq}</a>
        <a href="${home}#about" class="nav-link text-gray-300 hover:text-white">${content.nav.about}</a>
        <a href="${loginHref}" class="nav-link text-gray-300 hover:text-white">${content.nav.clientLogin}</a>
        ${langSwitch('')}
      </div>
    </nav>
  </header>

  <!--
    Deliberately a SIBLING of <header>, not a child: once scrolled the header gets
    backdrop-filter, which makes it the containing block for any position:fixed
    descendant - the overlay would then size itself to the nav bar instead of the
    viewport. Kept below the header's z-50 so the close button stays clickable.
  -->
  <div id="mobile-menu" class="mobile-menu flex flex-col gap-1 fixed inset-0 z-40 bg-dark-900 px-8 pt-28 pb-10 xl:hidden" aria-hidden="true">
      <a href="${home}#services" class="mobile-menu-link border-b border-white/5 py-4 text-2xl font-display font-medium text-gray-300">${content.nav.services}</a>
      <a href="${home}#consulting" class="mobile-menu-link border-b border-white/5 py-4 text-2xl font-display font-medium text-gray-300">${content.nav.consulting}</a>
      <a href="${home}#voice-agent" class="mobile-menu-link border-b border-white/5 py-4 text-2xl font-display font-medium text-gray-300">${content.nav.voiceAgent}</a>
      <a href="${home}#features" class="mobile-menu-link border-b border-white/5 py-4 text-2xl font-display font-medium text-gray-300">${content.nav.commandHub}</a>
      <a href="${home}#pricing" class="mobile-menu-link border-b border-white/5 py-4 text-2xl font-display font-medium text-gray-300">${content.nav.pricing}</a>
      <a href="${home}#faq" class="mobile-menu-link border-b border-white/5 py-4 text-2xl font-display font-medium text-gray-300">${content.nav.faq}</a>
      <a href="${home}#about" class="mobile-menu-link border-b border-white/5 py-4 text-2xl font-display font-medium text-gray-300">${content.nav.about}</a>
      <a href="${loginHref}" class="mobile-menu-link border-b border-white/5 py-4 text-2xl font-display font-medium text-gray-300">${content.nav.clientLogin}</a>
  </div>`;
}

export function renderFooter(content, lang) {
  const f = content.footer;
  const year = 2026;
  const link = (href, label) =>
    `<li><a href="${href}" class="link-hover inline-flex min-h-11 items-center hover:text-primary">${label}</a></li>`;
  return `<footer class="border-t border-white/[0.06] bg-dark-900">
    <div class="mx-auto max-w-8xl px-6 pb-10 pt-20">
      <div class="grid gap-14 md:grid-cols-12">
        <div class="md:col-span-5">
          <div class="flex items-center gap-2.5">
            <span class="rounded-lg bg-gradient-to-tr from-primary to-secondary p-1.5">${iconMarkup('anchor', 'w-[18px] h-[18px] text-white')}</span>
            <span class="font-display text-sm font-bold tracking-wider text-white">AI <span class="text-primary">ANCHOR</span></span>
          </div>
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">${f.tagline}</p>
          <div class="mt-6 flex gap-2 text-gray-400">
            <a href="${f.socials.instagram}" aria-label="Instagram" class="link-hover inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:text-primary">${iconMarkup('instagram', 'w-[18px] h-[18px]')}</a>
            <a href="${f.socials.linkedin}" aria-label="LinkedIn" class="link-hover inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:text-primary">${iconMarkup('linkedin', 'w-[18px] h-[18px]')}</a>
          </div>
        </div>

        <div class="grid gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <h3 class="text-sm font-medium text-white">${f.columns.product}</h3>
            <ul class="mt-3 text-sm text-gray-400">
              ${link(`/${lang}/#services`, lang === 'en' ? 'Platform' : 'Πλατφόρμα')}
              ${link(`/${lang}/ai-consulting/`, f.productLinks.consulting)}
              ${link(`/${lang}/ai-voice-agents/`, f.productLinks.voiceAgent)}
              ${link(`/${lang}/#features`, f.productLinks.commandHub)}
              ${link(`/${lang}/#pricing`, f.productLinks.pricing)}
              ${link(`/${lang}/#faq`, f.productLinks.faq)}
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-medium text-white">${f.columns.company}</h3>
            <ul class="mt-3 text-sm text-gray-400">
              ${link(`/${lang}/#about`, f.companyLinks.about)}
              ${link(`/${lang}/#contact`, f.companyLinks.contact)}
            </ul>
            ${
              f.companyDetails.lines.length
                ? `<div class="mt-6 space-y-1 text-xs leading-relaxed text-gray-400">
              ${f.companyDetails.lines.map((l) => `<p>${l}</p>`).join('\n              ')}
            </div>`
                : ''
            }
          </div>

          <div>
            <h3 class="text-sm font-medium text-white">${f.columns.legal}</h3>
            <ul class="mt-3 text-sm text-gray-400">
              ${link(`/${lang}/terms/`, f.legalLinks.terms)}
              ${link(`/${lang}/privacy/`, f.legalLinks.privacy)}
              ${link(`/${lang}/dpa/`, f.legalLinks.dpa)}
              ${link(`/${lang}/cookies/`, f.legalLinks.cookies)}
              ${link(`/${lang}/ai-policy/`, f.legalLinks.aiPolicy)}
              ${link(`/${lang}/trust/`, f.legalLinks.trust)}
              <!-- Consent must be as easy to withdraw as it was to give. Hidden without JS
                   (see .cookie-settings-item) since there is nothing to reopen in that case. -->
              <li class="cookie-settings-item"><button type="button" data-cookie-settings class="link-hover inline-flex min-h-11 items-center text-left hover:text-primary">${f.legalLinks.cookieSettings}</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-16 border-t border-white/[0.06] pt-8 text-xs text-gray-400">${f.copyright(year)}</div>
    </div>
  </footer>`;
}

export function rootRedirectScript() {
  return `<script>
    (function () {
      try {
        var stored = localStorage.getItem('aianchor-lang');
        var lang = stored || (navigator.language || '').toLowerCase();
        if (lang.indexOf('en') === 0) {
          location.replace('/en/');
        }
      } catch (e) {}
    })();
  </script>`;
}

export function htmlDocument({ htmlLang, dir, head, body }) {
  return `<!doctype html>
<html lang="${htmlLang}" dir="${dir}" class="scroll-smooth">
  <head>
    ${head}
  </head>
  <body class="bg-dark-900 font-sans text-white antialiased selection:bg-primary selection:text-dark-900">
    ${body}
  </body>
</html>
`;
}
