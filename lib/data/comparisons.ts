export interface ComparisonRow {
  feature: string;
  agent: string;
  alternative: string;
}

export interface ComparisonFAQ {
  q: string;
  a: string;
}

export interface Comparison {
  slug: string;
  alternative: string; // "chatbot", "RPA", "Zapier/Make"
  /** Afwijkende kop boven de rechterkolom van de tabel. Valt terug op alternative. */
  alternativeColumnLabel?: string;
  pageTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroItalic: string;
  intro: string;
  /** Optioneel. Leeg laten als de pagina met lopende tekst werkt in plaats van bullets. */
  whenAgent: string[];
  whenAlternative: string[];
  /** Optioneel prozablok: wanneer een agent niet nodig is. */
  geenAgentNodig?: string;
  /** Optioneel prozablok: hoe agent en bestaand pakket elkaar aanvullen. */
  vultElkaarAan?: string;
  rows: ComparisonRow[];
  conclusion: string;
  faq: ComparisonFAQ[];
}

export const COMPARISONS: Comparison[] = [
  {
    slug: 'ai-agent-vs-chatbot',
    alternative: 'chatbot',
    pageTitle: 'AI-agent vs chatbot · waar ligt het verschil',
    metaDescription:
      'AI-agent vs chatbot: een chatbot beantwoordt vragen, een AI-agent neemt werk over. Praktische vergelijking voor MKB-bedrijven die een keuze maken — wanneer is welke oplossing beter.',
    heroEyebrow: 'Vergelijking · agent vs chatbot',
    heroTitle: 'AI-agent of chatbot?',
    heroItalic: 'Twee verschillende dingen, vaak verward.',
    intro:
      'Veel ondernemers gebruiken de woorden door elkaar. In de praktijk zijn een chatbot en een AI-agent fundamenteel verschillend: een chatbot wacht op een vraag en geeft een antwoord, een AI-agent ziet werk binnenkomen en handelt het af. Voor sommige use cases is een chatbot prima, voor andere is alleen een agent geschikt.',
    whenAgent: [
      'Het werk vraagt een beslissing en een vervolg-actie, niet alleen een antwoord.',
      'Het komt vaker voor dan twee keer per week en heeft te beschrijven regels.',
      'U wilt dat het systeem koppelt met uw boekhouding, CRM of ERP en daar zelf zaken uit haalt of in zet.',
      'U wilt dat bedragen of beslissingen boven uw mandaat langs een mens komen.',
      'U wilt grip via expliciete beleidsregels die u zelf aan- en uitzet.',
    ],
    whenAlternative: [
      'De vraag is altijd "informatie geven", nooit "iets doen".',
      'Het gaat om herhalende, voorspelbare publieke vragen (openingstijden, leveringsvoorwaarden, retourbeleid).',
      'U heeft geen koppeling nodig met interne systemen.',
      'U wilt vooral een eerste-lijns filter voor klantvragen die anders bij uw mensen terechtkomen.',
    ],
    rows: [
      { feature: 'Initiatief', agent: 'Pakt werk op zodra het binnenkomt', alternative: 'Wacht op een vraag van een gebruiker' },
      { feature: 'Acties uitvoeren', agent: 'Ja — mailen, factureren, plannen, boeken', alternative: 'Nee — alleen tekst terug' },
      { feature: 'Variatie aankunnen', agent: 'Ja, op context', alternative: 'Beperkt; werkt op intent-matching' },
      { feature: 'Koppelt met systemen', agent: 'API, webhook, e-mail-bridge', alternative: 'Soms via knowledge base, zelden voor schrijfacties' },
      { feature: 'Beleidsregels', agent: 'Expliciet, configureerbaar per scenario', alternative: 'Vaak hard-coded in flow' },
      { feature: 'Logboek', agent: 'Per actie, terug te draaien', alternative: 'Conversation log, geen actie-log' },
      { feature: 'Oplevering', agent: 'In fasen, elke fase iets werkends', alternative: 'Dagen tot weken, afhankelijk van content' },
      { feature: 'Doel', agent: 'Werk overnemen', alternative: 'Vragen beantwoorden' },
    ],
    conclusion:
      'Voor klantenservice op uw website is een chatbot prima. Voor het werk waar uw binnendienst nu mee bezig is — offertes, orders, facturen, planning, mail — heeft u een agent nodig. De twee sluiten elkaar niet uit: bij sommige klanten draait een chatbot voor publieke vragen én een agent voor de operatie erachter.',
    faq: [
      {
        q: 'Wat is het belangrijkste verschil tussen een AI-agent en een chatbot?',
        a: 'Een chatbot wacht op een vraag van een mens en geeft een antwoord terug. Een AI-agent ziet werk binnenkomen — een mail, een order, een signaal — en voert zelfstandig een actie uit binnen door u bepaalde regels. De chatbot is reactief, de agent is proactief.',
      },
      {
        q: 'Kan een chatbot ook acties uitvoeren?',
        a: 'In beperkte mate. Een chatbot kan via een gekoppelde tool een form doorzetten of een ticket aanmaken. Maar zelfstandig een offerte opstellen op basis van uw prijslijst, voorraad checken en de mail in uw toon versturen — daarvoor heeft u een agent nodig die de hele keten kan overzien.',
      },
      {
        q: 'Wat past bij mijn MKB-bedrijf: een chatbot of een AI-agent?',
        a: 'Heeft u veel publieke vragen op uw website? Een chatbot werkt prima. Heeft u een binnendienst die structureel onder druk staat door mailstroom, offertes en orders? Dan heeft u een agent nodig. Veel klanten draaien beide tegelijk, met een agent voor de operationele werkstroom en een chatbot voor publieke FAQ.',
      },
      {
        q: 'Kost een AI-agent meer dan een chatbot?',
        a: 'Meestal wel. Een chatbot komt vaak uit een SaaS-doos en kost een paar honderd euro per maand. Een AI-agent op maat — gekoppeld aan uw systemen, met expliciete beleidsregels — is een vaste-prijs-implementatie van enkele duizenden tot enkele tienduizenden euro\'s. Daar staat tegenover dat een agent werk overneemt waar een chatbot niet aan begint.',
      },
    ],
  },
  {
    slug: 'ai-agent-vs-rpa',
    alternative: 'RPA',
    pageTitle: 'AI-agent vs RPA · wanneer welke aanpak',
    metaDescription:
      'AI-agent vs RPA (UiPath, Power Automate): waar RPA breekt op variatie, kan een AI-agent met context omgaan. Wanneer kiest u welke aanpak — en wanneer combineert u ze?',
    heroEyebrow: 'Vergelijking · agent vs RPA',
    heroTitle: 'AI-agent of RPA?',
    heroItalic: 'Klassieke automatisering komt aan zijn grens.',
    intro:
      'RPA (Robotic Process Automation) bestaat al sinds 2010 en is in grote bedrijven veel gebruikt: een bot klikt door een interface zoals een mens dat zou doen. Het werkt — totdat de input net iets anders is dan verwacht. AI-agents werken vanuit context en taal, en kunnen omgaan met de variatie waar RPA op breekt.',
    whenAgent: [
      'De input is variabel: mails in verschillende formuleringen, PDFs in verschillende layouts.',
      'Het proces vraagt oordeel: "is dit hetzelfde als die andere klantvraag?" of "klopt deze factuur met de bestelling?".',
      'U wilt dat het systeem uitlegt waarom hij iets heeft gedaan, niet alleen rapporteert dat hij het heeft gedaan.',
      'U heeft geen senior RPA-developer in dienst voor het bouwen en onderhouden.',
    ],
    whenAlternative: [
      'Het proces is volledig deterministisch: dezelfde stappen in dezelfde volgorde, altijd.',
      'U werkt met een verouderd systeem zonder API en zonder e-mail-output.',
      'De handeling vraagt UI-clicks die nooit veranderen (oude desktop-app, mainframe-emulator).',
      'U heeft een team dat RPA-bots kan bouwen en jaren onderhouden.',
    ],
    rows: [
      { feature: 'Werkt op', agent: 'Mails, PDFs, beleidsregels, API-data', alternative: 'UI-clicks, vaste schermlayouts' },
      { feature: 'Variatie aankunnen', agent: 'Ja, vanuit context', alternative: 'Nee, breekt op afwijking' },
      { feature: 'Onderhoud bij UI-update', agent: 'Niet relevant — werkt op data', alternative: 'Bot herschrijven' },
      { feature: 'Beleidsregels', agent: 'Expliciet, configureerbaar', alternative: 'Hard-coded in flow' },
      { feature: 'Geschikt voor MKB', agent: 'Ja — vaste prijs, lage onderhoudslast', alternative: 'Zwaar — vraagt RPA-specialist' },
      { feature: 'Combineerbaar', agent: 'Ja, kan RPA-bot aansturen', alternative: 'Ja, kan door agent worden aangestuurd' },
      { feature: 'Oplevering', agent: 'In fasen, elke fase iets werkends', alternative: 'Weken tot maanden per proces' },
    ],
    conclusion:
      'RPA had zijn moment in grote bedrijven met legacy-systemen die geen API hadden. Voor MKB-bedrijven anno 2026 is een AI-agent vrijwel altijd de betere keuze: lagere onderhoudslast, beter omgaan met variatie, geen specialist nodig. In zeldzame gevallen kunnen de twee samenwerken — bijvoorbeeld een agent die een RPA-bot aanstuurt om een verouderde desktop-app te bedienen.',
    faq: [
      {
        q: 'Is RPA dood nu er AI-agents zijn?',
        a: 'Niet helemaal. RPA blijft nuttig voor processen die volledig deterministisch zijn en waar de UI van een verouderd systeem niet anders te bedienen is. Voor verreweg de meeste MKB-cases is een AI-agent in 2026 echter de betere keuze: hij kan met variatie omgaan, vraagt minder onderhoud en is sneller live.',
      },
      {
        q: 'Kan een AI-agent een bestaande RPA-bot vervangen?',
        a: 'Vaak wel. Wij komen RPA-bots tegen die jaren geleden gebouwd zijn voor het verwerken van inkoopfacturen of het overzetten van orders. Een AI-agent kan datzelfde werk doen, mét uitleg over wat hij heeft gedaan, en zonder dat de bot stuk gaat als de leverancier zijn factuur-layout aanpast.',
      },
      {
        q: 'Wat is goedkoper: RPA of een AI-agent?',
        a: 'In bouwkosten ontlopen ze elkaar niet veel. In onderhoudskosten wint de AI-agent: een RPA-bot moet bij elke UI-wijziging worden aangepast, een agent niet. Over meerdere jaren gemeten valt een AI-agent daardoor doorgaans goedkoper uit.',
      },
      {
        q: 'Kunnen AI-agent en RPA samenwerken?',
        a: 'Ja. Een agent kan een RPA-bot aansturen voor een specifieke deelstap — bijvoorbeeld een handeling in een verouderde desktop-app die geen API heeft. De agent doet de denkwerk-taak, de RPA-bot doet de UI-clicks. Dit is een nuttige combinatie als één systeem in uw landschap moeilijk koppelbaar is.',
      },
    ],
  },
  {
    slug: 'ai-agent-vs-zapier',
    alternative: 'Zapier/Make',
    pageTitle: 'AI-agent vs Zapier · waar de grens ligt',
    metaDescription:
      'AI-agent vs Zapier of Make: vaste workflows zijn snel gebouwd maar breken op variatie. Een AI-agent denkt mee. Wanneer is Zapier voldoende, wanneer heeft u meer nodig?',
    heroEyebrow: 'Vergelijking · agent vs Zapier/Make',
    heroTitle: 'AI-agent of Zapier?',
    heroItalic: 'Workflows tegenover collega&rsquo;s.',
    intro:
      'Zapier en Make zijn fantastische tools voor vaste, voorspelbare integraties: "als er een formulier wordt ingevuld, zet een rij in Google Sheets en stuur een mail". Voor zulke flows is een AI-agent overkill. Maar zodra de input variabel wordt — een mail in vrije tekst, een offerte-aanvraag in verschillende formuleringen — komt Zapier niet meer mee.',
    whenAgent: [
      'De input is vrije tekst: mails, chats, gesproken aantekeningen.',
      'Er is oordeel of context-interpretatie nodig: "welke klant is dit?", "valt dit binnen ons coulance-beleid?".',
      'Het werk vraagt meerdere stappen die afhangen van wat de vorige stap opleverde.',
      'U wilt dat het systeem uitzonderingen herkent en escaleert in plaats van blindelings doorvoert.',
    ],
    whenAlternative: [
      'De input is gestructureerd: webhook, formulier, API-event met vaste velden.',
      'De flow is "altijd dezelfde stappen in dezelfde volgorde".',
      'U heeft een paar uur per maand voor onderhoud aan de flows.',
      'De volumes zijn beperkt en de flow is een "lijm-laagje" tussen twee tools.',
    ],
    rows: [
      { feature: 'Input', agent: 'Vrije tekst, e-mails, PDFs, gesprek', alternative: 'Trigger-events met vaste velden' },
      { feature: 'Stappen', agent: 'Beslist per stap op context', alternative: 'Vaste keten, geen "denken" tussen stappen' },
      { feature: 'Variatie', agent: 'Ja', alternative: 'Breekt of geeft fout terug' },
      { feature: 'Bouwtijd', agent: 'In fasen, elke fase iets werkends', alternative: 'Uren tot dagen voor een Zap' },
      { feature: 'Onderhoud', agent: 'Maandelijks 30 minuten', alternative: 'Per zap meerdere keren per jaar' },
      { feature: 'Logboek', agent: 'Per beslissing, met motivatie', alternative: 'Per run, zonder uitleg' },
      { feature: 'Schaalt naar', agent: 'Tientallen agents in een platform', alternative: 'Honderden Zaps die los staan' },
    ],
    conclusion:
      'Zapier en Make zijn perfect voor het automatiseren van koppelingen tussen losse tools. Maar het moment dat u zegt "ik wil dat die mail wordt gelezen en daar een offerte uit komt", bent u over de grens van wat Zapier kan. Veel klanten gebruiken beide: agents voor de hoofd-werkstroom, Zapier-flows voor kleine integraties die er omheen lopen.',
    faq: [
      {
        q: 'Wanneer is Zapier of Make voldoende, en wanneer heb ik een AI-agent nodig?',
        a: 'Zapier of Make is voldoende als de trigger en alle stappen voorspelbaar zijn: "als formulier ingevuld, zet rij in sheet en stuur mail". Zodra er ergens in de keten een interpretatie nodig is — een vrije-tekst-mail lezen, een passende klant matchen, een uitzondering herkennen — heeft u een AI-agent nodig.',
      },
      {
        q: 'Kan een AI-agent dingen die Zapier ook kan?',
        a: 'Ja, en meer. Maar voor pure trigger-actie-flows is het vaak goedkoper en sneller om Zapier te gebruiken. Wij raden klanten aan om de twee naast elkaar te gebruiken: agents voor het werk dat denken vraagt, Zapier voor de simpele lijm tussen tools.',
      },
      {
        q: 'Vervangt een AI-agent al mijn Zaps?',
        a: 'Meestal niet. Veel klanten houden hun Zaps voor kleine integraties (Stripe → Slack, formulier → CRM) en zetten een agent in voor de werkstroom waar de echte tijd inzit. Het is een stack, geen vervanging.',
      },
      {
        q: 'Wat kost het om een Zapier-flow te vervangen door een AI-agent?',
        a: 'Hangt af van wat de Zap doet. Vaste-trigger-flows met simpele velden zijn vaak prima in Zapier. Maar als u een Zap heeft die "een mail leest en dan iets doet" en daar regelmatig fouten in voorkomen, is vervangen door een agent meestal binnen één tot twee maanden terugverdiend door minder fouten en minder bijstuurwerk.',
      },
    ],
  },
  {
    slug: 'ai-agent-vs-erp-automatisering',
    alternative: 'ERP-automatisering',
    alternativeColumnLabel: 'Automatisering in uw ERP of CRM',
    pageTitle: 'AI-agent of ERP-automatisering: wat is het verschil?',
    metaDescription:
      'Doet uw ERP dit al? Vaak voor een deel. Hier staat waar de grens ligt tussen automatisering in uw eigen pakket en een AI-agent, en wanneer u beter uw ERP of een koppeltool gebruikt.',
    heroEyebrow: 'Vergelijking · agent vs ERP-automatisering',
    heroTitle: '\u201cDat doet ons ERP toch al?\u201d',
    heroItalic: 'Voor een deel, ja.',
    intro:
      'Dit is de meest gestelde vraag in onze eerste gesprekken, en meestal is het antwoord: voor een deel, ja. Hieronder staat waar de grens ligt.',
    whenAgent: [],
    whenAlternative: [],
    geenAgentNodig:
      'Als een taak in vaste regels te vangen is en de input altijd uit dezelfde velden komt, gebruik dan uw ERP of een koppeltool. Dat is goedkoper, sneller en beter te onderhouden. Wij zeggen dat ook gewoon in het eerste gesprek. Een agent is pas zinnig zodra er geoordeeld moet worden of gerekend met gegevens die niemand nu combineert.',
    vultElkaarAan:
      'In de praktijk vervangt een agent uw pakket niet. Hij zit ernaast: hij leest eruit, denkt na en zet een handeling klaar die vervolgens in uw pakket wordt uitgevoerd. Uw administratie blijft de bron van waarheid.',
    rows: [
      { feature: 'Werkt op basis van', agent: 'Regels plus interpretatie van tekst, bijlagen en context', alternative: 'Vaste regels die u vooraf instelt' },
      { feature: 'Input', agent: 'Mails, documenten, foto\u2019s, notities, én uw velden', alternative: 'Gestructureerde velden' },
      { feature: 'Bij een uitzondering', agent: 'Beoordeelt, onderbouwt of legt het voor aan een mens', alternative: 'Stopt of geeft een foutmelding' },
      { feature: 'Rekent met historie', agent: 'Leidt er patronen uit af en trekt er een conclusie uit', alternative: 'Toont die in een rapportage' },
      { feature: 'Tussen twee pakketten', agent: 'Leest beide en handelt in beide', alternative: 'Vraagt een koppeling of een export' },
      { feature: 'Verantwoording', agent: 'Elke stap, bron en afweging teruggekeken', alternative: 'Logregel van de handeling' },
    ],
    conclusion:
      'Uw pakket is niet het probleem, het houdt alleen ergens op. Alles wat in vaste regels te vangen is, hoort thuis in uw ERP of CRM. Het werk dat overblijft vraagt oordeel of rekenwerk met gegevens die nu naast elkaar liggen zonder gecombineerd te worden. Daar bouwen wij, en het resultaat gaat altijd langs een mens voordat er iets de deur uit gaat.',
    faq: [
      {
        q: 'Vervangt een AI-agent ons ERP?',
        a: 'Nee. De agent leest uit uw pakket, denkt na en zet een handeling klaar die vervolgens in uw pakket wordt uitgevoerd. Uw administratie blijft de bron van waarheid.',
      },
      {
        q: 'Wanneer heb ik geen agent nodig?',
        a: 'Als de taak in vaste regels te vangen is en de input altijd uit dezelfde velden komt. Gebruik dan uw ERP of een koppeltool: goedkoper, sneller en beter te onderhouden. Dat zeggen wij ook gewoon in het eerste gesprek.',
      },
      {
        q: 'Onze leverancier zegt dat er AI in het pakket zit. Is dat hetzelfde?',
        a: 'Dat verschilt per pakket. De vraag die telt: kan het omgaan met een mail waarvan de inhoud niet in een veld staat, en kan het uitrekenen dat er iets níét is gebeurd? Kan het dat, dan heeft u ons niet nodig voor dat proces.',
      },
    ],
  },
];

export const COMPARISON_BY_SLUG = COMPARISONS.reduce<Record<string, Comparison>>((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {});
