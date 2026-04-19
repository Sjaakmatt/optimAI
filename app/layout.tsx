import type { Metadata } from "next";
import { Fraunces, Lora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://factumai.nl";
const SITE_NAME = "FactumAI";
const DEFAULT_DESCRIPTION =
  "AI-agents die het dagelijkse werk van MKB-bedrijven overnemen. Mails, offertes, orders, facturatie, inkoop, planning. Nederlands, pragmatisch, zonder dashboard-gedoe.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FactumAI · AI-agents voor MKB",
    template: "%s · FactumAI",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "FactumAI" }],
  keywords: [
    "AI agents",
    "MKB",
    "automatisering",
    "digitale medewerker",
    "multi-agent",
    "Nederland",
    "groothandel",
    "offertes",
    "orderverwerking",
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "FactumAI · AI-agents voor MKB",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "FactumAI · AI-agents voor MKB",
    description: DEFAULT_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${lora.variable} ${plexMono.variable}`}>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
