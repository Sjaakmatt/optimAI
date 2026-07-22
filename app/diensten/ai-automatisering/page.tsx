import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';
import { BRANCHES } from '@/lib/data/branches';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/diensten/ai-automatisering';

export const metadata: Metadata = {
  title: 'AI-automatisering voor MKB · van mailstroom tot facturatie',
  description:
    'AI-automatisering die werkt bij Nederlandse MKB-bedrijven. Mails, offertes, orders, facturatie en planning automatisch — niet via een dashboard, maar via AI-agents die meedraaien in uw bestaande systemen. Vaste prijs, eerste agent in 1 tot 2 weken live.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'AI-automatisering voor MKB · FactumAI',
    description:
      'AI-automatisering die het dagelijkse werk van uw binnendienst overneemt. Op maat, gekoppeld aan uw systemen, met vaste prijs.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: 'Wat is AI-automatisering precies?',
    a: 'AI-automatisering is het laten uitvoeren van terugkerend werk door een AI-agent: een digitale collega die mails leest, offertes opstelt, orders verwerkt, facturen klaarzet en planning regelt — binnen door u bepaalde regels. In tegenstelling tot klassieke automatisering (vaste workflows, scripts, RPA) kan een AI-agent omgaan met variatie, context en uitzonderingen, en daarover transparant rapporteren.',
  },
  {
    q: 'Wat is het verschil tussen AI-automatisering en RPA of Zapier?',
    a: 'RPA en Zapier doen vaste stappen. Komt er een mail binnen die net iets anders is dan verwacht, dan loopt het vast. Een AI-agent leest de mail, begrijpt de context, kiest de juiste actie binnen uw beleid, en escaleert wat hij niet zeker weet. AI-automatisering is geschikt voor het werk waar uw mensen nu nadenken, niet alleen voor het werk waar ze vinkjes zetten.',
  },
  {
    q: 'Voor welke processen is AI-automatisering geschikt?',
    a: 'Goede kandidaten zijn processen die vaak voorkomen, een herhaalbaar patroon hebben en meetbare uitkomst kennen: offerte-opstellen, orderverwerking, klantmail-beantwoording, facturatie, debiteurenopvolging, voorraadbestelling en planning. Eenmalig strategisch werk laat u bij uw mensen.',
  },
  {
    q: 'Hoe lang duurt zo\'n implementatie?',
    a: 'De eerste AI-agent is meestal binnen één tot twee weken live, gekoppeld aan uw e-mail, boekhoudpakket of CRM. Een volledig multi-agent platform (zeven samenwerkende agents) hebben we binnen vijf tot acht weken opgeleverd. Zie de cases voor concrete doorlooptijden.',
  },
  {
    q: 'Wat kost AI-automatisering?',
    a: 'Wij werken met een vaste bouwprijs per agent, afhankelijk van complexiteit en het aantal integraties. Daarna kiest u zelf: een maandelijkse retainer voor monitoring en model-updates, of alleen de bouw met ad-hoc aanpassingen later. U krijgt vooraf één voorstel met opleveringsdatum en prijs.',
  },
  {
    q: 'Houdt AI-automatisering rekening met de AVG?',
    a: 'Ja. Data blijft in NL of EU, verwerkersovereenkomst is standaard, sub-verwerkers zijn transparant gepubliceerd. AI-modellen worden niet getraind op uw bedrijfsdata. Logging, audit-spoor en role-based toegang zijn vanaf dag één ingericht.',
  },
  {
    q: 'Wat als mijn boekhoudpakket of ERP oud is?',
    a: 'Zelden een blokkade. Wij koppelen via API als die er is, anders via webhooks, e-mail-doorstroming met PDF-bijlagen, of een kleine bridge die handmatige CSV-exports nabootst. Niet altijd elegant, wel betrouwbaar.',
  },
  {
    q: 'Wat als de AI iets fout doet?',
    a: 'Elke actie staat in een logboek en is terug te draaien. Bedragen of beslissingen boven uw mandaat komen standaard langs een mens. U bepaalt per scenario wat automatisch mag en wat akkoord vraagt. Een goed gebouwde agent durft te zeggen "dit weet ik niet zeker, leg even voor".',
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

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI-automatisering',
  name: 'AI-automatisering voor MKB',
  description:
    'AI-automatisering voor Nederlandse MKB-bedrijven: mails, offertes, orders, facturatie, inkoop en planning automatisch door AI-agents op maat. Vaste bouwprijs, eerste agent live binnen 1 tot 2 weken.',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: `${SITE_URL}${PAGE_PATH}`,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'EUR',
      description: 'Vaste prijs per geautomatiseerd proces, afhankelijk van complexiteit en integraties.',
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vormen van AI-automatisering',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mailverwerking automatiseren' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Offerte- en orderautomatisering' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facturatie- en debiteuren-automatisering' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inkoop- en voorraadautomatisering' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Planning- en logistiek-automatisering' } },
    ],
  },
};

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'AI-automatisering invoeren in een MKB-bedrijf',
  description:
    'Een pragmatisch stappenplan om AI-automatisering in een Nederlandse MKB-organisatie van eerste gesprek tot live agent te brengen.',
  totalTime: 'P14D',
  step: [
    { '@type': 'HowToStep', name: 'Procesinventarisatie', text: 'Bepaal samen welk proces het meeste tijd kost en zich het best leent voor automatisering.' },
    { '@type': 'HowToStep', name: 'Voorstel met vaste prijs', text: 'Concreet voorstel met agent-ontwerp, integraties, beleidsregels, doorlooptijd en prijs op één A4.' },
    { '@type': 'HowToStep', name: 'Bouw en integratie', text: 'Agent bouwen, koppelingen leggen met e-mail, boekhouding, CRM of ERP, beleid configureren.' },
    { '@type': 'HowToStep', name: 'Stille modus', text: 'Agent draait mee zonder te versturen, u en uw mensen controleren beslissingen.' },
    { '@type': 'HowToStep', name: 'Live binnen beleid', text: 'Agent gaat autonoom binnen de regels die u heeft gezet, met logboek en escalatiepad.' },
  ],
};

export default function AIAutomatiseringPage() {
  return (
    <SitePage>
      <JsonLd data={[SERVICE_SCHEMA, FAQ_SCHEMA, HOWTO_SCHEMA]} />

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-16 sm:pb-24">
          <div className="mb-6 sm:mb-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Diensten', href: '/diensten/ai-agent-laten-bouwen' },
                { label: 'AI-automatisering', href: PAGE_PATH },
              ]}
            />
          </div>
          <div className="max-w-[820px] relative">
            <div
              aria-hidden
              className="hidden sm:block absolute -left-4 top-2 bottom-6 w-[2px]"
              style={{
                background:
                  'linear-gradient(to bottom, var(--oker) 0%, var(--oker) 40%, transparent 100%)',
                opacity: 0.55,
              }}
            />
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
              Dienst · AI-automatisering · Nederland
            </div>
            <h1 className="mt-4 font-display text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
              AI-automatisering
              <br />
              <span className="italic text-[var(--oker-deep)]">die uw werk overneemt.</span>
            </h1>
            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[640px]">
              AI-automatisering is meer dan een chatbot of een Zapier-flow. Het is een digitale
              collega die uw mailstroom leest, offertes opstelt, orders verwerkt en facturen
              klaarzet — binnen úw regels, gekoppeld aan úw systemen. Zonder dashboard. Zonder
              jarenlang implementatietraject. Vaste prijs, eerste proces live in 1 tot 2 weken.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/plan"
                {...calPopupAttrs}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
              >
                Plan een kennismaking
                <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
              <Link
                href="/diensten/ai-agent-laten-bouwen"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
              >
                Bekijk de bouwdienst
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-[12px] text-[var(--ink-faint)]">
              <span className="h-[1px] w-10" style={{ background: 'var(--oker)' }} aria-hidden />
              <span className="font-mono uppercase tracking-[0.18em]">
                Vaste bouwprijs · 1 tot 2 weken live · retainer optioneel
              </span>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Wat AI-automatisering oplost" title="Werk dat blijft liggen, terugkomt en geld kost.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <Card
            title="Mailstroom die nooit op nul komt"
            body="Zestig tot honderd binnenkomende mails per dag waarvan tachtig procent routine. Een AI-agent leest, sorteert en beantwoordt — uw mensen pakken alleen wat menselijke aandacht vraagt."
          />
          <Card
            title="Offertes die te laat de deur uit gaan"
            body="Concurrenten reageren binnen het uur, u stuurt na drie dagen. Een offerte-agent rekent met actuele prijslijst, klantkortingen en marge-regels, en stuurt door voor uw akkoord — of verstuurt direct binnen mandaat."
          />
          <Card
            title="Facturen die liquiditeit kosten"
            body="Een factuur-agent zet facturen klaar op de dag van oplevering en volgt debiteuren met de toon die u voorschrijft per klantgroep. Cashflow vooruit zonder extra werk."
          />
        </div>
      </Section>

      <Section eyebrow="Hoe het werkt" title="Niet een tool kopen. Een proces overgeven." tint>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px]">
          <ProcessNote
            number="01"
            title="Eén proces tegelijk"
            body="Wij beginnen niet met een platform. Wij beginnen met één concreet proces dat te veel tijd kost. Live binnen 1 tot 2 weken, leerbaar voor uw mensen, schaalbaar daarna."
          />
          <ProcessNote
            number="02"
            title="Beleid als kompas"
            body="Wat automatisch mag en wat langs een mens komt, bepaalt u zelf in expliciete beleidsregels. Bedragen, klantgroepen, uitzonderingen. Bijstellen kan elke dag."
          />
          <ProcessNote
            number="03"
            title="Koppelt aan uw systemen"
            body="E-mail, boekhoudpakket (Exact, AFAS, Twinfield, Snelstart, Moneybird), CRM (Pipedrive, Teamleader, HubSpot), ERP, magazijn-app, planner. Wij regelen de integraties."
          />
          <ProcessNote
            number="04"
            title="Logboek en transparantie"
            body="Elke actie van de agent is terug te zien: welke data is geraadpleegd, welk beleid toegepast, welke beslissing genomen. Niet een black box. Geen verrassingen."
          />
        </div>
      </Section>

      <Section eyebrow="Voor welke branches" title="AI-automatisering per sector.">
        <p className="mt-3 text-[15px] leading-[1.7] text-[var(--ink-dim)] max-w-[720px]">
          Per branche andere systemen, andere regels, andere taken. Onze agents zijn op maat —
          maar wij komen ze in de praktijk tegen op deze plekken het meest.
        </p>
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {BRANCHES.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/branches/${b.slug}`}
                className="block border border-[var(--paper-edge)] rounded-[2px] px-4 py-3 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
              >
                <span className="font-display text-[15px] text-[var(--ink)]">{b.label}</span>
                <ArrowRight size={13} strokeWidth={1.8} className="inline ml-2 text-[var(--oker-deep)]" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Veelgestelde vragen" title="Wat ondernemers ons vragen over AI-automatisering.">
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
      </Section>

      <Section eyebrow="Verder lezen" title="Achtergrond bij AI-automatisering.">
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['waarom-mkb-nu-klaar-is-voor-ai-agents', 'Waarom het MKB nu klaar is voor AI-agents'],
            ['welk-proces-is-geschikt-voor-een-agent', 'Welk proces is geschikt voor een agent? En welk niet?'],
            ['integraties-makkelijker-dan-u-denkt', 'Integraties met bestaande systemen: makkelijker dan u denkt'],
            ['verborgen-kosten-van-handmatig-werk', 'De verborgen kosten van handmatig werk'],
          ].map(([slug, title]) => (
            <li key={slug}>
              <Link
                href={`/kennis/${slug}`}
                className="block border border-[var(--paper-edge)] rounded-[2px] px-5 py-4 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
              >
                <span className="font-display text-[15.5px] text-[var(--ink)] leading-snug">
                  {title}
                </span>
                <ArrowRight size={14} strokeWidth={1.8} className="inline ml-2 text-[var(--oker-deep)]" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--ink)] max-w-[560px] leading-snug">
            Klaar om één proces over te geven aan{' '}
            <span className="italic text-[var(--oker-deep)]">AI-automatisering?</span>
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

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="site-card px-6 py-7">
      <h3 className="font-display text-[20px] leading-tight text-[var(--ink)]">{title}</h3>
      <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{body}</p>
    </article>
  );
}

function ProcessNote({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="border-l-[3px] border-[var(--oker)] pl-5">
      <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
        {number}
      </div>
      <h3 className="mt-1 font-display text-[19px] leading-tight text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-[14px] leading-[1.7] text-[var(--ink-dim)]">{body}</p>
    </div>
  );
}

