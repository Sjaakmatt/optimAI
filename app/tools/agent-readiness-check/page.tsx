import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Quiz } from './Quiz';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/tools/agent-readiness-check';

export const metadata: Metadata = {
  title: 'AI-agent readiness check · is uw bedrijf er klaar voor?',
  description:
    'Tien vragen die laten zien of uw MKB-bedrijf klaar is voor een AI-agent. Geen registratie, geen e-mail. Direct een score met advies wat eerst aan te pakken.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'AI-agent readiness check · FactumAI',
    description: 'Tien-vraag quiz die uw AI-readiness in kaart brengt, direct een eerlijke score.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const TOOL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI-agent readiness check',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Tien-vraag quiz die in een paar minuten in kaart brengt of een MKB-bedrijf klaar is voor een AI-agent. Met directe score en advies.',
  url: `${SITE_URL}${PAGE_PATH}`,
  inLanguage: 'nl-NL',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function ReadinessCheckPage() {
  return (
    <SitePage>
      <JsonLd data={TOOL_SCHEMA} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: '/tools/ai-roi-calculator' },
              { label: 'Readiness check', href: PAGE_PATH },
            ]}
          />
        </div>
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Tool · gratis · geen registratie
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
            AI-agent readiness check.
            <br />
            <span className="italic text-[var(--oker-deep)]">Tien vragen, eerlijke score.</span>
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)] max-w-[640px]">
            Niet elk MKB-bedrijf is op hetzelfde moment klaar voor een AI-agent. Tien vragen
            geven u een score en advies over welke stap als eerste zinvol is. Geen e-mailadres
            nodig, alles draait in uw browser.
          </p>
        </div>
      </section>

      <Quiz />

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Score in handen?{' '}
            <span className="italic text-[var(--oker-deep)]">Plan een gesprek voor het vervolg.</span>
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
              href="/tools/ai-roi-calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              ROI berekenen
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
