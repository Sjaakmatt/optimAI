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

const LAST_UPDATED = '25 september 2026';

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
          wij daarmee omgaan. Dit geldt ook voor onze campagnepagina’s onder /lp/, het
          aanvraagformulier, de AI-chat, de AI-scan en het plannen van een gesprek.
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
              'Bezochte pagina, verwijzende bron, type apparaat en technische prestatiegegevens, zoals laadtijden. Vercel Analytics en Speed Insights meten basisgebruik en prestaties zonder analyticscookies. Google Analytics 4 gebruikt analytische cookies en meet alleen na je toestemming. Hosting- en beveiligingsdiensten verwerken daarnaast technische verzoekgegevens, waaronder een IP-adres, om de website te leveren en misbruik te beperken.',
            ],
            [
              'Waarom',
              'Om te begrijpen welke content nuttig is, welke functies (zoals de AI-scan en de demo) gebruikt worden, en hoe we de website kunnen verbeteren.',
            ],
            [
              'Grondslag',
              'Voor het leveren en beveiligen van de website en de beperkte cookieloze basisstatistieken: ons gerechtvaardigd belang (art. 6 lid 1 sub f AVG). Voor Google Analytics: jouw toestemming (art. 6 lid 1 sub a AVG), die je altijd kunt intrekken via "Cookievoorkeuren" onderaan elke pagina.',
            ],
            [
              'Bewaartermijn',
              'Geaggregeerde statistieken: 12 maanden. Google Analytics-gegevens: maximaal 14 maanden.',
            ],
            [
              'Verwerkers',
              'Vercel Analytics en Speed Insights (cookieloos) en Google Analytics 4 (Google Ireland Limited, alleen met toestemming). Voor hosting en beveiliging gebruiken wij Vercel en Cloudflare.',
            ],
          ]}
        />
        <P>
          Je cookievoorkeur bewaren we in de lokale opslag van je browser totdat je die wijzigt
          of de browsergegevens wist. Je kunt analytische cookies weigeren of je toestemming
          intrekken via ‘Cookievoorkeuren’ onderaan de website. Noodzakelijke functies, zoals
          het aanvraagformulier, blijven bruikbaar. Voor de afzonderlijke campagnepagina’s
          gelden de toelichting en de beperkte herkomstmeting in sectie 2.5.
        </P>

        <H3>2.2 Contact- en aanmeldformulieren</H3>
        <P>
          Als je het contactformulier invult, gebruiken wij je gegevens om op je vraag te
          reageren. Bij een aanmelding voor de kosteloze AI-audit gebruiken we je gegevens
          om te beoordelen of je bedrijf bij de ronde past en contact met je op te nemen
          over selectie en deelname. Je schrijft je hiermee niet in voor een nieuwsbrief.
        </P>
        <DefList
          items={[
            [
              'Welke gegevens',
              'Naam, bedrijfsnaam, e-mailadres, telefoonnummer (indien ingevuld) en inhoud van je bericht. Bij de kosteloze AI-audit ook de vestigingsplaats, beschrijving van de werkzaamheden en de geaccepteerde versie van de deelnameafspraken.',
            ],
            ['Waarom', 'Om je vraag te beantwoorden, je aanmelding te beoordelen en contact op te nemen over je vraag of deelname.'],
            [
              'Grondslag',
              'Als je zelf een mogelijke overeenkomst met ons wilt aangaan: noodzakelijke stappen op jouw verzoek (art. 6 lid 1 sub b AVG). Bij overige vragen en contact namens een organisatie: ons gerechtvaardigd belang om zakelijke aanvragen te beantwoorden en op te volgen (art. 6 lid 1 sub f AVG).',
            ],
            [
              'Bewaartermijn',
              'Zolang nodig voor opvolging, maximaal 1 jaar na ontvangst. Daarna verwijderen we je bericht, tenzij het heeft geleid tot een klantrelatie; dan geldt sectie 2.3.',
            ],
            ['Ontvangers', 'Resend voor het doorsturen van het formulier en onze mailbox bij Microsoft 365 voor persoonlijke opvolging.'],
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

        <H3>2.5 Aanvragen via campagnepagina’s en FactumAI Ads</H3>
        <P>
          Op onze campagnepagina’s kun je aangeven waar je organisatie tijd wil besparen,
          welke wensen je hebt en welk projectbudget je overweegt. Je aanvraag komt in onze
          afgeschermde werkruimte FactumAI Ads. Wij bekijken de aanvraag en nemen persoonlijk
          contact op om een mogelijk gesprek af te stemmen. Het formulier boekt geen afspraak
          en schrijft je niet in voor een nieuwsbrief.
        </P>
        <DefList
          items={[
            ['Welke gegevens', 'Naam, e-mailadres en omschrijving van je wensen. Bedrijfsnaam, telefoonnummer en indicatief projectbudget zijn optioneel. We bewaren ook het ontvangsttijdstip, de bezochte campagnepagina en paginaversie, de bijbehorende campagne en de opvolgstatus, bijvoorbeeld benaderd, gesprek gepland of klant.'],
            ['Herkomst', 'Als de paginalink campagnelabels bevat, bewaren we bij je inzending de bron, het kanaal, de campagne en de advertentievariant (utm_source, utm_medium, utm_campaign en utm_content). Zo beoordelen we welke campagnelabels bij aanvragen en geregistreerde vervolgstappen horen.'],
            ['Waarom', 'Om je aanvraag te begrijpen, contact op te nemen, een passend gesprek voor te bereiden en de opvolging bij te houden. De herkomst en opvolgstatus gebruiken we ook om te beoordelen welke eigen campagnes relevante aanvragen opleveren.'],
            ['Grondslag', 'Voor noodzakelijke stappen naar een overeenkomst met jou: jouw verzoek (art. 6 lid 1 sub b AVG). Voor zakelijke contactpersonen, opvolging en beperkte interne campagnemeting: ons gerechtvaardigd belang om aanvragen te behandelen en onze acquisitie te evalueren (art. 6 lid 1 sub f AVG). Je kunt tegen verwerking op basis van gerechtvaardigd belang bezwaar maken.'],
            ['Bewaartermijn', 'De aanvraag, bijbehorende campagnelabels en opvolggegevens bewaren we zolang nodig voor opvolging, maximaal 1 jaar na ontvangst. Bij een klantrelatie geldt sectie 2.3.'],
            ['Opslag en ontvangers', 'Vercel levert de website en stuurt het formulier door naar ons platform bij Cloudflare. Aanvragen staan in een Cloudflare D1-database met EU-jurisdictie. Dit betekent niet dat alle netwerk-, beveiligings- of ondersteuningsverwerking uitsluitend in de EU plaatsvindt; zie sectie 4.'],
            ['Verplichte gegevens', 'Naam, e-mailadres en wensen zijn nodig om dit formulier te versturen en de aanvraag te kunnen behandelen. De overige velden zijn vrijwillig. Je kunt ons ook rechtstreeks mailen of bellen.'],
          ]}
        />
        <P>
          Om spam en dubbele inzendingen tegen te gaan verwerken we een formuliertoken en
          tijdelijk een van het IP-adres afgeleide beveiligingscode. Het leesbare IP-adres
          wordt niet aan de aanvraag in FactumAI Ads toegevoegd. Verouderde beveiligingstellers
          worden dagelijks opgeruimd; een ongebruikte teller blijft daardoor ongeveer 24 tot
          48 uur staan. Hostingdiensten kunnen daarnaast technische verzoekgegevens verwerken.
        </P>
        <P>
          De campagnepagina’s plaatsen geen analytische of advertentiecookies en laden geen
          Meta Pixel of Google-tag. Campagnelabels worden pas bij een formulierinzending aan
          de aanvraag gekoppeld. FactumAI Ads stuurt momenteel geen aanvraaggegevens of
          conversies door naar Meta of Google en synchroniseert ze niet automatisch met ons CRM.
        </P>
        <P>
          Voor het schrijven van advertentie- en paginateksten gebruiken wij Anthropic. Daarbij
          krijgt het model de geselecteerde teksten, onze campagnebrief en schrijfinstructies.
          De aanvraaggegevens worden hiervoor niet automatisch opgehaald of meegestuurd.
          We beoordelen aanvragen in FactumAI Ads zelf; het platform laat AI niet automatisch
          beslissen of je een gesprek krijgt.
        </P>

        <H3>2.6 AI-chat en terugbelverzoeken</H3>
        <P>
          Gebruik je de AI-chat op onze website, dan verwerken wij je vraag met een AI-systeem.
          De chat is vrijwillig: je kunt ons ook rechtstreeks mailen of bellen. Deel geen
          wachtwoorden, identiteitsbewijzen, medische gegevens of vertrouwelijke gegevens
          van andere personen in de chat of vrije tekstvelden.
        </P>
        <DefList
          items={[
            ['Welke gegevens', 'Je berichten en de antwoorden, een sessiecode, de pagina waarop het gesprek begint, een verwijzende bron, een hash van browsergegevens en technische gebruiksgegevens. Contact- en bedrijfsgegevens die je zelf noemt kunnen worden opgenomen in onze relatieadministratie.'],
            ['Waarom', 'Om je vraag te beantwoorden, de context van het gesprek te onthouden en je interesse persoonlijk op te volgen. De AI maakt ook een samenvatting en een inschatting van de passende vervolgstap op basis van wat je vertelt, zoals processen, wensen en organisatie.'],
            ['AI-ondersteunde kwalificatie', 'Een automatische inschatting helpt ons gesprekken te ordenen. Ook zonder apart terugbelverzoek kunnen genoemde contactgegevens en de samenvatting in onze eigen CRM-omgeving worden opgeslagen. Deze inschatting bepaalt niet zelfstandig of je een overeenkomst of dienstverlening krijgt. Je kunt vragen om menselijke beoordeling en bezwaar maken tegen deze kwalificatie.'],
            ['Grondslag', 'Ons gerechtvaardigd belang om vrijwillig gestelde zakelijke vragen te beantwoorden, relevante interesse te herkennen en gesprekken op te volgen (art. 6 lid 1 sub f AVG). Voor een afzonderlijk terugbelverzoek vragen wij je toestemming voor contact over dat gesprek (art. 6 lid 1 sub a AVG). Je kunt die intrekken via info@factumai.nl.'],
            ['Terugbelverzoek', 'Bij een terugbelverzoek bewaren we je ingevulde naam, e-mailadres, telefoonnummer en aanleiding, plus de tekst, versie en het tijdstip van je toestemming. Resend verstuurt een interne melding zodat wij je verzoek kunnen opvolgen.'],
            ['Bewaartermijn', 'De chatgesprekken en berichten hebben een bewaartermijn van 90 dagen na aanmaak. Technische agentgebeurtenissen hebben standaard een bewaartermijn van 180 dagen. Een afzonderlijk vastgelegde aanvraag, samenvatting of terugbelverzoek in onze relatieadministratie valt onder de termijn van maximaal 1 jaar uit sectie 2.2, of bij een klantrelatie onder sectie 2.3.'],
            ['Ontvangers', 'Anthropic verwerkt de gesprekstekst voor antwoorden, samenvattingen en kwalificatie. Supabase verzorgt de opslag van gesprekken en onze relatieadministratie. Vercel verzorgt de website; Resend en Microsoft 365 de e-mailopvolging.'],
          ]}
        />
        <P>
          De chat bewaart een sessiecode en widgetvoorkeuren in de sessieopslag van je browser.
          Die opslag is bedoeld om hetzelfde gesprek tijdens je bezoek te kunnen voortzetten
          en verdwijnt normaal als je het tabblad sluit. Dit staat los van de bewaartermijn
          van het gesprek op onze server.
        </P>

        <H3>2.7 Een afspraak plannen</H3>
        <P>
          Als je via de kalender een gesprek boekt, verwerken we je naam, e-mailadres,
          gekozen tijdstip, tijdzone en eventuele extra gegevens die je zelf invult. Wij
          gebruiken Cal.com voor de boekingskalender en onze gekoppelde Microsoft-agenda
          voor de afspraak en eventuele Teams-uitnodiging. De kalenderdienst verwerkt ook
          technische verbindingsgegevens om de kalender te tonen. De gekozen afspraak en
          correspondentie gebruiken we voor de voorbereiding en uitvoering van jouw gesprek.
        </P>
        <P>
          De grondslag is het nemen van noodzakelijke stappen op jouw verzoek naar een
          overeenkomst met jou, of ons gerechtvaardigd belang bij het afhandelen van een
          zakelijke afspraak namens een organisatie. Voor de afspraakgegevens geldt de
          bewaartermijn van maximaal 1 jaar voor aanvragen, tenzij een klantrelatie ontstaat.
          Een afspraak boeken is geen toestemming voor een nieuwsbrief of advertentietracking.
        </P>

        <H2 number="3">Met wie wij gegevens delen</H2>
        <P>
          Wij delen gegevens met dienstverleners voor de hieronder beschreven werkzaamheden.
          Dienstverleners die namens ons persoonsgegevens verwerken mogen dat alleen voor hun
          opdracht en volgens onze instructies doen. Verwerkersafspraken regelen onder meer
          het gebruik, de beveiliging en de vertrouwelijkheid van die gegevens.
        </P>
        <P>Onze huidige verwerkers:</P>
        <Bullets
          items={[
            'SnelStart, boekhouding (Nederland)',
            'Microsoft 365, e-mail, documenten, agenda en Teams-afspraken (EU/VS onder EU-US Data Privacy Framework)',
            'Apple iCloud, back-up en synchronisatie (EU/VS onder EU-US Data Privacy Framework)',
            'Vercel, hosting, doorsturen van campagneformulieren, cookieloze website-statistieken en prestatiemeting (VS onder EU-US Data Privacy Framework)',
            'Cloudflare, hosting en beveiliging van FactumAI Ads, opslag van aanvragen en campagnebestanden. De D1-database en R2-opslag voor dit platform hebben EU-jurisdictie; netwerk- en ondersteuningsverwerking kunnen ook buiten de EER plaatsvinden.',
            'Google, website-statistieken via Google Analytics 4, uitsluitend met toestemming (Google Ireland Limited; doorgifte naar de VS onder EU-US Data Privacy Framework)',
            'Supabase, databasehosting voor scan-gegevens, AI-chatgesprekken en onze eigen relatieadministratie (data-opslag in de EU, Ierland)',
            'Resend, verzending van e-mails zoals het scan-rapport en bevestigingen (VS, met Standard Contractual Clauses)',
            'Anthropic, AI-scan, antwoorden en kwalificatie van chatgesprekken, en het schrijven van onze eigen advertentie- en paginateksten (VS, met Standard Contractual Clauses)',
            'Cal.com, boekingskalender en afspraakgegevens, met verwerking via internationale infrastructuur en de waarborgen uit de verwerkersvoorwaarden.',
          ]}
        />
        <P>
          Voor de diensten die wij voor onze klanten uitvoeren kan een aparte set sub-verwerkers
          van toepassing zijn. Zie daarvoor onze{' '}
          <Link
            href="/subverwerkers"
            className="text-[var(--oker-deep)] underline decoration-[var(--oker)] underline-offset-4 hover:text-[var(--ink)]"
          >
            sub-verwerkerspagina voor klantopdrachten
          </Link>
          .
        </P>
        <P>
          Wij verkopen geen persoonsgegevens. Een aanvraag of chat is geen inschrijving voor
          een nieuwsbrief. Voor marketingmails waarvoor toestemming nodig is vragen wij die
          afzonderlijk. Beperkte interne meting van campagneherkomst staat in sectie 2.5.
        </P>

        <H2 number="4">Doorgifte naar landen buiten de EER</H2>
        <P>
          Enkele van onze verwerkers zijn gevestigd in de Verenigde Staten. Voor die doorgifte
          steunen wij op het EU-US Data Privacy Framework (adequaatheidsbesluit Europese Commissie
          van 10 juli 2023) voor gecertificeerde ontvangers binnen de toepasselijke dekking,
          en op Standard Contractual Clauses (Europese modelcontractbepalingen) waar nodig.
          Een Europese opslaglocatie sluit verwerking vanuit een ander land door bijvoorbeeld
          netwerkdiensten of ondersteuning niet uit.
        </P>
        <P>
          Cloudflare beschrijft de afspraken over internationale doorgifte in zijn{' '}
          <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" target="_blank" rel="noopener noreferrer" className="text-[var(--oker-deep)] underline underline-offset-4">Data Processing Addendum</a>.
          Cal.com beschrijft zijn verwerkingen en doorgiftewaarborgen in zijn{' '}
          <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--oker-deep)] underline underline-offset-4">privacy-informatie</a>.
          Je kunt via info@factumai.nl informatie of een kopie van de voor jouw gegevens
          toepasselijke waarborgen opvragen.
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
            'Versleutelde verbindingen voor onze website, formulieren en beheeromgeving',
            'Afgeschermde beheeromgevingen en beveiligde sessies',
            'Principe van least privilege: alleen wie moet, heeft toegang',
            'Technische logging en monitoring',
            'Regelmatige evaluatie van onze beveiligingsmaatregelen',
          ]}
        />

        <H2 number="6">Jouw rechten</H2>
        <P>
          Je hebt onder de AVG de volgende rechten, voor zover ze op de verwerking van
          toepassing zijn. Wij reageren uiterlijk binnen één maand op je verzoek. Als de wet
          bij een complex verzoek verlenging toestaat, informeren we je daar binnen die
          eerste maand over, met de reden.
        </P>
        <Bullets
          items={[
            'Recht op inzage: weten welke gegevens wij van je verwerken.',
            'Recht op rectificatie: onjuiste gegevens laten corrigeren.',
            'Recht op wissing: gegevens laten verwijderen indien dat wettelijk kan.',
            'Recht op beperking: gebruik van je gegevens tijdelijk stoppen.',
            'Recht op bezwaar: bezwaar maken tegen gebruik op basis van gerechtvaardigd belang.',
            'Recht op dataportabiliteit: gegevens die je verstrekte in een bruikbaar formaat ontvangen, waar de wettelijke voorwaarden gelden.',
            'Recht op intrekken van toestemming: daar waar wij op toestemming steunen. Dit verandert niet de rechtmatigheid van de verwerking vóór je intrekking.',
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
          . Bij twijfel over je identiteit kunnen wij aanvullende informatie vragen die nodig
          is om te voorkomen dat wij gegevens aan de verkeerde persoon verstrekken. Stuur niet
          uit jezelf een kopie van je identiteitsbewijs mee.
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
          Versie 1.3, {LAST_UPDATED}
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
