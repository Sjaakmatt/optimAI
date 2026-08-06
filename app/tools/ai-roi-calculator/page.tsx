import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Diagnose } from './Diagnose';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/tools/ai-roi-calculator';

export const metadata: Metadata = {
  title: 'AI-agent procesdiagnose · leent uw proces zich ervoor?',
  description:
    'Zes vragen over één proces, en een eerlijk oordeel of een AI-agent hier iets toevoegt of dat uw eigen pakket het beter doet. Zonder bedrag, want dat zou een slag in de lucht zijn.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'AI-agent procesdiagnose · FactumAI',
    description:
      'Zes vragen over één proces, en een eerlijk oordeel of een AI-agent hier iets toevoegt.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: 'Waarom rekent deze tool geen besparing uit?',
    a: 'Omdat wij dat niet kunnen weten voordat wij uw proces hebben gezien. Elke rekentool die een bedrag noemt op basis van zes schuifjes, verzint dat bedrag. Wat wij wél kunnen beoordelen is of een proces zich leent voor een agent, en dat is de vraag die aan het bedrag voorafgaat.',
  },
  {
    q: 'Wanneer heb ik geen agent nodig?',
    a: 'Als de taak in vaste regels te vangen is en de input altijd uit dezelfde velden van één systeem komt. Gebruik dan uw ERP, uw CRM of een koppeltool. Dat is goedkoper, sneller en beter te onderhouden. De diagnose zegt dat ook gewoon als uw antwoorden die kant op wijzen.',
  },
  {
    q: 'Wat als mijn beleid nergens vastligt?',
    a: 'Dan is dat de eerste fase. Een agent toetst aan uw regels en uitzonderingen, dus die moeten ergens staan. Wij leggen ze samen met uw mensen vast voordat er gebouwd wordt. Dat is werk vooraf, geen bijzaak.',
  },
  {
    q: 'Wat doe ik met de uitkomst?',
    a: 'Neem hem mee naar het eerste gesprek. Wij kijken dan naar hetzelfde proces, maar dan met uw systemen erbij: welke koppelingen mogelijk zijn, hoe uw historie eruitziet en wat er in fasen te bouwen valt.',
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
  name: 'AI-agent procesdiagnose',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Online diagnose die op basis van zes vragen over één proces beoordeelt of een AI-agent daar iets toevoegt of dat het bestaande pakket volstaat.',
  url: `${SITE_URL}${PAGE_PATH}`,
  inLanguage: 'nl-NL',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function ProcesdiagnosePage() {
  return (
    <SitePage>
      <JsonLd data={[TOOL_SCHEMA, FAQ_SCHEMA]} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: PAGE_PATH },
              { label: 'Procesdiagnose', href: PAGE_PATH },
            ]}
          />
        </div>
        <div className="max-w-[760px]">
          <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
            Tool · gratis
          </div>
          <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
            Leent uw proces zich voor een agent?
            <br />
            <span className="italic text-[var(--oker-deep)]">Zes vragen, eerlijk antwoord.</span>
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--ink-dim)] max-w-[640px]">
            Hier stond een rekentool die een besparing uitrekende. Die hebben wij weggehaald, omdat
            zo&rsquo;n bedrag niets waard is voordat wij uw proces hebben gezien. Wat wel te
            beoordelen valt: of dit werk in uw eigen pakket hoort, of juist in de laag daarboven.
          </p>
        </div>
      </section>

      <Diagnose />

      <section className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
          <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
            Veelgestelde vragen
          </div>
          <h2 className="mt-2 font-display text-[26px] sm:text-[32px] leading-tight text-[var(--ink)]">
            Over deze diagnose.
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
            Uw uitkomst naast{' '}
            <span className="italic text-[var(--oker-deep)]">uw eigen systemen leggen?</span>
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
              href="/oplossingen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              Bekijk de oplossingen
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
