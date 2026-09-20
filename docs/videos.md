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

## De oude vier overzetten

Eenmalig, vanuit de dashboard-repo met deze repo ernaast:

```
npm run import:site-videos -- --dir ../optimAI/public/videos
```

Idempotent op slug. Daarna kan `public/videos/` weg, al kost het weinig om de
fallback te laten staan.
