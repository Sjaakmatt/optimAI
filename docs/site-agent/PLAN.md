# Site-agent, fase 0: bevindingen en implementatieplan

Status: wacht op akkoord. Er is nog geen productiecode geschreven.

## A. Wat ik aantrof (en waar de opdracht van de werkelijkheid afwijkt)

Deze repo (`factumai.nl`) is een Next.js 15 / React 19 / Tailwind v4 marketingsite
met App Router. **Er is geen `src/`, geen Prisma, geen CRM, geen werkbak.**
Alle paden uit de opdracht (`src/lib/prisma.ts`, `src/lib/crm/anthropic.ts`,
`src/lib/crm/four-eyes.ts`, `src/lib/review/actions.ts`, `src/types/review.ts`,
`docs/AGENT-INTEGRATION.md`, `/agency/...`) bestaan hier niet. Die horen bij het
**dashboard**, een aparte codebase.

| Verwacht | Aangetroffen |
|---|---|
| `prisma/schema.prisma`, modellen `Lead`/`Interactie`/`ReviewItem` | Niet in deze repo. Wel in de dashboard-database (Supabase project `factumai-dashboard`, ref `zaifgoujlpcwvrxjkhzy`), waar Prisma de schemabron is |
| `src/lib/prisma.ts` | `lib/db/supabase.ts`, server-only service-role client (omzeilt RLS) |
| `src/lib/crm/anthropic.ts` | `lib/scan/analyze.ts`, directe `new Anthropic()` per call. Modelconstante `DEFAULT_SCAN_MODEL = 'claude-sonnet-5'`, override via `SCAN_AI_MODEL`. Geen `claude-sonnet-4-6` in de repo |
| `four-eyes.ts` / `createSendApproval` | Bestaat niet hier. `ReviewItem` bestaat wel in de database; `kind` is vrije tekst, in gebruik: `draft_email`, `task`, `schedule_meeting`, `social_post`, `crm_update`, `none` |
| `docs/AGENT-INTEGRATION.md` | Bestaat niet. Wel `docs/AI-SCAN.md`. Eventconventie is af te leiden uit tabel `AgentEvent`: `category` in gebruik `llm`, `llm_decision`, `mcp`, `system`, `auth`, `user_action`, `search`, `search_stage`; `expiresAt` doet de retentie, gestuurd door `RetentionPolicy`/`RetentionRunLog` in het dashboard |
| Resend-voorbeeld `src/lib/billing/email.ts` | `app/api/contact/route.ts`, `app/api/scan-report/route.ts`, `app/api/cal-webhook/route.ts`: kale `fetch` naar `api.resend.com`, env `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL` |
| Agendaboeking via Graph of mcp-scheduling | **Cal.com is er al**: `components/booking/` (namespace `kennismaking`, link via `NEXT_PUBLIC_CAL_LINK`), plus een geverifieerde webhook `app/api/cal-webhook/route.ts` die de bevestigingsmail stuurt. Geen Microsoft Graph in deze repo |
| Rate limiting op publieke endpoints | Aanwezig, in-memory per instance: `/api/scan` 4 per 10 min per IP, `/api/scan-report` 6 per 10 min. Honeypot-velden op alle drie de publieke routes. SSRF-guard in de scraper |

Verder relevant:

- **Publieke site**: `app/layout.tsx` is de enige layout (geen PageShell), pagina's
  staan direct onder `app/`. `/diensten` (4 statische subpagina's + `/vergelijken/[slug]`),
  `/branches` + `/branches/[branche]` (data in `lib/data/branches.ts`, 8 branches),
  blog op `/kennis` + `/kennis/[slug]` (data in `lib/data/posts.ts`, plus externe
  artikelen via `lib/data/soro.ts`). Er is **geen prijspagina**; prijsintentie landt
  op `/diensten`, `/info` en `/plan`.
- **Designtokens**: CSS-variabelen in `app/globals.css` (`--paper`, `--ink`,
  `--terra`, `--oker`, `--shadow-lift`, fonts `--font-playfair/lora/plex-mono`).
- **Cookies**: `ConsentGate` (localStorage, GA4 opt-in). Sessie-id in `sessionStorage`
  vraagt geen consent, dus dat kan zoals gespecificeerd.
- **Conflict**: `CalProvider` rendert al een zwevende knop rechtsonder (`z-40`).
  Daar wil de widget ook staan.
- **Geen testrunner**: geen jest/vitest, geen enkel testbestand. `zod` staat in
  `devDependencies` en wordt alleen in een build-script gebruikt.
- Geen `.env.example`. Geen lint/typecheck in CI (alleen twee content-workflows).

## B. Voorstellen op de vier punten waar ik niet zelfstandig over ga

1. **Datamodel.** `SiteConversation`/`SiteMessage` als Prisma-model aanmaken kan hier
   niet: de schemabron staat in de dashboard-repo, en een los SQL-migratiebestand hier
   zou drift veroorzaken. Voorstel: ik lever in deze repo
   `docs/site-agent/schema-voorstel.prisma` (de twee modellen plus `WEBSITE_AGENT` in
   `LeadBron`, exact in de stijl van het dashboardschema) en `docs/site-agent/migratie.sql`
   als lees-referentie. Sjaak past ze toe in de dashboard-repo; niets wordt hier
   uitgevoerd. De site schrijft daarna via de service-role client, precies zoals
   `lib/scan/leads.ts` dat voor `ScanLead` doet. Let op: `Lead.id`, `ReviewItem.id` en
   `updatedAt` hebben geen database-default (Prisma vult ze app-side), dus die genereer
   ik zelf bij insert.
2. **Tests.** Vijftien guardrail-cases en tien evaluatiegesprekken vragen een runner.
   Voorstel zonder nieuwe dependency: `node --test` met de al aanwezige `tsx`
   (`node --import tsx --test`), plus een script `npm test`. Alternatief `vitest` is
   comfortabeler maar is wel een nieuwe dependency; zeg het als je die liever hebt.
3. **Kennisbank in markdown.** `content/` bestaat niet en er is geen
   frontmatter-parser (`gray-matter` zou nieuw zijn). Voorstel: markdown met
   frontmatter zoals gespecificeerd, gelezen met een eigen parser van ~30 regels voor
   de vier veldtypes die we gebruiken. Geen nieuwe dependency, wel gewoon
   redigeerbare bestanden.
4. **Model.** De repo gebruikt `claude-sonnet-5`, niet `claude-sonnet-4-6`. Voorstel:
   `claude-sonnet-5` voor het gesprek en `claude-haiku-4-5` voor de scoring, allebei
   overschrijfbaar via env, zodat we de repo-conventie volgen.

## C. Fasering

| Fase | Aanmaken | Aanpassen |
|---|---|---|
| 1 datamodel + kennisbank | `docs/site-agent/schema-voorstel.prisma`, `docs/site-agent/migratie.sql`, `lib/site-agent/db.ts` (conversatie- en berichtopslag via service-role), `lib/site-agent/kennisbank.ts` (loader + frontmatter-parser + harde `publiekTeNoemen`-filter), `content/site-agent/{propositie,werkwijze,prijsmodel,compliance,bezwaren,techniek,klanten}.md` | `docs/AI-SCAN.md` niet; wel `.env.example` nieuw aanmaken |
| 2 endpoint + guardrails | `app/api/v1/site-agent/chat/route.ts`, `lib/site-agent/prompt.ts`, `lib/site-agent/guardrails.ts`, `lib/site-agent/guardrails.test.ts`, `lib/site-agent/events.ts` (AgentEvent-logging) | `package.json` (`test`-script, `zod` naar dependencies) |
| 3 widget | `components/site-agent/SiteAgent.tsx` + `Launcher/Panel/Message`-onderdelen, `components/site-agent/useSiteAgent.ts` | `app/layout.tsx` (lazy mount), `components/booking/CalProvider.tsx` (positie of samenvoeging met de agent-knop) |
| 4 tools | `lib/site-agent/tools/{maakLead,boekAfspraak,stuurSamenvatting,escaleerNaarSjaak}.ts`, `lib/site-agent/tools/index.ts`, `lib/site-agent/notify.ts` (interface + Resend-implementatie) | widget: signaal `boekAfspraak` opent de bestaande Cal-popup |
| 5 scoring | `lib/site-agent/scoring.ts`, `app/api/v1/site-agent/afronden/route.ts`, `app/api/v1/site-agent/cron/route.ts` (retentie + timeout) | — |
| 6 playbooks | `content/site-agent/playbooks/*.md`, `lib/site-agent/playbooks.ts` (padmapping, vaste branchelijst uit `lib/data/branches.ts`) | — |
| 7 misbruik + evaluatie | `lib/site-agent/ratelimit.ts` (tellertabel in Supabase), `lib/site-agent/budget.ts`, `evals/site-agent/*.json` + `evals/site-agent/run.ts`, `scripts/hammer-site-agent.ts`, `docs/site-agent/README.md` | `.env.example` |

Overzicht `/agency/site-agent` uit fase 5 kan hier niet: er is geen agency-omgeving en
geen auth in deze repo. Voorstel: die pagina hoort in de dashboard-repo en wordt een
aparte opdracht; ik lever wel de data en de events zodat hij daar te bouwen is.

## D. Waar ik twijfel

- **Boeking koppelen aan het gesprek.** De Cal-webhook kent geen `sessionId`. Zonder
  koppeling kan `afspraakGeboekt` alleen door de widget worden gezet (bezoeker kan
  liegen of afhaken na openen). Beste optie lijkt een prefill-parameter op de Cal-link
  die in de webhook terugkomt; dat vraagt een instelling in Cal.com. Wil je dat, of
  accepteren we voorlopig het widget-signaal?
- **ReviewItem rechtstreeks schrijven.** Insert via service-role omzeilt de
  `createSendApproval`-logica in het dashboard (confidence, grounding, level, domain).
  Alternatief is een endpoint of MCP-tool aan dashboardzijde. Rechtstreeks is sneller,
  via het dashboard is netter. Ik neig naar rechtstreeks met exact dezelfde velden, en
  dat in de README vastleggen.
- **Kostenplafond en rate limiting** hebben gedeelde state nodig; in-memory werkt op
  Vercel per instance niet betrouwbaar. Ik gebruik een tellertabel in de
  dashboard-database (geen nieuwe infrastructuur), wat wel een extra tabel betekent en
  dus in hetzelfde migratievoorstel meegaat.
- **`prijs`-playbook** heeft geen eigen pagina; ik map hem op `/diensten*`, `/info` en
  `/plan` tenzij je een echte prijspagina wilt.

## E. Opgemerkt (buiten scope, niet aangeraakt)

- `zod` staat in `devDependencies` terwijl runtime-validatie hem nodig heeft.
- Geen lint/typecheck in CI; alleen `npm run build` binnen de content-workflow.
- De in-memory rate limiters op `/api/scan` en `/api/scan-report` bieden op serverless
  weinig echte bescherming.
