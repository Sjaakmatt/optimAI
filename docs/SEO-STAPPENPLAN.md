# SEO Stappenplan — wat jij nu moet doen

Doel: FactumAI #1 in Nederland voor "AI agents implementeren", "AI automatisering",
"AI agents voor bedrijven", "AI implementatie", en de bijbehorende long-tail-cluster.

De code-fundering is af. Wat hieronder staat zijn de niet-code-stappen die jij
zelf moet nemen — omdat ze een account, beslissing of authenticatie van jouw
kant vragen.

Volg dit document van boven naar beneden. Vink de checkboxes af. Geschatte tijd
voor de eerste 90 dagen: **6–10 uur eigen werk per maand**.

---

## Status snapshot

### ✅ Wat al draait (geen actie nodig)

- [x] Site live op `factumai.nl` met 63 statische pagina's
- [x] Volledige metadata, schema (Organization, Service, Article, FAQ, HowTo, Person, Breadcrumb, ItemList, Blog, WebApplication)
- [x] Sitemap met `nl-NL` hreflang-self, alle routes inbegrepen
- [x] Robots.txt met AI-crawler allowlist (GPTBot, Claude, Perplexity, etc.)
- [x] `llms.txt` route voor AI-search engines
- [x] PWA-manifest, security headers, redirects
- [x] **Content automation pipeline** — Anthropic API key gezet, cron draait di+do 09:00 NL en commit direct naar main (geen review-stap)
- [x] **IndexNow auto-ping** — bij elke merge naar main worden nieuwe URLs binnen seconden gepingd naar Bing/Yandex/Seznam/Naver/Yep/Mojeek
- [x] **3 nieuwe servicepagina's**: ai-automatisering, ai-implementatie, ai-agents-voor-bedrijven
- [x] **/diensten overview** als hub-pagina
- [x] **14 branches** + `/branches` lijst
- [x] **3 vergelijkingspagina's** onder `/diensten/vergelijken/`
- [x] **Auteurspagina** `/over/sjaak-ter-veld` met uitgebreid Person-schema
- [x] **/over** als bedrijfsinfo + team-data-driven (klaar voor uitbreiding)
- [x] **Tools live**: ROI calculator + agent readiness check
- [x] **Resources** (PDF-stubs): ai-implementatie-stappenplan + guardrails-werkboek
- [x] **Tag-gebaseerde related posts** op kennis-detailpagina's
- [x] **Tools-dropdown** in header (Demo + ROI + readiness)
- [x] **Cases-pagina** met branche- en regio-filters

### ☐ Wat jij nog moet doen

Hieronder per fase. Begin bij sectie 1 als je nog niets gedaan hebt.

---

## Inhoud

1. [Indexering & vindbaarheid — Week 1](#1-indexering--vindbaarheid--week-1)
2. [E-E-A-T & vertrouwen — Week 1–2](#2-e-e-a-t--vertrouwen--week-12)
3. [Off-page autoriteit — Week 2–8](#3-off-page-autoriteit--week-28)
4. [Content automation in de praktijk — doorlopend](#4-content-automation-in-de-praktijk--doorlopend)
5. [Performance & afbeeldingen — Week 1](#5-performance--afbeeldingen--week-1)
6. [Meten & rapporteren — wekelijks](#6-meten--rapporteren--wekelijks)
7. [PR-campagnes — kwartaal](#7-pr-campagnes--kwartaal)
8. [Slaagcriteria 6 maanden](#8-slaagcriteria-6-maanden)
9. [Common gotchas (bewaren voor later)](#9-common-gotchas-bewaren-voor-later)

---

## 1. Indexering & vindbaarheid — Week 1

### 1.1 Google Search Console

- [x] GSC verifieerd voor `factumai.nl` (gezien aan de "niet geïndexeerd"-screenshots)
- [ ] In Search Console → **Sitemaps** → submit `https://factumai.nl/sitemap.xml` als nog niet gebeurd
- [ ] Bij **URL-inspectie**: dien handmatig in voor de 12 belangrijkste pagina's. Per dag mag je er ~10 doen, dus spreid over 2 dagen:

**Dag 1:**
- `/`
- `/diensten`
- `/diensten/ai-agent-laten-bouwen`
- `/diensten/ai-automatisering`
- `/diensten/ai-implementatie`
- `/diensten/ai-agents-voor-bedrijven`
- `/over`
- `/over/sjaak-ter-veld`
- `/cases`
- `/kennis`

**Dag 2:**
- `/branches`
- `/tools/ai-roi-calculator`
- `/tools/agent-readiness-check`
- `/diensten/vergelijken/ai-agent-vs-chatbot`
- `/branches/groothandel`
- `/branches/installatietechniek`
- `/branches/transport-logistiek`
- `/branches/zorg`
- `/branches/bouw`
- `/info`

Voor elke: **Test live URL** → groen vinkje → **Indexering aanvragen**.

### 1.2 Bing Webmaster Tools

ChatGPT-search indexeert via Bing — dus dit is niet optioneel. Plus: IndexNow
pingt al automatisch naar Bing, maar je hebt een Webmaster-account nodig om
te zien wat er gebeurt.

- [ ] Ga naar `https://www.bing.com/webmasters`
- [ ] Sign in met Microsoft-account
- [ ] **Add site** → `https://factumai.nl`
- [ ] Verifieer via DNS, of importeer vanuit Google Search Console (snelste)
- [ ] Submit sitemap: `https://factumai.nl/sitemap.xml`
- [ ] Open het **IndexNow**-tabblad in de linker navigatie — daar zie je de URLs die ons workflow heeft gepingd. Bij eerste run met `mode: all` zou je daar ~63 URLs moeten zien.

### 1.3 Google Business Profile

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

### 1.4 NAP-consistentie controleren

Naam-Adres-Telefoon **moeten** overal identiek zijn. Check:

- [ ] Footer van factumai.nl
- [ ] OrganizationSchema (`components/seo/OrganizationSchema.tsx`)
- [ ] Google Business Profile
- [ ] LinkedIn company page
- [ ] KvK-vermelding

Eén verschil (bv. "06-1055 5658" vs "+31610555658") verzwakt het lokale signaal.

### 1.5 Domain-registrar checks

- [ ] Vercel: `factumai.nl` als primary, `www.factumai.nl` redirect naar apex (of andersom — kies één canonical en blijf daarbij)
- [ ] HTTPS-only (Vercel doet dit automatisch, controleer via `https://www.ssllabs.com/ssltest/`)
- [ ] HSTS-header werkt — test op `https://hstspreload.org/?domain=factumai.nl`. Als groen: optioneel je domein submitten voor de preload-list.

---

## 2. E-E-A-T & vertrouwen — Week 1–2

Google + AI-search wegen experience/expertise/authority/trust steeds zwaarder.

### 2.1 Persoonlijke profielen

- [x] LinkedIn-URL op `/over/sjaak-ter-veld` correct gezet
- [ ] **LinkedIn-profiel Sjaak**: voeg toe aan headline/about: "Oprichter FactumAI — AI-agents voor MKB"
- [ ] **LinkedIn company page** voor FactumAI aanmaken (als nog niet bestaat). Beschrijving uit `OrganizationSchema.tsx`. Voeg websitelink toe. Plaats 1 update per week (link naar nieuwe kennis-post).
- [ ] (Optioneel) **X/Twitter @factumai** registreren — even claimen, posten kan later
- [ ] Als je nog meer profielen hebt (GitHub, Mastodon): voeg ze toe aan `lib/data/team.ts` onder Sjaak — `linkedin`, `github`, `twitter`. Worden automatisch in Person-schema (`sameAs`) opgenomen.

### 2.2 Reviews verzamelen

Google AggregateRating-schema werkt alléén met échte, verifieerbare reviews. Niet
zelf verzinnen — Google straft dat af.

- [ ] Vraag aan de drie bestaande klanten (Nordveld, Hendriks, Bakker) een Google-review op je Business Profile. 5 reviews is een goede startbasis.
- [ ] Vraag toestemming voor een sterren-rating + quote die je op de site mag plaatsen
- [ ] Stuur me door: "ik heb 5 echte reviews van X.X gemiddeld" — dan voeg ik `Review`/`AggregateRating` schema toe aan `OrganizationSchema.tsx`

### 2.3 Klantlogo's

- [ ] Vraag aan klanten of hun logo op de site mag (3 voldoende voor de start)
- [ ] Geen toestemming? Dan een visuele "MKB-klant in [branche]" placeholder
- [ ] Logo-strip plaatsen op `/`, `/diensten/ai-agent-laten-bouwen`, `/cases` — vraag mij om dit te coderen zodra je de logo's hebt

### 2.4 KvK & BTW in footer

- [ ] Check `components/site/SiteFooter.tsx` of er KvK-nummer en BTW-nummer staan. Zo niet, geef ze me door dan voeg ik ze toe in de footer en in `OrganizationSchema.tsx`

---

## 3. Off-page autoriteit — Week 2–8

On-page is af. Vanaf hier wint wie de meeste relevante backlinks heeft. Dit is
ook de hefboom voor de "Discovered, niet gecrawld"-berg in GSC.

### 3.1 Directories (eerste 2 weken — quick wins)

**Gratis, direct doen:**
- [ ] [KvK Bedrijfsprofiel](https://www.kvk.nl/) — koppeling website
- [ ] [De Telefoongids](https://www.detelefoongids.nl/) — bedrijfsvermelding
- [ ] [Bing Places](https://www.bingplaces.com/)
- [ ] [Apple Maps Connect](https://mapsconnect.apple.com/)
- [ ] [Trustpilot](https://nl.trustpilot.com/) — claim je bedrijfspagina
- [ ] [Yelp Nederland](https://biz.yelp.nl/)

**Sector-directories (kies de 3 meest relevant):**
- [ ] [MKB-Nederland — als lid](https://www.mkb.nl/) — vermelding op ledenpagina
- [ ] [Emerce100](https://www.emerce.nl/awards/emerce100/aanmelden) — submission voor de jaarlijkse lijst
- [ ] [Computable Top 100](https://www.computable.nl/) — submission
- [ ] [Frankwatching agencies](https://www.frankwatching.com/agencies/) — submit FactumAI

### 3.2 Gastartikelen (vanaf week 3)

Pitch onderwerpen uit `scripts/content-backlog.json` aan branchemedia. Eén
gastartikel per maand minimum.

Doel-publicaties (Nederland, prioriteit hoog):

- [ ] **Frankwatching** — pitch: "AI-implementeren in vijf stappen" — `https://www.frankwatching.com/voor-auteurs/`
- [ ] **Marketingfacts** — pitch: "AI-automatisering vs RPA in MKB" — `https://www.marketingfacts.nl/auteur-worden`
- [ ] **Emerce** — pitch: "Hoeveel kost een AI-agent in 2026?" — via redactie
- [ ] **Computable** — pitch: "Multi-agent systemen voor middelgrote bedrijven" — via redactie
- [ ] **MT/Sprout** — pitch: "Verborgen kosten van handmatig MKB-werk" — via redactie
- [ ] **De Ondernemer** — pitch: "AI-readiness check voor MKB" — vrij lage drempel, pak deze als eerste
- [ ] **Cobouw** (per case in bouw)
- [ ] **Logistiek.nl** (per case in transport)
- [ ] **Installatie.nl** (per case installatietechniek)

**Pitch-tip:** stuur niet "wil ik een gastartikel schrijven". Stuur: "ik heb een
specifiek artikel in deze stijl klaarliggen, mag ik dat aanbieden?" — concreter
= hogere conversie. Je hebt nu een sterke kennisbank om mee te onderbouwen.

### 3.3 Partner-vermeldingen (vanaf week 4)

Sterk-context backlinks van software-partners. Vraag aan account manager:

- [ ] **Exact** — partner-directory
- [ ] **AFAS** — partner-pagina
- [ ] **Twinfield** — integratiepartners
- [ ] **Pipedrive** — Marketplace + partners
- [ ] **Teamleader** — partner-overzicht
- [ ] **HubSpot Solutions Directory** — gratis tier

### 3.4 Podcasts (vanaf week 6, één per maand)

- [ ] **De Ondernemer** podcast
- [ ] **Cloud Podcast NL**
- [ ] **Dutch IT Channel**
- [ ] **MT podcast**
- [ ] **Werk in uitvoering** (BNR)

Pitch-mail: "Sjaak ter Veld, oprichter FactumAI. Wij bouwen AI-agents voor MKB.
In één gesprek licht ik toe waar het MKB nu kan winnen op AI én waar het
structureel mis gaat. 25 minuten."

### 3.5 HARO / journalisten-queries

- [ ] Aanmelden bij **Help A B2B Writer** + **HARO** + **SourceBottle EU**
- [ ] 2× per week relevante vragen beantwoorden over AI-implementatie, MKB-tech, automatisering. Levert per kwartaal 1–3 gepubliceerde quotes met backlink op.

---

## 4. Content automation in de praktijk — doorlopend

### 4.1 Wat er automatisch gebeurt

- **Cron** elke di + do 09:00 NL: pakt eerstvolgende `pending` uit `scripts/content-backlog.json`, genereert artikel via Claude Sonnet 4.6, valideert (Zod-schema + `npm run build`), commit direct naar `main`
- **Vercel** rolt automatisch live binnen ~2 min na push
- **IndexNow ping** vuurt zodra de push op main landt: nieuwe URL binnen seconden bij Bing/Yandex/Seznam/Naver/Yep/Mojeek

Geen reviewstap meer. De validatie (Zod-schema, stijlgids met whitelist, build verify, word-count gate, slug-uniqueness) is je vangnet. Als een artikel desondanks niet goed leest:

```bash
git revert <sha>     # de auto-commit ongedaan maken
git push origin main # IndexNow pingt niets, Google haalt het later weer uit de index
```

### 4.2 Backlog uitbreiden

`scripts/content-backlog.json` bevat ~30 onderwerpen pending. Genoeg voor ~15 weken op 2 posts/week. Voeg nieuwe toe wanneer ze binnenvallen:

- [ ] Onderwerp uit een klantgesprek? Voeg een item toe aan `items[]` met `status: pending`
- [ ] Cluster-spreiding bewaken: niet alleen cluster A, ook B/C/D/E afwisselen
- [ ] Onder 5 pending items: nieuwe batch toevoegen

### 4.3 Ad-hoc post genereren

Iets in het nieuws (AI-Act update, nieuw model, branche-event)? Genereer
direct een post:

```bash
# GitHub: Actions tab → "Generate kennis-artikel" → Run workflow → vul topic in
```

Direct gecommit naar main, live binnen 2 minuten. Of lokaal:
```bash
ANTHROPIC_API_KEY=sk-ant-… npm run new-post -- "Wat de AI-Act van mei 2026 betekent voor MKB"
```

### 4.4 Kwaliteit bewaken (steekproef)

Geen reviewstap betekent niet "vergeten". Per maand 5 minuten:

- [ ] Open de meest recente 4 auto-posts op de site
- [ ] Lees de eerste paragraaf van elk — voelt het als FactumAI-stijl?
- [ ] Spot-check één FAQ-antwoord: klopt de inhoud, geen verzonnen feiten?
- [ ] Als drift: pas `scripts/style-guide.md` aan of voeg een fewshot toe in `scripts/fewshot/`

### 4.5 Anthropic budget-cap

- [ ] Ga naar [console.anthropic.com → Settings → Limits](https://console.anthropic.com/settings/limits)
- [ ] Zet een **Monthly spend limit** van $5 (>10× het verwachte verbruik, voorkomt verrassingen bij retry-loops)
- [ ] Optioneel: usage notifications op 50% en 80%

---

## 5. Performance & afbeeldingen — Week 1

### 5.1 Portret-foto comprimeren (urgent)

`/public/portret.jpg` is **10.2 MB** — dat is een LCP-killer.

- [ ] Open de originele foto
- [ ] Comprimeer naar 3 sizes (Squoosh.app of cwebp):
  - 320px breed → < 30 KB als WebP
  - 640px breed → < 80 KB als WebP
  - 1024px breed → < 200 KB als WebP
- [ ] Vervang `public/portret.jpg` door de 1024px-versie (`next/image` regelt resize voor de andere breedtes via de in `next.config.ts` gedefinieerde `deviceSizes`)
- [ ] Test: open `/over` op mobiel via PageSpeed Insights → LCP moet < 2.0s worden

### 5.2 Cover-afbeeldingen voor kennis-posts (later)

- [ ] Per kennis-post een 1200×630 cover image (DALL·E, Midjourney, Recraft, Flux)
- [ ] Stijl-prompt: "abstract editorial illustration, oker en papier kleuren, minimal, FactumAI brand"
- [ ] Plaats in `public/kennis/<slug>.webp`
- [ ] Vraag mij om `coverImage`-veld te activeren in `lib/data/posts.ts` zodra je 5+ covers klaar hebt

### 5.3 Core Web Vitals tracking

Vercel Speed Insights staat al aan. Bekijk wekelijks:

- [ ] Vercel dashboard → Speed Insights → Real Experience Score
- [ ] Doel: LCP < 2.0s, INP < 150ms, CLS < 0.05 op alle templates
- [ ] PageSpeed Insights van `https://factumai.nl` op mobiel — score Performance ≥ 90, SEO 100

---

## 6. Meten & rapporteren — wekelijks

### 6.1 Rank-tracker opzetten

Kies één — niet meer:

- [ ] **Ahrefs** (€89/mnd) — beste backlink-data + rank tracking
- [ ] **SEranking** (€55/mnd) — goede prijs/kwaliteit voor MKB
- [ ] **Nightwatch** (€39/mnd) — goedkoopste, lokaal NL-tracking

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

**Nieuwe branches (5):**
- AI agent accountancy / AI accountant
- AI agent advocatuur / AI advocaat
- AI agent makelaar
- AI agent agrarisch
- AI agent webshop / AI ecommerce

**Tools (4):**
- AI ROI calculator
- AI readiness check
- AI implementatie stappenplan
- AI agent vs chatbot

### 6.2 Conversie-events instellen

Vercel Analytics heeft custom events. Voeg toe in:

- [ ] Login Vercel → Project → Analytics → Custom events
- [ ] Vraag mij om in `components/booking/CalProvider.tsx` (of waar relevant) de events te emitten: `cta_plan_gesprek`, `cta_demo`, `contact_form_submit`, `cal_booking_done`, `roi_calculated`, `readiness_completed`

### 6.3 Wekelijkse review (vrijdag 30 minuten)

- [ ] Rank-tracker dashboard — welke 40 keywords stijgen / dalen
- [ ] GSC → Performance → klikken / impressies / CTR / positie per pagina
- [ ] GSC → Coverage → eventuele fouten oplossen
- [ ] Bing Webmaster → IndexNow log → URLs succesvol gepingd?
- [ ] Vercel Analytics → events deze week → conversion rate per landing
- [ ] Vercel Speed Insights → CWV-regressies?
- [ ] Eén actie noteren voor volgende week

### 6.4 Maandelijkse review (eerste maandag, 1 uur)

- [ ] Stappenplan-doc opnieuw doorlopen, vinkjes bijwerken
- [ ] Rank-tracker rapport over 30 dagen → 5 grootste stijgers, 3 grootste dalers
- [ ] Backlog-items in `content-backlog.json` aanvullen (mik op 4 weken vooruit)
- [ ] Off-page outreach: aantal pitches verstuurd, aantal geplaatst
- [ ] Beslissing: wat volgende maand prioriteit?

---

## 7. PR-campagnes — kwartaal

Eén per kwartaal een grote PR-stunt voor link-magnet-effect.

### Q2 2026 — "AI-adoptie MKB Nederland 2026"

- [ ] Survey opzetten via Tally / Typeform — 12 vragen, 5 minuten invultijd
- [ ] 100+ MKB-ondernemers werven via LinkedIn, klanten, partners
- [ ] Resultaten samenvatten in een rapport van 16–24 pagina's met grafieken
- [ ] Persbericht versturen naar FD, NRC, Computable, Emerce, Sprout
- [ ] PDF gated via `/resources/mkb-ai-adoptie-2026` (structuur staat al klaar in `lib/data/resources.ts`)

### Q3 2026 — "Verborgen kosten van handmatig werk — branche-benchmark"

- [ ] Per branche (de 14 die op de site staan) één representatieve case in cijfers
- [ ] Visueel: branche-vergelijking-poster
- [ ] Branchemedia per branche pitchen

### Q4 2026 — "Lessen na 50 AI-implementaties"

- [ ] Anoniem cijferrapport over 50 klantimplementaties
- [ ] Eén grote keynote-sessie organiseren in Amsterdam — uitnodigen 30 MKB-ondernemers, opname en transcript hergebruiken voor content

---

## 8. Slaagcriteria 6 maanden

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

## 9. Common gotchas (bewaren voor later)

Lessen uit de eerste week van de pipeline:

### Cron faalt op exit code 2

**Symptoom:** "Generate post" stap rood, log toont `Process completed with exit code 2`.

**Oorzaak:** generatie faalde 3× achter elkaar op Zod-validatie. Mogelijke redenen:
- Model gebruikt afwijkende veldnamen (we hebben `normalize()` geadded, dus dit zou niet meer moeten)
- Slug bestaat al
- Word count out of bounds (450–1500)
- API rate limit / overload

**Fix:** open de Generate-post log, kijk naar de Zod-issues. Pas of de stijlgids of het Zod-schema aan, of laat de cron het de volgende dag opnieuw proberen.

### Workflow kan geen PR aanmaken

**Symptoom:** "Create Pull Request" stap rood, push slaagt wel.

**Oorzaak:** repo-permissies te beperkt.

**Fix:** Repo Settings → Actions → General → Workflow permissions:
- ✓ Read and write permissions
- ✓ Allow GitHub Actions to create and approve pull requests
- Save

### Pagina staat in "Discovered, not crawled"

**Symptoom:** GSC toont URL maar "Laatst gecrawld: N.v.t."

**Oorzaak:** normaal voor nieuwe sites. Crawl-budget is laag voor jonge domeinen.

**Fix:**
1. Manueel **Indexering aanvragen** in GSC (per dag ~10 mogelijk)
2. Backlinks bouwen — sectie 3 van dit document
3. IndexNow doet zijn werk voor Bing/ChatGPT-search; Google volgt later
4. Geduld: typisch 4–12 weken voor volledige indexatie van een nieuwe site

### Anthropic-rekening loopt op

**Symptoom:** factuur hoger dan verwacht.

**Oorzaak:** rate-limited retries of misschien een loop.

**Fix:** budget-cap in console.anthropic.com (sectie 4.6).

---

*Laatst bijgewerkt na merge `79ad4e5` (IndexNow live, content-cron operationeel, eerste AI-post gemerged).*
