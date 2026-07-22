import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';
import { CASES } from '@/lib/data/cases';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/diensten/ai-agents-voor-bedrijven';

export const metadata: Metadata = {
  title: 'AI-agents voor bedrijven · digitale collega\'s die werk overnemen',
  description:
    'AI-agents voor bedrijven: digitale collega\'s die mails lezen, offertes opstellen, orders verwerken en planning regelen — binnen úw regels en gekoppeld aan úw systemen. Vaste prijs, eerste agent in 1 tot 2 weken live in Nederland.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'AI-agents voor bedrijven · FactumAI',
    description:
      'Wat AI-agents concreet voor uw bedrijf doen, hoe ze koppelen met bestaande systemen, en wat ze kosten.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: 'Wat is een AI-agent voor bedrijven?',
    a: 'Een AI-agent is een digitale collega die zelfstandig werk uitvoert binnen door u bepaalde regels: mails lezen, offertes opstellen, orders verwerken, facturen klaarzetten, planning regelen. Anders dan een chatbot wacht hij niet op een vraag — hij ziet werk binnenkomen en handelt af. Anders dan een workflow-tool kan hij omgaan met variatie en uitzonderingen.',
  },
  {
    q: 'Wat is het verschil tussen een AI-agent en een chatbot?',
    a: 'Een chatbot beantwoordt vragen die mensen aan hem stellen. Een AI-agent handelt werk af zonder dat iemand hem aanstuurt: hij leest een mail, beslist binnen uw beleid, voert de actie uit en escaleert wat hij niet kan. De chatbot is reactief, de agent is proactief.',
  },
  {
    q: 'Welke type AI-agents zijn er?',
    a: 'Veelvoorkomend: offerte-agent, order-agent, mail-agent, facturatie-agent, debiteuren-agent, inkoop-agent, voorraad-agent, planning-agent, klantservice-agent, intake-agent. Wij combineren meestal meerdere agents in één multi-agent platform waar één orchestrator-agent het werk verdeelt over gespecialiseerde collega-agents.',
  },
  {
    q: 'Voor welke bedrijven werkt dit?',
    a: 'Vooral MKB-bedrijven (10–250 medewerkers) waar de binnendienst structureel onder druk staat: groothandel, installatietechniek, transport, zakelijke dienstverlening, bouw, zorg, productie, detailhandel, accountancy, makelaardij, e-commerce. Het werkt minder goed voor bedrijven die al uitgebreide ERP-automatisering hebben (grote concerns), of bedrijven met heel weinig terugkerend werk (eenmansbedrijven).',
  },
  {
    q: 'Hoe koppelen AI-agents met bestaande systemen?',
    a: 'Via API als die er is, anders via webhooks, e-mail-doorstroming met PDF-bijlagen, of een kleine bridge die handmatige CSV-exports nabootst. Wij koppelen onder andere met Exact, AFAS, Twinfield, Snelstart, Moneybird, Microsoft 365, Google Workspace, Pipedrive, Teamleader, HubSpot en eigen ERP/CRM/WMS-systemen.',
  },
  {
    q: 'Wat kost een AI-agent voor mijn bedrijf?',
    a: 'Vaste bouwprijs per agent, afhankelijk van complexiteit en het aantal integraties. U krijgt vooraf één voorstel met opleveringsdatum en prijs. Daarna kiest u zelf: een maandelijkse retainer voor monitoring en model-updates, of alleen de bouw met ad-hoc aanpassingen later.',
  },
  {
    q: 'Vervangen AI-agents mensen?',
    a: 'In de praktijk niet. De agent neemt het saaie, repetitieve werk weg; uw mensen krijgen ruimte voor klantcontact, vakwerk en acquisitie. De bedrijven die wij hebben geholpen groeiden in omzet zonder extra FTE aan te nemen. Goede medewerkers blijven juist langer omdat het werk leuker wordt.',
  },
  {
    q: 'Hoe houd ik grip op wat de AI-agent doet?',
    a: 'Elke actie staat in een logboek met welke data is geraadpleegd, welk beleid is toegepast en wat er is besloten. Bedragen of beslissingen boven uw mandaat komen standaard langs een mens. U kunt elke beslissing terugdraaien en het beleid aanpassen — vandaag, niet over een sprint.',
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
  serviceType: 'AI-agents voor bedrijven',
  name: 'AI-agents voor B2B-bedrijven',
  description:
    'AI-agents op maat voor bedrijven in Nederland. Digitale collega\'s die mails, offertes, orders, facturatie, inkoop en planning afhandelen binnen uw beleid en gekoppeld aan uw systemen.',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'MKB-bedrijven, B2B',
  },
  url: `${SITE_URL}${PAGE_PATH}`,
};

const AGENT_TYPES: Array<{ titel: string; tekst: string }> = [
  { titel: 'Offerte-agent', tekst: 'Leest aanvragen, rekent met prijslijst, klantkortingen en marges, stelt offerte op voor akkoord — of verstuurt direct binnen mandaat.' },
  { titel: 'Order-agent', tekst: 'Kredietcheck, voorraadcheck, orderbevestiging, ERP-boeking, koppeling met magazijn en planning.' },
  { titel: 'Mail-agent', tekst: 'Sorteert binnenkomende klantmail, beantwoordt routine in uw merk-toon, escaleert wat menselijke aandacht vraagt.' },
  { titel: 'Facturatie-agent', tekst: 'Concept-facturen op de dag van oplevering, creditnota\'s, debiteurenopvolging met toon per klantgroep.' },
  { titel: 'Inkoop-agent', tekst: 'Bestellingen plaatsen bij voorkeursleveranciers, prijsafwijkingen signaleren, kwartaal-reviews voorbereiden.' },
  { titel: 'Planning-agent', tekst: 'Ritten of werkbonnen combineren, alternatieven regelen bij vertraging, klanten pro-actief informeren.' },
  { titel: 'Service-agent', tekst: 'Klantvragen via mail, chat, WhatsApp en webshop-bericht beantwoorden binnen uw SLA en toon.' },
  { titel: 'Rapportage-agent', tekst: 'Wekelijkse en maandelijkse rapportages opstellen uit operationele data, met signalen per uitzondering.' },
];

export default function AIAgentsVoorBedrijvenPage() {
  return (
    <SitePage>
      <JsonLd data={[SERVICE_SCHEMA, FAQ_SCHEMA]} />

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-16 sm:pb-24">
          <div className="mb-6 sm:mb-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Diensten', href: '/diensten/ai-agent-laten-bouwen' },
                { label: 'AI-agents voor bedrijven', href: PAGE_PATH },
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
              Dienst · AI-agents · B2B Nederland
            </div>
            <h1 className="mt-4 font-display text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
              AI-agents voor bedrijven.
              <br />
              <span className="italic text-[var(--oker-deep)]">Digitale collega&rsquo;s, geen tools.</span>
            </h1>
            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[640px]">
              Een AI-agent is geen chatbot en geen workflow-script. Het is een digitale collega die
              werk binnen ziet komen, beslissingen neemt binnen úw regels, en escaleert wat hij niet
              zeker weet. Wij bouwen ze op maat voor MKB-bedrijven in Nederland — gekoppeld aan uw
              systemen, met logboek en duidelijke escalatiepaden.
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
                href="/demo"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
              >
                Zie een agent aan het werk
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Welke AI-agents bestaan er" title="Acht type-agents die wij in de praktijk het meest bouwen.">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {AGENT_TYPES.map((a) => (
            <article key={a.titel} className="site-card px-5 py-5">
              <h3 className="font-display text-[17px] leading-snug text-[var(--ink)]">{a.titel}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">{a.tekst}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[14.5px] leading-[1.7] text-[var(--ink-dim)] max-w-[720px]">
          In de praktijk werken meerdere agents samen onder één orchestrator-agent die het werk
          verdeelt. Eén klantmail kan zo via offerte-agent, order-agent en facturatie-agent lopen —
          met de mens er alleen tussen voor wat menselijke aandacht vraagt.
        </p>
      </Section>

      <Section eyebrow="Wat het oplevert" title="Concrete cijfers uit MKB-implementaties." tint>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="block border border-[var(--paper-edge)] rounded-[2px] px-5 py-5 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
            >
              <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
                {c.branche} · {c.regio}
              </div>
              <h3 className="mt-2 font-display text-[19px] text-[var(--ink)] leading-snug">{c.klant}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Veelgestelde vragen" title="Wat ondernemers vragen over AI-agents.">
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

      <Section eyebrow="Verder lezen" title="Achtergrond bij AI-agents in B2B.">
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['waarom-mkb-nu-klaar-is-voor-ai-agents', 'Waarom het MKB nu klaar is voor AI-agents'],
            ['eerste-agent-is-nooit-de-belangrijkste', 'Uw eerste agent is nooit de belangrijkste'],
            ['guardrails-niet-een-rem-maar-een-kompas', 'Guardrails: niet een rem, maar een kompas'],
            ['dashboards-die-niemand-opent', 'Dashboards die niemand opent'],
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
            Welke agent zou voor uw bedrijf{' '}
            <span className="italic text-[var(--oker-deep)]">het eerste verschil maken?</span>
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
              href="/diensten/ai-agent-laten-bouwen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper)] transition-colors"
            >
              Bekijk de bouwdienst
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
