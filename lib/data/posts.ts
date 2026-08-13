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
  updated?: string; // ISO date, last meaningful edit
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
          'Iedereen heeft de afgelopen twee jaar wel iets gedemonstreerd gekregen met generatieve AI. [Chatbots](/diensten/vergelijken/ai-agent-vs-chatbot), tekstgeneratoren, plaatjes. Leuk, niet altijd bruikbaar. Dat is in 2025 en 2026 fundamenteel gekanteld. Niet zozeer omdat de modellen slimmer zijn (dat ook), maar omdat het tooling-landschap er omheen volwassen is geworden.',
      },
      { kind: 'h2', text: 'Wat er praktisch veranderd is' },
      {
        kind: 'list',
        items: [
          'Agents kunnen betrouwbaar koppelen met bestaande systemen. E-mail, boekhoudpakket, CRM, magazijn.',
          '[Beleidsregels](/kennis/guardrails-niet-een-rem-maar-een-kompas) zijn niet meer een stuk prompt, maar een configureerbare laag die mensen zelf kunnen aan/uitzetten.',
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
          'Bij MKB-bedrijven is de situatie omgekeerd. Veel wordt nog via mail en Excel gedaan. Daar haalt één goed gebouwde agent direct een flink deel van de administratieve tijd weg. De impact is groter en de bouwtijd korter dan bij een concern met een dichtgetimmerd systeemlandschap.',
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
          'Wij verwachten dat de bedrijven die nu beginnen over twee jaar een onhaalbare voorsprong hebben in hun branche. Niet omdat ze “meer met AI doen”, maar omdat ze met dezelfde bezetting meer werk aankunnen. Dat vertaalt zich naar investeringsruimte, inkoopkracht, en werksnelheid richting klanten.',
      },
      {
        kind: 'p',
        text:
          'De adoptiecurve loopt hard. Maar in tegenstelling tot eerdere technologische golven is de instapdrempel laag. Eén agent, vaste prijs per fase, en een eerste versie die u ziet en goedkeurt voordat er verder gebouwd wordt. Geen groot project-bord nodig.',
      },
    ],
    faq: [
      {
        q: 'Waarom is nu het juiste moment voor een MKB-bedrijf om met AI-agents te starten?',
        a: 'Omdat het tooling-landschap rond generatieve AI in 2025 en 2026 volwassen is geworden. Agents kunnen betrouwbaar koppelen met bestaande systemen, beleidsregels zijn configureerbaar geworden, en integraties kosten dagen in plaats van maanden. MKB-bedrijven hebben vaak nog veel via mail en Excel, daar neemt één goed gebouwde agent direct 30 tot 60 procent van de administratieve tijd weg.',
      },
      {
        q: 'Hebben grote bedrijven geen voorsprong met AI?',
        a: 'Niet in deze golf. Grote concerns hebben in hun backoffice al veel geautomatiseerd met SAP, Oracle of custom workflows. Voor hen is een AI-agent een extra schil. Bij MKB-bedrijven is de impact groter omdat de uitgangspositie minder geautomatiseerd is. De bouwtijd is korter, de ROI meetbaar binnen één maand.',
      },
      {
        q: 'Wat als ik nu niet instap?',
        a: 'Bedrijven die nu beginnen hebben over twee jaar een meetbare voorsprong in hun branche. Niet omdat ze "meer met AI doen", maar omdat ze met dezelfde bezetting meer werk aankunnen. Dat vertaalt zich naar investeringsruimte, inkoopkracht en werksnelheid richting klanten.',
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
          'Klanten met >10 orders en 0 klachten: [coulance toepassen](/oplossingen/klantenservice-automatiseren) zonder discussie over schuldvraag.',
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
          'Wij bouwen agents die zelf naar u toe komen met dingen die uw aandacht nodig hebben. Geen dashboard. Een belnotitie die klaarstaat. [Een klantmail die niet is verzonden](/oplossingen/klantenservice-automatiseren) omdat het bedrag boven uw mandaat valt. Een werkbak met drie zaken die u kort moet afvinken.',
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
          'In plaats van een voorraad-alert-app: [de agent die zelf al een inkooporder heeft klaargezet](/oplossingen/inkoop-automatiseren).',
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
          '[Klantmails met een voorspelbaar patroon](/oplossingen/klantenservice-automatiseren). Offertes op basis van actuele prijslijst. [Orderverwerking waar kredietcheck en voorraadcheck in elkaar schuiven](/oplossingen/inkoop-automatiseren). Factureren na oplevering. Belnotities voor finance wanneer een factuur lang openstaat. Dit zijn routinematige, regel-gebaseerde stromen. Ideaal terrein.',
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
          'Iets kleins, iets snels, iets met een duidelijk resultaat dat u zelf kunt zien. Ontvangstbevestiging op inkomende mails. Automatisch een concept-factuur klaarzetten na oplevering. [Voorraadsignalen die een inkooporder klaarzetten](/oplossingen/inkoop-automatiseren). Dingen waar weinig risico aan zit en waar uw mensen de winst direct voelen.',
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
      'De grootste aarzeling die ik hoor: "wij hebben een oud boekhoudpakket, dat werkt nooit". In verreweg de meeste gevallen valt dat reuze mee. Hoe het technisch werkt, zonder jargon.',
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
          'E-mail en bestand: het oude werkpaard. [Veel boekhoudsystemen kunnen automatisch mails versturen](/oplossingen/klantenservice-automatiseren) met een factuur als PDF. Wij lezen die uit en verwerken ze. Niet elegant, wel betrouwbaar.',
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
          'Zodra we [een agent bouwen die facturen verwerkt](/diensten/ai-automatisering), vragen ondernemers me steevast: "Wat moet ik tegen mijn boekhouder zeggen?" Eerlijke observatie: die gesprekken zijn de afgelopen twee jaar beter geworden.',
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
          'Wanneer ik in een eerste gesprek vraag [wat een klantmail uw binnendienst kost](/oplossingen/klantenservice-automatiseren), krijg ik zelden een getal. Begrijpelijk. Niemand meet dat. Maar zodra we samen de rekensom maken, schrikt bijna iedereen.',
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
          'Reken het simpel door met uw eigen cijfers. Stel dat één medewerker 12 uur per week aan automatiseerbaar administratief werk kwijt is. Dat is 520 uur per jaar. Tegen € 30 per uur komt u op € 15.600 aan directe kosten, voor één medewerker. Bij drie medewerkers die hetzelfde doen, staat er bijna € 50.000. Vul uw eigen uren en tarief in, dan weet u waar u staat.',
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
          '[Vraag hun hulp om de beleidsregels op te stellen](/kennis/guardrails-niet-een-rem-maar-een-kompas). Zij kennen de uitzonderingen.',
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
          'In elk eerste gesprek komt de vraag: "En wat kost dat?" Dat antwoord begint bij ons met een onderscheid dat voor veel ondernemers wennen is. Wij werken met een vaste prijs voor de bouw, én een maandelijkse retainer voor daarna. Die retainer is niet verplicht, u kiest zelf of u hem afneemt. Maar hij is wel belangrijk voor veel klanten. Hieronder leg ik uit waarom.',
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
          'Uw processen veranderen. Klantgroepen komen erbij, beleidsregels schuiven, [seizoensdrukte verandert](/oplossingen/vraagvoorspelling). De agent moet meebewegen.',
          'Uw externe systemen krijgen updates. Boekhoudpakket een API-wijziging, e-mailserver nieuwe authenticatie, CRM een interfaceverandering.',
          '[Guardrails vragen aandacht](/kennis/guardrails-niet-een-rem-maar-een-kompas). Nieuwe uitzonderingen leren de agent wat er automatisch mag en wat langs een mens moet.',
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
      { kind: 'h2', text: 'Of alleen implementatie: ook prima' },
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
      { kind: 'p', text: 'De koppeling zelf kost doorgaans enkele dagen werk. De voorbereiding, toegangsrechten regelen, een testomgeving inrichten, een representatieve dataset klaarzetten, kost minstens evenveel tijd. Plan daar op.' },
      { kind: 'h2', text: 'Stap 4: Test met echte situaties, niet met ideale gevallen' },
      { kind: 'p', text: 'De meeste tests gaan fout omdat ze te netjes zijn. U test met een duidelijke factuur van een bekende klant, op een werkdag zonder drukte. Dat is niet de werkelijkheid. Test met de klant die altijd een afwijkend betalingskenmerk invult. Met de aanvraag die drie bestanden als bijlage heeft. Met de mail die half Engels, half Nederlands is.' },
      { kind: 'p', text: 'De beste tester is uw eigen medewerker die het proces kent. Vraag diegene de vijf meest lastige situaties uit de afgelopen maanden na te spelen. Als de agent daar goed mee omgaat, is het klaar voor gebruik. Zo niet, dan pas u de regels aan, niet de agent.' },
      { kind: 'h2', text: 'Stap 5: Ga live met een terugvaloptie' },
      { kind: 'p', text: 'De eerste weken loopt de agent parallel aan de medewerker. Niet als wantrouwen, maar als kalibratie. U vergelijkt uitkomsten, signaleert afwijkingen, en [past beleidsregels bij waar nodig](/kennis/guardrails-niet-een-rem-maar-een-kompas). Na twee tot vier weken is duidelijk of de agent zelfstandig kan draaien of dat er nog een regel ontbreekt.' },
      { kind: 'list', items: [
        'Houd bij hoeveel acties de agent zelfstandig afhandelt versus doorstuurt naar een mens.',
        'Noteer elk geval waarbij de agent een verkeerde keuze maakte of twijfelde.',
        'Stel één vaste dag per week in om de beleidsregels te evalueren, de eerste maand.',
        'Geef medewerkers een eenvoudige manier om een actie te corrigeren of terug te draaien.',
      ] },
      { kind: 'p', text: 'Daarna is het onderhoud. Geen groot project, maar een kwartaalcheck: zijn de regels nog actueel, zijn er nieuwe uitzonderingen bijgekomen, klopt de koppeling nog met de huidige systeemversie. Wie dat doet, houdt de agent betrouwbaar.' },
    ],
    faq: [
      { q: 'Hoe lang duurt het om een AI-agent te implementeren in een MKB-bedrijf?', a: 'Een eerste werkende agent is bij een goed afgebakend proces doorgaans binnen zes tot tien weken live. De voorbereiding, regels opschrijven, systemen koppelen, testcases samenstellen, neemt de helft van die tijd in beslag. Complexere processen of meer koppelingen verlengen de doorlooptijd.' },
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
      { kind: 'p', text: 'De meeste ondernemers die mij bellen hebben al nagedacht over wat ze willen automatiseren. Soms is het heel concreet: offertes versturen, [klantmails beantwoorden](/oplossingen/klantenservice-automatiseren), facturen verwerken. Soms is het vaguer: \'minder rompslomp\'. Wat ik zelden hoor, is of het bedrijf er op dit moment eigenlijk klaar voor is. Dat is de vraag die bepaalt of een project soepel loopt of strandt na vier weken.' },
      { kind: 'h2', text: 'Waarom readiness er echt toe doet' },
      { kind: 'p', text: 'Een agent bouwt op wat er al is. Op uw processen, uw data, uw systemen, en de bereidheid van uw mensen. Als één van die vier wankel staat, betaalt u dat later terug in herstelwerk, vertraging, of een agent die niemand gebruikt. Dat wil ik voorkomen. Daarom gebruik ik bij elk eerste gesprek een vast setje vragen. Dat setje deel ik hier.' },
      { kind: 'h2', text: 'Stap 1: Heeft u een proces dat herhaalbaar is?' },
      { kind: 'p', text: 'Dit is de belangrijkste vraag. Een agent werkt op patronen. Als elk geval een uniek geval is, is er geen patroon om op te bouwen. Het criterium: kunt u aan een nieuwe medewerker uitleggen hoe het proces verloopt in tien stappen of minder? Dan is het waarschijnlijk geschikt. Lukt dat niet zonder drie uitzonderingsgevallen te noemen in elke stap, dan is het proces zelf nog niet rijp.' },
      { kind: 'list', items: [
        'Het proces gebeurt minimaal twee keer per week, anders is de bouwtijd zelden terug te verdienen.',
        'De regels zijn beschrijfbaar, ook voor randgevallen.',
        'Er is een duidelijk beginpunt en een duidelijk eindpunt.',
        'Het resultaat is controleerbaar, u kunt zien of het goed gedaan is.',
        'Het proces verandert niet elke maand fundamenteel.',
      ] },
      { kind: 'h2', text: 'Stap 2: Zijn uw gegevens op orde?' },
      { kind: 'p', text: 'Een agent is zo goed als de data waarop hij werkt. Als uw klantenlijst in drie verschillende Excel-bestanden staat, uw orders in een oud systeem dat niemand meer begrijpt, en uw productprijzen \'ergens in een map\', dan begint u niet met een agent-project. Dan begint u met een opruimproject. Dat is geen straf, het is noodzakelijk onderhoud dat u toch een keer moest doen.' },
      { kind: 'p', text: 'De basiseisen zijn laag. U hoeft geen datawarehouse te hebben. Wat u wel nodig heeft: één plek waar klantgegevens staan die actueel zijn, een systeem voor orders of offertes dat u zelf vertrouwt, en een boekhouding die aansluit op de werkelijkheid. Exact, Moneybird, AFAS, Snelstart, ze werken allemaal. Als u er één gebruikt en er in gelooft, is de basis goed genoeg.' },
      { kind: 'h2', text: 'Stap 3: Staat uw team er open voor?' },
      { kind: 'p', text: 'Dit is de meest onderschatte factor. Een agent die technisch perfect werkt maar door uw binnendienst wordt genegeerd, levert niets op. Ik heb dat meegemaakt. Niet omdat het systeem slecht was, maar omdat niemand was meegenomen in de keuze. Het resultaat: mensen bleven het handmatig doen, naast de agent.' },
      { kind: 'p', text: 'U hoeft geen enthousiasme te forceren. Wat u wel nodig heeft: één persoon in uw team die het begrijpt, er verantwoordelijkheid voor wil nemen, en anderen kan uitleggen waarom het er is. Zonder dat ankerpunt wordt elke agent vroeg of laat een duur experiment.' },
      { kind: 'quote', text: 'Techniek is zelden de blokkade. Mensen en processen zijn dat bijna altijd.' },
      { kind: 'h2', text: 'Stap 4: Heeft u capaciteit om het te begeleiden?' },
      { kind: 'p', text: 'Een eerste agent bouwen kost uw tijd. Niet veel, maar wel structureel. Reken op twee tot vier uur per week in de eerste zes weken: voor afstemming, testen, en bijsturen. Daarna daalt dat naar één uur per week voor onderhoud. Als u of uw aangewezen contactpersoon die uren er niet bij heeft, is het beter om het project drie maanden uit te stellen dan te beginnen en halverwege te stranden.' },
      { kind: 'h2', text: 'Wat als u nog niet klaar bent?' },
      { kind: 'p', text: 'Dan is dat geen probleem, maar een startpunt. In de meeste gevallen liggen de knelpunten op één of twee van de vier gebieden. Wij helpen ook bij het opruimen van die knelpunten, niet omdat wij een consultancybureau zijn, maar omdat een agent op een wankele basis ons beide werk en u geld kost. Het is eerlijker om dat eerst recht te zetten.' },
      { kind: 'p', text: 'Scoort u op alle vier de gebieden redelijk? Dan kunt u morgen beginnen. Kies het saaiste, meest herhaalbare proces dat u heeft. Zorg dat de data op orde is voor dat specifieke proces. Wijs één intern aanspreekpunt aan. En reserveer zes weken voor de eerste versie. Zo simpel is het begin.' },
    ],
    faq: [
      { q: 'Hoe weet ik welk proces ik als eerste moet automatiseren?', a: 'Begin bij het proces dat het vaakst voorkomt en de duidelijkste regels heeft, niet bij het proces dat u het meest ergert. Een voorspelbaar, saai proces staat live in zes weken en levert meteen zichtbaar resultaat. Daarna kunt u stap voor stap complexere situaties aanpakken.' },
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
      { kind: 'p', text: 'Een custom agent wordt gebouwd op uw proces, [uw systemen en uw beleidsregels](/kennis/guardrails-niet-een-rem-maar-een-kompas). De agent sluit aan op Exact of Moneybird, kent uw klantcategorieën, volgt uw escalatiepad. Hij doet precies wat u hem leert, niet meer en niet minder. Dat vraagt een hogere investering vooraf en een goede briefing, maar het resultaat sluit precies aan op hoe u werkt.' },
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
        'Onderhoud en beheer: maandelijkse kosten voor monitoring, [aanpassingen in beleidsregels](/kennis/guardrails-niet-een-rem-maar-een-kompas), updates na wijzigingen in uw werkproces.',
      ] },
      { kind: 'h2', text: 'Wat u in de praktijk betaalt' },
      { kind: 'p', text: 'Voor een enkelvoudige agent die één proces afhandelt, zeg: [het beantwoorden van inkomende klantmails](/oplossingen/klantenservice-automatiseren) op basis van uw FAQ en bestelhistorie, ligt de bouw tussen € 3.000 en € 8.000 eenmalig. Dat is inclusief één integratie, bijvoorbeeld met Moneybird of Exact voor ordergegevens. De maandelijkse modelkosten bij een typisch MKB-volume van 200 tot 600 berichten per maand liggen tussen € 30 en € 90. Beheer en kleine aanpassingen kosten doorgaans € 150 tot € 350 per maand als u dat uitbesteedt.' },
      { kind: 'p', text: 'Bij een complexere agent die meerdere processen combineert, offertes uitsturen, facturen aanmaken, herinneringen versturen, stijgen de bouwkosten naar € 12.000 tot € 25.000. Dat klinkt als veel. Maar tel dan ook mee wat u nu per jaar betaalt aan de mensen die datzelfde doen.' },
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
      { kind: 'p', text: 'Kies één proces. Niet uw hele administratie, maar één ding. Zeg: [het verwerken van binnenkomende orders](/oplossingen/klantenservice-automatiseren). Beantwoord dan drie vragen: hoe vaak gebeurt dit per week, hoeveel minuten kost het per keer, en wie doet het?' },
      { kind: 'p', text: 'Stel: uw binnendienst verwerkt 60 orders per week. Elke order kost gemiddeld 12 minuten: controleren, inboeken in Exact, bevestigingsmail sturen. Dat is 720 minuten per week, ofwel 12 uur. Bij een all-in uurtarief van € 32 voor die medewerker kost dit u € 384 per week, of ruim € 20.000 per jaar. Voor één proces.' },
      { kind: 'h2', text: 'Stap twee: schat wat de agent overneemt' },
      { kind: 'p', text: 'Een agent neemt zelden 100% over. Dat hoeft ook niet. Ga uit van een aandeel dat u zelf conservatief inschat: standaardorders volledig voorbereid, uitzonderingen naar de medewerker. In dit rekenvoorbeeld nemen wij 70 procent. Dan bespaart u 8,4 uur per week, oftewel € 269 per week of circa € 14.000 per jaar.' },
      { kind: 'quote', text: 'Een agent hoeft niet alles over te nemen. 70 procent automatisering van één proces geeft u al een terugverdientijd onder de twaalf maanden.' },
      { kind: 'h2', text: 'Stap drie: zet de investering ertegenover' },
      { kind: 'p', text: 'Een goed gebouwde agent voor dit soort orderverwerking kost bij ons eenmalig tussen de € 4.000 en € 8.000 in bouw, afhankelijk van de complexiteit van de integratie met uw boekhoudpakket. Daarna betaalt u een maandelijks onderhoudsbedrag van gemiddeld € 250 tot € 400 voor hosting, monitoring en kleine aanpassingen.' },
      { kind: 'p', text: 'Reken het door. Bouwkosten € 6.000, onderhoud € 300 per maand. Jaar één: totaalkosten € 9.600. Besparing: € 14.000. Netto voordeel in jaar één: ruim € 4.000. Jaar twee en verder: besparing € 14.000, kosten € 3.600, netto voordeel circa € 10.000 per jaar. Dat is een terugverdientijd van minder dan negen maanden.' },
      { kind: 'h2', text: 'Wat u niet in de rekensom ziet' },
      { kind: 'p', text: 'De besparing in euro\'s is het makkelijke deel. Wat de berekening niet vat, is wat uw medewerker met die 8,4 uur per week gaat doen. Als die tijd gaat naar klantgesprekken, offertes of complexere taken, is de werkelijke opbrengst hoger dan € 14.000. Soms aanzienlijk hoger. Maar dat is moeilijker te voorspellen, en ik vind het onverstandig om daar in een businesscase op te rekenen.' },
      { kind: 'list', items: [
        'Minder fouten: bij handmatige invoer sluipen er onvermijdelijk fouten in. Een agent maakt die niet als de invoer klopt.',
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
        '[Bouw guardrails in vóór u live gaat](/kennis/guardrails-niet-een-rem-maar-een-kompas). Bepaal welke handelingen de agent autonoom mag uitvoeren en welke altijd langs een mens gaan.',
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

  {
    slug: 'change-management-ai-implementatie-team-meekrijgen',
    title: 'AI-implementatie: hoe krijgt u uw team mee?',
    lede: 'De techniek is zelden het struikelblok. Wat wij vaker zien: medewerkers die afhaken, passief wachten of de agent stilletjes omzeilen. Dat is geen koppigheid. Dat is een signaal dat de invoering niet goed is aangepakt.',
    author: 'Sjaak ter Veld',
    published: '2026-06-23',
    readingMinutes: 6,
    tags: ['adoptie', 'cultuur', 'mensen', 'strategie', 'methodiek'],
    blocks: [
      { kind: 'p', text: 'Wij bouwen een agent, trainen uw team er twee keer op, en drie maanden later gebruikt nog maar één iemand hem. De rest werkt gewoon door zoals altijd. Herkenbaar? Bij bijna elk MKB-bedrijf dat zelf zonder begeleiding een AI-tool invoert, ziet het proces er zo uit. Niet omdat de medewerkers dom zijn of dwarsliggen. Maar omdat verandering tijd, uitleg en vertrouwen vraagt. En die drie dingen worden structureel onderschat.' },
      { kind: 'h2', text: 'Waarom weerstand geen probleem is, maar informatie' },
      { kind: 'p', text: 'Als iemand in uw team zegt "ik vertrouw dat ding niet", is dat een vraag in vermomming. Meestal gaat het om één van drie dingen: ze begrijpen niet wat de agent precies doet, ze zijn bang dat ze het straks fout doen als de agent iets geks uitvoert, of ze denken dat hun baan op het spel staat. Al die drie zijn oplosbaar. Maar niet door ze te negeren.' },
      { kind: 'p', text: 'Het gesprek dat bijna nooit gevoerd wordt: "Wat moet de agent voor jou betekenen?" Niet wat de agent technisch kan. Niet wat de ondernemer ervan verwacht. Maar wat uw medewerker zelf kwijt wil, het werk dat energie kost, de fouten die keer op keer terugkomen, [de klantvraag die elke dag hetzelfde is](/oplossingen/klantenservice-automatiseren). Zodra die vraag op tafel ligt, verandert het gesprek. Van "ze moeten dit accepteren" naar "wij lossen dit samen op".' },
      { kind: 'h2', text: 'De drie fasen die werken' },
      { kind: 'p', text: 'Ik zie een vaste volgorde die succesvol is, ongeacht de branche of de grootte van het team. Kort samengevat:' },
      { kind: 'list', items: [
        'Fase 1, betrek vroeg: bespreek nog vóór de bouw welk proces automatisch mag. Laat uw medewerkers meedenken over de regels, niet alleen de uitkomst.',
        'Fase 2, werk samen: laat minstens één medewerker de eerste weken naast de agent werken, niet ernaast. Laat hen fouten ontdekken en rapporteren. Dat eigenaarschap is goud waard.',
        'Fase 3, vier kleine winsten: als de agent voor het eerst een taak foutloos afhandelt die normaal een kwartier kostte, benoem dat. Niet groot, gewoon concreet.',
      ] },
      { kind: 'h2', text: 'Wat u beter kunt vermijden' },
      { kind: 'list', items: [
        'De agent "live zetten" zonder aankondiging. Medewerkers die voor het eerst een automatische mail zien die van hun naam verstuurd lijkt, schrikken.',
        'Trainen in één sessie van twee uur en daarna verwachten dat iedereen het weet. Mensen leren door doen, niet door kijken.',
        'Resultaten meten in week twee. Adoptie kost vier tot tien weken. Wie eerder concludeert dat het mislukt, trekt de stekker eruit op het slechtste moment.',
        'De agent presenteren als oplossing voor een bezettingsprobleem. Als medewerkers denken dat automatisering betekent dat er iemand weg moet, werken ze er niet aan mee.',
      ] },
      { kind: 'quote', text: 'Een agent die niemand gebruikt, lost niets op. Adoptie is geen bijzaak. Het is het werk.' },
      { kind: 'h2', text: 'Één persoon maakt het verschil' },
      { kind: 'p', text: 'Bijna elk succesvol traject dat ik heb begeleid, had één interne trekker. Niet per se de leidinggevende. Soms de administratief medewerker die het eerst zag hoe de agent haar werk makkelijker maakte, en dat doorvertelde aan collega\'s. Die interne ambassadeur is meer waard dan tien trainingen. Zoek die persoon. Geef hem of haar ruimte om te experimenteren en vragen te stellen.' },
      { kind: 'p', text: 'Het is ook de reden dat wij bij nieuwe trajecten altijd vragen: wie in uw bedrijf staat het meest open voor dit soort tools? Dat is het startpunt. Van daaruit werkt adoptie als een olievlek, traag maar zeker.' },
      { kind: 'h2', text: 'Wanneer het echt niet lukt' },
      { kind: 'p', text: 'Soms lukt het niet, ook met goed change management. Dat heeft dan zelden met de agent te maken. Vaker gaat het om een bredere situatie: een team dat al onder druk staat, een reorganisatie op de achtergrond, of een leidinggevende die zelf twijfelt maar dat niet uitspreekt. In die gevallen is het eerlijker om het project een paar maanden te pauzeren dan door te drukken. Een agent die wordt ingevoerd in een team dat geen vertrouwen heeft in zijn omgeving, zal nooit werken. Niet omdat de techniek slecht is, maar omdat vertrouwen de voorwaarde is voor alles wat erop volgt.' },
    ],
    faq: [
      { q: 'Hoe lang duurt het voordat een team een AI-agent normaal gebruikt?', a: 'Reken op vier tot tien weken voor echte adoptie. De eerste twee weken gaan op aan wennen en kleine aanpassingen. Daarna neemt het gebruik geleidelijk toe als er een interne trekker is en de agent duidelijk iets oplost. Wie eerder meet en concludeert dat het mislukt, stopt te vroeg.' },
      { q: 'Hoe ga ik om met medewerkers die bang zijn voor hun baan?', a: 'Bespreek het direct, niet indirect. Leg uit welke taken de agent overneemt en wat de medewerker daarmee vrijspeelt. Koppel dat aan iets wat ze al langer willen doen maar niet aan toekomen. Abstracte geruststelling werkt niet. Concrete voorbeelden wel.' },
      { q: 'Moet ik het hele team trainen of alleen een deel?', a: 'Begin met één of twee mensen die open staan voor de verandering. Laat hen echte ervaring opdoen en laat ze daarna als vraagbaak fungeren voor collega\'s. Groepstrainingen van twee uur werken zelden. Leren door doen, in kleine stappen, is structureel effectiever.' },
      { q: 'Wat doe ik als een medewerker de agent blijft omzeilen?', a: 'Ga het gesprek aan. Vraag wat er precies niet klopt: de output, het vertrouwen, de extra stap in het proces. Vaak zit er een concrete aanpassing achter die te maken heeft met een ontbrekende beleidsregel of een onduidelijke handeling. Los dat op, en de weerstand verdwijnt doorgaans vanzelf.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'interne-rollen-voor-ai-agent-implementatie',
    title: 'Wie heb je intern nodig voor een AI-agent?',
    lede: 'Een AI-agent bouwen zonder interne betrokkenheid werkt niet. Maar u heeft geen IT-afdeling nodig. U heeft drie rollen nodig. En die heeft u waarschijnlijk al in huis.',
    author: 'Sjaak ter Veld',
    published: '2026-06-25',
    readingMinutes: 5,
    tags: ['MKB', 'adoptie', 'mensen', 'samenwerking', 'rolverandering'],
    blocks: [
      { kind: 'p', text: 'De meeste MKB-ondernemers denken bij AI-implementatie aan techniek. Aan servers, aan code, aan mensen met een IT-achtergrond. Dat is begrijpelijk, maar het is niet waar de meeste projecten op stranden. Ze mislukken op het organisatorische vlak: niemand die eigenaarschap voelt, niemand die de regels bijhoudt, niemand die de agent terugstuurt als hij de fout in gaat. Techniek is het makkelijkste deel.' },
      { kind: 'h2', text: 'Rol 1: de proceseigenaar' },
      { kind: 'p', text: 'Dit is de persoon die het proces dat u wilt automatiseren het beste kent. Niet de directeur, maar de medewerker die het dagelijks doet. [De binnendienst die elke klantmail afhandelt](/oplossingen/klantenservice-automatiseren). De planner die de orders inschiet. De boekhouder die facturen controleert.' },
      { kind: 'p', text: 'De proceseigenaar vertelt ons wat de regels zijn, wat de uitzonderingen zijn en waar de agent het mis mag hebben. Zonder die persoon kunnen wij geen goede agent bouwen. Wij kunnen het proces technisch namaken, maar de nuances zitten in het hoofd van de proceseigenaar. Die kennis moet er expliciet uit.' },
      { kind: 'list', items: [
        'Beschikbaarheid: twee tot vier uur per week tijdens de bouwfase, daarna één uur per maand voor beheer.',
        'Taak: regels en uitzonderingen beschrijven, testcases beoordelen, terugkoppelen wat er misgaat.',
        'Profiel: geen technische kennis nodig. Wel kennis van het proces en bereidheid om dat op te schrijven.',
      ] },
      { kind: 'h2', text: 'Rol 2: de beslisser' },
      { kind: 'p', text: '[Elke agent heeft beleidsregels nodig](/kennis/guardrails-niet-een-rem-maar-een-kompas): wat mag automatisch, wat gaat langs een mens, wat nooit zonder goedkeuring. Die regels zijn geen technische beslissingen. Het zijn bedrijfsbeslissingen. Wie mag coulance toepassen? Tot welk bedrag? Welke klanten krijgen een afwijkende aanpak?' },
      { kind: 'p', text: 'De beslisser is meestal de directeur, de operations manager of de financieel verantwoordelijke. Het hoeft maar één iemand te zijn. Wat telt is dat die persoon de bevoegdheid heeft om het beleid vast te stellen én bereid is dat te doen voordat we live gaan. Niet achteraf.' },
      { kind: 'quote', text: 'Een agent zonder vastgesteld beleid is als een nieuwe medewerker zonder inwerkgids. Hij gaat improviseren, en dat wilt u niet.' },
      { kind: 'h2', text: 'Rol 3: de aanspreekpersoon voor techniek' },
      { kind: 'p', text: 'Dit hoeft echt geen technicus te zijn. Het is de persoon die inloggegevens kan aanleveren, die toegang heeft tot uw systemen en die intern de vragen kan beantwoorden die wij stellen. Denk aan toegang tot uw boekhoudpakket, uw CRM, uw mailbox. Iemand die weet hoe uw IT in elkaar zit, maar dat hoeft geen specialist te zijn.' },
      { kind: 'p', text: 'In de praktijk is dit bij kleinere bedrijven vaak de directeur zelf, of de medewerker die de ICT-rekening betaalt en de wachtwoorden beheert. Prima. Als ze maar beschikbaar zijn als wij iets nodig hebben.' },
      { kind: 'list', items: [
        'Toegang tot systemen en inloggegevens voor een testomgeving regelen.',
        'Intern doorschakelen als wij vragen hebben over infrastructuur of licenties.',
        'Nieuwe koppelingen goedkeuren bij de leverancier als dat nodig is.',
      ] },
      { kind: 'h2', text: 'Wat als dezelfde persoon meerdere rollen heeft?' },
      { kind: 'p', text: 'Dat is bij MKB heel gebruikelijk. Een operationeel directeur die het proces het beste kent én de bevoegdheid heeft om beleid te bepalen. Een office manager die ook de IT-toegang beheert. Dat werkt prima, zolang diegene er ook daadwerkelijk tijd voor heeft. De bottleneck bij kleinere bedrijven is zelden het gebrek aan de juiste mensen. Het is het gebrek aan tijd.' },
      { kind: 'p', text: 'Maak vooraf heldere afspraken over beschikbaarheid. Een agent bouwen lukt in zes tot tien weken, maar alleen als de interne aanspreekpunten ook beschikbaar zijn. Als dat halfslachtig is, duurt het twee keer zo lang en wordt het resultaat minder.' },
      { kind: 'h2', text: 'Na de bouw: wie beheert het?' },
      { kind: 'p', text: 'Een agent die live staat is geen afgerond project. Regels veranderen, processen verschuiven, een klacht die steeds terugkomt vraagt om een nieuwe uitzondering. De proceseigenaar is daarvoor de aangewezen persoon. Niet wij, niet uw IT-leverancier. Die persoon zit het dichtst op het werk en merkt als eerste wanneer de agent iets mist.' },
      { kind: 'p', text: 'Plan elke maand een moment van een half uur om de agent te evalueren. Welke uitzonderingen zijn er de afgelopen weken geweest? Welke regels kloppen niet meer? Dat is geen grote tijdsinvestering, maar zonder dat moment veroudert de agent langzaam zonder dat u het merkt.' },
    ],
    faq: [
      { q: 'Heb ik een IT-afdeling nodig om een AI-agent in te voeren?', a: 'Nee. U heeft drie rollen nodig: iemand die het proces kent, iemand die beslissingen mag nemen over beleid en iemand die toegang heeft tot uw systemen. Dat zijn geen technische profielen. Bij veel MKB-bedrijven zijn dat dezelfde één of twee personen die al in dienst zijn.' },
      { q: 'Hoeveel tijd kost het mijn medewerkers?', a: 'Tijdens de bouwfase rekent u op twee tot vier uur per week voor de proceseigenaar. De beslisser is een paar keer nodig voor beleidsgesprekken, samen misschien twee tot drie uur totaal. Na livegang volstaat een half uur per maand voor evaluatie en bijsturing.' },
      { q: 'Wat als niemand intern de tijd heeft?', a: 'Dan is het moment niet goed. Een agent die zonder voldoende interne betrokkenheid wordt gebouwd, past niet op uw werkelijkheid. Uitstel is in dat geval verstandiger dan doorgaan en later opnieuw moeten beginnen. Wij plannen het project pas als de interne rollen duidelijk zijn en beschikbaar.' },
      { q: 'Wie beheert de agent nadat die live staat?', a: 'De proceseigenaar is de eerste verantwoordelijke. Die persoon merkt het eerst als de agent iets mist of een uitzondering niet goed verwerkt. Wij ondersteunen op afstand bij technische aanpassingen, maar het dagelijks toezicht en de beleidsupdates liggen intern.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'ai-roadmap-twaalf-maanden-mkb',
    title: 'Een AI-roadmap voor uw MKB: de komende 12 maanden',
    lede: 'De meeste ondernemers weten dat ze iets met AI moeten doen. Maar wat, wanneer, en in welke volgorde? Een roadmap in vier kwartalen die haalbaar is zonder intern IT-team.',
    author: 'Sjaak ter Veld',
    published: '2026-06-30',
    readingMinutes: 6,
    tags: ['strategie', 'MKB', 'methodiek', 'adoptie', 'proces'],
    blocks: [
      { kind: 'p', text: 'Een roadmap klinkt groter dan het is. Voor een MKB-bedrijf met tien tot vijftig medewerkers is het gewoon een lijst van wat u wanneer aanpakt, zodat u niet ineens vier dingen tegelijk probeert en met vier halverwege-projecten eindigt. Dat heb ik te vaak gezien. De bedoeling van dit artikel is dat u na het lezen weet hoe een realistisch jaar eruitziet.' },
      { kind: 'h2', text: 'Kwartaal 1: ophalen wat u al weet' },
      { kind: 'p', text: 'U begint niet met bouwen. U begint met inventariseren. Welke processen herhaalt uw team elke week? Waar zitten de meeste fouten? Waar gaat tijd naartoe die u liever anders zou besteden? Dit kost twee tot vier weken en hoeft geen groot project te zijn. Een gesprek van een uur per afdeling is genoeg.' },
      { kind: 'p', text: 'Uit die inventarisatie kiest u één proces. Niet het meest indrukwekkende, maar het meest voorspelbare. Iets dat meer dan twee keer per week voorkomt, duidelijke regels heeft en een herkenbaar begin en einde. Denk aan orderbevestigingen verwerken, inkomende facturen doorzetten naar uw boekhouder, of standaardvragen van klanten beantwoorden.' },
      { kind: 'list', items: [
        'Kies één proces, geen drie. Scope-uitbreiding is de meest voorkomende reden dat een eerste pilot mislukt.',
        'Beschrijf het proces op papier voordat u iemand inschakelt. Wie doet wat, in welke volgorde, bij welke uitzonderingen wijkt het af.',
        'Stel een realistisch criterium voor succes: niet \'alles automatiseren\', maar \'de medewerker heeft hier twee uur per week minder aan\'.',
      ] },
      { kind: 'h2', text: 'Kwartaal 2: uw eerste agent live' },
      { kind: 'p', text: 'In het tweede kwartaal bouwt en test u. Voor een goed gekozen eerste proces duurt dat zes tot tien weken. De eerste twee weken gaan naar koppeling met uw bestaande systemen, uw boekhoudpakket, uw CRM, uw mailomgeving. De volgende weken naar testen met echte data, maar met een mens die alles nog even nakijkt voordat het de deur uitgaat.' },
      { kind: 'p', text: 'Die nakijkfase is niet optioneel. Het is waar u leert hoe de agent zich gedraagt bij afwijkende situaties. [U past de beleidsregels aan](/kennis/guardrails-niet-een-rem-maar-een-kompas). U voegt uitzonderingen toe die u in het inventarisatiegesprek niet had bedacht. Na vier weken naast-de-agent werken weet u of u hem kunt vertrouwen. Dan pas gaat hij zelfstandig.' },
      { kind: 'quote', text: 'Een agent die vier weken lang alles goed doet terwijl iemand meekijkt, mag daarna zelfstandig. Niet eerder.' },
      { kind: 'h2', text: 'Kwartaal 3: uitbreiden op basis van wat u hebt geleerd' },
      { kind: 'p', text: 'Uw eerste agent draait. Uw medewerkers hebben er inmiddels een mening over. Sommige dingen werken beter dan u dacht, andere dingen missen ze. Dat is normaal. Nu gaat u twee dingen tegelijk doen: de eerste agent verder verbeteren op basis van die feedback, en een tweede proces voorbereiden.' },
      { kind: 'p', text: 'Het tweede proces mag iets complexer zijn dan het eerste. U hebt nu ervaring met hoe de beleidsregels werken, hoe de koppelingen liggen, en hoe uw mensen reageren op verandering. Die ervaring verkort het tweede project met twintig tot dertig procent. Niet door magie, maar doordat u minder hoeft uit te zoeken.' },
      { kind: 'list', items: [
        'Evalueer de eerste agent formeel: wat werd geautomatiseerd, wat bleef handmatig, wat kostte onverwacht tijd.',
        'Betrek de medewerkers die ermee werken bij de keuze van het tweede proces. Zij zien wat u niet ziet.',
        'Houd de beleidsregels van de eerste agent bij. Verouderde regels zijn een vaker voorkomend probleem dan slechte techniek.',
      ] },
      { kind: 'h2', text: 'Kwartaal 4: structuur voor de lange termijn' },
      { kind: 'p', text: 'Aan het einde van het jaar hebt u twee agents draaien, inzicht in wat werkt in uw organisatie, en een team dat weet hoe het met de tools omgaat. Dat is meer waard dan tien halve pilots. Nu is het moment om de structuur te leggen voor de volgende fase.' },
      { kind: 'p', text: 'Dat betekent: wie is er verantwoordelijk voor het onderhoud van de agents? Wie past de beleidsregels aan als het beleid verandert? Hoe rapporteert u over wat de agents doen? Niet als bureaucratische oefening, maar omdat u anders na twee jaar met agents werkt die niemand meer begrijpt en niemand durft aan te passen.' },
      { kind: 'p', text: 'Aan het einde van kwartaal 4 maakt u een nieuwe inventarisatie. Dezelfde gesprekken per afdeling als in kwartaal 1, maar nu met de ervaring van een jaar. U zult merken dat de lijst met kansrijke processen veel langer is geworden. Niet omdat er meer is, maar omdat uw mensen nu weten wat mogelijk is.' },
    ],
    faq: [
      { q: 'Hoe lang duurt het voordat een eerste AI-agent live gaat bij een MKB-bedrijf?', a: 'Voor een goed gekozen, voorspelbaar proces rekent u op zes tot tien weken van start tot live. Daar zitten de inventarisatie, bouw, koppeling met bestaande systemen en een testfase bij in. Complexere processen of meer koppelingen verlengen dat. Begin met iets eenvoudigs om sneller resultaat te zien.' },
      { q: 'Moet ik een intern IT-team hebben om AI-agents te implementeren?', a: 'Nee. De meeste MKB-bedrijven waarmee wij werken hebben geen intern IT-team. Wat u wel nodig hebt: iemand die het proces goed kent, beslissingsbevoegdheid heeft over de regels, en bereid is vier weken lang mee te kijken tijdens de testfase. De techniek regelen wij.' },
      { q: 'Hoeveel processen kan ik in het eerste jaar automatiseren?', a: 'Reken op twee, maximaal drie. Dat klinkt weinig, maar twee goed draaiende agents met duidelijke beleidsregels en tevreden medewerkers leveren meer op dan vijf halfafgemaakte projecten. De snelheid neemt toe in het tweede jaar, als de infrastructuur en de werkwijze er al liggen.' },
      { q: 'Wat kost een AI-roadmap voor een jaar?', a: 'Dat hangt af van de processen die u kiest en de systemen waaraan gekoppeld moet worden. Een indicatief bandbreedte voor twee agents inclusief bouw, koppelingen, beleidsregels en begeleiding ligt tussen de € 15.000 en € 40.000 voor het eerste jaar. De terugverdientijd is voor de meeste MKB-bedrijven twaalf tot achttien maanden.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'data-kwaliteit-voorwaarde-werkende-ai-agents',
    title: 'Data-kwaliteit: de stille voorwaarde voor werkende agents',
    lede: 'Bedrijven die moeite hebben met hun eerste AI-agent hebben zelden een technisch probleem. Bijna altijd zit de oorzaak eerder: in de data waarop die agent moet werken. Wat dat betekent en wat u eraan doet.',
    author: 'Sjaak ter Veld',
    published: '2026-07-02',
    readingMinutes: 6,
    tags: ['techniek', 'strategie', 'proces', 'systemen', 'adoptie'],
    blocks: [
      { kind: 'p', text: 'Ik voer elk jaar tientallen gesprekken met ondernemers die enthousiast beginnen aan een automatiseringsproject en na zes weken vastlopen. Niet omdat het idee niet deugt, niet omdat de technologie tekortschiet. Maar omdat de gegevens waarop de agent moest werken, nooit op orde waren. De agent pakt een klantrecord, ziet drie verschillende adressen, geen BTW-nummer en een leverancierscontact in een vrije tekstnotitie. Dan stopt hij. Terecht.' },
      { kind: 'h2', text: 'Wat data-kwaliteit eigenlijk betekent' },
      { kind: 'p', text: 'Data-kwaliteit is geen abstract IT-begrip. Het is de vraag of uw systemen de werkelijkheid juist en volledig weergeven. Vier dimensies zijn voor AI-agents het meest bepalend:' },
      { kind: 'list', items: [
        'Volledigheid: zijn de velden die de agent nodig heeft structureel ingevuld, of ontbreken ze bij een kwart van de records?',
        'Eenduidigheid: staat een klant op één plek, of verspreid over drie records omdat iemand een tikfout maakte bij invoer?',
        'Actualiteit: [kloppen de prijzen, contactpersonen en voorraadcijfers nog](/oplossingen/vraagvoorspelling), of werkt u met gegevens van zes maanden geleden?',
        'Structuur: staan de gegevens in vaste velden, of in vrije notitievelden die niemand op dezelfde manier invult?',
      ] },
      { kind: 'p', text: 'Een mens kan om deze gebreken heen werken. Hij belt even, kijkt in zijn hoofd, vraagt een collega. Een agent kan dat niet. Die heeft structurele, betrouwbare invoer nodig om betrouwbare output te geven.' },
      { kind: 'h2', text: 'Hoe u uw eigen situatie beoordeelt' },
      { kind: 'p', text: 'U hoeft geen data-audit van zes weken in te huren. Stel uzelf de volgende vragen over het proces dat u wilt automatiseren:' },
      { kind: 'list', items: [
        'Kan een nieuwe medewerker alle benodigde informatie vinden zonder navraag te doen? Als het antwoord nee is, kan de agent dat ook niet.',
        'Zou u de relevante velden in uw CRM of boekhoudpakket durven exporteren en aan een ander laten zien? Ontbreekt er te veel, dan weet u het antwoord.',
        'Zijn er velden die iedereen anders invult, omdat er nooit afspraken over gemaakt zijn? Die velden moet u aanpakken vóór u bouwt.',
        'Hoe oud zijn de gegevens in de records die de agent dagelijks nodig heeft? Data ouder dan drie maanden die niet automatisch ververst wordt, is een risico.',
      ] },
      { kind: 'h2', text: 'De meest voorkomende problemen per systeemtype' },
      { kind: 'p', text: 'In de praktijk zien wij per type systeem terugkerende patronen. In boekhoudpakketten als Exact, Moneybird en Snelstart is de relatiestamkaart vaak het struikelblok: meerdere records voor dezelfde klant, ontbrekende BTW-nummers, adressen die nooit zijn bijgewerkt na een verhuizing. [In CRM-systemen als Pipedrive of Teamleader](/oplossingen/leadopvolging-automatiseren) zijn het de notitievelden. Iedereen schrijft er iets anders in, en niemand gebruikt de vaste velden consequent. In ordersystemen is het de productstamkaart: artikelcodes die niet overeenkomen met wat de leverancier stuurt, ontbrekende eenheden, dubbele SKU\'s.' },
      { kind: 'p', text: 'Dit zijn structurele gewoontes, geen eenmalige fouten. Ze herstellen niet vanzelf.' },
      { kind: 'h2', text: 'Wat u kunt doen zonder een groot project te starten' },
      { kind: 'p', text: 'U hoeft niet alles tegelijk op te lossen. Dat is de goede nieuws. Het gaat erom dat de data die de agent dagelijks gebruikt, klopt. De rest mag later.' },
      { kind: 'list', items: [
        'Bepaal welke vijf tot tien velden de agent echt nodig heeft voor het eerste proces. Maak die velden verplicht in uw systeem.',
        'Reinig alleen de records die de agent de komende drie maanden zal raken. Alles ouder of inactiever laat u staan.',
        'Spreek afspraken af over hoe die velden worden ingevuld. Niet als memo, maar als hard vereiste bij invoer.',
        'Controleer na twee weken of de nieuwe records consistent zijn. Stuur bij voordat de slechte gewoontes terugkeren.',
      ] },
      { kind: 'quote', text: 'Een agent is zo goed als de gegevens die hij te zien krijgt. Dat is geen beperking van de technologie, dat is een wet van de logica.' },
      { kind: 'h2', text: 'Data-kwaliteit is een mensenprobleem, geen IT-probleem' },
      { kind: 'p', text: 'De diepere oorzaak van slechte data is zelden een slecht systeem. Het is een gebrek aan afspraken over hoe gegevens worden bijgehouden, gecombineerd met tijdsdruk die mensen ertoe brengt snelle notities te maken in plaats van gestructureerde invoer. Een agent die live gaat, maakt dat probleem zichtbaar. Dat is pijnlijk, maar ook nuttig: het geeft u een concrete reden om de afspraken die er altijd hadden moeten zijn, nu eindelijk te maken.' },
      { kind: 'p', text: 'Wacht niet op perfecte data. Perfecte data bestaat niet. Maar bepaal een minimumdrempel, haal die drempel, en bouw dan. In die volgorde.' },
    ],
    faq: [
      { q: 'Hoe schoon moeten mijn gegevens zijn voordat ik begin met een AI-agent?', a: 'Niet perfect, maar gericht. De velden die de agent dagelijks nodig heeft, moeten volledig en eenduidig zijn. Begin met het proces dat u als eerste wilt automatiseren en maak alleen de data schoon die daarvoor nodig is. Dat is te overzien en levert snel resultaat zonder een groot reinigingsproject te moeten opstarten.' },
      { q: 'Wat als mijn CRM of boekhoudpakket veel ontbrekende gegevens heeft?', a: 'Dan brengt u eerst in kaart welke velden de agent echt nodig heeft en herstelt u alleen die velden voor actieve relaties en lopende processen. Maak die velden verplicht bij nieuwe invoer. Historische records met fouten kunt u gefaseerd aanpakken of buiten scope laten voor het eerste project.' },
      { q: 'Kan een AI-agent zelf slechte data herkennen en melden?', a: 'Ja, deels. Een goed gebouwde agent kan detecteren dat een verplicht veld ontbreekt of dat een waarde buiten verwachte grenzen valt, en dan een mens inschakelen in plaats van zelf te gokken. Maar dat is een vangnet, geen vervanging voor nette brondata. De agent betrouwbaarder maken begint bij de data, niet bij de agent.' },
      { q: 'Hoeveel tijd kost het opschonen van data voor een eerste agent-project?', a: 'Als u zich beperkt tot de velden die het eerste proces nodig heeft en alleen actieve records aanpakt, is een tot drie weken realistisch. Dat hangt sterk af van het aantal records en de huidige staat van uw systemen. Een gerichte aanpak is altijd sneller dan een algehele data-audit.' },
    ],
    cluster: 'A',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'avg-en-ai-agents-persoonsgegevens',
    title: 'AVG en AI-agents: wat mag wel en wat niet?',
    lede: 'Veel ondernemers remmen zichzelf af met de gedachte dat AI-agents niet mogen omgaan met persoonsgegevens. Dat klopt niet helemaal. Wat de AVG werkelijk van u vraagt, en waar de echte risico\'s zitten.',
    author: 'Sjaak ter Veld',
    published: '2026-07-07',
    readingMinutes: 6,
    tags: ['governance', 'beleid', 'guardrails', 'MKB', 'strategie'],
    blocks: [
      { kind: 'p', text: '[Een agent die klantvragen beantwoordt](/oplossingen/klantenservice-automatiseren), facturen verwerkt of offertes verstuurt, raakt vrijwel altijd persoonsgegevens. Namen, e-mailadressen, bestelinformatie, soms zelfs betalingsgeschiedenis. De AVG verbiedt dat niet. Wat de wet vraagt, is dat u bewust en gedocumenteerd omgaat met die gegevens. Dat is een ander gesprek dan de meeste ondernemers verwachten.' },
      { kind: 'h2', text: 'De basis: verwerkersgrondslag en doelbinding' },
      { kind: 'p', text: 'Elke verwerking van persoonsgegevens heeft een grondslag nodig. Voor de meeste bedrijfsprocessen is dat ofwel uitvoering van een overeenkomst, ofwel een gerechtvaardigd belang. Een agent die een orderbevestiging verstuurt valt onder de eerste grondslag. Een agent die een klant automatisch een herinnering stuurt voor een openstaande factuur valt onder de tweede. U hoeft daarvoor geen expliciete toestemming te vragen. Wat u wel nodig heeft, is een verwerkersregister.' },
      { kind: 'p', text: 'Doelbinding betekent dat de gegevens die u voor het ene doel verzamelt, niet zomaar voor iets anders gebruikt mogen worden. Klantgegevens die u heeft omdat iemand iets bestelde, mag u niet gebruiken voor een marketingcampagne zonder extra grondslag. Dat geldt ook als een agent die gegevens verwerkt. De agent doet wat u hem opdraagt, dus als de opdracht buiten de grondslag valt, is de agent het probleem niet, maar u als verwerkingsverantwoordelijke.' },
      { kind: 'h2', text: 'Verwerkersovereenkomst: vergeet dit niet' },
      { kind: 'p', text: 'Zodra een externe partij persoonsgegevens verwerkt namens uw organisatie, is een verwerkersovereenkomst verplicht. Dat geldt ook voor het platform waarop uw agent draait. Wij sluiten bij elk project een verwerkersovereenkomst af en zorgen dat de onderliggende infrastructuurpartijen dat ook doen. Maar dit is iets u zelf moet opvragen en bewaren. De Autoriteit Persoonsgegevens beschouwt de afwezigheid van zo\'n overeenkomst als een directe overtreding, ook als er feitelijk niets misging.' },
      { kind: 'list', items: [
        'Vraag bij elke nieuwe tooling of leverancier of er een verwerkersovereenkomst beschikbaar is.',
        'Bewaar de overeenkomst in uw eigen administratie, niet alleen bij de leverancier.',
        'Controleer of de verwerking plaatsvindt binnen de Europese Economische Ruimte, of dat er adequate waarborgen zijn voor overdracht buiten de EER.',
        'Leg vast welke categorieën persoonsgegevens de agent verwerkt en met welk doel.',
        'Update uw verwerkersregister zodra u een nieuwe agent in gebruik neemt.',
      ] },
      { kind: 'h2', text: 'Wat een agent absoluut niet zelfstandig mag doen' },
      { kind: 'p', text: 'Er zijn situaties waarin een mens de beslissing moet nemen. De AVG heeft hiervoor een specifieke bepaling: volledig geautomatiseerde besluitvorming met rechtsgevolgen voor een persoon is in beginsel verboden. Concreet: een agent mag geen creditbeoordeling doen die automatisch leidt tot weigering van een order, geen sollicitant afwijzen zonder menselijke tussenkomst, en geen klant blokkeren op basis van een score zonder dat iemand dat heeft beoordeeld. De agent mag die informatie verzamelen en een voorstel doen. De beslissing moet bij een mens liggen.' },
      { kind: 'quote', text: 'De agent verzamelt, weegt en adviseert. De mens beslist. Dat is niet alleen AVG-conform, het is ook gewoon verstandig.' },
      { kind: 'h2', text: 'Bijzondere categorieën: hier stopt de agent' },
      { kind: 'p', text: 'Gezondheidsgegevens, politieke opvattingen, etnische achtergrond, biometrische gegevens, dit zijn bijzondere categorieën onder de AVG. Verwerking is in principe verboden, tenzij u valt onder een van de uitzonderingen. Voor de meeste MKB-bedrijven is geen van die uitzonderingen van toepassing. Bouw uw agent zo dat hij deze gegevens niet opslaat, niet uitleest en er geen actie op onderneemt. Als een klant in een bericht iets over zijn gezondheid schrijft en de agent antwoordt op basis van die informatie, zit u al snel in een grijs gebied.' },
      { kind: 'h2', text: 'Dataretentie: hoe lang bewaart de agent gegevens?' },
      { kind: 'p', text: 'Een agent die gesprekshistorie bijhoudt om context te hebben, slaat gegevens op. Die opslag heeft een bewaartermijn nodig. Bepaal vooraf hoe lang conversatielogs bewaard worden, wie er toegang toe heeft en wanneer ze worden gewist. In de praktijk werkt een termijn van 90 dagen voor conversatielogs goed voor de meeste servicegerichte toepassingen. Transactiegegevens vallen onder fiscale bewaarplichten en houden andere termijnen aan. Leg beide vast.' },
      { kind: 'h2', text: 'Wat u vandaag kunt doen' },
      { kind: 'p', text: 'AVG-compliance voor AI-agents is geen eenmalige exercitie. Het begint met de juiste vragen stellen voordat u bouwt: welke gegevens verwerkt de agent, op welke grondslag, met welke bewaartermijn, en wie is waarvoor verantwoordelijk. Als u die vier vragen kunt beantwoorden voordat u live gaat, heeft u al meer in orde dan de meeste organisaties die ik spreek.' },
    ],
    faq: [
      { q: 'Mag een AI-agent persoonsgegevens verwerken?', a: 'Ja, dat mag, mits er een geldige verwerkingsgrondslag is, zoals uitvoering van een overeenkomst of gerechtvaardigd belang. U bent als verwerkingsverantwoordelijke verplicht dit te documenteren in een verwerkersregister en een verwerkersovereenkomst af te sluiten met de partij die de agent host.' },
      { q: 'Is toestemming van klanten vereist voordat een agent hun gegevens verwerkt?', a: 'Niet altijd. Voor de uitvoering van een bestelling of het versturen van een factuur is toestemming niet nodig; de grondslag is dan de overeenkomst. Toestemming is wel vereist als u gegevens wilt gebruiken voor doelen waarvoor geen andere grondslag bestaat, zoals direct marketing buiten de bestaande klantrelatie.' },
      { q: 'Wat is geautomatiseerde besluitvorming en wanneer is dat verboden?', a: 'Geautomatiseerde besluitvorming houdt in dat een systeem zonder menselijke tussenkomst een beslissing neemt die rechtsgevolgen heeft voor een persoon. Dat is in beginsel verboden onder de AVG. Een agent mag wel informatie verzamelen en een advies geven, maar de uiteindelijke beslissing, zoals het weigeren van een order of het blokkeren van een klant, moet altijd door een mens worden genomen.' },
      { q: 'Hoe lang mag een AI-agent gesprekshistorie bewaren?', a: 'De AVG schrijft geen vaste termijn voor, maar vereist dat u een termijn vastlegt die niet langer is dan noodzakelijk voor het doel. Voor klantenservice-logs werkt 90 dagen in de praktijk goed. Transactiegegevens vallen onder de fiscale bewaarplicht van zeven jaar. Leg uw keuzes schriftelijk vast en controleer ze jaarlijks.' },
    ],
    cluster: 'B',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'ai-act-2026-wat-verandert-voor-mkb',
    title: 'De AI-act in 2026: wat verandert er voor u?',
    lede: 'De Europese AI-act is geen vage toekomstmuziek meer. Vanaf 2026 gelden de eerste verplichtingen ook voor Nederlandse MKB-bedrijven. Wat u concreet moet weten voordat u een agent in productie neemt.',
    author: 'Sjaak ter Veld',
    published: '2026-07-09',
    readingMinutes: 6,
    tags: ['governance', 'beleid', 'MKB', 'strategie', 'guardrails'],
    blocks: [
      { kind: 'p', text: 'De AI-act is op 1 augustus 2024 in werking getreden en rolt in fasen uit. Veel ondernemers dachten dat het iets was voor grote techbedrijven. Dat klopt voor de zwaarste categorieën. Maar wie AI-agents inzet in zijn bedrijfsvoering, voor klantenservice, hrm, kredietbeoordeling of personeelsplanning, heeft te maken met verplichtingen die al dit jaar ingaan. Niet over drie jaar.' },
      { kind: 'h2', text: 'Wat de AI-act onderscheidt: risicocategorieën' },
      { kind: 'p', text: 'De wet werkt met vier risiconiveaus. Voor MKB-bedrijven zijn er twee die er toe doen in de praktijk.' },
      { kind: 'list', items: [
        'Onaanvaardbaar risico: verboden toepassingen. Denk aan social scoring of manipulatieve systemen. U komt hier als MKB\'er niet in de buurt.',
        'Hoog risico: strenge verplichtingen. Hieronder vallen onder meer systemen voor personeelsselectie, kredietbeoordeling en toegang tot diensten. Wie hier een agent voor inzet, moet documentatie, audits en menselijk toezicht aantonen.',
        'Beperkt risico: transparantieplicht. [Als een klant een chatbot te woord staat](/diensten/vergelijken/ai-agent-vs-chatbot), moet duidelijk zijn dat het een AI is. Dit geldt voor vrijwel elke klantenservice-agent.',
        'Minimaal risico: geen extra verplichtingen. De meeste interne procesautomatisering valt hier. Denk aan orderverwerking of factuurverwerking.',
      ] },
      { kind: 'h2', text: 'Wat in 2026 concreet geldt' },
      { kind: 'p', text: 'Vanaf februari 2025 zijn de verboden toepassingen van kracht. Vanaf augustus 2026 gelden de volledige verplichtingen voor hoog-risico-systemen, inclusief documentatieplicht, conformiteitsbeoordeling en registratie in een EU-database. Dat klinkt zwaar. Voor de meeste MKB-toepassingen valt het mee, mits u goed documenteert wat uw agent doet.' },
      { kind: 'p', text: 'Wat direct actie vraagt: de transparantieplicht bij klantencontact. Elke agent die communiceert met klanten, via e-mail, chat of telefoon, moet zichzelf als AI identificeren. Dat is eenvoudig in te bouwen, maar het moet expliciet geregeld zijn. Dit is niet iets om later te doen.' },
      { kind: 'h2', text: 'De hoog-risico-grens: wanneer geldt die voor u?' },
      { kind: 'p', text: 'De vraag die ik het meest krijg: "valt mijn agent onder hoog risico?" Het antwoord hangt af van waarvoor u de agent inzet, niet van hoe de technologie werkt. Bijlage III van de AI-act somt de categorieën op. De relevante voor MKB:' },
      { kind: 'list', items: [
        'Werving en selectie van personeel: automatisch sorteren van cv\'s of beoordelen van sollicitanten valt hieronder.',
        'Krediet- en verzekeringsbeoordeling: een agent die beslist of u een klant op rekening levert, kan hieronder vallen.',
        'Personeelsbeheer: automatische beoordeling van prestaties of planning op basis van profilering.',
        'Toegang tot publieke diensten: minder relevant voor MKB, maar relevant voor zorgaanbieders en onderwijsinstellingen.',
      ] },
      { kind: 'p', text: 'Bent u in geen van deze categorieën actief? Dan valt uw agent waarschijnlijk onder minimaal of beperkt risico. Dat betekent niet dat er helemaal niets geldt, maar de administratieve last is beheersbaar.' },
      { kind: 'h2', text: 'Wat u praktisch kunt regelen' },
      { kind: 'p', text: 'Wij adviseren elk MKB-bedrijf dat AI-agents gebruikt drie dingen vast te leggen, ongeacht de risicocategorie. Dit beschermt u juridisch en maakt audits een stuk eenvoudiger als ze ooit komen.' },
      { kind: 'list', items: [
        'Gebruik-logging: bewaar wat de agent beslist heeft en op basis van welke input. Geen uitputtende technische logs, maar een leesbaar spoor van beslissingen.',
        'Menselijk toezicht: beschrijf schriftelijk welke beslissingen de agent autonoom neemt en welke langs een medewerker gaan. Dit is ook [waarom guardrails zo belangrijk zijn](/kennis/guardrails-niet-een-rem-maar-een-kompas).',
        'Transparantie naar klanten: zorg dat uw privacyverklaring en klantcommunicatie vermelden dat AI wordt ingezet. Eén zin is genoeg, mits die er staat.',
      ] },
      { kind: 'quote', text: 'De AI-act vraagt niet dat u stopt met automatiseren. Hij vraagt dat u kunt uitleggen wat uw systeem doet en waarom.' },
      { kind: 'h2', text: 'Wat nog onduidelijk is' },
      { kind: 'p', text: 'De AI-act laat ruimte voor nationale interpretatie op een aantal punten. De Nederlandse toezichthouder, de Autoriteit Persoonsgegevens heeft een rol, maar er komt ook een aparte AI-autoriteit, heeft nog niet alle handhavingsprioriteiten gepubliceerd. Dat betekent dat de precieze invulling van begrippen als "wezenlijke invloed op een persoon" in 2026 nog niet volledig uitgekristalliseerd is.' },
      { kind: 'p', text: 'Mijn advies: wacht niet op die duidelijkheid. De richting staat vast. Wie nu goed documenteert en menselijk toezicht inbouwt, zit bij elke uitwerking goed. Wie nu niets doet en later terugkijkt, heeft een inhaalslag te maken die duurder is dan de oorspronkelijke inrichting.' },
    ],
    faq: [
      { q: 'Geldt de AI-act ook voor kleine MKB-bedrijven?', a: 'Ja. De AI-act maakt geen uitzondering op basis van bedrijfsomvang voor de meeste verplichtingen. Wel zijn er lichtere eisen voor aanbieders van minimaal-risico-toepassingen. Als u een agent inzet voor klantencontact, orderverwerking of personeelsselectie, gelden de relevante regels ongeacht uw grootte.' },
      { q: 'Wat is het verschil tussen aanbieder en gebruiker in de AI-act?', a: 'Een aanbieder brengt een AI-systeem op de markt of in gebruik bij anderen. Een gebruiker (in de AI-act \'deployer\' genoemd) zet een bestaand systeem in voor eigen bedrijfsvoering. MKB-bedrijven die een agent laten bouwen of inkopen en zelf gebruiken, zijn deployers. De zwaarste verplichtingen rusten op aanbieders, maar deployers hebben eigen transparantie- en toezichtsverplichtingen.' },
      { q: 'Wat moet ik doen als mijn agent klanten te woord staat?', a: 'U bent verplicht klanten te informeren dat ze met een AI-systeem communiceren. Dit geldt zodra de interactie niet overduidelijk een geautomatiseerd systeem is. Een standaardzin aan het begin van het gesprek of in uw privacyverklaring volstaat voor de meeste gevallen. Zorg dat dit vastligt voordat de agent live gaat.' },
      { q: 'Wat zijn de boetes bij overtreding van de AI-act?', a: 'Voor verboden toepassingen loopt de boete op tot 35 miljoen euro of 7 procent van de wereldwijde jaaromzet. Voor schendingen van andere verplichtingen is dat 15 miljoen of 3 procent. Handhaving richt zich in eerste instantie op grote partijen en structurele overtredingen, maar dat is geen reden om naleving uit te stellen.' },
    ],
    cluster: 'B',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'hallucinaties-beperken-productie-agents',
    title: 'Hallucinaties in productie-agents: zo beperkt u ze',
    lede: 'Een agent die zelfverzekerd een verkeerd rekeningnummer doorstuurt of een niet-bestaande levertijd bevestigt, kost u klanten. Hallucinaties zijn te beperken, maar niet met één instelling. Dit zijn de technieken die in de praktijk werken.',
    author: 'Sjaak ter Veld',
    published: '2026-07-16',
    readingMinutes: 6,
    tags: ['techniek', 'guardrails', 'beleid', 'governance', 'MKB'],
    blocks: [
      { kind: 'p', text: 'Hallucinaties zijn het meest genoemde bezwaar als ik met ondernemers over AI-agents praat. Terecht, want de schade is niet abstract. Een agent die een klant verkeerde informatie geeft over een product, prijs of status kost vertrouwen dat u moeizaam hebt opgebouwd. Maar de oplossing is niet \'de agent uitzetten\'. De oplossing is een combinatie van ontwerp, databeheer en beleidsregels die samenwerken.' },
      { kind: 'h2', text: 'Wat een hallucinatie eigenlijk is' },
      { kind: 'p', text: 'Een taalmodel verzint niets met opzet. Het genereert de meest waarschijnlijke volgende tekst op basis van wat het heeft geleerd en wat u het als context meegeeft. Klopt die context niet, of ontbreekt ze, dan vult het model de leegte in. Dat invullen voelt voor de lezer als een feit, ook als het nergens op slaat.' },
      { kind: 'p', text: 'In productie betekent dat: geef de agent altijd de juiste context mee. Dat klinkt simpel, maar vereist bewuste architectuurkeuzes. Een agent die een klant helpt met een bestelstatus moet die status ophalen uit uw systeem, niet raden op basis van eerdere gesprekken.' },
      { kind: 'h2', text: 'Techniek 1: grond elke uitspraak in een databron' },
      { kind: 'p', text: 'De meest effectieve maatregel is het principe dat een agent niets mag beweren wat hij niet heeft opgehaald uit een betrouwbare bron. In de praktijk richt je dit zo in:' },
      { kind: 'list', items: [
        'Koppel de agent aan uw actuele systemen, zoals uw boekhoudpakket, CRM of voorraadadministratie, en laat hem feiten altijd live opvragen voor hij antwoord geeft.',
        'Geef de agent een instructie mee dat hij bij ontbrekende informatie expliciet meldt dat hij het niet weet, in plaats van een gok te doen.',
        'Houd de bronnen gescheiden van de conversatie: context uit uw systemen gaat via een aparte stap, niet door de agent te vragen het zelf te herinneren.',
      ] },
      { kind: 'h2', text: 'Techniek 2: beperk het speelveld' },
      { kind: 'p', text: 'Hoe smaller het domein van de agent, hoe kleiner de kans op een hallucinatie. Een agent die uitsluitend vragen beantwoordt over uw eigen productcatalogus heeft veel minder ruimte om iets te verzinnen dan een agent die in principe over alles kan praten.' },
      { kind: 'p', text: 'Definieer in het systeemprompt van de agent exact wat zijn taakveld is. Mails buiten dat taakveld stuurt hij door naar een mens, zonder antwoord te geven. Dat voelt beknellend, maar het is juist de discipline die de agent betrouwbaar maakt.' },
      { kind: 'quote', text: 'Een agent die weet wat hij niet weet, is waardevoller dan een agent die altijd een antwoord heeft.' },
      { kind: 'h2', text: 'Techniek 3: validatie vóór verzending' },
      { kind: 'p', text: 'Voeg een validatiestap in tussen het antwoord dat de agent opstelt en het moment dat het naar de klant gaat. Dat kan een tweede controle door het model zelf zijn op basis van een checklist, maar ook een automatische verificatie tegen uw databron. Wij bouwen dit standaard in als de agent klantgerichte berichten verstuurt.' },
      { kind: 'list', items: [
        'Bevat het antwoord een prijs? Controleer of die prijs overeenkomt met de actuele prijs in het systeem.',
        'Bevat het antwoord een levertijd of datum? [Toets die aan de planning of voorraadstatus](/oplossingen/vraagvoorspelling).',
        'Bevat het antwoord een naam of referentienummer? Verifieer of die daadwerkelijk bestaat in uw administratie.',
        'Klopt er iets niet? Stuur het bericht niet, maar zet het in een wachtrij voor menselijke review.',
      ] },
      { kind: 'h2', text: 'Techniek 4: logging en terugkoppeling' },
      { kind: 'p', text: 'Een agent in productie zonder logging is een systeem dat u niet kunt verbeteren. Sla elk gesprek op, markeer gevallen waarbij een mens moest ingrijpen, en bekijk die wekelijks. Na vier tot acht weken ziet u patronen: welke vragen leiden steeds tot twijfelachtige antwoorden, welke databron ontbreekt, welke beleidsregel onduidelijk is.' },
      { kind: 'p', text: 'Die terugkoppeling is niet optioneel. Een agent die in januari goed functioneert, kan in april de mist ingaan als uw productaanbod of werkwijze is veranderd maar de instructies niet zijn bijgewerkt. Behandel de agent als een medewerker die regelmatig feedback nodig heeft, niet als software die u eenmalig installeert.' },
      { kind: 'h2', text: 'Wat dit betekent voor uw implementatie' },
      { kind: 'p', text: 'Begin bij de bron: uw data. Als uw CRM vervuilde klantgegevens bevat, vergroot u het risico op fouten, ongeacht hoe goed de agent is geconfigureerd. [Schone data is de basis](/kennis/data-kwaliteit-voorwaarde-werkende-ai-agents). Daarna komen de technische maatregelen: databronkoppeling, domeinbeperking, validatie, logging. Geen van die stappen is ingewikkeld op zichzelf. De moeite zit in het samenspel en het volhouden.' },
    ],
    faq: [
      { q: 'Zijn hallucinaties bij AI-agents volledig te voorkomen?', a: 'Volledig voorkomen is niet realistisch, maar het risico is sterk te beperken. Door de agent te koppelen aan uw actuele systemen, het taakveld te beperken en elke uitspraak te valideren tegen een databron, komt u in de praktijk tot een foutmarge die vergelijkbaar is met die van een medewerker die handmatig werkt. Het gaat om beheersing, niet om perfectie.' },
      { q: 'Hoe merk ik dat mijn agent hallucinaties produceert?', a: 'Logging is de enige betrouwbare manier. Sla elk gesprek op en bekijk wekelijks de gevallen waarbij een mens moest ingrijpen of waarbij een klant een fout meldde. Patronen worden zichtbaar na vier tot acht weken. Zonder logging heeft u geen zicht op wat er feitelijk gebeurt en kunt u niets structureel verbeteren.' },
      { q: 'Moet ik mijn data opschonen voordat ik een agent implementeer?', a: 'Ja. Een agent herhaalt en versterkt wat er in uw systemen staat. Vervuilde klantgegevens, verouderde productinformatie of inconsistente statussen leiden direct tot foute antwoorden. Een basiscontrole van uw databronnen vooraf bespaart aanzienlijk veel correctiewerk achteraf.' },
      { q: 'Wat is een validatiestap en hoe werkt dat technisch?', a: 'Een validatiestap is een automatische controle tussen het antwoord van de agent en het moment van verzending. Het systeem vergelijkt de inhoud van het antwoord, zoals een prijs of levertijd, met de actuele waarde in uw databron. Klopt het niet, dan gaat het bericht naar een menselijke wachtrij in plaats van naar de klant.' },
    ],
    cluster: 'B',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'human-in-the-loop-wanneer-wel-niet',
    title: 'Human-in-the-loop: wanneer wel en wanneer niet?',
    lede: 'Een agent die altijd om goedkeuring vraagt, wint u niets. Een agent die nooit om goedkeuring vraagt, is een risico. Hoe bepaalt u precies waar de grens ligt?',
    author: 'Sjaak ter Veld',
    published: '2026-07-21',
    readingMinutes: 6,
    tags: ['governance', 'guardrails', 'beleid', 'strategie', 'agents'],
    blocks: [
      { kind: 'p', text: 'De vraag stelt zich bij vrijwel elk project: op welke momenten mag de agent zelfstandig handelen, en wanneer moet er een mens aan te pas komen? Het is verleidelijk om dat achteraf te regelen, als de agent al live is. Mijn ervaring is dat u dat omgekeerd moet aanpakken. Bepaal de grens vóórdat u bouwt, en codeer hem in beleid.' },
      { kind: 'h2', text: 'Waarom altijd goedkeuring vragen averechts werkt' },
      { kind: 'p', text: 'Sommige ondernemers starten voorzichtig: de agent stelt voor, de medewerker klikt akkoord. Klinkt veilig. Maar na twee weken klikt de medewerker zonder te lezen. De goedkeuring is theater geworden. U heeft dan het slechtste van twee werelden: de snelheid van een mens, de foutgevoeligheid van een agent die nooit gecorrigeerd wordt.' },
      { kind: 'p', text: 'Human-in-the-loop werkt alleen als de mens daadwerkelijk iets bijdraagt op het moment dat hij tussenkomt. Dat vraagt om een scherpe keuze: voor welke beslissingen is menselijk oordeel echt noodzakelijk, en voor welke is het alleen maar geruststelling?' },
      { kind: 'h2', text: 'Het raamwerk: vier vragen per handeling' },
      { kind: 'p', text: 'Ik loop bij elk project vier vragen af voor elke handeling die een agent kan uitvoeren. Samen geven ze een helder antwoord over waar een mens nodig is.' },
      { kind: 'list', items: [
        'Wat is de maximale schade als de agent hier een fout maakt? Zet een bedrag of een concrete consequentie. Geen bedrag kunnen noemen betekent dat u het risico nog niet begrijpt.',
        'Is de fout omkeerbaar? Een verstuurde factuur is lastiger terug te draaien dan een conceptmail in de map Concepten.',
        'Heeft de agent genoeg context om deze beslissing consistent goed te nemen? Als het antwoord afhangt van klantgeschiedenis of gevoeligheid die niet in de data zit, is menselijk oordeel nodig.',
        'Hoe vaak gebeurt dit? Een handeling die driemaal per jaar voorkomt, mag altijd langs een mens. Driehonderd keer per maand niet.',
      ] },
      { kind: 'h2', text: 'Wanneer u de mens er altijd tussengooit' },
      { kind: 'p', text: 'Er zijn situaties waarbij tussenkomst van een mens geen optie is maar een vereiste. Niet vanwege onzekerheid over de agent, maar vanwege de aard van de beslissing.' },
      { kind: 'list', items: [
        'Financiële verplichtingen boven een drempelbedrag dat u zelf vaststelt. Bij een maakbedrijf kan dat € 2.000 zijn, bij een groothandel € 10.000.',
        'Communicatie bij een klacht waarbij de klantrelatie op het spel staat, zeker bij klanten boven een bepaalde omzetdrempel.',
        'Juridisch bindende berichten: opzeggingen, aanmaningen in de laatste fase, [offertes met afwijkende voorwaarden](/oplossingen/leadopvolging-automatiseren).',
        'Situaties waarbij de agent aangeeft dat hij er niet uitkomt. Als het vertrouwensniveau van de agent laag is, moet dat altijd escaleren.',
        'Nieuwe klanten of leveranciers waar nog geen historische data over bestaat.',
      ] },
      { kind: 'h2', text: 'Wanneer de agent zelfstandig mag handelen' },
      { kind: 'p', text: 'Automatisch verwerken zonder tussenkomst is gerechtvaardigd als de handeling routinematig is, de regels volledig beschreven zijn, en de consequentie bij een fout beperkt en herstelbaar is. In de praktijk gaat het dan om zaken als orderbevestigingen versturen na een succesvolle kredietcheck, herinneringen plannen op vaste termijnen, of een ticketstatus bijwerken op basis van een klantreactie.' },
      { kind: 'quote', text: 'De agent handelt zelfstandig als de regel volledig beschreven is en de fout herstelbaar is. Anders niet.' },
      { kind: 'h2', text: 'Het tussengebied: asynchroon reviewen' },
      { kind: 'p', text: 'Er is een derde vorm die veel ondernemers over het hoofd zien: de agent handelt, maar legt een log aan die een medewerker dagelijks of wekelijks doorloopt. Niet om goed te keuren vooraf, maar om patronen op te vangen achteraf. Dit werkt goed voor handelingen die te frequent zijn voor realtime goedkeuring, maar waarbij u vinger aan de pols wilt houden. Bij een HR-dienstverlener pasten we dit toe op automatisch verstuurde contractwijzigingen: de agent stuurde ze, een medewerker bekeek elke ochtend in vijf minuten de samenvatting van de vorige dag.' },
      { kind: 'h2', text: 'Eén praktische vuistregel' },
      { kind: 'p', text: 'Begin met een strenge instelling en verruim daarna op basis van ervaring. Het is veel makkelijker om een grens te verleggen nadat u drie maanden gezien heeft dat de agent het goed doet, dan om achteraf een fout terug te draaien die in honderd dossiers doorgewerkt is. Vertrouwen bouwt u op door te meten, niet door aan te nemen.' },
    ],
    faq: [
      { q: 'Moet een AI-agent altijd goedkeuring vragen aan een medewerker?', a: 'Nee. Altijd goedkeuring vragen leidt ertoe dat medewerkers zonder nadenken klikken, wat de controle illusoir maakt. Bepaal per type handeling of menselijk oordeel daadwerkelijk iets toevoegt. Routinematige, omkeerbare acties mag de agent zelfstandig uitvoeren. Voor financiële verplichtingen, juridische berichten of gevoelige klantcommunicatie is tussenkomst van een mens een vereiste.' },
      { q: 'Hoe stel ik een drempelbedrag in voor automatische goedkeuring?', a: 'Ga uit van de maximale schade die u accepteert zonder tussenkomst. Kijk naar uw gemiddelde orderwaarde, uw meest voorkomende factuurgrootte en wat herstelbaar is zonder reputatieschade. Een praktisch startpunt: automatisch onder de € 500, altijd langs een mens boven de € 2.000, en een wekelijkse review voor het tussengebied. Pas dat aan op basis van wat u de eerste maanden observeert.' },
      { q: 'Wat is asynchroon reviewen bij een AI-agent?', a: 'De agent handelt zelfstandig, maar legt elke actie vast in een log. Een medewerker doorloopt dat log dagelijks of wekelijks. Dit is geen goedkeuring vooraf, maar een vangnet achteraf. Het werkt goed voor frequente, laagrisico-acties waarbij u toch grip wilt houden op patronen en afwijkingen.' },
      { q: 'Wat doe ik als de agent aangeeft er zelf niet uit te komen?', a: 'Zorg dat elke agent een escalatiepad heeft. Als het vertrouwensniveau van de agent onder een ingestelde drempel valt, gooit hij de taak automatisch over de schutting naar een medewerker, met context erbij. Dat is geen tekortkoming van de agent, maar een bewuste ontwerpkeuze. Bouw dit in vóór u live gaat.' },
    ],
    cluster: 'B',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'agents-koppelen-exact-twinfield-afas',
    title: 'AI-agents koppelen aan Exact, Twinfield of AFAS',
    lede: 'Drie van de meestgebruikte boekhoudpakketten in het Nederlandse MKB. Elk met eigen koppelmogelijkheden, eigen eigenaardigheden en eigen valkuilen. Wat u moet weten voordat u begint.',
    author: 'Sjaak ter Veld',
    published: '2026-07-23',
    readingMinutes: 6,
    tags: ['integraties', 'boekhouder', 'systemen', 'techniek', 'MKB'],
    blocks: [
      { kind: 'p', text: 'Wanneer een ondernemer overweegt een agent te bouwen voor facturatie, debiteurenbeheer of inkoopverwerking, komt al snel de vraag: hoe praat die agent straks met ons boekhoudpakket? Terechte vraag. De koppeling tussen een agent en uw financiële administratie is bepalend voor hoeveel hij werkelijk kan automatiseren. Geen koppeling betekent dat uw medewerker alsnog handmatig gegevens overneemt, en dat is precies wat u wilde voorkomen.' },
      { kind: 'h2', text: 'Exact: de meest gangbare koppeling' },
      { kind: 'p', text: 'Exact Online heeft een uitgebreide REST API die real-time werkt. Een agent kan via die API facturen ophalen, aanmaken, betalingen uitlezen en relaties opzoeken. De documentatie is goed op orde. Aansluiten kost doorgaans twee tot vier dagen werk, afhankelijk van hoeveel entiteiten u nodig hebt.' },
      { kind: 'p', text: 'Waar u rekening mee moet houden: Exact werkt per divisie. Als u meerdere bedrijfsentiteiten heeft in één Exact-omgeving, moet de agent weten in welke divisie hij moet werken. Dat klinkt technisch, maar het is vooral een configuratievraag die u vooraf beantwoordt. Een tweede aandachtspunt is de OAuth-authenticatie. Exact vereist dat een gebruiker eenmalig toestemming verleent via een browserflow. Daarna verloopt het automatisch. Dat eenmalige moment regelen we tijdens de implementatie.' },
      { kind: 'h2', text: 'Twinfield: solide maar minder bekend' },
      { kind: 'p', text: 'Twinfield wordt veel gebruikt door accountantskantoren en hun klanten. De API is XML-gebaseerd, wat ouder aandoet dan de REST-interfaces van Exact of AFAS, maar het werkt betrouwbaar. Een agent kan boekingen aanmaken, openstaande posten opvragen en relatiegegevens uitlezen. Het inrichten van de koppeling vraagt iets meer technische kennis van de Twinfield-structuur, met name rondom grootboekrekeningen en kostenplaatsen.' },
      { kind: 'p', text: 'Twinfield heeft ook een webservices-interface die directe bestandsuitwisseling mogelijk maakt. Dat is nuttig als [uw agent inkoopfacturen verwerkt](/oplossingen/inkoop-automatiseren) die via e-mail binnenkomen: de agent leest de bijlage uit, structureert de gegevens en boekt ze via de webservice direct in. Voor middelgrote bedrijven met een eigen accountant die Twinfield beheert, werkt dit goed zolang u de grootboekinrichting van tevoren afspreekt.' },
      { kind: 'h2', text: 'AFAS: veel mogelijk, maar eigenwijzer' },
      { kind: 'p', text: 'AFAS is meer dan alleen boekhoudsoftware. Het omvat ook HR, CRM en projectadministratie. Dat maakt de koppelmogelijkheden breder, maar ook complexer. AFAS werkt met een eigen connector-laag genaamd GetConnectors en UpdateConnectors. Die zijn flexibel, maar vereisen dat iemand bij AFAS of bij u intern de juiste connectors heeft ingericht.' },
      { kind: 'p', text: 'Een agent die facturen moet aanmaken in AFAS heeft een UpdateConnector nodig die daarvoor is geconfigureerd. Als die connector er nog niet is, moet een AFAS-beheerder hem aanmaken. Dat is geen ict-probleem, maar een beheervraagstuk. Plan dit in als [onderdeel van uw implementatietraject](/kennis/ai-implementeren-vijf-stappen-mkb), anders loopt u er tegenaan op het moment dat u wilt livegang.' },
      { kind: 'list', items: [
        'Exact Online: REST API, goed gedocumenteerd, twee tot vier dagen koppelwerk, let op divisie-structuur.',
        'Twinfield: XML-webservices, stabiel, iets meer configuratie rond grootboekrekeningen en kostenplaatsen.',
        'AFAS: GetConnectors en UpdateConnectors, breed inzetbaar maar afhankelijk van intern AFAS-beheer.',
        'Bij alle drie geldt: regel testomgeving en beperkte API-rechten vooraf, niet achteraf.',
        'De agent leest altijd eerst, schrijft pas nadat u de regels voor automatisch boeken hebt vastgesteld.',
      ] },
      { kind: 'h2', text: 'Wat u vooraf regelt' },
      { kind: 'p', text: 'Ongeacht welk pakket u gebruikt, zijn er drie dingen die u vóór de bouw regelt. Eén: toegang tot een testomgeving of een gesandboxte account. Zo bouwen en testen we zonder dat er iets misgaat in uw live administratie. Twee: een lijst van de entiteiten die de agent mag lezen en schrijven. Facturen ja, grootboekinstellingen nee. Dat is een beslissing van u, niet van ons. Drie: uw rekeningschema of een voorbeeld van hoe een handmatige boeking er normaal uitziet. Zonder dat referentiepunt boekt de agent in het luchtledige.' },
      { kind: 'quote', text: 'Een agent die correct boekt, is een agent die de logica van uw administratie kent. Niet die van het gemiddelde MKB-bedrijf.' },
      { kind: 'h2', text: 'Hoever mag de agent gaan zonder bevestiging?' },
      { kind: 'p', text: 'Dit is de vraag die het meest over het hoofd wordt gezien. Technisch kan een agent veel: facturen aanmaken, betalingen inplannen, crediteuren verwerken. Maar wat hij mág doen zonder menselijke bevestiging, is een beleidskeuze. Wij adviseren om te beginnen met lezen en signaleren, en pas na twee tot vier weken gebruik de schrijfrechten open te zetten voor de handelingen die in de praktijk foutloos verlopen.' },
      { kind: 'p', text: 'Een debiteurenagent die openstaande facturen opspoort en een herinnering klaarzet ter goedkeuring, geeft u grip. Een agent die ook meteen verzendt zonder dat u het ziet, is een stap verder. Beide zijn mogelijk. De eerste is verstandiger om mee te beginnen.' },
    ],
    faq: [
      { q: 'Kan een AI-agent automatisch facturen aanmaken in Exact Online?', a: 'Ja, dat kan via de REST API van Exact. De agent maakt facturen aan op basis van door u ingestelde regels, zoals een afgeleverde order of een goedgekeurd project. Wij raden aan om de eerste weken te werken met een goedkeuringsstap, zodat u controle houdt tot het proces bewezen betrouwbaar is.' },
      { q: 'Werkt een AI-agent ook met AFAS als wij dat gebruiken voor zowel boekhouding als HR?', a: 'Ja. AFAS biedt via GetConnectors en UpdateConnectors toegang tot vrijwel alle modules, inclusief HR en financieel. Voorwaarde is dat uw AFAS-beheerder de juiste connectors inricht. Dat is doorgaans een dag werk. Daarna kan de agent over meerdere AFAS-modules heen werken.' },
      { q: 'Wat als onze boekhouder Twinfield beheert en wij geen technische kennis in huis hebben?', a: 'Dan regelen wij de koppeling in overleg met uw accountant of boekhouder. Wij hebben de API-documentatie nodig, toegang tot een testomgeving en afspraken over welke grootboekrekeningen de agent mag gebruiken. Uw boekhouder hoeft daar zelf geen code voor te schrijven.' },
      { q: 'Is het veilig om een AI-agent schrijftoegang te geven tot mijn boekhoudpakket?', a: 'Mits u de rechten beperkt tot de noodzakelijke entiteiten, is het risico beheersbaar. Wij werken altijd met een account met minimale rechten, gescheiden van uw beheerdersaccount. Daarnaast stellen we guardrails in: bedragen boven een door u bepaalde grens gaan altijd langs een medewerker voor akkoord.' },
    ],
    cluster: 'B',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'multi-agent-systemen-wanneer-meer-dan-een-agent',
    title: 'Multi-agent systemen: wanneer heeft u meer dan één nodig?',
    lede: 'Eén agent lost één probleem op. Maar soms zijn het er meer. Wanneer is een tweede agent zinvol, wanneer is het onnodig, en hoe voorkomt u dat u een systeem bouwt dat niemand meer begrijpt?',
    author: 'Sjaak ter Veld',
    published: '2026-07-28',
    readingMinutes: 6,
    tags: ['techniek', 'agents', 'strategie', 'proces', 'systemen'],
    blocks: [
      { kind: 'p', text: 'De meeste bedrijven beginnen goed: één agent, één taak, goed gedefinieerd. Maar na een paar maanden komt de vraag: kunnen we die agent ook nog dit laten doen? En dat? Voor u het weet heeft u een agent die alles kan en niets meer goed doet. Het alternatief is een multi-agent systeem. Maar ook dat is geen vrije doorgang naar complexiteit.' },
      { kind: 'h2', text: 'Wat een multi-agent systeem eigenlijk is' },
      { kind: 'p', text: 'Bij een multi-agent systeem werken twee of meer gespecialiseerde agents samen. De ene herkent binnenkomende verzoeken en stuurt ze door. De andere haalt informatie op. Een derde schrijft de reactie. Ze zijn elk verantwoordelijk voor een klein stuk, en communiceren via gestructureerde berichten of gedeeld geheugen.' },
      { kind: 'p', text: 'Het klinkt technisch, maar de analogie is eenvoudig: denk aan een klein kantoor. De receptioniste neemt de telefoon op, noteert de vraag, geeft die door aan de juiste collega, en stuurt de bevestiging zodra het antwoord klaar is. Niemand verwacht van de receptioniste dat ze ook de boekhouding doet.' },
      { kind: 'h2', text: 'Drie signalen dat u een tweede agent nodig heeft' },
      { kind: 'list', items: [
        'Uw huidige agent doet taken die niets met elkaar te maken hebben. [Een agent die offertes maakt](/oplossingen/leadopvolging-automatiseren) én klachten afhandelt én voorraadupdates verstuurt, is geen gespecialiseerde agent meer. Dat is een junk drawer.',
        'De instructies van uw agent zijn langer dan één A4. Als u meer dan vijftien regels nodig heeft om uit te leggen wat de agent moet doen, is de taak waarschijnlijk te breed voor één agent.',
        'De foutgevoeligheid stijgt naarmate de agent meer taken krijgt. Een tweede agent voor een specifiek onderdeel brengt de foutmarge terug naar een beheersbaar niveau.',
      ] },
      { kind: 'h2', text: 'Een praktisch voorbeeld' },
      { kind: 'p', text: 'Bij een bedrijf in technische dienstverlening verwerkte één agent zowel de binnenkomende serviceaanvragen als de bijbehorende facturatie. Dat werkte aanvankelijk. Maar zodra het volume steeg, liep de agent soms de stappen door elkaar. Een servicebon werd bevestigd voordat de factuur klaar was, of omgekeerd.' },
      { kind: 'p', text: 'De oplossing was een splitsing: één agent voor klantkommunicatie en planning, één agent voor de financiële afhandeling. Beide kregen hun eigen instructies en hun eigen verbinding met de betreffende systemen. De eerste werkte via de planningsmodule, de tweede via Exact. Sindsdien lopen de twee processen parallel en onafhankelijk van elkaar.' },
      { kind: 'quote', text: 'Twee eenvoudige agents die elk één ding goed doen, zijn betrouwbaarder dan één complexe agent die alles probeert.' },
      { kind: 'h2', text: 'Wanneer u nog geen tweede agent nodig heeft' },
      { kind: 'p', text: 'Niet elke uitbreiding vraagt om een nieuwe agent. Soms is het antwoord een extra stap binnen dezelfde agent, of een extra beleidsregel. Als de taken sterk overlappende context hebben, dezelfde gegevensbronnen gebruiken en door dezelfde medewerker worden gemonitord, is uitbreiden van de bestaande agent veelal eenvoudiger dan een tweede bouwen.' },
      { kind: 'list', items: [
        'Taken delen dezelfde databron: één agent is waarschijnlijk voldoende.',
        'Taken vereisen verschillende systemen of rechten: overweeg een splitsing.',
        'Taken worden door verschillende medewerkers gecontroleerd: splitsing maakt verantwoordelijkheid helderder.',
        'Taken hebben elk een andere frequentie of urgentie: aparte agents geven elk hun eigen prioriteitenlogica.',
      ] },
      { kind: 'h2', text: 'De valkuil van de orchestrator' },
      { kind: 'p', text: 'Wie een multi-agent systeem bouwt, heeft al snel de neiging een derde agent toe te voegen die de andere twee aanstuurt: de zogenaamde orchestrator. Dat kan zinvol zijn, maar het introduceert ook een extra schakel die kan falen. Mijn vuistregel: gebruik een orchestrator pas als de twee agents anders geen informatie kunnen uitwisselen die ze allebei nodig hebben. Als ze volledig onafhankelijk van elkaar werken, is een orchestrator overbodig.' },
      { kind: 'p', text: 'Een systeem van twee onafhankelijke agents die elk hun eigen triggermoment hebben, is vaak robuuster dan een hiërarchie van drie agents waarbij alles door één middelpunt loopt. Hoe meer schakels, hoe groter de kans op een storing die u niet meteen ziet.' },
      { kind: 'h2', text: 'Hoe u het overzicht bewaart' },
      { kind: 'p', text: 'Multi-agent systemen worden snel onoverzichtelijk als er geen eigenaar is per agent. Wijs voor elke agent één medewerker aan die de instructies kent, de logboeken kan lezen en de eerste verantwoordelijke is als er iets misgaat. Dat hoeft geen technische rol te zijn. Het is een beheerrol, vergelijkbaar met wie de agenda bijhoudt van een gedeelde mailbox.' },
      { kind: 'p', text: 'Begin klein. Eén agent goed werkend is altijd de betere startpositie. De tweede agent bouwt u pas als de eerste stabiel draait en u precies weet wat die niet meer moet doen.' },
    ],
    faq: [
      { q: 'Hoeveel agents heb ik nodig voor mijn MKB-bedrijf?', a: 'Voor de meeste MKB-bedrijven zijn één tot drie agents genoeg om de grootste proceswinst te behalen. Begin met één agent voor het meest voorspelbare proces. Een tweede agent voegt u toe zodra de eerste stabiel draait en u een tweede duidelijk afgebakend proces wilt automatiseren. Meer is zelden beter als de basis niet op orde is.' },
      { q: 'Wat is het verschil tussen één agent uitbreiden en een tweede agent bouwen?', a: 'Als de nieuwe taak dezelfde databronnen en dezelfde beleidsregels gebruikt, is uitbreiden van de bestaande agent logischer. Gebruikt de nieuwe taak andere systemen, andere rechten of een andere verantwoordelijke medewerker, dan is een aparte agent duidelijker en betrouwbaarder. De grens ligt bij complexiteit en verantwoordelijkheid.' },
      { q: 'Kan een agent andere agents aansturen?', a: 'Ja, dat heet een orchestrator-agent. Die is zinvol als twee agents informatie moeten uitwisselen die ze elk afzonderlijk niet hebben. Maar een orchestrator introduceert ook een extra schakel. Als uw agents volledig onafhankelijk van elkaar werken, heeft u geen orchestrator nodig en beperkt u het risico op onzichtbare fouten.' },
      { q: 'Hoe houd ik overzicht als ik meerdere agents heb?', a: 'Wijs per agent één verantwoordelijke medewerker aan die de instructies kent en de logboeken bijhoudt. Dat hoeft geen technische functie te zijn. Documenteer per agent wat hij doet, welke systemen hij gebruikt en wanneer hij een mens inschakelt. Zonder die documentatie groeit een multi-agent systeem al snel uit tot iets dat niemand meer begrijpt.' },
    ],
    cluster: 'B',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'veilig-rag-bouwen-op-bedrijfsdata',
    title: 'Veilig RAG bouwen op uw bedrijfsdata: praktische randvoorwaarden',
    lede: 'Een agent die uw eigen documenten raadpleegt klinkt ideaal. Dat is het ook, mits de fundering klopt. De meeste problemen ontstaan niet bij de AI zelf, maar bij wat er vóór de AI komt.',
    author: 'Sjaak ter Veld',
    published: '2026-07-30',
    readingMinutes: 6,
    tags: ['techniek', 'systemen', 'governance', 'guardrails', 'integraties'],
    blocks: [
      { kind: 'p', text: 'RAG staat voor Retrieval-Augmented Generation: de techniek waarbij een AI-agent niet op geheugen vertrouwt, maar actief uw eigen documenten doorzoekt voordat hij antwoord geeft. Prijslijsten, interne procedures, contracten, productspecificaties. Dat klinkt goed, en dat is het ook. Maar zonder de juiste randvoorwaarden geeft zo\'n agent antwoorden op basis van verouderde, onvolledige of zelfs vertrouwelijke informatie die hij eigenlijk niet had mogen zien.' },
      { kind: 'h2', text: 'Wat RAG precies doet en waar het misgaat' },
      { kind: 'p', text: 'De agent zoekt bij elke vraag door een index van uw documenten, haalt de meest relevante fragmenten op en combineert die met zijn taalvaardigheid tot een antwoord. Dat werkt goed zolang de index betrouwbaar is. De problemen die ik het vaakst tegenkom zijn niet technisch van aard: ze zijn organisatorisch. Documenten staan door elkaar, zijn niet gedateerd, of bevatten tegenstrijdige versies van hetzelfde beleid.' },
      { kind: 'p', text: 'Een tweede risico is toegangsbeheer. Wie mag welke documenten zien? Bij een eenvoudige RAG-implementatie zonder autorisatielaag ziet elke gebruiker alles wat in de index zit. HR-dossiers naast productbrochures. Dat is zelden de bedoeling.' },
      { kind: 'h2', text: 'De vier randvoorwaarden die u vooraf regelt' },
      { kind: 'list', items: [
        'Documentbeheer op orde: elk document heeft een eigenaar, een versiedatum en een status (actueel, verlopen, concept). Verouderde documenten uit de index houden is minstens zo belangrijk als nieuwe documenten toevoegen.',
        'Toegangslagen per rol: [een agent die inkoopmedewerkers bedient](/oplossingen/inkoop-automatiseren) heeft geen toegang nodig tot salarisgegevens. Bouw autorisatie in op documentniveau, niet achteraf op systeemniveau.',
        'Bronvermelding in elk antwoord: de agent geeft altijd aan uit welk document hij put, inclusief datum. Zo kan een gebruiker zelf verifiëren of de bron nog geldig is.',
        'Een testset van referentievragen: stel voor livegang twintig tot dertig vragen waarvan u het juiste antwoord kent. Meet of de agent ze goed beantwoordt, en doe dat elke keer als u documenten wijzigt.',
      ] },
      { kind: 'h2', text: 'Welke documenten wel en niet in de index horen' },
      { kind: 'p', text: 'Niet alles wat in een gedeelde map staat is geschikt. Ik gebruik een simpele indeling. Documenten die horen in de index zijn stabiel, breed toepasbaar en feitelijk van aard: productspecificaties, tariefkaarten, algemene voorwaarden, werkprocedures. Documenten die er niet in horen zijn persoonsgebonden, juridisch gevoelig of zo contextafhankelijk dat een fragment ervan meer kwaad dan goed doet.' },
      { kind: 'list', items: [
        'Wél: actuele productdocumentatie, interne handleidingen, goedgekeurde sjablonen, FAQ-documenten.',
        'Niet zonder extra beveiligingslaag: arbeidscontracten, beoordelingsgesprekken, klachtendossiers, onderhandelingsposities.',
        'Nooit zonder expliciete toestemming en AVG-toets: documenten met persoonsgegevens van klanten of medewerkers.',
      ] },
      { kind: 'h2', text: 'Hoe u de index actueel houdt' },
      { kind: 'p', text: 'Een RAG-systeem is geen project dat u eenmalig afrondt. De index veroudert zodra uw bedrijfsvoering verandert. Dat betekent dat u een beheerproces nodig heeft, niet alleen een bouwtechnische oplossing. In de praktijk werkt een maandelijkse review het best: een vaste eigenaar per documentcategorie controleert of zijn bronnen nog kloppen. Bij meer dan vijf à tien procent verouderde documenten neemt de betrouwbaarheid merkbaar af.' },
      { kind: 'quote', text: 'Een RAG-agent is zo betrouwbaar als zijn minst actuele document. Documentbeheer is geen IT-taak, het is een bedrijfstaak.' },
      { kind: 'h2', text: 'AVG en gegevensbescherming' },
      { kind: 'p', text: 'Als uw index documenten bevat met persoonsgegevens, bent u verplicht te kunnen aantonen dat de verwerking rechtmatig is, dat de gegevens niet langer worden bewaard dan nodig, en dat toegang beperkt is tot wie dat nodig heeft. Dat geldt ook als een AI-agent de data alleen leest en niet opslaat. Laat een AVG-toets uitvoeren voordat u klantdossiers of HR-gegevens in de index opneemt. Dat is geen formaliteit; het is bescherming voor uzelf.' },
      { kind: 'h2', text: 'Een realistisch startpunt' },
      { kind: 'p', text: 'Begin met één documentcategorie die overzichtelijk is en geen persoonsgegevens bevat. Productinformatie of interne procedures werken goed als startpunt. Bewijs dat het systeem betrouwbaar antwoorden geeft op die categorie, en breid daarna stap voor stap uit. Zes weken voor een solide eerste versie is haalbaar, mits de documenten op orde zijn voordat u begint.' },
    ],
    faq: [
      { q: 'Wat is het verschil tussen RAG en een gewone chatbot?', a: 'Een gewone chatbot werkt op basis van wat het taalmodel tijdens zijn training heeft geleerd. Een RAG-agent doorzoekt actief uw eigen documenten bij elke vraag en baseert zijn antwoord op die specifieke bronnen. Dat maakt hem veel geschikter voor bedrijfsspecifieke kennis, maar stelt hogere eisen aan de kwaliteit en actualiteit van uw documentatie.' },
      { q: 'Mag ik klantgegevens opnemen in een RAG-index?', a: 'Dat mag alleen als u aan de AVG-vereisten voldoet: een rechtmatige grondslag, beperkte toegang, een bewaartermijn en aantoonbare technische beveiliging. In de praktijk adviseer ik om klantgegevens pas in de index op te nemen nadat een AVG-toets is uitgevoerd. Begin liever met documentatie die geen persoonsgegevens bevat.' },
      { q: 'Hoe voorkom ik dat een medewerker informatie ziet die niet voor hem bedoeld is?', a: 'Door autorisatie op documentniveau in te bouwen. Elke gebruiker of rol krijgt toegang tot een afgebakende subset van de index. Dat vereist wat meer technische inrichting bij de bouw, maar is onmisbaar zodra uw index meer dan één afdeling bedient. Achteraf inbouwen is veel kostbaarder dan vooraf meenemen.' },
      { q: 'Hoe vaak moet ik de RAG-index bijwerken?', a: 'Minimaal maandelijks een review, en direct bij elke wijziging in beleid, tarieven of procedures. Wijs per documentcategorie een eigenaar aan die verantwoordelijk is voor de actualiteit. Verouderde documenten in de index zijn de voornaamste oorzaak van onjuiste antwoorden, niet de techniek zelf.' },
    ],
    cluster: 'B',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'logging-monitoring-ai-agents-wat-moet-u-zien',
    title: 'Logging en monitoring van agents: wat moet u zien?',
    lede: 'Een agent die draait maar niet te controleren is, is een agent die u niet vertrouwt. Terecht. Goede monitoring is geen luxe voor grote bedrijven. Het is de basisvereiste voordat u iets live zet.',
    author: 'Sjaak ter Veld',
    published: '2026-08-04',
    readingMinutes: 6,
    tags: ['techniek', 'guardrails', 'governance', 'beleid', 'transparantie'],
    blocks: [
      { kind: 'p', text: 'De vraag die ik het vaakst hoor als een agent al een paar weken draait: "Hoe weet ik eigenlijk wat hij heeft gedaan?" Dat is precies de goede vraag. Niet omdat er iets misgegaan is, maar omdat u dat überhaupt zou moeten kunnen zien. Logging en monitoring zijn de enige manier om een agent écht te vertrouwen in plaats van te hopen dat het goed gaat.' },
      { kind: 'h2', text: 'Wat logging is en waarom het niet hetzelfde is als monitoring' },
      { kind: 'p', text: 'Logging is het vastleggen van wat er is gebeurd. Monitoring is het actief in de gaten houden of er iets is dat uw aandacht nodig heeft. Beide zijn nodig, maar voor verschillende doelen. Logging vertelt u achteraf wat de agent heeft gedaan. Monitoring vertelt u nu of er iets opvallends aan de hand is.' },
      { kind: 'p', text: 'In de praktijk zien wij dat MKB-bedrijven beginnen zonder beide. De agent doet iets, de uitkomst wordt verwerkt, en niemand kijkt mee. Dat werkt prima totdat het een keer misgaat en u niet meer kunt reconstrueren waarom.' },
      { kind: 'h2', text: 'Vijf dingen die u altijd moet kunnen terugzien' },
      { kind: 'list', items: [
        'Welke taak is uitgevoerd, op welk moment, op basis van welke invoer. Zonder dit kunt u een fout niet reproduceren.',
        'Welke beslissing heeft de agent genomen en op basis van welke regel. Niet alleen de uitkomst, maar ook het pad ernaartoe.',
        'Of de actie automatisch is uitgevoerd of langs een mens is gegaan. Dat onderscheid is cruciaal voor uw AVG-verantwoordelijkheid.',
        'Wat het systeem heeft teruggegeven na de actie. Een geslaagde boeking in Exact, een mislukte API-call, een time-out.',
        'Welke uitzonderingen zijn opgetreden en hoe de agent daarmee is omgegaan. Heeft hij een fallback toegepast, gestopt, of toch doorgegaan?',
      ] },
      { kind: 'h2', text: 'Wanneer u een melding wilt krijgen' },
      { kind: 'p', text: 'Niet elke logmelding is een actie waard. De kunst is onderscheiden wat uw aandacht nodig heeft en wat niet. Wij richten standaard drie soorten meldingen in bij elke agent die we bouwen.' },
      { kind: 'list', items: [
        'Fouten die de taak hebben geblokkeerd. De agent kon iets niet afmaken. Dat wilt u altijd weten, dezelfde dag.',
        'Afwijkingen van normaal volume. [Als een agent maandag 40 facturen verwerkt](/diensten/ai-automatisering) en woensdag ineens 4, klopt er iets niet in de aanvoer.',
        'Acties boven een drempel die u zelf bepaalt. Bedragen, aantallen, klantcategorieën. Alles wat u normaal zelf zou controleren.',
      ] },
      { kind: 'quote', text: 'Een agent die u niet kunt auditen, kunt u niet verantwoorden. Aan uzelf niet, en aan uw klant niet.' },
      { kind: 'h2', text: 'Hoe lang bewaart u de logs' },
      { kind: 'p', text: 'Voor processen met financiële of juridische gevolgen geldt dezelfde bewaartermijn als voor de onderliggende documenten. Factuurverwerking: zeven jaar. Klachtafhandeling: afhankelijk van uw sectorregels. Voor interne processen zonder externe verplichtingen hanteren wij als richtlijn drie maanden. Lang genoeg om patronen te herkennen, kort genoeg om geen onnodige gegevens te bewaren.' },
      { kind: 'p', text: 'Let op: als de agent persoonsgegevens verwerkt, vallen de logs ook onder de AVG. Bewaar dan niet meer dan nodig en zorg dat toegang beperkt is tot wie die logs ook echt nodig heeft.' },
      { kind: 'h2', text: 'Wat u praktisch kunt inrichten zonder technische kennis' },
      { kind: 'p', text: 'U hoeft geen aparte monitoringtool aan te schaffen. Wij leveren bij elke agent een eenvoudig logscherm mee: een overzicht van de laatste uitgevoerde taken, met een groene of rode status, een tijdstempel en de mogelijkheid om één taak uit te klappen voor detail. Dat is voor de meeste MKB-bedrijven voldoende. Pas als de aantallen groeien boven de honderd acties per dag, heeft het zin om te kijken naar een apart dashboard.' },
      { kind: 'p', text: 'Het belangrijkste is dat iemand in uw organisatie die verantwoordelijkheid krijgt. Niet een technicus die logs bekijkt om technische redenen, maar iemand die het proces begrijpt en merkt wanneer een uitkomst niet klopt. Twee minuten per dag. Meer is het niet.' },
    ],
    faq: [
      { q: 'Moet ik dure software aanschaffen voor monitoring van een AI-agent?', a: 'Nee. Voor de meeste MKB-toepassingen volstaat een ingebouwd logscherm met taakoverzicht, tijdstempel en statuskleur. Aparte monitoringtools worden pas relevant boven de honderd acties per dag of bij meerdere agents parallel. Begin eenvoudig en breid uit als de volumes dat rechtvaardigen.' },
      { q: 'Wie is verantwoordelijk als een AI-agent een fout maakt?', a: 'De ondernemer blijft eindverantwoordelijk, ook als een agent de beslissing heeft genomen. Goede logging helpt u te laten zien welke regels er golden, wat de agent heeft gedaan en of die regels zijn gevolgd. Dat is geen garantie, maar het is wel de basis voor een verdedigbaar verweer bij een klacht of audit.' },
      { q: 'Hoe vaak moet ik de logs van mijn agent bekijken?', a: 'Dagelijks, maar kort. Een snelle blik op het overzicht van de afgelopen 24 uur, gericht op fouten en afwijkingen. Reserveer één keer per maand een langere blik op trends: neemt het foutpercentage toe, zijn er processen die vaker uitzonderingen triggeren dan verwacht?' },
      { q: 'Vallen AI-agent logs onder de AVG?', a: 'Zodra de logs gegevens bevatten over identificeerbare personen, bijvoorbeeld klantnamen of e-mailadressen, vallen ze onder de AVG. Beperk de bewaartermijn tot wat nodig is voor uw doel, beperk de toegang tot betrokken medewerkers, en leg vast wie toegang heeft en waarom.' },
    ],
    cluster: 'B',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'ai-in-accountancy-wat-verandert-2026',
    title: 'AI in de accountancy: wat verandert er in 2026?',
    lede: 'Accountantskantoren staan onder druk. Niet alleen door personeelstekort, maar ook omdat hun klanten, MKB-bedrijven, steeds vaker vragen om meer dan een jaarrekening. AI verandert wat accountants doen, hoe ze dat doen, en wat u van hen mag verwachten.',
    author: 'Sjaak ter Veld',
    published: '2026-08-06',
    readingMinutes: 6,
    tags: ['MKB', 'integraties', 'rolverandering', 'strategie', 'trends'],
    blocks: [
      { kind: 'p', text: 'Als u eens per kwartaal contact heeft met uw accountant, is de kans groot dat dat contact de komende twee jaar van aard verandert. Niet omdat uw accountant een andere persoon wordt, maar omdat een deel van het werk dat hij of zij nu handmatig doet, straks geautomatiseerd is. Dat heeft gevolgen voor de prijs, de snelheid en het type advies dat u krijgt.' },
      { kind: 'h2', text: 'Wat accountants nu nog handmatig doen' },
      { kind: 'p', text: 'Een groot deel van het werk bij een accountantskantoor is regelmatig, voorspelbaar en documentgedreven. Bonnetjes verwerken, bankafschriften matchen, btw-aangiften opstellen, salarisspecificaties controleren. Dit zijn precies de taken waarop AI-agents goed presteren. Ze zijn beschrijfbaar, herhaalbaar en hebben een duidelijk begin en einde.' },
      { kind: 'p', text: 'Kantoren die Exact, Twinfield, AFAS of Snelstart gebruiken, kunnen al heute een flink deel van die documentverwerking automatiseren. Scannen, herkennen, boeken, dat vergt straks geen menselijke handeling meer. Wat overblijft is controleren op uitzonderingen en beoordelen wat de cijfers betekenen.' },
      { kind: 'h2', text: 'Drie verschuivingen die u direct raken' },
      { kind: 'list', items: [
        'Snellere tussentijdse rapportages: waar u nu eens per kwartaal inzicht krijgt, kunnen geautomatiseerde boekingen en dashboards u wekelijks of zelfs dagelijks bijhouden.',
        'Minder uren, andere tariefopbouw: als de verwerkingstijd daalt, verschuift de rekening van uren naar abonnement of advieswaarde. Vraag uw accountant hoe hij daarmee omgaat.',
        'Meer signalering, minder registratie: een agent die continu meekijkt, kan afwijkingen sneller signaleren dan een mens die eens per maand in de boeken duikt. Achterstallige debiteuren, ongebruikelijke kostenposten, cashflow-dips, dat soort observaties komen eerder op tafel.',
      ] },
      { kind: 'h2', text: 'Wat uw accountant waarschijnlijk niet vertelt' },
      { kind: 'p', text: 'Veel kantoren zijn nog midden in de omslag. Ze experimenteren intern, maar communiceren er weinig over naar klanten. Dat is begrijpelijk, wie vertelt er graag dat zijn vaste uurtarief straks onder druk staat? Maar het betekent wel dat u zelf de vraag moet stellen: wat automatiseert u al, en wat betekent dat voor mijn kosten de komende twee jaar?' },
      { kind: 'p', text: 'Dezelfde vraag geldt voor uw eigen administratie. Als uw accountant straks documenten geautomatiseerd verwerkt, dan helpt het als u aanlevert in een formaat dat daarvoor geschikt is. PDF-facturen die via e-mail binnenkomen zijn verwerkbaar. Een handgeschreven bonnetje op foto is dat minder.' },
      { kind: 'quote', text: 'Accountancy verandert niet door AI. Accountancy wordt zichtbaarder door AI, en dat is iets anders.' },
      { kind: 'h2', text: 'Wat u zelf kunt doen' },
      { kind: 'p', text: 'U hoeft de AI-strategie van uw accountant niet over te nemen. Maar u kunt uw eigen administratie zo inrichten dat ze makkelijk aansluit. Dat begint bij het [consequent digitaal aanleveren van inkoop- en verkoopfacturen](/oplossingen/inkoop-automatiseren), het gebruik van een koppelbaar boekhoudpakket zoals Moneybird of Snelstart, en het afspreken van een duidelijk proces voor bankafschriften.' },
      { kind: 'list', items: [
        'Stel uw accountant de vraag: welke aanleversystematiek werkt het beste voor geautomatiseerde verwerking?',
        'Controleer of uw boekhoudpakket een directe API-koppeling ondersteunt, dat scheelt handmatig exporteren.',
        'Bespreek of tussentijdse rapportages standaard kunnen worden in plaats van op aanvraag.',
        'Vraag naar de tariefopbouw voor 2027, als die nog op uurregistratie staat, is de automatisering nog niet doorgevoerd.',
      ] },
      { kind: 'h2', text: 'De grens van automatisering' },
      { kind: 'p', text: 'Niet alles verandert. De aangifte vennootschapsbelasting voor een bedrijf met complexe deelnemingen, een overname waarbij goodwill moet worden bepaald, een arbeidsconflict met financiële consequenties, dat vraagt om een accountant die begrijpt hoe uw bedrijf werkt en welke risico\'s er spelen. Een agent kan de data aanreiken. De weging blijft mensenwerk.' },
      { kind: 'p', text: 'De kantoren die in 2026 het beste presteren voor MKB-klanten zijn niet de kantoren die het meest geautomatiseerd hebben, maar de kantoren die de vrijgekomen tijd het meest zinvol inzetten: voor advies, voor signalering, voor het gesprek dat tot nu toe niet plaatsvond omdat de urenregistratie het niet toeliet.' },
    ],
    faq: [
      { q: 'Wordt mijn accountantsrekening lager door AI?', a: 'Niet automatisch. Als uw kantoor AI inzet om verwerkingstijd te reduceren maar de tariefopbouw niet aanpast, merkt u er financieel niets van. Vraag expliciet naar hoe de kantoorkosten zich de komende jaren ontwikkelen en of er een overgang naar vaste abonnementen in het verschiet ligt.' },
      { q: 'Moet ik mijn administratie anders inrichten voor AI-verwerking?', a: 'Grotendeels niet. Als u al digitaal factureert via een pakket als Moneybird, Snelstart of Exact, bent u er klaar voor. Het grootste verschil zit in consistentie: facturen altijd als gestructureerde PDF aanleveren, geen foto\'s van bonnetjes, en bankafschriften via directe koppeling in plaats van handmatig exporteren.' },
      { q: 'Wat doet een AI-agent bij een accountantskantoor precies?', a: 'In de praktijk gaat het om documenten herkennen en boeken, btw-bedragen controleren, debiteuren bewaken en rapportages samenstellen op basis van actuele data. De agent verwerkt en signaleert. De accountant beoordeelt, weegt en adviseert. De taakverdeling verschuift, de verantwoordelijkheid blijft bij de mens.' },
      { q: 'Is mijn financiële data veilig als mijn accountant AI gebruikt?', a: 'Dat hangt af van hoe het kantoor het heeft ingericht. Stel vragen over waar data wordt opgeslagen, of er verwerking plaatsvindt buiten de EU, en of de verwerking voldoet aan de AVG. Een serieus kantoor heeft hier een verwerkersovereenkomst voor en kan u die op verzoek toesturen.' },
    ],
    cluster: 'C',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'offerte-automatisering-installatietechniek-drie-patronen',
    title: 'Offerte-automatisering in de installatietechniek: drie patronen',
    lede: 'Een installateur vraagt een offerte aan voor een warmtepompinstallatie. Drie dagen later is er nog geen reactie. Niet door onwil, maar omdat uw calculator alweer drie andere projecten op zijn bureau heeft liggen. Dit patroon herhaalt zich dagelijks.',
    author: 'Sjaak ter Veld',
    published: '2026-08-10',
    readingMinutes: 7,
    tags: ['MKB', 'proces', 'integraties', 'strategie', 'efficiency'],
    blocks: [
      { kind: 'p', text: 'De aanvraag komt binnen via de website. Uw binnendienst noteert het verzoek, stuurt een bevestiging, en zet het door naar de calculator. Die heeft al vier openstaande offertes. Het nieuwe verzoek belandt onderaan de stapel. Drie dagen later mailt de klant: "Heeft u onze aanvraag ontvangen?" Dat is het moment waarop u weet dat er ergens in het proces iets kapot is.' },
      { kind: 'p', text: 'In de installatietechniek speelt dit continu. Klanten vragen prijzen op bij meerdere partijen tegelijk. Wie als eerste een correcte offerte instuurt, heeft een streepje voor. De kwaliteit van het werk bepaalt wie de opdracht krijgt, maar de snelheid van de offerte bepaalt óf u überhaupt meedoet. Dat is een organisatievraagstuk, geen vaardigheidsvraagstuk.' },
      { kind: 'h2', text: 'Standaardwerk vertraagt het werk dat telt' },
      { kind: 'p', text: 'Vraag uw calculator eens hoeveel tijd er gaat zitten in het opzoeken van materiaallijsten, het nalopen van catalogusprijzen en het invullen van een standaard offertesjabloon. Niet de technische calculatie. Alleen het omheen. Bij projecten met een relatief voorspelbare scope, zoals een warmtepomp, een laadpaleninstallatie of een standaard cv-vervanging, is een flink deel van die tijd herhalend werk.' },
      { kind: 'p', text: 'Herhalend werk is precies het soort werk waarbij een agent iets kan betekenen. Niet het oordeel van de calculator, maar het klaarzetten van wat nodig is om dat oordeel snel te kunnen vellen. Welke producten zijn van toepassing op dit type installatie? Wat zijn de huidige inkoopprijzen? Hoe ziet de standaard opbouw eruit voor dit vermogen? Dat zijn vragen die een agent voor u kan beantwoorden voordat uw calculator er ook maar naar heeft gekeken.' },
      { kind: 'h2', text: 'Patroon één: de aanvraag wordt automatisch geclassificeerd' },
      { kind: 'p', text: 'Het eerste patroon begint bij de intake. Een aanvraag via uw website of mail bevat doorgaans genoeg informatie om te bepalen met welk type project u te maken heeft. Type installatie, adres, type object, gevraagde capaciteit. Een agent leest die aanvraag en classificeert hem: standaard project, maatwerk project of onvolledig. Die classificatie is geen eindoordeel. Het is een signaal aan uw calculator.' },
      { kind: 'p', text: 'Bij een standaard project kan de agent direct een conceptversie klaarzetten met de gangbare materiaallijst, de vaste opbouwregels voor dit type en de actuele inkoopprijzen vanuit uw ERP of calculatiesysteem. Uw calculator opent het concept, controleert, past aan waar nodig, en verstuurt. Die stap van controle en goedkeuring blijft altijd bij een mens. De agent bereidt voor. Niet meer, niet minder.' },
      { kind: 'p', text: 'Bij een onvolledige aanvraag kan de agent een gerichte terugmelding klaarzetten aan de klant: welke informatie ontbreekt er nog? Uw medewerker bekijkt die tekst en verstuurt hem. Zo bespaart u rondjes mailverkeer zonder dat de klant het gevoel krijgt in een geautomatiseerd systeem te zitten.' },
      { kind: 'h2', text: 'Patroon twee: prijzen en materiaallijsten worden actueel gehouden' },
      { kind: 'p', text: 'Een terugkerend probleem in de installatietechniek: de materiaallijst in uw offerte is gebaseerd op prijzen die drie maanden oud zijn. Leveranciers wijzigen hun lijstprijzen regelmatig. Als uw calculator handmatig de actuele prijs opzoekt voor elk project, kost dat per offerte al snel een kwartier tot een half uur. Bij meerdere offertes per week telt dat op.' },
      { kind: 'p', text: 'Een agent kan die prijsophaaltaak automatiseren door verbinding te maken met uw inkoopsysteem of leveranciersportaal. Zodra een offerteconcept wordt aangemaakt, haalt de agent de actuele prijs per artikelnummer op en verwerkt die in het concept. U hoeft de prijslijst niet meer handmatig bij te houden in uw calculatieprogramma. Uw calculator ziet bij elk concept of de prijs van vandaag of van de vorige update is. Over hoe u bestaande systemen koppelt aan een agent leest u meer in [het artikel over integraties met bestaande systemen](/kennis/integraties-makkelijker-dan-u-denkt).' },
      { kind: 'p', text: 'Dit patroon vereist wel dat uw artikelcodes consistent zijn. Als uw calculatieprogramma andere codes gebruikt dan uw inkoopadministratie, moet u die vertaalslag eerst maken. Dat is niet de leukste klus, maar het is een eenmalige investering die ook zonder agent de kwaliteit van uw calculaties verbetert.' },
      { kind: 'h2', text: 'Patroon drie: openstaande offertes worden actief bewaakt' },
      { kind: 'p', text: 'Een offerte wordt verstuurd. Dan wacht u. Een week later hebt u nog niets gehoord. Uw verkoper heeft het druk met nieuwe aanvragen en de herinnering staat nergens genoteerd. De klant heeft inmiddels bij een concurrent getekend. Dit patroon herhaalt zich bij veel installatiebedrijven elke week.' },
      { kind: 'p', text: 'Bij [commerciële opvolging via een agent](/oplossingen/leadopvolging-automatiseren) wordt de bewaking van openstaande offertes geautomatiseerd. De agent controleert dagelijks welke offertes nog open staan en hoelang. Na een aantal dagen dat u zelf instelt, zet de agent een conceptherinnering klaar voor uw verkoper. Die bekijkt de tekst, past hem aan als de relatie of het project daarom vraagt, en verstuurt. Niets gaat automatisch de deur uit.' },
      { kind: 'p', text: 'De waarde zit in het signaleren, niet het verzenden. Uw verkoper hoeft geen lijstje bij te houden. Hij ziet \'s ochtends in zijn inbox een overzicht van welke offertes aandacht verdienen. Dat is het verschil tussen reactief afwachten en pro-actief begeleiden van een verkooptraject.' },
      { kind: 'h2', text: 'De drie patronen versterken elkaar, maar hoeven niet tegelijk' },
      { kind: 'p', text: 'U hoeft niet op drie fronten tegelijk te beginnen. Sterker nog: dat raad ik af. Kies het patroon dat uw grootste knelpunt oplost. Als uw offertes inhoudelijk prima zijn maar te laat komen, begin dan bij de bewaking van openstaande trajecten. Als uw calculator te veel tijd kwijt is aan voorbereiding, begin dan bij de classificatie en het klaarzetten van concepten. Als foutieve prijzen u regelmatig raken, begin dan bij de prijsintegratie.' },
      { kind: 'p', text: 'Elk van deze drie patronen is een afgebakend, beschrijfbaar proces. Dat is precies wat een agent nodig heeft. Als u wilt controleren of uw proces voldoet aan de basisvoorwaarden voor automatisering, is [het filter van welk proces geschikt is voor een agent](/kennis/welk-proces-is-geschikt-voor-een-agent) een nuttig startpunt.' },
      { kind: 'h2', text: 'Wat u niet naar de agent kunt doorschuiven' },
      { kind: 'p', text: 'Een agent kan geen inschatting maken van bouwkundige complicaties die niet in het bestek staan. Hij herkent niet dat de klant waarschijnlijk een hogere capaciteit nodig heeft dan hij aanvraagt. Hij kan niet onderhandelen over prijs als een klant terugkomt met een tegenvoorstel. Dat zijn gesprekken die draaien op vakkennis, relatiebeheer en interpretatie van onuitgesproken informatie. Die horen bij uw mensen.' },
      { kind: 'p', text: 'Een goed werkende agent maakt het werk van uw calculator en verkoper smaller, niet kleiner. Smal in de zin van: minder ruis, minder administratief, meer gericht op de beslissingen die alleen zij kunnen nemen. De vraag is niet hoeveel de agent overneemt, maar welk deel van de werkweek nu opgaat aan werk dat geen oordeel vereist.' },
      { kind: 'h2', text: 'Waar u maandag mee begint' },
      { kind: 'p', text: 'Neem één offertetraject van de afgelopen maand dat mis ging of te lang duurde. Loop het stap voor stap terug. Waar lag het echt vast? Was het de intake, de calculatie, de navolging, of een combinatie? Schrijf die stap op in gewone taal, inclusief wie erbij betrokken was en welke informatie op dat moment ontbrak. Dat document is het vertrekpunt voor elk automatiseringsgesprek dat daarna volgt.' },
    ],
    faq: [
      { q: 'Is offerte-automatisering ook zinvol voor kleine installatiebedrijven?', a: 'Ja, mits u het juiste patroon kiest. Een bedrijf met twee calculatoren heeft baat bij automatische bewaking van openstaande offertes. Een bedrijf met vijf calculatoren wint meer bij geautomatiseerde prijsintegratie. De schaal bepaalt niet of het werkt, maar welk patroon de grootste winst oplevert. Bepaal eerst waar uw knelpunt zit, dan pas welke automatisering zinvol is.' },
      { q: 'Kan een agent koppelen met mijn calculatiesoftware of ERP?', a: 'Dat hangt af van welk pakket u gebruikt. De meeste gangbare pakketten bieden een API of exportfunctie waarmee een agent gegevens kan ophalen. Als dat niet zo is, kan koppeling via bestandsuitwisseling of e-mail in veel gevallen toch werken. Lees meer in het artikel over [integraties met bestaande systemen](/kennis/integraties-makkelijker-dan-u-denkt).' },
      { q: 'Verstuurt een agent automatisch offertes of herinneringen?', a: 'Nee. Een agent zet een concept klaar, uw medewerker controleert het en verstuurt. Elke uitgaande communicatie gaat langs een mens. Dat is een bewuste keuze: een klantrelatie in de installatietechniek is te waardevol om zonder menselijk oordeel te communiceren. De agent bewaakt en bereidt voor. Uw medewerker beslist en verstuurt.' },
      { q: 'Waar worden mijn offertegegevens opgeslagen als ik een agent gebruik?', a: 'Opslag en verwerking vinden plaats in Frankfurt. Taalmodelcalls verlopen via Anthropic in de Verenigde Staten. Dat staat opgenomen in de sub-verwerkerslijst, inclusief een transfer impact assessment. We garanderen niet dat alle data uitsluitend in de EU blijft, maar de verwerkingsafspraken zijn schriftelijk vastgelegd.' },
    ],
    cluster: 'C',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'ai-groothandel-mailstroom-naar-order',
    title: 'AI in de groothandel: van mailstroom naar order',
    lede: 'Een bestelmail van een vaste klant bevat twaalf artikelnummers, een deellevering, een afwijkend afleveradres en de opmerking dat het dringend is. Uw binnendienst verwerkt hem handmatig. Dat kan anders.',
    author: 'Sjaak ter Veld',
    published: '2026-08-11',
    readingMinutes: 7,
    tags: ['MKB', 'proces', 'efficiency', 'integraties', 'strategie'],
    blocks: [
      { kind: 'p', text: 'Maandagochtend. De inbox staat op 47 ongelezen berichten. De helft zijn bestellingen. Een kwart zijn vragen over levertijden. De rest is een mix van klachten, annuleringen en factuurvragen. Uw binnendienst werkt ze één voor één door, kijkt telkens in het ERP, typt over, en controleert of de klant nog krediet heeft. Rond half elf zijn ze bij bericht 23.' },
      { kind: 'p', text: 'Dit is het dagelijkse ritme in veel groothandelsbedrijven. Het werk is niet moeilijk. Het is repetitief, foutgevoelig en tijdrovend. Precies het soort werk waar een AI-agent voor gebouwd is.' },
      { kind: 'h2', text: 'De groothandel is een perfecte omgeving voor agents' },
      { kind: 'p', text: 'Groothandel draait op volume, snelheid en nauwkeurigheid. Bestellingen komen via mail, portaal, EDI, soms nog per fax. Elk kanaal heeft zijn eigen formaat. Klanten willen snel bevestiging. Fouten in een order kosten meer dan alleen de correctietijd: er gaat een chauffeur voor niets rijden, een klant loopt leeg in zijn magazijn, of u verstuurt een tweede zending op eigen kosten.' },
      { kind: 'p', text: 'De informatie die nodig is voor een correcte order ligt al in uw systemen. Artikelnummers, prijsafspraken, staffels, kredietlimieten, voorraadposities. Niemand hoeft dat te bedenken. Het gaat er alleen om dat die informatie snel en foutloos bij elkaar wordt gebracht. Dat is precies wat een agent doet.' },
      { kind: 'p', text: 'Welk werk kost uw binnendienst elke dag uren, terwijl alle benodigde informatie al in uw ERP staat? Als het antwoord "bestellingen verwerken" is, bent u klaar om te beginnen.' },
      { kind: 'h2', text: 'Orderverwerking: het meest voor de hand liggende startpunt' },
      { kind: 'p', text: 'Een bestelmail lezen, de artikelen opzoeken, controleren of ze op voorraad zijn, de klantprijs toepassen, de kredietstatus checken en de order invoeren: dat zijn vijf tot zeven stappen die een medewerker elke keer opnieuw zet. Soms voor een order van 200 euro, soms voor een order van 20.000 euro. De handelingen zijn identiek.' },
      { kind: 'p', text: 'Bij [orderverwerking automatiseren](/oplossingen/orderverwerking-automatiseren) leest een agent de bestelmail of PDF uit, koppelt de artikelen aan uw artikelbestand, voert de voorraad- en kredietcheck uit en zet de order als concept klaar in uw ERP. Uw medewerker controleert, past aan waar nodig, en bevestigt. De agent doet het opzoekwerk. De mens beoordeelt.' },
      { kind: 'p', text: 'Het resultaat is niet dat uw medewerker niets meer doet. Het is dat hij of zij vijf minuten werk heeft in plaats van twintig. En dat die vijf minuten gaan over de uitzonderingen: de klant die iets vraagt dat niet op voorraad is, de order die net boven de kredietlimiet zit, de afwijkende wens.' },
      { kind: 'h2', text: 'Mailafhandeling is méér dan bestellingen alleen' },
      { kind: 'p', text: 'Naast bestellingen stromen er dagelijks vragen binnen. Waar is mijn order? Klopt deze factuur? Kan ik dit artikel retourneren? Wat is de levertijd van dit product? Elke vraag kost tijd om op te zoeken en te beantwoorden, ook al weet u het antwoord in dertig seconden als u het trackingssysteem of het ERP erbij pakt.' },
      { kind: 'p', text: 'Een agent kan die opzoekvraag overnemen. Hij zoekt de orderstatus op, trekt de factuur erbij, controleert de retourvoorwaarden. Dan zet hij een conceptantwoord klaar, inclusief de relevante informatie. Uw medewerker leest het na en verstuurt. Niet de agent, uw medewerker. Dat is de kern van hoe [klantenservice automatiseren](/oplossingen/klantenservice-automatiseren) in de praktijk werkt: het opzoekwerk is gedaan, de mens beslist over verzending.' },
      { kind: 'p', text: 'Wat verandert er dan? De doorlooptijd van een vraag daalt. Uw medewerker hoeft niet meer te schakelen tussen vier systemen om een statusupdate te geven. En de kwaliteit van het antwoord wordt consistenter, omdat de informatie altijd uit dezelfde bron komt.' },
      { kind: 'h2', text: 'Goede inkoop begint bij het signaal dat iemand nu mist' },
      { kind: 'p', text: 'Inkoop in de groothandel is vaak reactief. Een artikel raakt op. Iemand ziet het. Er gaat een mail naar de leverancier. Die levertijd valt tegen. De klant wacht. Dat patroon herhaalt zich, zeker bij brede assortimenten met honderden of duizenden SKU\'s.' },
      { kind: 'p', text: 'Een agent die de voorraadposities bewaakt, signaleert het tekort eerder. Hij kijkt naar de huidige voorraad, de openstaande orders en het historische verkooppatroon. Op basis daarvan stelt hij een inkoopvoorstel op, gebundeld per leverancier. Dat voorstel gaat niet automatisch weg. Uw inkoper bekijkt het, past het aan waar de agent de context mist, en zet de order door.' },
      { kind: 'p', text: 'Bij [inkoop automatiseren](/oplossingen/inkoop-automatiseren) gaat het niet om het wegnemen van het inkoopbesluit. Het gaat om het wegnemen van het opzoekwerk dat aan dat besluit voorafgaat. Het besluit blijft bij uw inkoper. De berekening niet meer.' },
      { kind: 'h2', text: 'Marges verdampen stilletjes als u niet kijkt' },
      { kind: 'p', text: 'Inkoopprijzen bewegen. Wisselkoersen, grondstoffen, energietarieven: leveranciers verhogen hun prijzen regelmatig, soms met een klein percentage, soms met een brief in de bijlage van een factuur. Uw verkoopprijzen bewegen niet automatisch mee. Dat verschil stapelt.' },
      { kind: 'p', text: 'Stel dat u een assortiment van 800 artikelen heeft. Zelf bijhouden welke artikelen qua inkoopprijs zijn gestegen terwijl de verkoopprijs gelijk is gebleven, dat is uren werk. Werk dat vaak niet gedaan wordt, omdat er geen tijd voor is. Het gevolg is dat u artikelen verkoopt onder de marge die u verwacht.' },
      { kind: 'p', text: 'Een agent die inkoopprijzen vergelijkt met verkoopprijzen en u per artikel een onderbouwd voorstel geeft, lost precies dat probleem op. U kiest zelf wat u doorvoert en wat niet. Maar u heeft tenminste het overzicht. Hoe dat concreet werkt, staat uitgewerkt op de pagina over [prijs- en margebewaking](/oplossingen/prijs-en-margebewaking).' },
      { kind: 'h2', text: 'Begin niet met alles tegelijk, begin met het smalste proces' },
      { kind: 'p', text: 'De verleiding is groot om breed te beginnen. Alles automatiseren, alle kanalen, alle klanten. Dat is de snelste manier om een implementatie te laten stranden. Niet omdat het technisch niet kan, maar omdat u de menselijke kant onderschat.' },
      { kind: 'p', text: 'Wat werkt: begin met één type order van één klantgroep. Of begin met inkomende mails over één onderwerp, zoals leverstatussen. Laat de agent die stroom een maand lang afhandelen, kijk waar hij het goed doet en waar hij corrigeerd moet worden, en pas het beleid aan. Daarna kunt u uitbreiden.' },
      { kind: 'p', text: 'Over welk proces als eerste geschikt is voor automatisering, en hoe u dat bepaalt zonder de plank mis te slaan, vindt u een praktisch kader in het artikel over [welk proces geschikt is voor een agent](/kennis/welk-proces-is-geschikt-voor-een-agent). De vuistregel daarin is eenvoudig: kies het saaiste, meest voorspelbare proces. Dat is ook het snelste om goed te krijgen.' },
      { kind: 'h2', text: 'Wat u maandag kunt doen' },
      { kind: 'p', text: 'Pak de inbox van uw binnendienst erbij en tel hoeveel van de berichten van gisteren een standaard handeling vereisten: een order invoeren, een voorraad opzoeken, een levertijd doorgeven. Dat is uw startpunt. Schrijf op welke informatie daarvoor telkens nodig is, en in welke systemen die staat.' },
      { kind: 'p', text: 'Die twee lijsten, het terugkerende handeling en de informatiebronnen, zijn wat u nodig heeft voor een eerste gesprek over wat een agent in uw situatie realistisch kan doen. Niet een belofte vooraf over hoeveel u bespaart. Wel een helder beeld van waar de uren naartoe gaan en of die uren automatiseerbaar zijn.' },
      { kind: 'quote', text: 'De vraag is niet of uw mailstroom automatiseerbaar is. De vraag is met welk deel u begint.' },
    ],
    faq: [
      { q: 'Kan een AI-agent omgaan met bestellingen in verschillende formaten, zoals mail, PDF en EDI?', a: 'Ja. Een agent kan tekst uit mails lezen, PDF\'s uitlezen en EDI-bestanden verwerken. Per kanaal is een aparte verwerkingsstap nodig, maar dat hoeft geen afzonderlijk project te zijn. Begin met het kanaal dat het meeste volume heeft, en breid daarna uit naar de overige formaten.' },
      { q: 'Verstuurt de agent automatisch orderbevestigingen naar klanten?', a: 'Nee. Een agent zet de bevestiging klaar als concept, inclusief de juiste informatie uit uw ERP. Uw medewerker controleert en verstuurt. Uitgaande communicatie naar klanten gaat altijd langs een menselijke beoordeling. Dat is geen beperking, maar een bewuste keuze die voorkomt dat fouten ongemerkt naar buiten gaan.' },
      { q: 'Hoe zit het met de opslag van klant- en ordergegevens die de agent verwerkt?', a: 'Opslag en verwerking vinden plaats in Frankfurt. Taalmodelcalls lopen via Anthropic in de Verenigde Staten. Dit is opgenomen in de sub-verwerkerslijst met een transfer impact assessment. Er is geen constructie waarbij alle data uitsluitend binnen de EU blijft.' },
      { q: 'Is een AI-agent ook zinvol voor kleinere groothandels met een beperkt assortiment?', a: 'Dat hangt af van het volume. De vuistregel is: als een handeling vaker dan twee keer per week voorkomt en de regels ervan te beschrijven zijn, is automatisering zinvol. Een smal assortiment is geen belemmering. Een laag transactievolume kan dat wel zijn, afhankelijk van hoe arbeidsintensief de handeling is.' },
    ],
    cluster: 'C',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'ai-bouw-meerwerk-vastleggen',
    title: 'AI in de bouw: meerwerk vastleggen voor het ter sprake komt',
    lede: 'Meerwerk wordt pas een probleem op het moment dat de rekening op tafel ligt. In de bouw gebeurt dat dagelijks. Een agent kan de informatie vastleggen op het moment dat het werk wordt gedaan, niet een week later.',
    author: 'Sjaak ter Veld',
    published: '2026-08-12',
    readingMinutes: 7,
    tags: ['MKB', 'proces', 'efficiency', 'integraties', 'strategie'],
    blocks: [
      { kind: 'p', text: 'Het is woensdagmiddag. De uitvoerder belt vanuit de straat dat de opdrachtgever op het laatste moment een extra stopcontact wil, drie meter bedrading meer en een andere schakelkast. Geen probleem, wordt gezegd. De uitvoerder loopt door. Vrijdagavond schrijft hij zijn uren. Het extra werk is er ergens bij. Drie weken later stuurt u een factuur en de opdrachtgever herkent de post niet. Er was toch helemaal geen meerwerk afgesproken?' },
      { kind: 'p', text: 'Dit patroon herhaalt zich in elke bouw- of installatieonderneming die meer dan een handvol projecten tegelijk loopt. Niet omdat uw mensen slordig zijn. Maar omdat het vastleggen van meerwerk op het moment dat het wordt gevraagd simpelweg niet het eerste is waar een uitvoerder aan denkt. De drempel zit in de timing.' },
      { kind: 'h2', text: 'Het probleem zit niet in de wil, maar in het moment' },
      { kind: 'p', text: 'Vraag uw uitvoerders of ze het meerwerk willen vastleggen en het antwoord is altijd ja. Vraag of ze het ook doen op het moment dat de klant het vraagt, en het antwoord is eerlijker. Er wordt genoteerd op een papiertje, in een whatsappbericht naar de projectleider, of helemaal niet. De informatie bestaat, maar op drie plaatsen tegelijk en in drie formaten.' },
      { kind: 'p', text: 'Het probleem is geen motivatieprobleem. Het is een procesprobleem. De plek waar het meerwerk wordt afgesproken, de werf of de telefoon, is niet de plek waar de administratie bijgehouden wordt. En tussen die twee plekken verdwijnt structureel informatie.' },
      { kind: 'p', text: 'Welk meerwerk kost uw bedrijf per jaar aan niet-gefactureerde uren, puur omdat de vastlegging een stap te laat komt? U hoeft dat getal niet precies te weten om te beseffen dat het de moeite waard is om het te dichten.' },
      { kind: 'h2', text: 'Een agent begint waar het werk begint: op de werkbon' },
      { kind: 'p', text: 'Bij [werkbonnen verwerken](/oplossingen/werkbonnen-verwerken) draait het om precies dit: bonnen, foto\'s en aantekeningen die vanuit het veld binnenkomen, omzetten naar uren, materiaal en een factuurregel. Dat is de kern. Maar de kracht zit in wat er vóór de factuurregel moet gebeuren: de koppeling aan een project, de controle of het meerwerk ook als zodanig gemarkeerd is, en de vraag of er al een akkoord van de opdrachtgever is.' },
      { kind: 'p', text: 'Een agent leest de inkomende bon of het spraakbericht van de uitvoerder, herkent dat er een extra handeling beschreven wordt die niet in het oorspronkelijke bestek staat, en zet dit als een meerwerk-signaal klaar voor de projectleider. Die beoordeelt het, past het aan waar nodig, en geeft het vrij. De agent verstuurt niets zonder dat een mens het heeft goedgekeurd.' },
      { kind: 'p', text: 'Wat dit oplevert is geen betere uitvoerder. Het is een betere kans dat wat de uitvoerder al noteerde, ook de juiste plek bereikt op het juiste moment. De informatie was er al. Nu gaat ze niet meer verloren.' },
      { kind: 'h2', text: 'Vroeg vastleggen voorkomt discussie achteraf' },
      { kind: 'p', text: 'De discussie over meerwerk ontstaat bijna altijd op het moment van factureren, nooit op het moment van uitvoeren. Op dat latere moment is de context weg. De opdrachtgever herinnert zich het gesprek niet of anders. De uitvoerder weet niet meer precies waarom hij de beslissing nam. De projectleider was er niet bij.' },
      { kind: 'p', text: 'Als de registratie op dezelfde dag plaatsvindt als het werk, is er een tijdstempel, een projectcode, een beschrijving en soms een foto. Dat is materiaal waarmee u een gesprek voert, geen discussie. De kans dat een opdrachtgever een goed gedocumenteerde meerwerk-registratie betwist, is kleiner dan de kans dat hij een vage factuurpost betwist. Dat is geen garantie, maar het is een structureel sterkere positie.' },
      { kind: 'p', text: 'Wat zou er veranderen als uw projectleider elke ochtend een overzicht zag van de meerwerksignalen van de vorige dag, per project, met de status erbij? Hoeveel van die signalen gaan nu verloren voor die ochtend er is?' },
      { kind: 'h2', text: 'Urenregistratie en facturatie kunnen automatisch aansluiten' },
      { kind: 'p', text: 'Vastleggen is één stap. Factureren is de volgende. De twee zijn in de bouw vaak gescheiden systemen die met de hand aan elkaar worden gekoppeld. Iemand in de binnendienst kopieert de goedgekeurde meerwerk-regels naar het boekhoudpakket, typt de uren over, voegt het materiaal toe en stelt de factuur op.' },
      { kind: 'p', text: 'Bij [urenregistratie en facturatie](/oplossingen/urenregistratie-en-facturatie) kan een agent dit traject grotendeels overnemen. De goedgekeurde uren en het materiaal per project worden getoetst aan de gemaakte afspraken, en er wordt een concept-factuur klaargezet. Uw binnendienst controleert en verstuurt. De stap van handmatig overschrijven verdwijnt, de kans op een typfout ook.' },
      { kind: 'p', text: 'Dit is geen mooie belofte. Het is een koppeling die werkt als de invoer klopt. En de invoer klopt als de meerwerk-registratie aan de voorkant goed is ingericht. De twee stappen hangen samen. Begin aan de voorkant, dan volgt de rest vanzelf.' },
      { kind: 'h2', text: 'Goede invoer is geen perfecte invoer' },
      { kind: 'p', text: 'Een veelgehoorde aarzeling in de bouw: "onze mensen schrijven niet goed". Bonnen zijn onduidelijk, spraakberichten zijn onvolledig, projectcodes worden door elkaar gehaald. Als dat de lat is voor automatisering, komt het er nooit van.' },
      { kind: 'p', text: 'Een goed gebouwde agent gaat niet uit van perfecte invoer. Hij herkent patronen, vraagt om verduidelijking als iets ontbreekt, en legt twijfelgevallen voor aan de projectleider in plaats van ze zelf op te lossen. Het systeem is zo ingericht dat de mens de beslissing neemt op het moment dat de informatie onduidelijk is, niet dat de agent een gok maakt. Lees meer over wanneer een mens in de lus moet zitten bij [human-in-the-loop](/kennis/human-in-the-loop-wanneer-wel-niet).' },
      { kind: 'p', text: 'Dat betekent ook dat u uw uitvoerders niet hoeft te trainen op perfecte administratie voordat u begint. U begint met wat u heeft, en de agent leert u zien waar de invoer structureel tekortschiet. Dat is informatie die u kunt gebruiken om gericht bij te sturen.' },
      { kind: 'h2', text: 'Beleid bepaalt wat automatisch gaat en wat niet' },
      { kind: 'p', text: 'Elke bouwonderneming heeft eigen regels over meerwerk, ook als die regels nergens opgeschreven staan. Meerwerk onder een bepaald bedrag wordt niet apart gefactureerd. Vaste opdrachtgevers krijgen een andere behandeling dan eenmalige. Bij bepaalde projecttypen is goedkeuring vooraf een contractuele verplichting.' },
      { kind: 'p', text: 'Al die regels kunnen in een agent worden vastgelegd als expliciete beleidsregels. De agent past ze toe, maar de uitvoerende beslissing, wat er de deur uitgaat, ligt altijd bij een mens. U bepaalt de grens. De agent bewaakt hem. Dat is het principe dat ook geldt voor [guardrails als kompas voor uw agent](/kennis/guardrails-niet-een-rem-maar-een-kompas): niet een beperking, maar een manier om impliciete kennis expliciet en overdraagbaar te maken.' },
      { kind: 'p', text: 'Als de projectleider die al twintig jaar de regels kent met pensioen gaat, gaan de regels niet mee. Als ze in het systeem staan, blijven ze. Dat is een argument voor automatisering dat niets met snelheid of besparing te maken heeft, maar met continuïteit.' },
      { kind: 'h2', text: 'De eerste stap is kleiner dan u denkt' },
      { kind: 'p', text: 'U hoeft niet te beginnen met een volledig geautomatiseerde meerwerk-registratie die in alle systemen tegelijk werkt. De nuttigste eerste stap is vaak simpeler: één invoerkanaal voor uitvoerders, één plek waar signalen binnenkomen, en één overzicht voor de projectleider aan het begin van de dag.' },
      { kind: 'p', text: 'Kijk volgende week eens naar drie projecten waar meerwerk is uitgevoerd. Hoeveel van die regels staan nu in uw facturatie? Wat is er onderweg verdwenen, en op welk moment? Die analyse kost u een uur en geeft u meer dan een halfuur uitleg over wat een agent kan doen.' },
    ],
    faq: [
      { q: 'Kan een AI-agent meerwerk automatisch factureren in de bouw?', a: 'Een agent kan meerwerk-registraties herkennen, structureren en als concept-factuurregels klaarzetten. Versturen doet hij niet zelfstandig. Uw projectleider of binnendienst controleert en geeft vrij. Dat is een bewuste keuze: in de bouw zijn de discussies rondom meerwerk te gevoelig om zonder menselijke beoordeling te versturen.' },
      { q: 'Wat als onze uitvoerders geen goede aantekeningen maken?', a: 'Perfecte invoer is geen voorwaarde. Een goed gebouwde agent herkent patronen in onvolledige informatie, vraagt om verduidelijking waar nodig en legt twijfelgevallen voor aan een mens in plaats van ze zelf op te lossen. U ziet daarbij ook structureel waar de invoer tekortschiet, wat u kunt gebruiken om gericht bij te sturen.' },
      { q: 'Welke systemen kan een agent koppelen voor meerwerk-registratie in de bouw?', a: 'Dat hangt af van wat u gebruikt. Gangbare boekhoud- en projectpakketten als Exact, AFAS en Twinfield zijn via een API te koppelen. Oudere systemen werken vaak via e-mail of bestandsuitwisseling. In de meeste gevallen is koppelen geen blokkade, maar een technische keuze met afwegingen.' },
      { q: 'Hoe zit het met de opslag van projectdata en werkbonnen?', a: 'Data wordt opgeslagen en verwerkt in Frankfurt. Taalmodelcalls lopen via Anthropic in de Verenigde Staten. Beide zijn opgenomen in de sub-verwerkerslijst, inclusief een transfer impact assessment. Alle betrokken partijen en gegevensstromen worden vooraf transparant in kaart gebracht.' },
    ],
    cluster: 'C',
    generatedBy: 'ai-draft',
  },

  {
    slug: 'ai-transport-logistiek-incident-afhandeling',
    title: 'AI in transport en logistiek: incident-afhandeling die meedenkt',
    lede: 'Een lading staat stil in Venlo, de chauffeur belt, de klant mailt al. Uw binnendienst heeft drie tabbladen open en weet nog niet wat de werkelijke vertraging gaat zijn. Zo kan een agent hier structuur in brengen.',
    author: 'Sjaak ter Veld',
    published: '2026-08-13',
    readingMinutes: 7,
    tags: ['MKB', 'proces', 'efficiency', 'integraties', 'strategie'],
    blocks: [
      { kind: 'p', text: 'Een pallet wordt om 06:30 gemeld als vertraagd. De chauffeur geeft via de boordcomputer een melding door. Tegelijkertijd mailt de klant om 07:15 waar zijn zending blijft. Uw binnendienst start de dag met drie openstaande vragen, één telefoontje en twee systemen die nog niet met elkaar gepraat hebben. Dit is geen uitzonderlijke ochtend. Dit is dinsdag.' },
      { kind: 'p', text: 'De moeite zit niet in het beantwoorden van één vraag. De moeite zit in het tegelijk bijhouden van alle vragen, alle ritten, alle klanten die wachten op een update. Een agent lost dat niet in zijn eentje op. Maar hij kan een flink deel van het opzoekwerk en het klaarzetten van de communicatie uit uw binnendienst halen.' },
      { kind: 'h2', text: 'Incident-afhandeling is een informatieprobleem, geen communicatieprobleem' },
      { kind: 'p', text: 'De meeste vertragingen kosten niet zoveel tijd om op te lossen. Ze kosten tijd omdat de informatie verspreid staat. De ritplanning staat in het TMS, de klantafspraken staan in het CRM, de contactpersoon staat soms nog in een Outlook-map. Uw medewerker rijdt alle drie af voordat ze een zinnige update kan sturen.' },
      { kind: 'p', text: 'Een agent kan die opzoekvraag overnemen. Zodra een ritvertraging binnenkomt via de boordcomputer of via een handmatige melding, haalt de agent de relevante klantinformatie op, bekijkt de afgesproken levertijd, en zet een conceptbericht klaar. Uw medewerker leest het, past het aan waar nodig, en verstuurt. De agent schrijft niet zelf naar de klant.' },
      { kind: 'p', text: 'Welk werk kost uw binnendienst elke dag de meeste tijd terwijl de informatie al in uw systemen staat? Dat is vrijwel altijd de plek waar een agent het meeste kan bijdragen.' },
      { kind: 'h2', text: 'Escalatieregels vooraf vastleggen voorkomt discussie op het moment zelf' },
      { kind: 'p', text: 'In transport is timing kritiek. Een vertraging van twee uur bij een supermarkt heeft andere gevolgen dan dezelfde vertraging bij een bouwbedrijf. Niet elke klant belt. Sommige klanten willen alleen een mail. Anderen staan erop gebeld te worden zodra de verwachte aankomsttijd meer dan een kwartier afwijkt.' },
      { kind: 'p', text: 'Die regels bestaan al bij de meeste transportbedrijven. Ze zitten alleen in het hoofd van de medewerker die de klant kent, niet in een systeem. Een agent maakt die kennis expliciet. U legt per klant of klantcategorie vast: melden bij afwijking van X minuten, via mail of telefoon, met of zonder alternatief aanbod. Zie ook hoe [guardrails werken als beleidsinstrument](/kennis/guardrails-niet-een-rem-maar-een-kompas) om dit soort kennis beheersbaar te maken.' },
      { kind: 'p', text: 'Dat heeft een bijkomend voordeel: bij nieuwe medewerkers of bij ziekte van een collega gaat de kennis niet verloren. De regels staan. De agent volgt ze. En als u een klantafspraak aanpast, past u één instelling aan.' },
      { kind: 'h2', text: 'Niet elke melding vraagt hetzelfde antwoord' },
      { kind: 'p', text: 'Een kapotte koelunit op een vrachtwagen vol verse producten vraagt een andere reactie dan een aanhanger met bouwmaterialen die een uur later aankomt. Een agent kan het onderscheid niet altijd zelfstandig maken. Maar hij kan wel de juiste informatie ophalen zodat uw medewerker sneller beslist.' },
      { kind: 'p', text: 'Denk aan: wat is de inhoud van de lading, wat zijn de contractuele afspraken, heeft deze klant een SLA, zijn er al eerdere incidenten met deze rit of dit voertuig? Die vragen neemt de agent voor zijn rekening. De beslissing, het bellen naar de klant, het inschakelen van een alternatief vervoerder: dat blijft bij uw medewerker.' },
      { kind: 'p', text: 'Wilt u ook dat de agent bij ernstige incidenten een conceptmail klaarzet met een alternatief aanbod, dan is dat mogelijk mits de regels voor dat aanbod van tevoren zijn vastgelegd. Wat mag de agent aanbieden? Tot welk bedrag? Alleen voor vaste klanten of ook voor incidentele? Hoe meer dit op papier staat, hoe bruikbaarder de output van de agent.' },
      { kind: 'h2', text: 'Koppeling aan uw TMS of ritplanning is de technische sleutel' },
      { kind: 'p', text: 'Een agent die werkt zonder toegang tot uw ritplanning is weinig waard in de context van incident-afhandeling. De koppeling is de investering die het mogelijk maakt. Veel transport management systemen hebben een API. Sommige werken via webhooks. Andere, oudere systemen kunnen via CSV-exports of e-mailmeldingen worden uitgelezen.' },
      { kind: 'p', text: 'De drempel is lager dan u denkt. Wij zijn één echt niet-koppelbaar systeem tegengekomen in jaren. Bij [integraties met bestaande systemen](/kennis/integraties-makkelijker-dan-u-denkt) is de vraag bijna nooit of het kan, maar hoe netjes het kan. Een minder elegante koppeling via e-mail levert dezelfde tijdwinst op als een directe API-verbinding.' },
      { kind: 'p', text: 'Wat u vooraf moet aanleveren: naam en versie van uw TMS of planningssoftware, een testomgeving of account met beperkte rechten, en één concreet voorbeeld van een incident-type dat u wilt automatiseren. Meer is voor de eerste fase zelden nodig.' },
      { kind: 'h2', text: 'Klantenservice en incident-afhandeling overlappen meer dan ze lijken' },
      { kind: 'p', text: 'Klanten die bellen over een vertraging zijn in eerste instantie op zoek naar informatie: waar is mijn lading, hoe laat komt het, wat moet ik regelen. De helft van die vragen is te beantwoorden met wat al in uw systemen staat. Een agent kan het opzoekwerk doen voor uw medewerker die de telefoon opneemt.' },
      { kind: 'p', text: 'Bij [klantenservice automatiseren](/oplossingen/klantenservice-automatiseren) gaat het precies hierover: het opzoekwerk voor een antwoord, en de vervolgactie erna. De agent zet het klaar, uw medewerker verstuurt of beantwoordt. In transport is dat patroon direct toepasbaar op statusvragen, leveringsbevestigingen en wijzigingen in de planning.' },
      { kind: 'p', text: 'Hoeveel vragen van dit type ontvangt uw binnendienst per dag? Is dat er vijf of zijn het er vijftig? Bij vijftig begint de tijdwinst al snel merkbaar te worden. Bij vijf is een agent misschien minder urgent, maar kan hij al wel nuttig zijn als de informatie verspreid staat over meerdere systemen.' },
      { kind: 'h2', text: 'Begin met het incident-type dat het vaakst voorkomt, niet het meest complexe' },
      { kind: 'p', text: 'De neiging is om te beginnen bij het moeilijkste geval: de multimodale zending waarbij drie partijen betrokken zijn en de verantwoordelijkheid niet eenduidig is. Mijn advies is altijd het omgekeerde. Begin bij het incident dat het vaakst voorkomt, de regels het meest eenduidig zijn, en de output het meest voorspelbaar is.' },
      { kind: 'p', text: 'In transport is dat vaak: ritvertraging door file of werkzaamheden, klant informeren, nieuwe aankomsttijd doorgeven. Geen discussie over aansprakelijkheid, geen alternatief vervoer nodig, gewoon een update. Dat proces staat snel. Uw binnendienst merkt meteen wat de agent oplevert. Daarna kunt u verder uitbouwen.' },
      { kind: 'p', text: 'Zie ook [welk proces geschikt is voor een agent](/kennis/welk-proces-is-geschikt-voor-een-agent) als u twijfelt over waar te beginnen. De drie filters die daar beschreven worden, ritme, beschrijfbaarheid en een duidelijk einde, zijn direct van toepassing op incident-typen in transport.' },
      { kind: 'h2', text: 'Wat u maandag kunt doen' },
      { kind: 'p', text: 'Zet uw binnendienst een uur bij elkaar en vraag welk type incident de meeste herhalende vragen oplevert. Schrijf de regels op die uw medewerkers nu impliciet kennen: wanneer bellen, wanneer mailen, wat aanbieden bij welk type vertraging, voor welke klantcategorie. U hoeft nog niets te bouwen. Maar dit overzicht is het startpunt voor een eerste gesprek over wat een agent voor u kan doen.' },
    ],
    faq: [
      { q: 'Kan een AI-agent zelfstandig klanten bellen of mailen bij een transportincident?', a: 'Nee. Een agent zet een conceptbericht of -update klaar op basis van de ritinformatie en klantafspraken in uw systemen. Uw medewerker beoordeelt het en verstuurt. Autonoom verzenden is geen onderdeel van hoe wij agents bouwen. De mens blijft op het moment van communicatie in de keten.' },
      { q: 'Werkt een AI-agent ook als mijn TMS geen moderne API heeft?', a: 'Bijna altijd wel. Oudere systemen zonder API zijn vaak te koppelen via webhooks, e-mailmeldingen of CSV-exports. De koppeling is minder elegant, maar de tijdwinst is vergelijkbaar. De juiste aanpak hangt af van uw specifieke pakket; dat bepalen we in de eerste fase.' },
      { q: 'Wat gebeurt er met de data die de agent verwerkt?', a: 'Opslag en verwerking vinden plaats in Frankfurt. Taalmodelcalls gaan via Anthropic in de VS. Dat staat opgenomen in onze sub-verwerkerslijst, inclusief een transfer impact assessment. We beweren niet dat alle data in de EU blijft, want dat klopt niet voor de taalmodelstap.' },
      { q: 'Wat is een realistisch startpunt voor een transportbedrijf dat nog niets heeft geautomatiseerd?', a: 'Kies het incident-type dat het vaakst voorkomt en de eenvoudigste regels heeft. Leg die regels op papier: wanneer meldt u, via welk kanaal, met welke inhoud, voor welke klantcategorie. Dat overzicht is het startpunt. We bouwen in fasen, waarbij elke fase eindigt in iets werkends dat u goedkeurt voordat we verder gaan.' },
    ],
    cluster: 'C',
    generatedBy: 'ai-draft',
  },

];

export const POST_BY_SLUG = POSTS.reduce<Record<string, Post>>((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {});
