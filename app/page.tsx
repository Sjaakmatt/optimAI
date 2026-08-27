import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Logostrook } from '@/components/site/Logostrook';
import { calPopupAttrs } from '@/components/booking/config';
import { CASES } from '@/lib/data/cases';
import { OPLOSSINGEN, OPLOSSINGEN_FEATURED } from '@/lib/data/oplossingen';

export const metadata: Metadata = {
  title: 'FactumAI · AI-agents voor MKB',
  description:
    'FactumAI bouwt AI-agents voor Nederlandse MKB-bedrijven: digitale collega\'s die mails afhandelen, offertes opvolgen en bestellingen klaarzetten. Op maat, binnen uw regels, met een mens die goedkeurt. Vaste prijs per fase.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <SitePage>
      <Hero />
      <Klanten />
      <VoorWie />
      <OntdekBand />
      <WatDoenWe />
      <Verschil />
      <Stats />
      <DemoDivider />
      <DemoTeaser />
      <Aanpak />
    </SitePage>
  );
}

function Klanten() {
  const clients = CASES.filter((c) => c.logo);
  if (clients.length === 0) return null;
  return (
    <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-warm)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-5 sm:py-7">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em] shrink-0">
            In productie bij
          </div>
          <Logostrook klanten={clients} />
        </div>
      </div>
    </section>
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
            Mails uitzoeken, offertes najagen, bestellingen overtikken. Werk dat af moet, maar
            uw bedrijf niet laat groeien. FactumAI bouwt AI-agents die dat werk klaarzetten zoals
            een goede collega dat zou doen: opzoeken, uitrekenen, voorbereiden. U kijkt het na en
            drukt op de knop. Uw mensen houden hun handen vrij voor het werk waar klanten voor
            terugkomen.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
            >
              Doe de AI-scan
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/plan"
              {...calPopupAttrs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
            >
              Plan een gesprek
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 text-[12px] text-[var(--ink-faint)] pr-24 sm:pr-0">
            <span
              className="h-[1px] w-10"
              style={{ background: 'var(--oker)' }}
              aria-hidden
            />
            <span className="font-mono uppercase tracking-[0.18em]">
              Vaste prijs per fase · elke actie langs een mens · opzegtermijn één maand
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Verschil() {
  const kolommen = [
    {
      eyebrow: '01 · Hij leest wat er echt staat',
      body:
        'Een mail met een bijlage, een klacht die eigenlijk een retour is, een aanvraag waarbij de voorwaarde nergens in een veld staat. Uw pakket kan daar niets mee. Een agent leest het, toetst het aan uw beleid en zet een afhandeling klaar.',
    },
    {
      eyebrow: '02 · Hij rekent met uw eigen cijfers',
      body:
        'Bestelritme per klant, seizoenspatroon per artikel, offertes die te lang openstaan. De gegevens liggen er al, alleen rekent niemand ermee. Een rapportage laat u dat zelf uitzoeken. Een agent levert de uitkomst, met de onderbouwing eronder.',
    },
    {
      eyebrow: '03 · Hij werkt tussen uw systemen',
      body:
        'Tussen de webshop en de boekhouding, tussen de mailbox en de administratie, tussen u en de leverancier. Daar staat nu iemand te kopiëren en te plakken. Precies daar doet een agent zijn werk.',
    },
  ];
  return (
    <section className="border-t border-[var(--paper-edge)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
          Het verschil
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)] max-w-[820px]">
          Uw pakket onthoudt.{' '}
          <span className="italic text-[var(--oker-deep)]">Een agent denkt mee.</span>
        </h2>
        <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-[var(--ink-dim)] max-w-[640px]">
          Uw administratie draait al ergens in, en dat moet vooral zo blijven. Een agent vervangt
          uw pakket niet. Hij pakt het werk op dat uw pakket laat liggen, en dat is meestal dit:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {kolommen.map((k) => (
            <article key={k.eyebrow} className="site-card px-6 py-7">
              <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
                {k.eyebrow}
              </div>
              <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{k.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OntdekBand() {
  return (
    <section className="border-t border-[var(--paper-edge)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* wandelpaadje als uitnodiging */}
          <svg
            viewBox="0 0 200 70"
            className="w-[150px] sm:w-[180px] h-auto shrink-0"
            aria-hidden
            focusable="false"
          >
            <path
              d="M8 60 C 50 52, 46 24, 100 27 C 154 30, 148 56, 192 12"
              fill="none"
              stroke="var(--oker)"
              strokeWidth="1.3"
              strokeDasharray="2 7"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="8" cy="60" r="3" fill="var(--oker)" />
            <circle cx="192" cy="12" r="2.5" fill="none" stroke="var(--oker)" strokeWidth="1.2" />
          </svg>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              Nieuw hier?
            </div>
            <h2 className="mt-2 font-display text-[22px] sm:text-[26px] leading-tight tracking-tight text-[var(--ink)]">
              Wat is een AI-agent{' '}
              <span className="italic text-[var(--oker-deep)]">eigenlijk?</span>
            </h2>
            <p className="mt-2 text-[14px] leading-[1.65] text-[var(--ink-dim)] max-w-[520px]">
              Zie in drie minuten hoe een digitale collega leest, denkt en levert. En waar hij
              stopt, omdat u beslist.
            </p>
          </div>
          <Link
            href="/ontdek"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover shrink-0 self-start md:self-center"
          >
            Ontdek FactumAI agents
            <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
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
        'Wij beginnen bij het werk zoals uw mensen het nu doen. Wat zoeken ze op, wat wegen ze af, wanneer twijfelen ze? Dat bouwen wij na, zodat de agent het voorwerk doet en uw mensen alleen nog goedkeuren.',
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

        <div className="mt-12 pt-8 border-t border-[var(--paper-edge)]">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
            <h3 className="font-display text-[20px] sm:text-[22px] leading-tight text-[var(--ink)]">
              Waar wij{' '}
              <span className="italic text-[var(--oker-deep)]">het vaakst bouwen.</span>
            </h3>
            <Link
              href="/oplossingen"
              className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider hover:text-[var(--ink)] flex items-center gap-1.5"
            >
              Alle {OPLOSSINGEN.length} oplossingen
              <ArrowRight size={12} strokeWidth={1.8} />
            </Link>
          </div>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {OPLOSSINGEN_FEATURED.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/oplossingen/${o.slug}`}
                  className="block h-full px-4 py-3 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] text-[13.5px] text-[var(--ink)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
                >
                  {o.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function VoorWie() {
  const werkgebieden = [
    'Mails die eerst door drie schermen moeten voordat iemand kan antwoorden',
    'Klanten die stil vallen zonder dat iemand het op tijd ziet',
    'Offertes die openstaan zonder dat iemand weet wat de stand is',
    'Bestellingen die op onderbuikgevoel worden geplaatst',
    'Voorraad die te laat of te vroeg binnenkomt',
    'Gegevens die uit het ene pakket in het andere worden overgetypt',
  ];
  return (
    <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
      <div className="max-w-[780px]">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          Voor wie
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)]">
          Er gaat niets mis.{' '}
          <span className="italic text-[var(--oker-deep)]">
            En toch bent u elke week uren kwijt.
          </span>
        </h2>
        <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-[var(--ink-dim)] max-w-[640px]">
          Wij werken voor ondernemers bij wie de basis klopt. Het lek zit niet in uw administratie,
          het zit tussen de schermen. Herkent u dit?
        </p>
      </div>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {werkgebieden.map((b) => (
          <li
            key={b}
            className="px-4 py-3 rounded-[2px] border border-[var(--paper-edge)] text-[13.5px] sm:text-[14px] text-[var(--ink)] bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors flex items-baseline gap-2.5"
          >
            <span
              aria-hidden
              className="font-mono text-[11px] text-[var(--steen)] tracking-[0.1em]"
            >
              ·
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
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
              Zie het werken
            </div>
            <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--paper)]">
              De Werkbank.{' '}
              <span className="italic text-[var(--oker-deep)]">Een live demo.</span>
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
            winnen valt. Zo ja, dan komt er een voorstel: één agent, vaste prijs per fase, en
            elke fase eindigt in iets dat werkt. Geen pilot van zes maanden zonder resultaat.
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
            ['Bouwen', 'Wij bouwen in fasen. Elke fase eindigt in iets werkends dat u ziet en goedkeurt voordat de volgende begint.'],
            ['Implementeren', 'Koppelen aan uw systemen. Uw mensen krijgen uitleg over het beheer.'],
            ['Bijhouden', 'Maandelijks een kort gesprek om aan te passen.'],
          ].map(([title, body], i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-[11px] text-[var(--oker-deep)] tabular-nums pt-1 w-8 shrink-0">
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

interface StatCell {
  /** Optioneel. Alleen invullen als er een cijfer is dat wij kunnen onderbouwen. */
  value?: string;
  label: string;
  body: string;
  italic?: boolean;
}

function Stats() {
  const cells: StatCell[] = [
    {
      label: 'Mens beslist',
      body: 'Elke uitgaande mail, bestelling of statuswijziging staat eerst als concept klaar en wordt door uw mensen goedgekeurd.',
    },
    {
      label: 'Data in Frankfurt',
      body: 'Applicatie en database draaien in Europa. De taalmodelcalls lopen via Anthropic in de VS, opgenomen in onze sub-verwerkerslijst.',
      italic: true,
    },
    {
      label: 'Eén maand opzegtermijn',
      body: 'Geen minimale looptijd na de eerste drie maanden. Levert het niet, dan stopt u.',
    },
  ];
  return (
    <section className="border-t border-[var(--paper-edge)]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          Onze afspraken
        </div>
        <h2 className="mt-2 mb-10 font-display text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[var(--ink)] max-w-[720px]">
          Drie afspraken.{' '}
          <span className="italic text-[var(--oker-deep)]">Geen kleine lettertjes.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {cells.map((c, i) => (
            <div
              key={c.label}
              className={
                'px-0 md:px-8 py-6 md:py-2' +
                (i > 0 ? ' md:border-l border-[var(--paper-edge)]' : '')
              }
            >
              {c.value && (
                <div
                  className={
                    'font-display tabular-nums text-[72px] sm:text-[88px] lg:text-[96px] leading-[0.95] tracking-tight ' +
                    (c.italic ? 'italic text-[var(--oker-deep)]' : 'text-[var(--ink)]')
                  }
                >
                  {c.value}
                </div>
              )}
              <div
                className={
                  c.value
                    ? 'mt-3 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]'
                    : 'font-display text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.1] tracking-tight ' +
                      (c.italic ? 'italic text-[var(--oker-deep)]' : 'text-[var(--ink)]')
                }
              >
                {c.label}
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[var(--ink-dim)] max-w-[280px]">
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
