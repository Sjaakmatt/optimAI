import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';
import { OntdekFilm } from './OntdekFilm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/ontdek';

export const metadata: Metadata = {
  title: 'Ontdek FactumAI agents · een wandeling door agent-land',
  description:
    'Loop in een paar minuten door het land van de AI-agents, aan de hand van één exporteur: meertalige orders, multi-valuta facturatie, een multi-agent orderketen en agents die vooruitkijken. En overal: een mens die beslist.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'Ontdek FactumAI agents',
    description:
      'Een korte, visuele wandeling door het land van de AI-agents. Zeven haltes, geen jargon.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ontdek FactumAI agents',
  description:
    'Visuele introductie op AI-agents voor MKB-bedrijven: wat een agent is, hoe hij redeneert, wat hij oplevert en hoe mensen de regie houden.',
  url: `${SITE_URL}${PAGE_PATH}`,
  inLanguage: 'nl-NL',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function OntdekPage() {
  return (
    <SitePage>
      <JsonLd data={PAGE_SCHEMA} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-8">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Ontdek', href: PAGE_PATH },
            ]}
          />
        </div>
        <div className="max-w-[720px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            De wandeling · ± 3 minuten
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Ontdek FactumAI{' '}
            <span className="italic text-[var(--oker-deep)]">agents.</span>
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)] max-w-[620px]">
            Wat is een AI-agent nou eigenlijk, als je alle grote woorden weglaat? Loop even mee met
            één (fictieve) exporteur die bloembollen aan retailers in dertig landen levert. U ziet
            hoe een agent leest, denkt, levert en samenwerkt. En vooral: waar hij netjes stopt en
            een mens beslist.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pb-16 sm:pb-20">
        <OntdekFilm />
      </section>

      {/* Finale: de enige uitgangen die ertoe doen */}
      <section
        id="finale"
        className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)] scroll-mt-6"
      >
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="max-w-[640px]">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              Na de wandeling
            </div>
            <h2 className="mt-3 font-display text-[28px] sm:text-[36px] leading-[1.1] tracking-tight text-[var(--ink)]">
              Zin om verder te <span className="italic text-[var(--oker-deep)]">lopen?</span>
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
              Een half uur sparren over uw eigen situatie zegt meer dan welke wandeling ook. Geen
              verkooppraatje: u vertelt waar het werk knelt, wij zeggen eerlijk of een agent daar
              iets aan verandert.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/plan"
                {...calPopupAttrs}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
              >
                Plan een gesprek
                <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
              <Link
                href="/scan"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
              >
                Doe de AI-scan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
