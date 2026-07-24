# AI-agents scan (`/scan`)

Publieke scan op de website, naar het model van de lead-verrijking in het
FactumAI-dashboard: een bezoeker vult zijn bedrijfswebsite in en ziet — met een
live checklist ("we analyseren uw website / bedrijfsprofiel / branche /
voorstellen") — wat AI-agents voor het bedrijf kunnen betekenen.

## Werking

```
bezoeker vult bedrijfsnaam (optioneel) + website-URL in
  → POST /api/scan (SSE-stream)
     1. scrape website-content
        · primair: bedrijven-MCP `get_company_website_content`
          (zelfde worker als het dashboard; multi-page, schone tekst)
        · fallback: ingebouwde scraper (homepage + relevante same-origin
          pagina's, HTML → tekst, gecapt op ~24k tekens)
     2. Claude-analyse (claude-sonnet-5) → één JSON-object:
        score 0-100 + label, bedrijfsprofiel, websiteAnalyse, brancheKansen,
        aiOpportunities (simpel) en advancedSolutions (complex, met
        categorie / complexiteit / impact / dataBronnen / voorbeeld)
  → UI toont checklist live (stage-events) en daarna het resultaat + CTA (/plan)
  → optioneel: bezoeker vraagt het volledige rapport per e-mail aan
     (POST /api/scan-report → rapport gemaild via Resend + leadmelding naar info@)
```

## Opslag (ScanLead in de dashboard-database)

Elke scan wordt als lead vastgelegd in de **FactumAI-dashboard
Supabase-database**, tabel `ScanLead` (zie `lib/scan/leads.ts`; verbinding via
`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`, zie `lib/db/supabase.ts`).
Best-effort: valt de database weg of ontbreekt de env, dan blijft de scan
gewoon werken en wordt alleen de opslag overgeslagen.

1. **Scan-start** — website + bedrijfsnaam (+ IP/user-agent), stage
   `scan_started`.
2. **Scan-resultaat** — dezelfde rij wordt verrijkt met score, label en het
   volledige rapport (`analysis`, jsonb).
3. **Rapportaanvraag** — e-mail, marketing-consent (+ tijdstip en de exacte
   consenttekst als audit trail), stage `report_requested`.

Aan de dashboard-kant is de tabel opgenomen in `prisma/schema.prisma` en
zichtbaar in **CRM → Website leads** (lijst + volledig rapport met de
voorgestelde agents). RLS staat aan (alleen super_admin als vangnet); de
website schrijft via de service-role.

De prompt is afgeleid van `src/lib/crm/ai-enrichment.ts` in het dashboard, met
publieke aanpassingen: u-vorm (de lezer is het bedrijf zelf), **geen**
contactgegevens-harvesting (AVG), geen server-side web-search, en
publieksvriendelijke labels (hoog / gemiddeld / beperkt i.p.v. HOT/WARM/COLD).

## Env-vars

| Variabele | Verplicht | Doel |
|---|---|---|
| `ANTHROPIC_API_KEY` | ja | Claude-analyse |
| `SCAN_AI_MODEL` | nee | Model-override (default `claude-sonnet-5`) |
| `FACTUMAI_MCP_BEDRIJVEN_URL` | nee | Bedrijven-MCP als primaire scraper |
| `FACTUMAI_MCP_INBOUND_SECRET` | nee | Bearer-auth naar de MCP-worker |
| `CF_ACCESS_CLIENT_ID` / `CF_ACCESS_CLIENT_SECRET` | nee | Cloudflare Access service-token (custom-domain MCP) |
| `FACTUMAI_MCP_ORG_ID` | nee | `tenantContext.organizationId` voor de MCP-call (default `factumai-website`; moet aan MCP-kant geregistreerd zijn) |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | nee | Lead-opslag in de dashboard-database (`ScanLead`); zonder deze env wordt opslag overgeslagen |
| `RESEND_API_KEY` | nee | Rapport-mail + leadmelding (`/api/scan-report`) |
| `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL` | nee | Afzender / ontvanger van de rapport- en leadmails (defaults `website@factumai.nl` / `info@factumai.nl`) |

Zonder MCP-vars werkt de scan volledig op de ingebouwde fallback-scraper —
alleen `ANTHROPIC_API_KEY` is dan nodig.

## Misbruik & privacy

- **Rate-limit**: 4 scans per 10 minuten per IP (in-memory, best effort op
  serverless). Honeypot-veld (`emailadres`) vangt bots stilzwijgend af.
- **SSRF-guard**: alleen http(s), publieke hosts; localhost/privé-IP-ranges
  worden geweigerd (DNS-lookup vóór de fetch).
- **Persoonsgegevens**: de prompt verbiedt het scrapen/verzamelen van namen,
  e-mailadressen en telefoonnummers uit de website-content. Wat wél wordt
  opgeslagen is de lead zelf (zie "Opslag" hierboven): website, bedrijfsnaam,
  IP/user-agent en — alleen als de bezoeker het rapport aanvraagt — het
  e-mailadres met consent-audittrail. Houd de privacyverklaring hiermee in
  lijn.
- Kosten-remmen: content gecapt op 24k tekens, `max_tokens` 8000, geen
  web-search-tool.

## Bestanden

- `app/scan/page.tsx` — SEO/metadata + hero
- `app/scan/ScanTool.tsx` — formulier, live checklist, resultaat (client)
- `app/api/scan/route.ts` — SSE-route, rate-limit, orkestratie
- `lib/scan/scraper.ts` — MCP-client + fallback-scraper + SSRF-guard
- `lib/scan/analyze.ts` — Claude-prompt + normalisatie
- `lib/scan/types.ts` — gedeelde types (`ScanEvent`, `ScanAnalysis`, …)
- `lib/scan/leads.ts` — lead-opslag in de dashboard-database (`ScanLead`)
- `lib/db/supabase.ts` — server-only service-role client (dashboard-database)
- `app/api/scan-report/route.ts` — rapport per e-mail + consent-vastlegging
- `lib/scan/report.ts` — HTML/tekst-opbouw van het rapport-mailtje
