import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OptimAI — Procesoptimalisatie voor MKB",
  description: "Wij spotten verspilling in je bedrijfsprocessen en lossen het op met AI. Geen buzzwords, gewoon resultaat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}