# Site-agent

De conversationele agent rechtsonder op factumai.nl. Kwalificeert bezoekers en
stuurt aan op een kennismaking van 20 minuten.

Hij is tegelijk een demonstratie van de propositie: hij classificeert, haalt
context op, beoordeelt en stelt een actie voor die langs een mens gaat. Noemt
iemand een prijs of een datum, dan gokt hij niet maar escaleert hij zichtbaar
naar Sjaak. Dat gedrag is de verkoop.

## Aanzetten

De agent staat standaard **uit**. Twee variabelen moeten allebei op `true`:

```
SITE_AGENT_ENABLED=true              # het endpoint
NEXT_PUBLIC_SITE_AGENT_ENABLED=true  # de widget
```

Verder heb je minimaal nodig: `ANTHROPIC_API_KEY`, `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY` en `CRON_SECRET`. Zie `.env.example` voor de rest,
met per variabele wat hij doet.

## Hoe het in elkaar zit

| Onderdeel | Waar |
|---|---|
| Widget | `components/site-agent/` |
| Gesprekseindpunt | `app/api/v1/site-agent/chat/route.ts` |
| Afronden en scoring | `app/api/v1/site-agent/afronden/route.ts`, `lib/site-agent/scoring.ts` |
| Cron (stille gesprekken, retentie) | `app/api/v1/site-agent/cron/route.ts`, elke 15 minuten |
| Prompt | `lib/site-agent/prompt.ts`, bron in `docs/site-agent/prompt.md` |
| Kennisbank | `content/site-agent/*.md`, geladen door `lib/site-agent/kennisbank.ts` |
| Outputcontrole | `lib/site-agent/guardrails.ts` |
| Tools | `lib/site-agent/tools/` |

Data gaat naar de dashboard-database: `SiteConversation`, `SiteMessage`, `Lead`,
`Interactie`, `ReviewItem` en `AgentEvent`. De migratie is toegepast; de
dashboardkant heeft nog werk, zie `opdracht-dashboard.md`.

## De prompt aanpassen

`docs/site-agent/prompt.md` is de bron van waarheid. De draaiende tekst staat in
`lib/site-agent/prompt.ts` (`SYSTEM_BASE` en `QUALIFICATION_FLOW`). Pas ze
allebei aan; een prompt die op twee plekken uit elkaar loopt is erger dan geen
prompt.

Draai daarna het evaluatieharnas (zie hieronder) en de guardrail-tests:

```bash
npm test
```

Een verslechtering blokkeert de wijziging.

## De kennisbank uitbreiden

Voeg een bestand toe in `content/site-agent/` met frontmatter:

```yaml
---
id: mijn-onderwerp
publiek: true
laatstBijgewerkt: 2026-08-13
---
```

Alleen bestanden met `publiek: true` komen in de context. HTML-commentaar wordt
gestript, dus je kunt er redactie-notities in zetten die de agent nooit ziet.

Wat de agent niet in zijn kennisbank vindt, zegt hij niet. Zet er dus geen
bedragen, doorlooptijden of resultaatcijfers in: de outputcontrole blokkeert die
alsnog, en dan loopt het gesprek vast op een zin die jij hebt goedgekeurd.

De hele publieke kennisbank gaat in het systeembericht, met prompt caching. Op
dit moment is dat ongeveer 4.100 tokens. Groeit hij boven de 30.000, dan
waarschuwt de loader in de serverlog en moeten we retrieval bespreken.

## Een klantnaam vrijgeven

In `content/site-agent/klanten.md`, in de frontmatter:

```yaml
klanten:
  - naam: Pavo
    publiekTeNoemen: true
```

Dat is de enige knop. Staat de vlag op `false` of ontbreekt de klant, dan wordt
het hele blok uit de context geknipt **en** komt de naam op de blokkeerlijst van
de outputcontrole. De agent kan de naam dan niet noemen, ook niet als de
bezoeker hem zelf noemt. Dat is een filter in code, geen instructie in de prompt.

Zet er nooit resultaatcijfers of doorlooptijden bij, ook niet bij een klant die
op `true` staat.

## De evaluatie draaien

**Nog niet gebouwd.** Het evaluatieharnas met de tien vaste testgesprekken is
fase 7 en staat nog open. Wat er nu wel is:

```bash
npm test        # guardrail-unittests en de padmapping, 55 gevallen
npx tsc --noEmit
npx eslint .
```

De guardrail-tests dekken de vijf blokkeerregels plus tien gevallen die er juist
doorheen moeten, waaronder het vaste prijsantwoord en de goedgekeurde
formulering over datalocatie.

## Wat er nog open staat

- Evaluatieharnas met tien testgesprekken (fase 7).
- Playbooks verhuizen naar `content/site-agent/playbooks/` (fase 6); ze staan nu
  als lookup-map in `lib/site-agent/playbooks.ts`.
- Botdetectie op minimale tijd tussen berichten (fase 7).
- Lighthouse-meting op de homepage en een script dat het endpoint hamert.
- Overzicht `/agency/site-agent` in de dashboard-repo, zie `opdracht-dashboard.md`.
- De Cal-webhook kent het `sessionId` niet, dus `afspraakGeboekt` leunt op het
  signaal vanuit de widget. Een harde koppeling vraagt een prefill-parameter in
  Cal.com.

## Twee grondingsconflicten om te beslissen

De kennisbank volgt de site en niet `prompt.md`, want de kennisbank is wat de
agent mag zeggen. Daardoor wijkt hij op twee punten af:

1. `prompt.md` zegt dat opslag en verwerking in **Frankfurt** staan; `/privacy`
   zegt Supabase in **Ierland**. De kennisbank houdt Ierland aan.
2. `prompt.md` laat de agent een **transfer impact assessment** noemen bij de
   doorgifte naar Anthropic. Dat staat nergens op de site; `/privacy` noemt
   Standard Contractual Clauses. De kennisbank houdt SCC's aan.

Eén van beide bronnen klopt niet. Trek dat recht in de prompt of in de
privacyverklaring.
