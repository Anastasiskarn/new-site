import type { ReactNode } from "react";
export function AnchorIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v13M5 12H2a10 10 0 0 0 20 0h-3M8 13h8" />
    </svg>
  );
}
export function Section({
  id,
  title,
  lead,
  children,
  tone = false,
  spacing = "py-16 md:py-28",
}: {
  id?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  tone?: boolean;
  spacing?: string;
}) {
  return (
    <section
      id={id}
      className={`${spacing} scroll-mt-24 ${tone ? "bg-dark-800" : ""}`}
    >
      <div className="mx-auto max-w-8xl px-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white text-balance">
          {title}
        </h2>
        {lead && (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
            {lead}
          </p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
export function Action({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="btn-interactive inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-dark-900 hover:bg-primary"
    >
      {children}
      <span aria-hidden="true" className="ml-3">
        →
      </span>
    </a>
  );
}
