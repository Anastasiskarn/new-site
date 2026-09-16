import type { ReactNode } from "react";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { isLocale } from "../../lib/routes";
import "../../assets/css/input.css";
import "../globals.css";
// The brand pair from DESIGN.md, self-hosted by next/font and exposed as variables for the Tailwind stacks.
// Neither family ships Greek glyphs, so Greek text keeps the system fallback in the same stacks.
const body = DM_Sans({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-dm-sans" });
const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-space-grotesk" });
export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ path?: string[] }>;
}) {
  const { path = [] } = await params;
  const lang = isLocale(path[0]) ? path[0] : "gr";
  return (
    <html lang={lang === "gr" ? "el" : "en"} dir="ltr" className={`${body.variable} ${display.variable}`}>
      <head>
        <meta name="theme-color" content="#050507" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-dark-900 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
