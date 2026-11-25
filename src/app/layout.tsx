import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/common/motion/primitives";
import { site } from "@/content/site";
import "./globals.css";

const serifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const sansFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// Keyword in testa, brand in coda, sotto i ~60 caratteri per non essere troncato in SERP.
const defaultTitle = "Siti web, foto e video per B&B e hotel in Sardegna · ORMA";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: "%s · ORMA" },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "realizzazione siti web Sardegna",
    "web designer Sardegna",
    "siti web B&B Sardegna",
    "siti web per strutture ricettive",
    "web design hospitality",
    "fotografia hotel Sardegna",
    "video hotel Sardegna",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${serifFont.variable} ${sansFont.variable}`} data-scroll-behavior="smooth">
      <body id="top">
        {/* Header e footer stanno in app/(site)/layout.tsx: la 404 (app/not-found.tsx) resta fuori dal sito. */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
