# Site-agent

De conversationele agent rechtsonder op factumai.nl. Kwalificeert bezoekers en
stuurt aan op een kennismaking van 20 minuten.

Hij is tegelijk een demonstratie van de propositie: hij classificeert, haalt
context op, beoordeelt en stelt een actie voor die langs een mens gaat. Noemt
iemand een prijs of een datum, dan gokt hij niet maar escaleert hij zichtbaar
naar Sjaak. Dat gedrag is de verkoop.

## Aan- en uitzetten

De agent staat **aan**. Nodig om te werken: `ANTHROPIC_API_KEY`, `SUPABASE_URL`
en `SUPABASE_SERVICE_ROLE_KEY`. Zonder die laatste twee kan hij geen
berichtgeschiedenis bijhouden en weigert hij netjes.

De noodrem:

```
SITE_AGENT_ENABLED=false             # endpoint weigert direct, geen build nodig
NEXT_PUBLIC_SITE_AGENT_ENABLED=false # widget verdwijnt, vraagt wel een deploy
```

Die eerste is de knop die je omzet als de kosten of de kwaliteit uit de hand
lopen: hij werkt meteen en stopt alle modelcalls. De tweede haalt de widget uit
beeld, maar `NEXT_PUBLIC_`-waarden worden bij de build in de bundel gebakken,
dus daar moet een nieuwe deploy overheen.

Tweede rem, altijd actief: het dagelijkse kostenplafond (`SITE_AGENT_DAGPLAFOND_USD`,
standaard vijf dollar). Boven het plafond weigert het endpoint en verwijst het
naar info@factumai.nl.

`CRON_SECRET` is apart nodig voor de cron die stille gesprekken afrondt en
verlopen data opruimt. Zonder die waarde weigert die route alles; het gesprek
zelf werkt gewoon, maar afronden gebeurt dan alleen als de bezoeker de widget
sluit.

## Hoe het in elkaar zit

| Onderdeel | Waar |
|---|---|
| Widget | `components/site-agent/` |
| Gesprekseindpunt | `app/api/v1/site-agent/chat/route.ts` |
| Afronden en scoring | `app/api/v1/site-agent/afronden/route.ts`, `lib/site-agent/scoring.ts` |
| Cron (stille gesprekken, retentie) | `app/api/v1/site-agent/cron/route.ts`, elke 15 minuten |
| Prompt | `lib/site-agent/prompt.ts`, bron in `docs/site-agent/prompt.md` |
| Playbooks | `content/site-agent/playbooks/*.md`, sleutel server-side uit het pad |
| Evaluatieharnas | `evals/site-agent/` |
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

```bash
npm run eval                    # alle tien de gesprekken
npm run eval -- --geval 3       # alleen geval 3
npm run eval -- --verbose       # ook de transcripten
```

Dit praat met het echte model, dus `ANTHROPIC_API_KEY` is verplicht. De database
wordt niet aangeraakt: tools worden herkend en vastgelegd maar niet uitgevoerd,
ze krijgen een vast antwoord terug. Zo test je de agentlogica zonder Supabase.

De tien gevallen staan in `evals/site-agent/fixtures.ts`: prijsdrammer,
opleverdatum, de EU-vraag, referenties, eenmanszaak, concurrent, de volledige
gekwalificeerde flow, iemand die geen afspraak wil, promptinjectie, en een
sollicitant. Draai ze bij elke wijziging aan de prompt, de kennisbank of de
outputcontrole. Een verslechtering blokkeert de wijziging.

De assertielaag zit apart in `evals/site-agent/asserties.ts` en wordt offline
getest, zonder sleutel:

```bash
npm test        # 71 gevallen: guardrails, padmapping, maskering, asserties
npx tsc --noEmit
npx eslint .
```

Dat is met opzet gesplitst: een assertie die altijd slaagt is erger dan geen
assertie, want dan meldt het harnas groen terwijl de agent iets fout doet.

## De begrenzing testen

```bash
npx tsx scripts/hamer-site-agent.ts                     # lokaal
npx tsx scripts/hamer-site-agent.ts https://factumai.nl # productie
npx tsx scripts/hamer-site-agent.ts --parallel          # ook de botdetectie
```

Wat je wilt zien: eerst een paar keer 200, daarna 429. Overal 200 betekent dat de
begrenzing niet aanstaat, overal 503 dat de agent uitstaat. Elk verzoek dat
doorkomt kost een echte modelcall, dus draai dit niet eindeloos.

## Wat er nog open staat

- Het evaluatieharnas is nog nooit tegen de echte API gedraaid; dat moet gebeuren
  vóórdat de agent aangaat.
- Lighthouse-meting op de homepage. Wat wel gemeten is: de widget kost 1,30 kB
  gzip op de initiële bundel en het paneel zit in een eigen chunk van 3,0 kB die
  pas bij openen laadt.
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
