export interface OplossingFAQ {
  q: string;
  a: string;
}

/** Groepering op de hub-pagina. Elke oplossing hoort bij precies één categorie. */
export type OplossingCategorie =
  | 'klant-verkoop'
  | 'inkoop-voorraad'
  | 'administratie-financieel'
  | 'werkvoorbereiding-kennis';

export interface OplossingCategorieMeta {
  key: OplossingCategorie;
  label: string;
  /** Korte regel boven de kaarten van deze categorie. */
  intro: string;
}

export const OPLOSSING_CATEGORIEEN: OplossingCategorieMeta[] = [
  {
    key: 'klant-verkoop',
    label: 'Klant en verkoop',
    intro:
      'Alles wat binnenkomt via de mailbox en weer weg moet: vragen, aanvragen, orders en opvolging.',
  },
  {
    key: 'inkoop-voorraad',
    label: 'Inkoop en voorraad',
    intro:
      'Wat er besteld moet worden, bij wie, voor welke prijs, en of het op tijd binnenkomt.',
  },
  {
    key: 'administratie-financieel',
    label: 'Administratie en financieel',
    intro:
      'Het werk tussen de systemen: facturen, herinneringen, uren en afspraken die aflopen.',
  },
  {
    key: 'werkvoorbereiding-kennis',
    label: 'Werkvoorbereiding en kennis',
    intro:
      'Wat er buiten gebeurt terug in het systeem, en wat er in het systeem staat terug bij uw mensen.',
  },
];

export interface Oplossing {
  slug: string;
  /** Korte naam voor navigatie, kaarten en linkbalken. */
  navLabel: string;
  categorie: OplossingCategorie;
  /** Wordt uitgelicht op de homepage en in korte linkbalken. */
  featured?: boolean;
  /** Waarde voor serviceType in het Service-schema. */
  serviceType: string;
  pageTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  /** Eerste helft van de H1, rechtop gezet. */
  heroTitle: string;
  /** Tweede helft van de H1, cursief in oker. */
  heroItalic: string;
  intro: string;
  /** Korte omschrijving op de hub en in de linkbalk op de homepage. */
  cardBody: string;
  systeemDoetAl: string;
  waarHetOphoudt: string;
  watDeAgentDoet: string[];
  watUNodigHeeft: string;
  watWijNietDoen: string;
  faq: OplossingFAQ[];
}

export const OPLOSSINGEN: Oplossing[] = [
  {
    slug: 'klantenservice-automatiseren',
    navLabel: 'Klantenservice automatiseren',
    categorie: 'klant-verkoop',
    featured: true,
    serviceType: 'Klantenservice automatiseren met een AI-agent',
    pageTitle: 'Klantenservice automatiseren met een AI-agent',
    metaDescription:
      'Klantenservice automatiseren inclusief het opzoekwerk en de vervolgactie. De agent leest de mail, zoekt order en historie op, toetst uw beleid en zet het antwoord klaar. Uw medewerker verstuurt.',
    heroEyebrow: 'Oplossing · Klantenservice',
    heroTitle: 'Klantenservice automatiseren,',
    heroItalic: 'inclusief wat er ná het antwoord komt.',
    intro:
      'De meeste oplossingen voor klantenservice schrijven een antwoord. Het werk zit daar meestal niet. Het zit in wat je moet opzoeken voordat je kunt antwoorden, en in wat je daarna nog in vier schermen moet regelen.',
    cardBody:
      'Het opzoekwerk voor een antwoord, en de vervolgactie erna. De agent zet het klaar, uw medewerker verstuurt.',
    systeemDoetAl:
      'Uw mailbox sorteert, uw webshop toont de order, uw boekhouding kent de factuur. Alle informatie ligt er. Een medewerker haalt het alleen bij elkaar.',
    waarHetOphoudt:
      'Een klant mailt over een levering die niet klopt. Om te kunnen antwoorden moet iemand de order zoeken, de verzendstatus checken, kijken of het binnen de garantie valt, het retourbeleid nalezen en beoordelen of dit een uitzondering is. Dat is geen typewerk. Dat is een besluit.',
    watDeAgentDoet: [
      'Leest de binnenkomende mail en bepaalt waar hij over gaat.',
      'Zoekt de klant en de bijbehorende orderhistorie op in uw webshop en boekhouding.',
      'Toetst het geval aan uw eigen beleid: levertermijn, garantie, retouren, uitzonderingen die u zelf heeft vastgelegd.',
      'Schrijft het antwoord in de toon die u aangeeft, met alleen feiten die uit uw systemen komen.',
      'Zet de vervolgactie klaar: creditnota, retourmelding, nieuwe verzending of een interne escalatie.',
      'Alles komt in de werkbak. Uw medewerker leest, past aan waar nodig en verstuurt.',
    ],
    watUNodigHeeft:
      'Een gedeelde mailbox in Microsoft 365 of Google Workspace, een webshop of ERP waar de orders in staan, en iemand bij u die kan uitleggen hoe de uitzonderingen nu worden afgehandeld. Dat laatste is het belangrijkste. Zonder uw beleid kan de agent niets toetsen.',
    watWijNietDoen:
      'Wij zetten geen chatbot op uw site die zelf klanten te woord staat. En wij laten niets automatisch versturen, behalve een kleine, vooraf vastgelegde groep eenvoudige antwoorden waar u zelf expliciet akkoord op geeft. De rest gaat altijd langs een mens.',
    faq: [
      {
        q: 'Vervangt dit onze klantenservicemedewerkers?',
        a: 'Nee. Het haalt het opzoekwerk weg. Uw mensen houden de uitzonderingen en het contact dat er echt toe doet.',
      },
      {
        q: 'Werkt dit met onze bestaande mailbox?',
        a: 'Ja, de agent draait op uw bestaande gedeelde mailbox. U hoeft niet over naar een ticketsysteem.',
      },
      {
        q: 'Wat als de agent iets niet weet?',
        a: 'Dan schrijft hij geen antwoord. Elke bewering moet herleidbaar zijn naar een aanroep in uw eigen systemen. Kan dat niet, dan gaat het geval naar een mens.',
      },
    ],
  },
  {
    slug: 'leadopvolging-automatiseren',
    navLabel: 'Leadopvolging automatiseren',
    categorie: 'klant-verkoop',
    featured: true,
    serviceType: 'Leadopvolging automatiseren met een AI-agent',
    pageTitle: 'Leadopvolging automatiseren met uw eigen verkoopdata',
    metaDescription:
      'Leadopvolging op basis van uw eigen orderhistorie. De agent leidt het bestelritme per klant af, signaleert afwijkingen en levert per account één voorstel met aanleiding en onderbouwing.',
    heroEyebrow: 'Oplossing · Leadopvolging',
    heroTitle: 'Uw CRM weet wie er geweest is.',
    heroItalic: 'Niet wie u vandaag moet bellen.',
    intro:
      'Elk CRM kan een taak aanmaken met een datum erop. Dat is geen opvolging, dat is een wekker. De vraag is niet wanneer u belt, maar met welke aanleiding.',
    cardBody:
      'Het signaal dat er iets níét is gebeurd. De agent rekent uw orderhistorie door en levert per account een aanleiding.',
    systeemDoetAl:
      'Orders, offertes en contactmomenten staan netjes geregistreerd. U kunt er lijsten uit trekken en filters op zetten.',
    waarHetOphoudt:
      'Niemand rekent met die gegevens. Dat een klant normaal om de zes weken bestelt en nu elf weken stil is, staat nergens. Dat een offerte openstaat terwijl die klant intussen wél iets anders heeft afgenomen, ziet niemand. De signalen zitten in de data, alleen niet in een veld.',
    watDeAgentDoet: [
      'Leidt per klant het normale bestelritme af uit de orderhistorie en meldt de afwijkingen.',
      'Loopt de openstaande offertes na en koppelt ze aan wat er sindsdien is gebeurd bij die klant.',
      'Zoekt per account op wat er extern relevant is veranderd, alleen uit bronnen die u aanwijst.',
      'Levert per account één voorstel: wie, waarom nu, welke aanleiding, welke onderbouwing.',
      'Zet de opvolgmail als concept klaar. U beslist of hij weggaat.',
    ],
    watUNodigHeeft:
      'Een CRM of ERP met bruikbare orderhistorie, minimaal een periode die lang genoeg is om een ritme in te herkennen. Bij klanten die pas net zijn overgestapt naar een nieuw pakket kijken wij eerst of de historie is meegekomen.',
    watWijNietDoen:
      'Wij versturen geen automatische campagnes en wij scrapen geen persoonsgegevens bij elkaar. Elke mail die uitgaat is door iemand van u gelezen en verstuurd.',
    faq: [
      {
        q: 'Wat is het verschil met een CRM-workflow?',
        a: 'Een workflow reageert op een gebeurtenis die u vooraf definieert. Deze agent rekent uit dat er iets níét is gebeurd, en dat is precies het signaal dat er in een workflow niet in te vangen is.',
      },
      {
        q: 'Verzint hij aanleidingen?',
        a: 'Nee. Elke aanleiding verwijst naar een concreet gegeven uit uw eigen systemen of een bron die u heeft aangewezen. Kan hij dat niet, dan laat hij het account leeg.',
      },
      {
        q: 'Wat als onze data rommelig is?',
        a: 'Dat komt vaker voor dan niet. In de eerste fase kijken wij naar de kwaliteit van de historie voordat er iets gebouwd wordt.',
      },
    ],
  },
  {
    slug: 'offertes-automatiseren',
    navLabel: 'Offertes automatiseren',
    categorie: 'klant-verkoop',
    serviceType: 'Offertes opstellen automatiseren met een AI-agent',
    pageTitle: 'Offertes automatiseren met uw eigen prijzen en afspraken',
    metaDescription:
      'Offertes automatiseren op basis van uw prijslijst, klantafspraken en margeregels. De agent leest de aanvraag, zoekt de artikelen erbij en zet de offerte als concept klaar. Uw verkoper tekent af.',
    heroEyebrow: 'Oplossing · Offertes',
    heroTitle: 'De aanvraag is binnen.',
    heroItalic: 'De offerte staat morgen pas klaar.',
    intro:
      'Bij offertes verliest u zelden op de prijs. U verliest op de doorlooptijd. Wie dezelfde dag reageert, wint werk dat drie dagen later niet meer te winnen is.',
    cardBody:
      'Van losse aanvraag naar concept-offerte met uw eigen prijzen, staffels en klantafspraken erin verwerkt.',
    systeemDoetAl:
      'Uw prijslijst staat in het ERP, klantkortingen staan op de relatiekaart en uw offertesjabloon ligt klaar. Het pakket kan een offerte netjes uitdraaien.',
    waarHetOphoudt:
      'Een aanvraag komt binnen als een mail met vijf regels tekst, soms een bijlage, soms een lijstje uit iemands hoofd. Iemand moet daar artikelnummers bij zoeken, controleren welke prijsafspraak voor déze klant geldt, kijken of het uit voorraad kan en beoordelen of de marge nog klopt. Uw pakket begint pas te helpen als dat werk al gedaan is.',
    watDeAgentDoet: [
      'Leest de aanvraag, ook als die uit vrije tekst of een bijlage bestaat, en haalt de gevraagde artikelen en aantallen eruit.',
      'Zoekt de artikelen op in uw assortiment en meldt het expliciet wanneer een regel niet eenduidig te matchen is.',
      'Past de prijsafspraken toe die voor deze klant gelden: staffel, contractprijs, korting, verpakkingseenheid.',
      'Toetst de uitkomst aan uw margeregels en markeert elke regel die daaronder duikt.',
      'Zet de offerte als concept klaar in uw eigen pakket, in uw eigen sjabloon.',
      'Uw verkoper controleert, past aan waar het commercieel moet, en verstuurt.',
    ],
    watUNodigHeeft:
      'Een prijslijst die actueel is en klantafspraken die ergens vastliggen in plaats van in hoofden van vertegenwoordigers. Als die afspraken nergens staan, is dat de eerste stap. Verder een pakket waarin offertes aangemaakt kunnen worden via een koppeling.',
    watWijNietDoen:
      'Wij laten geen offerte automatisch de deur uit gaan. Een prijs richting een klant is een verplichting, en die zet u zelf. De agent stopt bij het concept.',
    faq: [
      {
        q: 'Wat als de aanvraag onduidelijk is?',
        a: 'Dan raadt de agent niet. Hij zet de regels die wel duidelijk zijn klaar en zet er expliciet bij welke vraag er nog aan de klant gesteld moet worden.',
      },
      {
        q: 'Kan hij ook maatwerk offreren?',
        a: 'Alleen als de rekenregels vastliggen. Bij echt maatwerk, waar iemand ervaring in legt, doet de agent het voorwerk en laat hij de prijsstelling aan uw verkoper.',
      },
      {
        q: 'Hoeveel sneller wordt het?',
        a: 'Dat hangt af van hoe schoon uw artikelstamgegevens zijn. In de eerste fase meten wij hoe lang een offerte nu kost, zodat u achteraf iets te vergelijken heeft.',
      },
    ],
  },
  {
    slug: 'orderverwerking-automatiseren',
    navLabel: 'Orderverwerking automatiseren',
    categorie: 'klant-verkoop',
    serviceType: 'Orderverwerking automatiseren met een AI-agent',
    pageTitle: 'Orderverwerking automatiseren, van mail naar order in het ERP',
    metaDescription:
      'Orders die per mail, PDF of bestellijst binnenkomen automatisch verwerken. De agent herkent de regels, controleert voorraad en krediet en zet de order klaar in uw ERP.',
    heroEyebrow: 'Oplossing · Orderverwerking',
    heroTitle: 'Orders komen binnen als mail.',
    heroItalic: 'Uw ERP wil ze als regels.',
    intro:
      'Tussen de bestelling van uw klant en de order in uw systeem zit een mens die overtypt. Dat is het traagste en foutgevoeligste stuk van de hele keten, en het is precies het stuk dat niemand ooit heeft ingericht.',
    cardBody:
      'Van bestelmail of PDF naar een gecontroleerde orderregel in uw ERP, inclusief voorraad- en kredietcheck.',
    systeemDoetAl:
      'Uw ERP kan orders aanmaken, voorraad reserveren, een orderbevestiging sturen en de kredietlimiet bewaken. Zodra de order erin staat, gaat het goed.',
    waarHetOphoudt:
      'De order staat er alleen niet in. Hij staat in een mail, in een PDF met het briefpapier van de klant, in een Excel-bestand of in een bestelportaal waar iemand hem uit moet halen. Elke klant doet het net anders. Het overtypen kost een paar minuten per order en levert de fouten op die u pas ziet bij de levering.',
    watDeAgentDoet: [
      'Haalt de orderregels uit de bestelling, of die nu als mailtekst, PDF of bijlage binnenkomt.',
      'Koppelt de artikelomschrijving van de klant aan uw eigen artikelnummers, ook als de klant een eigen codering gebruikt.',
      'Controleert voorraad, levertijd en kredietlimiet voordat de order wordt aangemaakt.',
      'Legt de order als concept aan in uw ERP, met de bronmail eraan gekoppeld zodat alles herleidbaar blijft.',
      'Markeert elke regel waar twijfel over is en laat de rest ongemoeid.',
      'Uw binnendienst controleert de gemarkeerde regels en bevestigt de order.',
    ],
    watUNodigHeeft:
      'Een ERP met een koppeling waarin orders aangemaakt kunnen worden, en een artikelbestand dat op orde is. Klantspecifieke artikelcoderingen zijn geen probleem, mits ze ergens vastgelegd kunnen worden. Dat bouwen wij tijdens de eerste fase op.',
    watWijNietDoen:
      'Wij laten een order niet automatisch doorlopen naar productie of verzending zonder dat iemand hem heeft bevestigd. En bij een klant die voor het eerst bestelt, of bij een regel die de agent niet zeker kan matchen, stopt het altijd bij een mens.',
    faq: [
      {
        q: 'Elke klant bestelt anders. Kan dat?',
        a: 'Ja, dat is juist de reden dat een agent hier beter werkt dan een vaste import. Er hoeft geen vast formaat afgesproken te worden met uw klanten.',
      },
      {
        q: 'Wat gebeurt er bij een artikel dat niet gevonden wordt?',
        a: 'Dan wordt die regel gemarkeerd en blijft hij leeg. De agent kiest nooit zelf een artikel dat er ongeveer op lijkt.',
      },
      {
        q: 'Blijft de originele bestelling bewaard?',
        a: 'Ja. Bij elke order zit de bronmail of het brondocument, zodat u bij een discussie altijd terug kunt naar wat de klant echt gestuurd heeft.',
      },
    ],
  },
  {
    slug: 'vraagvoorspelling',
    navLabel: 'Vraagvoorspelling',
    categorie: 'inkoop-voorraad',
    featured: true,
    serviceType: 'Vraagvoorspelling met een AI-agent',
    pageTitle: 'Vraagvoorspelling op uw eigen verkoopdata',
    metaDescription:
      'Vraagvoorspelling die eindigt in een besteladvies per artikel, met de berekening eronder. Op basis van uw eigen verkoophistorie, voorraadstanden en levertijden per leverancier.',
    heroEyebrow: 'Oplossing · Vraagvoorspelling',
    heroTitle: 'Vraagvoorspelling die eindigt in een besteladvies,',
    heroItalic: 'niet in een grafiek.',
    intro:
      'Rapportage laat zien wat u vorig jaar verkocht. Wat u volgende maand moet inkopen, moet u er nog steeds zelf uit halen. Dat rekenwerk is precies wat een agent wél kan.',
    cardBody:
      'Het rekenwerk tussen verkooppatroon, voorraad en levertijd. Per artikel een advies met de berekening eronder.',
    systeemDoetAl:
      'De verkoophistorie staat compleet in uw pakket. Voorraadstanden zijn actueel. Vaak is er ook een rapportagemodule of een dashboard.',
    waarHetOphoudt:
      'Een dashboard toont. Het rekent niet. Het combineert het seizoenspatroon van een artikel niet met de levertijd van die specifieke leverancier, uw huidige voorraad en de inkooporders die al onderweg zijn. Dat doet nu iemand met een Excel en ervaring, meestal op donderdagmiddag.',
    watDeAgentDoet: [
      'Leidt per artikel het verkooppatroon af uit uw eigen historie, inclusief seizoen en pieken.',
      'Zet daar de actuele voorraad, de openstaande inkooporders en de levertijd per leverancier naast.',
      'Rekent uit wanneer een artikel onder de veilige grens komt, gegeven die levertijd.',
      'Levert per artikel een besteladvies met het aantal, het moment en de berekening eronder.',
      'Markeert waar de voorspelling onbetrouwbaar is, bijvoorbeeld bij nieuwe artikelen of te weinig historie. Dan geeft hij geen advies.',
    ],
    watUNodigHeeft:
      'Verkoophistorie per artikel over voldoende periodes om een patroon te herkennen, actuele voorraadstanden en levertijden per leverancier. Dat laatste ontbreekt vaker dan u denkt. Als levertijden nergens vastliggen, is dat de eerste stap.',
    watWijNietDoen:
      'Wij vervangen uw inkoper niet en wij plaatsen geen bestellingen op basis van een model alleen. Het advies is input voor een besluit dat u neemt.',
    faq: [
      {
        q: 'Hoeveel historie is er nodig?',
        a: 'Dat hangt af van hoe seizoensgevoelig uw assortiment is. In de eerste fase kijken wij naar uw data en zeggen wij eerlijk of het genoeg is.',
      },
      {
        q: 'Wat als het advies ernaast zit?',
        a: 'Elke voorspelling is terug te kijken met de onderbouwing erbij, zodat u ziet waarop hij gebaseerd was. Dat is ook hoe het model bijgestuurd wordt.',
      },
      {
        q: 'Is dit een dashboard?',
        a: 'Nee. U krijgt een lijst met besluiten en de berekening eronder, niet een scherm waar u zelf conclusies uit moet trekken.',
      },
    ],
  },
  {
    slug: 'inkoop-automatiseren',
    navLabel: 'Inkoop automatiseren',
    categorie: 'inkoop-voorraad',
    featured: true,
    serviceType: 'Inkoop en bevoorrading automatiseren met een AI-agent',
    pageTitle: 'Inkoop en bevoorrading automatiseren',
    metaDescription:
      'Van besteladvies naar een inkooporder die als concept klaarstaat in uw ERP. De agent rekent staffels, minimale afname en levertijd mee. Uw inkoper geeft akkoord, pas dan gaat er iets weg.',
    heroEyebrow: 'Oplossing · Inkoop',
    heroTitle: 'Van besteladvies naar een inkooporder',
    heroItalic: 'die klaarstaat.',
    intro:
      'Een minimumvoorraad-alert vertelt u dat er iets moet gebeuren. Daarna begint het werk nog: welke leverancier, welk aantal, welke staffel, welke minimale afname, en past het binnen de levertijd.',
    cardBody:
      'Het besluit na het voorraadsignaal. De agent bundelt per leverancier en zet de order als concept klaar in uw ERP.',
    systeemDoetAl:
      'Uw ERP kent de artikelen, de leveranciers en de voorraadstanden. Vaak staat er ook een bestelpuntsignalering in.',
    waarHetOphoudt:
      'Het signaal is niet het besluit. Iemand moet nog bepalen bij welke leverancier het gunstiger is, of het loont om op te hogen naar de volgende staffel, of het gecombineerd kan worden met een andere order en of de levertijd nog haalbaar is. Dat is per bestelling een paar minuten en per week een middag.',
    watDeAgentDoet: [
      'Neemt het besteladvies en bepaalt per artikel de meest geschikte leverancier op basis van uw eigen inkoopvoorwaarden.',
      'Rekent staffels, minimale afnamehoeveelheden en verpakkingseenheden mee.',
      'Bundelt artikelen per leverancier tot één order in plaats van losse regels.',
      'Zet de inkooporder klaar in uw ERP, als concept.',
      'Uw inkoper bekijkt hem in de werkbak, past aan en geeft akkoord. Pas dan gaat er iets naar de leverancier.',
    ],
    watUNodigHeeft:
      'Leveranciersvoorwaarden die ergens vastliggen: prijzen, staffels, minimale afname, levertijd. Als die alleen in iemands hoofd zitten, leggen wij ze eerst samen met u vast. Dat is werk vooraf, geen bijzaak.',
    watWijNietDoen:
      'Er gaat nooit automatisch een bestelling naar een leverancier. Zonder uitzondering. Dit is een principe bij ons, geen instelling die u kunt aanzetten.',
    faq: [
      {
        q: 'Kan de agent zelf bestellen bij de leverancier?',
        a: 'Nee. De order staat als concept klaar en gaat pas weg nadat iemand van u akkoord heeft gegeven.',
      },
      {
        q: 'Werkt dit met ons ERP?',
        a: 'Dat hangt af van welk pakket u gebruikt en welke koppelmogelijkheden dat heeft. Dat checken wij in het eerste gesprek voordat er iets wordt toegezegd.',
      },
      {
        q: 'Wat als de leverancier zijn voorwaarden wijzigt?',
        a: 'Dan passen wij de regels aan. Dat valt onder het maandcontract.',
      },
    ],
  },
  {
    slug: 'leveranciersbewaking',
    navLabel: 'Leveranciersbewaking',
    categorie: 'inkoop-voorraad',
    serviceType: 'Leveranciers en levertijden bewaken met een AI-agent',
    pageTitle: 'Leveranciersbewaking: orderbevestigingen en levertijden bewaken',
    metaDescription:
      'De agent controleert orderbevestigingen tegen uw inkooporder, bewaakt beloofde leverdata en meldt afwijkingen voordat uw klant erover belt.',
    heroEyebrow: 'Oplossing · Leveranciers',
    heroTitle: 'U hoort dat het te laat is',
    heroItalic: 'van uw eigen klant.',
    intro:
      'Een inkooporder de deur uit is niet hetzelfde als goederen op de kade. Tussen die twee zit een bevestiging die niemand regel voor regel naleest en een leverdatum die stilletjes opschuift.',
    cardBody:
      'Bevestigingen die niet kloppen en leverdata die opschuiven. De agent ziet het eerder dan uw klant.',
    systeemDoetAl:
      'Uw ERP registreert de inkooporder met de verwachte leverdatum en boekt de ontvangst af. U kunt een lijst openstaande orders opvragen.',
    waarHetOphoudt:
      'Die lijst zegt wat u besteld heeft, niet wat de leverancier heeft toegezegd. De bevestiging kwam per mail, met een andere prijs op regel drie en een leverdatum die twee weken later ligt. Zolang niemand die twee documenten naast elkaar legt, ontdekt u het verschil pas bij de ontvangst of bij de factuur.',
    watDeAgentDoet: [
      'Legt de orderbevestiging van de leverancier regel voor regel naast uw eigen inkooporder.',
      'Meldt de verschillen die ertoe doen: prijs, aantal, artikel, leverdatum, verpakkingseenheid.',
      'Werkt de toegezegde leverdatum bij in uw ERP als die afwijkt van de oorspronkelijke.',
      'Bewaakt de openstaande orders en signaleert wanneer een toegezegde datum verstrijkt zonder ontvangst.',
      'Zet een rappelmail naar de leverancier als concept klaar, met de ordergegevens erin.',
      'Bouwt per leverancier een beeld op van hoe vaak toezeggingen kloppen, met de onderliggende orders erbij.',
    ],
    watUNodigHeeft:
      'Inkooporders in uw ERP en een mailbox waar de orderbevestigingen binnenkomen. Als bevestigingen nu bij individuele inkopers in de persoonlijke mailbox landen, spreken wij eerst één centrale plek af.',
    watWijNietDoen:
      'Wij sturen niet uit eigen beweging klachten of aanmaningen naar uw leveranciers. De relatie met een leverancier is te belangrijk om aan een automatische mail over te laten. De agent signaleert en stelt op, u verstuurt.',
    faq: [
      {
        q: 'Onze leveranciers bevestigen per PDF, elk in een eigen opmaak.',
        a: 'Dat is normaal en geen bezwaar. De agent leest de PDF uit; er hoeft geen vast formaat afgesproken te worden.',
      },
      {
        q: 'Wat als de leverancier helemaal niet bevestigt?',
        a: 'Ook dat is een signaal. Blijft een bevestiging uit binnen de termijn die u aangeeft, dan komt de order in de werkbak.',
      },
      {
        q: 'Krijgen wij hier leveranciersbeoordelingen uit?',
        a: 'U krijgt de feiten: toegezegd versus geleverd, per leverancier, met de orders erbij. Wat u daarmee doet in het inkoopgesprek is aan u.',
      },
    ],
  },
  {
    slug: 'prijs-en-margebewaking',
    navLabel: 'Prijs- en margebewaking',
    categorie: 'inkoop-voorraad',
    serviceType: 'Prijzen en marges bewaken met een AI-agent',
    pageTitle: 'Prijs- en margebewaking op uw eigen verkoop- en inkoopdata',
    metaDescription:
      'De agent signaleert inkoopprijzen die stijgen zonder dat de verkoopprijs meebeweegt, en levert per artikel of klant een onderbouwd prijsvoorstel.',
    heroEyebrow: 'Oplossing · Marge',
    heroTitle: 'De inkoopprijs is gestegen.',
    heroItalic: 'De verkoopprijs staat er nog van vorig jaar.',
    intro:
      'Marge verdwijnt zelden in één klap. Hij lekt weg, een half procent per artikel, over honderden regels, tot het een jaar later in de cijfers zichtbaar wordt en niemand meer kan zeggen waar het begonnen is.',
    cardBody:
      'Inkoopprijzen die stijgen zonder dat de verkoopprijs meebeweegt. Per artikel een onderbouwd voorstel.',
    systeemDoetAl:
      'Uw pakket registreert inkoopprijzen, verkoopprijzen en per order de gerealiseerde marge. Er is meestal een rapport dat het totaal laat zien.',
    waarHetOphoudt:
      'Het totaal vertelt u dat de marge is gedaald. Niet waar. Daarvoor moet iemand per artikel de inkoopprijs van nu vergelijken met die van een half jaar geleden, kijken of de verkoopprijs is meegegaan, en beoordelen of die klant met die staffel eigenlijk nog wel rendeert. Dat is een middag werk en het gebeurt daarom eens per jaar.',
    watDeAgentDoet: [
      'Volgt per artikel het verloop van inkoopprijs en verkoopprijs door de tijd.',
      'Signaleert artikelen waar de inkoop is gestegen en de verkoopprijs niet is meegelopen.',
      'Rekent de werkelijke marge per klant en per artikelgroep door, inclusief de kortingen die feitelijk zijn gegeven.',
      'Markeert orders die onder uw eigen ondergrens zijn weggegaan, met wie ze heeft afgegeven.',
      'Levert per artikel of klantgroep een prijsvoorstel met de berekening en het effect eronder.',
      'U beslist welke prijzen omhoog gaan en wanneer. De agent maakt de mutatie klaar, niet definitief.',
    ],
    watUNodigHeeft:
      'Inkoop- en verkoophistorie in hetzelfde pakket of in gekoppelde pakketten, en een idee van uw eigen ondergrens per artikelgroep. Als die ondergrens nergens is vastgelegd, is dat het eerste gesprek dat wij met u voeren.',
    watWijNietDoen:
      'Wij passen geen prijzen aan zonder uw akkoord en wij bouwen geen dynamische prijsstelling die zelf de markt volgt. Een prijs richting uw klant is een commercieel besluit, geen modeluitkomst.',
    faq: [
      {
        q: 'Kijkt de agent ook naar prijzen van concurrenten?',
        a: 'Alleen als u openbare bronnen aanwijst die daarvoor gebruikt mogen worden. Standaard rekent hij met uw eigen cijfers.',
      },
      {
        q: 'Wij hebben per klant afwijkende afspraken.',
        a: 'Die zijn juist het interessantste deel. De agent rekent per afspraak door of die op de huidige inkoopprijs nog uitkomt zoals bedoeld.',
      },
      {
        q: 'Hoe vaak levert dit iets op?',
        a: 'Meestal in de eerste ronde het meest, omdat er dan een stuwmeer aan achterstallige prijsmutaties zichtbaar wordt. Daarna is het onderhoud.',
      },
    ],
  },
  {
    slug: 'factuurverwerking-automatiseren',
    navLabel: 'Factuurverwerking automatiseren',
    categorie: 'administratie-financieel',
    serviceType: 'Inkoopfacturen verwerken met een AI-agent',
    pageTitle: 'Factuurverwerking automatiseren, inclusief de controle',
    metaDescription:
      'Inkoopfacturen automatisch verwerken met een driewegcontrole tegen inkooporder en ontvangst. De agent codeert, controleert en zet klaar ter fiattering.',
    heroEyebrow: 'Oplossing · Facturen',
    heroTitle: 'Scannen kan uw pakket al.',
    heroItalic: 'Controleren is het werk.',
    intro:
      'Een factuur inlezen is al jaren opgelost. De vraag die erna komt, is niet opgelost: klopt deze factuur met wat wij besteld hebben en met wat er werkelijk binnen is gekomen?',
    cardBody:
      'De controle na het scannen: factuur tegen inkooporder tegen ontvangst, inclusief codering en fiattering.',
    systeemDoetAl:
      'Uw boekhoudpakket of scanoplossing haalt bedrag, datum en leverancier van de factuur en zet hem klaar in de boekingslijst.',
    waarHetOphoudt:
      'Het pakket weet niet of de prijs op de factuur dezelfde is als die op uw inkooporder, of de aantallen kloppen met de ontvangstbon, of deze factuur misschien al eerder is binnengekomen onder een ander nummer. Dat controleert nu iemand handmatig, of niemand.',
    watDeAgentDoet: [
      'Haalt de factuurregels uit de PDF, niet alleen de kop met het totaalbedrag.',
      'Legt de factuur naast de inkooporder en de geboekte ontvangst en meldt de verschillen per regel.',
      'Herkent dubbele facturen, ook wanneer het factuurnummer of de opmaak afwijkt.',
      'Stelt de codering voor: grootboekrekening, kostenplaats en btw-behandeling, op basis van hoe u eerdere facturen van deze leverancier heeft geboekt.',
      'Zet de factuur klaar ter fiattering bij de juiste persoon, volgens uw eigen mandaatregels.',
      'Facturen die zonder verschil door de controle komen, kunnen na uw expliciete akkoord doorlopen. De rest gaat altijd langs een mens.',
    ],
    watUNodigHeeft:
      'Een boekhoudpakket met een koppeling, zoals Exact, Twinfield, Moneybird of Snelstart, en inkooporders die daadwerkelijk in het systeem worden vastgelegd. Zonder inkooporder is er niets om tegen te controleren; dan blijft er codering en dubbelcontrole over.',
    watWijNietDoen:
      'Wij zetten geen betalingen klaar en wij raken uw bankomgeving niet aan. De agent stopt bij de geboekte en gefiatteerde factuur.',
    faq: [
      {
        q: 'Wij gebruiken al een scanoplossing.',
        a: 'Prima. De agent vervangt die niet per se, maar pakt op waar die ophoudt: de inhoudelijke controle tegen order en ontvangst.',
      },
      {
        q: 'Wat gebeurt er bij een verschil?',
        a: 'Dan wordt de factuur niet geboekt. Hij komt in de werkbak met het verschil erbij en, als u dat wilt, een concept-mail naar de leverancier.',
      },
      {
        q: 'Blijft onze accountant hierbij aangesloten?',
        a: 'Ja. De boekingen komen in uw eigen pakket terecht, in de structuur die met uw accountant is afgesproken.',
      },
    ],
  },
  {
    slug: 'debiteurenbeheer-automatiseren',
    navLabel: 'Debiteurenbeheer automatiseren',
    categorie: 'administratie-financieel',
    serviceType: 'Debiteurenbeheer automatiseren met een AI-agent',
    pageTitle: 'Debiteurenbeheer automatiseren zonder de relatie te beschadigen',
    metaDescription:
      'Herinneringen die rekening houden met de klantrelatie, lopende discussies en betaalgedrag. De agent stelt op, uw mens verstuurt.',
    heroEyebrow: 'Oplossing · Debiteuren',
    heroTitle: 'Aanmanen kan elk pakket.',
    heroItalic: 'Weten wie u níét moet aanmanen is het punt.',
    intro:
      'Debiteurenbeheer blijft liggen omdat het ongemakkelijk is. En de automatische herinneringsmodule wordt uitgezet nadat hij één keer een aanmaning stuurde naar de klant die net een klacht had ingediend.',
    cardBody:
      'Herinneringen die de klantrelatie, de lopende discussie en het betaalgedrag meewegen. U verstuurt.',
    systeemDoetAl:
      'Uw boekhouding weet precies welke facturen openstaan en hoe lang. Vrijwel elk pakket kan daar automatisch een herinnering op sturen.',
    waarHetOphoudt:
      'Die herinnering weet niets. Niet dat deze klant altijd op dag veertig betaalt en dat dat prima is. Niet dat er over deze factuur een discussie loopt bij uw servicedesk. Niet dat deze klant volgende week een grote order plaatst. Daarom wordt de module uitgezet en doet iemand het handmatig, tot het te druk wordt.',
    watDeAgentDoet: [
      'Loopt dagelijks de openstaande posten na en bepaalt per klant wat het normale betaalgedrag is.',
      'Controleert of er over de factuur een openstaande klacht, creditverzoek of mailwisseling loopt en houdt die posten tegen.',
      'Weegt de klantrelatie mee: omvang, historie, lopende orders, eerdere afspraken over uitstel.',
      'Stelt de herinnering op in de toon die u per klantgroep vastlegt, van vriendelijk rappel tot formele aanmaning.',
      'Zet de mails gebundeld in de werkbak, zodat iemand van u in vijf minuten de hele ronde afvinkt.',
      'Houdt bij welke aanpak bij welke klant tot betaling leidt en meldt de posten die naar incasso of naar u persoonlijk moeten.',
    ],
    watUNodigHeeft:
      'Een boekhoudpakket waaruit de openstaande posten en de betaalhistorie te halen zijn, en toegang tot de mailbox waar discussies over facturen binnenkomen. Dat tweede is wat het verschil maakt met de standaardmodule.',
    watWijNietDoen:
      'Wij versturen geen aanmaningen zelfstandig en wij dragen niets over aan een incassopartij. Een betalingsherinnering is contact met uw klant. Dat blijft van u.',
    faq: [
      {
        q: 'Kan dit ook bellen of appen?',
        a: 'Nee. De agent bereidt voor, in de kanalen die u al gebruikt voor schriftelijk contact. Bellen doet uw mens, met de belnotitie erbij.',
      },
      {
        q: 'Wat als een klant terugmailt?',
        a: 'Dan komt dat antwoord bij uw mens terecht, met de factuurgegevens en de historie eronder. De agent voert geen discussie over geld.',
      },
      {
        q: 'Levert dit echt kortere betaaltermijnen op?',
        a: 'Meestal wel, maar minder door de toon dan door de regelmaat: de ronde wordt eindelijk elke week gedaan in plaats van als het uitkomt.',
      },
    ],
  },
  {
    slug: 'urenregistratie-en-facturatie',
    navLabel: 'Urenregistratie en facturatie',
    categorie: 'administratie-financieel',
    serviceType: 'Urenregistratie en facturatie automatiseren met een AI-agent',
    pageTitle: 'Van geschreven uren naar een factuur die klopt',
    metaDescription:
      'De agent bundelt geschreven uren en materiaal per project, toetst ze aan de afspraak in de offerte en zet de factuur als concept klaar. Inclusief signalering van niet-gefactureerd werk.',
    heroEyebrow: 'Oplossing · Uren en facturatie',
    heroTitle: 'De uren zijn geschreven.',
    heroItalic: 'De factuur staat er over drie weken.',
    intro:
      'Bij dienstverleners en installateurs zit de grootste financiële lekkage niet in de tarieven. Hij zit in werk dat wel is gedaan en nooit is gefactureerd, omdat de factuurronde altijd achter de feiten aanloopt.',
    cardBody:
      'Geschreven uren en materiaal per project, getoetst aan de afspraak, als concept-factuur klaargezet.',
    systeemDoetAl:
      'Uw urenpakket registreert wie wanneer op welk project heeft geschreven. Uw boekhouding kan van een urenregel een factuurregel maken.',
    waarHetOphoudt:
      'Tussen die twee zit een beoordeling. Valt dit binnen de vaste prijs of is het meerwerk? Is dit uur declarabel bij deze klant of hebben we het weggegeven? Staat het materiaal van de werkbon er al bij? Klopt het met wat in de offerte is afgesproken? Dat is per project een paar minuten, en bij vijftig lopende projecten is dat de reden dat de factuurronde uitloopt.',
    watDeAgentDoet: [
      'Verzamelt per project alle geschreven uren, gebruikte materialen en gemaakte kosten uit de betrokken systemen.',
      'Legt ze naast de afspraak uit de offerte of het contract: vaste prijs, regie, staffel, afgesproken tarieven.',
      'Signaleert het meerwerk dat buiten de opdracht valt, met de urenregels als onderbouwing.',
      'Meldt uren die al lang geschreven zijn en nog nergens op een factuur staan.',
      'Zet per project de concept-factuur klaar in uw boekhouding, met de specificatie die deze klant gewend is.',
      'Uw projectleider loopt de gemarkeerde posten na en geeft de ronde vrij.',
    ],
    watUNodigHeeft:
      'Urenregistratie die daadwerkelijk wordt bijgehouden, op projectniveau, en een koppeling naar uw boekhouding. Als uren pas aan het eind van de maand uit het hoofd worden ingevuld, lost een agent dat niet op. Dat is een proces, geen software.',
    watWijNietDoen:
      'Wij versturen geen facturen automatisch naar uw klanten en wij beslissen niet zelf wat meerwerk is. Dat is een gesprek met uw klant, geen regel in een systeem.',
    faq: [
      {
        q: 'Onze mensen schrijven onvolledig.',
        a: 'Dan ziet u dat terug: de agent meldt projecten waar uren ontbreken ten opzichte van de planning of de werkbonnen. Het dwingt niets af, het maakt het zichtbaar.',
      },
      {
        q: 'Werkt dit met vaste prijzen én regie?',
        a: 'Ja, mits per project vastligt welke afspraak geldt. Juist de mengvorm, vaste prijs met meerwerk, is waar het meeste blijft liggen.',
      },
      {
        q: 'Welke pakketten koppelen?',
        a: 'Dat hangt af van wat u gebruikt. In het eerste gesprek checken wij de koppelmogelijkheden voordat er iets wordt toegezegd.',
      },
    ],
  },
  {
    slug: 'contractbewaking',
    navLabel: 'Contract- en abonnementbewaking',
    categorie: 'administratie-financieel',
    serviceType: 'Contracten en abonnementen bewaken met een AI-agent',
    pageTitle: 'Contract- en abonnementbewaking: geen datum meer over het hoofd',
    metaDescription:
      'De agent leest uw contracten uit, bewaakt opzegtermijnen, indexeringen en verlengingen, en meldt op tijd wat er besloten moet worden.',
    heroEyebrow: 'Oplossing · Contracten',
    heroTitle: 'Stilzwijgend verlengd,',
    heroItalic: 'omdat niemand op de datum lette.',
    intro:
      'Contracten kosten zelden geld op het moment dat u ze tekent. Ze kosten geld op de datum die daarna nooit meer iemand bekijkt: de opzegtermijn, de indexering die niet is doorgevoerd, de verlenging die vanzelf ging.',
    cardBody:
      'Opzegtermijnen, indexeringen en verlengingen die uit uw contracten komen en op tijd op tafel liggen.',
    systeemDoetAl:
      'De contracten staan in een map op de server of in uw documentsysteem. Belangrijke data staan soms in een Excel, bijgehouden door iemand die er goed in is.',
    waarHetOphoudt:
      'Die Excel is niet het probleem, het bijhouden is het probleem. De voorwaarden zitten in de PDF, in artikel 9 lid 3, in andere bewoordingen per contract. Niemand leest zestig contracten opnieuw om te controleren welke indexering dit jaar had gemogen of welke opzegtermijn over twee maanden verstrijkt.',
    watDeAgentDoet: [
      'Leest uw contracten en abonnementen uit en haalt de bepalingen eruit die om een datum vragen: looptijd, opzegtermijn, verlenging, indexering, prijsafspraak.',
      'Zet ze in één overzicht, met per bepaling de verwijzing naar de plek in het document.',
      'Meldt op tijd wat er besloten moet worden, met de termijn die u zelf aangeeft.',
      'Rekent bij indexering door wat de afgesproken clausule dit jaar oplevert.',
      'Zet de opzegging, verlenging of indexeringsbrief als concept klaar.',
      'Signaleert contracten waar de bepaling niet eenduidig te lezen is, in plaats van er een aan te nemen.',
    ],
    watUNodigHeeft:
      'De contracten digitaal op één plek, en iemand bij u die kan aanwijzen welke contracten meedoen. Papieren contracten in een ordner moeten eerst gescand worden; dat is werk vooraf dat wij eerlijk begroten.',
    watWijNietDoen:
      'Wij geven geen juridisch advies en wij zeggen niets op. De agent leest, signaleert en bereidt voor. Wat u met een contract doet, blijft een besluit van u of van uw jurist.',
    faq: [
      {
        q: 'Is dit een contractmanagementsysteem?',
        a: 'Nee. Er komt geen nieuw pakket bij dat gevuld en bijgehouden moet worden. De agent leest de documenten die u al heeft.',
      },
      {
        q: 'Mag een AI onze contracten lezen?',
        a: 'Dat regelen wij binnen dezelfde afspraken als de rest: uw documenten blijven in uw omgeving en er wordt niet mee getraind. Wat er precies verwerkt wordt, staat in de verwerkersovereenkomst.',
      },
      {
        q: 'Wat als een clausule voor meerdere uitleg vatbaar is?',
        a: 'Dan geeft de agent geen uitkomst, maar legt hij de tekst voor met de vraag erbij. Dat is precies het geval waar u zelf naar wilt kijken.',
      },
    ],
  },
  {
    slug: 'werkbonnen-verwerken',
    navLabel: 'Werkbonnen verwerken',
    categorie: 'werkvoorbereiding-kennis',
    serviceType: 'Werkbonnen en rapportages van buitendienst verwerken met een AI-agent',
    pageTitle: 'Werkbonnen verwerken: van bon uit de bus naar administratie',
    metaDescription:
      'Werkbonnen, foto’s en aantekeningen van de buitendienst automatisch omzetten naar uren, materiaal en een factuurregel. Inclusief signalering van wat ontbreekt.',
    heroEyebrow: 'Oplossing · Werkbonnen',
    heroTitle: 'De monteur is klaar.',
    heroItalic: 'De administratie begint pas.',
    intro:
      'Uw monteur levert een bon in met uren, materiaal, een handtekening en drie foto’s. Daarna zit er iemand op kantoor die dat overneemt in het systeem, achtervolgt wat ontbreekt en uitzoekt of dit onder garantie viel.',
    cardBody:
      'Bonnen, foto’s en aantekeningen van buiten omgezet naar uren, materiaal en een factuurregel binnen.',
    systeemDoetAl:
      'U heeft een planningspakket of servicemodule waar de opdracht in staat, en een boekhouding waar de uren en het materiaal uiteindelijk in moeten.',
    waarHetOphoudt:
      'Daartussen zit de werkelijkheid van buiten: een bon die deels is ingevuld, materiaal dat als omschrijving is opgeschreven in plaats van als artikelnummer, een handtekening die ontbreekt, en de vraag of dit bezoek onder het contract viel of gefactureerd mag worden. Dat uitzoekwerk is per bon een paar minuten en per week een dag.',
    watDeAgentDoet: [
      'Leest de werkbon uit, ook wanneer die als foto, PDF of app-export binnenkomt.',
      'Koppelt de bon aan de juiste opdracht, klant en installatie.',
      'Zet omschreven materiaal om naar uw eigen artikelnummers en markeert wat niet eenduidig te matchen is.',
      'Toetst of het bezoek onder garantie, contract of regie valt, op basis van uw eigen afspraken bij die klant.',
      'Meldt wat ontbreekt: uren zonder omschrijving, ontbrekende handtekening, foto’s die volgens uw eigen norm verplicht zijn.',
      'Zet de uren, het materiaal en de factuurregel klaar in uw systeem, ter controle.',
    ],
    watUNodigHeeft:
      'Werkbonnen die op één plek binnenkomen, digitaal of als foto, en een systeem waarin opdrachten en klanten geregistreerd staan. Handgeschreven bonnen zijn mogelijk, maar de kwaliteit hangt dan af van het handschrift; dat testen wij eerst op uw eigen bonnen.',
    watWijNietDoen:
      'Wij vervangen uw werkbon-app niet en wij verzinnen geen uren of materiaal. Ontbreekt er iets op de bon, dan komt dat als vraag terug, niet als aanname.',
    faq: [
      {
        q: 'Onze monteurs werken al met een app.',
        a: 'Dan is het nog eenvoudiger. De agent pakt de export uit die app op en doet de controle en de koppeling naar de administratie.',
      },
      {
        q: 'Kan hij ook foto’s beoordelen?',
        a: 'Hij controleert of de vereiste foto’s aanwezig zijn en waar ze bij horen. Een technisch oordeel over wat op de foto staat, laten wij aan uw vakmensen.',
      },
      {
        q: 'Wat levert dit op?',
        a: 'Meestal twee dingen: de facturatie loopt dagen tot weken eerder, en er blijft minder werk onbetaald doordat incomplete bonnen direct worden opgemerkt.',
      },
    ],
  },
  {
    slug: 'planning-en-capaciteit',
    navLabel: 'Planning en capaciteit',
    categorie: 'werkvoorbereiding-kennis',
    serviceType: 'Planning en capaciteit ondersteunen met een AI-agent',
    pageTitle: 'Planning en capaciteit: het voorwerk voor uw planner',
    metaDescription:
      'De agent bereidt de planning voor: welke opdracht kan wanneer, met welke vakbekwaamheid, welk materiaal en welke reistijd. Uw planner beslist en zet vast.',
    heroEyebrow: 'Oplossing · Planning',
    heroTitle: 'Uw planbord is leeg te vullen.',
    heroItalic: 'De afwegingen erachter niet.',
    intro:
      'Een planpakket toont wie beschikbaar is. Wie er logisch is, gegeven de vakbekwaamheid, het materiaal dat binnen moet zijn, de reistijd en de klant die al twee keer verzet is, weet alleen uw planner.',
    cardBody:
      'Het voorwerk voor de planning: wat kan wanneer, met wie en met welk materiaal. Uw planner beslist.',
    systeemDoetAl:
      'Uw planpakket toont de agenda’s, de opdrachten en de beschikbaarheid. Slepen en neerzetten gaat prima.',
    waarHetOphoudt:
      'Het pakket weet niet dat dit type klus twee monteurs met een specifiek certificaat vraagt, dat het materiaal pas donderdag binnenkomt volgens de laatste leverdatum van uw leverancier, dat deze klant vorige maand al is verzet en dat de rit erna aan de andere kant van het land ligt. Die afweging maakt uw planner nu elke ochtend opnieuw, uit het hoofd.',
    watDeAgentDoet: [
      'Verzamelt per openstaande opdracht wat er nodig is: vakbekwaamheid, aantal mensen, geschatte duur, materiaal.',
      'Controleert of het benodigde materiaal op voorraad is of op tijd binnenkomt volgens de laatste toegezegde leverdatum.',
      'Houdt rekening met reistijd, regio en de afspraken die met deze klant zijn gemaakt.',
      'Signaleert de knelpunten van de komende weken: opdrachten die niet passen, dagen die overvol staan, klussen die wachten op materiaal.',
      'Levert een voorstel voor de week met de afweging erbij, niet alleen de uitkomst.',
      'Uw planner past aan en zet vast. De agent plant niet zelf in.',
    ],
    watUNodigHeeft:
      'Een planpakket of agenda waar de opdrachten in staan, en vastgelegde eisen per type opdracht: hoeveel mensen, welke bekwaamheid, hoe lang. Als dat alleen in het hoofd van de planner zit, is dat vastleggen de eerste stap, en de meest waardevolle.',
    watWijNietDoen:
      'Wij zetten geen afspraken vast bij uw klanten en wij verschuiven niets zonder uw planner. Planning is mensenwerk met verplichtingen eraan vast; de agent doet het voorwerk.',
    faq: [
      {
        q: 'Is dit een planningspakket?',
        a: 'Nee. De agent werkt bovenop het pakket dat u al heeft. Er komt geen scherm bij waar uw planner in moet gaan werken.',
      },
      {
        q: 'Wat als de planner het er niet mee eens is?',
        a: 'Dan wijkt hij af, en dat is de bedoeling. De onderbouwing staat erbij, zodat het gesprek gaat over de aanname en niet over het pakket.',
      },
      {
        q: 'Houdt hij rekening met spoed?',
        a: 'Ja, mits u vastlegt wat spoed bij u betekent en wat er dan mag wijken. Dat is een beleidsvraag, geen technische.',
      },
    ],
  },
  {
    slug: 'documenten-doorzoeken',
    navLabel: 'Interne kennis ontsluiten',
    categorie: 'werkvoorbereiding-kennis',
    serviceType: 'Interne documenten en kennis ontsluiten met een AI-agent',
    pageTitle: 'Interne kennis ontsluiten: antwoord mét bronvermelding',
    metaDescription:
      'Uw eigen handleidingen, contracten, offertes en procedures doorzoekbaar maken. De agent antwoordt alleen met wat er in uw documenten staat, met verwijzing naar de bron.',
    heroEyebrow: 'Oplossing · Kennis',
    heroTitle: 'Het antwoord staat in een document.',
    heroItalic: 'De vraag is in welk.',
    intro:
      'De kennis van uw bedrijf staat in duizenden documenten die niemand meer kan overzien, en in het hoofd van twee mensen die altijd gebeld worden. Beide zijn een risico, en het tweede vertrekt op enig moment.',
    cardBody:
      'Uw handleidingen, procedures en oude offertes doorzoekbaar, met een antwoord dat naar de bron verwijst.',
    systeemDoetAl:
      'Uw documenten staan in SharePoint, op een netwerkschijf of in een documentsysteem. De zoekfunctie vindt bestandsnamen en soms tekst.',
    waarHetOphoudt:
      'Zoeken op woorden werkt alleen als u het woord kent dat er staat. Uw monteur zoekt op wat hij bij de klant ziet, niet op de typeaanduiding uit de handleiding. Uw verkoper wil weten wat wij drie jaar geleden bij een vergelijkbaar project hebben afgesproken, en dat staat in een offerte waarvan hij de naam niet weet. Dus belt hij de collega die het toevallig weet.',
    watDeAgentDoet: [
      'Ontsluit de documentverzamelingen die u aanwijst: handleidingen, procedures, offertes, contracten, technische specificaties.',
      'Beantwoordt vragen in gewone taal, met de passage en het document erbij waar het antwoord vandaan komt.',
      'Zegt het expliciet wanneer het antwoord niet in de documenten staat, in plaats van iets aannemelijks te formuleren.',
      'Respecteert de rechten die al op de mappen staan: wie een document niet mag zien, krijgt er ook geen antwoord uit.',
      'Meldt tegenstrijdigheden tussen documenten, bijvoorbeeld twee versies van dezelfde procedure.',
      'Houdt bij welke vragen vaak gesteld worden, zodat u ziet waar uw documentatie tekortschiet.',
    ],
    watUNodigHeeft:
      'Documenten op een plek waar een koppeling bij kan, zoals SharePoint, Google Drive of een netwerkschijf, en iemand die kan aangeven welke versie leidend is. Een map met vijf versies van dezelfde procedure levert vijf antwoorden op; dat opruimen hoort bij het project.',
    watWijNietDoen:
      'Wij laten de agent geen antwoord verzinnen als het document ontbreekt, en wij zetten dit niet open voor uw klanten. Dit is een instrument voor uw eigen mensen.',
    faq: [
      {
        q: 'Is dit een chatbot?',
        a: 'Het is een zoekfunctie die antwoord geeft in plaats van een lijst met bestanden, met de bron erbij. Wie de bron niet kan zien, krijgt geen antwoord.',
      },
      {
        q: 'Gaan onze documenten naar een AI-leverancier?',
        a: 'Uw documenten blijven in uw eigen omgeving en er wordt niet mee getraind. Wat er precies verwerkt wordt en waar, leggen wij vast in de verwerkersovereenkomst.',
      },
      {
        q: 'Wat als documenten verouderd zijn?',
        a: 'Dan is dat het eerste wat u ziet, en dat is nuttig. De agent geeft de datum en de vindplaats mee bij elk antwoord.',
      },
    ],
  },
  {
    slug: 'rapportage-automatiseren',
    navLabel: 'Managementrapportage automatiseren',
    categorie: 'werkvoorbereiding-kennis',
    serviceType: 'Managementrapportage automatiseren met een AI-agent',
    pageTitle: 'Managementrapportage automatiseren: de duiding erbij',
    metaDescription:
      'Maand- en weekrapportage die niet alleen cijfers toont maar uitlegt wat er is veranderd en waardoor, met de onderliggende posten erbij.',
    heroEyebrow: 'Oplossing · Rapportage',
    heroTitle: 'De cijfers heeft u.',
    heroItalic: 'De verklaring kost u de maandag.',
    intro:
      'Elke maand hetzelfde ritueel: iemand trekt de cijfers uit drie pakketten, zet ze in een sjabloon en zoekt daarna uit waarom de marge is gedaald. Dat laatste is het enige deel dat er echt toe doet.',
    cardBody:
      'Niet nog een dashboard, maar de verklaring eronder: wat is veranderd, waardoor, en welke posten dat zijn.',
    systeemDoetAl:
      'Uw pakketten leveren rapporten. Er is een BI-tool of een Excel-model dat de cijfers netjes bij elkaar zet.',
    waarHetOphoudt:
      'Een rapport zegt dat de brutomarge met 1,8 procent is gedaald. Het zegt niet dat dat komt door twee grote orders tegen projectprijs bij één klant, en dat het zonder die twee orders juist gestegen zou zijn. Die verklaring haalt nu iemand er met de hand uit, elke maand opnieuw, en meestal pas nadat er in de vergadering naar gevraagd is.',
    watDeAgentDoet: [
      'Haalt de cijfers uit de bronsystemen die u aanwijst en zet ze in het sjabloon dat u al gebruikt.',
      'Vergelijkt met de voorgaande periode, het budget en dezelfde periode vorig jaar.',
      'Zoekt de verklaring bij elke afwijking op en noemt de posten, klanten of orders die het verschil veroorzaken.',
      'Onderscheidt incidenteel van structureel, en zegt het wanneer dat onderscheid niet te maken is.',
      'Levert de rapportage met een korte toelichting in gewone taal, met bij elke uitspraak de onderliggende regels.',
      'Uw controller of accountant controleert en stelt vast. De agent rapporteert niets naar buiten.',
    ],
    watUNodigHeeft:
      'Toegang tot de bronsystemen en een afspraak over welke cijfers leidend zijn. Als het maandcijfer nu in drie pakketten net anders uitkomt, is die keuze het eerste wat wij met u en eventueel uw accountant vastleggen.',
    watWijNietDoen:
      'Wij bouwen geen dashboard bij en wij leveren geen cijfers aan derden. Dit vervangt uw accountant niet; het levert de duiding waar hij anders zelf naar moet zoeken.',
    faq: [
      {
        q: 'Wij hebben al Power BI.',
        a: 'Dan blijft dat staan. De agent trekt de duiding uit dezelfde bronnen; het dashboard toont, de agent verklaart.',
      },
      {
        q: 'Kan hij ook prognoses maken?',
        a: 'Alleen op basis van uw eigen historie en met de berekening zichtbaar. Een prognose zonder onderbouwing leveren wij niet.',
      },
      {
        q: 'Hoe weten wij dat de cijfers kloppen?',
        a: 'Elke uitspraak in de rapportage is door te klikken naar de onderliggende posten. Klopt iets niet, dan ziet u binnen twee stappen waar het vandaan komt.',
      },
    ],
  },
];

export const OPLOSSING_BY_SLUG = OPLOSSINGEN.reduce<Record<string, Oplossing>>((acc, o) => {
  acc[o.slug] = o;
  return acc;
}, {});

/** De oplossingen die op de homepage en in korte linkbalken worden uitgelicht. */
export const OPLOSSINGEN_FEATURED = OPLOSSINGEN.filter((o) => o.featured);

/** Oplossingen gegroepeerd op categorie, in de volgorde van OPLOSSING_CATEGORIEEN. */
export const OPLOSSINGEN_PER_CATEGORIE = OPLOSSING_CATEGORIEEN.map((c) => ({
  ...c,
  oplossingen: OPLOSSINGEN.filter((o) => o.categorie === c.key),
}));

/**
 * Verwante oplossingen bij een oplossing: eerst uit dezelfde categorie,
 * daarna aangevuld met de uitgelichte oplossingen.
 */
export function verwanteOplossingen(slug: string, aantal = 3): Oplossing[] {
  const huidige = OPLOSSING_BY_SLUG[slug];
  if (!huidige) return OPLOSSINGEN_FEATURED.slice(0, aantal);

  const zelfdeCategorie = OPLOSSINGEN.filter(
    (o) => o.slug !== slug && o.categorie === huidige.categorie,
  );
  const rest = OPLOSSINGEN.filter(
    (o) => o.slug !== slug && o.categorie !== huidige.categorie && o.featured,
  );

  return [...zelfdeCategorie, ...rest].slice(0, aantal);
}

/**
 * Welke oplossingspagina's het meest relevant zijn per branche.
 * Gebruikt op de branchepagina's om naar de beslislaag door te verwijzen.
 */
export const OPLOSSINGEN_PER_BRANCHE: Record<string, string[]> = {
  groothandel: [
    'offertes-automatiseren',
    'orderverwerking-automatiseren',
    'vraagvoorspelling',
    'inkoop-automatiseren',
  ],
  'e-commerce': [
    'klantenservice-automatiseren',
    'vraagvoorspelling',
    'inkoop-automatiseren',
    'leveranciersbewaking',
  ],
  detailhandel: ['vraagvoorspelling', 'inkoop-automatiseren', 'prijs-en-margebewaking'],
  agrarisch: ['vraagvoorspelling', 'inkoop-automatiseren', 'factuurverwerking-automatiseren'],
  installatietechniek: [
    'werkbonnen-verwerken',
    'planning-en-capaciteit',
    'urenregistratie-en-facturatie',
    'inkoop-automatiseren',
  ],
  bouw: [
    'offertes-automatiseren',
    'werkbonnen-verwerken',
    'urenregistratie-en-facturatie',
    'inkoop-automatiseren',
  ],
  productie: [
    'orderverwerking-automatiseren',
    'inkoop-automatiseren',
    'leveranciersbewaking',
    'planning-en-capaciteit',
  ],
  'transport-logistiek': [
    'orderverwerking-automatiseren',
    'planning-en-capaciteit',
    'factuurverwerking-automatiseren',
  ],
  'zakelijke-dienstverlening': [
    'klantenservice-automatiseren',
    'leadopvolging-automatiseren',
    'urenregistratie-en-facturatie',
    'documenten-doorzoeken',
  ],
  accountancy: [
    'factuurverwerking-automatiseren',
    'urenregistratie-en-facturatie',
    'rapportage-automatiseren',
    'documenten-doorzoeken',
  ],
  advocatuur: [
    'documenten-doorzoeken',
    'contractbewaking',
    'urenregistratie-en-facturatie',
    'debiteurenbeheer-automatiseren',
  ],
  makelaardij: ['klantenservice-automatiseren', 'leadopvolging-automatiseren', 'contractbewaking'],
  zorg: ['klantenservice-automatiseren', 'planning-en-capaciteit', 'documenten-doorzoeken'],
  horeca: ['klantenservice-automatiseren', 'inkoop-automatiseren', 'factuurverwerking-automatiseren'],
};
