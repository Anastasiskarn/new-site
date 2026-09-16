import type { Locale } from "./routes";
import grCopy from "../content/gr.mjs";
import enCopy from "../content/en.mjs";

// English copy is authored in content/en.mjs; adapt it to the same compact React layout.
const en = {
  nav: { platform: enCopy.nav.commandHub, process: enCopy.nav.consulting, pricing: enCopy.nav.pricing, about: enCopy.nav.about, login: enCopy.nav.clientLogin },
  demo: enCopy.hero.ctaPrimary,
  hero: {
    title: [enCopy.hero.headlineLine1, enCopy.hero.headlineLine2, enCopy.hero.headlineLine3].filter(Boolean).join(" "),
    body: enCopy.hero.subhead, secondary: enCopy.hero.ctaSecondary, integration: enCopy.voiceSystems.stackHeading,
  },
  process: {
    title: enCopy.consulting.heading,
    body: [enCopy.consulting.lead, enCopy.consulting.subhead].join(" "),
    steps: enCopy.consulting.steps.map(step => ({ title: step.title, body: step.desc })),
    close: enCopy.consulting.bannerHtml,
  },
  capabilities: {
    title: enCopy.services.heading,
    items: enCopy.services.items.map((item, i) => ({
      icon: ["sync", "follow", "book", "chart"][i], title: item.problemTitle,
      lead: [
        "The enquiry moves through email, spreadsheets and CRM. Somewhere along the way, the next step gets missed.",
        "Data entry, reminders and file updates take hours from your team.",
        "Plenty of tools and AI solutions. Which problem is worth solving first?",
        "Systems, activity and results live in different tools.",
      ][i],
      body: [
        "We connect your tools so information reaches the right place.",
        "We automate repetitive steps using your business rules.",
        "We map the process and put the improvements in order.",
        "See what is running and the key results in the AiAnchor Operations Platform.",
      ][i],
      slug: ["crm-automation", "crm-automation", "ai-consulting", "platform"][i],
    })),
  },
  dashboard: {
    title: enCopy.features.heading, body: enCopy.features.subhead, alt: enCopy.hero.visualAlt,
    caption: "AiAnchor dashboard. Displayed figures illustrate the interface, not promised results.",
    preview: {
      portal: "Client portal",
      workspace: "Workspace",
      nav: ["Dashboard", "Voice Agents", "Calls", "Bookings", "Leads", "Knowledge Base", "Settings"],
      search: "Search workspace",
      range: "Last 90 days",
      title: "AI Operations Overview",
      subtitle: "Your automations, leads and business impact in one place.",
      trend: "vs previous period",
      kpis: [
        { label: "Leads captured", value: "248", delta: "24%" },
        { label: "Booked appointments", value: "61", delta: "18%" },
        { label: "Pipeline value", value: "€184,200", delta: "12%" },
        { label: "Conversion rate", value: "24.6%", delta: "6%" },
      ],
      allTime: "All time",
      saved: [
        { label: "Hours saved", value: "132 h", delta: "21%" },
        { label: "Labour cost saved", value: "€3,960", delta: "21%" },
      ],
      pipeline: {
        title: "Lead pipeline",
        body: "How far your leads get, step by step",
        stages: [
          { label: "Captured", value: "248", share: "100%" },
          { label: "Contacted", value: "231", share: "93%" },
          { label: "Qualified", value: "118", share: "48%" },
          { label: "Booked", value: "61", share: "25%" },
        ],
        open: "Open pipeline",
      },
      activity: {
        title: "Recent activity",
        live: "Live",
        items: [
          { kind: "call", title: "Call analysed, positive", body: "Buyer asked about 2-bed flats in Glyfada", time: "2 min ago" },
          { kind: "book", title: "Viewing booked", body: "Thu 11:00, Kifisias Avenue listing", time: "14 min ago" },
          { kind: "missed", title: "Missed call recovered", body: "Follow-up SMS sent and the caller replied", time: "38 min ago" },
          { kind: "sync", title: "Lead synced to CRM", body: "Budget, area and timeline added", time: "1 h ago" },
        ],
      },
      chart: { title: "Leads over time", body: "Leads captured per week", total: "248", ticks: ["Wk 1", "Wk 4", "Wk 8", "Wk 12"] },
    },
    points: [0, 4, 2, 3, 6, 7].map(i => ({ title: enCopy.features.items[i].title, body: enCopy.features.items[i].desc })),
    close: enCopy.about.statCallout,
  },
  setup: {
    title: enCopy.howItWorks.heading,
    steps: enCopy.howItWorks.steps.map(step => ({ title: step.title, body: step.desc })),
    close: enCopy.howItWorks.subhead,
  },
  final: { title: enCopy.contact.panelHeading, body: enCopy.contact.panelSubhead, note: enCopy.bookDemo.noPressureNote },
  platform: { title: enCopy.features.heading, body: enCopy.features.subhead, details: enCopy.voiceSystems.heading, faq: enCopy.faq.heading },
  footer: enCopy.footer.tagline, meta: enCopy.meta.home,
};

// Greek marketing copy is authored once in content/gr.mjs; adapt it to the React layout.
const gr: typeof en = {
  nav: { platform: grCopy.nav.commandHub, process: grCopy.nav.consulting, pricing: grCopy.nav.pricing, about: grCopy.nav.about, login: grCopy.nav.clientLogin },
  demo: grCopy.hero.ctaPrimary,
  hero: {
    title: [grCopy.hero.headlineLine1, grCopy.hero.headlineLine2, grCopy.hero.headlineLine3].filter(Boolean).join(" "),
    body: grCopy.hero.subhead,
    secondary: grCopy.hero.ctaSecondary,
    integration: grCopy.voiceSystems.stackHeading,
  },
  process: {
    title: grCopy.consulting.heading,
    body: [grCopy.consulting.lead, grCopy.consulting.subhead].join(" "),
    steps: grCopy.consulting.steps.map(step => ({ title: step.title, body: step.desc })),
    close: grCopy.consulting.bannerHtml,
  },
  capabilities: {
    title: grCopy.services.heading,
    items: grCopy.services.items.map((item, i) => ({
      icon: ["sync", "follow", "book", "chart"][i],
      title: item.problemTitle,
      lead: [
        "Το αίτημα περνά από email, Excel και CRM. Κάπου στη μέση, το επόμενο βήμα μένει πίσω.",
        "Καταχωρίσεις, υπενθυμίσεις και ενημερώσεις αρχείων τρώνε ώρες από την ομάδα σου.",
        "Πολλά εργαλεία και AI λύσεις. Ποιο πρόβλημα αξίζει να λύσεις πρώτο;",
        "Συστήματα, δραστηριότητα και αποτελέσματα βρίσκονται σε διαφορετικά εργαλεία.",
      ][i],
      body: [
        "Συνδέουμε τα εργαλεία σου ώστε η πληροφορία να φτάνει εκεί που πρέπει.",
        "Αυτοματοποιούμε τα επαναλαμβανόμενα βήματα με τους κανόνες της επιχείρησής σου.",
        "Χαρτογραφούμε τη διαδικασία και βάζουμε τις αλλαγές σε σειρά.",
        "Βλέπεις τι τρέχει και τα βασικά αποτελέσματα στο AiAnchor Operations Platform.",
      ][i],
      slug: ["crm-automation", "crm-automation", "ai-consulting", "platform"][i],
    })),
  },
  dashboard: {
    title: grCopy.features.heading,
    body: grCopy.features.subhead,
    alt: grCopy.hero.visualAlt,
    caption: "Dashboard AiAnchor με ενδεικτικά δεδομένα. Οι αριθμοί δείχνουν το περιβάλλον χρήσης, όχι αποτελέσματα που σου υποσχόμαστε.",
    preview: {
      portal: "Χώρος πελάτη",
      workspace: "Χώρος εργασίας",
      nav: ["Πίνακας", "Φωνητικοί agents", "Κλήσεις", "Ραντεβού", "Αιτήματα", "Βάση γνώσεων", "Ρυθμίσεις"],
      search: "Αναζήτηση",
      range: "Τελευταίες 90 ημέρες",
      title: "Η εικόνα της δουλειάς σου",
      subtitle: "Οι αυτοματισμοί σου και η δραστηριότητά τους, συγκεντρωμένα.",
      trend: "σε σχέση με την προηγούμενη περίοδο",
      kpis: [
        { label: "Αιτήματα", value: "248", delta: "24%" },
        { label: "Κλεισμένα ραντεβού", value: "61", delta: "18%" },
        { label: "Αξία ευκαιριών", value: "184.200 €", delta: "12%" },
        { label: "Ποσοστό μετατροπής", value: "24,6%", delta: "6%" },
      ],
      allTime: "Συνολικά",
      saved: [
        { label: "Ώρες που εξοικονομήθηκαν", value: "132 ώρες", delta: "21%" },
        { label: "Εξοικονόμηση κόστους εργασίας", value: "3.960 €", delta: "21%" },
      ],
      pipeline: {
        title: "Πορεία αιτημάτων",
        body: "Από την πρώτη επαφή στο ραντεβού",
        stages: [
          { label: "Συλλογή", value: "248", share: "100%" },
          { label: "Επικοινωνία", value: "231", share: "93%" },
          { label: "Αξιολόγηση", value: "118", share: "48%" },
          { label: "Ραντεβού", value: "61", share: "25%" },
        ],
        open: "Ανοιχτές ευκαιρίες",
      },
      activity: {
        title: "Πρόσφατη δραστηριότητα",
        live: "Ζωντανά",
        items: [
          { kind: "call", title: "Η κλήση αναλύθηκε", body: "Αγοραστής ρώτησε για διαμέρισμα με 2 υπνοδωμάτια στη Γλυφάδα", time: "πριν 2 λ." },
          { kind: "book", title: "Κλείστηκε επίσκεψη", body: "Πέμ 11:00, ακίνητο στη Λεωφόρο Κηφισίας", time: "πριν 14 λ." },
          { kind: "missed", title: "Απάντηση μετά από αναπάντητη κλήση", body: "Στάλθηκε SMS και ο καλών απάντησε", time: "πριν 38 λ." },
          { kind: "sync", title: "Συγχρονισμός με CRM", body: "Προστέθηκαν προϋπολογισμός, περιοχή και χρονοδιάγραμμα", time: "πριν 1 ώρα" },
        ],
      },
      chart: { title: "Αιτήματα στον χρόνο", body: "Αιτήματα ανά εβδομάδα", total: "248", ticks: ["Εβδ. 1", "Εβδ. 4", "Εβδ. 8", "Εβδ. 12"] },
    },
    points: [0, 4, 2, 3, 6, 7].map(i => ({ title: grCopy.features.items[i].title, body: grCopy.features.items[i].desc })),
    close: grCopy.about.statCallout,
  },
  setup: {
    title: grCopy.howItWorks.heading,
    steps: grCopy.howItWorks.steps.map(step => ({ title: step.title, body: step.desc })),
    close: grCopy.howItWorks.subhead,
  },
  final: { title: grCopy.contact.panelHeading, body: grCopy.contact.panelSubhead, note: grCopy.bookDemo.noPressureNote },
  platform: { title: grCopy.features.heading, body: grCopy.features.subhead, details: grCopy.voiceSystems.heading, faq: grCopy.faq.heading },
  footer: grCopy.footer.tagline,
  meta: grCopy.meta.home,
};

export const homepageCopy = (lang: Locale) => lang === "en" ? en : gr;
