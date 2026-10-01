# De eigen agenda

De site kan op twee agenda's draaien. Welke, bepaalt
`NEXT_PUBLIC_BOEKING_PROVIDER`:

| Waarde           | Wat er gebeurt                                                                |
| ---------------- | ----------------------------------------------------------------------------- |
| `cal` (default)  | De Cal.com-embed, zoals het altijd was. Niets verandert.                       |
| `teams`          | Eigen agenda op een Graph-mailbox (`BOEKING_MAILBOX`), via de scheduling-MCP.  |

Beide staan naast elkaar in de code, zodat de eigen agenda eerst op een
testomgeving kan draaien. Pas als die staat, gaat de vlag in productie om; het
opruimen van de Cal.com-kant is daarna een aparte stap.

Let op: `NEXT_PUBLIC_`-variabelen worden bij de build in de bundel gebakken. De
waarde omzetten is niet genoeg — er moet een nieuwe deploy overheen.

## Hoe het werkt

```
bezoeker → /api/v1/agenda/slots ────────→ factumai-mcp-scheduling → Microsoft Graph
                                                  (/mcp)          (BOEKING_MAILBOX)
bezoeker → /api/v1/agenda/boeken → SiteBooking (WACHT) + opt-in mail
                                            │
                        klik op de link in die mail
                                            ↓
     /agenda/bevestigen → /api/v1/agenda/bevestigen → create_appointment → agenda
```

**Boeken gebeurt in twee stappen.** Het formulier zet alleen een aanvraag klaar
en mailt een link; pas de klik op die link zet de afspraak in de agenda. Zie
"Waarom pas na de klik" hieronder.

- **Beschikbaarheid** komt uit `find_available_slots`. De MCP leest vrij/bezet
  over de **hele** mailbox — dus ook afspraken buiten de boekingsagenda tellen
  mee — en snijdt dat bij tot werkdagen, openingstijden, marge en het
  halfuurraster. Die regels staan in de adapter-config in het dashboard, niet in
  de website.
- **Aanvragen** legt een rij in `SiteBooking` neer (dashboard-database) en
  stuurt de opt-in mail. Er gebeurt nog niets in de agenda.
- **Bevestigen** boekt via `create_appointment` met `isOnlineMeeting: true`.
  Graph maakt dan de Teams-vergadering aan en stuurt de agenda-uitnodiging
  vanuit de boekingsmailbox naar de bezoeker. De bevestigingsmail ernaast gaat
  via Resend (`lib/booking/mail.ts`).
- **De site-agent** gebruikt dezelfde route: `checkBeschikbaarheid` toont de
  echte momenten, `boekAfspraak` vraagt er een aan. Het model krijgt alleen
  momenten te zien die uit de agenda komen en mag er zelf geen bedenken — en het
  mag nooit zeggen dat de afspraak vaststaat, want dat is pas zo na de klik.

### Waarom pas na de klik

Het boekingseindpunt is publiek en anoniem. Wie daar een mailadres invult, heeft
niet bewezen dat het van hem is. Zonder tussenstap kan iemand dus een afspraak
in onze agenda zetten met een willekeurige derde als genodigde — die
krijgt dan een uitnodiging voor een gesprek waar hij nooit om vroeg.

Met de opt-in gaat er eerst een mail naar dat adres. Wie hem niet kan lezen,
komt niet verder. De aanvraag blijft tot die tijd in `SiteBooking` staan met
status `WACHT` en raakt de agenda niet.

Details die ertoe doen:

- **De token staat alleen in de mail.** In de database ligt de sha256 ervan, en
  het opzoeken gaat op die hash. Een gelekte databasekopie levert dus geen
  bevestigingen op.
- **De link boekt niet zelf.** Hij opent een pagina met een knop; die knop doet
  de POST. Mailfilters en preview-diensten halen links op om ze te controleren,
  en een link die bij het ophalen al boekt levert afspraken op die niemand heeft
  aangeklikt.
- **Twee keer klikken geeft één afspraak.** Een al bevestigde aanvraag komt er
  als "stond al vast" uit, niet als fout en niet als tweede boeking.
- **De link verloopt** na `BOEKING_TOKEN_UREN` (default 24), maar nooit later
  dan de starttijd zelf.
- **Het moment wordt bij de klik opnieuw gecontroleerd.** Tussen de aanvraag en
  de bevestiging kan iemand anders het slot pakken; dan vervalt de aanvraag en
  moet de bezoeker opnieuw kiezen.
- **Onbevestigde aanvragen worden geruimd** door `/api/v1/site-agent/cron`.
  Bevestigde blijven staan als administratie van wie er geboekt heeft.

### Waarom de starttijd twee keer wordt gecontroleerd

De `start` komt van de client, en die kan alles sturen. Zonder controle boekt
iemand midden in de nacht of dwars door een bestaande afspraak heen.
`zoekVrijSlot` accepteert daarom alleen een **exacte** slotstart uit de agenda —
vijf minuten opschuiven schuift ook het einde op, en loopt zo de afspraak erna
in. Dat geldt net zo goed voor het model: ook een vergissing van de agent komt
zo niet in de agenda terecht.

De controle draait twee keer: bij het aanvragen (geen mail sturen voor een
moment dat niet kan) en bij het bevestigen (tussen die twee zit een klik van de
bezoeker, en in die tijd kan het moment vergeven zijn).

Tussen de tweede controle en het aanmaken blijft een raampje van een fractie van
een seconde. Graph zet een tweede afspraak er dan naast, zichtbaar in de agenda.
Met dit boekingsvolume is dat een aanvaardbaar risico; een echte reservering zou
state in de MCP vragen, en die hoort daar niet.

### Rem op misbruik

- Honeypot-veld in het formulier (`website`), stilzwijgend afgehandeld.
- Per IP: 60 opvragingen per uur, 3 aanvragen per dag. Tellers lopen via
  dezelfde atomaire teller als de site-agent (`lib/site-agent/ratelimit.ts`).
- Per mailadres: 3 aanvragen per dag. Alleen op IP tellen laat een botnet één
  postbus volgooien met opt-in mails; deze teller zet daar een rem op ongeacht
  waar het vandaan komt. Het adres wordt gehasht opgeslagen.
- Faalt de teller, dan mag opvragen nog wel en aanvragen niet.

Wat er **niet** is: een reservering van het slot tijdens het wachten op de klik.
Twee mensen kunnen hetzelfde moment aanvragen; wie het eerst bevestigt, krijgt
het. De ander ziet "dat moment is inmiddels vergeven" en kiest opnieuw.

## Setup

### Wat er al staat

Niet alles hoeft opnieuw. In de dashboard-database van `org_factumai_internal`
staat al:

- **Een werkende Graph-credential**, systeemtype `microsoft_graph`, naam
  "Mail/calender". Die wordt gedeeld door de mail-MCP (drie mailboxen) en de
  scheduling-MCP. De app-registratie in Entra bestaat dus al.
- **Een scheduling-activatie** met instanceKey `aios` op `Info@factumai.nl`,
  gebruikt door de orchestrator. **Die is primair** — daar komt hieronder een
  valkuil uit voort.
- **De tabel `SiteBooking`**, migratie `20260813160000_site_booking`.

De mailboxen van de organisatie draaien op **factumai.nl**, niet op `.com`.

### 1. Deploy de scheduling-MCP

De boekingsconfig zit in `@factumai/mcp-scheduling` **v0.6.0**. Draait de worker
nog op 0.5.0, dan negeert hij `calendarId`, `timeZone` en de rest zonder te
klagen — je krijgt dan slots op UTC-werktijden in de standaardagenda.

Controleer welke versie live staat via `list_instances` of de `MCP_VERSION` in
`wrangler.toml` van de gedeployede worker, en deploy zo nodig opnieuw.

### 2. Bepaal of de credential app-only is

Voor een publieke boekingspagina wil je **app-only** (client credentials): er
zit geen mens achter die opnieuw kan inloggen, en een delegated refresh token
verloopt na 90 dagen — dan valt de agenda op een willekeurige dinsdag stil.

De gedeelde client kiest zelf: app-only zodra er een `clientSecret` is en géén
`refreshToken` (`packages/shared/src/microsoft-graph/index.ts`). Kijk in het
dashboard bij de credential "Mail/calender" welke velden gevuld zijn.

- **Is hij delegated?** Zet dan een aparte credential neer voor de website, met
  `tenantId`, `clientId` en `clientSecret`, en `"clientCredentials": true` in de
  adapter-config. Laat de bestaande credential met rust: de mail-MCP hangt eraan.
- **Is hij al app-only?** Dan kun je hem hergebruiken.

Bij app-only heeft de app-registratie **Application permissions** nodig
(`Calendars.ReadWrite`, `User.Read.All`) mét admin consent — niet de delegated
variant.

### 3. Beperk de app tot één mailbox

Een Application permission geldt standaard voor élke mailbox in de tenant.
Beperk dat in Exchange Online PowerShell:

```powershell
New-ApplicationAccessPolicy `
  -AppId <clientId> `
  -PolicyScopeGroupId sjaak@factumai.nl `
  -AccessRight RestrictAccess `
  -Description "Alleen de boekingsagenda van de website"
```

Controleer met `Test-ApplicationAccessPolicy`. Sla dit niet over: het is het
verschil tussen een app die één agenda mag lezen en een app die de hele
organisatie mag lezen.

Let op: bestaat er al een policy voor deze app ten behoeve van de mail-MCP, dan
moet de boekingsmailbox daarin passen. Een tweede policy voor dezelfde app
vervangt de eerste niet, hij botst ermee.

### 4. Maak de boekingsagenda

Maak in Outlook van de boekingsmailbox een agenda naast de standaardagenda,
bijvoorbeeld "Kennismaking". Daar komen de websiteboekingen in te staan, zodat
ze niet door de gewone agenda lopen.

Het `calendarId` haal je op met `GET /users/<upn>/calendars`.

### 5. Nieuwe MCP-activatie — géén bestaande aanpassen

Voeg een **nieuwe** activatie toe voor `factumai-mcp-scheduling` met een eigen
instanceKey, bijvoorbeeld `website`. Adapter `microsoft_graph_calendar`:

```json
{
  "clientCredentials": true,
  "defaultTenantId": "<tenantId>",
  "resourceFilter": "mail eq 'sjaak@factumai.nl'",
  "calendarId": "<id van de Kennismaking-agenda>",
  "timeZone": "Europe/Amsterdam",
  "workdays": [1, 2, 3, 4, 5],
  "workdayStartHour": 9,
  "workdayEndHour": 17,
  "slotIntervalMinutes": 30,
  "minimumNoticeMinutes": 240,
  "bufferMinutes": 15
}
```

- **Maak deze niet primair.** `aios` is primair en de orchestrator rekent daarop;
  omzetten verlegt stilletjes waar die uitkomt.
- `resourceFilter` houdt de resourcelijst bij die ene mailbox. Zonder filter
  loopt `find_available_slots` langs élke gebruiker in de tenant — dat is traag
  en het levert slots op van mensen die er niets mee te maken hebben.
- `timeZone` moet erin staan. Zonder die waarde leest de MCP de openingstijden in
  UTC, en dan verschuift het venster een uur zodra de klok verzet wordt.

### 6. Env-variabelen op Vercel

```
NEXT_PUBLIC_BOEKING_PROVIDER=teams
FACTUMAI_MCP_SCHEDULING_URL=https://factumai-mcp-scheduling.<account>.workers.dev/mcp
BOEKING_MCP_INSTANCE=website
BOEKING_MAILBOX=sjaak@factumai.nl
BOEKING_REPLY_TO=sjaak@factumai.nl
```

En als die er nog niet stonden: `FACTUMAI_MCP_INBOUND_SECRET`,
`FACTUMAI_MCP_ORG_ID`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`.

**`BOEKING_MCP_INSTANCE` is niet optioneel** zolang `aios` primair is. Zonder
die waarde kijkt en boekt de website in de agenda van de orchestrator, en daar
faalt niets zichtbaar aan.

**Zonder `RESEND_API_KEY` werkt boeken niet.** De opt-in link komt per mail; geen
mail is geen bevestiging is geen afspraak.

`NEXT_PUBLIC_`-variabelen worden bij de build in de bundel gebakken: er moet een
nieuwe deploy overheen voordat de vlag effect heeft.

## Controleren of het werkt

1. `GET /api/v1/agenda/slots` geeft dagen met tijden terug, in Nederlandse tijd,
   alleen op werkdagen en niet binnen de voorbereidingstijd.
2. Vraag een testafspraak aan op je eigen mailadres. Er hoort te gebeuren: je
   krijgt een mail met een link, en in de agenda staat nog **niets**. In
   `SiteBooking` staat een rij met status `WACHT`.
3. Klik de link, klik de knop. Nu verschijnt de afspraak in de Kennismaking-
   agenda, krijg je een uitnodiging met een Teams-link vanuit de
   boekingsmailbox, plus de bevestigingsmail. De rij staat op `BEVESTIGD`.
4. Klik de link nog eens: hij hoort te zeggen dat het al vaststond, en er mag
   geen tweede afspraak bijkomen.
5. Vraag de slots nog eens op: het geboekte moment is weg, en met
   `bufferMinutes: 15` ook het kwartier eromheen.
6. Open de chat en vraag wanneer het kan. De agent hoort echte momenten te
   noemen, en na het aanvragen te zeggen dat er een mail onderweg is — niet dat
   de afspraak staat.

## Terug naar Cal.com

`NEXT_PUBLIC_BOEKING_PROVIDER` op `cal` zetten en opnieuw deployen. De
Cal.com-code is niet verwijderd, dus dat is alles.
