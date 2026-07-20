import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDown } from 'lucide-react';
import { AANVRAAG_PAGES, getAanvraagContent } from '@/lib/aanvraag-content';
import { AanvraagCal } from './AanvraagCal';

// Kale conversiepagina voor Google Ads. Geen navigatie, geen links naar de
// hoofdsite; de enige uitgang is de boeking (plus de verplichte privacy-link).
// Noindex: deze varianten horen niet naast de echte dienstpagina's in de index.

export const dynamicParams = false;

export async function generateStaticParams() {
  return AANVRAAG_PAGES.map((p) => ({ slug: p.slug }));
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
    title: content.h1,
    description: content.sub,
    robots: { index: false, follow: false },
  };
}

const TRUST_POINTS = [
  {
    title: 'Klein beginnen, productieklaar opgeleverd',
    body: 'We starten met één afgebakend stuk werk en leveren dat draaiend op. Uitbreiden kan altijd daarna.',
  },
  {
    title: 'Maatwerk rond uw proces',
    body: 'De agent volgt hoe uw bedrijf werkt, niet andersom. Uw regels, uw toon, uw systemen.',
  },
  {
    title: 'Vaste bouwprijs, live in 1 tot 2 weken',
    body: 'Eén voorstel met prijs en opleverdatum voordat we starten. Geen open einden.',
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
      {/* Hero — op mobiel moet de CTA zonder scrollen zichtbaar zijn */}
      <header className="mx-auto w-full max-w-[760px] px-5 sm:px-8 pt-6 sm:pt-10">
        <div className="font-display text-[18px] tracking-tight leading-none">
          <span className="text-[var(--ink)]">Factum</span>
          <span className="italic text-[var(--oker-deep)]">AI</span>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-[760px] px-5 sm:px-8 pt-10 sm:pt-16 pb-10 sm:pb-14">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Gesprek van 30 minuten · vrijblijvend
          </div>
          <h1 className="mt-3 font-display text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight text-[var(--ink)]">
            {content.h1}
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)] max-w-[560px]">
            {content.sub}
          </p>
          <a
            href="#boeken"
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-[2px] text-[15px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
          >
            {content.ctaLabel}
            <ArrowDown size={16} strokeWidth={1.8} />
          </a>
        </section>

        {/* Wat het gesprek oplevert */}
        <section className="mx-auto w-full max-w-[760px] px-5 sm:px-8 pb-10 sm:pb-14">
          <div className="font-mono text-[10px] text-[var(--mos)] uppercase tracking-[0.18em]">
            Wat het gesprek oplevert
          </div>
          <ol className="mt-5 space-y-4">
            {content.offer.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="font-mono text-[11px] text-[var(--oker-deep)] pt-[3px] shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] sm:text-[15px] leading-[1.65] text-[var(--ink)]">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Vertrouwensblok */}
        <section className="mx-auto w-full max-w-[760px] px-5 sm:px-8 pb-12 sm:pb-16">
          <div className="site-card px-6 sm:px-8 py-6 sm:py-8">
            <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
              Zo werken wij
            </div>
            <ul className="mt-5 space-y-5">
              {TRUST_POINTS.map((point) => (
                <li key={point.title}>
                  <div className="font-display text-[15px] sm:text-[16px] text-[var(--ink)] leading-tight">
                    {point.title}
                  </div>
                  <p className="mt-1 text-[13px] sm:text-[14px] text-[var(--ink-dim)] leading-[1.6]">
                    {point.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-6 border-t border-[var(--paper-edge)] flex items-center gap-6">
              <span className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                Eerder gebouwd voor
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pavo-hr.svg" alt="Logo Pavo" className="h-[26px] w-auto object-contain" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/teka.svg" alt="Logo TEKA" className="h-[26px] w-auto object-contain" />
            </div>
          </div>
        </section>

        {/* Boeking — inline kalender, zelfde event als /plan */}
        <section id="boeken" className="mx-auto w-full max-w-[760px] px-5 sm:px-8 pb-16 sm:pb-24 scroll-mt-6">
          <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
            Kies een moment
          </div>
          <h2 className="mt-3 font-display text-[24px] sm:text-[30px] leading-tight tracking-tight text-[var(--ink)]">
            De agenda staat open.
          </h2>
          <p className="mt-3 text-[14px] text-[var(--ink-dim)] leading-[1.65] max-w-[480px]">
            U ontvangt direct een agenda-uitnodiging met een Google Meet-link. Komt het toch niet
            uit? Verzetten of annuleren kan met één klik.
          </p>
          <div className="mt-6">
            <AanvraagCal />
          </div>
        </section>
      </main>

      {/* Minimale footer — alleen naam en de wettelijk verplichte privacy-link */}
      <footer className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto w-full max-w-[760px] px-5 sm:px-8 py-5 flex items-center justify-between gap-4 text-[11px] font-mono text-[var(--ink-faint)]">
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
