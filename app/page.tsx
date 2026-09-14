import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Logostrook } from '@/components/site/Logostrook';
import { HeroKeuze, DageraadKeuze } from '@/components/home/HeroKeuze';
import { Projecten } from '@/components/home/Projecten';
import { WatHijDoet } from '@/components/home/WatHijDoet';
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
    <SitePage>
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
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-[78%] -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 116, 74, 0.28) 0%, rgba(43, 26, 46, 0.35) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div className="band grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Verschijn inView className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="portret-vervaag relative aspect-[916/1315] w-full">
            <Image
              src="/portret-cutout.png"
              alt={`${sjaak.voornaam} ${sjaak.achternaam}, oprichter van FactumAI`}
              fill
              sizes="(min-width: 1024px) 480px, 80vw"
              className="object-contain object-bottom"
              priority={false}
            />
          </div>
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


function Aanpak() {
  const stappen = [
    ['Kennismaken', 'Eén gesprek bij u of bij ons. Wij kijken wat uw mensen vooral kost.'],
    ['Ontwerpen', 'Samen kiezen we één proces waar de grootste winst zit.'],
    ['Bouwen', 'In fasen. Elke fase eindigt in iets werkends dat u ziet en goedkeurt.'],
    ['Implementeren', 'Koppelen aan uw systemen. Uw mensen krijgen uitleg over het beheer.'],
    ['Bijhouden', 'Maandelijks een kort gesprek om bij te sturen.'],
  ];
  return (
    <section className="band pt-24 sm:pt-32">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Kop
          eyebrow="Onze aanpak"
          regels={['Kennismaken, ontwerpen,', 'bouwen, implementeren.']}
          tekst="Het eerste gesprek is altijd vrijblijvend. Zo ja, dan komt er een voorstel: één agent, vaste prijs per fase, en elke fase eindigt in iets dat werkt. Geen pilot van zes maanden zonder resultaat."
        />
        <ol className="lg:pt-2">
          {stappen.map(([titel, body], i) => (
            <Verschijn key={titel} inView vertraging={0.06 * i}>
              <li className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 border-t border-[var(--border)] py-5 sm:grid-cols-[72px_minmax(0,1fr)] sm:py-6">
                <span className="font-mono text-[12px] tracking-[0.12em] text-[var(--accent-text)] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="grid gap-x-8 gap-y-1 sm:grid-cols-[160px_minmax(0,1fr)]">
                  <div className="text-[17px] text-[var(--fg)]">{titel}</div>
                  <p className="text-[14.5px] leading-[1.6] text-[var(--fg-dim)]">{body}</p>
                </div>
              </li>
            </Verschijn>
          ))}
          <li className="border-t border-[var(--border)]" aria-hidden />
        </ol>
      </div>
    </section>
  );
}

function Afspraken() {
  const cells = [
    {
      icoon: ShieldCheck,
      label: 'Mens beslist',
      body: 'Elke uitgaande mail, bestelling of statuswijziging staat eerst als concept klaar en wordt door uw mensen goedgekeurd.',
    },
    {
      icoon: MapPin,
      label: 'Data in Frankfurt',
      body: 'Applicatie en database draaien in Europa. De taalmodelcalls lopen via Anthropic in de VS, opgenomen in onze sub-verwerkerslijst.',
    },
    {
      icoon: Clock,
      label: 'Eén maand opzegtermijn',
      body: 'Geen minimale looptijd na de eerste drie maanden. Levert het niet, dan stopt u.',
    },
  ];
  return (
    <section className="band pt-20 sm:pt-28">
      <Kop regels={['Drie afspraken.', 'Geen kleine lettertjes.']} />
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
        {cells.map((c, i) => (
          <Verschijn key={c.label} inView vertraging={0.1 * i}>
            <div className={i > 0 ? 'md:border-l md:border-[var(--border)] md:pl-8' : 'md:pr-8'}>
              <c.icoon size={20} strokeWidth={1.8} className="text-[var(--accent-text)]" />
              <div className="mt-4 text-[20px] leading-tight text-[var(--fg)]">{c.label}</div>
              <p className="mt-2 max-w-[320px] text-[14px] leading-[1.6] text-[var(--fg-dim)]">{c.body}</p>
            </div>
          </Verschijn>
        ))}
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

