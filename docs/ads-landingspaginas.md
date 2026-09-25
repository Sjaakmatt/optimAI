# Landingspagina’s uit FactumAI Ads

De routes `/lp/<slug>/`, `/lp/<slug>/submit` en `/lp/<slug>/bedankt` worden door een smalle serverproxy doorgestuurd naar de Cloudflare Worker van FactumAI Ads. De studio en alle `/api/*`-routes blijven uitsluitend in de afzonderlijke ads-app. De website ontvangt geen beheerderssessies of D1-toegang.

## Instellen vóór ingebruikname

Stel op **Vercel, Production** deze servervariabelen in (geen `NEXT_PUBLIC_`):

- `LANDING_PROXY_SECRET`: dezelfde willekeurige waarde van minimaal 32 tekens als het gelijknamige Worker-secret. Gebruik een apart geheim, geen beheerderswachtwoord of lead-ingest-token.
- `FACTUMAI_ADS_ORIGIN`: `https://factumai-ads.terveldholding.workers.dev` (dit is ook de standaardwaarde).
- `PUBLIC_SITE_ORIGIN`: `https://factumai.nl` (dit is ook de standaardwaarde).

Stel in de Worker `LANDING_PROXY_SECRET` en `PUBLIC_SITE_ORIGIN` gelijk in. Rol de Worker met het proxyprotocol uit voordat je de websiteproxy gebruikt. Voer daarna een Vercel-deployment uit zodat de nieuwe variabelen actief zijn. `VERCEL=1` wordt door Vercel gezet en is nodig om de platform-IP-header te vertrouwen. Zonder geldige instellingen antwoordt alleen de nieuwe `/lp/`-route met 503; bestaande websitefuncties blijven werken.

## Beveiliging en gedrag

De proxy staat alleen het overeengekomen publieke padpatroon toe. GET/HEAD zijn toegestaan op de pagina en bedankpagina; POST alleen op `/submit`. Alleen `utm_source`, `utm_medium`, `utm_campaign` en `utm_content` worden op de pagina doorgestuurd, begrensd op 200 tekens. Alle andere queryparameters vervallen.

Voor POST moeten de browser-`Origin` en het bezochte origin exact overeenkomen met `PUBLIC_SITE_ORIGIN`. De oorspronkelijke browser-Origin wordt daarna ongewijzigd doorgestuurd. Het servergeheim en `X-FactumAI-Visitor-IP` worden nieuw opgebouwd; waarden die een bezoeker zelf onder deze headers meestuurt worden genegeerd. De IP-waarde komt alleen uit Vercels `x-vercel-forwarded-for`, wordt gevalideerd en voor IPv6 gecanonicaliseerd. De Worker vertrouwt die header pas na controle van het aparte proxysecret.

Vercel beschrijft de anti-spoofinggaranties van zijn [requestheaders](https://vercel.com/docs/headers/request-headers). Als een extra externe proxy vóór Vercel wordt geplaatst, kan het zichtbare IP dat van die proxy zijn; stel dan eerst betrouwbare doorgifte in voordat je op bezoekerspecifieke limieten vertrouwt.

Er worden geen cookies, autorisatieheaders of willekeurige browserheaders doorgestuurd. Antwoordheaders worden eveneens beperkt; cookies en secrets gaan niet terug naar de browser. GET en POST gebruiken `no-store` zodat formuliertokens niet in een gedeelde cache belanden. POST accepteert maximaal 64 KiB URL-gecodeerde formulierdata. Het Worker-verzoek inclusief antwoord heeft een timeout van 15 seconden. Alleen een 303 naar exact de bedankpagina van dezelfde slug wordt doorgegeven; redirects naar andere bestemmingen worden geweigerd.

De bestaande onderhoudsmodus blijft van toepassing op `/lp/`. Deze integratie wijzigt geen bestaande websitepagina’s, sitemap, consent, agent of CRM-koppelingen. De Worker levert zelfstandig HTML; de gewone Next-layout en websitewidgets worden niet ingevoegd.

## Controleren

```bash
node --import tsx --test lib/ads/landing-proxy.test.ts
npx tsc --noEmit
npm run build
```

De tests gebruiken een nagebootste upstream zonder externe verzoeken of echte leads. Op Vercel Preview kan GET worden gecontroleerd wanneer de serverinstellingen aanwezig zijn. De POST-origincontrole laat alleen het ingestelde productieorigin toe; voeg daarvoor geen willekeurige previewhosts toe aan de productieconfiguratie.
