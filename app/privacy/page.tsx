import type { Metadata } from 'next';
import Link from 'next/link';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacyverklaring, FactumAI',
  description:
    'Hoe FactumAI persoonsgegevens verwerkt: welke gegevens, waarom, met wie wij ze delen, jouw rechten en onze beveiligingsmaatregelen.',
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = '22 juli 2026';

export default function PrivacyPage() {
  return (
    <SitePage>
      <section className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacyverklaring', href: '/privacy' },
            ]}
          />
        </div>
        <div className="font-mono text-[11px] text-[var(--oker-deep)] uppercase tracking-[0.22em]">
          Juridisch
        </div>
        <h1 className="mt-4 font-display text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.05] tracking-tight text-[var(--ink)]">
          Privacyverklaring.
        </h1>
        <p className="mt-3 font-mono text-[12px] text-[var(--ink-faint)] uppercase tracking-[0.16em]">
          Laatst bijgewerkt: {LAST_UPDATED}
        </p>
        <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--ink-dim)]">
          FactumAI is een implementatiebureau voor AI-oplossingen, gericht op het Nederlandse MKB.
          Deze privacyverklaring beschrijft welke persoonsgegevens wij verwerken, waarom, en hoe
          wij daarmee omgaan.
        </p>
        <p className="mt-4 text-[15.5px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
          Onze uitgangspunten zijn simpel: we verwerken niet meer dan nodig, we zijn duidelijk
          over wat we doen, en we nemen beveiliging serieus. Geen kleine lettertjes, geen
          vaagheden.
        </p>
      </section>

      <article className="mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10 pb-16 sm:pb-24 prose-block">
        <H2 number="1">Wie zijn wij</H2>
        <P>
          FactumAI B.V. is de rechtspersoon achter deze website en onze dienstverlening; FactumAI
          is de handelsnaam waaronder wij werken.
        </P>
        <DefList
          items={[
            ['Adres', 'Julianastraat 15, 1616 CH Hoogkarspel'],
            ['KvK-nummer', '42123186'],
            ['E-mail privacy-vragen', 'info@factumai.nl'],
            ['Contactpersoon privacy', 'Sjaak ter Veld'],
          ]}
        />
        <P>
          Wij zijn de verwerkingsverantwoordelijke voor de verwerkingen die wij voor onze eigen
          bedrijfsvoering doen (website, klantadministratie, communicatie). Voor verwerkingen die
          wij uitvoeren in opdracht van onze klanten zijn wij verwerker, en is onze klant de
          verwerkingsverantwoordelijke.
        </P>

        <H2 number="2">Welke gegevens wij verwerken en waarom</H2>

        <H3>2.1 Bezoekers van factumai.nl</H3>
        <P>
          Wanneer je onze website bezoekt verzamelen wij minimale informatie om de website te
          kunnen aanbieden en te verbeteren.
        </P>
        <DefList
          items={[
            [
              'Welke gegevens',
              'Pagina-bezoeken, verwijzende bron, type apparaat en geanonimiseerd IP-adres. De basisstatistieken meten wij cookieloos (Vercel Analytics). Voor meer inzicht in het gebruik zetten wij daarnaast Google Analytics 4 in; dat plaatst analytische cookies en meet uitsluitend als je daar via de cookiebanner toestemming voor geeft.',
            ],
            [
              'Waarom',
              'Om te begrijpen welke content nuttig is, welke functies (zoals de AI-scan en de demo) gebruikt worden, en hoe we de website kunnen verbeteren.',
            ],
            [
              'Grondslag',
              'Voor de cookieloze basisstatistieken: ons gerechtvaardigd belang (art. 6 lid 1 sub f AVG). Voor Google Analytics: jouw toestemming (art. 6 lid 1 sub a AVG), die je altijd kunt intrekken via "Cookievoorkeuren" onderaan elke pagina.',
            ],
            [
              'Bewaartermijn',
              'Geaggregeerde statistieken: 12 maanden. Google Analytics-gegevens: maximaal 14 maanden.',
            ],
            [
              'Verwerkers',
              'Vercel Analytics (cookieloos) en Google Analytics 4 (Google Ireland Limited, alleen met toestemming).',
            ],
          ]}
        />

        <H3>2.2 Contactformulier</H3>
        <P>
          Als je het contactformulier invult, gebruiken wij je gegevens om op je vraag te
          reageren.
        </P>
        <DefList
          items={[
            [
              'Welke gegevens',
              'Naam, e-mailadres, telefoonnummer (indien ingevuld), inhoud van je bericht.',
            ],
            ['Waarom', 'Om je vraag te beantwoorden en eventueel verder contact op te nemen.'],
            [
              'Grondslag',
              'Precontractuele maatregel op jouw verzoek (art. 6 lid 1 sub b AVG) of gerechtvaardigd belang bij het reageren op jouw interesse (art. 6 lid 1 sub f AVG).',
            ],
            [
              'Bewaartermijn',
              'Zolang relevant voor opvolging, maximaal 1 jaar. Daarna verwijderen we je bericht, tenzij het heeft geleid tot een klantrelatie.',
            ],
          ]}
        />

        <H3>2.3 Klanten en opdrachten</H3>
        <P>
          Voor de uitvoering van overeenkomsten verwerken wij gegevens van onze zakelijke klanten
          en hun contactpersonen.
        </P>
        <DefList
          items={[
            [
              'Welke gegevens',
              'Bedrijfsnaam, namen en functies van contactpersonen, e-mailadressen, telefoonnummers, factuur- en bezoekadres, KvK- en BTW-nummer, financiële gegevens voor facturatie, correspondentie.',
            ],
            [
              'Waarom',
              'Om de overeenkomst uit te voeren, offertes te maken, te factureren, te communiceren en aan onze wettelijke verplichtingen te voldoen.',
            ],
            [
              'Grondslag',
              'Uitvoering van de overeenkomst (art. 6 lid 1 sub b AVG) en wettelijke verplichting voor fiscale administratie (art. 6 lid 1 sub c AVG).',
            ],
            [
              'Bewaartermijn',
              'Financiële administratie: 7 jaar (fiscale bewaarplicht). Overige klantgegevens: duur van de overeenkomst plus 2 jaar.',
            ],
          ]}
        />

        <H3>2.4 AI-scan en het scan-rapport</H3>
        <P>
          Met onze gratis AI-scan (de tool op{' '}
          <Link
            href="/scan"
            className="text-[var(--oker-deep)] underline decoration-[var(--oker)] underline-offset-4 hover:text-[var(--ink)]"
          >
            factumai.nl/scan
          </Link>
          ) laat je zien wat AI-agents voor jouw bedrijf kunnen betekenen. Je vult je website in;
          wij halen alleen openbaar beschikbare informatie van die website op en laten een
          AI-model die content analyseren. Wij bezoeken geen afgeschermde of ingelogde delen.
        </P>
        <DefList
          items={[
            [
              'Welke gegevens',
              'De website-URL die je opgeeft en (optioneel) je bedrijfsnaam, het IP-adres en apparaattype van de aanvraag (tegen misbruik), en de automatisch gegenereerde analyse. Vraag je het volledige rapport per e-mail aan, dan verwerken wij ook je e-mailadres en je keuze voor de marketing-opt-in (met tijdstip).',
            ],
            [
              'Waarom',
              'Om de scan uit te voeren en het rapport te tonen of te versturen. En, alleen als je daarvoor toestemming geeft via het vinkje, om je af en toe te mailen over wat AI voor jouw bedrijf kan betekenen.',
            ],
            [
              'Grondslag',
              'Het uitvoeren van de scan en het versturen van het door jou gevraagde rapport: op jouw verzoek / precontractueel (art. 6 lid 1 sub b AVG) of gerechtvaardigd belang (art. 6 lid 1 sub f AVG). Het versturen van marketingmails: jouw toestemming (art. 6 lid 1 sub a AVG), die je op elk moment kunt intrekken.',
            ],
            [
              'Bewaartermijn',
              'Scan-gegevens bewaren wij maximaal 24 maanden, of tot je je afmeldt of om verwijdering vraagt. Daarna verwijderen wij ze, tenzij het tot een klantrelatie heeft geleid.',
            ],
            [
              'Opslag en verwerkers',
              'Opgeslagen in onze database bij Supabase (EU, Ierland). Het rapport en de bevestiging versturen wij via Resend. De analyse gebeurt met een AI-model van Anthropic (Claude). Zie sectie 3.',
            ],
          ]}
        />

        <H2 number="3">Met wie wij gegevens delen</H2>
        <P>
          Wij delen alleen gegevens met partijen die wij strikt nodig hebben om ons werk te doen.
          Met elke partij hebben wij een verwerkersovereenkomst gesloten.
        </P>
        <P>Onze huidige verwerkers:</P>
        <Bullets
          items={[
            'SnelStart, boekhouding (Nederland)',
            'Microsoft 365, e-mail en documenten (EU/VS onder EU-US Data Privacy Framework)',
            'Apple iCloud, back-up en synchronisatie (EU/VS onder EU-US Data Privacy Framework)',
            'Vercel, hosting en cookieloze website-statistieken (VS onder EU-US Data Privacy Framework)',
            'Google, website-statistieken via Google Analytics 4, uitsluitend met toestemming (Google Ireland Limited; doorgifte naar de VS onder EU-US Data Privacy Framework)',
            'Supabase, databasehosting voor onder meer scan-leads (data-opslag in de EU, Ierland)',
            'Resend, verzending van e-mails zoals het scan-rapport en bevestigingen (VS, met Standard Contractual Clauses)',
            'Anthropic, AI-analyse voor de AI-scan (VS, met Standard Contractual Clauses)',
          ]}
        />
        <P>
          Voor de diensten die wij voor onze klanten uitvoeren kan een aparte set sub-verwerkers
          van toepassing zijn. Zie daarvoor onze{' '}
          <Link
            href="/subverwerkers"
            className="text-[var(--oker-deep)] underline decoration-[var(--oker)] underline-offset-4 hover:text-[var(--ink)]"
          >
            sub-processorpagina
          </Link>
          .
        </P>
        <P>
          Wij verkopen geen persoonsgegevens. Wij gebruiken persoonsgegevens niet voor
          marketingdoeleinden zonder expliciete toestemming.
        </P>

        <H2 number="4">Doorgifte naar landen buiten de EER</H2>
        <P>
          Enkele van onze verwerkers zijn gevestigd in de Verenigde Staten. Voor die doorgifte
          steunen wij op het EU-US Data Privacy Framework (adequaatheidsbesluit Europese Commissie
          van 10 juli 2023) en op Standard Contractual Clauses waar aanvullend nodig.
        </P>
        <P>
          Voor klantopdrachten waarbij wij AI-modellen uit de VS inzetten voeren wij een Transfer
          Impact Assessment uit die beschrijft welke aanvullende waarborgen wij toepassen. Deze is
          intern beschikbaar en kan op verzoek worden gedeeld.
        </P>

        <H2 number="5">Beveiliging</H2>
        <P>
          Wij nemen passende technische en organisatorische maatregelen om je gegevens te
          beschermen, waaronder:
        </P>
        <Bullets
          items={[
            'Encryptie van gegevens in transit (TLS 1.2+) en at rest (AES-256)',
            'Tweefactor-authenticatie op alle systemen met toegang tot persoonsgegevens',
            'Principe van least privilege: alleen wie moet, heeft toegang',
            'Audit-logging en monitoring',
            'Regelmatige evaluatie van onze beveiligingsmaatregelen',
          ]}
        />

        <H2 number="6">Jouw rechten</H2>
        <P>
          Je hebt onder de AVG de volgende rechten. Wij reageren binnen 30 dagen op je verzoek.
        </P>
        <Bullets
          items={[
            'Recht op inzage: weten welke gegevens wij van je verwerken.',
            'Recht op rectificatie: onjuiste gegevens laten corrigeren.',
            'Recht op wissing: gegevens laten verwijderen indien dat wettelijk kan.',
            'Recht op beperking: gebruik van je gegevens tijdelijk stoppen.',
            'Recht op bezwaar: bezwaar maken tegen gebruik op basis van gerechtvaardigd belang.',
            'Recht op dataportabiliteit: je gegevens in een bruikbaar formaat ontvangen.',
            'Recht op intrekken van toestemming: daar waar wij op toestemming steunen.',
          ]}
        />
        <P>
          Een verzoek dien je in via{' '}
          <a
            href="mailto:info@factumai.nl"
            className="text-[var(--oker-deep)] underline decoration-[var(--oker)] underline-offset-4 hover:text-[var(--ink)]"
          >
            info@factumai.nl
          </a>
          . Wij kunnen je om bewijs van identiteit vragen om te voorkomen dat wij gegevens aan de
          verkeerde persoon verstrekken.
        </P>
        <P>
          Niet tevreden over hoe wij met je gegevens omgaan? Je kunt een klacht indienen bij de
          Autoriteit Persoonsgegevens via{' '}
          <a
            href="https://autoriteitpersoonsgegevens.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--oker-deep)] underline decoration-[var(--oker)] underline-offset-4 hover:text-[var(--ink)]"
          >
            autoriteitpersoonsgegevens.nl
          </a>
          .
        </P>

        <H2 number="7">Wijzigingen</H2>
        <P>
          Wij kunnen deze privacyverklaring aanpassen wanneer onze dienstverlening, wetgeving of
          verwerkers veranderen. De datum bovenaan deze pagina geeft de laatste wijziging aan.
          Materiële wijzigingen kondigen wij vooraf aan via onze website of per e-mail aan
          bestaande klanten.
        </P>

        <p className="mt-12 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.18em]">
          Versie 1.2, {LAST_UPDATED}
        </p>
      </article>
    </SitePage>
  );
}

function H2({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <h2 className="mt-12 mb-4 font-display text-[24px] sm:text-[28px] leading-tight text-[var(--ink)] flex items-baseline gap-3">
      <span className="font-mono text-[14px] text-[var(--oker-deep)]">{number}.</span>
      <span>{children}</span>
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 font-display text-[18px] sm:text-[20px] leading-tight text-[var(--ink)]">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[15.5px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
      {children}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((i) => (
        <li
          key={i}
          className="flex gap-3 text-[15.5px] sm:text-[16px] leading-[1.7] text-[var(--ink)]"
        >
          <span className="text-[var(--oker-deep)] pt-1 shrink-0">·</span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function DefList({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="mt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-6 gap-y-3">
      {items.map(([term, def]) => (
        <div key={term} className="contents">
          <dt className="font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.16em] sm:pt-1">
            {term}
          </dt>
          <dd className="text-[15px] sm:text-[15.5px] leading-[1.7] text-[var(--ink)]">{def}</dd>
        </div>
      ))}
    </dl>
  );
}
