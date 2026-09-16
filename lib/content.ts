import en from "../content/en.mjs";
import gr from "../content/gr.mjs";
import type { Locale } from "./routes";
export type Content = Omit<typeof en, "footer"> & {
  footer: Omit<typeof en.footer, "copyright"> & { copyright: string };
};
export function getContent(lang: Locale): Content {
  const source = lang === "en" ? en : gr;
  return {
    ...source,
    footer: {
      ...source.footer,
      copyright: source.footer.copyright(new Date().getFullYear()),
    },
  } as Content;
}
export function plain(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}
export const labels = {
  en: {
    services: "Explore our services",
    process: "Setup and delivery",
    languages: "Languages and integrations",
    limitations: "Limits and human support",
    faq: "Questions about this service",
    pricing: "Pricing and conditions",
    included: "Included",
    unavailable: "Not included",
    illustrative:
      "Illustrative comparison; actual alternatives vary by provider, staffing and configuration.",
    demo: "Book a discovery call",
    learn: "Learn more",
    annual: "Billed annually",
    features: "Feature",
  },
  gr: {
    services: "Δες τι μπορούμε να αναλάβουμε",
    process: "Εγκατάσταση και υλοποίηση",
    languages: "Γλώσσες και συνδέσεις",
    limitations: "Τι χρειάζεται άνθρωπο",
    faq: "Τι θέλεις να μάθεις;",
    pricing: "Τιμές και προϋποθέσεις",
    included: "Περιλαμβάνεται",
    unavailable: "Δεν περιλαμβάνεται",
    illustrative:
      "Ενδεικτική σύγκριση· οι εναλλακτικές διαφέρουν ανά πάροχο, στελέχωση και διαμόρφωση.",
    demo: "Κλείσε discovery call",
    learn: "Δες περισσότερα",
    annual: "Ετήσια χρέωση",
    features: "Λειτουργία",
  },
};
