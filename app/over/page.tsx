import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';

export const metadata: Metadata = {
  title: 'Over ons — FactumAI',
  description:
    'FactumAI is opgericht om AI-agents toegankelijk te maken voor MKB-bedrijven. Nederlands, pragmatisch, vakmanschap boven hype.',
};

export default function OverPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="max-w-[720px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Over ons
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Eén oprichter,<br />
            <span className="italic text-[var(--oker-deep)]">twee voeten in de praktijk.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            FactumAI is opgericht om AI-agents bereikbaar te maken voor bedrijven die geen
            data-afdeling hebben. Geen hype, geen consultancy-verhaal. Gewoon goed gemaakt werk.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 md:gap-12 lg:gap-14">
          <div>
            <PhotoPlaceholder />
            <div className="mt-4">
              <div className="font-display text-[18px] text-[var(--ink)]">Sjaak ter Veld</div>
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider mt-0.5">
                Oprichter · Sparringpartner
              </div>
              <div className="mt-2 text-[12.5px] text-[var(--ink-dim)] leading-snug">
                Hoogkarspel · West-Friesland
              </div>
            </div>
          </div>

          <div className="drop-cap space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
            <p>
              Ik ben Sjaak ter Veld. Opgeleid in de bedrijfskunde, maar al meer dan acht jaar met
              één been in de IT — en met het andere stevig in de dagelijkse werkelijkheid van
              bedrijven. In die jaren heb ik me gespecialiseerd in waar organisaties vastlopen:
              processen die ooit werkten maar niet meer passen, strategieën die op papier kloppen
              maar in de praktijk schuren, projecten die keer op keer later opgeleverd worden dan
              gepland.
            </p>
            <p>
              Wat me daarin altijd het meest interesseert, is het gesprek met de mensen aan tafel.
              Niet de framework van de maand of de laatste management-theorie — maar wat iemand
              zijn ochtend écht kost. Welke mail blijft al dagen liggen? Welke telefoon wordt
              steeds vooruitgeschoven? Welke handeling doet uw binnendienst voor de derde keer
              deze week? Daar kom ik vanzelf op oplossingen die werken, omdat ze uitgaan van het
              echte werk.
            </p>
            <p>
              Ik woon in Hoogkarspel — midden in West-Friesland, dichtbij veel aannemers,
              groothandels en installatiebedrijven. De wereld die ik wil helpen. FactumAI is voor
              mij de natuurlijke volgende stap: AI-agents zijn geen hype meer, ze doen echt werk.
              En juist voor MKB-bedrijven, waar de administratie harder groeit dan het kantoor,
              kan het het verschil maken.
            </p>
            <p>
              Ik vind het oprecht leuk om met een ondernemer aan tafel te zitten, door zijn dag
              te lopen, en te zien waar ik kan helpen. Een koffie, een paar vragen, en meestal
              ligt er binnen een half uur een concreet punt op tafel. Daar gaat het voor mij om —
              niet in visie-documenten, wel in sparren.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-t border-[var(--paper-edge)]"
        style={{ background: 'var(--paper-warm)' }}
      >
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.2em]">
            Waar wij in geloven
          </div>
          <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.1] text-[var(--ink)] max-w-[720px]">
            Drie uitgangspunten die{' '}
            <span className="italic text-[var(--oker-deep)]">alles bepalen.</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            <Principle
              number="I"
              title="Werk als ster, niet de machine."
              body="Uw mensen, uw klanten, uw processen staan centraal. De agent is ondersteunend — een goed stuk gereedschap, geen regiekamer."
            />
            <Principle
              number="II"
              title="Vakmanschap boven hype."
              body="We bouwen zoals een meubelmaker: rustig, precies, met materiaal dat blijft. Geen wekelijkse pivot in framework."
            />
            <Principle
              number="III"
              title="U houdt de knoppen."
              body="Elke automatische beslissing is toe te schrijven aan een regel die u zelf kunt aan- of uitzetten. Geen blackbox."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[540px] leading-snug">
              Zin in een gesprek? Of eerst{' '}
              <span className="italic text-[var(--oker-deep)]">de demo</span> zien?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
              >
                Demo openen
                <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] hover:border-[var(--oker)] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}

function PhotoPlaceholder() {
  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[320px] rounded-[2px] border border-[var(--paper-edge)] overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--paper-deep) 0%, var(--paper) 60%, var(--paper-deep) 100%)',
        boxShadow: 'var(--shadow-lift)',
      }}
    >
      {/* Subtiele papiervezel */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'url(/paper-grain.svg)',
          backgroundSize: '240px',
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          Foto · Placeholder
        </div>
        <div className="mt-2 font-display italic text-[14px] text-[var(--ink-dim)] max-w-[220px] leading-snug">
          Foto komt hier — vervang{' '}
          <span className="font-mono text-[11px] not-italic">/public/portret.jpg</span> en
          pas deze component aan.
        </div>
      </div>
    </div>
  );
}

function Principle({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="site-card px-6 py-6">
      <div className="font-display italic text-[28px] text-[var(--oker)] leading-none">
        {number}
      </div>
      <h3 className="mt-3 font-display text-[18px] leading-tight text-[var(--ink)]">{title}</h3>
      <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{body}</p>
    </article>
  );
}
