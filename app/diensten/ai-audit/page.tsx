import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react';
import { SitePage } from '@/components/site/SitePage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { AuditReportExample } from '@/components/audit/AuditReportExample';
import styles from './audit.module.css';

const PAGE_PATH = '/diensten/ai-audit';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export const metadata: Metadata = {
  title: 'AI-audit: zie waar uw tijd blijft en waar AI loont',
  description:
    'Een AI-audit bij u op locatie. We onderzoeken processen, meten tijd en brengen systemen in kaart. U krijgt concrete AI-kansen, verwachte besparingen en een helder plan.',
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: 'Eerst inzicht. Dan gericht aan de slag. · FactumAI AI-audit',
    description:
      'Van een sessie met uw team naar een onderbouwd auditrapport. Ontdek welk werk AI lichter kan maken, wat dat oplevert en waar u begint.',
    url: `${SITE_URL}${PAGE_PATH}`,
    type: 'website',
  },
};

const STEPS = [
  {
    title: 'We komen bij u langs.',
    body: 'We luisteren naar uw mensen en kijken mee op de werkvloer. Waar gaat veel tijd in zitten? Wat blijft liggen? Samen bepalen we wat de audit moet beantwoorden en welke afdelingen of processen we onderzoeken.',
    result: 'Een afgesproken scope, onderzoeksvragen en planning.',
  },
  {
    title: 'Samen tekenen we het echte werk uit.',
    body: 'In een brownpapersessie zetten we met uw team alle stappen op een grote wand. Van de eerste aanvraag tot de laatste handeling. In groepsgesprekken bespreken we overdrachten, uitzonderingen en werk dat telkens opnieuw moet.',
    result: 'Procesflows: wie doet wat, in welke volgorde en met welk systeem?',
  },
  {
    title: 'We meten waar de tijd blijft.',
    body: 'We meten hoe lang handelingen duren en hoe vaak ze voorkomen. Wachttijd houden we apart. We brengen systemen en gegevensstromen in kaart: waar wordt informatie gezocht, overgetypt of dubbel gecontroleerd?',
    result: 'Een onderbouwd beeld van tijdsbesteding, systemen en knelpunten.',
  },
  {
    title: 'U krijgt het rapport. We kiezen de volgende stap.',
    body: 'We bespreken de bevindingen met u. Per proces ziet u de huidige tijdsbesteding, waar het vastloopt, welke inzet van AI past en wat de verwachte besparing is. We leggen uit wat ervoor nodig is en welke kans als eerste de moeite waard is.',
    result: 'Een auditrapport en een onderbouwde volgorde om mee aan de slag te gaan.',
  },
];

const DELIVERABLES = [
  ['Uw processen op papier', 'Procesflows met stappen, mensen, overdrachten en systemen. Inclusief de uitzonderingen die het werk ingewikkeld maken.'],
  ['Tijd en knelpunten in beeld', 'Hoeveel tijd het werk nu vraagt en waar dubbel werk, zoekwerk, fouten en vertraging ontstaan.'],
  ['AI-kansen die bij uw werk passen', 'Per kans: welke taak AI kan ondersteunen, welke gegevens en koppelingen nodig zijn en waar uw mensen blijven controleren.'],
  ['Een besparing die u kunt narekenen', 'Verwachte tijdwinst met aantallen, tijden en aannames erbij. We maken zichtbaar wat gemeten is en wat nog moet worden getoetst.'],
  ['Een duidelijke eerste stap', 'Een afweging van verwachte opbrengst, haalbaarheid en benodigde inspanning. Zo kiest u welk proces u als eerste aanpakt.'],
];

const FAQS = [
  {
    q: 'Moeten we al weten waar we AI willen inzetten?',
    a: 'Nee. Juist als er meerdere mogelijke verbeteringen zijn, helpt de audit om te kiezen. We kunnen breed naar uw organisatie kijken of beginnen bij één proces waar u nu al tegenaan loopt. In het eerste gesprek bepalen we welke vragen u beantwoord wilt hebben.',
  },
  {
    q: 'Wat kost een audit en hoe lang duurt die?',
    a: 'Dat hangt af van het aantal processen, de betrokken afdelingen en de informatie die beschikbaar is. Na het afbakenen van het onderzoek maken we een voorstel met de werkzaamheden, planning en prijs. U weet dus vooraf wat we onderzoeken en wat u ontvangt.',
  },
  {
    q: 'Hoeveel tijd vraagt dit van onze medewerkers?',
    a: 'We betrekken vooral de mensen die het werk dagelijks doen en de uitzonderingen kennen. Vooraf spreken we af wie nodig is, welke sessies we plannen en welke gegevens we verzamelen. Bestaande procesbeschrijvingen helpen, maar zijn geen voorwaarde: we brengen het werk samen in kaart.',
  },
  {
    q: 'Hoe zeker is de berekende besparing?',
    a: 'De besparing is een onderbouwde inschatting. In het rapport staan de gemeten tijden en aantallen, de aannames en het werk dat mensen blijven doen, zoals controle en uitzonderingen. Vrijgekomen uren betekenen niet automatisch lagere loonkosten. Bij een eventuele bouw toetsen we de verwachte tijdwinst aan de praktijk.',
  },
  {
    q: 'Wordt er tijdens de audit al iets gebouwd?',
    a: 'De audit levert het onderzoek, het rapport en een advies voor de vervolgstap op. De bouw is een aparte stap. Kiest u daarvoor, dan bakenen we één proces af: wat de oplossing moet doen, welke systemen worden gekoppeld en wanneer uw mensen goedkeuren.',
  },
  {
    q: 'Wat als AI niet de beste oplossing blijkt?',
    a: 'Dan staat dat in het advies. Soms helpt een heldere werkafspraak, een betere gegevensbron of een eenvoudige koppeling meer. Het doel is minder onnodig werk. We onderbouwen welke aanpak daarbij past.',
  },
];

export default function AIAuditPage() {
  return (
    <SitePage lucht={false}>
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'AI-audit voor MKB-bedrijven',
          serviceType: 'Procesonderzoek en AI-advies',
          description: metadata.description,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: { '@type': 'Country', name: 'Netherlands' },
          url: `${SITE_URL}${PAGE_PATH}`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map(({ q, a }) => ({
            '@type': 'Question', name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        },
      ]} />
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="audit-heading">
          <div className={styles.container}>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Diensten', href: '/diensten' },
              { label: 'AI-audit', href: PAGE_PATH },
            ]} />
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}><span className={styles.dot} /> AI-audit · Bij u op locatie</p>
                <h1 id="audit-heading">Zie waar uw{' '}<br />tijd blijft.<br /><em>En waar AI loont.</em></h1>
                <p className={styles.lead}>
                  We kijken samen met uw medewerkers hoe het werk werkelijk loopt.
                  U krijgt een helder rapport: waar tijd verloren gaat, wat AI kan
                  verbeteren en welke besparing u mag verwachten.
                </p>
                <div className={styles.actions}>
                  <Link href="/plan" className={styles.primary}>Bespreek uw AI-audit <ArrowUpRight size={18} aria-hidden /></Link>
                  <a href="#aanpak" className={styles.textLink}>Zo werkt de audit <ArrowDown size={16} aria-hidden /></a>
                </div>
                <p className={styles.heroNote}>Van uw hele organisatie tot één afgebakend proces.</p>
              </div>
              <ProcessBoard />
            </div>
            <div className={styles.outcomes}>
              <p><span>01 / Inzicht</span>Waar uw mensen tijd aan kwijt zijn.</p>
              <p><span>02 / Onderbouwing</span>Wat AI kan doen en opleveren.</p>
              <p><span>03 / Richting</span>Welk proces u als eerste aanpakt.</p>
            </div>
          </div>
        </section>

        <section className={styles.scope} aria-labelledby="scope-heading">
          <div className={styles.container}>
            <div className={styles.sectionIntro}>
              <div>
                <p className={styles.eyebrow}>Hoe breed kijken we?</p>
                <h2 id="scope-heading">Uw hele organisatie.<br /><em>Of precies die ene keten.</em></h2>
              </div>
              <p>Een aanvraag langs drie collega’s. Gegevens die opnieuw worden ingevoerd.
                Een offerte die op informatie wacht. We bepalen samen waar we beginnen
                en hoe ver we het werk volgen.</p>
            </div>
            <div className={styles.scopeGrid}>
              <article>
                <div className={styles.scopeMark} aria-hidden><span /><span /><span /><span /></div>
                <p className={styles.eyebrow}>Breed onderzoeken</p>
                <h3>Waar liggen onze grootste kansen?</h3>
                <p>We bekijken de processen binnen uw organisatie en de verbindingen tussen
                  afdelingen. Zo ontdekt u waar de meeste tijd verloren gaat en welke
                  verbeteringen voorrang verdienen.</p>
                <span className={styles.scopeFit}>Past als u nog niet weet waar u wilt beginnen.</span>
              </article>
              <article>
                <div className={`${styles.scopeMark} ${styles.chainMark}`} aria-hidden><span /><i /><span /><i /><span /></div>
                <p className={styles.eyebrow}>Gericht uitdiepen</p>
                <h3>Hoe maken we dit proces beter?</h3>
                <p>We volgen één proces of keten van begin tot eind. Bijvoorbeeld van
                  offerteaanvraag tot order, of van klantvraag tot antwoord. Ook als het
                  werk meerdere afdelingen en systemen raakt.</p>
                <span className={styles.scopeFit}>Past als u al weet waar het steeds vastloopt.</span>
              </article>
            </div>
            <p className={styles.scopeFoot}>Vooraf helder: welke processen, welke mensen, welke vragen en welk resultaat.</p>
          </div>
        </section>

        <section id="aanpak" className={`${styles.section} ${styles.method}`} aria-labelledby="method-heading">
          <div className={`${styles.container} ${styles.methodGrid}`}>
            <div className={styles.methodIntro}>
              <p className={styles.eyebrow}>Van werkvloer naar inzicht</p>
              <h2 id="method-heading">We beginnen{' '}<br />bij de mensen.<br /><em>En het werk.</em></h2>
              <p>Uw medewerkers weten waar het schuurt. We brengen hun ervaring samen
                met procesflows, tijdmetingen en een overzicht van uw systemen.</p>
              <a href="#auditrapport" className={styles.textLink}>Bekijk wat u ontvangt <ArrowDown size={16} aria-hidden /></a>
              <div className={styles.methodNote}>
                <span className={styles.noteMonogram} aria-hidden>f.</span>
                <p>Het werk op tafel.<br />De mensen erbij.</p>
              </div>
            </div>
            <ol className={styles.steps}>
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <div className={styles.stepResult}><ArrowRight size={15} aria-hidden /><span>{step.result}</span></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="auditrapport" className={`${styles.section} ${styles.reportSection}`} aria-labelledby="report-heading">
          <div className={styles.container}>
            <div className={styles.sectionIntro}>
              <div>
                <p className={styles.eyebrow}>Dit ligt er straks op tafel</p>
                <h2 id="report-heading">Een rapport waarmee<br /><em>u kunt beslissen.</em></h2>
              </div>
              <p>U moet kunnen volgen waarom een verbetering de moeite waard is.
                Daarom bevat het auditrapport zowel de bevindingen als de rekensom
                en de voorwaarden om ermee aan de slag te gaan.</p>
            </div>
            <div className={styles.reportGrid}>
              <AuditReportExample />
              <div className={styles.deliverables}>
                <p className={styles.eyebrow}>In uw auditrapport</p>
                <ol>
                  {DELIVERABLES.map(([title, body], index) => (
                    <li key={title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div><h3>{title}</h3><p>{body}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.nextStep}`} aria-labelledby="next-heading">
          <div className={styles.container}>
            <div className={styles.nextIntro}>
              <p className={styles.eyebrow}>Van inzicht naar een keuze</p>
              <h2 id="next-heading">Weten wat kan.<br /><em>Kiezen wat zin heeft.</em></h2>
              <p>Na de audit weet u welke kansen de moeite waard zijn en wat ervoor nodig is.
                Samen bepalen we de logische vervolgstap.</p>
            </div>
            <div className={styles.decisions}>
              <article><Check size={20} aria-hidden /><h3>Een proces klaar om te bouwen?</h3><p>Dan werken we één afgebakende oplossing uit, met duidelijke taken, koppelingen en menselijke controle. De bouw krijgt een eigen voorstel.</p><Link href="/diensten/ai-agent-laten-bouwen" className={styles.textLink}>Zo bouwen we <ArrowUpRight size={15} aria-hidden /></Link></article>
              <article><ArrowRight size={20} aria-hidden /><h3>Eerst iets anders verbeteren?</h3><p>Dan maakt het rapport duidelijk wat nodig is. Betere gegevens, een werkafspraak of een eenvoudige koppeling kan de juiste eerste stap zijn.</p><span className={styles.quietNote}>Ook dat is een bruikbare uitkomst.</span></article>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading">
          <div className={`${styles.container} ${styles.faqGrid}`}>
            <div><p className={styles.eyebrow}>Praktische vragen</p><h2 id="faq-heading">Voor we{' '}<br /><em>langskomen.</em></h2></div>
            <div className={styles.faqs}>
              {FAQS.map(({ q, a }) => (
                <details key={q}>
                  <summary>{q}<Plus size={18} aria-hidden /></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-audit-heading">
          <div className={styles.container}>
            <p className={styles.eyebrow}>De eerste stap is een gesprek</p>
            <h2 id="closing-audit-heading">Welk werk zou u<br /><em>graag lichter maken?</em></h2>
            <p>Vertel waar uw mensen tijd aan kwijt zijn. We denken mee over
              de vragen die de audit voor uw organisatie moet beantwoorden.</p>
            <Link href="/plan" className={styles.primary}>Bespreek uw AI-audit <ArrowUpRight size={18} aria-hidden /></Link>
            <a href="mailto:info@factumai.nl?subject=Kennismaking%20AI-audit" className={styles.email}>Liever mailen? info@factumai.nl <ArrowUpRight size={14} aria-hidden /></a>
          </div>
        </section>
      </div>
    </SitePage>
  );
}

function ProcessBoard() {
  return (
    <figure className={styles.boardScene} aria-label="Illustratief procesoverzicht: van aanvraag via informatie zoeken en order invoeren naar controle. De audit onderzoekt per stap handelingen, wachttijd en systemen.">
      <div className={styles.board}>
        <div className={styles.boardHeading}><span>Op tafel / het orderproces</span><span>01 — 04</span></div>
        <p className={styles.boardTitle}>Zo gaat het nu.</p>
        <div className={styles.flow} aria-hidden>
          <div className={styles.flowCard}><span>01 / Mailbox</span><strong>Aanvraag<br />komt binnen</strong><small>Lezen & beoordelen</small></div>
          <div className={`${styles.flowCard} ${styles.flowProblem}`}><span>02 / Gegevens</span><strong>Informatie<br />bij elkaar zoeken</strong><small>Mail · Excel · CRM</small></div>
          <div className={styles.flowCard}><span>03 / ERP</span><strong>Order<br />invoeren</strong><small>Opnieuw overtypen</small></div>
          <div className={styles.flowCard}><span>04 / Collega</span><strong>Controleren<br />& bevestigen</strong><small>Mens beslist</small></div>
        </div>
        <div className={styles.boardQuestion}>Waar zit het zoekwerk?<span>Hier kijken we mee.</span></div>
        <div className={styles.boardFooter}><span>Handelingen</span><span>Wachttijd</span><span>Systemen</span></div>
      </div>
      <div className={styles.boardSlip}><span>Van onderzoek naar advies</span><p>Wat kost het nu?<br /><em>Wat kan er beter?</em></p><ArrowUpRight size={22} aria-hidden /></div>
      <figcaption>Illustratie van een proces dat we samen in kaart brengen.</figcaption>
    </figure>
  );
}
