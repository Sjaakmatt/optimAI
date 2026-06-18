export type PostBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'quote'; text: string; by?: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'divider' };

export interface PostFAQ {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  title: string;
  lede: string;
  author: string;
  published: string; // ISO date
  updated?: string; // ISO date — last meaningful edit
  readingMinutes: number;
  tags: string[];
  blocks: PostBlock[];
  faq?: PostFAQ[];
  cluster?: 'A' | 'B' | 'C' | 'D' | 'E';
  generatedBy?: 'human' | 'ai-draft';
}

export const POSTS: Post[] = [
  {
    slug: 'waarom-mkb-nu-klaar-is-voor-ai-agents',
    title: 'Waarom het MKB nu klaar is voor AI-agents',
    lede:
      'Drie jaar geleden konden agents niet goed genoeg werk afleveren om ze los te laten op klantmails. Dat is dit jaar veranderd. De gevolgen zijn groter voor kleine bedrijven dan voor grote.',
    author: 'Sjaak ter Veld',
    published: '2026-03-12',
    readingMinutes: 6,
    tags: ['MKB', 'agents', 'trends'],
    blocks: [
      {
        kind: 'p',
        text:
          'Iedereen heeft de afgelopen twee jaar wel iets gedemonstreerd gekregen met generatieve AI. Chatbots, tekstgeneratoren, plaatjes. Leuk, niet altijd bruikbaar. Dat is in 2025 en 2026 fundamenteel gekanteld. Niet zozeer omdat de modellen slimmer zijn (dat ook), maar omdat het tooling-landschap er omheen volwassen is geworden.',
      },
      { kind: 'h2', text: 'Wat er praktisch veranderd is' },
      {
        kind: 'list',
        items: [
          'Agents kunnen betrouwbaar koppelen met bestaande systemen. E-mail, boekhoudpakket, CRM, magazijn.',
          'Beleidsregels zijn niet meer een stuk prompt, maar een configureerbare laag die mensen zelf kunnen aan/uitzetten.',
          'Hallucineren komt nog voor, maar is voorspelbaar en af te vangen met checks.',
          'Integraties zijn met een paar dagen werk te bouwen, niet met een paar maanden.',
        ],
      },
      { kind: 'h2', text: 'Waarom juist het MKB nu stappen kan maken' },
      {
        kind: 'p',
        text:
          'Grote concerns hebben in hun backoffice al veel geautomatiseerd. SAP, Oracle, custom workflows. Voor hen is een AI-agent een extra schil bovenop bestaande automatisering. Interessant, maar niet levensveranderend.',
      },
      {
        kind: 'p',
        text:
          'Bij MKB-bedrijven is de situatie omgekeerd. Veel wordt nog via mail en Excel gedaan. Eén goed gebouwde agent neemt daar direct 30-60% van de administratieve tijd weg. De impact is groter, de bouwtijd korter, de ROI meetbaar binnen één maand.',
      },
      {
        kind: 'quote',
        text:
          'De dingen die grote bedrijven in 2005 met ERP deden (standaardiseren, koppelen, automatiseren) kan een MKB\u2019er nu in één kwartaal met een agent.',
      },
      { kind: 'h2', text: 'Wat dit betekent voor 2026' },
      {
        kind: 'p',
        text:
          'Wij verwachten dat de bedrijven die nu beginnen over twee jaar een onhaalbare voorsprong hebben in hun branche. Niet omdat ze “meer met AI doen”, maar omdat ze met dezelfde bezetting 30% meer omzet draaien. Dat vertaalt zich naar investeringsruimte, inkoopkracht, en werksnelheid richting klanten.',
      },
      {
        kind: 'p',
        text:
          'De adoptiecurve loopt hard. Maar in tegenstelling tot eerdere technologische golven is de instapdrempel laag. Eén agent, vaste prijs, één tot twee weken live voor de eerste versie. Geen groot project-bord nodig.',
      },
    ],
    faq: [
      {
        q: 'Waarom is nu het juiste moment voor een MKB-bedrijf om met AI-agents te starten?',
        a: 'Omdat het tooling-landschap rond generatieve AI in 2025 en 2026 volwassen is geworden. Agents kunnen betrouwbaar koppelen met bestaande systemen, beleidsregels zijn configureerbaar geworden, en integraties kosten dagen in plaats van maanden. MKB-bedrijven hebben vaak nog veel via mail en Excel — daar neemt één goed gebouwde agent direct 30 tot 60 procent van de administratieve tijd weg.',
      },
      {
        q: 'Hebben grote bedrijven geen voorsprong met AI?',
        a: 'Niet in deze golf. Grote concerns hebben in hun backoffice al veel geautomatiseerd met SAP, Oracle of custom workflows. Voor hen is een AI-agent een extra schil. Bij MKB-bedrijven is de impact groter omdat de uitgangspositie minder geautomatiseerd is. De bouwtijd is korter, de ROI meetbaar binnen één maand.',
      },
      {
        q: 'Wat als ik nu niet instap?',
        a: 'Bedrijven die nu beginnen hebben over twee jaar een meetbare voorsprong in hun branche. Niet omdat ze "meer met AI doen", maar omdat ze met dezelfde bezetting 30 procent meer omzet draaien. Dat vertaalt zich naar investeringsruimte, inkoopkracht en werksnelheid richting klanten.',
      },
    ],
  },
  {
    slug: 'guardrails-niet-een-rem-maar-een-kompas',
    title: 'Guardrails: niet een rem, maar een kompas',
    lede:
      'De grootste angst bij agents: “straks doet hij iets stoms wat mij geld kost”. Terecht. Maar de oplossing is niet de agent kleiner maken. De oplossing is expliciete beleidsregels.',
    author: 'Sjaak ter Veld',
    published: '2026-02-22',
    readingMinutes: 5,
    tags: ['guardrails', 'beleid', 'governance'],
    blocks: [
      {
        kind: 'p',
        text:
          'Elke agent die wij bouwen heeft een laag met beleidsregels erboven. Die laag bepaalt wat automatisch mag, en wat langs een mens moet. De MKB’er stelt deze regels zelf in, en kan ze elke dag aanpassen als hij voortschrijdend inzicht heeft.',
      },
      { kind: 'h2', text: 'Voorbeelden uit de praktijk' },
      {
        kind: 'list',
        items: [
          'Bedragen boven € 5.000 altijd langs directie.',
          'Overheidsklanten: betaaltermijn standaard 30 dagen, geen aanbetaling.',
          'Klanten met >10 orders en 0 klachten: coulance toepassen zonder discussie over schuldvraag.',
          'Bij vertraging: alternatief transporteur inschakelen tot € 200 meerkosten.',
          'Drie herinneringen, dan juridisch. Tenzij de klantgeschiedenis iets anders zegt.',
        ],
      },
      { kind: 'h2', text: 'Waarom dit zo goed werkt' },
      {
        kind: 'p',
        text:
          'Omdat beleid expliciet wordt. De impliciete kennis die tot nu toe alleen in het hoofd van Saskia op finance zat (\u201cdie klant bellen we eerst\u201d) komt nu op een plek waar iedereen het kan zien en bijstellen.',
      },
      {
        kind: 'p',
        text:
          'Bij uitval van Saskia valt de kennis niet weg. Bij een nieuwe medewerker hoef je niet maandenlang te coachen op intuïtie. De regels staan, de agent volgt ze, en als je het beleid wil veranderen, verander je één schakelaar.',
      },
      {
        kind: 'quote',
        text:
          'Een goed gebouwde agent is een organisatie met expliciet beleid. Zo simpel is het.',
      },
      { kind: 'h2', text: 'Wat mensen fout doen' },
      {
        kind: 'list',
        items: [
          'Te veel regels in één keer. Begin met vijf tot tien per afdeling. Breid uit als je merkt waar de vragen liggen.',
          'Beleid niet bijhouden. Als je regels niet elke maand even tegen het licht houdt, verouderen ze.',
          'Beleid en techniek door elkaar halen. De regel \u201cniet juridisch bij trouwe klant\u201d staat los van hoe de agent het technisch implementeert.',
        ],
      },
    ],
  },
  {
    slug: 'dashboards-die-niemand-opent',
    title: 'Dashboards die niemand opent',
    lede:
      'De laatste 20 jaar is elk SaaS-bedrijf beloond voor het bouwen van een dashboard. En elke MKB’er heeft logins voor 14 daarvan, waar hij er hooguit 2 regelmatig gebruikt. AI-agents werken beter zonder.',
    author: 'Sjaak ter Veld',
    published: '2026-02-03',
    readingMinutes: 4,
    tags: ['filosofie', 'UX', 'tooling'],
    blocks: [
      {
        kind: 'p',
        text:
          'Elke keer als we bij een MKB-klant binnenlopen, is het eerste gesprek hetzelfde. “Welke software gebruikt u?” Het antwoord: een lijst van 8-15 tools, waarvan de helft door één specifieke medewerker wordt bediend. De baas heeft logins, maar kijkt er zelden naar.',
      },
      {
        kind: 'p',
        text:
          'Dat is geen gebrek aan interesse. Dat is een gebrek aan tijd. Een dashboard vraagt actie: inloggen, filter instellen, grafiek interpreteren. Als de antwoorden niet urgent zijn, gebeurt het niet.',
      },
      { kind: 'h2', text: 'Wat werkt dan wel' },
      {
        kind: 'p',
        text:
          'Wij bouwen agents die zelf naar u toe komen met dingen die uw aandacht nodig hebben. Geen dashboard. Een belnotitie die klaarstaat. Een klantmail die niet is verzonden omdat het bedrag boven uw mandaat valt. Een werkbak met drie zaken die u kort moet afvinken.',
      },
      {
        kind: 'quote',
        text:
          'Als u de app nog moet openen om iets te zien, dan is het te laat. Goede automatisering komt uw bureau op.',
      },
      { kind: 'h2', text: 'Concrete implicaties' },
      {
        kind: 'list',
        items: [
          'In plaats van een KPI-dashboard: een maandrapport per e-mail met drie zinnen.',
          'In plaats van een CRM-scherm: een belnotitie in de inbox van de verantwoordelijke.',
          'In plaats van een voorraad-alert-app: de agent die zelf al een inkooporder heeft klaargezet.',
        ],
      },
      {
        kind: 'p',
        text:
          'Het idee is simpel: u heeft geen tijd om een tool te bedienen. Dus bouwen we iets dat zelf komt aanlopen.',
      },
    ],
  },
  {
    slug: 'welk-proces-is-geschikt-voor-een-agent',
    title: 'Welk proces is geschikt voor een agent? En welk niet?',
    lede:
      'Niet elk proces hoort in handen van een AI-agent. Een simpel filter om vooraf te bepalen wat wel en niet werkt, voordat u begint te bouwen.',
    author: 'Sjaak ter Veld',
    published: '2026-01-15',
    readingMinutes: 5,
    tags: ['strategie', 'proces', 'selectie'],
    blocks: [
      {
        kind: 'p',
        text:
          'De meest gestelde vraag in een eerste kennismakingsgesprek: "Zou dit voor ons werken?" Eerlijk antwoord: meestal wel, maar niet per se op het proces dat u zelf voor ogen heeft. In acht jaar IT heb ik gezien dat de keuze waar je begint minstens zo belangrijk is als wat je bouwt.',
      },
      { kind: 'h2', text: 'Drie vragen die het meeste werk schelen' },
      {
        kind: 'p',
        text:
          'Ik loop altijd drie filters af voordat we aan iets beginnen. Simpel genoeg om ze zelf op uw proces toe te passen.',
      },
      {
        kind: 'list',
        items: [
          'Gebeurt dit vaker dan twee keer per week? Onder die drempel is de bouwtijd zelden terug te verdienen. Zelfs niet bij een lang proces.',
          'Zijn de regels te beschrijven? Als uw medewerker het zelf moeilijk kan uitleggen aan een nieuwe collega, wordt het voor een agent ook lastig.',
          'Heeft het een duidelijk begin én einde? Processen die eindigen in "en dan hangt het van Jan af" zijn nog niet klaar voor automatisering.',
        ],
      },
      { kind: 'h2', text: 'Waar het vaak goed werkt' },
      {
        kind: 'p',
        text:
          'Klantmails met een voorspelbaar patroon. Offertes op basis van actuele prijslijst. Orderverwerking waar kredietcheck en voorraadcheck in elkaar schuiven. Factureren na oplevering. Belnotities voor finance wanneer een factuur lang openstaat. Dit zijn routinematige, regel-gebaseerde stromen. Ideaal terrein.',
      },
      { kind: 'h2', text: 'Waar het juist fout gaat' },
      {
        kind: 'p',
        text:
          'Onderhandelingen over grote projecten. Conflicten tussen klanten of medewerkers. Beoordelen of een klacht terecht is in grensgevallen. Strategische leverancierskeuzes. Alles wat draait om intuïtie of relationele nuance. Laat dat bij uw mensen.',
      },
      {
        kind: 'quote',
        text:
          'De vuistregel: de agent doet wat u kunt uitleggen in tien regels; de mens doet de rest.',
      },
      { kind: 'h2', text: 'Een tegen-intuïtieve observatie' },
      {
        kind: 'p',
        text:
          'Ondernemers willen vaak beginnen bij het proces dat hen persoonlijk het meest irriteert. Vaak iets complex. Mijn advies is bijna altijd: begin bij het allersaaiste, allervoorspelbaarste proces. Dat staat live in zes weken, uw mensen merken meteen de winst, en daarna mag u de complexe dingen aanpakken.',
      },
    ],
  },
  {
    slug: 'eerste-agent-is-nooit-de-belangrijkste',
    title: 'Uw eerste agent is nooit de belangrijkste',
    lede:
      'We zijn geneigd om meteen het grote probleem op te lossen. Bij AI-agents is dat een fout. De eerste agent moet iets anders doen. Pas daarna kijkt u naar de rest.',
    author: 'Sjaak ter Veld',
    published: '2026-01-29',
    readingMinutes: 4,
    tags: ['methodiek', 'strategie', 'adoptie'],
    blocks: [
      {
        kind: 'p',
        text:
          'In de bedrijfskunde-boeken staat één principe dat in mijn werkpraktijk het meest waarde heeft opgeleverd: "start where the fire is small, not where it\u2019s big". Bij AI-agents geldt het dubbel.',
      },
      { kind: 'h2', text: 'Waarom de grote klus wacht' },
      {
        kind: 'p',
        text:
          'Ondernemers komen vaak met hun grootste pijn binnen. "Onze offertes duren dagen." Of: "Onze klantafhandeling loopt vast." Dat is begrijpelijk. Daar lekt geld weg. Maar als de eerste agent meteen het grote proces moet tackelen, loopt u twee risico\u2019s.',
      },
      {
        kind: 'list',
        items: [
          'De bouwtijd is langer, de feedback-lus langer, de kans op halverwege vastlopen groter.',
          'Uw mensen hebben nog geen ervaring met hoe u een agent bijstuurt. Juist bij complex werk wil je die ervaring al hebben.',
          'Eén grote tegenvaller bij de start doodt het draagvlak voor een jaar.',
        ],
      },
      { kind: 'h2', text: 'Wat de eerste agent wél moet doen' },
      {
        kind: 'p',
        text:
          'Iets kleins, iets snels, iets met duidelijk resultaat binnen één tot twee weken. Ontvangstbevestiging op inkomende mails. Automatisch een concept-factuur klaarzetten na oplevering. Voorraadsignalen die een inkooporder klaarzetten. Dingen waar weinig risico aan zit en waar uw mensen de winst direct voelen.',
      },
      {
        kind: 'quote',
        text:
          'Een eerste agent is een trainingspartner, geen oplosser. Hij leert úw organisatie hoe agents werken.',
      },
      { kind: 'h2', text: 'Wat er dan gebeurt' },
      {
        kind: 'p',
        text:
          'Uw mensen ontdekken binnen twee weken hoe ze een beleidsregel aanpassen. U ziet in één maand hoe werkitems door uw bedrijf lopen. Twijfels over privacy, grip en fouten maken worden concreet. En daarmee oplosbaar. Pas dan kunt u aan de grote klus beginnen, met teamkennis waar u eerst niet over beschikte.',
      },
      {
        kind: 'p',
        text:
          'Bedrijven die dit pad kiezen hebben binnen een jaar drie tot vijf agents draaien. Bedrijven die meteen de grote klus aanpakken hebben er vaak nog nul. Of één die moeizaam loopt. Dit is geen theorie. Dit is wat we zien.',
      },
    ],
  },
  {
    slug: 'integraties-makkelijker-dan-u-denkt',
    title: 'Integraties met bestaande systemen: makkelijker dan u denkt',
    lede:
      'De grootste aarzeling die ik hoor: "wij hebben een oud boekhoudpakket, dat werkt nooit". In 90% van de gevallen valt dat reuze mee. Hoe het technisch werkt, zonder jargon.',
    author: 'Sjaak ter Veld',
    published: '2026-02-12',
    readingMinutes: 5,
    tags: ['integraties', 'techniek', 'systemen'],
    blocks: [
      {
        kind: 'p',
        text:
          'Als iemand me vertelt dat hun systeem "niet koppelbaar" is, ga ik daar altijd even voor zitten. In acht jaar ben ik er één echt niet-koppelbaar systeem tegengekomen. Meestal is de vraag niet óf het kan, maar hoe netjes het kan.',
      },
      { kind: 'h2', text: 'Drie manieren om te koppelen' },
      {
        kind: 'p',
        text:
          'Elk pakket biedt er wel één van aan. Vaak zelfs meer. Hier is het spectrum van mooi naar lelijk:',
      },
      {
        kind: 'list',
        items: [
          'API: directe koppeling, real-time, meest elegant. Exact, Moneybird, AFAS, Snelstart, Odoo. Allemaal via API. Koppelen kost een paar dagen.',
          'Webhooks: het systeem roept ons als er iets gebeurt. Ideaal voor "factuur verstuurd" of "order gewijzigd" meldingen.',
          'E-mail en bestand: het oude werkpaard. Veel boekhoudsystemen kunnen automatisch mails versturen met een factuur als PDF. Wij lezen die uit en verwerken ze. Niet elegant, wel betrouwbaar.',
        ],
      },
      { kind: 'h2', text: 'Wat vaak blokkeert en waarom dat oplosbaar is' },
      {
        kind: 'p',
        text:
          'Oude systemen hebben soms geen mooie API. Dat hoeft geen probleem te zijn. Als u bijvoorbeeld handmatig CSV-exports downloadt, kunnen wij dat nabootsen. Of we installeren een kleine "bridge" die dat voor u automatiseert. Niet sexy, wel effectief.',
      },
      {
        kind: 'quote',
        text:
          'Een agent die met uw systeem "praat via e-mail" is minder elegant dan één met API. Maar de besparing aan werktijd is identiek.',
      },
      { kind: 'h2', text: 'Wat u vooraf moet aanleveren' },
      {
        kind: 'list',
        items: [
          'Naam en versie van uw boekhoudpakket / CRM / magazijn-app.',
          'Inloggegevens voor een testomgeving (liefst) of een account met beperkte rechten.',
          'Eén concreet voorbeeld van wat u wilt dat de agent doet met dat systeem ("factuur klaarzetten na oplevering").',
        ],
      },
      { kind: 'h2', text: 'Wat we doen in de eerste week' },
      {
        kind: 'p',
        text:
          'We zetten een testkoppeling op voordat we überhaupt aan de agent beginnen. Als die technisch werkt, kunnen we doorbouwen. Als hij rammelt, melden we dat meteen. U krijgt nooit de factuur van een agent die niet aan uw systeem gaat praten.',
      },
    ],
    faq: [
      {
        q: 'Kan een AI-agent koppelen met Exact, Moneybird, AFAS of Snelstart?',
        a: 'Ja. Alle gangbare Nederlandse boekhoudpakketten (Exact, Moneybird, AFAS, Snelstart, Odoo) hebben een API die wij gebruiken voor directe, real-time koppeling. Aansluiten kost doorgaans een paar dagen.',
      },
      {
        q: 'Wat als mijn systeem geen API heeft?',
        a: 'Dat is zelden een blokkade. Wij kunnen ook werken via webhooks, e-mail-doorstromingen met PDF-bijlagen, of een kleine bridge die handmatige CSV-exports nabootst. Niet elegant, wel effectief en betrouwbaar.',
      },
      {
        q: 'Wat moet ik vooraf aanleveren voor een integratie?',
        a: 'Naam en versie van uw boekhoudpakket, CRM of magazijn-app; inloggegevens voor een testomgeving of een account met beperkte rechten; en één concreet voorbeeld van wat de agent met dat systeem moet doen (bijvoorbeeld "factuur klaarzetten na oplevering").',
      },
      {
        q: 'Hoe weet ik zeker dat de koppeling werkt voordat ik betaal?',
        a: 'Wij zetten in de eerste week een testkoppeling op, voordat we aan de eigenlijke agent beginnen. Werkt die technisch, dan bouwen we door. Rammelt hij, dan melden we dat direct. U krijgt nooit een factuur voor een agent die niet aan uw systeem praat.',
      },
    ],
  },
  {
    slug: 'wat-een-agent-betekent-voor-uw-boekhouder',
    title: 'Wat AI-agents betekenen voor uw boekhouder',
    lede:
      'Veel boekhouders worden in eerste instantie zenuwachtig van dit verhaal. Terecht gedeeltelijk. Maar de goede blijven, en krijgen leuker werk.',
    author: 'Sjaak ter Veld',
    published: '2026-03-01',
    readingMinutes: 4,
    tags: ['boekhouder', 'samenwerking', 'rolverandering'],
    blocks: [
      {
        kind: 'p',
        text:
          'Zodra we een agent bouwen die facturen verwerkt, vragen ondernemers me steevast: "Wat moet ik tegen mijn boekhouder zeggen?" Eerlijke observatie: die gesprekken zijn de afgelopen twee jaar beter geworden.',
      },
      { kind: 'h2', text: 'Wat boekhouders vroeger deden' },
      {
        kind: 'p',
        text:
          'Boekingen categoriseren. Facturen inkloppen. BTW-categorieën kiezen. Bonnetjes matchen met uitgaven. Dat was voor veel boekhouders de helft van hun maand. Hier moet ik eerlijk zijn: dat werk verdwijnt. Niet volgend jaar. Nu al.',
      },
      { kind: 'h2', text: 'Wat ervoor in de plaats komt' },
      {
        kind: 'p',
        text:
          'Analyse. Advies. Anticiperen. Een goede boekhouder kijkt niet meer naar wat er gebeurd is. Hij kijkt naar wat er gaat gebeuren en adviseert u daarop. Cashflow-prognoses met scenario\u2019s. Fiscale optimalisatie die voorheen geen tijd toestond. Gesprekken over investeringsbeslissingen.',
      },
      {
        kind: 'list',
        items: [
          'De saaie uren worden automatisch, de interessante uren blijven van mensen.',
          'Accountantskantoren die dit omarmen groeien in omzet per klant, ondanks minder uren.',
          'Klanten (u dus) krijgen meer waarde voor hetzelfde budget.',
        ],
      },
      {
        kind: 'quote',
        text:
          'Een boekhouder die bang wordt van een agent doet werk dat vanzelf verdwijnt. Een boekhouder die blij wordt, ziet de ruimte die vrijkomt.',
      },
      { kind: 'h2', text: 'Hoe u het gesprek aanpakt' },
      {
        kind: 'p',
        text:
          'Nodig uw boekhouder uit bij het eerste gesprek met ons. Serieus. Het gaat een stuk makkelijker als hij of zij vanaf het begin meedenkt over welke boekingen automatisch mogen, welke categorisaties standaard zijn, en hoe rare uitzonderingen opgevangen worden. De boekhouders die meedenken worden vaak uw grootste fan. Hun werkdag wordt namelijk een stuk aangenamer.',
      },
    ],
  },
  {
    slug: 'verborgen-kosten-van-handmatig-werk',
    title: 'De verborgen kosten van handmatig werk',
    lede:
      'Uw jaarrekening laat ze niet zien. Uw planning rekent er niet mee. Toch zijn ze reëel. Bij veel MKB-bedrijven zelfs groter dan wat een agent kost. Een rekensom die u zelf kunt maken.',
    author: 'Sjaak ter Veld',
    published: '2026-03-22',
    readingMinutes: 5,
    tags: ['ROI', 'financieel', 'efficiency'],
    blocks: [
      {
        kind: 'p',
        text:
          'Wanneer ik in een eerste gesprek vraag wat een klantmail uw binnendienst kost, krijg ik zelden een getal. Begrijpelijk. Niemand meet dat. Maar zodra we samen de rekensom maken, schrikt bijna iedereen.',
      },
      { kind: 'h2', text: 'De harde kosten die iedereen ziet' },
      {
        kind: 'p',
        text:
          'Uurloon van uw medewerker. Sociale lasten. Werkplek, ICT, koffie, kerstpakket. Samen gemiddeld € 29 tot 35 per uur bij een MKB-binnendienstfunctie. Die kent u wel.',
      },
      { kind: 'h2', text: 'De zachte kosten die onzichtbaar zijn' },
      {
        kind: 'list',
        items: [
          'Context-switching: elke onderbreking voor een mail kost 15 minuten voordat uw medewerker weer in flow zit. Een dag met 8 onderbrekingen = 2 uur verloren concentratie.',
          'Stapelwerk: mails die blijven liggen omdat ze niet urgent zijn. Tegen 16:00 staat er een stapel die tegen sluitingstijd nog moet.',
          'Fouten onder tijdsdruk: een verkeerd afgewerkte klacht kost een klantrelatie. Niet altijd zichtbaar, wel structureel.',
          'Ziekteverzuim door overbelasting: MKB-binnendiensten zijn gemiddeld vaker ziek dan gemiddelde medewerkers. Het werk vreet.',
          'Reputatie: trage reacties kosten opdrachten. U merkt het niet. De klant kiest gewoon iemand anders zonder u te vertellen waarom.',
        ],
      },
      { kind: 'h2', text: 'De rekensom' },
      {
        kind: 'p',
        text:
          'Reken het simpel door. Eén medewerker, 40 uur per week, doet naar schatting 30% administratief werk dat automatiseerbaar is. Dat is 12 uur per week, 520 uur per jaar. Tegen € 30 komt u op € 15.600 directe kosten. Voor één medewerker. Bij drie medewerkers die dat doen: bijna € 50.000.',
      },
      {
        kind: 'quote',
        text:
          'Een agent hoeft niet 90% van het werk over te nemen om zich terug te verdienen. 30% is al genoeg.',
      },
      { kind: 'h2', text: 'Wat rekeningen niet laten zien' },
      {
        kind: 'p',
        text:
          'De échte winst zit in wat uw mensen met die uren gaan doen. Meer klantgesprekken, betere offertes, nieuwe producten uitzoeken, complexer werk oppakken. Dát is de groei die u op papier niet kunt plannen. Hij ontstaat zodra de ruimte er is.',
      },
      {
        kind: 'p',
        text:
          'Ik heb bedrijven gezien die 20% in omzet groeiden zonder extra mensen aan te nemen, puur door die ruimte. Niet omdat de agent iets magisch deed, maar omdat de mensen eindelijk iets magisch konden doen.',
      },
    ],
  },
  {
    slug: 'uw-medewerkers-willen-dit',
    title: 'Uw medewerkers willen dit. Ze weten het alleen nog niet',
    lede:
      'De grootste angst van ondernemers: "mijn mensen denken dat ik ze vervang". In de praktijk gebeurt meestal het tegenovergestelde, mits je het op de juiste manier introduceert.',
    author: 'Sjaak ter Veld',
    published: '2026-04-05',
    readingMinutes: 5,
    tags: ['adoptie', 'cultuur', 'mensen'],
    blocks: [
      {
        kind: 'p',
        text:
          'Ik zit vaak aan tafel met ondernemers die aarzelen om bij hun team ter sprake te brengen dat we een agent gaan bouwen. "Straks denken ze dat ik ze weg-automatiseer." Begrijpelijk. Maar de aarzeling werkt tegen u.',
      },
      { kind: 'h2', text: 'Wat er gebeurt als u niks zegt' },
      {
        kind: 'p',
        text:
          'Uw team hoort het via via. Ze vullen zelf in wat het betekent. De meest bekwame mensen, degenen die weten hoe ze elders terechtkunnen, gaan oriënteren. De minder mobiele mensen worden bang en verbergen fouten. Beide kosten u meer dan de agent oplevert.',
      },
      { kind: 'h2', text: 'Wat er gebeurt als u het eerlijk brengt' },
      {
        kind: 'p',
        text:
          'Op een goed moment in een teammeeting: "We gaan iets proberen dat een deel van onze administratie moet wegnemen. Niet om mensen weg te halen. Om ruimte te maken voor het werk waar we goed in zijn. Jullie denken mee over wat wel en niet mag."',
      },
      {
        kind: 'list',
        items: [
          'Binnen een week komen de eerste goede ideeën binnen. "Kan hij ook bevestigingsmails sturen?" "Kan hij de offertes alvast opstellen?"',
          'De mensen die uw bedrijf kennen worden mede-bouwers van de agent. Ze weten beter dan u wat er fout kan gaan.',
          'De angst verandert in nieuwsgierigheid. Mensen gaan zelf vragen waar hun werkdag beter kan.',
        ],
      },
      { kind: 'h2', text: 'Waarom het werkt' },
      {
        kind: 'p',
        text:
          'Weinig mensen geven toe dat ze graag mails zouden doen, factuurtjes inkloppen of dezelfde bestelling voor de vijfde keer deze week plaatsen. Het saaie werk is echt saai. Uw mensen hopen ergens dat het verdwijnt. Maar ze verwachten dat niet van u, omdat het "nu eenmaal zo is". Als u laat zien dat u daar iets aan kunt doen, verandert de sfeer.',
      },
      {
        kind: 'quote',
        text:
          'De medewerkers die aanvankelijk het meest sceptisch waren, zijn na drie maanden onze grootste fans. Die hadden het meeste saaie werk te verliezen.',
        by: 'Eigenaar installatiebedrijf, 22 mensen',
      },
      { kind: 'h2', text: 'Concreet: hoe u het gesprek opent' },
      {
        kind: 'list',
        items: [
          'Noem het doel eerst: ruimte maken voor het werk waar jullie goed in zijn.',
          'Wees eerlijk over wat er mogelijk verdwijnt (vaak routine-administratie).',
          'Vraag hun hulp om de beleidsregels op te stellen. Zij kennen de uitzonderingen.',
          'Beloof een maandelijks kort moment om bij te sturen. Geen eenzijdig proces.',
        ],
      },
    ],
  },
  {
    slug: 'vaste-bouwprijs-en-retainer',
    title: 'Vaste bouwprijs én een retainer die meegroeit',
    lede:
      'Een AI-agent is geen statisch product. Daarom werken wij met een vaste bouwprijs plus een optionele maandelijkse retainer. U kiest zelf welke variant bij uw bedrijf past.',
    author: 'Sjaak ter Veld',
    published: '2026-04-14',
    readingMinutes: 5,
    tags: ['pricing', 'retainer', 'onderhoud', 'transparantie'],
    blocks: [
      {
        kind: 'p',
        text:
          'In elk eerste gesprek komt de vraag: "En wat kost dat?" Dat antwoord begint bij ons met een onderscheid dat voor veel ondernemers wennen is. Wij werken met een vaste prijs voor de bouw, én een maandelijkse retainer voor daarna. Die retainer is niet verplicht — u kiest zelf of u hem afneemt. Maar hij is wel belangrijk voor veel klanten. Hieronder leg ik uit waarom.',
      },
      { kind: 'h2', text: 'De bouw: één vaste prijs' },
      {
        kind: 'p',
        text:
          'Voor het ontwerp, de bouw en de implementatie van uw agent leveren wij een vaste prijs. Vooraf, op één A4, met opleveringsdatum. Geen uurtje-factuurtje, geen meerwerk-discussies tijdens de rit. Loopt het uit, dan is dat ons probleem, niet uw factuur. Zo weet u precies wat u koopt en wat u terugkrijgt.',
      },
      { kind: 'h2', text: 'De retainer: waarom die er is' },
      {
        kind: 'p',
        text:
          'Een AI-agent is iets anders dan een Excel-sheet of een installatie uit 2008 die decennia blijft werken zoals hij was. Rondom uw agent beweegt voortdurend van alles:',
      },
      {
        kind: 'list',
        items: [
          'Taalmodellen worden elk kwartaal beter én goedkoper. Als we niet meekijken, betaalt u volgend jaar te veel voor minder kwaliteit.',
          'Uw processen veranderen. Klantgroepen komen erbij, beleidsregels schuiven, seizoensdrukte verandert. De agent moet meebewegen.',
          'Uw externe systemen krijgen updates. Boekhoudpakket een API-wijziging, e-mailserver nieuwe authenticatie, CRM een interfaceverandering.',
          'Guardrails vragen aandacht. Nieuwe uitzonderingen leren de agent wat er automatisch mag en wat langs een mens moet.',
          'Monitoring is geen luxe. Je wilt weten dat de agent doet wat hij hoort te doen, en dat zijn logboek klopt.',
        ],
      },
      {
        kind: 'p',
        text:
          'Dat alles valt in de retainer. Concreet: monitoring van agent-prestaties, periodieke review van beleidsregels, model-updates zodra er betere of goedkopere uitkomen, beveiligings- en integratie-updates, kleine wijzigingen zonder extra factuur, en een maandelijks onderhoudsgesprek van een half uur.',
      },
      {
        kind: 'quote',
        text:
          'Een agent die stilstaat, raakt vanzelf achterop. Een agent die meegroeit, blijft waarde leveren zolang uw bedrijf dat doet.',
      },
      { kind: 'h2', text: 'Of alleen implementatie — ook prima' },
      {
        kind: 'p',
        text:
          'U bent niet verplicht een retainer af te nemen. Sommige ondernemers willen eerst zien wat de agent doet, en pas later beslissen of ze onderhoud inkopen. Ook goed. Dan koopt u alleen de bouw, de agent draait op uw infrastructuur of op die van ons, en bijstellen gaat ad hoc tegen een vaste prijs per wijziging. U heeft dan alle vrijheid, maar ook alle verantwoordelijkheid voor het meegroeien.',
      },
      {
        kind: 'p',
        text:
          'In de praktijk kiest het merendeel van onze klanten voor een retainer, omdat de investering zich vertienvoudigt zodra de agent blijft meebewegen met uw bedrijf. Maar het is altijd úw keuze.',
      },
      { kind: 'h2', text: 'Wat níét in de retainer zit' },
      {
        kind: 'p',
        text:
          'Grote uitbreidingen. Nieuwe scenario\u2019s, extra integraties, een agent erbij voor een andere afdeling. Dat krijgt een eigen vaste-prijs-offerte. Zo blijft de retainer helder en voorspelbaar, en betaalt u alleen voor waar u om vraagt.',
      },
      { kind: 'h2', text: 'Hoe dit voor u uitpakt' },
      {
        kind: 'p',
        text:
          'Nederlandse MKB-ondernemers zijn op dit punt pragmatisch. U wil weten wat iets kost en wat u ervoor terugkrijgt. Niet een maandbedrag zonder duidelijke tegenprestatie. Daarom is de retainer inhoudelijk concreet gemaakt: u weet wat erin zit, u weet wat erbuiten valt, en u kiest zelf of u hem wil.',
      },
    ],
    faq: [
      {
        q: 'Wat kost een AI-agent laten bouwen bij FactumAI?',
        a: 'Eén vaste bouwprijs voor implementatie, afhankelijk van complexiteit en aantal integraties. U weet vooraf exact wat het wordt, inclusief opleveringsdatum. Daarna kiest u zelf: een maandelijkse retainer voor onderhoud en monitoring, of alleen de bouw en ad-hoc aanpassingen later.',
      },
      {
        q: 'Wat zit er precies in de maandelijkse retainer?',
        a: 'Monitoring van agent-prestaties en logboek, periodieke review van beleidsregels, model-updates zodra er betere of goedkopere beschikbaar zijn, beveiligings- en integratie-updates, kleine wijzigingen zonder extra factuur, en een maandelijks onderhoudsgesprek van een half uur.',
      },
      {
        q: 'Kan ik alleen de implementatie afnemen, zonder retainer?',
        a: 'Ja. U betaalt dan alleen de vaste bouwprijs. Aanpassingen later gaan ad hoc tegen een vaste prijs per wijziging. U heeft alle vrijheid, maar ook alle verantwoordelijkheid voor het meegroeien van de agent met nieuwe modellen en veranderende processen.',
      },
      {
        q: 'Wat valt er buiten de retainer?',
        a: 'Grote uitbreidingen: nieuwe scenario\u2019s, extra integraties of een aanvullende agent voor een andere afdeling. Die krijgen een eigen vaste-prijs-offerte. Zo blijft de retainer voorspelbaar en betaalt u alleen voor wat u bewust uitbreidt.',
      },
      {
        q: 'Wat gebeurt er als ik wil stoppen met de retainer?',
        a: 'Dan stopt u. De agent blijft van u, de data is van u, code en documentatie krijgt u mee. U kunt later weer instappen, of kiezen voor ad-hoc ondersteuning. Vrijheid is bij ons geen upsell.',
      },
    ],
  },
  {
    slug: 'ai-implementeren-vijf-stappen-mkb',
    title: 'AI implementeren in vijf stappen voor het MKB',
    lede: 'De meeste MKB-ondernemers die aan AI beginnen, beginnen op de verkeerde plek. Niet omdat ze onverstandig zijn, maar omdat niemand hun een eerlijk stappenplan heeft gegeven. Dit is dat plan.',
    author: 'Sjaak ter Veld',
    published: '2026-05-07',
    readingMinutes: 6,
    tags: ['strategie', 'MKB', 'proces', 'adoptie', 'methodiek'],
    blocks: [
      { kind: 'p', text: 'Een AI-agent is geen softwarepakket dat u installeert en vergeet. Het is een stuk bedrijfslogica dat u eerst moet kennen voor u het kunt bouwen. De vijf stappen hieronder zijn geen theoretisch raamwerk. Ze komen uit gesprekken met MKB-ondernemers die het eerder deden, en uit projecten die strandden omdat één stap werd overgeslagen.' },
      { kind: 'h2', text: 'Stap 1: Kies één concreet proces, niet een afdeling' },
      { kind: 'p', text: 'De verleiding is groot om breed te beginnen. "Wij willen de hele administratie automatiseren." Dat is geen startpunt, dat is een bestemming. Begin bij één proces: de wekelijkse betalingsherinnering, het verwerken van inkomende offerteaanvragen, het aanmaken van facturen na oplevering. Eén stroom, van begin tot eind.' },
      { kind: 'p', text: 'Het criterium is simpel: het proces moet minstens twee keer per week voorkomen, de regels moeten beschrijfbaar zijn, en er moet een duidelijk eindpunt zijn. Voldoet het niet aan alle drie, kies dan een ander proces.' },
      { kind: 'h2', text: 'Stap 2: Schrijf de regels op' },
      { kind: 'p', text: 'Dit is de stap die de meeste tijd kost en de meeste waarde oplevert. Ga zitten met de medewerker die het proces nu uitvoert. Vraag hoe het werkt. Niet hoe het zou moeten werken volgens de procedure, maar hoe het echt werkt. Er zit altijd een verschil tussen die twee.' },
      { kind: 'list', items: [
        'Wat zijn de standaardgevallen en hoe worden die afgehandeld?',
        'Welke uitzonderingen komen regelmatig voor, en wat doet u dan?',
        'Wanneer escaleert u naar een collega of leidinggevende?',
        'Welke systemen worden geraadpleegd, en in welke volgorde?',
        'Wat mag nooit automatisch, ongeacht de situatie?',
      ] },
      { kind: 'p', text: 'Die laatste vraag is de belangrijkste. De grenzen van de agent bepalen u zelf, op voorhand. Alles wat buiten die grenzen valt, gaat naar een mens. Zo simpel is het.' },
      { kind: 'h2', text: 'Stap 3: Koppel de systemen die u al hebt' },
      { kind: 'p', text: 'U hoeft niet te migreren naar nieuwe software. Een agent werkt met wat er al staat. Exact, Moneybird, AFAS, Snelstart, Twinfield voor boekhouding. Pipedrive, Teamleader of HubSpot voor klantrelaties. Microsoft 365 of Google Workspace voor communicatie. In verreweg de meeste gevallen heeft uw huidige pakket een API of een andere koppelingsmethode. Die beoordelen we in stap drie.' },
      { kind: 'quote', text: 'Een agent die uw bestaande systemen gebruikt is productiever dan een nieuw systeem dat iedereen moet leren.' },
      { kind: 'p', text: 'De koppeling zelf kost doorgaans enkele dagen werk. De voorbereiding — toegangsrechten regelen, een testomgeving inrichten, een representatieve dataset klaarzetten — kost minstens evenveel tijd. Plan daar op.' },
      { kind: 'h2', text: 'Stap 4: Test met echte situaties, niet met ideale gevallen' },
      { kind: 'p', text: 'De meeste tests gaan fout omdat ze te netjes zijn. U test met een duidelijke factuur van een bekende klant, op een werkdag zonder drukte. Dat is niet de werkelijkheid. Test met de klant die altijd een afwijkend betalingskenmerk invult. Met de aanvraag die drie bestanden als bijlage heeft. Met de mail die half Engels, half Nederlands is.' },
      { kind: 'p', text: 'Uw medewerker die het proces kent, is de beste tester. Vraag diegene de vijf meest lastige situaties uit de afgelopen maanden na te spelen. Als de agent daar goed mee omgaat, is het klaar voor gebruik. Zo niet, dan pas u de regels aan — niet de agent.' },
      { kind: 'h2', text: 'Stap 5: Ga live met een terugvaloptie' },
      { kind: 'p', text: 'De eerste weken loopt de agent parallel aan de medewerker. Niet als wantrouwen, maar als kalibratie. U vergelijkt uitkomsten, signaleert afwijkingen, en past beleidsregels bij waar nodig. Na twee tot vier weken is duidelijk of de agent zelfstandig kan draaien of dat er nog een regel ontbreekt.' },
      { kind: 'list', items: [
        'Houd bij hoeveel acties de agent zelfstandig afhandelt versus doorstuurt naar een mens.',
        'Noteer elk geval waarbij de agent een verkeerde keuze maakte of twijfelde.',
        'Stel één vaste dag per week in om de beleidsregels te evalueren, de eerste maand.',
        'Geef medewerkers een eenvoudige manier om een actie te corrigeren of terug te draaien.',
      ] },
      { kind: 'p', text: 'Daarna is het onderhoud. Geen groot project, maar een kwartaalcheck: zijn de regels nog actueel, zijn er nieuwe uitzonderingen bijgekomen, klopt de koppeling nog met de huidige systeemversie. Wie dat doet, houdt de agent betrouwbaar.' },
    ],
    faq: [
      { q: 'Hoe lang duurt het om een AI-agent te implementeren in een MKB-bedrijf?', a: 'Een eerste werkende agent is bij een goed afgebakend proces doorgaans binnen zes tot tien weken live. De voorbereiding — regels opschrijven, systemen koppelen, testcases samenstellen — neemt de helft van die tijd in beslag. Complexere processen of meer koppelingen verlengen de doorlooptijd.' },
      { q: 'Moet ik nieuwe software aanschaffen om met AI-agents te starten?', a: 'In de meeste gevallen niet. Gangbare Nederlandse pakketten zoals Exact, Moneybird, AFAS, Snelstart en Teamleader hebben koppelingsmogelijkheden die wij gebruiken. U hoeft niet te migreren. De agent werkt bovenop wat u al hebt.' },
      { q: 'Wat als mijn medewerkers weerstand hebben tegen AI?', a: 'Weerstand komt bijna altijd voort uit onduidelijkheid over wat de agent wel en niet overneemt. Benoem dat concreet: de agent doet de herhaalhandelingen, de medewerker houdt de uitzonderingen en klantcontact. Betrek de medewerker die het proces nu uitvoert bij het opstellen van de regels. Eigenaarschap verlaagt weerstand.' },
      { q: 'Wat is het eerste proces dat ik moet automatiseren?', a: 'Het allersaaiste, meest voorspelbare proces in uw bedrijf. Niet het meest urgente of het meest zichtbare. Een eerste agent die vlekkeloos draait op een eenvoudig proces geeft uw team vertrouwen en uw organisatie ervaring. Daarna kunt u complexere processen aanpakken.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'ai-readiness-check-klaar-voor-eerste-agent',
    title: 'AI-readiness check: is uw bedrijf klaar voor een agent?',
    lede: 'Veel ondernemers willen ergens beginnen met AI, maar weten niet of hun bedrijf er eigenlijk klaar voor is. Dat is een eerlijke vraag. En gelukkig een die u in een uur kunt beantwoorden.',
    author: 'Sjaak ter Veld',
    published: '2026-05-14',
    readingMinutes: 6,
    tags: ['strategie', 'MKB', 'selectie', 'methodiek', 'proces'],
    blocks: [
      { kind: 'p', text: 'De meeste ondernemers die mij bellen hebben al nagedacht over wat ze willen automatiseren. Soms is het heel concreet: offertes versturen, klantmails beantwoorden, facturen verwerken. Soms is het vaguer: \'minder rompslomp\'. Wat ik zelden hoor, is of het bedrijf er op dit moment eigenlijk klaar voor is. Dat is de vraag die bepaalt of een project soepel loopt of strandt na vier weken.' },
      { kind: 'h2', text: 'Waarom readiness er echt toe doet' },
      { kind: 'p', text: 'Een agent bouwt op wat er al is. Op uw processen, uw data, uw systemen, en de bereidheid van uw mensen. Als één van die vier wankel staat, betaalt u dat later terug in herstelwerk, vertraging, of een agent die niemand gebruikt. Dat wil ik voorkomen. Daarom gebruik ik bij elk eerste gesprek een vast setje vragen. Dat setje deel ik hier.' },
      { kind: 'h2', text: 'Stap 1: Heeft u een proces dat herhaalbaar is?' },
      { kind: 'p', text: 'Dit is de belangrijkste vraag. Een agent werkt op patronen. Als elk geval een uniek geval is, is er geen patroon om op te bouwen. Het criterium: kunt u aan een nieuwe medewerker uitleggen hoe het proces verloopt in tien stappen of minder? Dan is het waarschijnlijk geschikt. Lukt dat niet zonder drie uitzonderingsgevallen te noemen in elke stap, dan is het proces zelf nog niet rijp.' },
      { kind: 'list', items: [
        'Het proces gebeurt minimaal twee keer per week — anders is de bouwtijd zelden terug te verdienen.',
        'De regels zijn beschrijfbaar, ook voor randgevallen.',
        'Er is een duidelijk beginpunt en een duidelijk eindpunt.',
        'Het resultaat is controleerbaar — u kunt zien of het goed gedaan is.',
        'Het proces verandert niet elke maand fundamenteel.',
      ] },
      { kind: 'h2', text: 'Stap 2: Zijn uw gegevens op orde?' },
      { kind: 'p', text: 'Een agent is zo goed als de data waarop hij werkt. Als uw klantenlijst in drie verschillende Excel-bestanden staat, uw orders in een oud systeem dat niemand meer begrijpt, en uw productprijzen \'ergens in een map\', dan begint u niet met een agent-project. Dan begint u met een opruimproject. Dat is geen straf, het is noodzakelijk onderhoud dat u toch een keer moest doen.' },
      { kind: 'p', text: 'De basiseisen zijn laag. U hoeft geen datawarehouse te hebben. Wat u wel nodig heeft: één plek waar klantgegevens staan die actueel zijn, een systeem voor orders of offertes dat u zelf vertrouwt, en een boekhouding die aansluit op de werkelijkheid. Exact, Moneybird, AFAS, Snelstart — ze werken allemaal. Als u er één gebruikt en er in gelooft, is de basis goed genoeg.' },
      { kind: 'h2', text: 'Stap 3: Staat uw team er open voor?' },
      { kind: 'p', text: 'Dit is de meest onderschatte factor. Een agent die technisch perfect werkt maar door uw binnendienst wordt genegeerd, levert niets op. Ik heb dat meegemaakt. Niet omdat het systeem slecht was, maar omdat niemand was meegenomen in de keuze. Het resultaat: mensen bleven het handmatig doen, naast de agent.' },
      { kind: 'p', text: 'U hoeft geen enthousiasme te forceren. Wat u wel nodig heeft: één persoon in uw team die het begrijpt, er verantwoordelijkheid voor wil nemen, en anderen kan uitleggen waarom het er is. Zonder dat ankerpunt wordt elke agent vroeg of laat een duur experiment.' },
      { kind: 'quote', text: 'Techniek is zelden de blokkade. Mensen en processen zijn dat bijna altijd.' },
      { kind: 'h2', text: 'Stap 4: Heeft u capaciteit om het te begeleiden?' },
      { kind: 'p', text: 'Een eerste agent bouwen kost uw tijd. Niet veel, maar wel structureel. Reken op twee tot vier uur per week in de eerste zes weken: voor afstemming, testen, en bijsturen. Daarna daalt dat naar één uur per week voor onderhoud. Als u of uw aangewezen contactpersoon die uren er niet bij heeft, is het beter om het project drie maanden uit te stellen dan te beginnen en halverwege te stranden.' },
      { kind: 'h2', text: 'Wat als u nog niet klaar bent?' },
      { kind: 'p', text: 'Dan is dat geen probleem, maar een startpunt. In de meeste gevallen liggen de knelpunten op één of twee van de vier gebieden. Wij helpen ook bij het opruimen van die knelpunten — niet omdat wij een consultancybureau zijn, maar omdat een agent op een wankele basis ons beide werk en u geld kost. Het is eerlijker om dat eerst recht te zetten.' },
      { kind: 'p', text: 'Scoort u op alle vier de gebieden redelijk? Dan kunt u morgen beginnen. Kies het saaiste, meest herhaalbare proces dat u heeft. Zorg dat de data op orde is voor dat specifieke proces. Wijs één intern aanspreekpunt aan. En reserveer zes weken voor de eerste versie. Zo simpel is het begin.' },
    ],
    faq: [
      { q: 'Hoe weet ik welk proces ik als eerste moet automatiseren?', a: 'Begin bij het proces dat het vaakst voorkomt en de duidelijkste regels heeft — niet bij het proces dat u het meest ergert. Een voorspelbaar, saai proces staat live in zes weken en levert meteen zichtbaar resultaat. Daarna kunt u stap voor stap complexere situaties aanpakken.' },
      { q: 'Wat zijn de minimale IT-vereisten om te starten met een AI-agent?', a: 'U heeft geen geavanceerde infrastructuur nodig. Een gangbaar boekhoudpakket zoals Exact, Moneybird of Snelstart, gecombineerd met Microsoft 365 of Google Workspace voor e-mail en documenten, is een goede basis. De meeste MKB-bedrijven hebben dat al in huis.' },
      { q: 'Wat als mijn medewerkers weerstand hebben tegen automatisering?', a: 'Dat is normaal en hoeft geen blokkade te zijn. Zorg dat één persoon in uw team het project begrijpt en er verantwoordelijkheid voor draagt. Weerstand verdwijnt meestal zodra mensen merken dat de agent het saaie werk wegneemt en hen tijd geeft voor taken die meer voldoening geven.' },
      { q: 'Hoeveel tijd kost het begeleiden van een eerste agent-implementatie?', a: 'Reken op twee tot vier uur per week in de eerste zes weken, voor afstemming, testen en bijsturen. Daarna is één uur per week voor onderhoud een realistisch gemiddelde. Als die uren er niet zijn, is het beter het project even uit te stellen.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'build-vs-buy-custom-ai-of-saas',
    title: 'Build of buy: wanneer kiest u voor custom AI?',
    lede: 'SaaS-tools beloven snelle winst. Custom agents beloven maatwerk. Beide beloften kloppen, maar niet voor dezelfde situatie. Dit is het filter dat bepaalt welke keuze voor uw bedrijf de juiste is.',
    author: 'Sjaak ter Veld',
    published: '2026-05-19',
    readingMinutes: 6,
    tags: ['strategie', 'selectie', 'tooling', 'MKB', 'ROI'],
    blocks: [
      { kind: 'p', text: 'Elke week spreek ik ondernemers die al een SaaS-tool voor AI hebben aangeschaft. Soms werkt het prima. Soms staat het na drie maanden te stofzuigen omdat het net niet aansluit op de manier waarop het bedrijf werkt. De vraag is niet welke optie beter is in het algemeen. De vraag is welke optie past bij uw specifieke situatie.' },
      { kind: 'h2', text: 'Wat u koopt met een SaaS-oplossing' },
      { kind: 'p', text: 'Een SaaS-tool voor AI is een kant-en-klaar product. U betaalt een maandbedrag, u logt in, u stelt een paar dingen in, en het werkt. De leverancier zorgt voor updates, beveiliging en schaalbaarheid. Dat is een reëel voordeel, zeker als u geen IT-afdeling heeft.' },
      { kind: 'p', text: 'De keerzijde: u past uw proces aan het product aan, niet andersom. Als uw werkwijze afwijkt van wat de tool verwacht, gaat u compromissen sluiten. Soms zijn die compromissen klein en acceptabel. Soms raken ze precies het punt waarop uw bedrijf zich onderscheidt van de concurrent.' },
      { kind: 'list', items: [
        'Lage instapdrempel: in een dag of week operationeel.',
        'Vaste maandelijkse kosten, geen voorinvestering.',
        'Updates en nieuwe functies komen automatisch.',
        'Beperkte aanpasbaarheid aan uw eigen processen en systemen.',
        'Uw data staat bij een derde partij, wat AVG-aandacht vraagt.',
      ] },
      { kind: 'h2', text: 'Wat u koopt met een custom agent' },
      { kind: 'p', text: 'Een custom agent wordt gebouwd op uw proces, uw systemen en uw beleidsregels. De agent sluit aan op Exact of Moneybird, kent uw klantcategorieën, volgt uw escalatiepad. Hij doet precies wat u hem leert, niet meer en niet minder. Dat vraagt een hogere investering vooraf en een goede briefing, maar het resultaat sluit naadloos aan.' },
      { kind: 'p', text: 'Custom bouwen is zinvol als uw proces afwijkend genoeg is dat geen standaardtool het dekt, of als u de agent wilt koppelen aan meerdere interne systemen tegelijk. Ook als u concurrentievoordeel haalt uit de manier waarop u werkt, is dat geen logisch moment om uw proces plat te slaan naar wat een SaaS-vendor bedacht heeft.' },
      { kind: 'list', items: [
        'Volledig afgestemd op uw eigen werkwijze en terminologie.',
        'Koppelingen met bestaande systemen zoals AFAS, Pipedrive of Teamleader.',
        'Hogere eenmalige bouwkosten, lager maandelijks beheer daarna.',
        'Bouwtijd van doorgaans vier tot acht weken voor een eerste werkende versie.',
        'Uw data blijft op uw eigen infrastructuur of in een omgeving die u beheert.',
      ] },
      { kind: 'h2', text: 'Het filter: vier vragen vooraf' },
      { kind: 'p', text: 'In de praktijk lopen de gesprekken altijd langs dezelfde vier vragen. Ze zijn in vijf minuten te beantwoorden en geven al een richting.' },
      { kind: 'list', items: [
        'Is uw proces min of meer standaard? Dan is SaaS waarschijnlijk voldoende. Afwijkt het structureel van een gemiddeld bedrijf in uw branche? Dan is custom de betere keuze.',
        'Moet de agent koppelen met twee of meer van uw interne systemen? SaaS-tools ondersteunen zelden precies uw combinatie van pakketten.',
        'Wat is de tijdshorizon? Voor een kortlopend project of een pilot is SaaS logischer. Voor iets wat uw bedrijf vijf jaar lang dagelijks draait, loont een custom investering.',
        'Hoe gevoelig zijn de gegevens? Bij medische dossiers, juridische stukken of commercieel vertrouwelijke klantdata wil u exacte controle over waar de data staat.',
      ] },
      { kind: 'quote', text: 'SaaS is snel goed. Custom is langzaam perfect. De kunst is weten wanneer goed genoeg ook echt goed genoeg is.' },
      { kind: 'h2', text: 'Een hybride aanpak werkt ook' },
      { kind: 'p', text: 'Het is geen binaire keuze. Wij zien regelmatig bedrijven die een SaaS-tool gebruiken voor generieke taken, zoals het samenvatten van vergaderingen in Microsoft 365, en een custom agent inzetten voor het proces dat écht onderscheidend is: hun offertelogica, hun klantcommunicatie, hun interne routing. De systemen staan naast elkaar en hoeven niet te concurreren.' },
      { kind: 'p', text: 'Begin dan wel aan de custom kant met het proces dat de meeste herhalingsfrequentie heeft en de duidelijkste regels. Dat staat snel live, en daarna heeft u een solide basis om verder op te bouwen.' },
    ],
    faq: [
      { q: 'Wanneer is een SaaS AI-tool goedkoper dan custom bouwen?', a: 'Bij processen die vrijwel standaard zijn en weinig koppeling vragen met interne systemen, is SaaS bijna altijd goedkoper op korte termijn. Pas wanneer u het product aanpast aan uw werkwijze, of wanneer u meerdere systemen wilt koppelen, kantelt de rekensom richting custom. Als vuistregel: bij meer dan vijf aanpassingswensen loont het om een offerte voor maatwerk te vergelijken.' },
      { q: 'Hoe lang duurt het om een custom AI-agent te bouwen?', a: 'Een eerste werkende versie voor één afgebakend proces is doorgaans klaar in vier tot acht weken. Dat omvat de analyse van uw proces, de bouw van de agent, koppelingen met uw systemen en een testperiode met uw eigen medewerkers. Complexere trajecten met meerdere processen of systemen duren navenant langer.' },
      { q: 'Kan ik beginnen met SaaS en later overstappen naar custom?', a: 'Ja, dat is een gangbaar pad. SaaS geeft u de kans om te leren wat u eigenlijk nodig heeft, zonder grote investering vooraf. Het risico is dat uw mensen gewend raken aan de beperkingen van de tool en die beperkingen als normaal gaan beschouwen. Plan daarom een expliciete evaluatie na zes maanden om te beoordelen of de tool nog voldoet.' },
      { q: 'Wat gebeurt er met mijn data bij een SaaS AI-tool?', a: 'Dat verschilt per leverancier. Controleer altijd waar de data wordt opgeslagen, of de leverancier uw data gebruikt voor het trainen van modellen, en of het contract AVG-conform is. Bij gevoelige bedrijfs- of klantgegevens is een verwerkersovereenkomst verplicht. Bij custom agents heeft u volledige controle over de dataplek en de toegangsrechten.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'hoeveel-kost-een-ai-agent-2026',
    title: 'Hoeveel kost een AI-agent in 2026?',
    lede: 'De tarieven voor AI-agents lopen enorm uiteen, van een paar honderd euro per maand tot tientallen duizenden voor een maatwerksysteem. Wat u precies betaalt, hangt af van vier factoren die de meeste offertes niet uitleggen.',
    author: 'Sjaak ter Veld',
    published: '2026-05-21',
    readingMinutes: 6,
    tags: ['pricing', 'ROI', 'MKB', 'financieel', 'strategie'],
    blocks: [
      { kind: 'p', text: 'Ik krijg die vraag minstens twee keer per week. Soms via een offerte-aanvraag, soms aan het einde van een gesprek waar iemand al een halfuur geknikt heeft maar nog niet wil tekenen. Het eerlijke antwoord is: het hangt ervan af. Maar dat is geen excuus om vaag te blijven. Hieronder zet ik de componenten uiteen zodat u zelf kunt inschatten wat reëel is voor uw situatie.' },
      { kind: 'h2', text: 'De vier kostencomponenten' },
      { kind: 'p', text: 'Een AI-agent heeft niet één prijskaartje. Er zijn vier lagen, en elke leverancier stopt ze anders in zijn voorstel. Als u ze kent, kunt u offertes vergelijken op inhoud in plaats van op het eindgetal.' },
      { kind: 'list', items: [
        'Bouw: de eenmalige investering om de agent te ontwerpen, te koppelen met uw systemen en live te zetten. Dit is waar de meeste uren in gaan.',
        'Modelkosten: wat u betaalt aan de onderliggende AI-dienst per verwerkt bericht of document. Dit is variabel en loopt mee met gebruik.',
        'Integraties: koppelingen met uw boekhoudpakket, CRM of mailbox. Eenmalig, maar soms meerdere weken werk bij complexe systemen.',
        'Onderhoud en beheer: maandelijkse kosten voor monitoring, aanpassingen in beleidsregels, updates na wijzigingen in uw werkproces.',
      ] },
      { kind: 'h2', text: 'Wat u in de praktijk betaalt' },
      { kind: 'p', text: 'Voor een enkelvoudige agent die één proces afhandelt — zeg: het beantwoorden van inkomende klantmails op basis van uw FAQ en bestelhistorie — ligt de bouw tussen € 3.000 en € 8.000 eenmalig. Dat is inclusief één integratie, bijvoorbeeld met Moneybird of Exact voor ordergegevens. De maandelijkse modelkosten bij een typisch MKB-volume van 200 tot 600 berichten per maand liggen tussen € 30 en € 90. Beheer en kleine aanpassingen kosten doorgaans € 150 tot € 350 per maand als u dat uitbesteedt.' },
      { kind: 'p', text: 'Bij een complexere agent die meerdere processen combineert — offertes uitsturen, facturen aanmaken, herinneringen versturen — stijgen de bouwkosten naar € 12.000 tot € 25.000. Dat klinkt als veel. Maar tel dan ook mee wat u nu per jaar betaalt aan de mensen die datzelfde doen.' },
      { kind: 'quote', text: 'De bouwkosten zijn eenmalig. De besparing op uurloon is structureel. Dat maakt de rekensom gunstiger dan hij op het eerste gezicht lijkt.' },
      { kind: 'h2', text: 'Terugverdientijd: een reëel voorbeeld' },
      { kind: 'p', text: 'Neem een binnendienst van twee medewerkers die samen acht uur per week kwijt zijn aan orderverwerking en facturatie. Tegen € 32 per uur bruto zijn dat € 13.300 per jaar aan directe loonkosten voor dat ene proces. Een agent die dat voor 80 procent overneemt, bespaart ruim € 10.000 per jaar. Een bouwproject van € 15.000 verdient zichzelf dan terug in achttien maanden. Daarna houdt u elke maand geld over.' },
      { kind: 'p', text: 'Dat is een vrij conservatieve berekening. Zij houdt geen rekening met fouten die u nu maakt door tijdsdruk, of met klanten die afhaken omdat de reactietijd te lang is. Als u die meerekent, tikt de terugverdientijd eerder door naar twaalf maanden.' },
      { kind: 'h2', text: 'Waar u op moet letten in een offerte' },
      { kind: 'list', items: [
        'Zijn modelkosten inbegrepen of komen die bovenop het maandtarief? Veel aanbieders geven een vast bedrag per maand, maar rekenen modelkosten apart door bij hoog gebruik.',
        'Wat valt onder \'onderhoud\'? Een agent die u niet kunt bijstellen als uw beleid verandert, is geen investering maar een kostenpost.',
        'Hoeveel koppelingen zijn inbegrepen? Elke extra integratie met een systeem als AFAS, Teamleader of Lightspeed kost tijd en staat meestal niet in het basisbedrag.',
        'Is er een testfase voor u betaalt? Een serieuze bouwpartner laat u de agent testen op echte data voordat het systeem live gaat.',
        'Wat gebeurt er als u wilt stoppen? Zorg dat u eigenaar bent van de configuratie en de beleidsregels, niet de leverancier.',
      ] },
      { kind: 'h2', text: 'Beginnen zonder groot bouwproject' },
      { kind: 'p', text: 'Er zijn aanbieders die kant-en-klare agents leveren voor standaardprocessen, tegen een maandabonnement van € 200 tot € 600 zonder bouwkosten. Dat is aantrekkelijk, maar brengt beperkingen mee in maatwerk en integraties. Voor een bedrijf dat wil uitproberen kan dat een goede eerste stap zijn. Voor een bedrijf dat écht wil integreren met zijn bestaande werkproces is de maatwerkroute vrijwel altijd goedkoper op de lange termijn.' },
      { kind: 'p', text: 'Mijn advies: begin niet met de vraag wat het kost, maar met de vraag welk proces u wilt automatiseren en hoe vaak het voorkomt. Zodra u dat weet, kunt u een reëele business case maken en een offerte op inhoud beoordelen in plaats van op de eerste regel.' },
    ],
    faq: [
      { q: 'Wat kost een AI-agent gemiddeld per maand voor een MKB-bedrijf?', a: 'Voor een enkelvoudige agent rekent u op € 180 tot € 440 per maand aan beheer en modelkosten, bovenop de eenmalige bouwkosten. Bij een complexer systeem met meerdere koppelingen loopt dat op naar € 400 tot € 800 per maand. Hoe hoog het model-aandeel uitvalt hangt sterk af van het volume: het aantal berichten, documenten of acties dat de agent per maand verwerkt.' },
      { q: 'Hoe lang duurt het voordat een AI-agent zich terugverdient?', a: 'Bij een enkelvoudig proces met duidelijke tijdsbesparing ligt de terugverdientijd tussen twaalf en vierentwintig maanden. Dat hangt af van de bouwkosten, het uurtarief van de medewerker die het werk nu doet, en hoeveel van het proces de agent daadwerkelijk overneemt. Hoe voorspelbaarder het proces, hoe sneller de terugverdientijd.' },
      { q: 'Zijn er goedkopere alternatieven zonder maatwerk?', a: 'Ja. Er zijn kant-en-klare agent-producten voor standaardprocessen vanaf € 200 per maand zonder bouwkosten. Die zijn geschikt als startpunt of voor eenvoudige taken. Ze missen doorgaans de mogelijkheid tot diepe integratie met uw specifieke systemen en werkprocessen, waardoor de daadwerkelijke tijdsbesparing beperkter is dan bij maatwerk.' },
      { q: 'Wat zijn de valkuilen bij goedkope AI-agent aanbieders?', a: 'De meest voorkomende valkuil is dat modelkosten apart worden doorgerekend bij hoog gebruik, waardoor het maandtarief onvoorspelbaar wordt. Daarnaast: beperkte aanpasbaarheid van beleidsregels, geen of gedeeltelijke eigendom van uw eigen configuratie, en koppelingen met uw systemen die als apart project worden gefactureerd zodra u ze écht nodig heeft.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'roi-ai-automatisering-berekenen-praktisch-voorbeeld',
    title: 'ROI van AI-automatisering: een concrete rekensom',
    lede: 'Veel ondernemers willen weten of AI-agents zich terugverdienen voordat ze eraan beginnen. Dat is een goede vraag. En gelukkig een beantwoordbare. Hier is de rekensom die wij in elk eerste gesprek doorlopen.',
    author: 'Sjaak ter Veld',
    published: '2026-05-28',
    readingMinutes: 6,
    tags: ['ROI', 'financieel', 'efficiency', 'strategie', 'MKB'],
    blocks: [
      { kind: 'p', text: 'Een AI-agent bouwen kost geld. Dat weet u. Wat u wilt weten, is hoeveel u er tegenover staat. Niet in vage beloftes, maar in euro\'s per jaar. Die berekening is minder ingewikkeld dan ze lijkt, als u het in de juiste volgorde aanpakt.' },
      { kind: 'h2', text: 'Stap één: stel vast wat het nu kost' },
      { kind: 'p', text: 'Kies één proces. Niet uw hele administratie, maar één ding. Zeg: het verwerken van binnenkomende orders. Beantwoord dan drie vragen: hoe vaak gebeurt dit per week, hoeveel minuten kost het per keer, en wie doet het?' },
      { kind: 'p', text: 'Stel: uw binnendienst verwerkt 60 orders per week. Elke order kost gemiddeld 12 minuten: controleren, inboeken in Exact, bevestigingsmail sturen. Dat is 720 minuten per week, ofwel 12 uur. Bij een all-in uurtarief van € 32 voor die medewerker kost dit u € 384 per week, of ruim € 20.000 per jaar. Voor één proces.' },
      { kind: 'h2', text: 'Stap twee: schat wat de agent overneemt' },
      { kind: 'p', text: 'Een agent neemt zelden 100% over. Dat hoeft ook niet. Bij orderverwerking is een realistisch getal 70 tot 85 procent: standaardorders volledig automatisch, uitzonderingen gaan naar de medewerker. Reken conservatief: 70 procent. Dan bespaart u 8,4 uur per week, oftewel € 269 per week of circa € 14.000 per jaar.' },
      { kind: 'quote', text: 'Een agent hoeft niet alles over te nemen. 70 procent automatisering van één proces geeft u al een terugverdientijd onder de twaalf maanden.' },
      { kind: 'h2', text: 'Stap drie: zet de investering ertegenover' },
      { kind: 'p', text: 'Een goed gebouwde agent voor dit soort orderverwerking kost bij ons eenmalig tussen de € 4.000 en € 8.000 in bouw, afhankelijk van de complexiteit van de integratie met uw boekhoudpakket. Daarna betaalt u een maandelijks onderhoudsbedrag van gemiddeld € 250 tot € 400 voor hosting, monitoring en kleine aanpassingen.' },
      { kind: 'p', text: 'Reken het door. Bouwkosten € 6.000, onderhoud € 300 per maand. Jaar één: totaalkosten € 9.600. Besparing: € 14.000. Netto voordeel in jaar één: ruim € 4.000. Jaar twee en verder: besparing € 14.000, kosten € 3.600, netto voordeel circa € 10.000 per jaar. Dat is een terugverdientijd van minder dan negen maanden.' },
      { kind: 'h2', text: 'Wat u niet in de rekensom ziet' },
      { kind: 'p', text: 'De besparing in euro\'s is het makkelijke deel. Wat de berekening niet vat, is wat uw medewerker met die 8,4 uur per week gaat doen. Als die tijd gaat naar klantgesprekken, offertes of complexere taken, is de werkelijke opbrengst hoger dan € 14.000. Soms aanzienlijk hoger. Maar dat is moeilijker te voorspellen, en ik vind het onverstandig om daar in een businesscase op te rekenen.' },
      { kind: 'list', items: [
        'Minder fouten: handmatige orderverwerking heeft een foutpercentage van 2 tot 5 procent. Een agent maakt die fout niet als de invoer klopt.',
        'Minder verzuim: repetitief administratief werk is één van de bekende oorzaken van uitval. Minder routinelast vermindert die druk.',
        'Schaalbaarheid: als het ordervolume verdubbelt, schaalt de agent mee. Een tweede medewerker inhuren hoeft niet.',
      ] },
      { kind: 'h2', text: 'De rekensom zelf maken' },
      { kind: 'p', text: 'U kunt dit zelf uitrekenen voor elk proces in uw bedrijf. Neem een blad papier: frequentie per week, minuten per keer, all-in uurloon, automatiseringspercentage. Dat zijn de vier getallen die u nodig heeft. Wie daarna nog twijfelt over de businesscase, twijfelt doorgaans niet over het geld, maar over de uitvoering. Dát is het gesprek dat de moeite waard is.' },
    ],
    faq: [
      { q: 'Hoe snel verdient een AI-agent zich terug in het MKB?', a: 'Bij een goed gekozen startproces ligt de terugverdientijd doorgaans tussen de zes en twaalf maanden. Dat hangt af van de frequentie van het proces, het uurtarief van de medewerker die het nu doet, en het percentage dat de agent daadwerkelijk overneemt. Reken altijd conservatief: ga uit van 60 tot 75 procent automatisering, niet 100.' },
      { q: 'Wat kost het bouwen van een AI-agent voor een MKB-bedrijf?', a: 'De bouwkosten liggen doorgaans tussen de € 3.500 en € 10.000 eenmalig, afhankelijk van de complexiteit van het proces en het aantal koppelingen met bestaande systemen zoals Exact, AFAS of Moneybird. Daarna rekent u op een maandelijks bedrag van € 200 tot € 500 voor onderhoud en hosting.' },
      { q: 'Welk proces kies ik als startpunt voor AI-automatisering?', a: 'Kies het proces dat het vaakst voorkomt en de duidelijkste regels heeft. Orderverwerking, facturering na oplevering of het beantwoorden van terugkerende klantvragen zijn goede kandidaten. Vermijd als startpunt processen waarbij menselijk oordeel essentieel is, zoals klachtenafhandeling in grensgevallen of onderhandelingen.' },
      { q: 'Moet ik mijn systemen vervangen om te beginnen met een AI-agent?', a: 'Nee. Gangbare pakketten als Exact, Moneybird, AFAS en Snelstart zijn via een API te koppelen zonder migratie of vervanging. Zelfs oudere systemen die geen moderne API hebben, zijn vaak via e-mailstromen of bestandsuitwisseling te integreren. De bestaande software hoeft niet weg.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'ai-pilot-zonder-mislukken-mkb',
    title: 'AI-pilot zonder mislukken: do\'s en don\'ts',
    lede: 'De meeste AI-pilots mislukken niet door slechte technologie. Ze mislukken door verkeerde verwachtingen, het verkeerde startproces en een gebrek aan eigenaarschap. Dit is wat wij in de praktijk zien werken.',
    author: 'Sjaak ter Veld',
    published: '2026-06-18',
    readingMinutes: 6,
    tags: ['methodiek', 'adoptie', 'strategie', 'MKB', 'proces'],
    blocks: [
      { kind: 'p', text: 'Een pilot is geen proef waarbij u achteroverleunt en afwacht of iets werkt. Het is een gestructureerde periode van vier tot acht weken waarin u leert hoe het proces écht loopt, wie er verantwoordelijkheid voor neemt en wat de agent nodig heeft om goed te functioneren. Wie dat niet vooraf weet, heeft geen pilot. Die heeft een experiment zonder conclusie.' },
      { kind: 'h2', text: 'Begin klein, maar niet te klein' },
      { kind: 'p', text: 'De meest gemaakte fout: een proces kiezen dat zo marginaal is dat niemand de uitkomst merkt. Dat levert geen draagvlak op. Kies een proces dat uw mensen wekelijks raakt en waarvan u de huidige tijdsbesteding kunt meten. Geen schatting, maar een meting. Drie weken bijhouden hoeveel tijd het kost is al genoeg.' },
      { kind: 'p', text: 'Tegelijk: begin niet met het zwaarste proces. Een agent die klantklachten moet afhandelen inclusief uitzonderingen, coulance en terugkoppelingen is geen startpunt. Dat is maand zes. Maand één is de orderbevestiging, de betaalherinnering of de standaardofferte. Iets met een vast patroon en weinig uitzonderingen.' },
      { kind: 'h2', text: 'De do\'s' },
      { kind: 'list', items: [
        'Benoem één proceseigenaar. Iemand die elke week tien minuten neemt om te kijken wat de agent doet en welke uitzonderingen hij tegenkomt.',
        'Stel vooraf succes vast. Niet vaag (\'het moet beter gaan\'), maar concreet: \'De gemiddelde verwerkingstijd daalt van 25 naar 8 minuten\'.',
        'Bouw guardrails in vóór u live gaat. Bepaal welke handelingen de agent autonoom mag uitvoeren en welke altijd langs een mens gaan.',
        'Plan een evaluatiemoment op week twee én week zes. Week twee om bij te sturen, week zes om te besluiten.',
        'Vertel uw medewerkers eerlijk wat u doet en waarom. Angst over baanverlies blokkeert adoptie meer dan elke technische tekortkoming.',
      ] },
      { kind: 'h2', text: 'De don\'ts' },
      { kind: 'list', items: [
        'Geen eigenaarschap aanwijzen en hopen dat het vanzelf gaat. Dat gaat niet vanzelf.',
        'De pilot starten terwijl de data niet op orde is. Een agent die werkt met verouderde klantgegevens of ontbrekende prijslijsten produceert onzin.',
        'Verwachten dat medewerkers de agent spontaan gaan gebruiken zonder uitleg en gewenning. Implementatie is voor 60% gedragsverandering.',
        'Technologie kiezen voordat het proces beschreven is. De toolkeuze volgt op de proceskeuze, nooit andersom.',
        'De pilot \'even uitproberen\' zonder budget voor de vervolgstap. Als u van tevoren niet weet wat u doet als het werkt, bent u niet klaar voor een pilot.',
      ] },
      { kind: 'h2', text: 'Wat een goede pilot oplevert' },
      { kind: 'p', text: 'Niet alleen een werkende agent. Vooral: inzicht in hoe uw processen echt lopen. Bijna altijd komen er tijdens een pilot aannames boven die niemand ooit had opgeschreven. Welke uitzonderingen er eigenlijk zijn. Welke klanten altijd bijzondere behandeling krijgen. Welke stap altijd mis gaat zonder dat iemand het doorhad.' },
      { kind: 'quote', text: 'Een pilot is geen test van de technologie. Het is een röntgenfoto van uw proces.' },
      { kind: 'p', text: 'Die kennis heeft waarde, ongeacht of de agent daarna in productie gaat. Maar in de meeste gevallen gaat hij wél in productie, omdat de combinatie van een helder proces en een goed geconfigureerde agent levert wat u van tevoren had afgesproken. Dat is geen toeval. Dat is voorbereiding.' },
      { kind: 'h2', text: 'Na de pilot: uitrollen of stoppen' },
      { kind: 'p', text: 'Op week zes neemt u een besluit op basis van drie dingen: haalt u de vooraf vastgestelde succesmaatstaf, is de proceseigenaar bereid het te blijven beheren, en zijn de medewerkers gewend aan de nieuwe werkwijze. Als twee van de drie positief zijn, rolt u uit. Als alle drie negatief zijn, stopt u en analyseert u waarom. Een eerlijk einde is ook een uitkomst. Maar in de praktijk zien wij dat het bij een goed gekozen startproces zelden tot stoppen komt.' },
    ],
    faq: [
      { q: 'Hoe lang duurt een AI-pilot voor een MKB-bedrijf?', a: 'Een goed ingerichte pilot duurt vier tot acht weken. De eerste twee weken zijn voor inrichting en een eerste live-run in een afgeschermde omgeving. Daarna volgt een periode van actief gebruik met wekelijkse evaluatie. Korter dan vier weken levert te weinig data op om betrouwbare conclusies te trekken.' },
      { q: 'Wat zijn de meest voorkomende redenen dat een AI-pilot mislukt?', a: 'Geen duidelijke proceseigenaar, te weinig concrete succescriteria vooraf, of een slecht gekozen startproces met te veel uitzonderingen. Technische problemen zijn zelden de oorzaak. De organisatorische voorbereiding bepaalt in de meeste gevallen het verschil tussen een pilot die iets oplevert en één die stil sterft.' },
      { q: 'Moeten mijn medewerkers iets leren of installeren voor een pilot?', a: 'Dat hangt af van het gekozen proces, maar bij goed ontworpen agents is de aanpassing voor medewerkers beperkt. Zij hoeven de agent niet te bedienen; zij moeten begrijpen wat hij doet en wanneer hij hen om input vraagt. Een introductie van een uur en een korte referentiekaart zijn in de meeste gevallen voldoende.' },
      { q: 'Wat kost een AI-pilot?', a: 'Dat verschilt per complexiteit van het proces en de benodigde integraties. Een eenvoudige pilot op een voorspelbaar administratief proces kost minder dan één op een proces met meerdere systemen en uitzonderingen. Wij werken altijd met een vaste pilotprijs zodat u vooraf weet waar u aan toe bent, zonder open einde.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

];

export const POST_BY_SLUG = POSTS.reduce<Record<string, Post>>((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {});
