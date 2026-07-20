import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDown } from 'lucide-react';
import { AANVRAAG_PAGES, getAanvraagContent, type AanvraagContent } from '@/lib/aanvraag-content';
import { AanvraagCal } from './AanvraagCal';

// Kale conversiepagina voor Google Ads. Geen navigatie, geen links naar de
// hoofdsite; de enige uitgang is de boeking (plus de verplichte privacy-link).
// Noindex: deze varianten horen niet naast de echte dienstpagina's in de index.

export const dynamicParams = false;

export async function generateStaticParams() {
  return AANVRAAG_PAGES.map((p) => ({ slug: p.slug }));
}

function fullTitle(content: AanvraagContent): string {
  return content.h1Accent ? `${content.h1} ${content.h1Accent}` : content.h1;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getAanvraagContent(slug);
  if (!content) return { title: 'Pagina niet gevonden' };
  return {
    title: fullTitle(content),
    description: content.sub,
    robots: { index: false, follow: false },
  };
}

const TRUST_POINTS = [
  {
    title: 'Klein beginnen, productieklaar',
    body: 'We starten met één afgebakend stuk werk en leveren dat draaiend op. Uitbreiden kan altijd daarna.',
  },
  {
    title: 'Maatwerk rond uw proces',
    body: 'De agent volgt hoe uw bedrijf werkt, niet andersom. Uw regels, uw toon, uw systemen.',
  },
  {
    title: 'Vaste prijs, 1 tot 2 weken',
    body: 'Eén voorstel met bouwprijs en opleverdatum voordat we starten. Geen open einden.',
  },
];

export default async function AanvraagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getAanvraagContent(slug);
  if (!content) notFound();

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <header className="mx-auto w-full max-w-[860px] px-5 sm:px-8 pt-5 sm:pt-8 flex items-baseline justify-between gap-4">
        <div className="font-display text-[19px] tracking-tight leading-none">
          <span className="text-[var(--ink)]">Factum</span>
          <span className="italic text-[var(--oker-deep)]">AI</span>
        </div>
        <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
          AI-agents voor MKB
        </span>
      </header>

      <main className="flex-1">
        {/* Hero — op mobiel moet de CTA zonder scrollen zichtbaar zijn */}
        <section className="mx-auto w-full max-w-[860px] px-5 sm:px-8 pt-9 sm:pt-16 pb-10 sm:pb-14">
          <div className="relative">
            <div
              aria-hidden
              className="hidden sm:block absolute -left-5 top-2 bottom-4 w-[2px]"
              style={{
                background:
                  'linear-gradient(to bottom, var(--oker) 0%, var(--oker) 40%, transparent 100%)',
                opacity: 0.55,
              }}
            />
            <div className="rise-in">
              <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
                Gesprek van 30 minuten · vrijblijvend
              </div>
              <h1 className="mt-3 font-display text-[34px] sm:text-[48px] lg:text-[56px] leading-[1.06] tracking-tight text-[var(--ink)]">
                {content.h1}
                {content.h1Accent && (
                  <>
                    {' '}
                    <span className="italic text-[var(--oker-deep)]">{content.h1Accent}</span>
                  </>
                )}
              </h1>
            </div>
            <p className="rise-in rise-in-delay-1 mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)] max-w-[580px]">
              {content.sub}
            </p>
            <div className="rise-in rise-in-delay-2">
              <a
                href="#boeken"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-[2px] text-[15px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
              >
                {content.ctaLabel}
                <ArrowDown size={16} strokeWidth={1.8} />
              </a>
              <div className="mt-6 flex items-center gap-3 text-[12px] text-[var(--ink-faint)]">
                <span className="h-[1px] w-10" style={{ background: 'var(--oker)' }} aria-hidden />
                <span className="font-mono uppercase tracking-[0.16em]">
                  Vaste bouwprijs · live in 1 tot 2 weken · geen verplichtingen
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Logoband — vertrouwen, zonder uitgangen */}
        <section className="border-y border-[var(--paper-edge)] bg-[var(--paper-warm)]">
          <div className="mx-auto w-full max-w-[860px] px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
            <span className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em] shrink-0">
              In productie bij
            </span>
            <div className="flex items-center gap-x-10 sm:gap-x-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pavo-hr.svg"
                alt="Logo Pavo"
                className="h-11 sm:h-12 w-auto object-contain grayscale opacity-70"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/teka.svg"
                alt="Logo TEKA"
                className="h-11 sm:h-12 w-auto object-contain grayscale opacity-70"
              />
            </div>
          </div>
        </section>

        {/* Wat het gesprek oplevert */}
        <section className="mx-auto w-full max-w-[860px] px-5 sm:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
          <div className="font-mono text-[10px] text-[var(--mos)] uppercase tracking-[0.18em]">
            Wat het gesprek oplevert
          </div>
          <h2 className="mt-3 font-display text-[26px] sm:text-[32px] leading-tight tracking-tight text-[var(--ink)]">
            Eén half uur.{' '}
            <span className="italic text-[var(--oker-deep)]">Geen verkooppraatje.</span>
          </h2>
          <ol className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {content.offer.map((item, i) => (
              <li key={i} className="site-card px-5 py-5">
                <span className="font-mono text-[11px] text-[var(--oker-deep)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-[14px] leading-[1.65] text-[var(--ink)]">{item}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Persoonlijk blok — u spreekt de bouwer, geen salesteam */}
        <section className="mx-auto w-full max-w-[860px] px-5 sm:px-8 pb-12 sm:pb-16">
          <div className="site-card px-6 sm:px-8 py-6 sm:py-7 flex items-start gap-5 sm:gap-7">
            <div className="relative shrink-0 w-[76px] h-[95px] sm:w-[92px] sm:h-[115px] rounded-[2px] overflow-hidden border border-[var(--paper-edge)]">
              <Image
                src="/portret.jpg"
                alt="Portret van Sjaak ter Veld"
                fill
                sizes="92px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-[19px] sm:text-[22px] leading-tight text-[var(--ink)]">
                U spreekt direct met de{' '}
                <span className="italic text-[var(--oker-deep)]">bouwer.</span>
              </h2>
              <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.65] text-[var(--ink-dim)]">
                Sjaak ter Veld, oprichter van FactumAI. Bedrijfskundige met ruim acht jaar
                IT-praktijk. Hij voert het gesprek en bouwt daarna zelf mee aan de agent. Geen
                salesteam ertussen, geen overdracht naar een junior.
              </p>
              <div className="mt-3 font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                Hoogkarspel · West-Friesland
              </div>
            </div>
          </div>
        </section>

        {/* Vertrouwensblok */}
        <section className="mx-auto w-full max-w-[860px] px-5 sm:px-8 pb-12 sm:pb-16">
          <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
            Zo werken wij
          </div>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {TRUST_POINTS.map((point) => (
              <li key={point.title} className="border-t border-[var(--paper-edge)] pt-4">
                <h3 className="font-display text-[16px] text-[var(--ink)] leading-snug">
                  {point.title}
                </h3>
                <p className="mt-2 text-[13px] text-[var(--ink-dim)] leading-[1.6]">{point.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Boeking — inline kalender, zelfde event als /plan */}
        <section
          id="boeken"
          className="mx-auto w-full max-w-[860px] px-5 sm:px-8 pb-16 sm:pb-24 scroll-mt-6"
        >
          <div className="border-t border-[var(--paper-edge)] pt-10 sm:pt-12">
            <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
              Kies een moment
            </div>
            <h2 className="mt-3 font-display text-[26px] sm:text-[32px] leading-tight tracking-tight text-[var(--ink)]">
              De agenda staat <span className="italic text-[var(--oker-deep)]">open.</span>
            </h2>
            <p className="mt-3 text-[14px] text-[var(--ink-dim)] leading-[1.65] max-w-[480px]">
              U ontvangt direct een agenda-uitnodiging met een Google Meet-link. Komt het toch niet
              uit? Verzetten of annuleren kan met één klik.
            </p>
            <div className="mt-6">
              <AanvraagCal />
            </div>
          </div>
        </section>
      </main>

      {/* Minimale footer — alleen naam en de wettelijk verplichte privacy-link */}
      <footer className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto w-full max-w-[860px] px-5 sm:px-8 py-5 flex items-center justify-between gap-4 text-[11px] font-mono text-[var(--ink-faint)]">
          <span>© {new Date().getFullYear()} FactumAI</span>
          <Link
            href="/privacy"
            className="uppercase tracking-[0.14em] hover:text-[var(--ink)] transition-colors"
          >
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}
