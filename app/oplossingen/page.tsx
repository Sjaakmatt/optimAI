import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';
import { OPLOSSINGEN } from '@/lib/data/oplossingen';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/oplossingen';

export const metadata: Metadata = {
  title: 'Oplossingen · waar de beslislaag het meeste oplevert',
  description:
    'Vier processen waar wij het vaakst bouwen: klantenservice, leadopvolging, vraagvoorspelling en inkoop. Het systeem heeft de gegevens al, alleen neemt niemand er een besluit over.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'Oplossingen · FactumAI',
    description:
      'Vier processen waar de beslislaag boven uw ERP het meeste oplevert.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const ITEMLIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Oplossingen van FactumAI',
  numberOfItems: OPLOSSINGEN.length,
  itemListElement: OPLOSSINGEN.map((o, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/oplossingen/${o.slug}`,
    name: o.navLabel,
  })),
};

export default function OplossingenPage() {
  return (
    <SitePage>
      <JsonLd data={ITEMLIST_SCHEMA} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Oplossingen', href: PAGE_PATH },
            ]}
          />
        </div>
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Oplossingen
          </div>
          <h1 className="mt-4 font-display text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Waar de beslislaag
            <br />
            <span className="italic text-[var(--oker-deep)]">het meeste oplevert.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)]">
            Vier processen waar wij het vaakst bouwen. Ze hebben één ding gemeen: het systeem heeft
            de gegevens al, alleen neemt niemand er een besluit over.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OPLOSSINGEN.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/oplossingen/${o.slug}`}
                className="block h-full px-6 py-7 rounded-[2px] border border-[var(--paper-edge)] bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors group"
              >
                <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
                  {o.heroEyebrow}
                </div>
                <h2 className="mt-2 font-display text-[22px] sm:text-[24px] leading-tight text-[var(--ink)] group-hover:text-[var(--oker-deep)] transition-colors">
                  {o.navLabel}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">
                  {o.cardBody}
                </p>
                <div className="mt-5 font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Bekijk oplossing
                  <ArrowRight size={12} strokeWidth={1.8} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--paper-edge)]" style={{ background: 'var(--paper-warm)' }}>
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="max-w-[640px]">
            <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
              Eerst de grens bepalen
            </div>
            <h2 className="mt-2 font-display text-[24px] sm:text-[30px] leading-tight text-[var(--ink)]">
              &ldquo;Dat doet ons ERP toch al?&rdquo;
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
              Dat is de meest gestelde vraag in onze eerste gesprekken, en meestal is het antwoord:
              voor een deel, ja. Op één pagina staat waar de grens ligt, en wanneer u beter uw eigen
              pakket of een koppeltool kunt gebruiken.
            </p>
          </div>
          <Link
            href="/diensten/vergelijken/ai-agent-vs-erp-automatisering"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors shrink-0 self-start md:self-center"
          >
            Lees de vergelijking
            <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Niet zeker welk proces bij u het meeste oplevert?{' '}
            <span className="italic text-[var(--oker-deep)]">Een gesprek lost dat op.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan"
              {...calPopupAttrs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Plan een gesprek
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              Bekijk de diensten
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
