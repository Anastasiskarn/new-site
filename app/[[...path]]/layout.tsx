import type { ReactNode } from "react";
import { DM_Sans, Manrope, Space_Grotesk } from "next/font/google";
import { isLocale } from "../../lib/routes";
import "../../assets/css/input.css";
import "../globals.css";
// English keeps the brand pair. Greek uses one Greek/Latin family so mixed-script
// text, accents and weights stay consistent instead of falling back per glyph.
const body = DM_Sans({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-dm-sans" });
const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-space-grotesk" });
const greek = Manrope({ subsets: ["greek", "latin"], display: "swap", variable: "--font-greek", preload: false });
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
    <html lang={lang === "gr" ? "el" : "en"} dir="ltr" className={lang === "gr" ? greek.variable : `${body.variable} ${display.variable}`}>
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
