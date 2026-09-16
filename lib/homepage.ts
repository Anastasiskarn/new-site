import type { Locale } from "./routes";

const en = {
  nav: { platform: "Platform", process: "How It Works", pricing: "Pricing", about: "About", login: "Client Login" },
  demo: "Book a discovery call",
  hero: {
    title: "Better systems for the way your business works.",
    body: "We map your workflows, find what is slowing you down, and implement practical solutions using automation, software and AI where it makes sense.",
    secondary: "See How It Works",
    integration: "Works with your existing CRM, calendar and lead sources.",
  },
  process: {
    title: "From messy workflow to a better system",
    body: "We map how the work moves through your business, find where time is being lost, and improve the process with the right tools.",
    steps: [
      { title: "Map", body: "Understand how the work happens today. We look at the steps, handoffs, tools and people involved in the process." },
      { title: "Find the friction", body: "See where the process slows down. Manual work, repeated tasks, missed follow-ups, disconnected tools or poor visibility." },
      { title: "Build", body: "Implement the right solution. That might be automation, software, AI, integrations, or a combination of them." },
      { title: "Improve", body: "Keep the system useful as things change. We support and refine what we build as your team and processes evolve." },
    ],
    close: "The result is a system that supports the way your business actually works.",
  },
  capabilities: {
    title: "One system for the repetitive work around your leads",
    items: [
      { icon: "voice", title: "AI Voice Agents", lead: "Answer calls and handle common enquiries.", body: "Use your qualifying questions and pass conversations to your team when a person is needed.", slug: "ai-voice-agents" },
      { icon: "follow", title: "Lead Follow-Up", lead: "Keep conversations moving.", body: "Follow up on the schedule you agree, with the conversation recorded for your team.", slug: "crm-automation" },
      { icon: "sync", title: "CRM Sync", lead: "Keep your records updated.", body: "Send lead details, conversation notes and next steps to the CRM you already use.", slug: "crm-automation" },
      { icon: "phone", title: "Missed Call Recovery", lead: "Follow up when nobody answers.", body: "Reconnect with the caller and help them take the next step.", slug: "ai-voice-agents" },
      { icon: "book", title: "Knowledge Base", lead: "Give your agents the right information.", body: "Keep answers grounded in your listings, services and approved business information.", slug: "chatbots" },
      { icon: "calendar", title: "Appointment Booking", lead: "Let prospects book without the back and forth.", body: "Arrange viewings, callbacks and consultations around your team's calendar.", slug: "crm-automation" },
    ],
  },
  dashboard: {
    title: "See what is happening without digging through different tools",
    body: "One dashboard for your leads, calls, bookings, pipeline stages, follow-up activity and hours saved.",
    alt: "AiAnchor AI Operations Overview dashboard showing leads captured, booked appointments, hours saved, lead pipeline and recent call activity.",
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
    points: [
      { title: "Lead Pipeline", body: "See how many leads are captured, contacted, qualified and booked." },
      { title: "Calls and Activity", body: "See recent conversations and what happened next." },
      { title: "Bookings", body: "See appointments created through the system." },
      { title: "Time Saved", body: "Understand how much repetitive work is being handled automatically." },
    ],
    close: "You do not need to wonder whether the system is running. You can see it.",
  },
  setup: {
    title: "We set it up around the way your business already works",
    steps: [
      { title: "Understand", body: "We look at how your team currently handles leads." },
      { title: "Build", body: "We configure AiAnchor around your current workflow." },
      { title: "Launch", body: "We test the system before it goes live." },
      { title: "Improve", body: "We keep adjusting it as the business changes." },
    ],
    close: "We stay involved after launch, managing and improving the system with your team.",
  },
  final: {
    title: "See where AiAnchor could fit into your lead process",
    body: "Show us how your team currently handles enquiries. We will walk through where time is being lost, where leads can slip through, and what AiAnchor could handle for you.",
    note: "No long presentation. We will show you the system using a workflow relevant to your business.",
  },
  platform: { title: "The system behind your lead process", body: "Voice agents, follow-up, booking and CRM activity, configured around your real estate business and visible in one dashboard.", details: "Explore each part of the platform", faq: "Questions about AiAnchor" },
  footer: "Managed AI operations for real estate teams.",
  meta: { title: "AiAnchor | AI operations for real estate teams", description: "Respond to real estate enquiries, qualify prospects, follow up and book appointments automatically. AiAnchor is set up and managed around your existing workflow." },
};

const gr: typeof en = {
  nav: { platform: "Πλατφόρμα", process: "Πώς λειτουργεί", pricing: "Τιμές", about: "Σχετικά", login: "Σύνδεση πελάτη" },
  demo: "Κλείστε κλήση γνωριμίας",
  hero: {
    title: "Καλύτερα συστήματα για τον τρόπο που λειτουργεί η επιχείρησή σας.",
    body: "Χαρτογραφούμε τις διαδικασίες σας, εντοπίζουμε τι σας καθυστερεί και εφαρμόζουμε πρακτικές λύσεις με αυτοματισμούς, λογισμικό και AI εκεί που έχει νόημα.",
    secondary: "Δείτε πώς λειτουργεί", integration: "Λειτουργεί με το CRM, το ημερολόγιο και τις πηγές αιτημάτων που ήδη χρησιμοποιείτε.",
  },
  process: {
    title: "Από μια χαοτική ροή εργασίας σε ένα καλύτερο σύστημα",
    body: "Χαρτογραφούμε πώς κινείται η εργασία μέσα στην επιχείρησή σας, εντοπίζουμε πού χάνεται χρόνος και βελτιώνουμε τη διαδικασία με τα σωστά εργαλεία.",
    steps: [
      { title: "Χαρτογράφηση", body: "Κατανοούμε πώς γίνεται σήμερα η εργασία. Εξετάζουμε τα βήματα, τις παραδόσεις, τα εργαλεία και τους ανθρώπους της διαδικασίας." },
      { title: "Εντοπισμός τριβής", body: "Βλέπουμε πού επιβραδύνεται η διαδικασία. Χειροκίνητη εργασία, επαναλήψεις, χαμένα follow-ups, αποσυνδεδεμένα εργαλεία ή περιορισμένη ορατότητα." },
      { title: "Υλοποίηση", body: "Εφαρμόζουμε τη σωστή λύση. Μπορεί να είναι αυτοματισμός, λογισμικό, AI, διασυνδέσεις ή ένας συνδυασμός τους." },
      { title: "Βελτίωση", body: "Κρατάμε το σύστημα χρήσιμο καθώς αλλάζουν τα πράγματα. Υποστηρίζουμε και εξελίσσουμε ό,τι κατασκευάζουμε μαζί σας." },
    ], close: "Παραμένουμε μαζί σας και μετά την έναρξη, διαχειριζόμενοι και βελτιώνοντας το σύστημα με την ομάδα σας.",
  },
  capabilities: {
    title: "Ένα σύστημα για την επαναλαμβανόμενη δουλειά γύρω από τα αιτήματά σας",
    items: [
      { icon: "voice", title: "Φωνητικοί AI Agents", lead: "Απαντήστε σε κλήσεις και συνηθισμένες ερωτήσεις.", body: "Χρησιμοποιήστε τις ερωτήσεις αξιολόγησής σας και δώστε τη συζήτηση στην ομάδα όταν χρειάζεται άνθρωπος.", slug: "ai-voice-agents" },
      { icon: "follow", title: "Επικοινωνία με ενδιαφερόμενους", lead: "Κρατήστε τις συζητήσεις ενεργές.", body: "Συνεχίστε την επικοινωνία με το πρόγραμμα που συμφωνούμε και καταγραφή για την ομάδα σας.", slug: "crm-automation" },
      { icon: "sync", title: "Συγχρονισμός CRM", lead: "Διατηρήστε ενημερωμένα τα αρχεία σας.", body: "Στείλτε στοιχεία, σημειώσεις και επόμενα βήματα στο CRM που ήδη χρησιμοποιείτε.", slug: "crm-automation" },
      { icon: "phone", title: "Αναπάντητες κλήσεις", lead: "Επικοινωνήστε όταν κανείς δεν απαντά.", body: "Συνδεθείτε ξανά με τον καλούντα και βοηθήστε τον να κάνει το επόμενο βήμα.", slug: "ai-voice-agents" },
      { icon: "book", title: "Βάση γνώσεων", lead: "Δώστε στους agents τις σωστές πληροφορίες.", body: "Βασίστε τις απαντήσεις στα ακίνητα, τις υπηρεσίες και τις εγκεκριμένες πληροφορίες σας.", slug: "chatbots" },
      { icon: "calendar", title: "Κλείσιμο ραντεβού", lead: "Κλείστε ραντεβού χωρίς συνεχείς συνεννοήσεις.", body: "Οργανώστε επισκέψεις, κλήσεις και συναντήσεις με βάση το ημερολόγιο της ομάδας σας.", slug: "crm-automation" },
    ],
  },
  dashboard: {
    title: "Δείτε τι συμβαίνει χωρίς να ψάχνετε σε διαφορετικά εργαλεία",
    body: "Ένας πίνακας για αιτήματα, κλήσεις, ραντεβού, στάδια αξιολόγησης, συνέχεια επικοινωνίας και ώρες που εξοικονομούνται.",
    alt: "Πίνακας AiAnchor AI Operations Overview με αιτήματα, ραντεβού, ώρες εξοικονόμησης, στάδια αξιολόγησης και πρόσφατη δραστηριότητα κλήσεων.",
    caption: "Πίνακας AiAnchor. Τα στοιχεία δείχνουν τη λειτουργία του περιβάλλοντος, όχι υποσχόμενα αποτελέσματα.",
    preview: {
      portal: "Πύλη πελάτη",
      workspace: "Χώρος εργασίας",
      nav: ["Πίνακας", "Φωνητικοί agents", "Κλήσεις", "Ραντεβού", "Αιτήματα", "Βάση γνώσεων", "Ρυθμίσεις"],
      search: "Αναζήτηση",
      range: "Τελευταίες 90 ημέρες",
      title: "Επισκόπηση λειτουργιών AI",
      subtitle: "Αυτοματισμοί, αιτήματα και αποτελέσματα σε ένα σημείο.",
      trend: "έναντι προηγούμενης περιόδου",
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
        body: "Πόσο προχωρά κάθε αίτημα, βήμα προς βήμα",
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
          { kind: "call", title: "Ανάλυση κλήσης, θετική", body: "Αγοραστής ρώτησε για διαμέρισμα 2 υ/δ στη Γλυφάδα", time: "πριν 2 λ." },
          { kind: "book", title: "Κλείστηκε επίσκεψη", body: "Πέμ 11:00, ακίνητο στη Λεωφόρο Κηφισίας", time: "πριν 14 λ." },
          { kind: "missed", title: "Ανάκτηση αναπάντητης κλήσης", body: "Στάλθηκε SMS και ο καλών απάντησε", time: "πριν 38 λ." },
          { kind: "sync", title: "Συγχρονισμός με CRM", body: "Προστέθηκαν προϋπολογισμός, περιοχή και χρονοδιάγραμμα", time: "πριν 1 ώρα" },
        ],
      },
      chart: { title: "Αιτήματα στον χρόνο", body: "Αιτήματα ανά εβδομάδα", total: "248", ticks: ["Εβδ. 1", "Εβδ. 4", "Εβδ. 8", "Εβδ. 12"] },
    },
    points: [
      { title: "Πορεία αιτημάτων", body: "Δείτε πόσα αιτήματα συλλέγονται, λαμβάνουν απάντηση, αξιολογούνται και κλείνουν ραντεβού." },
      { title: "Κλήσεις και δραστηριότητα", body: "Δείτε τις πρόσφατες συζητήσεις και τι ακολούθησε." },
      { title: "Ραντεβού", body: "Δείτε τα ραντεβού που δημιουργούνται μέσα από το σύστημα." },
      { title: "Χρόνος που εξοικονομείται", body: "Κατανοήστε πόση επαναλαμβανόμενη δουλειά γίνεται αυτόματα." },
    ], close: "Δεν χρειάζεται να αναρωτιέστε αν το σύστημα λειτουργεί. Το βλέπετε.",
  },
  setup: {
    title: "Το προσαρμόζουμε στον τρόπο που ήδη λειτουργεί η επιχείρησή σας",
    steps: [
      { title: "Κατανόηση", body: "Βλέπουμε πώς διαχειρίζεται σήμερα η ομάδα σας τα αιτήματα." },
      { title: "Δημιουργία", body: "Ρυθμίζουμε το AiAnchor γύρω από τη σημερινή σας διαδικασία." },
      { title: "Έναρξη", body: "Δοκιμάζουμε το σύστημα πριν ξεκινήσει η λειτουργία του." },
      { title: "Βελτίωση", body: "Συνεχίζουμε τις προσαρμογές καθώς αλλάζει η επιχείρηση." },
    ], close: "Το AiAnchor το διαχειριζόμαστε μαζί σας. Δεν το παραδίδουμε και το ξεχνάμε.",
  },
  final: {
    title: "Δείτε πού μπορεί να ενταχθεί το AiAnchor στη διαχείριση των αιτημάτων σας",
    body: "Δείξτε μας πώς διαχειρίζεται σήμερα η ομάδα σας τα αιτήματα. Θα δούμε πού χάνεται χρόνος, πού μπορεί να χαθούν ενδιαφερόμενοι και τι μπορεί να αναλάβει το AiAnchor.",
    note: "Χωρίς μεγάλη παρουσίαση. Θα δείτε το σύστημα με μια διαδικασία σχετική με την επιχείρησή σας.",
  },
  platform: { title: "Το σύστημα πίσω από τη διαχείριση των αιτημάτων σας", body: "Φωνητικοί agents, επικοινωνία, ραντεβού και δραστηριότητα CRM, προσαρμοσμένα στην επιχείρηση ακινήτων σας και ορατά σε έναν πίνακα.", details: "Δείτε κάθε μέρος της πλατφόρμας", faq: "Ερωτήσεις για το AiAnchor" },
  footer: "Διαχειριζόμενες λειτουργίες AI για ομάδες ακινήτων.",
  meta: { title: "AiAnchor | Λειτουργίες AI για ομάδες ακινήτων", description: "Απαντήστε σε αιτήματα ακινήτων, αξιολογήστε ενδιαφερόμενους, συνεχίστε την επικοινωνία και κλείστε ραντεβού αυτόματα. Ρυθμίζουμε και διαχειριζόμαστε το AiAnchor για εσάς." },
};

export const homepageCopy = (lang: Locale) => lang === "en" ? en : gr;
