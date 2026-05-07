import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/over/sjaak-ter-veld';

export const metadata: Metadata = {
  title: 'Sjaak ter Veld — oprichter FactumAI',
  description:
    'Sjaak ter Veld is oprichter van FactumAI. Bedrijfskundig geschoold en 8+ jaar ervaring in IT-optimalisatie en procesverbetering. Bouwt AI-agents op maat voor Nederlandse MKB-bedrijven.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'Sjaak ter Veld · FactumAI',
    description:
      'Auteursprofiel van Sjaak ter Veld — oprichter van FactumAI, schrijver van de FactumAI-kennisbank.',
    url: `${SITE_URL}${PAGE_PATH}`,
    type: 'profile',
  },
};

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/over/sjaak-ter-veld#person`,
  name: 'Sjaak ter Veld',
  givenName: 'Sjaak',
  familyName: 'ter Veld',
  jobTitle: 'Oprichter',
  description:
    'Oprichter van FactumAI. Bedrijfskundig geschoold en 8+ jaar werkzaam in IT-optimalisatie, procesverbetering en projectmanagement. Bouwt AI-agents op maat voor Nederlandse MKB-bedrijven.',
  image: `${SITE_URL}/portret.jpg`,
  url: `${SITE_URL}${PAGE_PATH}`,
  worksFor: { '@id': `${SITE_URL}/#organization` },
  founderOf: { '@id': `${SITE_URL}/#organization` },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hoogkarspel',
    addressRegion: 'Noord-Holland',
    addressCountry: 'NL',
  },
  knowsAbout: [
    'AI-agents',
    'Multi-agent systemen',
    'Procesautomatisering MKB',
    'AI-implementatie',
    'AI-integraties',
    'Bedrijfskunde',
    'IT-optimalisatie',
    'Projectmanagement',
    'Change management',
  ],
  knowsLanguage: ['nl-NL', 'en'],
  alumniOf: { '@type': 'EducationalOrganization', name: 'Bedrijfskunde (hoger onderwijs)' },
  nationality: { '@type': 'Country', name: 'Netherlands' },
  sameAs: [
    'https://www.linkedin.com/in/sjaak-ter-veld/',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'AI-implementatie consultant',
    occupationLocation: { '@type': 'Country', name: 'Netherlands' },
    skills:
      'AI-agents bouwen, multi-agent architectuur, AVG-compliant integraties, governance, procesautomatisering MKB',
  },
};

const EXPERTISE = [
  {
    titel: 'AI-agents in productie',
    body:
      'Acht jaar IT-praktijk en sinds 2024 fulltime aan het bouwen van AI-agents voor MKB-bedrijven. Multi-agent platforms in groothandel, installatietechniek, transport en zakelijke dienstverlening.',
  },
  {
    titel: 'Bedrijfskunde + techniek',
    body:
      'Hbo-bedrijfskunde, doorgegroeid in IT-optimalisatie, projectmanagement en procesverbetering. Combineert het zakelijke gesprek met de technische uitvoering — beide onder één dak.',
  },
  {
    titel: 'MKB-context',
    body:
      'Werkt al jaren met Nederlandse MKB-ondernemers. Kent de echte pijnpunten: krappe bezetting, ontbrekende data-afdeling, grote behoefte aan ruimte, weinig aan abstracte strategie.',
  },
  {
    titel: 'Governance & guardrails',
    body:
      'Alle agents draaien binnen expliciete beleidsregels. AVG, NEN 7510 (zorg), WWFT (financieel), beroepsgeheim (juridisch) — randvoorwaarden zijn vanaf dag één ingericht.',
  },
];

const PUBLICATIES = [
  {
    titel: 'Waarom het MKB nu klaar is voor AI-agents',
    slug: 'waarom-mkb-nu-klaar-is-voor-ai-agents',
    datum: '2026-03-12',
  },
  {
    titel: 'Guardrails: niet een rem, maar een kompas',
    slug: 'guardrails-niet-een-rem-maar-een-kompas',
    datum: '2026-02-22',
  },
  {
    titel: 'Welk proces is geschikt voor een agent? En welk niet?',
    slug: 'welk-proces-is-geschikt-voor-een-agent',
    datum: '2026-01-15',
  },
  {
    titel: 'Uw eerste agent is nooit de belangrijkste',
    slug: 'eerste-agent-is-nooit-de-belangrijkste',
    datum: '2026-01-29',
  },
  {
    titel: 'Integraties met bestaande systemen: makkelijker dan u denkt',
    slug: 'integraties-makkelijker-dan-u-denkt',
    datum: '2026-02-12',
  },
  {
    titel: 'Vaste bouwprijs én een retainer die meegroeit',
    slug: 'vaste-bouwprijs-en-retainer',
    datum: '2026-04-14',
  },
];

const DATE_FORMATTER = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function SjaakTerVeldPage() {
  return (
    <SitePage>
      <JsonLd data={PERSON_SCHEMA} />

      <section className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Over', href: '/over' },
              { label: 'Sjaak ter Veld', href: PAGE_PATH },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 md:gap-12">
          <div>
            <Portret />
            <div className="mt-4">
              <div className="font-display text-[20px] text-[var(--ink)]">Sjaak ter Veld</div>
              <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider mt-0.5">
                Oprichter FactumAI · Auteur kennisbank
              </div>
              <div className="mt-2 text-[12.5px] text-[var(--ink-dim)] leading-snug">
                Hoogkarspel · West-Friesland
              </div>
              <ul className="mt-4 space-y-1.5 text-[13px] text-[var(--ink-dim)]">
                <li>
                  <a
                    href="https://www.linkedin.com/in/sjaak-ter-veld/"
                    rel="me noopener"
                    target="_blank"
                    className="underline hover:text-[var(--oker-deep)]"
                  >
                    LinkedIn-profiel
                  </a>
                </li>
                <li>
                  <a href="mailto:sjaak@factumai.nl" className="underline hover:text-[var(--oker-deep)]">
                    sjaak@factumai.nl
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              Auteursprofiel
            </div>
            <h1 className="mt-3 font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)]">
              Sjaak ter Veld
            </h1>
            <p className="mt-4 font-display italic text-[18px] sm:text-[20px] leading-[1.45] text-[var(--oker-deep)] max-w-[600px]">
              Bedrijfskundige met 8+ jaar IT-praktijk. Bouwt AI-agents voor MKB-bedrijven die geen
              data-afdeling hebben, en schrijft de FactumAI-kennisbank.
            </p>
            <div className="mt-6 space-y-4 text-[15px] sm:text-[16px] leading-[1.75] text-[var(--ink)] max-w-[640px]">
              <p>
                Ik ben opgeleid in de bedrijfskunde en heb daarna meer dan acht jaar in IT gewerkt:
                aan optimalisatie, procesverbetering, strategie en projectmanagement bij bedrijven
                van uiteenlopende grootte. In 2024 ben ik FactumAI gestart om AI-agents
                bereikbaar te maken voor MKB-bedrijven die niet wachten op een groot consultancy-traject.
              </p>
              <p>
                Mijn rol bij FactumAI is dubbel. Ik zit aan tafel bij ondernemers om hun werkdag te
                begrijpen, en ik bouw mee aan de agents die wij opleveren. Dat houdt het werk
                eerlijk: ik beloof niets dat ik niet zelf zou kunnen waarmaken.
              </p>
              <p>
                Op deze site schrijf ik bovendien de kennisbank. De artikelen zijn observaties uit
                de praktijk — wat werkt, wat niet, en waarom het MKB juist nu de meeste winst kan
                pakken. Geen jargon, geen hype.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Expertise" title="Waar ik over schrijf en aan werk.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {EXPERTISE.map((e) => (
            <article key={e.titel} className="site-card px-6 py-6">
              <h2 className="font-display text-[19px] leading-tight text-[var(--ink)]">{e.titel}</h2>
              <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{e.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Publicaties" title="Recent gepubliceerd op de FactumAI-kennisbank." tint>
        <ul className="mt-8 space-y-3 max-w-[760px]">
          {PUBLICATIES.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/kennis/${p.slug}`}
                className="block border border-[var(--paper-edge)] rounded-[2px] px-5 py-4 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
              >
                <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
                  {DATE_FORMATTER.format(new Date(p.datum))}
                </div>
                <div className="mt-1 font-display text-[16px] text-[var(--ink)] leading-snug">
                  {p.titel}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] text-[var(--ink-dim)]">
          Alle artikelen op{' '}
          <Link href="/kennis" className="underline text-[var(--ink)] hover:text-[var(--oker-deep)]">
            de kennisbank
          </Link>
          .
        </p>
      </Section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Vraag of een AI-agent voor uw bedrijf{' '}
            <span className="italic text-[var(--oker-deep)]">het verschil zou maken?</span>
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
              href="/over"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              Over FactumAI
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}

function Portret() {
  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[320px] rounded-[2px] border border-[var(--paper-edge)] overflow-hidden"
      style={{ boxShadow: 'var(--shadow-lift)' }}
    >
      <Image
        src="/portret.jpg"
        alt="Sjaak ter Veld — oprichter FactumAI"
        fill
        sizes="(max-width: 640px) 100vw, 320px"
        className="object-cover"
        priority
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'url(/paper-grain.svg)',
          backgroundSize: '240px',
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
  tint,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <section
      className="border-t border-[var(--paper-edge)]"
      style={tint ? { background: 'var(--paper-warm)' } : undefined}
    >
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.2em]">
          {eyebrow}
        </div>
        <h2 className="mt-2 font-display text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.1] text-[var(--ink)] max-w-[780px]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
