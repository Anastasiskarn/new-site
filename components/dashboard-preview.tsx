import type { CSSProperties, ReactNode } from "react";
import { homepageCopy } from "../lib/homepage";
import type { Locale } from "../lib/routes";
import { AnchorIcon } from "./ui";
import { AppWindow } from "./ui/editorial";

// A coded recreation of the AiAnchor client portal "AI Operations Overview".
// Figures are illustrative interface examples; the caption says so.
const sparks = [
  [4, 6, 5, 8, 7, 10, 9, 13, 12, 16],
  [3, 4, 4, 6, 5, 7, 8, 7, 10, 11],
  [6, 5, 7, 8, 7, 9, 11, 10, 12, 14],
  [5, 6, 5, 7, 8, 7, 9, 9, 10, 12],
];
const weekly = [11, 14, 12, 17, 15, 19, 18, 22, 20, 25, 23, 28];
const stageTones = ["0 240 255", "56 132 255", "112 72 255", "178 76 255"];
const navIcons = ["grid", "voice", "phone", "calendar", "users", "book", "gear"];

const iconPaths: Record<string, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  voice: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3" /></>,
  phone: <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></>,
  book: <path d="M12 5v16M3 3h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3V3Z" />,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M4.9 4.9l2.1 2.1m10 10 2.1 2.1M2 12h3m14 0h3M4.9 19.1 7 17m10-10 2.1-2.1" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bell: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  wallet: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M16 15h2" /></>,
  up: <path d="M12 19V5m-6 6 6-6 6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  missed: <path d="M16 3h5v5m0-5-6 6M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z" />,
  sync: <path d="M20 7a8 8 0 0 0-14-2L3 8m0-5v5h5M4 17a8 8 0 0 0 14 2l3-3m0 5v-5h-5" />,
};

function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>;
}

function Sparkline({ points, id }: { points: number[]; id: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((p, i) => `${(i / (points.length - 1)) * 100},${30 - ((p - min) / (max - min || 1)) * 26}`);
  return (
    <svg className="dash-spark h-8 w-20" viewBox="0 0 100 32" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#00f0ff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#00f0ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M0,32 L${coords.join(" L")} L100,32 Z`} fill={`url(#${id})`} />
      <path className="dash-spark-line" d={`M${coords.join(" L")}`} fill="none" stroke="#00f0ff" strokeWidth="1.6" vectorEffect="non-scaling-stroke" pathLength={1} />
    </svg>
  );
}

function Delta({ value }: { value: string }) {
  return <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-emerald-400"><Icon name="up" className="h-3 w-3" />{value}</span>;
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-white/[0.07] bg-white/[0.025] ${className}`}>{children}</div>;
}

// idPrefix keeps SVG gradient ids unique when the preview renders twice on one page.
export function DashboardPreview({ lang, eager = false, idPrefix = "dash-spark" }: { lang: Locale; eager?: boolean; idPrefix?: string }) {
  const { alt, caption, preview: t } = homepageCopy(lang).dashboard;
  const peak = Math.max(...weekly);
  const activityTone: Record<string, string> = { call: "text-primary bg-primary/10", book: "text-violet-300 bg-violet-400/10", missed: "text-amber-300 bg-amber-400/10", sync: "text-emerald-300 bg-emerald-400/10" };
  const activityIcon: Record<string, string> = { call: "phone", book: "calendar", missed: "missed", sync: "sync" };

  return (
    <figure className={`dash-preview relative mt-14 ${eager ? "" : "reveal"}`}>
      <div className="dash-glow pointer-events-none absolute inset-x-0 -top-40 bottom-10 -z-10" aria-hidden="true" />
      <AppWindow className="product-frame">
      <div role="img" aria-label={alt}>
        <div aria-hidden="true" className="flex select-none text-left">
          <aside className="hidden w-56 shrink-0 flex-col border-r border-white/[0.06] bg-black/30 p-4 lg:flex">
            <div className="flex items-center gap-3 px-1">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white"><AnchorIcon /></span>
              <span><span className="block font-display text-sm font-semibold text-white">AiAnchor</span><span className="block text-[10px] uppercase tracking-wider text-gray-500">{t.portal}</span></span>
            </div>
            <p className="mt-7 px-2 text-[10px] font-medium uppercase tracking-wider text-gray-500">{t.workspace}</p>
            <ul className="mt-2 space-y-0.5">
              {t.nav.map((item, i) => (
                <li key={item} className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] ${i === 0 ? "bg-primary/10 text-white shadow-[inset_2px_0_0_#00f0ff]" : "text-gray-400"}`}>
                  <Icon name={navIcons[i]} className={`h-4 w-4 ${i === 0 ? "text-primary" : ""}`} />{item}
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-gray-500 sm:max-w-xs">
                <Icon name="search" className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{t.search}</span>
                <span className="ml-auto hidden rounded border border-white/10 px-1.5 text-[10px] sm:inline">Ctrl K</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="hidden rounded-md border border-white/[0.07] p-0.5 text-[10px] font-semibold sm:flex"><span className={`rounded px-1.5 py-0.5 ${lang === "en" ? "bg-primary/15 text-primary" : "text-gray-500"}`}>EN</span><span className={`rounded px-1.5 py-0.5 ${lang === "gr" ? "bg-primary/15 text-primary" : "text-gray-500"}`}>EL</span></span>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-400"><Icon name="bell" /><span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" /></span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-secondary text-[11px] font-bold text-white">AI</span>
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-display text-xl font-semibold text-white sm:text-2xl">{t.title}</p>
                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">{t.subtitle}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/[0.06] px-3 py-1.5 text-xs text-gray-200"><Icon name="calendar" className="h-3.5 w-3.5 text-primary" />{t.range}<Icon name="chevron" className="h-3.5 w-3.5 text-gray-500" /></span>
              </div>

              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {t.kpis.map((kpi, i) => (
                  <Panel key={kpi.label} className="p-3 sm:p-4">
                    <p className="truncate text-[11px] text-gray-400 sm:text-xs">{kpi.label}</p>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg font-semibold text-white sm:text-2xl">{kpi.value}</p>
                        <p className="mt-0.5 flex items-center gap-1.5"><Delta value={kpi.delta} /><span className="hidden truncate text-[10px] text-gray-500 2xl:inline">{t.trend}</span></p>
                      </div>
                      <span className="hidden shrink-0 sm:block"><Sparkline points={sparks[i]} id={`${idPrefix}-${lang}-${i}`} /></span>
                    </div>
                  </Panel>
                ))}
              </div>

              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-500">{t.allTime}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {t.saved.map((item, i) => (
                    <Panel key={item.label} className="relative overflow-hidden p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon name={i === 0 ? "clock" : "wallet"} /></span>
                        <div className="min-w-0">
                          <p className="truncate text-xs text-gray-400">{item.label}</p>
                          <p className="flex items-baseline gap-2"><span className="font-display text-xl font-semibold text-white">{item.value}</span><Delta value={item.delta} /></p>
                        </div>
                      </div>
                      <span className="absolute -bottom-8 right-0 h-20 w-2/3 bg-[radial-gradient(ellipse_at_bottom_right,rgba(112,0,255,0.22),transparent_70%)]" />
                    </Panel>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-5">
                <Panel className="flex min-w-0 flex-col p-4 sm:p-5 lg:col-span-3">
                  <p className="font-display text-base font-semibold text-white">{t.pipeline.title}</p>
                  <p className="text-xs text-gray-400">{t.pipeline.body}</p>
                  <div className="my-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-1">
                    {t.pipeline.stages.map((stage, i) => (
                      <div key={stage.label} className="dash-stage relative flex flex-col items-center justify-center rounded-lg px-4 py-4 text-center sm:rounded-none sm:py-5" style={{ "--tone": stageTones[i] } as CSSProperties}>
                        <span className="text-[11px] font-medium text-gray-200 sm:text-xs">{stage.label}</span>
                        <span className="mt-1 font-display text-2xl font-semibold" style={{ color: `rgb(${stageTones[i]})` }}>{stage.value}</span>
                        <span className="text-[10px] text-gray-400">{stage.share}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <div className="mb-1.5 flex justify-between text-[11px] text-gray-400"><span>{t.pipeline.stages[0].label} → {t.pipeline.stages[3].label}</span><span className="text-white">{t.pipeline.stages[3].share}</span></div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><span className="dash-bar-x block h-full rounded-full bg-gradient-to-r from-primary via-[#3b6bff] to-[#b24cff]" style={{ width: t.pipeline.stages[3].share }} /></div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-3 text-xs text-gray-400">
                    <span>{t.pipeline.stages[0].value} → {t.pipeline.stages[3].value}</span>
                    <span>{t.pipeline.open} <span className="ml-1 font-semibold text-white">{t.kpis[2].value}</span></span>
                  </div>
                </Panel>

                <Panel className="min-w-0 p-4 sm:p-5 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-base font-semibold text-white">{t.activity.title}</p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300"><span className="dash-live h-1.5 w-1.5 rounded-full bg-emerald-400" />{t.activity.live}</span>
                  </div>
                  <ul className="mt-3 divide-y divide-white/[0.05]">
                    {t.activity.items.map((item) => (
                      <li key={item.title} className="flex gap-3 py-2.5">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activityTone[item.kind]}`}><Icon name={activityIcon[item.kind]} className="h-3.5 w-3.5" /></span>
                        <div className="min-w-0 flex-1">
                          <p className="flex items-baseline justify-between gap-2"><span className="truncate text-xs font-medium text-white">{item.title}</span><span className="shrink-0 text-[10px] text-gray-500">{item.time}</span></p>
                          <p className="truncate text-[11px] text-gray-400">{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>

              <Panel className="p-4 sm:p-5">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <p className="font-display text-base font-semibold text-white">{t.chart.title}</p>
                    <p className="text-xs text-gray-400">{t.chart.body}</p>
                  </div>
                  <p className="font-display text-2xl font-semibold text-white">{t.chart.total}</p>
                </div>
                <div className="relative mt-4 h-28 sm:h-36">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3].map((line) => <span key={line} className="border-t border-dashed border-white/[0.06]" />)}
                  </div>
                  <div className="relative flex h-full items-end gap-1.5 sm:gap-3">
                    {weekly.map((value, i) => (
                      <span key={i} className={`dash-bar flex-1 rounded-t-[4px] ${i === weekly.length - 1 ? "bg-gradient-to-t from-primary/40 to-primary" : "bg-gradient-to-t from-secondary/30 to-[#3b6bff]/70"}`} style={{ height: `${(value / peak) * 100}%`, "--bar-delay": `${i * 45}ms` } as CSSProperties} />
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-gray-500">{t.chart.ticks.map((tick) => <span key={tick}>{tick}</span>)}</div>
              </Panel>
            </div>
          </div>
        </div>
      </div>
      </AppWindow>
      <figcaption className="mt-4 text-xs leading-relaxed text-gray-400">{caption}</figcaption>
    </figure>
  );
}
