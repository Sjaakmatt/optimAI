# Video's op de site

De video's op `/videos` en in de carrousel op de homepage komen uit het
**FactumAI-dashboard**, niet meer uit deze repo. Sjaak uploadt, rangschikt en
categoriseert ze daar; de site pikt het binnen ongeveer vijf minuten op, zonder
deploy.

## Hoe het loopt

```
dashboard (/agency/marketing/videos)
   │  upload → publieke Supabase-bucket `site-videos`
   │  rij     → SiteVideo + SiteVideoCategory
   ▼
GET {FACTUMAI_DASHBOARD_URL}/api/v1/public/site-videos      (publiek, cachebaar)
   ▼
lib/data/videos.ts :: getVideos()                            (ISR, 300 s)
   ▼
app/page.tsx (uitgelicht)  ·  app/videos/page.tsx (alles + categoriefilter)
   ▼
components/home/VideoCarousel.tsx                            (puur weergave)
```

## Instellen

Eén variabele, geen sleutel:

```
FACTUMAI_DASHBOARD_URL=https://dashboard.factumai.nl
```

De route is publiek en levert uitsluitend **gepubliceerde** video's, dus er
gaat geen token over de lijn.

## Het vangnet

`lib/data/videos.ts` houdt de oude, hardgecodeerde lijst als `FALLBACK_VIDEOS`,
met de bestanden in `public/videos/`. Die wordt gebruikt zodra:

- `FACTUMAI_DASHBOARD_URL` niet gezet is (bijvoorbeeld lokaal),
- het dashboard onbereikbaar is of een foutstatus geeft,
- de bibliotheek in het dashboard leeg is.

Dat laatste is met opzet: anders staat `/videos` ineens leeg zodra iemand de
laatste video op Concept zet. Een verouderde pagina is beter dan een lege.

Let op dat het **alles of niets** is: de fallback vult de bibliotheek niet aan.
Publiceer je één video in het dashboard, dan verdwijnen de vier uit de
fallback-lijst van de site. Dat is bewust — anders hou je vier spookvideo's die
je nergens kunt beheren — maar het verklaart wel waarom de eerste upload de rest
"weghaalde".
`getVideos()` gooit daarom nooit — een haperend dashboard hoort de publieke
site niet om te trekken. De gebruikte bron staat in het antwoord (`bron`).

## Waar je op moet letten

- **De vorm van het antwoord is het koppelvlak tussen twee repo's.** Wijzig
  `DashboardAntwoord` in `lib/data/videos.ts` nooit los van
  `src/lib/site-videos/queries.ts::listPublishedVideos()` in het dashboard.
- **Houd de twee `revalidate`-waarden gelijk** (hier 300 s, en dezelfde op de
  dashboardroute). Lopen ze uiteen, dan is niet meer te voorspellen wanneer een
  wijziging zichtbaar wordt.
- **Posters zijn optioneel.** Een video zonder poster krijgt een egaal vlak
  (`.video-poster-leeg`), geen gebroken afbeelding.
- **`next/image` accepteert alleen `**.supabase.co/storage/v1/object/public/**`**
  (zie `next.config.ts`). Verhuizen de bestanden naar een ander domein, dan moet
  dat patroon mee.
- **Alleen "uitgelicht" komt op de homepage.** Staat er niets aangevinkt, dan
  toont de carrousel de eerste zes als noodgreep.

## De oude vier: `public/videos/` mag NIET weg

De vier oorspronkelijke video's staan sinds 24-09-2026 als gewone rijen in de
bibliotheek, maar hun bestanden zijn **niet** naar de bucket geüpload. De rijen
wijzen naar de bestanden die hier in de repo staan:

| kolom        | waarde                                  |
|--------------|-----------------------------------------|
| `videoUrl`   | `/videos/kennismaken.mp4` (relatief)    |
| `posterUrl`  | `/videos/kennismaken-cover.jpg`         |
| `videoPath`  | `repo:public/videos/kennismaken.mp4`    |

Het `repo:`-voorvoegsel op `videoPath` is het signaal: dit is geen object in de
bucket. Verwijder je zo'n rij in het dashboard, dan probeert de opruiming een
bucket-pad te wissen dat niet bestaat — dat is een no-op met een waarschuwing in
het log, niet een fout.

**Gevolg: gooi `public/videos/*.mp4` en `*-cover.jpg` niet weg.** Doe je dat
toch, dan staan er vier kapotte kaarten op /videos. Ze zitten ook niet meer in
de fallback-lijst als laatste vangnet — die springt alleen in bij een lege
bibliotheek, en die is niet leeg meer.

Wil je ze alsnog netjes in de bucket hebben, dan is er één schone weg: verwijder
de vier rijen in het dashboard en upload de bestanden opnieuw via de uploader.
Daarna mag `public/videos/` wél weg. Het script
`npm run import:site-videos -- --dir ../optimAI/public/videos` (in de
dashboard-repo) doet hetzelfde geautomatiseerd, maar slaat rijen over waarvan de
slug al bestaat — verwijder ze dus eerst.
