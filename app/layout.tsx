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

export const metadata: Metadata = {
  title: "FactumAI · De Werkbank",
  description: "Digitale werkbank — Nordveld Groothandel",
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
