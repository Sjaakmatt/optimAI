import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { SitePage } from "@/components/site/SitePage";
import { Logostrook } from "@/components/site/Logostrook";
import { HeroKeuze, DageraadKeuze } from "@/components/home/HeroKeuze";
import { Projecten } from "@/components/home/Projecten";
import { WatHijDoet } from "@/components/home/WatHijDoet";
import { Aanpak } from "@/components/home/Aanpak";
import { Afspraken } from "@/components/home/Afspraken";
import { TeamVerhaal } from "@/components/home/TeamVerhaal";
import "./home.css";
import { VideoCarousel } from "@/components/home/VideoCarousel";
import { Verschijn } from "@/components/home/Opkomend";
import { CASES } from "@/lib/data/cases";

export const metadata: Metadata = {
  title: "FactumAI · AI-agents voor MKB",
  description:
    "FactumAI bouwt AI-agents voor Nederlandse MKB-bedrijven: digitale collega's die mails afhandelen, offertes opvolgen en bestellingen klaarzetten. Op maat, binnen uw regels, met een mens die goedkeurt. Vaste prijs per fase.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <SitePage lucht={false}>
      <div className="home-world">
        <HeroKeuze />
        <Klanten />
        <VideoCarousel />
        <div className="home-practice" id="in-de-praktijk">
          <WatHijDoet />
        </div>
        <div className="home-founder">
          <TeamVerhaal />
        </div>
        <div className="home-projects">
          <Projecten />
        </div>
        <div className="home-method">
          <Aanpak />
          <Afspraken />
          <OntdekBand />
        </div>
        <DageraadKeuze />
      </div>
    </SitePage>
  );
}

function Klanten() {
  const clients = CASES.filter((c) => c.logo);
  if (clients.length === 0) return null;
  return (
    <section className="band pt-4 pb-6 sm:pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
        <div className="eyebrow shrink-0 !text-[var(--fg-faint)]">
          In productie bij
        </div>
        <Logostrook klanten={clients} />
      </div>
    </section>
  );
}

function OntdekBand() {
  return (
    <section className="band pt-20 sm:pt-24">
      <Verschijn inView>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-[var(--fg)] sm:text-[32px]">
              Wat is een AI-agent eigenlijk?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-[var(--fg-dim)]">
              Zie in drie minuten hoe een digitale collega leest, denkt en
              levert. En waar hij stopt, omdat u beslist.
            </p>
          </div>
          <Link
            href="/ontdek"
            className="knop knop-glas shrink-0 self-start md:self-auto"
          >
            Ontdek FactumAI agents
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </Verschijn>
    </section>
  );
}
