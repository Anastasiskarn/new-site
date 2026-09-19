import type { Locale } from "../lib/routes";
import styles from "./operations-showcase.module.css";

function Glyph({ kind = "grid" }: { kind?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "search" ? <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></>
      : kind === "phone" ? <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z" />
      : kind === "calendar" ? <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4m8-4v4M3 11h18m-12 5 2 2 4-4" /></>
      : kind === "check" ? <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>
      : kind === "voice" ? <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0m-7 7v3" /></>
      : kind === "activity" ? <path d="M2 12h5l3-8 4 16 3-8h5" />
      : kind === "users" ? <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5" /></>
      : <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>}
  </svg>;
}

// Responsive presentation mockup based on the supplied client-portal screenshot.
// Example stats are presentation data; the caption identifies them as examples.
export function OperationsShowcase({ lang }: { lang: Locale }) {
  const greek = lang === "gr";
  const nav = greek
    ? ["Dashboard", "Αναλύσεις", "Voice Agents", "Βάση γνώσεων", "Κλήσεις", "Ραντεβού", "Leads", "Δραστηριότητα", "Ομάδα", "Ρυθμίσεις"]
    : ["Dashboard", "Automation Analytics", "Voice Agents", "Knowledge Base", "Calls", "Bookings", "Leads", "Activity", "Team", "Settings"];
  const icons = ["grid", "activity", "voice", "grid", "phone", "calendar", "users", "activity", "users", "grid"];
  const leads = ["Clark Jones", "Barry Johnson", "Oliver Queens"];
  const counts = { captured: 47, contacted: 44, qualified: 19, booked: 8 };
  const stages = [
    { label: greek ? "Συλλογή" : "Captured", value: counts.captured },
    { label: greek ? "Επικοινωνία" : "Contacted", value: counts.contacted },
    { label: greek ? "Αξιολόγηση" : "Qualified", value: counts.qualified },
    { label: greek ? "Κλεισμένο ραντεβού" : "Booked an appointment", value: counts.booked },
  ];
  const euros = (value: number) => new Intl.NumberFormat(greek ? "el-GR" : "en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
  const metrics = [
    { label: greek ? "Leads" : "Leads Captured", value: counts.captured, change: "+17.5%", down: false },
    { label: greek ? "Κλεισμένα ραντεβού" : "Booked Appointments", value: counts.booked, change: "+14.3%", down: false },
    { label: greek ? "Εκτιμώμενα έσοδα" : "Estimated Revenue", value: euros(48600), change: "+12.8%", down: false },
  ];

  return <figure className={`${styles.showcase} dash-preview reveal`}>
    <div className={styles.stage}>
      <div className={styles.halo} aria-hidden="true" />
      <div className={styles.float}>
        <div className={styles.laptop}>
          <div className={styles.screen}>
            <span className={styles.camera} aria-hidden="true" />
            <div className={styles.window} role="img" aria-label={greek ? "Mockup του AiAnchor client portal με κλήσεις, leads, ραντεβού και δραστηριότητα." : "AiAnchor client portal mockup showing calls, leads, appointments and recent activity."}>
              <div className={styles.app} aria-hidden="true">
            <aside className={styles.sidebar}>
              <div className={styles.brand}><span className={styles.brandMark}><Glyph kind="activity" /></span><span><strong>AiAnchor</strong><small>CLIENT PORTAL</small></span><span className={styles.collapse}>‹</span></div>
              <p className={styles.workspace}>WORKSPACE</p>
              <div className={styles.nav}>{nav.map((label, i) => <div key={label} className={i === 0 ? styles.active : undefined}><Glyph kind={icons[i]} /><span>{label}</span></div>)}</div>
              <div className={styles.profile}><span>AY</span><div><strong>Ayush</strong><small>Client</small></div></div>
            </aside>
            <div className={styles.main}>
              <div className={styles.toolbar}><span className={styles.search}><Glyph kind="search" />{greek ? "Αναζήτηση στον χώρο εργασίας" : "Search workspace"}<kbd>Ctrl K</kbd></span><span className={styles.toolbarEnd}>☼ <span>EN</span><span className={styles.avatar}>AY</span></span></div>
              <div className={styles.content}>
                <div className={styles.overview}>
                  <div className={styles.summary}><span className={styles.period}>{greek ? "Τελευταίες 30 ημέρες" : "Last 30 days"} <span>⌄</span></span><h3>{greek ? <>Οι αυτοματισμοί σου έχουν συλλέξει <em>{counts.captured} leads</em> και κλείσει <em>{counts.booked} ραντεβού.</em></> : <>Your automations have captured <em>{counts.captured} leads</em> and booked <em>{counts.booked} appointments.</em></>}</h3><p>{greek ? "Η δραστηριότητα των leads και τα ραντεβού, με μια ματιά." : "Lead activity and bookings, at a glance."}</p></div>
                  <div className={styles.sectionHeading}>{greek ? "Αυτή την περίοδο" : "This period"}<span>{greek ? "Τελευταίες 30 ημέρες" : "Last 30 days"}</span></div>
                  <div className={styles.metrics}>{metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small className={metric.down ? styles.decline : styles.growth}>{metric.down ? "↘" : "↗"} {metric.change} <span>{greek ? "από πριν" : "vs previous"}</span></small></div>)}</div>
                  <div className={styles.sectionHeading}>{greek ? "Από την αρχή" : "Since you started"}<span>{greek ? "Συνολικά" : "All time"}</span></div>
                  <div className={`${styles.metrics} ${styles.savings}`}><div><span>{greek ? "Ώρες που εξοικονομήθηκαν" : "Hours Saved"}</span><strong>{greek ? "18,6" : "18.6"}</strong></div><div><span>{greek ? "Εξοικονόμηση κόστους" : "Labor Cost Saved"}</span><strong>{euros(558)}</strong></div></div>
                  <div className={styles.activity}><div className={styles.sectionHeading}>{greek ? "Πρόσφατη δραστηριότητα" : "Recent activity"}<span>{greek ? "Προβολή όλων ↗" : "View all ↗"}</span></div>{[greek ? "Η κλήση αναλύθηκε" : "Call analyzed — positive", greek ? "Ζωντανή κλήση σε εξέλιξη" : "Live call in progress", greek ? "Κλείστηκε ραντεβού" : "Appointment booked"].map((label, i) => <div className={styles.event} key={label}><span className={`${styles.eventIcon} ${i === 2 ? styles.success : ""}`}><Glyph kind={i === 2 ? "calendar" : "phone"} /></span><div><strong>{label}</strong><p>MA Prime Properties — Real Estate Receptionist</p></div><small>{i + 1}m</small></div>)}</div>
                </div>
                <div className={styles.rightColumn}><div className={styles.latest}><div className={styles.sectionHeading}>{greek ? "Τελευταία leads" : "Latest leads"}</div><p className={styles.reply}><Glyph kind="check" />{greek ? "Κανείς δεν περιμένει απάντηση." : "Nobody is waiting for a reply."}</p>{leads.map((name) => <div className={styles.lead} key={name}><div><strong>{name}</strong><span><i />{greek ? "Κλεισμένο" : "Booked"}</span></div><p>{greek ? "Ζήτησε να κλείσει επίσκεψη σε ακίνητο." : "Requested a property viewing."}</p><small><Glyph kind="voice" />MA Prime Properties</small></div>)}<span className={styles.openLeads}>{greek ? "Άνοιγμα leads →" : "Open leads →"}</span></div><div className={styles.pipeline}><div className={styles.sectionHeading}>{greek ? "Πού βρίσκονται τα leads σου" : "Where your leads are"}</div>{stages.map((stage) => <div className={styles.pipelineRow} key={stage.label}><div><span>{stage.label}</span><strong>{stage.value}</strong></div><span className={styles.barTrack}><span className={styles.bar} style={{ width: `${(stage.value / counts.captured) * 100}%` }} /></span></div>)}</div></div>
              </div>
            </div>
              </div>
            </div>
          </div>
          <div className={styles.base} aria-hidden="true">
            <span className={styles.keyboard}>{Array.from({ length: 70 }, (_, key) => <i key={key} />)}</span>
            <span className={styles.trackpad} />
          </div>
        </div>
      </div>
    </div>
    <figcaption className={styles.caption}>{greek ? "Προεπισκόπηση εφαρμογής · Ενδεικτικά δεδομένα" : "App preview · Example data"}</figcaption>
  </figure>;
}
