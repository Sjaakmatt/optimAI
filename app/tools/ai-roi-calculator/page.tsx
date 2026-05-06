import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Calculator } from './Calculator';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/tools/ai-roi-calculator';

export const metadata: Metadata = {
  title: 'AI ROI calculator · bereken de besparing voor uw MKB',
  description:
    'Bereken in een minuut hoeveel een AI-agent uw MKB-bedrijf bespaart. Vul uren, loon en aantal medewerkers in en krijg directe schatting van besparing per maand en jaar.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'AI ROI calculator · FactumAI',
    description: 'Bereken de besparing van een AI-agent voor uw MKB-bedrijf in één minuut.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: 'Hoe accuraat is deze AI ROI calculator?',
    a: 'De calculator geeft een eerste indicatie op basis van zes invoervelden. Werkelijke besparing hangt af van proces-complexiteit, bestaande systemen en hoe goed uw mensen meewerken aan de implementatie. In de praktijk zien wij besparing tussen 30 en 60 procent van de geautomatiseerde tijd, met een terugverdientijd van 2 tot 6 maanden.',
  },
  {
    q: 'Welke kosten zitten er nog naast de bouwprijs?',
    a: 'Naast de eenmalige bouwprijs is er een optionele maandelijkse retainer voor monitoring, onderhoud en model-updates. Daarnaast lopen er API-kosten van het taalmodel — typisch 50 tot 300 euro per maand voor een MKB-agent — die wij doorbelasten of in de retainer verrekenen. De calculator rekent met een conservatieve schatting.',
  },
  {
    q: 'Wat als mijn medewerker geen 30% admin-tijd heeft?',
    a: 'Pas dan het percentage aan. De calculator gebruikt 30% als default omdat dat in de meeste MKB-bedrijven de orde van grootte is voor binnendienst-functies. Bij specialisten ligt het lager, bij administratieve functies hoger.',
  },
  {
    q: 'Wat doe ik met de uitkomst?',
    a: 'Gebruik het als startpunt voor uw beslissing. Een geschatte besparing van € 25.000 per jaar bij een bouwprijs van € 12.000 betekent een terugverdientijd van iets meer dan een half jaar — daarna is de winst structureel. Plan een gesprek voor een specifieker beeld op basis van uw situatie.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const TOOL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI ROI calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Online rekentool die berekent hoeveel een AI-agent een MKB-bedrijf bespaart op basis van uren, loon en aantal medewerkers.',
  url: `${SITE_URL}${PAGE_PATH}`,
  inLanguage: 'nl-NL',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function ROICalculatorPage() {
  return (
    <SitePage>
      <JsonLd data={[TOOL_SCHEMA, FAQ_SCHEMA]} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: PAGE_PATH },
              { label: 'AI ROI calculator', href: PAGE_PATH },
            ]}
          />
        </div>
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Tool · gratis
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
            AI ROI calculator.
            <br />
            <span className="italic text-[var(--oker-deep)]">Eén minuut, één indicatie.</span>
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)] max-w-[640px]">
            Vul uw situatie in en zie wat een AI-agent uw bedrijf kan besparen. Gebaseerd op
            getallen die wij in MKB-implementaties terugzien — geen marketing-cijfers, wel een
            eerste richting.
          </p>
        </div>
      </section>

      <Calculator />

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
            Veelgestelde vragen
          </div>
          <h2 className="mt-2 font-display text-[26px] sm:text-[32px] leading-tight text-[var(--ink)]">
            Over deze rekentool.
          </h2>
          <div className="mt-8 space-y-6 max-w-[780px]">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="pb-5 border-b border-[var(--paper-edge)]">
                <h3 className="font-display text-[17px] sm:text-[18px] text-[var(--ink)] leading-snug">
                  {item.q}
                </h3>
                <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.7] text-[var(--ink-dim)]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Wilt u uw uitkomst{' '}
            <span className="italic text-[var(--oker-deep)]">tegen onze ervaring leggen?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Plan een gesprek
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              Bekijk de cases
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
