export interface OplossingFAQ {
  q: string;
  a: string;
}

export interface Oplossing {
  slug: string;
  /** Korte naam voor navigatie, kaarten en linkbalken. */
  navLabel: string;
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
    slug: 'vraagvoorspelling',
    navLabel: 'Vraagvoorspelling',
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
];

export const OPLOSSING_BY_SLUG = OPLOSSINGEN.reduce<Record<string, Oplossing>>((acc, o) => {
  acc[o.slug] = o;
  return acc;
}, {});

/**
 * Welke oplossingspagina's het meest relevant zijn per branche.
 * Gebruikt op de branchepagina's om naar de beslislaag door te verwijzen.
 */
export const OPLOSSINGEN_PER_BRANCHE: Record<string, string[]> = {
  groothandel: ['vraagvoorspelling', 'inkoop-automatiseren'],
  'e-commerce': ['vraagvoorspelling', 'inkoop-automatiseren'],
  detailhandel: ['vraagvoorspelling', 'inkoop-automatiseren'],
  agrarisch: ['vraagvoorspelling', 'inkoop-automatiseren'],
  installatietechniek: ['klantenservice-automatiseren', 'inkoop-automatiseren'],
  bouw: ['klantenservice-automatiseren', 'inkoop-automatiseren'],
  productie: ['klantenservice-automatiseren', 'inkoop-automatiseren'],
  'transport-logistiek': ['inkoop-automatiseren', 'vraagvoorspelling'],
  'zakelijke-dienstverlening': ['klantenservice-automatiseren', 'leadopvolging-automatiseren'],
  accountancy: ['klantenservice-automatiseren', 'leadopvolging-automatiseren'],
  advocatuur: ['klantenservice-automatiseren', 'leadopvolging-automatiseren'],
  makelaardij: ['klantenservice-automatiseren', 'leadopvolging-automatiseren'],
  zorg: ['klantenservice-automatiseren'],
  horeca: ['klantenservice-automatiseren'],
};
