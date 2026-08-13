# Opdracht voor de dashboard-repo: site-agent afmaken

Dit bestand is bedoeld om integraal te plakken in een Claude Code-sessie die in
de **FactumAI-dashboard-repo** draait, niet in deze website-repo.

---

Je werkt in de FactumAI-dashboard-repo. Op de website (factumai.nl, repo
`Sjaakmatt/optimAI`, branch `claude/factumai-site-agent-ukml23`) is een
conversationele site-agent gebouwd die naar de dashboard-database schrijft. De
databasemigratie is al toegepast. Jouw werk zit aan de dashboardkant.

Lees dit hele document voordat je iets doet. Werk taak voor taak en vraag na
elke taak om akkoord.

## Niet-onderhandelbaar

- **Draai de migratie niet opnieuw en drop niets.** De tabellen staan al live
  met data-integriteit eraan. Je taak is Prisma laten kloppen met wat er is,
  niet andersom.
- **Raak de website-repo niet aan.** Als je daar iets wilt wijzigen, meld het.
- **Geen autonome uitgaande actie.** Alles wat richting een prospect gaat loopt
  via de werkbak, ook wat de site-agent aanlevert.
- **Geen bedragen, datums of besparingscijfers** in iets dat een agent kan
  uitspreken. De website blokkeert die in code; ondermijn dat niet.
- Volg de bestaande conventies van deze repo: TypeScript strict, geen `any`,
  bestaande componenten hergebruiken in plaats van nieuwe bouwen.

## Wat er al staat in de database

Toegepast op 13 augustus 2026 via de Supabase-MCP, in drie additieve stappen
(`site_agent_leadbron_website_agent`, `site_agent_conversations`,
`site_agent_counters`). Niets gedropt, RLS aan op alle nieuwe tabellen met
`is_super_admin_v2()` / `current_organization_id_v2()`.

- Enum `LeadBron` heeft er een waarde bij: `WEBSITE_AGENT`.
- Nieuwe tabellen: `SiteConversation`, `SiteMessage`, `SiteAgentCounter`.
- Nieuwe functie `site_agent_tel(...)` voor atomair ophogen van tellers.
- Nieuwe rij in `Agent`: id `cmsiteagent0000factumainl`, organisatie
  `org_factumai_internal`, naam "Site-agent factumai.nl", riskClass `limited`.

De exacte SQL staat in de website-repo in `docs/site-agent/migratie.sql`. Heb je
daar geen toegang toe, vraag het bestand dan aan Sjaak voordat je begint.

## Taak 1: schema-drift oplossen (doe dit eerst)

`prisma/schema.prisma` weet nog niets van het bovenstaande. Draait er iemand
`prisma migrate dev`, dan wil Prisma de nieuwe tabellen droppen. Dat moet je
voorkomen.

1. Voeg `WEBSITE_AGENT` achteraan toe aan enum `LeadBron` (bestaande volgorde
   intact laten).
2. Voeg de drie modellen hieronder toe.
3. Voeg de relatievelden toe: `siteConversations SiteConversation[]` op zowel
   `Organization` als `Lead`.
4. Maak de migratiemap aan, zet de SQL erin en markeer hem als toegepast:

   ```bash
   mkdir -p prisma/migrations/20260813000000_site_agent
   cp <pad>/migratie.sql prisma/migrations/20260813000000_site_agent/migration.sql
   npx prisma migrate resolve --applied 20260813000000_site_agent
   npx prisma generate
   ```

5. Controleer dat er niets meer openstaat met `prisma migrate diff` tussen
   datamodel en datasource. Blijft er een verschil, los dat op in het schema en
   niet in de database.

```prisma
model SiteConversation {
  id              String     @id @default(cuid())
  organizationId  String
  sessionId       String     @unique // client-side gegenereerd, opaque
  paginaPad       String
  playbook        String
  referrer        String?
  userAgentHash   String?
  status          String     @default("OPEN") // OPEN | AFGEROND | AFGEBROKEN
  score           LeadScore?
  scoreReason     String?
  samenvatting    String?
  afspraakGeboekt Boolean    @default(false)
  leadId          String?
  totaalTokens    Int        @default(0)
  kostenUsd       Decimal?   @db.Decimal(10, 4)
  expiresAt       DateTime? // retentie: 90 dagen na aanmaak
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  organization Organization  @relation(fields: [organizationId], references: [id])
  lead         Lead?         @relation(fields: [leadId], references: [id], onDelete: SetNull)
  messages     SiteMessage[]

  @@index([organizationId, createdAt])
  @@index([expiresAt])
  @@index([leadId])
}

model SiteMessage {
  id             String   @id @default(cuid())
  conversationId String
  rol            String // "user" | "assistant"
  inhoud         String
  toolCalls      Json?
  geblokkeerd    Boolean  @default(false) // outputcontrole heeft ingegrepen
  blokReden      String?
  createdAt      DateTime @default(now())

  conversation SiteConversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  @@index([conversationId, createdAt])
}

model SiteAgentCounter {
  id           String   @id @default(cuid())
  soort        String // "sessie" | "ip" | "dagkosten"
  sleutel      String // gehasht IP, opaque sessie-id, of datum
  vensterStart DateTime
  aantal       Int      @default(0)
  kostenUsd    Decimal  @default(0) @db.Decimal(10, 4)
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@unique([soort, sleutel, vensterStart])
  @@index([expiresAt])
}
```

## Taak 2: werkbak-compatibiliteit controleren en terugrapporteren

De site-agent zet twee soorten items in de werkbak. Controleer of jullie
bestaande uitvoerlogica (verwacht in `src/lib/review/actions.ts`) deze vormen
aankan, en **rapporteer terug wat je vindt voordat je iets aanpast**. Wijkt de
verwachte vorm af, meld dan welke sleutels jullie kant verwacht; dan passen we
de website daarop aan in plaats van andersom.

**Procesnotitie naar de bezoeker** (mag pas na goedkeuring verstuurd worden):

```
kind:   "draft_email"
domain: "mail"
level:  "REVIEW"
status: "PENDING"
proposed:  { to, subject, body, bron: "site-agent" }
grounding: { conversatieId, paginaPad, leadId, transcript }
```

**Vraag die de agent niet mocht beantwoorden** (prijs, datum, toezegging):

```
kind:   "task"
domain: "chat"
level:  "REVIEW" of "ESCALATION" bij een sterk gekwalificeerde bezoeker
status: "PENDING"
proposed:  { vraag, context, email, paginaPad, bron: "site-agent" }
grounding: { conversatieId, leadId, transcript }
```

Let bij `draft_email` specifiek op: het adres staat in `proposed.to`, en er mag
niets uitgaan zolang de status `PENDING` is.

## Taak 3: overzicht `/agency/site-agent`

Bouw een sober overzichtsscherm. Hergebruik `PageShell`, `KpiCard` en de
bestaande tabelcomponenten; bouw geen nieuwe designtaal.

KPI's bovenaan:

- Gesprekken per dag (grafiek over de laatste 30 dagen).
- Score-verdeling HOT / WARM / COLD.
- Geboekte afspraken (`afspraakGeboekt = true`).
- Aantal geblokkeerde berichten, uitgesplitst naar reden. **Dit is de
  belangrijkste kwaliteitsmeting op de prompt, dus zet hem prominent en niet
  onderaan.** De reden staat in `SiteMessage.blokReden` en als categorie in de
  events (zie hieronder).
- Tokenkosten: som van `SiteConversation.kostenUsd` over de periode.

Daaronder een tabel met gesprekken: datum, paginapad, playbook, score, wel of
geen afspraak, aantal berichten, kosten. Elke rij klikbaar naar het volledige
transcript (`SiteMessage`, oplopend op `createdAt`), waarin geblokkeerde
berichten zichtbaar blijven met hun reden erbij. Die wil Sjaak juist kunnen
lezen.

Filter op organisatie `org_factumai_internal`. Respecteer de bestaande
autorisatie van de agency-omgeving; voeg geen eigen auth toe.

## Referentiegegevens

| Wat | Waarde |
|---|---|
| Supabase-project | `factumai-dashboard`, ref `zaifgoujlpcwvrxjkhzy` |
| Organisatie | `org_factumai_internal` |
| Agent-id | `cmsiteagent0000factumainl` |
| Agent-slug in events | `site-agent-factumai` |
| Leadbron | `WEBSITE_AGENT` |

Eventcategorieën die de site-agent naar `AgentEvent` schrijft:

- `llm` — elke modelcall, met model, tokens, cache-tokens, kosten en duur.
- `compliance` — **nieuw**, elke treffer van de outputcontrole, met de geraakte
  regel en het fragment. Zorg dat deze categorie filterbaar is in de bestaande
  eventweergave.
- `user_action` — elke toolaanroep, met gemaskeerde invoer en de uitvoer.
- `llm_decision` — de scoring na afloop van een gesprek (komt eraan vanuit de
  website, alleen de beslissing en de onderbouwing, geen prompt of brontekst).

Retentie: `SiteConversation.expiresAt` staat op 90 dagen na aanmaak.
`SiteAgentCounter.expiresAt` loopt per venster. Hang beide aan de bestaande
retention-cron; er is nu nog geen opruiming voor deze twee tabellen. Voeg ze ook
toe aan `RetentionPolicy` als jullie die tabel als bron gebruiken.

## Wat je oplevert

Per taak: typecheck schoon, lint schoon, tests groen, en een korte samenvatting
van wat je hebt gebouwd plus waar je van deze opdracht bent afgeweken en waarom.

Meld expliciet terug:

1. Of `prisma migrate diff` na taak 1 helemaal schoon is.
2. Welke vorm jullie werkbak verwacht in `proposed`, als die afwijkt van taak 2.
3. Of de retention-cron de twee nieuwe tabellen nu meeneemt.
