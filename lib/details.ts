import type { Locale } from "./routes";
import { getContent, plain } from "./content";
export type Detail = {
  title: string;
  description: string;
  intro: string;
  audience: string;
  process: string;
  integrations: string;
  pricing: string;
  limits: string;
  faqs: { q: string; a: string }[];
};
const extra = {
  en: {
    "ai-consulting": [
      "AI consulting for service businesses",
      "Map your lead flow, identify manual work and agree an AI roadmap before committing to implementation.",
      "For service businesses evaluating missed enquiries, slow follow-up or manual onboarding. The engagement starts with the workflow you already use and the information you can supply.",
      "We map enquiry sources and handoffs, estimate the cost of gaps using your figures, and prioritise opportunities by impact and effort. You receive an audit, a ranked roadmap and proposed success metrics. Implementation and team training follow only for the agreed scope.",
      "Discovery covers phone, website and WhatsApp enquiries, your CRM, calendar and onboarding steps. Greek and English are the default languages for agents; additional languages and tool compatibility are agreed during scoping.",
      "The audit and roadmap can be commissioned separately; standalone consulting pricing is not listed. Plan-based audit sessions are described in the pricing table. Custom CRMs, websites and internal tools are quoted separately.",
      "Business-case estimates depend on your data and assumptions. A roadmap is not a guarantee of revenue or savings. Human owners approve the scope, knowledge and escalation rules.",
    ],
    "ai-voice-agents": [
      "AI voice agents for calls, qualification and booking",
      "Answer inbound calls, capture enquiries and arrange appointments with Greek and English voice agents.",
      "For businesses that receive appointment or service enquiries by phone and need support when staff are busy or outside opening hours.",
      "We agree the call flow, load approved services and policies, configure qualifying questions and booking rules, and test calls before launch. Existing numbers can be forwarded or ported subject to provider arrangements. Calls produce summaries and lead records for review.",
      "Greek and English are the default setup. Additional languages and language switching are configured and tested for the agreed use case. Calendar and CRM connections are scoped around your tools, including Google Calendar, Outlook, Cal.com and HubSpot.",
      "Starter is €149/month before VAT with 150 minutes; Growth is €349 with 400 minutes; Pro is €699 with 1,000 minutes. Overage is €0.60, €0.45 and €0.35 per minute respectively. See pricing for annual rates, setup and trial conditions.",
      "AI can mishear or give an imperfect answer. It is not an emergency service and does not provide professional medical, legal or financial advice. A human path uses transfer, callback or contact details according to configuration; confirm availability for your plan.",
    ],
    chatbots: [
      "Website and WhatsApp chatbots",
      "Answer service questions from approved business content and capture leads across website chat and WhatsApp.",
      "For businesses receiving repeated questions about services, pricing or availability and enquiries that need qualification before a person follows up.",
      "We organise your approved information, agree lead fields and handoff rules, install the website widget or scope the WhatsApp connection, and test answers and routing. The chatbot and voice agent can share the same knowledge base so updates stay consistent.",
      "Greek and English content is prepared and tested for the agreed channels. Website, WhatsApp, CRM and calendar access are confirmed during setup. Tool compatibility and any third-party account requirements are scoped before launch.",
      "Website chatbot is included from Growth (€349/month before VAT); website and WhatsApp chatbots are listed on Pro (€699). These are service plans, not standalone chatbot quotes. See pricing for setup, annual billing and the Growth-only trial.",
      "Approved content reduces unsupported answers but cannot eliminate AI errors. Requests outside scope go to a person. WhatsApp delivery depends on channel/provider configuration; confirm account approvals, messaging rules and any third-party charges during scoping.",
    ],
    "crm-automation": [
      "CRM and workflow automation",
      "Connect lead qualification, onboarding, follow-ups and calendar reminders to the workflow your team uses.",
      "For teams that copy enquiry details between tools, chase onboarding by email or rely on staff to remember each follow-up.",
      "We map triggers, required fields and ownership, then define qualification and routing rules. Agreed flows can collect client details, send documents, book kickoffs, update CRM records and notify staff. We test each handoff and train your team before launch.",
      "Integration planning can cover Airtable, Google Sheets, Google Calendar, Cal.com, Outlook and HubSpot. Compatibility depends on account access and the agreed scope. Greek and English messages are prepared for the workflows that need them.",
      "Growth includes qualification/routing and two automation templates. Pro includes onboarding and up to six custom automations. Scale starts from €1,500/month, quote-based. Custom systems are quoted separately; see the full plan conditions.",
      "An automation depends on valid inputs, permissions and third-party availability. Exceptions and decisions outside approved rules need a human owner. Scope retry handling, notifications and escalation for your workflow rather than assuming every integration is supported.",
    ],
    about: [
      "About AiAnchor",
      "AiAnchor combines AI consulting with managed voice agents, chatbots and business workflow automation.",
      "AiAnchor serves businesses assessing how to handle calls, chats, qualification, onboarding and follow-up with less manual work.",
      "The same engagement can cover audit, roadmap, implementation, training and ongoing optimisation. The Command Hub is the reporting product for the agents and automations configured for your account.",
      "Greek and English are the primary agent setup. Integrations are scoped around your existing CRM and calendar; the listed tools include Airtable, Sheets, Google Calendar, Cal.com, Outlook and HubSpot.",
      "Managed plans start at €149/month before VAT. Standalone consulting and custom builds are scoped separately. A free demo is available; the Growth trial lasts 14 days from activation and requires a request.",
      "Product illustrations show example workflows, not verified customer results. For company registration details or a service-specific commitment, contact info@aianchor.online. Review the published policy drafts before agreeing service terms.",
    ],
  },
  gr: {
    "ai-consulting": [
      "Συμβουλευτική AI για επιχειρήσεις υπηρεσιών",
      "Δες πού χάνεται χρόνος και πού μπορεί να βοηθήσει το AI. Σχεδιάζουμε τα επόμενα βήματα πριν ξεκινήσει η υλοποίηση.",
      "Χάνονται αιτήματα; Αργείς να απαντήσεις; Η ένταξη κάθε νέου πελάτη γίνεται με το χέρι; Ξεκινάμε από τον τρόπο που δουλεύει η επιχείρησή σου και τα στοιχεία που μπορείς να μας δώσεις.",
      "Βλέπουμε από πού έρχονται τα αιτήματα και πώς περνούν από τον έναν υπεύθυνο στον άλλο. Με τα δικά σου στοιχεία εκτιμούμε το κόστος των κενών και βάζουμε προτεραιότητες με βάση το όφελος και τη δουλειά που απαιτείται. Παίρνεις την ανάλυση, ένα πλάνο με σειρά προτεραιότητας και προτεινόμενους δείκτες για να μετράς την πρόοδο. Υλοποίηση και εκπαίδευση γίνονται μόνο για όσα συμφωνήσουμε.",
      "Εξετάζουμε τα αιτήματα από τηλέφωνο, ιστοσελίδα και WhatsApp, μαζί με το CRM, το ημερολόγιο και τα βήματα ένταξης νέων πελατών. Οι agents ξεκινούν με ελληνικά και αγγλικά. Συμφωνούμε από την αρχή ποιες επιπλέον γλώσσες χρειάζεσαι και ποια εργαλεία μπορούν να συνδεθούν.",
      "Η ανάλυση διαδικασιών είναι δωρεάν. Βρίσκουμε τι καθυστερεί τη δουλειά σου και προτείνουμε τα επόμενα βήματα. Αν προχωρήσουμε σε διαχειριζόμενα συστήματα, η συνεργασία ξεκινά από €349/μήνα χωρίς ΦΠΑ. Συμφωνούμε πρώτα τι θα υλοποιήσουμε και τι υποστήριξη χρειάζεται. Τα ειδικά έργα κοστολογούνται χωριστά, κατόπιν προσφοράς.",
      "Οι εκτιμήσεις εξαρτώνται από τα στοιχεία και τις παραδοχές σου. Το πλάνο δεν εγγυάται έσοδα ή εξοικονόμηση. Οι υπεύθυνοι της επιχείρησής σου εγκρίνουν τι θα υλοποιηθεί, ποιες πληροφορίες θα χρησιμοποιεί το AI και πότε θα παραπέμπει σε άνθρωπο.",
    ],
    "ai-voice-agents": [
      "Φωνητικοί AI agents για κλήσεις και ραντεβού",
      "Ένας AI agent απαντά στις κλήσεις σου, καταγράφει αιτήματα και κλείνει ραντεβού. Στα ελληνικά και στα αγγλικά.",
      "Το τηλέφωνο χτυπά ενώ η ομάδα σου εξυπηρετεί πελάτες ή έχει σχολάσει; Οι φωνητικοί agents καλύπτουν κλήσεις για τις υπηρεσίες σου και αιτήματα για ραντεβού.",
      "Συμφωνούμε πώς θα κυλά η κλήση. Δίνουμε στον agent τις πληροφορίες για υπηρεσίες και πολιτικές που έχεις εγκρίνει. Ορίζουμε τις ερωτήσεις αξιολόγησης και τους κανόνες κρατήσεων, και κάνουμε δοκιμαστικές κλήσεις πριν ξεκινήσει. Μπορείς να προωθήσεις ή να μεταφέρεις τον υπάρχοντα αριθμό σου, ανάλογα με τις ρυθμίσεις του παρόχου. Μετά τις κλήσεις έχεις περιλήψεις και καταγεγραμμένα στοιχεία ενδιαφερομένων για έλεγχο.",
      "Η βασική ρύθμιση περιλαμβάνει ελληνικά και αγγλικά. Ρυθμίζουμε και δοκιμάζουμε επιπλέον γλώσσες και εναλλαγή γλώσσας για τη χρήση που συμφωνούμε. Σχεδιάζουμε τις συνδέσεις με το CRM και το ημερολόγιό σου, όπως Google Calendar, Outlook, Cal.com και HubSpot.",
      "Ξεκινάμε με δωρεάν ανάλυση της διαδικασίας σου. Τα διαχειριζόμενα συστήματα ξεκινούν από €349/μήνα χωρίς ΦΠΑ και μπορούν να περιλαμβάνουν φωνητικούς AI agents όπου χρειάζονται. Συμφωνούμε τη χρήση, τις συνδέσεις και την υποστήριξη πριν την υλοποίηση. Τα ειδικά έργα κοστολογούνται χωριστά, κατόπιν προσφοράς.",
      "Το AI μπορεί να ακούσει λάθος ή να δώσει ελλιπή απάντηση. Δεν είναι υπηρεσία έκτακτης ανάγκης και δεν παρέχει επαγγελματικές ιατρικές, νομικές ή οικονομικές συμβουλές. Η σύνδεση με άνθρωπο γίνεται με μεταφορά κλήσης, επανάκληση ή στοιχεία επικοινωνίας, ανάλογα με τη ρύθμιση. Επιβεβαίωσε τι είναι διαθέσιμο στο πακέτο σου.",
    ],
    chatbots: [
      "Chatbots για ιστοσελίδα και WhatsApp",
      "Το chatbot απαντά για τις υπηρεσίες σου με τις πληροφορίες που έχεις εγκρίνει. Καταγράφει ενδιαφερόμενους από την ιστοσελίδα και το WhatsApp.",
      "Απαντάς συνέχεια στις ίδιες ερωτήσεις για υπηρεσίες, τιμές και διαθεσιμότητα; Το chatbot συλλέγει τα στοιχεία που χρειάζεσαι για να αξιολογήσεις ένα αίτημα πριν το αναλάβει η ομάδα σου.",
      "Οργανώνουμε τις πληροφορίες που έχεις εγκρίνει. Συμφωνούμε ποια στοιχεία θα συλλέγει το chatbot και πότε θα παραπέμπει σε άνθρωπο. Εγκαθιστούμε το παράθυρο συνομιλίας στην ιστοσελίδα ή σχεδιάζουμε τη σύνδεση WhatsApp, και δοκιμάζουμε τις απαντήσεις και το πού καταλήγει κάθε αίτημα. Chatbot και φωνητικός agent μπορούν να μοιράζονται την ίδια βάση πληροφοριών, ώστε οι ενημερώσεις να παραμένουν συνεπείς.",
      "Ετοιμάζουμε και δοκιμάζουμε περιεχόμενο στα ελληνικά και στα αγγλικά για τα κανάλια που συμφωνούμε. Στην εγκατάσταση επιβεβαιώνουμε την πρόσβαση στην ιστοσελίδα, το WhatsApp, το CRM και το ημερολόγιό σου. Πριν ξεκινήσουμε, ελέγχουμε τη συμβατότητα των εργαλείων και ποιοι λογαριασμοί τρίτων χρειάζονται.",
      "Η ανάλυση διαδικασιών είναι δωρεάν. Τα διαχειριζόμενα συστήματα ξεκινούν από €349/μήνα χωρίς ΦΠΑ και μπορούν να περιλαμβάνουν chatbots όπου βοηθούν τη διαδικασία σου. Η τιμή δεν αποτελεί ξεχωριστή προσφορά chatbot. Συμφωνούμε τα κανάλια, τις συνδέσεις και την υποστήριξη που χρειάζεσαι. Τα ειδικά έργα κοστολογούνται χωριστά, κατόπιν προσφοράς.",
      "Οι εγκεκριμένες πληροφορίες περιορίζουν τις αβάσιμες απαντήσεις, αλλά δεν εξαλείφουν τα λάθη του AI. Τα αιτήματα που ξεπερνούν όσα έχουμε συμφωνήσει πηγαίνουν σε άνθρωπο. Η παράδοση μηνυμάτων στο WhatsApp εξαρτάται από τις ρυθμίσεις του καναλιού και του παρόχου. Στον σχεδιασμό επιβεβαιώνουμε τις εγκρίσεις λογαριασμών, τους κανόνες μηνυμάτων και τυχόν χρεώσεις τρίτων.",
    ],
    "crm-automation": [
      "Αυτοματισμοί CRM και καθημερινών διαδικασιών",
      "Σύνδεσε την αξιολόγηση αιτημάτων, την ένταξη πελατών, τις επόμενες επικοινωνίες και τις υπενθυμίσεις με τον τρόπο που δουλεύει η ομάδα σου.",
      "Η ομάδα σου αντιγράφει στοιχεία από εργαλείο σε εργαλείο; Κυνηγά με email την ένταξη νέων πελατών; Πρέπει να θυμάται πότε θα επικοινωνήσει ξανά με κάθε ενδιαφερόμενο; Αυτές είναι οι διαδικασίες που εξετάζουμε για αυτοματοποίηση.",
      "Ορίζουμε τι ξεκινά κάθε διαδικασία, ποια στοιχεία χρειάζεται και ποιος την αναλαμβάνει. Συμφωνούμε τους κανόνες αξιολόγησης και ανάθεσης. Ανάλογα με το πλάνο, οι αυτοματισμοί μπορούν να συλλέγουν στοιχεία πελατών, να στέλνουν έγγραφα, να κλείνουν τις πρώτες συναντήσεις, να ενημερώνουν το CRM και να ειδοποιούν την ομάδα σου. Δοκιμάζουμε κάθε βήμα και εκπαιδεύουμε την ομάδα πριν ξεκινήσουν.",
      "Εξετάζουμε συνδέσεις με Airtable, Google Sheets, Google Calendar, Cal.com, Outlook και HubSpot. Η συμβατότητα εξαρτάται από την πρόσβαση στους λογαριασμούς σου και όσα συμφωνούμε να υλοποιήσουμε. Ετοιμάζουμε μηνύματα στα ελληνικά και στα αγγλικά για τις διαδικασίες που τα χρειάζονται.",
      "Εξετάζουμε τη διαδικασία σου δωρεάν. Τα διαχειριζόμενα συστήματα ξεκινούν από €349/μήνα χωρίς ΦΠΑ και μπορούν να περιλαμβάνουν αυτοματισμούς και συνδέσεις εργαλείων. Συμφωνούμε ποιες διαδικασίες θα αυτοματοποιήσουμε και τι παρακολούθηση και υποστήριξη χρειάζονται. Ειδικά CRM, εσωτερικά εργαλεία και σύνθετα έργα κοστολογούνται χωριστά, κατόπιν προσφοράς.",
      "Οι αυτοματισμοί χρειάζονται σωστά δεδομένα, τα κατάλληλα δικαιώματα και διαθέσιμες υπηρεσίες τρίτων. Τις εξαιρέσεις και τις αποφάσεις που ξεπερνούν τους εγκεκριμένους κανόνες τις αναλαμβάνει άνθρωπος. Συμφωνούμε για τη δική σου διαδικασία πότε θα επαναλαμβάνεται μια αποτυχημένη ενέργεια, πότε θα στέλνεται ειδοποίηση και πότε θα παρεμβαίνει υπεύθυνος. Η υποστήριξη κάθε σύνδεσης χρειάζεται επιβεβαίωση.",
    ],
    about: [
      "Σχετικά με την AiAnchor",
      "Στην AiAnchor σχεδιάζουμε και διαχειριζόμαστε φωνητικούς AI agents, chatbots και αυτοματισμούς. Η συμβουλευτική μας σε βοηθά να δεις τι χρειάζεται η επιχείρησή σου.",
      "Σε βοηθάμε να εξετάσεις πώς θα διαχειρίζεσαι κλήσεις, συνομιλίες, αξιολόγηση αιτημάτων, ένταξη πελατών και επόμενες επικοινωνίες με λιγότερη χειροκίνητη δουλειά.",
      "Η συνεργασία μπορεί να ξεκινήσει με ανάλυση και πλάνο, και να συνεχιστεί με υλοποίηση, εκπαίδευση και συνεχή βελτίωση. Στο Command Hub βλέπεις τις αναφορές για τους agents και τους αυτοματισμούς που έχουμε ρυθμίσει για τον λογαριασμό σου.",
      "Οι agents ξεκινούν με ελληνικά και αγγλικά. Σχεδιάζουμε τις συνδέσεις γύρω από το CRM και το ημερολόγιο που ήδη χρησιμοποιείς. Στα εργαλεία που εξετάζουμε περιλαμβάνονται Airtable, Sheets, Google Calendar, Cal.com, Outlook και HubSpot.",
      "Μπορείς να ξεκινήσεις με δωρεάν ανάλυση διαδικασιών. Η συνεργασία για διαχειριζόμενα συστήματα ξεκινά από €349/μήνα χωρίς ΦΠΑ. Πρώτα καταλαβαίνουμε πώς δουλεύεις και μετά συμφωνούμε τι θα φτιάξουμε και τι υποστήριξη χρειάζεται. Τα ειδικά έργα κοστολογούνται χωριστά, κατόπιν προσφοράς.",
      "Οι εικόνες του προϊόντος δείχνουν παραδείγματα διαδικασιών, όχι επαληθευμένα αποτελέσματα πελατών. Για στοιχεία εγγραφής της εταιρείας ή δεσμεύσεις που αφορούν συγκεκριμένη υπηρεσία, γράψε στο info@aianchor.online. Διάβασε τα δημοσιευμένα προσχέδια πολιτικών πριν συμφωνήσεις τους όρους υπηρεσιών.",
    ],
  },
};
export function getDetail(lang: Locale, slug: string): Detail | undefined {
  const source = extra[lang][slug as keyof typeof extra.en];
  if (!source) return undefined;
  const [title, description, audience, process, integrations, pricing, limits] =
    source;
  const t = getContent(lang);
  const authoredCopy: Record<string, Partial<Detail>> = {
    "ai-consulting": {
      title: t.services.items[2].solutionTitle,
      description: t.consulting.subhead,
      intro: t.consulting.lead,
      audience: t.services.items[2].problem,
      process: t.consulting.steps.map(step => `${step.title}. ${step.desc} ${step.deliverables}`).join(" "),
      integrations: t.consulting.alsoNote,
    },
    "ai-voice-agents": {
      title: t.voiceSystems.voiceLabel,
      description: t.voiceSystems.subhead,
      intro: t.voiceSystems.subhead,
      audience: t.voiceSystems.features[0].desc,
      process: t.voiceSystems.features.slice(1).map(item => `${item.title}. ${item.desc}`).join(" "),
    },
    chatbots: {
      title: t.voiceSystems.automations[0].title,
      description: t.voiceSystems.automations[0].desc,
      intro: t.voiceSystems.automations[0].desc,
      audience: t.voiceSystems.autoSubhead,
      process: [t.voiceSystems.automations[1].desc, t.voiceSystems.automations[4].desc].join(" "),
    },
    "crm-automation": {
      title: t.services.items[1].solutionTitle,
      description: t.voiceSystems.autoSubhead,
      intro: t.voiceSystems.autoSubhead,
      audience: t.services.items[1].problem,
      process: t.voiceSystems.automations.slice(1).map(item => `${item.title}. ${item.desc}`).join(" "),
    },
    about: {
      title: t.about.heading,
      description: t.about.lead,
      intro: t.about.lead,
      audience: t.about.tagline,
      process: t.about.mission,
      integrations: t.features.subhead,
    },
  };
  const indices: Record<string, number[]> = {
    "ai-consulting": [0, 1, 14],
    "ai-voice-agents": [3, 5, 9],
    chatbots: [6, 4],
    "crm-automation": [7, 8],
    about: [0, 14],
  };
  return {
    title,
    description,
    intro: description,
    audience,
    process,
    integrations,
    pricing: [t.pricing.plans[0].body, `${t.pricing.plans[1].pricePrefix} ${t.pricing.plans[1].price}${t.pricing.plans[1].priceSuffix}.`, t.pricing.vatNote, t.pricing.plans[1].body, t.pricing.note].join(" "),
    limits,
    ...authoredCopy[slug],
    faqs: (indices[slug] || []).map((i) => ({
      q: plain(t.faq.items[i].q),
      a: plain(t.faq.items[i].a),
    })),
  };
}
