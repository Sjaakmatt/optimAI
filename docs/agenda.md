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
bezoeker → /api/v1/agenda/slots  ─┐
                                  ├→ factumai-mcp-scheduling  →  Microsoft Graph
bezoeker → /api/v1/agenda/boeken ─┘        (/mcp)                (mailbox Sjaak)
```

- **Beschikbaarheid** komt uit `find_available_slots`. De MCP leest vrij/bezet
  over de **hele** mailbox — dus ook afspraken buiten de boekingsagenda tellen
  mee — en snijdt dat bij tot werkdagen, openingstijden, marge en het
  halfuurraster. Die regels staan in de adapter-config in het dashboard, niet in
  de website.
- **Boeken** gaat via `create_appointment` met `isOnlineMeeting: true`. Graph
  maakt dan de Teams-vergadering aan en stuurt de agenda-uitnodiging vanuit
  `sjaak@factumai.com` naar de bezoeker. De bevestigingsmail ernaast gaat via
  Resend (`lib/booking/mail.ts`).
- **De site-agent** gebruikt dezelfde route: `checkBeschikbaarheid` toont de
  echte momenten, `boekAfspraak` legt er een vast. Het model krijgt alleen
  momenten te zien die uit de agenda komen en mag er zelf geen bedenken.

### Waarom de starttijd nog een keer wordt gecontroleerd

`/api/v1/agenda/boeken` is publiek en anoniem. Zonder controle kan iemand een
willekeurige `start` meesturen en midden in de nacht of dwars door een bestaande
afspraak heen boeken. `boekAfspraakIn` haalt daarom eerst de vrije momenten op
en accepteert alleen een **exacte** slotstart. Hetzelfde geldt voor het model:
ook een vergissing van de agent komt zo niet in de agenda terecht.

Er blijft een klein raampje tussen die controle en het aanmaken waarin iemand
anders hetzelfde moment kan pakken. Graph zet de tweede afspraak er dan naast en
dat is zichtbaar in de agenda. Met dit boekingsvolume is dat een aanvaardbaar
risico; een echte reservering zou state in de MCP vragen, en die hoort daar niet.

### Rem op misbruik

- Honeypot-veld in het formulier (`website`), stilzwijgend afgehandeld.
- Per IP: 60 opvragingen per uur, 3 boekingen per dag. Tellers lopen via
  dezelfde atomaire teller als de site-agent (`lib/site-agent/ratelimit.ts`).
- Faalt de teller, dan mag opvragen nog wel en boeken niet.

Wat er **niet** is: een bevestigingsmail waarop de bezoeker moet klikken voordat
de afspraak vaststaat. Iemand kan dus met een bestaand mailadres van een ander
een afspraak zetten. Bij dit volume is dat te overzien — wordt het een probleem,
dan is dubbele opt-in de volgende stap.

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

7. **Env-variabelen op Vercel** (zie `.env.example`):
   `NEXT_PUBLIC_BOEKING_PROVIDER=teams`, `FACTUMAI_MCP_SCHEDULING_URL`,
   en — als die er nog niet stonden — `FACTUMAI_MCP_INBOUND_SECRET` en
   `FACTUMAI_MCP_ORG_ID`.

## Controleren of het werkt

1. `GET /api/v1/agenda/slots` geeft dagen met tijden terug, in Nederlandse tijd,
   alleen op werkdagen en niet binnen de voorbereidingstijd.
2. Boek een testafspraak op je eigen mailadres. Er hoort te gebeuren: de afspraak
   verschijnt in de Kennismaking-agenda, je krijgt een uitnodiging met een
   Teams-link vanuit `sjaak@factumai.com`, plus de bevestigingsmail.
3. Vraag de slots nog eens op: het geboekte moment is weg, en met
   `bufferMinutes: 15` ook het kwartier eromheen.
4. Open de chat en vraag wanneer Sjaak kan. De agent hoort echte momenten te
   noemen en de agenda te openen.

## Terug naar Cal.com

`NEXT_PUBLIC_BOEKING_PROVIDER` op `cal` zetten en opnieuw deployen. De
Cal.com-code is niet verwijderd, dus dat is alles.
