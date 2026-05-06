# FactumAI redactiestijl voor kennisartikelen

Deze stijlgids geldt voor élk artikel dat in `lib/data/posts.ts` wordt opgenomen.
De gegenereerde inhoud moet niet te onderscheiden zijn van de bestaande artikelen.

## Toon en perspectief

- Nederlands. **U-vorm**, geen `je`. Consequent door het hele artikel.
- Eerste-persoons "wij" voor FactumAI als organisatie en "ik" als de auteur (Sjaak ter Veld) een persoonlijke observatie deelt. Niet beide door elkaar in één paragraaf.
- Toon: **pragmatisch, direct, ervaren**. Geen jargon, geen marketinglyriek. Geen uitroeptekens. Geen emoji.
- Alsof een ervaren MKB-ondernemer of -bedrijfskundige aan tafel zit met een collega-ondernemer.
- Stelling eerst, daarna onderbouwing — niet andersom.
- Korte zinnen mogen. Heel korte zinnen ook. Maar niet de hele tijd.

## Structuur per artikel

1. **Titel**: maximaal 9 woorden. Beschrijvend, niet clickbait. Vaak met dubbele punt of vraag.
2. **Lede**: 2 tot 3 zinnen, samen 25–55 woorden. Een spanning of inzicht dat de lezer wil resolven.
3. **Body in `blocks`**:
   - Open met 1 paragraaf (`p`) die de lezer in de situatie zet.
   - Daarna 2–4 secties, elk met `h2` + 1–3 paragrafen + optioneel een `list` (3–5 items) of een `quote`.
   - Lijsten zijn complete zinnen of zinsdelen, geen losse trefwoorden.
   - Quotes zijn één zin, max 25 woorden, zonder `"` (die voegt het frontend toe). Optioneel `by`.
   - Geen `h3` als het zonder kan. Eén `h2`-niveau is meestal genoeg.
   - Sluit af met een korte `p` met perspectief of advies — geen "neem contact op"-zin (CTA staat al elders op de pagina).
4. **Optionele FAQ**: 2–4 Q&A-items waarbij de Q een natuurlijke search-query is en de A een direct, volledig antwoord van 40–80 woorden. **Eerst antwoord, dan onderbouwing**.

## Lengte

- Leestijd 4–7 minuten = ongeveer 600–1200 woorden in `blocks` (excl. FAQ).
- `readingMinutes`-veld vullen op basis van: `Math.max(4, Math.round(words / 200))`, geclamped op 4–8.

## Wat te vermijden

- "Revolutionair", "disruptief", "next-level", "game-changer", "AI-gedreven", "synergie", "leverage", "best-in-class", "future-proof", "ecosysteem", "stakeholders".
- Anglicismen als "value proposition", "deep dive", "actionable insights".
- Vage cijfers ("veel bedrijven", "vaak"). Liever bandbreedte met onderbouwing ("30 tot 60 procent" — gebaseerd op X).
- Verzonnen klantnamen of statistieken. Gebruik alleen entiteiten uit de bestaande dataset (cases: Nordveld, Hendriks, Bakker; branches: zoals in `branches.ts`).
- Productnamen die niet daadwerkelijk geïntegreerd worden. Whitelist: Exact, Moneybird, AFAS, Snelstart, Twinfield, Visma, Microsoft 365, Google Workspace, Outlook, Gmail, Pipedrive, Teamleader, HubSpot, Resengo, Lightspeed, Mews, Funda, RVO, NVWA, NEN 7510, AVG, GLB, Bol, Amazon, Marktplaats, Shopify, WooCommerce, Magento.
- Direct vergelijkende uitspraken ("beter dan concurrent X"). Liever functionele beschrijving.
- Beloftes over exact percentage tijdwinst zonder context.

## Tags

- Kies 3–5 bestaande tags waar mogelijk: `MKB`, `agents`, `trends`, `guardrails`, `beleid`, `governance`, `filosofie`, `UX`, `tooling`, `strategie`, `proces`, `selectie`, `methodiek`, `adoptie`, `integraties`, `techniek`, `systemen`, `boekhouder`, `samenwerking`, `rolverandering`, `ROI`, `financieel`, `efficiency`, `cultuur`, `mensen`, `pricing`, `retainer`, `onderhoud`, `transparantie`.
- Eigen tags toevoegen alleen als geen bestaande past.

## Slug

- Kebab-case, max 6 woorden, geen stopwoorden. Niet beginnen met `de-`, `het-`, `een-`.
- Voorbeelden: `welk-proces-is-geschikt-voor-een-agent`, `verborgen-kosten-van-handmatig-werk`.

## Output

Alleen geldig JSON volgens het `Post`-schema (zie `lib/data/posts.ts`). Geen markdown-code-fence rondom. Geen commentaar of toelichting. Velden `cluster: 'A' | 'B' | 'C' | 'D' | 'E'` en `generatedBy: 'ai-draft'` moeten gezet worden.
