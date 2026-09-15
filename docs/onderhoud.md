# Onderhoudsmodus

De site heeft een onderhoudspagina op `/onderhoud`, in dezelfde stijl als de rest: de polder in dageraadlicht, een korte boodschap en de contactgegevens. Zonder onderhoudsmodus is de pagina gewoon te bekijken op die route, zodat u hem kunt nakijken voordat de site erop gaat.

## Aanzetten

1. Zet in Vercel (Settings → Environment Variables, omgeving Production) `ONDERHOUD_MODUS` op `true`.
2. Zet eventueel `ONDERHOUD_SLEUTEL` op een willekeurige tekst van minstens 8 tekens.
3. Deploy opnieuw (Deployments → Redeploy op de laatste deploy). De middleware leest de variabelen bij het starten, dus zonder redeploy gebeurt er niets.

Vanaf dat moment krijgt elke paginaweergave de onderhoudspagina met status 503 en `Retry-After: 3600`. Zoekmachines slaan de pagina daardoor niet op en komen later terug. De API (`/api/...`, dus ook de cron en de Cal.com-webhook), de assets, `robots.txt` en `sitemap.xml` blijven gewoon bereikbaar.

## Zelf de site bekijken tijdens onderhoud

Open één keer `https://factumai.nl/?onderhoud=<sleutel>`. U wordt doorgestuurd naar dezelfde pagina zonder de query en krijgt een cookie die u een dag vrijstelt. Werkt alleen als `ONDERHOUD_SLEUTEL` is gezet.

## Uitzetten

Zet `ONDERHOUD_MODUS` leeg of op `false` en deploy opnieuw.

## Lokaal proberen

```
ONDERHOUD_MODUS=true ONDERHOUD_SLEUTEL=zwaluw-1234 npm run build && ONDERHOUD_MODUS=true ONDERHOUD_SLEUTEL=zwaluw-1234 npm start
```

De beslissing zit in `lib/onderhoud.ts` (met tests in `lib/onderhoud.test.ts`), de uitvoering in `middleware.ts`, de pagina in `app/onderhoud/page.tsx`.
