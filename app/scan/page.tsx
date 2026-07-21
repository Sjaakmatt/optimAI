import type { Metadata } from 'next';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ScanTool } from './ScanTool';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/scan';

export const metadata: Metadata = {
  title: 'AI-agents scan · wat kan AI betekenen voor uw bedrijf?',
  description:
    'Vul uw website in en zie binnen een minuut wat AI-agents voor uw bedrijf kunnen betekenen: concrete automatiseringskansen én geavanceerde agent-voorstellen. Gratis, geen registratie.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'AI-agents scan · FactumAI',
    description:
      'Zie binnen een minuut wat AI-agents voor uw bedrijf kunnen betekenen — op basis van uw eigen website.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const TOOL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI-agents scan',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Scan die op basis van een bedrijfswebsite in kaart brengt welke processen een AI-agent kan overnemen, met simpele én geavanceerde agent-voorstellen.',
  url: `${SITE_URL}${PAGE_PATH}`,
  inLanguage: 'nl-NL',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function ScanPage() {
  return (
    <SitePage>
      <JsonLd data={TOOL_SCHEMA} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-8">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: '/tools/ai-roi-calculator' },
              { label: 'AI-agents scan', href: PAGE_PATH },
            ]}
          />
        </div>
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Scan · gratis · geen registratie
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Wat kunnen AI-agents
            <br />
            <span className="italic text-[var(--oker-deep)]">betekenen voor uw bedrijf?</span>
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)] max-w-[640px]">
            Vul uw website in. We analyseren uw bedrijf, uw branche en uw processen, en laten
            binnen een minuut zien welke taken een AI-agent kan overnemen — van snelle
            standaard-automatisering tot geavanceerde agents op maat.
          </p>
        </div>
      </section>

      <ScanTool />
    </SitePage>
  );
}
