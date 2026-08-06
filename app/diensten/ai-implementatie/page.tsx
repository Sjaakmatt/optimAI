import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { calPopupAttrs } from '@/components/booking/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/diensten/ai-implementatie';

export const metadata: Metadata = {
  title: 'AI implementeren in uw bedrijf · stappenplan en uitvoering',
  description:
    'AI implementeren in uw bedrijf zonder pilot-moeras. Wij leiden u van eerste gesprek naar werkende AI-agents in productie: strategie, integratie, governance en adoptie. Vaste prijs per fase, elke uitgaande actie langs een mens.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'AI implementeren · FactumAI',
    description:
      'Stappenplan voor AI-implementatie in MKB-bedrijven. Van strategie tot productie, met governance en adoptie ingebouwd.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: 'Wat betekent "AI implementeren" precies in een MKB-bedrijf?',
    a: 'AI implementeren betekent dat een concrete AI-toepassing — meestal een AI-agent — productief draait in uw bedrijf, gekoppeld aan uw systemen, binnen uw beleid, met uw mensen die het bijhouden. Het is niet een experiment of een proof-of-concept, het is een werkend onderdeel van uw operatie.',
  },
  {
    q: 'Waarom mislukken zoveel AI-implementaties bij MKB?',
    a: 'Drie redenen: te groot beginnen, geen koppeling met bestaande systemen, en geen eigenaarschap binnen het bedrijf. Wij beginnen klein, bij één proces, koppelen vanaf dag één met uw systemen, en zorgen dat één persoon binnen uw organisatie weet hoe hij het beleid bijstuurt.',
  },
  {
    q: 'In welke stappen gebeurt een AI-implementatie?',
    a: 'Vijf stappen: (1) procesinventarisatie en kandidaat-keuze, (2) voorstel met vaste prijs en opleveringsdatum, (3) bouw inclusief integraties en beleidsregels, (4) stille modus waarin de agent meedraait zonder zelf te versturen, (5) live binnen het beleid dat u heeft gezet.',
  },
  {
    q: 'Hoe lang duurt een AI-implementatie?',
    a: 'Wij leveren in fasen die elk eindigen in iets werkends, zodat u niet maandenlang in een pilot zit zonder resultaat. Het aantal fasen hangt af van de complexiteit van het proces en het aantal te koppelen systemen. Dat bepalen wij samen voordat er gebouwd wordt.',
  },
  {
    q: 'Wat moet ik intern regelen voor de implementatie?',
    a: 'Eén persoon binnen uw bedrijf die meedenkt over beleid (wat mag automatisch, wat niet), toegang tot de te koppelen systemen, en een uur per week in de eerste twee weken voor afstemming. Geen IT-afdeling nodig, geen project-bord, geen training-traject.',
  },
  {
    q: 'Wat als de implementatie tegenvalt?',
    a: 'In de eerste week zetten wij eerst een testkoppeling op met uw systemen. Werkt die niet zoals afgesproken, dan stoppen wij voordat we aan de agent beginnen — geen factuur. De vaste-prijs-aanpak betekent dat doorlooptijd en scope vooraf vastliggen, dus risico op tegenvallen is beperkt.',
  },
  {
    q: 'Hoe zit het met AVG, governance en beveiliging?',
    a: 'Opslag en verwerking in Frankfurt, taalmodelcalls via Anthropic in de VS, opgenomen in onze sub-verwerkerslijst met een transfer impact assessment. Verwerkersovereenkomst standaard, sub-verwerkers transparant gepubliceerd. AI-modellen worden niet getraind op uw bedrijfsdata. Logging en audit-spoor zijn vanaf dag één ingericht. Voor zorg- en juridische toepassingen geldt extra: NEN 7510, geheimhoudingsplicht, conflictcheck.',
  },
  {
    q: 'Heb ik een AI-strategie nodig voordat ik begin?',
    a: 'Nee. Een AI-strategie schrijven kost maanden en levert weinig op. Wij raden aan: begin met één meetbaar proces, leer hoe AI-agents in úw context werken, en bouw daarna de strategie op basis van wat u heeft geleerd. Theorie zonder ervaring leidt zelden tot werkende implementaties.',
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
  serviceType: 'AI-implementatie',
  name: 'AI implementeren in MKB-bedrijven',
  description:
    'Begeleiding van AI-implementatie in Nederlandse MKB-bedrijven: van proces-inventarisatie tot werkende AI-agents in productie, inclusief integraties, governance en adoptie.',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: `${SITE_URL}${PAGE_PATH}`,
};

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'AI implementeren in vijf stappen',
  description:
    'Stappenplan om AI van eerste gesprek tot werkende implementatie in een MKB-bedrijf te brengen.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Procesinventarisatie',
      text: 'Bepaal welk proces het meeste tijd kost en zich het best leent: vaak voorkomend, te beschrijven regels, duidelijk begin en einde.',
    },
    {
      '@type': 'HowToStep',
      name: 'Voorstel met vaste prijs',
      text: 'Concreet voorstel op één A4: agent-ontwerp, integraties, beleidsregels, doorlooptijd, prijs.',
    },
    {
      '@type': 'HowToStep',
      name: 'Bouw en testkoppeling',
      text: 'Eerst integraties testen voordat de agent gebouwd wordt. Werkt de koppeling, dan bouw de agent.',
    },
    {
      '@type': 'HowToStep',
      name: 'Stille modus',
      text: 'Agent draait mee zonder te versturen. Uw mensen controleren elke beslissing. Beleid wordt aangescherpt.',
    },
    {
      '@type': 'HowToStep',
      name: 'Live met logboek',
      text: 'Agent gaat autonoom binnen het beleid. Elke actie zichtbaar in logboek. Bijstellen kan elke dag.',
    },
  ],
};

const STAPPEN: Array<{ nr: string; titel: string; tekst: string }> = [
  {
    nr: '01',
    titel: 'Inventariseer wat er échte tijd kost',
    tekst:
      'Niet beginnen bij wat het meest jeukt, maar bij wat het meest voorspelbaar is. Een goede kandidaat komt vaak voor (meer dan twee keer per week), heeft regels die u kunt uitleggen, en eindigt in een meetbare uitkomst.',
  },
  {
    nr: '02',
    titel: 'Krijg één voorstel met vaste prijs',
    tekst:
      'Geen consultancy-rapport. Eén A4 met agent-ontwerp, integraties, beleidsregels, doorlooptijd en prijs. Loopt het uit, dan is dat ons probleem, niet uw factuur.',
  },
  {
    nr: '03',
    titel: 'Test de integratie eerst',
    tekst:
      'Voordat de agent gebouwd wordt, zetten wij een testkoppeling op met uw boekhoudpakket, CRM of ERP. Werkt die niet zoals afgesproken, dan stoppen we — zonder factuur. Geen verrassingen achteraf.',
  },
  {
    nr: '04',
    titel: 'Draai de agent in stille modus',
    tekst:
      'De agent leest mee, neemt beslissingen, maar verstuurt niets. U en uw mensen controleren elke output. Daar leert u de fijnafstelling van het beleid. Pas als u tevreden bent, gaat hij live.',
  },
  {
    nr: '05',
    titel: 'Live met logboek en escalatie',
    tekst:
      'Agent draait autonoom binnen het beleid dat u heeft gezet. Bedragen of beslissingen boven mandaat komen langs een mens. Alle acties terug te zien in een logboek. Bijstellen kan elke dag.',
  },
];

export default function AIImplementatiePage() {
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
                { label: 'AI implementeren', href: PAGE_PATH },
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
              Dienst · AI-implementatie · Nederland
            </div>
            <h1 className="mt-4 font-display text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
              AI implementeren
              <br />
              <span className="italic text-[var(--oker-deep)]">zonder pilot-moeras.</span>
            </h1>
            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[640px]">
              De meeste AI-projecten lopen vast in proof-of-concept-fase. Niet bij ons. Wij brengen
              AI in productie in fasen die elk eindigen in iets werkends, gekoppeld aan uw systemen,
              binnen uw beleid, met logboek en escalatiepad. Geen pilot zonder vervolg, geen platform zonder
              gebruikers, geen consultancy-rapport zonder uitvoering.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--ink)] border border-[var(--paper-edge)] hover:bg-[var(--paper-deep)] hover:border-[var(--oker)] transition-colors"
              >
                Bekijk de bouwdienst
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-[12px] text-[var(--ink-faint)]">
              <span className="h-[1px] w-10" style={{ background: 'var(--oker)' }} aria-hidden />
              <span className="font-mono uppercase tracking-[0.18em]">
                Vaste prijs per fase · elke actie langs een mens · opzegtermijn één maand
              </span>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Stappenplan" title="AI implementeren in vijf stappen.">
        <ol className="mt-10 space-y-7 max-w-[820px]">
          {STAPPEN.map((s) => (
            <li key={s.nr} className="flex gap-5">
              <div className="shrink-0 flex items-center justify-center w-[40px] h-[40px] rounded-full border border-[var(--oker)] bg-[var(--paper-warm)] font-mono text-[12px] tabular-nums text-[var(--oker-deep)]">
                {s.nr}
              </div>
              <div>
                <h3 className="font-display text-[20px] leading-tight text-[var(--ink)]">
                  {s.titel}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.7] text-[var(--ink-dim)]">{s.tekst}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Wat AI-implementatie laat mislukken"
        title="Drie patronen die wij in de praktijk telkens terugzien."
        tint
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <Card
            title="Te groot beginnen"
            body="Een platform bouwen voor de hele organisatie voordat één agent draait. Maanden werk, weinig adoptie. Begin met één proces, bewijs het, breid uit."
          />
          <Card
            title="Geen koppeling met bestaande systemen"
            body="Een AI die los staat van uw boekhoudpakket of CRM is een speeltje. Implementatie betekent koppelen — vanaf dag één, niet als laatste stap."
          />
          <Card
            title="Geen eigenaar binnen het bedrijf"
            body="Als niemand bij u weet hoe het beleid wordt bijgesteld, wordt de agent na een maand een black box. Eén persoon intern leert mee bouwen vanaf week één."
          />
        </div>
      </Section>

      <Section eyebrow="Wat u krijgt na implementatie" title="Niet een tool. Een werkend onderdeel van uw operatie.">
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[860px]">
          {[
            'Werkende agent in productie, gekoppeld aan uw systemen',
            'Logboek met elke beslissing, terug te draaien per actie',
            'Beleidsregels die u zelf kunt aan- en uitzetten',
            'Eén interne persoon die het beleid kan bijsturen',
            'Maandelijks onderhoudsmoment van een half uur',
            'Optionele retainer voor monitoring en model-updates',
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border border-[var(--paper-edge)] rounded-[2px] px-4 py-4 bg-[var(--paper)]"
            >
              <span className="text-[var(--oker-deep)] pt-0.5">—</span>
              <span className="text-[14.5px] leading-[1.6] text-[var(--ink)]">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Veelgestelde vragen" title="Wat ondernemers vragen over AI-implementatie.">
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

      <Section eyebrow="Verder lezen" title="Achtergrond bij AI-implementatie.">
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['eerste-agent-is-nooit-de-belangrijkste', 'Uw eerste agent is nooit de belangrijkste'],
            ['welk-proces-is-geschikt-voor-een-agent', 'Welk proces is geschikt voor een agent? En welk niet?'],
            ['integraties-makkelijker-dan-u-denkt', 'Integraties met bestaande systemen: makkelijker dan u denkt'],
            ['guardrails-niet-een-rem-maar-een-kompas', 'Guardrails: niet een rem, maar een kompas'],
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
            Klaar om AI te implementeren in uw bedrijf{' '}
            <span className="italic text-[var(--oker-deep)]">zonder maandenlange pilot?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan"
              {...calPopupAttrs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
            >
              Plan een kennismaking
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
