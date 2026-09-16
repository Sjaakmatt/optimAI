import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { GratisAuditForm } from '@/components/audit/GratisAuditForm';
import { AUDIT_TERMS_VERSION, isAuditCampaignOpen } from '@/lib/audit-campaign';
import styles from './gratis-audit.module.css';

const PAGE_PATH = '/gratis-ai-audit';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export const metadata: Metadata = {
  title: 'Gratis AI-audit: 3 processen voor 3 bedrijven',
  description: 'FactumAI selecteert 3 MKB-bedrijven in Noord-Holland voor een kosteloze AI-audit van ieder 3 processen. Op locatie, met een concreet rapport en zonder afnameverplichting.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'Drie processen. Eén helder begin. · FactumAI',
    description: 'Een kosteloze AI-audit voor drie MKB-bedrijven. Ontdek waar uw team tijd verliest, waar AI kan helpen en met welk proces u begint.',
    url: `${SITE_URL}${PAGE_PATH}`,
    type: 'website',
  },
};

const STEPS = [
  { time: '20 minuten · online', title: 'Even kennismaken.', body: 'U vertelt wat er speelt. We kijken of uw bedrijf bij deze ronde past en kiezen samen drie afgebakende processen.' },
  { time: 'Vooraf · met uw contactpersoon', title: 'Het werk erbij pakken.', body: 'U verzamelt enkele voorbeelden, aantallen en een inschatting van de tijd die het werk kost. We spreken af wie bij de sessie nodig is.' },
  { time: 'Eén dagdeel · bij u op locatie', title: 'Samen de diepte in.', body: 'Met de mensen die het werk doen, tekenen we de stappen uit. We bekijken overdrachten, systemen, handelingen en uitzonderingen.' },
  { time: 'Rapport + 45 minuten advies', title: 'Een helder begin kiezen.', body: 'U krijgt een beknopt rapport over de drie processen. We bespreken de kansen en adviseren welk proces u het beste als eerste aanpakt.' },
];

const TERMS = [
  ['Drie bedrijven, ieder drie processen.', 'We selecteren drie MKB-bedrijven met een vestiging in Noord-Holland. Tijdens de intake begrenzen we samen drie terugkerende werkprocessen per bedrijf.'],
  ['Selectie op inhoud en samenwerking.', 'We kijken naar het terugkerende handwerk, beschikbare praktijkvoorbeelden en de ruimte om medewerkers te betrekken. Aanmelden is nog geen bevestiging van deelname; u hoort persoonlijk of uw bedrijf is geselecteerd.'],
  ['De afgesproken audit kost u € 0.', 'De intake, voorbereiding door FactumAI, één dagdeel op locatie, reiskosten binnen Noord-Holland, het beknopte rapport en het adviesgesprek zijn inbegrepen.'],
  ['Uw tijd en inzicht zijn nodig.', 'U wijst één contactpersoon aan, verzamelt de afgesproken voorbeelden en maakt de betrokken medewerkers vrij voor de sessie. We vragen na afloop om eerlijke feedback.'],
  ['Een planning die voor beide partijen past.', 'Voor de start spreken we de bezoekdatum en oplevering af. Kunt u toch niet deelnemen, laat het ons tijdig weten. Dan kunnen we de plek aan een ander bedrijf aanbieden.'],
  ['Onderzoek en advies, met een duidelijke grens.', 'Deze ronde omvat drie afgebakende processen. Uitgebreide tijdmetingen, extra sessies, prototypes, softwarebouw en koppelingen vallen buiten het aanbod en vragen eventueel een apart voorstel.'],
  ['U houdt alle vrijheid na afloop.', 'Er is geen afnameverplichting. U mag zelfstandig met het advies verder. Tijdwinst is een inschatting met zichtbare aannames; ook als AI weinig toevoegt, staat dat in het rapport.'],
  ['Zorgvuldig met uw informatie.', 'We gebruiken uw bedrijfsinformatie voor de audit en behandelen die vertrouwelijk. Lever voorbeelden waar mogelijk zonder persoonsgegevens aan. Een review of openbare klantcase is vrijwillig; herkenbare informatie publiceren we alleen na aparte toestemming.'],
];

const FAQS = [
  { q: 'Waarom bieden jullie dit kosteloos aan?', a: 'We willen drie nieuwe bedrijven leren kennen en laten ervaren wat onze aanpak oplevert. U krijgt concreet advies en wij leren van uw praktijk en feedback. Als er daarna een passende bouwvraag ontstaat, kunnen we daarover praten. U hoeft geen vervolgdienst af te nemen.' },
  { q: 'Moet ik al weten welke drie processen geschikt zijn?', a: 'Nee. Vertel bij uw aanmelding welk terugkerend werk veel tijd kost. Tijdens de intake kiezen we samen drie behapbare processen, zoals orders invoeren, offertes voorbereiden of klantvragen behandelen.' },
  { q: 'Wat is het verschil met jullie reguliere AI-audit?', a: 'Deze kosteloze ronde heeft een vaste omvang: drie processen, één dagdeel op locatie, een beknopt rapport en een adviesgesprek. De reguliere AI-audit stemmen we af op uw onderzoeksvraag en kan meerdere afdelingen, sessies of uitgebreidere metingen omvatten.' },
  { q: 'Moeten wij toegang tot onze systemen geven?', a: 'Voor de aanmelding is dat niet nodig. Voor de audit spreken we af welke voorbeelden en informatie helpen. Vaak kunnen medewerkers de werkwijze laten zien met een geanonimiseerd voorbeeld. U hoeft geen wachtwoorden of klantdossiers via het formulier te delen.' },
  { q: 'Wat gebeurt er na mijn aanmelding?', a: 'We bekijken uw aanmelding en nemen persoonlijk contact op. Tijdens een korte kennismaking bepalen we of uw vraag en onze aanpak bij elkaar passen. Pas na bevestiging van beide kanten plannen we de audit. Er zijn drie deelnemende bedrijven in deze ronde.' },
];

export default function GratisAIAuditPage() {
  const open = isAuditCampaignOpen();

  return (
    <SitePage lucht={false}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }} />
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="campaign-heading">
          <div className={styles.container}>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'AI-audit', href: '/diensten/ai-audit' }, { label: 'Kosteloze ronde', href: PAGE_PATH }]} />
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}><span className={styles.dot} /> Voor drie MKB-bedrijven in Noord-Holland</p>
                <h1 id="campaign-heading">Drie processen.<br /><em>Eén helder begin.</em></h1>
                <p className={styles.lead}>Waar verliest uw team tijd? En waar kan AI echt helpen? We komen bij u langs, onderzoeken drie werkprocessen en geven u een concreet advies om mee verder te gaan.</p>
                <div className={styles.actions}>
                  <a className={styles.primary} href="#aanmelden">{open ? 'Meld uw bedrijf aan' : 'Bekijk deze auditronde'} <ArrowUpRight size={18} aria-hidden /></a>
                  <a className={styles.textLink} href="#wat-u-ontvangt">Wat u ontvangt <ArrowDown size={16} aria-hidden /></a>
                </div>
                <p className={styles.heroNote}>Kosteloos. Geen afnameverplichting. Wel tijd en aandacht voor uw werk.</p>
              </div>
              <ProcessSheets />
            </div>
            <dl className={styles.facts}>
              <div><dt>01 / Samen aan tafel</dt><dd>Eén dagdeel bij u op locatie</dd></div>
              <div><dt>02 / Tastbaar resultaat</dt><dd>Rapport over uw drie processen</dd></div>
              <div><dt>03 / U kiest het vervolg</dt><dd>Advies waar u vrij mee verder kunt</dd></div>
            </dl>
          </div>
        </section>

        <section id="wat-u-ontvangt" className={styles.results} aria-labelledby="results-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>Dit ligt er straks op tafel</p><h2 id="results-heading">Van drukke werkdag<br /><em>naar duidelijke keuzes.</em></h2></div>
              <p>U ontvangt een beknopt rapport over alle drie de processen. Begrijpelijk voor uw team en concreet genoeg om een volgende stap te kiezen.</p>
            </div>
            <div className={styles.resultsGrid}>
              <article><span className={styles.index}>01</span><h3>Waar de tijd blijft.</h3><p>De stappen, systemen en overdrachten in beeld. Met de plekken waar uw mensen zoeken, wachten of werk opnieuw doen.</p></article>
              <article><span className={styles.index}>02</span><h3>Waar AI kan helpen.</h3><p>Per proces ziet u of AI zinvol is. Bij kansrijke toepassingen: verwachte tijdwinst, wat ervoor nodig is en welk werk mensen blijven doen.</p></article>
              <article><span className={styles.index}>03</span><h3>Waar u begint.</h3><p>Een afweging van opbrengst en haalbaarheid. Met één aanbevolen eerste stap, die we in het adviesgesprek samen doornemen.</p></article>
            </div>
            <p className={styles.resultNote}>De verwachte tijdwinst is een inschatting op basis van uw informatie. Vrijgekomen uren betekenen niet automatisch lagere kosten.</p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.fit}`} aria-labelledby="fit-heading">
          <div className={`${styles.container} ${styles.fitGrid}`}>
            <div className={styles.fitCopy}>
              <p className={styles.eyebrow}>Herkent u dit?</p>
              <h2 id="fit-heading">Goed werk.<br /><em>Veel handwerk eromheen.</em></h2>
              <p>Deze ronde past bij bedrijven waar mensen elke week tijd kwijt zijn aan terugkerend administratief werk. Er hoeft nog geen AI-plan te liggen.</p>
              <ul className={styles.fitList}>
                <li><Check size={17} aria-hidden /> Gegevens overnemen tussen mail, Excel en andere systemen.</li>
                <li><Check size={17} aria-hidden /> Informatie zoeken voordat een order of offerte verder kan.</li>
                <li><Check size={17} aria-hidden /> Dezelfde vragen beantwoorden of steeds achter werk aan zitten.</li>
              </ul>
              <a href="#deelnamevoorwaarden" className={styles.textLink}>Bekijk de deelnameafspraken <ArrowDown size={15} aria-hidden /></a>
            </div>
            <aside className={styles.personal} aria-labelledby="why-free-heading">
              <div className={styles.portrait}><Image src="/sjaak-portrait-cutout.webp" alt="Sjaak ter Veld, oprichter van FactumAI" width={640} height={640} sizes="(max-width: 760px) 110px, 150px" /></div>
              <div><p className={styles.eyebrow}>Waarom deze ronde?</p><h3 id="why-free-heading">Elk goed begin<br /><em>begint met luisteren.</em></h3><p>We willen drie nieuwe bedrijven leren kennen en laten ervaren wat onze aanpak oplevert. U krijgt inzicht in uw werk; wij leren van uw praktijk en eerlijke feedback.</p><p className={styles.signature}>Sjaak ter Veld<span>Oprichter · FactumAI</span></p></div>
            </aside>
          </div>
        </section>

        <section className={styles.approach} aria-labelledby="approach-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>Van aanmelding naar advies</p><h2 id="approach-heading">Zo pakken<br /><em>we het aan.</em></h2></div>
              <p>We doen het samen met de mensen die het werk kennen. De drie processen en de planning spreken we vooraf af.</p>
            </div>
            <ol className={styles.steps}>{STEPS.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span><p className={styles.stepTime}>{step.time}</p><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
          </div>
        </section>

        <section id="deelnamevoorwaarden" className={styles.section} aria-labelledby="terms-heading" data-terms-version={AUDIT_TERMS_VERSION}>
          <div className={`${styles.container} ${styles.termsGrid}`}>
            <div className={styles.termsIntro}><p className={styles.eyebrow}>De deelnameafspraken</p><h2 id="terms-heading">Kosteloos.<br /><em>Helder afgesproken.</em></h2><p>Wij investeren onze tijd en expertise. U brengt de mensen en de praktijk mee. Zo wordt het voor beide partijen een waardevolle audit.</p><a href="#aanmelden" className={styles.textLink}>{open ? 'Past dit bij uw bedrijf?' : 'Over deze ronde'} <ArrowDown size={15} aria-hidden /></a></div>
            <ol className={styles.terms}>{TERMS.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
          </div>
        </section>

        <section id="aanmelden" className={styles.application} aria-labelledby="application-heading">
          <div className={`${styles.container} ${styles.applicationGrid}`}>
            <div className={styles.applicationIntro}><p className={styles.eyebrow}>{open ? 'De eerste stap is klein' : 'Deze ronde is gesloten'}</p><h2 id="application-heading">{open ? <>Welk werk mag<br /><em>lichter worden?</em></> : <>Bedankt voor<br /><em>uw belangstelling.</em></>}</h2><p>{open ? 'Vertel kort wat er in uw bedrijf speelt. U hoeft de drie processen nog niet precies te kennen; dat zoeken we samen uit.' : 'Aanmelden voor deze kosteloze auditronde is op dit moment niet mogelijk. Wilt u de mogelijkheden voor uw bedrijf bespreken? Bekijk onze reguliere AI-audit.'}</p><div className={styles.selectionNote}><span>Hoe we kiezen</span><p>We selecteren op terugkerend handwerk, bruikbare praktijkvoorbeelden en ruimte om samen te werken. U krijgt persoonlijk bericht. Aanmelden reserveert nog geen plek.</p></div><a className={styles.contactLink} href="mailto:info@factumai.nl?subject=Vraag%20over%20de%20kosteloze%20AI-audit">Liever eerst iets vragen? <ArrowUpRight size={16} aria-hidden /></a></div>
            {open ? <GratisAuditForm /> : <div className={styles.closed}><span className={styles.eyebrow}>Verder kijken</span><h3>Ook buiten deze ronde<br />denken we graag mee.</h3><p>Onze reguliere audit stemmen we af op de vragen, processen en omvang van uw bedrijf.</p><Link className={styles.primary} href="/diensten/ai-audit">Bekijk de AI-audit <ArrowUpRight size={17} aria-hidden /></Link></div>}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-heading">
          <div className={`${styles.container} ${styles.faqGrid}`}><div><p className={styles.eyebrow}>Nog even praktisch</p><h2 id="faq-heading">Goed om{' '}<br /><em>te weten.</em></h2></div><div className={styles.faqs}>{FAQS.map(({ q, a }) => <details key={q}><summary>{q}<Plus size={18} aria-hidden /></summary><p>{a}</p></details>)}<Link href="/diensten/ai-audit" className={styles.textLink}>Meer over onze AI-audit <ArrowUpRight size={15} aria-hidden /></Link></div></div>
        </section>
      </div>
    </SitePage>
  );
}

function ProcessSheets() {
  return (
    <figure className={styles.sheets} aria-label="Voorbeelden van processen: orders invoeren, offertes voorbereiden en klantvragen verwerken. De drie processen kiezen we samen met u.">
      <div className={styles.backSheet} aria-hidden />
      <div className={styles.mainSheet}>
        <div className={styles.sheetTop}><span>FactumAI / Procesverkenning</span><span>01 — 03</span></div>
        <p className={styles.sheetTitle}>Het werk op tafel.</p>
        <p className={styles.sheetSubtitle}>Waar zit voor uw team de ruimte?</p>
        <ol className={styles.processRows}>
          <li><span>01</span><div><strong>Orders invoeren</strong><small>Van mailbox naar systeem</small></div><ArrowRight size={18} aria-hidden /></li>
          <li><span>02</span><div><strong>Offertes voorbereiden</strong><small>Van zoekwerk naar voorstel</small></div><ArrowRight size={18} aria-hidden /></li>
          <li><span>03</span><div><strong>Klantvragen verwerken</strong><small>Van vraag naar antwoord</small></div><ArrowRight size={18} aria-hidden /></li>
        </ol>
        <div className={styles.sheetBottom}><span>Inzicht</span><i /><span>Mogelijkheden</span><i /><span>Eerste stap</span></div>
      </div>
      <div className={styles.invitation}><span>Voor drie bedrijven</span><p>Uw praktijk.<br /><em>Onze aandacht.</em></p><span className={styles.invitationMark} aria-hidden>f.</span></div>
      <figcaption>Voorbeeldprocessen · we kiezen uw drie processen samen.</figcaption>
    </figure>
  );
}
