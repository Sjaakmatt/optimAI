# De eigen agenda

De site kan op twee agenda's draaien. Welke, bepaalt
`NEXT_PUBLIC_BOEKING_PROVIDER`:

| Waarde           | Wat er gebeurt                                                                |
| ---------------- | ----------------------------------------------------------------------------- |
| `cal` (default)  | De Cal.com-embed, zoals het altijd was. Niets verandert.                       |
| `teams`          | Eigen agenda op de mailbox `sjaak@factumai.com`, via de scheduling-MCP.        |

Beide staan naast elkaar in de code, zodat de eigen agenda eerst op een
testomgeving kan draaien. Pas als die staat, gaat de vlag in productie om; het
opruimen van de Cal.com-kant is daarna een aparte stap.

Let op: `NEXT_PUBLIC_`-variabelen worden bij de build in de bundel gebakken. De
waarde omzetten is niet genoeg — er moet een nieuwe deploy overheen.

## Hoe het werkt

```
bezoeker → /api/v1/agenda/slots ────────→ factumai-mcp-scheduling → Microsoft Graph
                                                  (/mcp)             (mailbox Sjaak)
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
  vanuit `sjaak@factumai.com` naar de bezoeker. De bevestigingsmail ernaast gaat
  via Resend (`lib/booking/mail.ts`).
- **De site-agent** gebruikt dezelfde route: `checkBeschikbaarheid` toont de
  echte momenten, `boekAfspraak` vraagt er een aan. Het model krijgt alleen
  momenten te zien die uit de agenda komen en mag er zelf geen bedenken — en het
  mag nooit zeggen dat de afspraak vaststaat, want dat is pas zo na de klik.

### Waarom pas na de klik

Het boekingseindpunt is publiek en anoniem. Wie daar een mailadres invult, heeft
niet bewezen dat het van hem is. Zonder tussenstap kan iemand dus een afspraak
in de agenda van Sjaak zetten met een willekeurige derde als genodigde — die
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

## Setup aan Microsoft-kant

Eenmalig, in de Entra-tenant van factumai.com. Nodig: global admin.

1. **Aparte agenda in de mailbox.** Maak in Outlook van `sjaak@factumai.com` een
   agenda naast de standaardagenda, bijvoorbeeld "Kennismaking". Daar komen de
   websiteboekingen in te staan, zodat ze niet door de gewone agenda lopen.
   Het `calendarId` vind je via `GET /users/sjaak@factumai.com/calendars`.

2. **App-registratie.** Entra ID → App registrations → New registration. Noteer
   `tenantId` en `clientId`, en maak onder Certificates & secrets een
   client secret aan.

3. **Application permissions** (niet delegated) op Microsoft Graph:
   `Calendars.ReadWrite` en `User.Read.All`. Daarna **Grant admin consent** —
   zonder die klik werkt er niets.

4. **Toegang beperken tot één mailbox.** Een Application permission geldt
   standaard voor élke mailbox in de tenant. Beperk dat met een
   ApplicationAccessPolicy in Exchange Online PowerShell:

   ```powershell
   New-ApplicationAccessPolicy `
     -AppId <clientId> `
     -PolicyScopeGroupId sjaak@factumai.com `
     -AccessRight RestrictAccess `
     -Description "Alleen de boekingsagenda van de website"
   ```

   Controleer met `Test-ApplicationAccessPolicy`. Sla deze stap niet over: hij is
   het verschil tussen een app die één agenda mag lezen en een app die de hele
   organisatie mag lezen.

5. **Credential in het dashboard.** Zet onder de organisatie een credential van
   systeemtype `microsoft_graph` met `tenantId`, `clientId` en `clientSecret`.
   Die gaat de Supabase Vault in; de MCP haalt hem per tenant op.

6. **MCP-activatie in het dashboard.** Activeer `factumai-mcp-scheduling` met
   adapter `microsoft_graph_calendar` en deze `adapterConfig`:

   ```json
   {
     "clientCredentials": true,
     "defaultTenantId": "<tenantId>",
     "resourceFilter": "mail eq 'sjaak@factumai.com'",
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

   - `resourceFilter` houdt de resourcelijst bij die ene mailbox; zonder filter
     loopt `find_available_slots` langs élke gebruiker in de tenant.
   - `timeZone` moet erin staan. Zonder die waarde leest de MCP de openingstijden
     in UTC, en dan verschuift het venster een uur zodra de klok verzet wordt.
   - `minimumNoticeMinutes` is de tijd die Sjaak minimaal krijgt om zich voor te
     bereiden; `bufferMinutes` de lucht rond bestaande afspraken.

7. **Migratie.** De opt-in heeft de tabel `SiteBooking` nodig. Die staat in de
   dashboard-repo als `prisma/migrations/20260813160000_site_booking` en is op
   13 augustus 2026 toegepast op productie — hier is dus niets meer te doen.

8. **Env-variabelen op Vercel** (zie `.env.example`):
   `NEXT_PUBLIC_BOEKING_PROVIDER=teams`, `FACTUMAI_MCP_SCHEDULING_URL`,
   `NEXT_PUBLIC_SITE_URL` (staat in de bevestigingslink), en — als die er nog
   niet stonden — `FACTUMAI_MCP_INBOUND_SECRET`, `FACTUMAI_MCP_ORG_ID` en
   `RESEND_API_KEY`. Zonder Resend-key gaat er geen opt-in mail de deur uit en
   kan er dus ook niets bevestigd worden.

## Controleren of het werkt

1. `GET /api/v1/agenda/slots` geeft dagen met tijden terug, in Nederlandse tijd,
   alleen op werkdagen en niet binnen de voorbereidingstijd.
2. Vraag een testafspraak aan op je eigen mailadres. Er hoort te gebeuren: je
   krijgt een mail met een link, en in de agenda staat nog **niets**. In
   `SiteBooking` staat een rij met status `WACHT`.
3. Klik de link, klik de knop. Nu verschijnt de afspraak in de Kennismaking-
   agenda, krijg je een uitnodiging met een Teams-link vanuit
   `sjaak@factumai.com`, plus de bevestigingsmail. De rij staat op `BEVESTIGD`.
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
