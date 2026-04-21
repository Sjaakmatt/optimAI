import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';

export const metadata: Metadata = {
  title: 'FactumAI · AI-agents voor MKB',
  description:
    'AI-agent laten bouwen voor uw MKB-bedrijf. Vaste bouwprijs, eerste agent live in 1 tot 2 weken. Optionele retainer voor onderhoud en monitoring, u kiest zelf. Mails, offertes, planning, inkoop, rapportage.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <SitePage>
      <Hero />
      <WatDoenWe />
      <Stats />
      <VoorWie />
      <DemoDivider />
      <DemoTeaser />
      <Aanpak />
    </SitePage>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-[820px] relative">
          <div
            aria-hidden
            className="hidden sm:block absolute -left-4 top-2 bottom-6 w-[2px]"
            style={{
              background:
                'linear-gradient(to bottom, var(--oker) 0%, var(--oker) 40%, transparent 100%)',
              opacity: 0.55,
            }}
          />
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            AI-agents voor MKB · Nederland
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            <span className="ink-highlight">Menselijk</span> waar het moet,{' '}
            <span className="italic text-[var(--oker-deep)]">AI waar het kan.</span>
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[620px]">
            FactumAI bouwt AI-agents voor Nederlandse MKB-bedrijven. Een AI-agent is een digitale
            medewerker die terugkerend werk overneemt: administratie, planning, inkoop,
            klantcommunicatie, rapportage. Op maat voor uw bedrijf, binnen uw regels, met duidelijke
            grip. Zodat uw mensen bezig zijn met waar ze goed in zijn.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
            >
              Bekijk de demo
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
            >
              Maak kennis
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 text-[12px] text-[var(--ink-faint)]">
            <span
              className="h-[1px] w-10"
              style={{ background: 'var(--oker)' }}
              aria-hidden
            />
            <span className="font-mono uppercase tracking-[0.18em]">
              Vaste bouwprijs · live in 1 tot 2 weken · retainer optioneel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WatDoenWe() {
  const items = [
    {
      eyebrow: '01 · Bouwen',
      title: 'Op maat voor uw werk',
      body:
        'Wij beginnen bij wat uw mensen elke dag doen. Welke taken kosten tijd? Welk werk blijft liggen? Waar loopt u vast? Daar bouwen wij de agent omheen. Geen generieke oplossing. Iets dat past bij uw bedrijf.',
    },
    {
      eyebrow: '02 · Implementeren',
      title: 'Koppelen aan uw systemen',
      body:
        'De agent praat met uw e-mail, boekhoudpakket, magazijn-app, CRM, planner. Wij regelen die integraties. U bepaalt zelf wat automatisch mag en wat altijd langs u komt.',
    },
    {
      eyebrow: '03 · Bijhouden',
      title: 'Meegroeien met de praktijk',
      body:
        'Nieuwe leverancier erbij? Andere toon op uw mails? Scherpere marge? Wij passen de agent aan. Eens per maand een kort gesprek. Geen helpdesk waar u eerst een ticket moet schrijven.',
    },
  ];
  return (
    <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          Wat doen wij
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)] max-w-[720px]">
          Bouwen, implementeren, bijhouden.
          <span className="italic text-[var(--oker-deep)]"> Alle drie.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((it) => (
            <article key={it.eyebrow} className="site-card px-6 py-7">
              <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
                {it.eyebrow}
              </div>
              <h3 className="mt-2 font-display text-[20px] leading-tight text-[var(--ink)]">
                {it.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoorWie() {
  const werkgebieden = [
    'Terugkerende administratie',
    'Klant- en leverancierscommunicatie',
    'Offertes en orderverwerking',
    'Inkoop en voorraadbeheer',
    'Planning en logistiek',
    'Rapportage en opvolging',
  ];
  return (
    <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
      <div className="max-w-[780px]">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          Voor wie
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)]">
          Bedrijven waar mensen{' '}
          <span className="italic text-[var(--oker-deep)]">harder werken</span> dan ze zouden
          moeten.
        </h2>
        <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-[var(--ink-dim)] max-w-[640px]">
          Wij werken met ondernemers die merken dat hun mensen te veel tijd kwijt zijn aan
          terugkerend werk. Overal waar een mens dezelfde handeling te vaak doet, ontstaat
          ruimte. Denk aan:
        </p>
      </div>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {werkgebieden.map((b) => (
          <li
            key={b}
            className="px-4 py-3 rounded-[2px] border border-[var(--paper-edge)] text-[13.5px] sm:text-[14px] text-[var(--ink)] bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors flex items-baseline gap-2.5"
          >
            <span
              aria-hidden
              className="font-mono text-[11px] text-[var(--steen)] tracking-[0.1em]"
            >
              —
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DemoTeaser() {
  return (
    <section className="border-t border-[var(--paper-edge)] bg-[var(--ink)] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 82% 25%, rgba(161, 88, 66, 0.18) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
          <div className="max-w-[620px]">
            <div className="font-mono text-[11px] text-[var(--oker)] uppercase tracking-[0.2em]">
              Zie het werken
            </div>
            <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--paper)]">
              De Werkbank.{' '}
              <span className="italic text-[var(--oker)]">Een live demo.</span>
            </h2>
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-[var(--paper-deep)]">
              Kies een klantvraag (klacht, order, offerte) en kijk hoe acht afdelingen samen aan
              de slag gaan. Ze zoeken het klantdossier op, passen uw beleidsregels toe, schrijven
              de mail, zetten een creditnota klaar, regelen het transport. Alles als
              papier-achtige documenten, zoals u ze elke dag op uw bureau krijgt.
            </p>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors shrink-0 lift-on-hover"
          >
            Open de demo
            <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Aanpak() {
  return (
    <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
        <div>
          <div className="font-mono text-[11px] text-[var(--mos)] uppercase tracking-[0.2em]">
            Onze aanpak
          </div>
          <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-[1.15] text-[var(--ink)]">
            Kennismaken, ontwerpen, bouwen,{' '}
            <span className="italic text-[var(--oker-deep)]">implementeren.</span>
          </h2>
          <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.65] text-[var(--ink-dim)]">
            Het eerste gesprek is altijd vrijblijvend. Wij kijken samen of er iets concreets te
            winnen valt. Zo ja, dan komt er een voorstel: één agent, vaste prijs, duidelijke
            opleveringsdatum. Geen pilot van zes maanden zonder resultaat.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
            <Link
              href="/over"
              className="inline-flex items-center gap-1.5 text-[var(--oker-deep)] hover:text-[var(--ink)] transition-colors"
            >
              Meer over ons
              <ArrowRight size={14} strokeWidth={1.8} />
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center gap-1.5 text-[var(--oker-deep)] hover:text-[var(--ink)] transition-colors"
            >
              Voorbeelden bekijken
              <ArrowRight size={14} strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        <ol className="space-y-5 text-[14px]">
          {[
            ['Kennismaken', 'Eén gesprek bij u of bij ons. Wij kijken wat uw mensen vooral kost.'],
            ['Ontwerpen', 'Samen kiezen we één proces waar de grootste winst zit.'],
            ['Bouwen', 'Wij bouwen de agent, u test mee. Een eerste agent staat vaak al binnen één tot twee weken live.'],
            ['Implementeren', 'Koppelen aan uw systemen. Uw mensen krijgen uitleg over het beheer.'],
            ['Bijhouden', 'Maandelijks een kort gesprek om aan te passen.'],
          ].map(([title, body], i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-[11px] text-[var(--oker)] tabular-nums pt-1 w-8 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="font-display text-[16px] text-[var(--ink)]">{title}</div>
                <div className="text-[13.5px] text-[var(--ink-dim)] leading-[1.65] mt-0.5">
                  {body}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stats() {
  const cells = [
    {
      value: '1–2 wk',
      label: 'Eerste agent live',
      body: 'Van kennismaking tot een werkende agent in uw praktijk.',
      italic: false,
    },
    {
      value: '~40%',
      label: 'Tijdwinst',
      body: 'Op terugkerend werk — mails, orders, offertes, planning.',
      italic: true,
    },
    {
      value: '8',
      label: 'Afdelingen',
      body: 'Samenwerkende agents in de Werkbank, elk met eigen rol.',
      italic: false,
    },
  ];
  return (
    <section className="border-t border-[var(--paper-edge)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {cells.map((c, i) => (
            <div
              key={c.label}
              className={
                'px-0 md:px-8 py-6 md:py-2' +
                (i > 0 ? ' md:border-l border-[var(--paper-edge)]' : '')
              }
            >
              <div
                className={
                  'font-display tabular-nums text-[72px] sm:text-[88px] lg:text-[96px] leading-[0.95] tracking-tight ' +
                  (c.italic ? 'italic text-[var(--oker-deep)]' : 'text-[var(--ink)]')
                }
              >
                {c.value}
              </div>
              <div className="mt-3 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
                {c.label}
              </div>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--ink-dim)] max-w-[280px]">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoDivider() {
  return (
    <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-6 sm:pb-8">
      <div className="ornament-divider">
        <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.24em]">
          Demo
        </span>
      </div>
    </div>
  );
}
