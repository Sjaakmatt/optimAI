import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, MapPin } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Logostrook } from '@/components/site/Logostrook';
import { HeroKeuze, DageraadKeuze } from '@/components/home/HeroKeuze';
import { Projecten } from '@/components/home/Projecten';
import { WatHijDoet } from '@/components/home/WatHijDoet';
import { Aanpak } from '@/components/home/Aanpak';
import { Afspraken } from '@/components/home/Afspraken';
import { Portret } from '@/components/home/Portret';
import { Grond } from '@/components/home/Grond';
import { Opkomend, Verschijn } from '@/components/home/Opkomend';
import { calPopupAttrs } from '@/components/booking/config';
import { CASES } from '@/lib/data/cases';
import { TEAM } from '@/lib/data/team';

export const metadata: Metadata = {
  title: 'FactumAI · AI-agents voor MKB',
  description:
    'FactumAI bouwt AI-agents voor Nederlandse MKB-bedrijven: digitale collega\'s die mails afhandelen, offertes opvolgen en bestellingen klaarzetten. Op maat, binnen uw regels, met een mens die goedkeurt. Vaste prijs per fase.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <SitePage lucht={false}>
      <Grond />
      <HeroKeuze />
      <Klanten />
      <WatHijDoet />
      <Wie />
      <Projecten />
      <Aanpak />
      <Afspraken />
      <OntdekBand />
      <DageraadKeuze />
    </SitePage>
  );
}

function Kop({
  eyebrow,
  regels,
  tekst,
  centreer = false,
}: {
  eyebrow?: string;
  regels: string[];
  tekst?: string;
  centreer?: boolean;
}) {
  return (
    <div className={centreer ? 'mx-auto max-w-[720px] text-center' : 'max-w-[720px]'}>
      {eyebrow && (
        <Verschijn inView>
          <div className="eyebrow mb-3">{eyebrow}</div>
        </Verschijn>
      )}
      <Opkomend
        as="h2"
        inView
        className="font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]"
        regels={regels}
      />
      {tekst && (
        <Verschijn inView vertraging={0.2}>
          <p className="mt-5 text-[15.5px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">{tekst}</p>
        </Verschijn>
      )}
    </div>
  );
}

function Klanten() {
  const clients = CASES.filter((c) => c.logo);
  if (clients.length === 0) return null;
  return (
    <section className="band pt-4 pb-6 sm:pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
        <div className="eyebrow shrink-0 !text-[var(--fg-faint)]">In productie bij</div>
        <Logostrook klanten={clients} />
      </div>
    </section>
  );
}


function Wie() {
  const sjaak = TEAM[0];
  return (
    <section className="relative mt-24 sm:mt-32 overflow-hidden">
      <div className="band grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Verschijn inView>
          <Portret src="/portret-cutout.png" alt={`${sjaak.voornaam} ${sjaak.achternaam}, oprichter van FactumAI`} />
        </Verschijn>
        <div className="relative pb-6 lg:pb-16">
          <Opkomend
            as="h2"
            inView
            className="font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]"
            regels={['Geen accountmanager.', 'De bouwer zelf.']}
          />
          <Verschijn inView vertraging={0.2}>
            <p className="mt-6 text-[16px] leading-[1.65] text-[var(--fg-dim)] sm:text-[17px]">
              {sjaak.langeBio[1]}
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-[var(--fg-faint)]">{sjaak.korteBio}</p>
          </Verschijn>
          <Verschijn inView vertraging={0.3} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div>
              <div className="text-[15px] text-[var(--fg)]">
                {sjaak.voornaam} {sjaak.achternaam}
              </div>
              <div className="text-[13px] text-[var(--fg-faint)]">{sjaak.rol}</div>
            </div>
            <span className="hidden h-8 w-px bg-[var(--border-strong)] sm:block" aria-hidden />
            <div className="flex items-center gap-1.5 text-[13px] text-[var(--fg-faint)]">
              <MapPin size={13} strokeWidth={2} />
              {sjaak.vestiging}
            </div>
          </Verschijn>
          <Verschijn inView vertraging={0.4} className="mt-8 flex flex-wrap gap-3">
            <Link href="/plan" {...calPopupAttrs} className="knop knop-primair">
              Plan een gesprek
            </Link>
            <Link href={`/over/${sjaak.slug}`} className="knop knop-glas">
              Meer over {sjaak.voornaam}
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </Verschijn>
        </div>
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
              Zie in drie minuten hoe een digitale collega leest, denkt en levert. En waar hij stopt,
              omdat u beslist.
            </p>
          </div>
          <Link href="/ontdek" className="knop knop-glas shrink-0 self-start md:self-auto">
            Ontdek FactumAI agents
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </Verschijn>
    </section>
  );
}

