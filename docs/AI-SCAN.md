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
```

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

Zonder MCP-vars werkt de scan volledig op de ingebouwde fallback-scraper —
alleen `ANTHROPIC_API_KEY` is dan nodig.

## Misbruik & privacy

- **Rate-limit**: 4 scans per 10 minuten per IP (in-memory, best effort op
  serverless). Honeypot-veld (`emailadres`) vangt bots stilzwijgend af.
- **SSRF-guard**: alleen http(s), publieke hosts; localhost/privé-IP-ranges
  worden geweigerd (DNS-lookup vóór de fetch).
- **Geen persoonsgegevens**: de prompt verbiedt het verzamelen van namen,
  e-mailadressen en telefoonnummers; er wordt niets opgeslagen (geen database).
- Kosten-remmen: content gecapt op 24k tekens, `max_tokens` 8000, geen
  web-search-tool.

## Bestanden

- `app/scan/page.tsx` — SEO/metadata + hero
- `app/scan/ScanTool.tsx` — formulier, live checklist, resultaat (client)
- `app/api/scan/route.ts` — SSE-route, rate-limit, orkestratie
- `lib/scan/scraper.ts` — MCP-client + fallback-scraper + SSRF-guard
- `lib/scan/analyze.ts` — Claude-prompt + normalisatie
- `lib/scan/types.ts` — gedeelde types (`ScanEvent`, `ScanAnalysis`, …)
