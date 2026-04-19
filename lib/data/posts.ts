export type PostBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'quote'; text: string; by?: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'divider' };

export interface Post {
  slug: string;
  title: string;
  lede: string;
  author: string;
  published: string; // ISO date
  readingMinutes: number;
  tags: string[];
  blocks: PostBlock[];
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
    slug: 'vaste-prijs-geen-abonnement',
    title: 'Vaste prijs, geen abonnement. Waarom wij dat doen',
    lede:
      'De software-industrie heeft u de afgelopen tien jaar getraind om alles per maand te betalen. Wij doen dat bewust niet. Hier is waarom.',
    author: 'Sjaak ter Veld',
    published: '2026-04-14',
    readingMinutes: 4,
    tags: ['pricing', 'business model', 'transparantie'],
    blocks: [
      {
        kind: 'p',
        text:
          'In elk eerste gesprek komt de vraag: "En wat kost dat per maand?" Dan moet ik even een stap terug doen. Wij rekenen namelijk niet zo. Dat roept vragen op. Terecht, want het wijkt af van wat u gewend bent.',
      },
      { kind: 'h2', text: 'Wat het SaaS-model met u doet' },
      {
        kind: 'p',
        text:
          'U betaalt elke maand. Het stopt nooit. Na twee jaar heeft u drie keer de oorspronkelijke prijs betaald. Meestal weet u niet meer precies waarvoor. Als u iets wil aanpassen, vraagt men extra. Als u wil stoppen, verliest u data. Dit is niet slecht bedoeld. Het is gewoon hoe abonnementen werken.',
      },
      { kind: 'h2', text: 'Wat wij doen in plaats daarvan' },
      {
        kind: 'list',
        items: [
          'Eén vaste prijs voor de bouw en implementatie van uw agent. U weet vooraf wat het wordt.',
          'Een opleveringsdatum. Als wij uitlopen, is dat ons probleem, niet uw factuur.',
          'Daarna een maandelijks onderhoudsbedrag, bewust laag. Het meeste werk zit in de bouw.',
          'Uitbreiden? Vaste prijs voor de uitbreiding, niet "meer uit uw abonnement halen".',
        ],
      },
      {
        kind: 'quote',
        text:
          'Wij verdienen geld aan goed werk leveren, niet aan u vastgeplakt houden aan een contract.',
      },
      { kind: 'h2', text: 'Waarom dit ook voor ons beter werkt' },
      {
        kind: 'p',
        text:
          'Onze prikkel is om de agent meteen goed te bouwen. Niet om "features achterhouden voor de premium tier". Niet om u afhankelijk te maken. Wij werken voor klanten die ons aanbevelen bij collega-ondernemers. Dat is ons marketingmodel. Een tevreden ondernemer die drie anderen stuurt is meer waard dan een abonnement dat knelt.',
      },
      { kind: 'h2', text: 'En als u het niet meer nodig heeft?' },
      {
        kind: 'p',
        text:
          'Dan stopt u. De agent is van u. Uw data is van u. Wij leveren de code en documentatie mee. In de praktijk gebeurt dat zelden, omdat goede agents waarde blijven leveren. Maar u hoeft het niet te vrezen. Vrijheid is niet iets wat u bij uw leverancier moet afkopen.',
      },
      {
        kind: 'p',
        text:
          'Nederlandse MKB-ondernemers zijn op dit punt gewoon pragmatisch. Ze willen weten wat iets kost. Ze willen niet elke maand een factuur zonder dat duidelijk is waarvoor. Wij proberen in die traditie te bouwen.',
      },
    ],
  },
];

export const POST_BY_SLUG = POSTS.reduce<Record<string, Post>>((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {});
