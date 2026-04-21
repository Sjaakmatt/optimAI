import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { CASES } from '@/lib/data/cases';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
const PAGE_PATH = '/diensten/ai-agent-laten-bouwen';

export const metadata: Metadata = {
  title: 'AI-agent laten bouwen voor uw MKB-bedrijf',
  description:
    'AI-agent laten bouwen die het werk van uw binnendienst overneemt: mails, offertes, orders, facturatie. Vaste bouwprijs, eerste agent in 1 tot 2 weken live. Optionele retainer voor onderhoud en monitoring, of alleen implementatie.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'AI-agent laten bouwen · FactumAI',
    description:
      'Vaste bouwprijs, eerste agent live in 1 tot 2 weken. Optionele retainer voor onderhoud en monitoring - u kiest zelf. Wij bouwen AI-agents op maat voor MKB-bedrijven in Nederland.',
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: 'Wat kost het om een AI-agent te laten bouwen?',
    a: 'Wij werken met een vaste prijs per agent. De prijs hangt af van de complexiteit van het proces en het aantal systemen waarmee gekoppeld wordt (e-mail, boekhoudpakket, CRM, voorraad). Voor een eerste agent ligt de investering doorgaans tussen een paar duizend en enkele tienduizenden euro’s. U krijgt altijd één concreet voorstel met heldere opleveringsdatum voordat we starten.',
  },
  {
    q: 'Hoe lang duurt het om een AI-agent te laten bouwen?',
    a: 'De eerste versie van een agent staat meestal binnen één tot twee weken live. Daarna breiden we uit met meer scenario’s of extra afdelingen. Een volledig multi-agent-platform met zeven samenwerkende agents hebben we binnen vijf tot acht weken opgeleverd - zie onze cases voor concrete doorlooptijden.',
  },
  {
    q: 'Moet ik eerst alle processen in kaart hebben?',
    a: 'Nee. Wij beginnen met één proces dat nú pijn doet: de binnenkomende mailstroom, offertes die te laat de deur uit gaan, voorraadsignalen die vast blijven zitten. In een gesprek van een uur hebben we meestal al helder welk proces het meeste tijd bespaart als eerste.',
  },
  {
    q: 'Gaat de agent dingen doen zonder mijn toestemming?',
    a: 'Niet als u het goed inricht. Elke actie hangt aan een beleidsregel (guardrail) die u zelf aan- of uitzet. Bedragen boven uw mandaat, uitzonderlijke situaties en juridische escalaties komen standaard langs u. Alles wat de agent doet is terug te zien in een logboek: welke data is geraadpleegd, welk beleid toegepast, welke actie uitgevoerd.',
  },
  {
    q: 'Moet ik een IT-afdeling hebben om dit te draaien?',
    a: 'Nee. Wij regelen de integraties met uw bestaande systemen en zorgen dat alles werkt. U hoeft geen ontwikkelaars in dienst te hebben. Een laptop, een mailadres en toegang tot uw software is genoeg om te starten.',
  },
  {
    q: 'Wat als mijn systemen oud zijn of geen API hebben?',
    a: 'Dat is zelden een blokkade. Wij kunnen ook met CSV-exports, e-mail-doorstromingen of kleine bridge-scripts werken. Niet elegant, wel effectief. In onze case bij Bakker Transport koppelden we op deze manier aan een planningssysteem uit 2011.',
  },
  {
    q: 'Vervangt een AI-agent mijn mensen?',
    a: 'In onze praktijk niet. De agent neemt het saaie, repetitieve werk weg; uw mensen krijgen ruimte voor klantcontact, vakwerk en acquisitie. Teams die wij hebben geholpen groeiden in omzet zonder extra FTE aan te nemen.',
  },
  {
    q: 'Moet ik een maandelijkse retainer afnemen?',
    a: 'Nee, u kiest zelf. Wij leveren een vaste bouwprijs voor implementatie. Daarna kunt u een maandelijkse retainer afnemen voor onderhoud, monitoring, model-updates en beleidsaanpassingen, óf u neemt alleen de implementatie en bijstellen gaat ad hoc tegen een vaste prijs per wijziging. Beide opties zijn beschikbaar. In de praktijk kiest het merendeel voor een retainer, omdat een agent die blijft meegroeien met uw processen en systemen meer waarde levert dan één die stilstaat.',
  },
  {
    q: 'Wat zit er in de maandelijkse retainer?',
    a: 'Monitoring van agent-prestaties, periodieke review van beleidsregels, model-updates wanneer er betere of goedkopere modellen uitkomen, beveiligingsupdates, kleine bijstellingen zonder extra factuur, en een maandelijks onderhoudsgesprek van een half uur. Grotere uitbreidingen (nieuwe scenario\'s of extra integraties) vallen buiten de retainer en krijgen een eigen vaste-prijs-offerte.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI-agent ontwikkeling',
  name: 'AI-agent laten bouwen',
  description:
    'Wij ontwerpen, bouwen en implementeren AI-agents op maat voor MKB-bedrijven in Nederland. Vaste bouwprijs, eerste agent live in 1 tot 2 weken, optionele maandelijkse retainer voor onderhoud en monitoring.',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: `${SITE_URL}${PAGE_PATH}`,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'EUR',
      description: 'Vaste prijs per agent, afhankelijk van complexiteit en integraties.',
    },
    availability: 'https://schema.org/InStock',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI-agent oplossingen',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Offerte- en orderverwerking-agent' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Klantservice- en mailverwerking-agent' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Facturatie- en debiteuren-agent' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Inkoop- en voorraad-agent' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Planning- en logistiek-agent' },
      },
    ],
  },
};

export default function AIAgentLatenBouwenPage() {
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
                { label: 'AI-agent laten bouwen', href: PAGE_PATH },
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
              Dienst · MKB Nederland
            </div>
            <h1 className="mt-4 font-display text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.05] tracking-tight text-[var(--ink)]">
              AI-agent laten bouwen
              <br />
              <span className="italic text-[var(--oker-deep)]">voor uw MKB-bedrijf.</span>
            </h1>
            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--ink-dim)] max-w-[640px]">
              Een AI-agent is een digitale collega die het repetitieve werk van uw binnendienst
              overneemt. Mails lezen, offertes opstellen, orders verwerken, facturen klaarzetten,
              voorraadsignalen opvolgen. Binnen úw regels, gekoppeld aan úw systemen. Wij
              bouwen hem op maat, met vaste prijs en duidelijke opleveringsdatum.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors"
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
            <div className="mt-10 flex items-center gap-3 text-[12px] text-[var(--ink-faint)]">
              <span
                className="h-[1px] w-10"
                style={{ background: 'var(--oker)' }}
                aria-hidden
              />
              <span className="font-mono uppercase tracking-[0.18em]">
                Vaste bouwprijs · 1 tot 2 weken live · retainer optioneel
              </span>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Wat levert het op" title="Tijd terug. Fouten eruit. Grip erop.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <Benefit
            title="Uren tijd per dag"
            body="Een goed gebouwde agent neemt 30 tot 60 procent van het repetitieve binnendienstwerk over. Mails beantwoorden, offertes opstellen, orders verwerken. In de praktijk ziet u dat terug in uren per medewerker per dag."
          />
          <Benefit
            title="Minder fouten en vergeten zaken"
            body="De agent vergeet niets. Elke vervolgactie staat gepland. Elke mail krijgt antwoord. Klachten glippen niet tussen wal en schip. Voorraad onder niveau? Wordt gesignaleerd, desgewenst automatisch aangevuld."
          />
          <Benefit
            title="Volledige grip en transparantie"
            body="Alle acties zijn terug te zien in een logboek. Welke data is geraadpleegd, welk beleid toegepast, wat er is besloten. U kunt elke beslissing ongedaan maken en het beleid bijstellen."
          />
        </div>
        <p className="mt-10 text-[15px] leading-[1.7] text-[var(--ink-dim)] max-w-[720px]">
          Bij Nordveld Groothandel bespaarde één agent-platform 182 minuten per dag, met een
          gemiddelde reactietijd op offertes die zakte van 24 uur naar 9 minuten. Bij Hendriks
          Installatietechniek ging de administratietijd met 65% omlaag en werden facturen vier
          dagen sneller verstuurd. Bekijk de{' '}
          <Link href="/cases" className="underline text-[var(--ink)] hover:text-[var(--oker-deep)]">
            volledige cases
          </Link>{' '}
          voor de cijfers.
        </p>
      </Section>

      <Section
        eyebrow="Hoe het werkt"
        title="Van eerste gesprek naar werkende agent in 1 tot 2 weken."
        tint
      >
        <ol className="mt-8 space-y-5">
          <Step
            number="01"
            title="Kennismakingsgesprek"
            body="Een uur. U vertelt waar uw mensen tijd aan kwijt zijn. Wij luisteren en stellen vragen over uw werkwijze, systemen en beleid. Aan het eind weten we samen welk proces als eerste automatisch kan."
          />
          <Step
            number="02"
            title="Concreet voorstel met vaste prijs"
            body="Binnen een week krijgt u een voorstel: welke agent we bouwen, welke systemen we koppelen, welke beleidsregels, welke doorlooptijd, welke prijs. Geen open einden, geen meerwerk-verrassingen."
          />
          <Step
            number="03"
            title="Bouw en koppeling"
            body="Wij bouwen de agent, koppelen aan uw e-mail, boekhoudpakket, CRM, voorraadsysteem of magazijn-app. U test mee. Wij passen aan tot het klopt met hoe uw bedrijf werkt."
          />
          <Step
            number="04"
            title="Live en bijhouden"
            body="De agent gaat live. Eerst in stille modus zodat u meekijkt, daarna volledig autonoom binnen de regels die u heeft bepaald. Eens per maand een kort onderhoudsgesprek. Nieuwe scenario’s bouwen we op afroep bij."
          />
        </ol>
      </Section>

      <Section eyebrow="Wat het kost" title="Vaste bouwprijs. Retainer op uw voorwaarden.">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="site-card px-6 py-7">
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
              De bouw
            </div>
            <h3 className="mt-2 font-display text-[22px] leading-tight text-[var(--ink)]">
              Eén vaste prijs, heldere scope.
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.65] text-[var(--ink-dim)]">
              Wij leveren een concreet voorstel met één vaste prijs voor bouw en implementatie,
              afhankelijk van complexiteit en het aantal systemen waarmee we koppelen. Geen
              uurtje-factuurtje, geen eindeloze meerwerkdiscussies.
            </p>
            <ul className="mt-5 space-y-2 text-[14px] leading-[1.6] text-[var(--ink)]">
              {[
                'Procesanalyse en agent-ontwerp',
                'Bouw, integraties en beleidsconfiguratie',
                'Testperiode met uw mensen',
                'Go-live begeleiding',
                'Eerste maand vinger aan de pols',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check size={14} strokeWidth={2} className="mt-0.5 text-[var(--oker-deep)] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-card px-6 py-7" style={{ borderColor: 'var(--oker)' }}>
            <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
              Daarna · optioneel
            </div>
            <h3 className="mt-2 font-display text-[22px] leading-tight text-[var(--ink)]">
              Retainer die de agent laat meegroeien.
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.65] text-[var(--ink-dim)]">
              Een AI-agent is geen statisch product. Modellen worden beter, uw processen veranderen,
              externe systemen krijgen updates, beleid schuift. Voor klanten die die doorontwikkeling
              willen borgen is er een maandelijkse retainer. Wilt u alleen de implementatie? Ook
              prima — aanpassingen gaan dan ad hoc tegen vaste prijs.
            </p>
            <ul className="mt-5 space-y-2 text-[14px] leading-[1.6] text-[var(--ink)]">
              {[
                'Monitoring van agent-prestaties en logboek',
                'Model-updates zodra er betere of goedkopere uitkomen',
                'Periodieke review en bijstelling van beleidsregels',
                'Kleine wijzigingen zonder extra factuur',
                'Maandelijks onderhoudsgesprek van een half uur',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check size={14} strokeWidth={2} className="mt-0.5 text-[var(--oker-deep)] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-[14px] text-[var(--ink-faint)] leading-[1.7] max-w-[720px]">
          U kiest zelf: met retainer voor rust en doorontwikkeling, of puur implementatie en
          aanpassen wanneer het nodig is. Grote uitbreidingen (nieuwe scenario&rsquo;s, extra
          integraties) vallen in beide gevallen buiten de retainer en krijgen een eigen
          vaste-prijs-offerte.
        </p>
      </Section>

      <Section
        eyebrow="Voor welke processen"
        title="Overal waar dezelfde handeling te vaak gebeurt."
        tint
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {[
            ['Offerte-agent', 'Leest aanvragen, rekent marges, stelt offerte op, stuurt door ter goedkeuring.'],
            ['Order-agent', 'Kredietcheck, voorraadcheck, bevestigingsmail, koppeling met magazijn en planning.'],
            ['Mail-agent', 'Sorteert en beantwoordt inkomende klantmails in úw toon, volgens úw beleid.'],
            ['Facturatie-agent', 'Concept-facturen, creditnota’s, debiteurenopvolging met menselijke toon bij trouwe klanten.'],
            ['Inkoop-agent', 'Bestellingen uitzetten bij leveranciers, prijsafwijkingen signaleren, kwartaal-reviews voorbereiden.'],
            ['Planning-agent', 'Ritten combineren, alternatieven regelen bij vertraging, klanten pro-actief informeren.'],
          ].map(([title, body]) => (
            <article key={title} className="site-card px-5 py-5">
              <h3 className="font-display text-[17px] leading-snug text-[var(--ink)]">{title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--ink-dim)]">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Praktijkvoorbeelden" title="Drie bedrijven, drie oplossingen.">
        <div className="mt-8 space-y-4">
          {CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="block border border-[var(--paper-edge)] rounded-[2px] px-5 py-5 bg-[var(--paper)] hover:border-[var(--oker)] hover:bg-[var(--paper-warm)] transition-colors"
            >
              <div className="font-mono text-[10px] text-[var(--oker-deep)] uppercase tracking-[0.18em]">
                {c.branche} · {c.regio} · {c.doorlooptijd}
              </div>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-[20px] text-[var(--ink)]">{c.klant}</h3>
                <span className="text-[13px] text-[var(--ink-dim)] italic">{c.tagline}</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Veelgestelde vragen" title="Wat ondernemers ons vooraf vragen.">
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

      <Section eyebrow="Verder lezen" title="Achtergrond bij deze dienst.">
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['waarom-mkb-nu-klaar-is-voor-ai-agents', 'Waarom het MKB nu klaar is voor AI-agents'],
            ['vaste-bouwprijs-en-retainer', 'Vaste bouwprijs én een retainer die meegroeit'],
            ['eerste-agent-is-nooit-de-belangrijkste', 'Uw eerste agent is nooit de belangrijkste'],
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
                <ArrowRight
                  size={14}
                  strokeWidth={1.8}
                  className="inline ml-2 text-[var(--oker-deep)]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-[var(--paper-edge)] bg-[var(--ink)] relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 55% at 82% 25%, rgba(161, 88, 66, 0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-10 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h2 className="font-display text-[22px] sm:text-[26px] text-[var(--paper)] max-w-[560px] leading-snug">
            Klaar om een AI-agent voor uw bedrijf{' '}
            <span className="italic text-[var(--oker)]">te laten bouwen?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] bg-[var(--terra)] text-[var(--paper)] hover:bg-[var(--oker-deep)] transition-colors lift-on-hover"
            >
              Plan een gesprek
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[14px] text-[var(--paper)] border border-[var(--paper-deep)] hover:bg-[var(--paper)] hover:text-[var(--ink)] hover:border-[var(--paper)] transition-colors"
            >
              Bekijk de demo
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

function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <article className="site-card px-6 py-7">
      <h3 className="font-display text-[20px] leading-tight text-[var(--ink)]">{title}</h3>
      <p className="mt-3 text-[14px] leading-[1.65] text-[var(--ink-dim)]">{body}</p>
    </article>
  );
}

function Step({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-5 sm:gap-6 pb-5 border-b border-[var(--paper-edge)] last:border-b-0">
      <div className="font-mono text-[14px] text-[var(--oker-deep)] tracking-[0.18em] shrink-0 w-10">
        {number}
      </div>
      <div>
        <h3 className="font-display text-[20px] leading-tight text-[var(--ink)]">{title}</h3>
        <p className="mt-2 text-[14.5px] leading-[1.7] text-[var(--ink-dim)] max-w-[720px]">
          {body}
        </p>
      </div>
    </li>
  );
}
