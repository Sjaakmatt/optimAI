# SEO Stappenplan — wat jij nu moet doen

Doel: FactumAI #1 in Nederland voor "AI agents implementeren", "AI automatisering",
"AI agents voor bedrijven", "AI implementatie", en de bijbehorende long-tail-cluster.

De code is af. Wat hieronder staat zijn de niet-code-stappen die jij zelf moet
nemen — omdat ze een account, beslissing, of authenticatie van jouw kant vragen.

Volg dit document van boven naar beneden. Vink de checkboxes af. Geschatte tijd
voor de eerste 90 dagen: **8–12 uur eigen werk per maand**.

---

## Inhoud

1. [Direct na merge — Week 0](#1-direct-na-merge--week-0)
2. [Indexering & vindbaarheid — Week 1](#2-indexering--vindbaarheid--week-1)
3. [E-E-A-T & vertrouwen — Week 1–2](#3-e-e-a-t--vertrouwen--week-12)
4. [Off-page autoriteit — Week 2–8](#4-off-page-autoriteit--week-28)
5. [Content automation operationeel — doorlopend](#5-content-automation-operationeel--doorlopend)
6. [Performance & afbeeldingen — Week 1](#6-performance--afbeeldingen--week-1)
7. [Meten & rapporteren — wekelijks](#7-meten--rapporteren--wekelijks)
8. [PR campagnes — kwartaal](#8-pr-campagnes--kwartaal)
9. [Slaagcriteria 6 maanden](#9-slaagcriteria-6-maanden)

---

## 1. Direct na merge — Week 0

### 1.1 GitHub Secret toevoegen (CRUCIAAL — anders draait de cron niet)

- [ ] Ga naar `https://github.com/Sjaakmatt/optimAI/settings/secrets/actions`
- [ ] Klik **New repository secret**
- [ ] Name: `ANTHROPIC_API_KEY`
- [ ] Value: jouw Anthropic API key (vraag aan via console.anthropic.com → API keys → Create key, geef hem de naam "factumai-content-bot")
- [ ] Save

> **Waarom:** zonder deze key faalt elke geplande cron in `.github/workflows/generate-post.yml` met "ERROR: ANTHROPIC_API_KEY ontbreekt".

### 1.2 PR mergen

- [ ] Branch `claude/seo-audit-ai-agents-5zBAu` reviewen op GitHub
- [ ] Vercel preview-deployment openen, klik door alle nieuwe pagina's:
  - `/diensten/ai-automatisering`
  - `/diensten/ai-implementatie`
  - `/diensten/ai-agents-voor-bedrijven`
  - `/diensten/vergelijken/ai-agent-vs-chatbot` (en de andere twee)
  - `/branches/accountancy` (+ advocatuur, makelaardij, agrarisch, e-commerce, horeca)
  - `/branches` (lijstpagina)
  - `/over/sjaak-ter-veld`
  - `/tools/ai-roi-calculator` — speel met de schuivers, controleer de uitkomst
  - `/tools/agent-readiness-check` — doorloop de quiz van begin tot eind
  - `/resources/ai-implementatie-stappenplan`
- [ ] LinkedIn-URL op `/over/sjaak-ter-veld` verifiëren — staat er nu `linkedin.com/in/sjaakterveld/`. Klopt dat? Pas anders aan in `app/over/sjaak-ter-veld/page.tsx` (regel met `sameAs:`).
- [ ] Squash & merge naar `main`
- [ ] Vercel rolt automatisch live op `factumai.nl`

### 1.3 Cron-base branch aanpassen

De content-cron pusht standaard naar `claude/seo-audit-ai-agents-5zBAu`. Na merge
naar main moet dat aangepast:

- [ ] Open `.github/workflows/generate-post.yml`
- [ ] Wijzig `base: claude/seo-audit-ai-agents-5zBAu` → `base: main`
- [ ] Commit deze wijziging op `main` (één-regel-PR is OK)

### 1.4 Eerste auto-post lokaal testen (optioneel maar slim)

Voordat de cron draait, test lokaal of de pipeline werkt zoals verwacht:

```bash
export ANTHROPIC_API_KEY=sk-ant-…   # zelfde key als in GitHub Secret
npm install
npm run new-post -- "Hoeveel kost een AI-agent in 2026? Realistische tarieven voor MKB Nederland"
npm run build   # check dat de toegevoegde post valide is
git diff lib/data/posts.ts   # bekijk de gegenereerde entry
```

Als dit lukt, zet de wijzigingen terug (`git checkout lib/data/posts.ts scripts/content-backlog.json`) zodat de cron deze post zelf kan aanmaken op het juiste moment.

---

## 2. Indexering & vindbaarheid — Week 1

### 2.1 Google Search Console (verplicht)

- [ ] Ga naar `https://search.google.com/search-console`
- [ ] Klik **Add property** → **Domain** → vul `factumai.nl` in
- [ ] Kopieer het verifiërende DNS TXT-record
- [ ] Voeg het toe bij je domain-registrar (Vercel-DNS, TransIP, Versio, etc.)
- [ ] Wacht 5–30 minuten, klik **Verify**
- [ ] In Search Console → **Sitemaps** → submit `https://factumai.nl/sitemap.xml`
- [ ] Bij **URL-inspectie**: dien handmatig in voor de 8 belangrijkste pagina's:
  - `/`
  - `/diensten/ai-agent-laten-bouwen`
  - `/diensten/ai-automatisering`
  - `/diensten/ai-implementatie`
  - `/diensten/ai-agents-voor-bedrijven`
  - `/over/sjaak-ter-veld`
  - `/tools/ai-roi-calculator`
  - `/tools/agent-readiness-check`

  Voor elke: **Test live URL** → **Request indexing**.

### 2.2 Bing Webmaster Tools

ChatGPT search indexeert via Bing — dus dit is niet optioneel.

- [ ] Ga naar `https://www.bing.com/webmasters`
- [ ] Sign in met Microsoft-account
- [ ] **Add site** → `https://factumai.nl`
- [ ] Verifieer via DNS of importeer vanuit Google Search Console (snelste optie)
- [ ] Submit sitemap: `https://factumai.nl/sitemap.xml`

### 2.3 Google Business Profile

Voor lokaal-signaal en knowledge-panel.

- [ ] Ga naar `https://business.google.com/create`
- [ ] Bedrijfsnaam: **FactumAI**
- [ ] Categorie primair: "Software company" of "IT consultant" (test welke beter ranking geeft — start met IT consultant)
- [ ] Categorieën secundair: "AI software developer", "Business consultant"
- [ ] Adres: Hoogkarspel (gebruik exact hetzelfde adres als in `components/seo/OrganizationSchema.tsx` — de NAP moet identiek zijn over alle bronnen)
- [ ] Telefoon: +31 6 10 55 56 58
- [ ] Website: `https://factumai.nl`
- [ ] Service area: heel Nederland aanvinken
- [ ] Verifieer via post (komt in 5–10 dagen) of telefoon
- [ ] Plaats logo en 5–10 foto's (kantoor, portret, evt. werk-screenshots)
- [ ] Beschrijving (max 750 tekens) — gebruik tekst uit `OrganizationSchema.tsx` als basis
- [ ] Zet "Diensten" aan met de drie hoofd-diensten

### 2.4 NAP-consistentie controleren

Naam-Adres-Telefoon **moeten** overal identiek zijn. Check:

- [ ] Footer van factumai.nl
- [ ] OrganizationSchema (`components/seo/OrganizationSchema.tsx`)
- [ ] Google Business Profile
- [ ] LinkedIn company page
- [ ] KvK-vermelding

Eén verschil (bv. "06-1055 5658" vs "+31610555658") verzwakt het lokale signaal.

### 2.5 Domain-registrar checks

- [ ] Vercel: `factumai.nl` als primary, `www.factumai.nl` redirect naar apex (of andersom — kies één canonical en blijf daarbij)
- [ ] HTTPS-only (Vercel doet dit automatisch, controleer via `https://www.ssllabs.com/ssltest/`)
- [ ] HSTS-header werkt — test op `https://hstspreload.org/?domain=factumai.nl`. Als groen: optioneel je domein submitten voor de preload-list.

---

## 3. E-E-A-T & vertrouwen — Week 1–2

### 3.1 Persoonlijke profielen

- [ ] **LinkedIn-profiel Sjaak**: voeg toe aan headline/about: "Oprichter FactumAI — AI-agents voor MKB". Zorg dat headline overeenkomt met `/over/sjaak-ter-veld`.
- [ ] **LinkedIn company page** voor FactumAI aanmaken (als nog niet bestaat). Beschrijving uit `OrganizationSchema.tsx`. Voeg websitelink toe. Plaats 1 update per week (link naar nieuwe kennis-post).
- [ ] (Optioneel) **X/Twitter @factumai** registreren — even claimen, posten kan later.
- [ ] Op `app/over/sjaak-ter-veld/page.tsx` regel `sameAs:` — vul aan met je échte profiellinks.

### 3.2 Reviews verzamelen

Google AggregateRating-schema werkt alléén met échte, verifieerbare reviews. Niet
zelf verzinnen — Google straft dat af.

- [ ] Vraag aan de drie bestaande klanten (Nordveld, Hendriks, Bakker — namen
  wellicht aangepast) een Google-review op je Business Profile. 5 reviews is
  een goede startbasis.
- [ ] Vraag toestemming voor een sterren-rating + quote die je op de site mag plaatsen.
- [ ] Stuur me door: "ik heb 5 echte reviews van X.X gemiddeld" — dan voeg ik
  `Review`/`AggregateRating` schema toe aan `OrganizationSchema.tsx`.

### 3.3 Klantlogo's of branche-iconen

- [ ] Vraag aan klanten of hun logo op de site mag (3 voldoende voor de start)
- [ ] Geen toestemming? Dan een visuele "MKB-klant in [branche]" placeholder — beter dan niets, maar logo's converteren beter
- [ ] Logo-strip plaatsen op `/`, `/diensten/ai-agent-laten-bouwen`, `/cases` — vraag mij om dit te coderen zodra je de logo's hebt

### 3.4 KvK & BTW in footer

- [ ] Verifieer dat in `components/site/SiteFooter.tsx` (of waar de footer renderet) staan: KvK-nummer, BTW-nummer, AVG-statement-link, link naar `/privacy` en `/subverwerkers`
- [ ] Zo niet — laat het me weten, ik voeg het toe

---

## 4. Off-page autoriteit — Week 2–8

Zonder backlinks geen #1. Onderstaand een prioritair-volgorde plan.

### 4.1 Directories (eerste 2 weken — quick wins)

**Gratis, direct doen:**
- [ ] [KvK Bedrijfsprofiel](https://www.kvk.nl/) — koppeling website
- [ ] [De Telefoongids](https://www.detelefoongids.nl/) — bedrijfsvermelding
- [ ] [Bing Places](https://www.bingplaces.com/)
- [ ] [Apple Maps Connect](https://mapsconnect.apple.com/)
- [ ] [Trustpilot](https://nl.trustpilot.com/) — claim je bedrijfspagina
- [ ] [Yelp Nederland](https://biz.yelp.nl/)
- [ ] [Bing Maps for Business](https://www.bingplaces.com/)

**Sector-directories (kies de 3 meest relevant):**
- [ ] [MKB-Nederland — als lid](https://www.mkb.nl/) — vermelding op ledenpagina
- [ ] [Emerce100](https://www.emerce.nl/awards/emerce100/aanmelden) — submission voor de jaarlijkse lijst
- [ ] [Computable Top 100](https://www.computable.nl/) — submission
- [ ] [Frankwatching agencies](https://www.frankwatching.com/agencies/) — submit FactumAI
- [ ] [Springwise](https://www.springwise.com/innovation-snapshot/) — submission als innovatieve case
- [ ] [GoeieZaak](https://goeiezaak.nl/) — als Noord-Holland MKB
- [ ] [Bird](https://bird.nl/) — branchespecifiek per klant-vertical

### 4.2 Gastartikelen (vanaf week 3)

Pitch onderwerpen uit `scripts/content-backlog.json` aan branchemedia. Eén
gastartikel per maand minimum.

Doel-publicaties (Nederland, prioriteit hoog):

- [ ] **Frankwatching** — pitch: "AI-implementeren in vijf stappen" — `https://www.frankwatching.com/voor-auteurs/`
- [ ] **Marketingfacts** — pitch: "AI-automatisering vs RPA in MKB" — `https://www.marketingfacts.nl/auteur-worden`
- [ ] **Emerce** — pitch: "Hoeveel kost een AI-agent in 2026?" — via redactie
- [ ] **Computable** — pitch: "Multi-agent systemen voor middelgrote bedrijven" — via redactie
- [ ] **MT/Sprout** — pitch: "Verborgen kosten van handmatig MKB-werk" — via redactie
- [ ] **De Ondernemer** — pitch: "AI-readiness check voor MKB" — vrij lage drempel, pak deze als eerste
- [ ] **Cobouw** (per case in bouw) — bouw-vakblad
- [ ] **Logistiek.nl** (per case in transport)
- [ ] **AccountancyAge.nl** (per case accountancy)
- [ ] **Installatie.nl** (per case installatietechniek)

**Pitch-tip**: stuur niet "wil ik een gastartikel schrijven". Stuur: "ik heb een
specifiek artikel in deze stijl klaarliggen, mag ik dat aanbieden?" — concreter
= hogere conversie.

### 4.3 Partner-vermeldingen (vanaf week 4)

Sterk-context backlinks van software-partners. Vraag aan account manager:

- [ ] **Exact** — partner-directory
- [ ] **AFAS** — partner-pagina
- [ ] **Twinfield** — integratiepartners
- [ ] **Pipedrive** — Marketplace + partners
- [ ] **Teamleader** — partner-overzicht
- [ ] **HubSpot Solutions Directory** (Solutions Partner Program) — gratis tier
- [ ] **Microsoft Partner** (Cloud Partner Program) — sluit één relevante competentie aan, gratis listing
- [ ] **Google Partners** — als je Google Workspace integreert

### 4.4 Podcasts (vanaf week 6, één per maand)

- [ ] **De Ondernemer** podcast
- [ ] **Cloud Podcast NL**
- [ ] **Dutch IT Channel**
- [ ] **MT podcast**
- [ ] **De Innovator** (RTL Z)
- [ ] **Werk in uitvoering** (BNR)

Pitch-mail: "Sjaak ter Veld, oprichter FactumAI. Wij bouwen AI-agents voor MKB.
In één gesprek licht ik toe waar het MKB nu kan winnen op AI én waar het
structureel mis gaat. 25 minuten."

### 4.5 HARO / journalisten-queries

- [ ] Aanmelden bij **Help A B2B Writer**, **HARO**, **SourceBottle EU**
- [ ] Twee keer per week beantwoord je relevante vragen over AI-implementatie,
  MKB-tech, automatisering. Levert per kwartaal 1–3 gepubliceerde quotes met
  backlink op.

---

## 5. Content automation operationeel — doorlopend

### 5.1 Cron monitoren

De workflow draait elke dinsdag en donderdag om 09:00 NL-tijd. Per run wordt:
1. een onderwerp uit `scripts/content-backlog.json` gepakt (eerste met `status: pending`),
2. een artikel gegenereerd via Claude Sonnet 4.6,
3. de PR geopend.

- [ ] Schakel **email-notificaties voor pull requests** in op je GitHub-account
- [ ] Reserveer 2× 10 minuten per week (di + do, 12:00) om de PR te reviewen

### 5.2 Reviewchecklist per auto-PR

In de PR-body staat al een checklist. Loop hem af:

- [ ] **Stijl** klopt met bestaande artikelen (toon, ritme, lengte)
- [ ] **Geen verzonnen klantnamen** of statistieken — controleer op cijfers en namen
- [ ] **Productnamen** alleen uit de whitelist in `scripts/style-guide.md`
- [ ] **Lede** zet de spanning goed neer (geen marketing-clichés)
- [ ] **FAQ-antwoorden** geven eerst antwoord, dan onderbouwing
- [ ] Open de **Vercel preview-deployment** en lees de post in context
- [ ] Klein aanpassen: bewerk inline op GitHub (klik "Files changed" → 🖉)
- [ ] Goed: **Squash & merge**
- [ ] Slecht: voeg label `needs-rewrite` toe en sluit zonder mergen — de cron pakt
  hetzelfde onderwerp dan opnieuw bij de volgende run

### 5.3 Backlog uitbreiden

`scripts/content-backlog.json` heeft nu **31 onderwerpen**, genoeg voor 4 maanden
op 2 posts/week. Voeg nieuwe toe als ze binnenvallen:

- [ ] Onderwerp uit een klantgesprek? Voeg een item toe aan `items[]` met `status: pending`.
- [ ] Cluster-spreiding bewaken: niet alleen cluster A, ook B/C/D/E afwisselen.

### 5.4 Ad-hoc post genereren

Iets in het nieuws (AI-Act update, nieuw model, branche-event)? Genereer
direct een post:

```bash
# Vanuit GitHub — Actions tab → "Generate kennis-artikel" → Run workflow → vul topic in
```

Of lokaal:
```bash
ANTHROPIC_API_KEY=sk-ant-… npm run new-post -- "Wat de AI-Act van mei 2026 betekent voor MKB"
```

### 5.5 Stijl bijschaven

Na 5–10 gegenereerde posts merk je patronen. Iets dat steeds terugkomt en niet
lekker leest? Voeg het toe aan `scripts/style-guide.md`. De volgende run pakt
het mee.

- [ ] Maandelijkse mini-review van `scripts/style-guide.md` op basis van wat
  je bij review hebt aangepast

---

## 6. Performance & afbeeldingen — Week 1

### 6.1 Portret-foto comprimeren (urgent)

`/public/portret.jpg` is **10.2 MB** — dat is een LCP-killer.

- [ ] Open de originele foto
- [ ] Comprimeer naar 3 sizes (Squoosh.app of cwebp):
  - 320px breed → < 30 KB als WebP
  - 640px breed → < 80 KB als WebP
  - 1024px breed → < 200 KB als WebP
- [ ] Vervang `public/portret.jpg` door de 1024px-versie (`next/image` regelt
  resize voor de andere breedtes via de in `next.config.ts` gedefinieerde
  `deviceSizes`)
- [ ] Test: open `/over` op mobiel via PageSpeed Insights → LCP moet < 2.0s
  worden (was vermoedelijk 4–7s)

### 6.2 Cover-afbeeldingen voor kennis-posts

Op termijn — kost wat tijd:

- [ ] Per kennis-post een 1200×630 cover image (DALL·E, Midjourney, Recraft)
- [ ] Stijl-prompt: "abstract editorial illustration, oker en papier kleuren, minimal, FactumAI brand"
- [ ] Plaats in `public/kennis/<slug>.webp`
- [ ] Vraag mij om `coverImage`-veld te activeren in `lib/data/posts.ts` zodra
  je 5+ covers klaar hebt

### 6.3 Core Web Vitals tracking

Vercel Speed Insights staat al aan. Bekijk wekelijks:

- [ ] Vercel dashboard → Speed Insights → Real Experience Score
- [ ] Doel: LCP < 2.0s, INP < 150ms, CLS < 0.05 op alle templates
- [ ] Lichtbaak: PageSpeed Insights van `https://factumai.nl` op mobiel — score
  Performance ≥ 90, SEO 100

---

## 7. Meten & rapporteren — wekelijks

### 7.1 Rank-tracker opzetten

Kies één — niet meer:

- [ ] **Ahrefs** (€89/mnd) — beste backlink-data + rank tracking
- [ ] **SEranking** (€55/mnd) — goede prijs/kwaliteit voor MKB
- [ ] **Nightwatch** (€39/mnd) — goedkoopste, lokaal Nederlands tracking

Volg deze **40 keywords**, ingedeeld in 4 buckets:

**Head terms (5):**
- AI agents implementeren
- AI automatisering
- AI agents voor bedrijven
- AI implementeren bedrijven
- AI-agent laten bouwen

**Diensten long-tail (10):**
- AI automatisering MKB
- AI implementatie stappenplan
- AI agents bouwen Nederland
- AI agent voor mijn bedrijf
- AI consultant Nederland
- AI implementatie MKB
- AI automatisering offerte
- AI agent kosten
- AI agent vs chatbot
- AI agent vs RPA

**Branches (16, één per branche × 2 varianten):**
- AI agent groothandel / AI in groothandel
- AI agent installatietechniek / AI installatiebedrijf
- AI agent transport / AI transport sector
- AI agent zakelijke dienstverlening / AI dienstverlener
- AI agent bouw / AI bouwbedrijf
- AI agent zorg / AI zorgsector
- AI agent productie / AI productiebedrijf
- AI agent detailhandel / AI retail

**Nieuwe branches (9):**
- AI agent accountancy / AI accountant
- AI agent advocatuur / AI advocaat
- AI agent makelaar
- AI agent agrarisch
- AI agent webshop / AI ecommerce

**Tools (3):**
- AI ROI calculator
- AI readiness check
- AI implementatie stappenplan

### 7.2 Conversie-events instellen

Vercel Analytics heeft custom events. Voeg toe in:

- [ ] Login Vercel → Project → Analytics → Custom events
- [ ] Vraag mij om in `components/booking/CalProvider.tsx` (of waar relevant) de
  events te emitten: `cta_plan_gesprek`, `cta_demo`, `contact_form_submit`,
  `cal_booking_done`, `roi_calculated`, `readiness_completed`

### 7.3 Wekelijkse review (vrijdag 30 minuten)

- [ ] Rank-tracker dashboard — welke 40 keywords stijgen / dalen
- [ ] GSC → Performance → klikken / impressies / CTR / positie per pagina
- [ ] GSC → Coverage → eventuele fouten oplossen
- [ ] Vercel Analytics → events deze week → conversion rate per landing
- [ ] Vercel Speed Insights → CWV-regressies?
- [ ] Eén actie noteren voor volgende week

### 7.4 Maandelijkse review (eerste maandag, 1 uur)

- [ ] Stappenplan-doc opnieuw doorlopen, vinkjes resetten / nieuwe items
- [ ] Rank-tracker rapport over 30 dagen → 5 grootste stijgers, 3 grootste dalers
- [ ] Backlog-items in `content-backlog.json` aanvullen (mik op 4 weken vooruit)
- [ ] Off-page outreach: aantal pitches verstuurd, aantal geplaatst
- [ ] Beslissing: wat volgende maand prioriteit?

---

## 8. PR-campagnes — kwartaal

Eén per kwartaal een grote PR-stunt voor link-magnet-effect.

### Q2 2026 — "AI-adoptie MKB Nederland 2026"

- [ ] Survey opzetten via Tally / Typeform — 12 vragen, 5 minuten invultijd
- [ ] 100+ MKB-ondernemers werven via LinkedIn, klanten, partners
- [ ] Resultaten samenvatten in een rapport van 16–24 pagina's met grafieken
- [ ] Persbericht versturen naar FD, NRC, Computable, Emerce, Sprout
- [ ] PDF gated via `/resources/mkb-ai-adoptie-2026` (ik bouw de pagina zodra
  het rapport er is)

### Q3 2026 — "Verborgen kosten van handmatig werk — branche-benchmark"

- [ ] Per branche (de 14 die op de site staan) één representatieve case in
  cijfers
- [ ] Visueel: branche-vergelijking-poster
- [ ] Branchemedia per branche pitchen

### Q4 2026 — "Lessen na 50 AI-implementaties"

- [ ] Anoniem cijferrapport over 50 klantimplementaties
- [ ] Tegen Q4 zou je daar moeten kunnen zijn als de pipeline gaat draaien
- [ ] Eén grote keynote-sessie organiseren in Amsterdam — uitnodigen 30 MKB-
  ondernemers, opname en transcript hergebruiken voor content

---

## 9. Slaagcriteria 6 maanden

Na 180 dagen volgende posities op de doelkeywords:

- "AI-agent laten bouwen" — **#1–3**
- "AI agents voor bedrijven" — **#1–5**
- "AI automatisering MKB" — **#1–5**
- "AI implementeren bedrijven" — **#1–5**
- 25+ branche-/long-tail termen op **#1**
- Domain Rating (Ahrefs) van huidig (vermoedelijk <10) naar **25+**
- 50+ verwijzende domeinen
- Aanwezigheid in Google AI Overviews + ChatGPT-citaties voor minimaal 5 hoofdtermen

Als deze niet allemaal gehaald: **niet paniek**, het echte vlieg-effect treedt
meestal op tussen maand 6 en 12. Indexering en linking hebben tijd nodig om
zichzelf te versterken.

---

## Snelle FAQ

**Q: Wat als de cron faalt?**
GitHub stuurt je een mail. Vaakste oorzaken: API-key verlopen of zonder credit, build-fout in de gegenereerde post (Zod-validatie pakt dit voor de PR open). Open de Actions-log voor diagnose.

**Q: Wat als een gegenereerd artikel echt niet goed is?**
Sluit de PR met label `rejected`. Het backlog-item staat nu als `drafted` — handmatig terugzetten naar `pending` in `content-backlog.json` voor herhaalkans, of laten staan en het volgende onderwerp pakt vanzelf de beurt.

**Q: Hoeveel kost dit per maand?**
- Anthropic API: ~€2/mnd (52 posts × ~€0.04 met prompt-caching)
- Vercel: blijft op huidige plan
- Rank-tracker: €40–90/mnd
- Ahrefs (optioneel, maar nuttig na maand 3): €89/mnd
- **Totaal: ~€50–180/mnd** voor de hele SEO-stack

**Q: Mag ik de auto-posts meteen mergen zonder review?**
Niet aan te raden. Google kan AI-content op zich prima ranken — onder twee voorwaarden: het moet **nuttig** zijn en het moet **niet verzonnen** zijn. De review-stap voorkomt het tweede. Eén ramp-PR die door slipt kan een hele cluster terugzetten.

**Q: Wanneer schakel ik over op AggregateRating-schema?**
Zodra je 5+ échte reviews hebt op Google, Trustpilot of intern gevraagd. Geef dan in de PR aan en ik bouw het in `OrganizationSchema.tsx`.

**Q: Wat doe ik met de conversie-events die nog niet bestaan?**
Vraag mij om ze toe te voegen aan de relevante CTA-componenten. Ik doe het in een vervolg-PR. Niet jij in de UI klooien.

---

*Laatst bijgewerkt: bij merge van PR `claude/seo-audit-ai-agents-5zBAu`.*
