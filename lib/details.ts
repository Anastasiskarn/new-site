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
      "Χαρτογραφήστε τη ροή ενδιαφερομένων, εντοπίστε χειροκίνητες εργασίες και συμφωνήστε έναν οδικό χάρτη AI πριν από την υλοποίηση.",
      "Για επιχειρήσεις υπηρεσιών με χαμένες επαφές, αργή παρακολούθηση ή χειροκίνητο onboarding. Ξεκινάμε από τη σημερινή σας διαδικασία και τα στοιχεία που μπορείτε να διαθέσετε.",
      "Χαρτογραφούμε πηγές και μεταβιβάσεις, εκτιμούμε το κόστος των κενών με τα δικά σας στοιχεία και ιεραρχούμε ευκαιρίες βάσει επίδρασης και προσπάθειας. Παραδίδουμε έλεγχο, οδικό χάρτη και προτεινόμενους δείκτες. Υλοποίηση και εκπαίδευση ακολουθούν μόνο για το συμφωνημένο αντικείμενο.",
      "Ο έλεγχος καλύπτει τηλέφωνο, website, WhatsApp, CRM, ημερολόγιο και onboarding. Ελληνικά και αγγλικά είναι οι βασικές γλώσσες· πρόσθετες γλώσσες και συμβατότητα εργαλείων συμφωνούνται κατά τον σχεδιασμό.",
      "Ο έλεγχος και ο οδικός χάρτης διατίθενται και αυτόνομα, χωρίς δημοσιευμένη ξεχωριστή τιμή. Οι συνεδρίες των πακέτων αναφέρονται στον τιμοκατάλογο. Ειδικά CRM, websites και εσωτερικά εργαλεία κοστολογούνται χωριστά.",
      "Οι εκτιμήσεις βασίζονται στα στοιχεία και τις παραδοχές σας και δεν εγγυώνται έσοδα ή εξοικονόμηση. Οι υπεύθυνοι εγκρίνουν το αντικείμενο, τη γνώση και τους κανόνες μεταβίβασης σε άνθρωπο.",
    ],
    "ai-voice-agents": [
      "AI φωνητικοί agents για κλήσεις και ραντεβού",
      "Διαχειριστείτε εισερχόμενες κλήσεις, καταγράψτε ενδιαφερομένους και οργανώστε ραντεβού στα ελληνικά και αγγλικά.",
      "Για επιχειρήσεις που δέχονται τηλεφωνικά ερωτήματα υπηρεσιών ή ραντεβού και χρειάζονται κάλυψη όταν το προσωπικό είναι απασχολημένο ή εκτός ωραρίου.",
      "Συμφωνούμε τη ροή κλήσης, φορτώνουμε εγκεκριμένες υπηρεσίες και πολιτικές, ορίζουμε ερωτήσεις και κανόνες κρατήσεων και δοκιμάζουμε πριν από την έναρξη. Υπάρχοντες αριθμοί προωθούνται ή μεταφέρονται ανάλογα με τον πάροχο. Παράγονται περιλήψεις και εγγραφές για έλεγχο.",
      "Ελληνικά και αγγλικά είναι η βασική εγκατάσταση. Πρόσθετες γλώσσες και εναλλαγή γλώσσας ρυθμίζονται και δοκιμάζονται. Οι συνδέσεις CRM και ημερολογίου σχεδιάζονται για τα εργαλεία σας, όπως Google Calendar, Outlook, Cal.com και HubSpot.",
      "Starter: €149/μήνα χωρίς ΦΠΑ, 150 λεπτά. Growth: €349, 400 λεπτά. Pro: €699, 1.000 λεπτά. Επιπλέον λεπτά: €0,60, €0,45 και €0,35 αντίστοιχα. Δείτε τις ετήσιες τιμές, εγκατάσταση και δοκιμή στον τιμοκατάλογο.",
      "Το AI μπορεί να ακούσει λάθος ή να απαντήσει ατελώς. Δεν είναι υπηρεσία έκτακτης ανάγκης και δεν παρέχει ιατρική, νομική ή οικονομική συμβουλή. Η ανθρώπινη εξυπηρέτηση γίνεται με μεταφορά, επανάκληση ή στοιχεία επικοινωνίας ανάλογα με τη ρύθμιση· επιβεβαιώστε τη διαθεσιμότητα για το πακέτο σας.",
    ],
    chatbots: [
      "Chatbots για website και WhatsApp",
      "Απαντήσεις από το εγκεκριμένο περιεχόμενο της επιχείρησης και καταγραφή ενδιαφερομένων σε website και WhatsApp.",
      "Για επιχειρήσεις με επαναλαμβανόμενες ερωτήσεις υπηρεσιών, τιμών ή διαθεσιμότητας και επαφές που χρειάζονται αξιολόγηση πριν από την ανθρώπινη συνέχεια.",
      "Οργανώνουμε την εγκεκριμένη γνώση, συμφωνούμε πεδία και κανόνες μεταβίβασης, εγκαθιστούμε το widget ή σχεδιάζουμε τη σύνδεση WhatsApp και δοκιμάζουμε απαντήσεις και δρομολόγηση. Chatbot και φωνητικός agent μπορούν να χρησιμοποιούν κοινή βάση γνώσης.",
      "Προετοιμάζουμε και δοκιμάζουμε ελληνικό και αγγλικό περιεχόμενο για τα συμφωνημένα κανάλια. Πρόσβαση σε website, WhatsApp, CRM και ημερολόγιο επιβεβαιώνεται στην εγκατάσταση, μαζί με τις απαιτήσεις λογαριασμών τρίτων.",
      "Το website chatbot περιλαμβάνεται από Growth (€349/μήνα χωρίς ΦΠΑ). Website και WhatsApp αναφέρονται στο Pro (€699). Είναι πακέτα υπηρεσιών, όχι αυτόνομες προσφορές chatbot. Δείτε εγκατάσταση, ετήσια χρέωση και δοκιμή μόνο Growth.",
      "Η εγκεκριμένη γνώση περιορίζει αλλά δεν εξαλείφει λάθη AI. Ερωτήματα εκτός αντικειμένου μεταβιβάζονται σε άνθρωπο. Η λειτουργία WhatsApp εξαρτάται από τη διαμόρφωση παρόχου· εγκρίσεις λογαριασμών, κανόνες μηνυμάτων και τυχόν έξοδα τρίτων επιβεβαιώνονται κατά τον σχεδιασμό.",
    ],
    "crm-automation": [
      "Αυτοματισμοί CRM και επιχειρησιακών ροών",
      "Συνδέστε αξιολόγηση ενδιαφερομένων, onboarding, follow-up και υπενθυμίσεις με τη διαδικασία της ομάδας σας.",
      "Για ομάδες που αντιγράφουν στοιχεία μεταξύ εργαλείων, κυνηγούν onboarding με email ή βασίζονται στη μνήμη του προσωπικού για κάθε follow-up.",
      "Χαρτογραφούμε εναύσματα, πεδία και υπευθύνους και ορίζουμε κανόνες αξιολόγησης και δρομολόγησης. Οι συμφωνημένες ροές συλλέγουν στοιχεία, στέλνουν έγγραφα, κλείνουν kickoff, ενημερώνουν CRM και ειδοποιούν την ομάδα. Δοκιμάζουμε τις μεταβιβάσεις και εκπαιδεύουμε πριν από την έναρξη.",
      "Ο σχεδιασμός διασυνδέσεων μπορεί να καλύπτει Airtable, Google Sheets, Google Calendar, Cal.com, Outlook και HubSpot. Η συμβατότητα εξαρτάται από πρόσβαση και αντικείμενο. Ελληνικά και αγγλικά μηνύματα προετοιμάζονται όπου χρειάζονται.",
      "Το Growth περιλαμβάνει αξιολόγηση/δρομολόγηση και δύο πρότυπα αυτοματισμών. Το Pro περιλαμβάνει onboarding και έως έξι ειδικούς αυτοματισμούς. Το Scale ξεκινά από €1.500/μήνα με προσφορά. Ειδικά συστήματα κοστολογούνται χωριστά· δείτε όλους τους όρους.",
      "Οι αυτοματισμοί εξαρτώνται από έγκυρα δεδομένα, δικαιώματα και διαθεσιμότητα τρίτων. Εξαιρέσεις και αποφάσεις εκτός κανόνων χρειάζονται άνθρωπο. Επαναλήψεις, ειδοποιήσεις και μεταβιβάσεις ορίζονται για τη συγκεκριμένη ροή.",
    ],
    about: [
      "Σχετικά με την AiAnchor",
      "Η AiAnchor συνδυάζει συμβουλευτική AI με διαχείριση φωνητικών agents, chatbots και αυτοματισμών.",
      "Η AiAnchor εξυπηρετεί επιχειρήσεις που αξιολογούν πώς να διαχειριστούν κλήσεις, chats, ενδιαφερομένους, onboarding και follow-up με λιγότερη χειροκίνητη εργασία.",
      "Η συνεργασία μπορεί να καλύπτει έλεγχο, οδικό χάρτη, υλοποίηση, εκπαίδευση και βελτιστοποίηση. Το Command Hub είναι το προϊόν αναφορών για τους agents και αυτοματισμούς που έχουν ρυθμιστεί για τον λογαριασμό σας.",
      "Ελληνικά και αγγλικά είναι η βασική εγκατάσταση. Οι συνδέσεις σχεδιάζονται για το CRM και ημερολόγιό σας· αναφέρονται Airtable, Sheets, Google Calendar, Cal.com, Outlook και HubSpot.",
      "Τα διαχειριζόμενα πακέτα ξεκινούν από €149/μήνα χωρίς ΦΠΑ. Αυτόνομη συμβουλευτική και ειδικές κατασκευές κοστολογούνται χωριστά. Υπάρχει δωρεάν demo· η δοκιμή Growth διαρκεί 14 ημέρες από την ενεργοποίηση κατόπιν αιτήματος.",
      "Οι απεικονίσεις παρουσιάζουν ενδεικτικές ροές, όχι επαληθευμένα αποτελέσματα πελατών. Για στοιχεία εγγραφής εταιρείας ή ειδικές δεσμεύσεις επικοινωνήστε στο info@aianchor.online. Εξετάστε τα δημοσιευμένα προσχέδια πολιτικών πριν συμφωνήσετε τους όρους υπηρεσιών.",
    ],
  },
};
export function getDetail(lang: Locale, slug: string): Detail | undefined {
  const source = extra[lang][slug as keyof typeof extra.en];
  if (!source) return undefined;
  const [title, description, audience, process, integrations, pricing, limits] =
    source;
  const t = getContent(lang);
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
    pricing,
    limits,
    faqs: (indices[slug] || []).map((i) => ({
      q: plain(t.faq.items[i].q),
      a: plain(t.faq.items[i].a),
    })),
  };
}
