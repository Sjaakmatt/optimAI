# Browsertests op de site-agent

## Waarom deze er zijn

Elke fout die de widget tot nu toe in productie had, zat op dezelfde plek: niet
in een losse functie, maar in de naad tussen twee stukken die apart klopten, of
in browserstate die een paginaweergave overleefde.

- Een wolkje dat wegbleef door een `sessionStorage`-vlag uit een eerder bezoek.
- Een klik op "Antwoord geven" die in een gesprek eindigde met een ándere vraag
  dan waar de bezoeker net op klikte.
- Twee zwevende knoppen die om dezelfde aandacht vroegen.

Geen van drieën was met een unit test te vangen: de losse functies deden precies
wat ze moesten doen. Ze zijn alle drie gevonden doordat iemand de site opende en
klikte. Deze suite doet dat werk nu automatisch.

Elke test hier dekt daarom iets dat écht is misgegaan, niet iets dat theoretisch
mis kán gaan.

## Draaien

```bash
npm run test:e2e          # alles, beide schermformaten
npm run test:e2e:ui       # met de Playwright-UI, handig bij het schrijven
npx playwright test -g "wolkje"   # alleen wat matcht
```

De config start zelf een productiebuild op poort 3100. Dat duurt de eerste keer
een minuut of twee. Bewust geen `next dev`: die gedraagt zich anders (dubbele
effects, andere bundling) en dan test je iets wat bezoekers nooit zien.

### Browser al geïnstalleerd?

Staat er een Chromium klaar met een ander buildnummer dan deze Playwright-versie
verwacht, geef dan het pad mee in plaats van honderden megabytes te downloaden:

```bash
PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run test:e2e
```

In CI blijft die variabele leeg en gebruikt Playwright zijn eigen browser.

## Wat er níét gebeurt

**Geen modelcalls.** Het chat-endpoint wordt in de test onderschept en
beantwoord met een vaste SSE-stream (`hulp.ts`). Er gaat dus niets naar
Anthropic of Supabase, de suite kost niets, en hij faalt niet op dingen die
buiten de widget liggen.

Die nagebootste stream volgt wél het echte formaat uit
`app/api/v1/site-agent/chat/route.ts`. Verandert dat formaat, dan valt deze
suite om — en dat is de bedoeling, want dan klopt de test niet meer met de
werkelijkheid.

**Geen cookiebanner.** De tests zetten vooraf een cookiekeuze. Die banner staat
op `z-[200]` en bedekt onderaan precies de hoek waar de widget zit; zonder keuze
test je de banner in plaats van de chat.

> Let op: dat betekent ook dat een bezoeker die voor het eerst komt die banner
> over de chatknop heeft staan tot hij kiest. Dat is een openstaand
> conversiepunt, geen testprobleem.

## Een test toevoegen

Begin bij een fout die je in het echt hebt gezien, niet bij een functie die je
wilt afdekken. Schrijf op wat de bezoeker deed en wat hij verwachtte, en zet de
reden in een comment — over een half jaar is de aanleiding weg en blijft alleen
de assertie over.

Controleer daarna of je test de bug ook echt vangt: draai hem één keer met de
fix teruggedraaid. Een test die groen blijft terwijl de bug er weer in zit, geeft
alleen maar vertrouwen dat er niet is.
