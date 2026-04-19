import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { CASES } from '@/lib/data/cases';

export const metadata: Metadata = {
  title: 'FactumAI — AI-agents voor MKB',
  description:
    'Wij bouwen en implementeren AI-agents die het dagelijkse werk van MKB-bedrijven overnemen: mails, offertes, orderverwerking, facturatie, inkoop, planning.',
};

export default function HomePage() {
  return (
    <SitePage>
      <Hero />
      <WatDoenWe />
      <VoorWie />
      <Klanten />
      <DemoTeaser />
      <Aanpak />
    </SitePage>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-[760px] relative">
          {/* Hand-drawn ink streep links van hero */}
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
          <h1 className="mt-4 font-display text-[38px] sm:text-[52px] lg:text-[62px] leading-[1.02] tracking-tight text-[var(--ink)]">
            Uw digitale <span className="ink-highlight">collega</span>,
            <br />
            <span className="italic text-[var(--ink-dim)]">niet uw dashboard.</span>
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[580px]">
            Wij bouwen AI-agents die het échte werk overnemen — mails, offertes, orderverwerking,
            inkoop, planning, facturatie. Geen extra tool om te leren, gewoon meer gedaan.
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
              Vaste prijs · 4-8 weken live · geen abonnementspest
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
        'We starten bij uw dagelijkse handelingen: welke mails, offertes, orders, planningen kosten tijd? Daar bouwen we de agent omheen. Geen generieke chatbot, maar iets dat ú kent.',
    },
    {
      eyebrow: '02 · Implementeren',
      title: 'Koppelen aan uw systemen',
      body:
        'De agent praat met uw e-mail, boekhoudpakket, magazijn-app, CRM. We regelen de integraties. U houdt het beheer van wat mag automatisch en wat langs u komt.',
    },
    {
      eyebrow: '03 · Bijhouden',
      title: 'Meegroeien met de praktijk',
      body:
        'Nieuwe leverancier? Andere toon op mails? Scherpere marge? We passen de agent aan. Maandelijks gesprek, geen supportticket.',
    },
  ];
  return (
    <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          Wat doen we
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)] max-w-[720px]">
          Bouwen, implementeren, bijhouden —
          <span className="italic text-[var(--oker-deep)]"> alle drie.</span>
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
  const branches = [
    'Aannemers & bouwbedrijven',
    'Groothandels',
    'Installatietechniek',
    'Productie & assemblage',
    'Adviesbureaus',
    'Transport & logistiek',
  ];
  return (
    <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
      <div className="max-w-[760px]">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          Voor wie
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)]">
          Bedrijven met 10 tot 100 mensen waar de{' '}
          <span className="italic text-[var(--oker-deep)]">administratie</span> sneller groeit dan
          het kantoor.
        </h2>
        <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-[var(--ink-dim)] max-w-[620px]">
          MKB&rsquo;ers die merken dat hun mensen te veel bezig zijn met herhalende taken — en te
          weinig met het échte vakmanschap waar klanten voor komen.
        </p>
      </div>
      <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {branches.map((b) => (
          <li
            key={b}
            className="px-4 py-3 rounded-[2px] border border-[var(--paper-edge)] text-[13.5px] sm:text-[14px] text-[var(--ink)] bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
          >
            {b}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Klanten() {
  return (
    <section
      className="border-t border-[var(--paper-edge)]"
      style={{ background: 'var(--paper-warm)' }}
    >
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 sm:gap-6">
          <div className="max-w-[620px]">
            <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
              Klanten
            </div>
            <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)]">
              MKB-bedrijven die ons zijn{' '}
              <span className="italic text-[var(--oker-deep)]">voorgegaan.</span>
            </h2>
          </div>
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-[13px] text-[var(--oker-deep)] hover:text-[var(--ink)] transition-colors"
          >
            Alle cases bekijken
            <ArrowRight size={14} strokeWidth={1.8} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="site-card px-6 py-6 group"
            >
              <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                {c.branche}
              </div>
              <h3 className="mt-1.5 font-display text-[20px] leading-tight text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                {c.klant}
              </h3>
              <p className="mt-2 text-[13.5px] italic text-[var(--ink-dim)] leading-[1.55]">
                {c.tagline}
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--paper-edge)] flex items-baseline justify-between">
                <span className="font-display text-[22px] text-[var(--oker-deep)]">
                  {c.resultaat[0].metric}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider text-right max-w-[160px]">
                  {c.resultaat[0].label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoTeaser() {
  return (
    <section className="border-t border-[var(--paper-edge)] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 80% 30%, rgba(168, 128, 58, 0.08) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
          <div className="max-w-[620px]">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Zie het werken
            </div>
            <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)]">
              De Werkbank —{' '}
              <span className="italic text-[var(--oker-deep)]">een live demo.</span>
            </h2>
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-[var(--ink-dim)]">
              Trigger een klantvraag — klacht, order, offerte — en kijk hoe acht afdelingen
              samenwerken: dossier-check, beleidsregels toepassen, mails schrijven, creditnota
              opstellen, transport plannen. Alles gebouwd als papier-achtige documenten, zoals u
              ze elke dag op uw bureau ziet.
            </p>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors shrink-0 lift-on-hover"
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
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
            Onze aanpak
          </div>
          <h2 className="mt-2 font-display text-[24px] sm:text-[28px] leading-[1.15] text-[var(--ink)]">
            Kennismaken, ontwerpen,
            <br className="hidden sm:inline" /> bouwen,{' '}
            <span className="italic text-[var(--oker-deep)]">implementeren.</span>
          </h2>
          <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.65] text-[var(--ink-dim)]">
            Eerste gesprek is altijd vrijblijvend. We kijken of er iets concreets te winnen is.
            Als ja, maken we een voorstel — één concrete agent, vaste prijs, duidelijke
            opleveringsdatum. Geen eindeloos pilot-traject.
          </p>
          <div className="mt-6">
            <Link
              href="/over"
              className="inline-flex items-center gap-2 text-[13px] text-[var(--oker-deep)] hover:text-[var(--ink)] transition-colors"
            >
              Meer over ons
              <ArrowRight size={14} strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        <ol className="space-y-5 text-[14px]">
          {[
            ['Kennismaken', 'Eén gesprek bij u of ons. We kijken wat uw mensen vooral kost.'],
            ['Ontwerpen', 'Samen kiezen we één proces waar de grootste winst zit.'],
            ['Bouwen', 'Wij bouwen de agent, u test mee. Meestal 4-8 weken.'],
            ['Implementeren', 'Koppelen aan uw systemen, uw mensen inwerken op het beheer.'],
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
