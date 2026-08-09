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
   - **Open met een concrete scène, niet met een observatie over de markt.** Beschrijf in de eerste twee zinnen iets dat op een willekeurige dinsdag bij de lezer gebeurt. Goed: "Een offerte ligt al negen dagen open. De verkoper wil bellen, maar ziet de herinnering pas wanneer de klant zelf weer mailt." Fout: "Iedereen heeft de afgelopen twee jaar wel iets gedemonstreerd gekregen met generatieve AI." Pas in de tweede alinea mag u uitzoomen naar wat dit betekent.
   - Daarna 5 tot 7 secties, elk met een `h2` en 2 tot 4 paragrafen.
   - **Koppen zijn stellingen, geen labels.** Een kop moet op zichzelf iets beweren, zodat iemand die alleen de koppen scant het artikel al begrijpt. Goed: "Controle is geen rem op automatisering", "Begin niet met AI, begin met het proces", "Goede data helpt, perfecte data is geen voorwaarde". Fout: "Wat er praktisch veranderd is", "Aandachtspunten", "Conclusie".
   - Paragrafen van 40 tot 60 woorden. Gemiddelde zinslengte rond de 14 woorden, met uitschieters naar beneden.
   - **Stel vragen in de lopende tekst** om het denken van de lezer te sturen: "Welk werk kost uw team elke week uren, terwijl de informatie al in uw systemen staat?" Reken op vijf tot acht vraagtekens per artikel.
   - Lijsten spaarzaam. Een goed artikel heeft er nul tot één. Lopende tekst overtuigt beter dan opsommingen; gebruik een `list` alleen als de items echt naast elkaar staan.
   - Quotes zijn één zin, max 25 woorden, zonder `"` (die voegt het frontend toe). Optioneel `by`.
   - Geen `h3` als het zonder kan. Eén `h2`-niveau is meestal genoeg.
   - Sluit af met één concrete eerste stap die de lezer maandag kan zetten. Geen "neem contact op"-zin (de CTA staat al elders op de pagina).

## Interne links

Elk artikel bevat **2 tot 4 links naar andere pagina's op factumai.nl**. Dit is niet optioneel: het houdt de lezer op de site en het maakt de samenhang tussen onderwerpen zichtbaar.

- Schrijf een link als `[ankertekst](/pad)` in de `text` van een `p`- of `list`-blok. Het frontend maakt er een echte link van.
- **Link alleen naar paden uit de lijst met beschikbare pagina's** die u bij de opdracht krijgt. Verzin nooit een pad; een link naar een niet-bestaande pagina is een fout.
- De ankertekst is beschrijvend en loopt door in de zin. Goed: "Bij [commerciële opvolging](/oplossingen/leadopvolging-automatiseren) kan een agent dagelijks openstaande offertes controleren." Fout: "Lees [hier](/oplossingen) meer."
- Zet links midden in een inhoudelijke zin, niet aan het eind als verwijzing. Nooit twee links in dezelfde zin.
- Verwijs bij voorkeur naar een oplossingspagina wanneer u een proces beschrijft, en naar een kennisartikel wanneer u een onderwerp aanstipt dat elders is uitgewerkt.
4. **Optionele FAQ**: 2–4 Q&A-items waarbij de Q een natuurlijke search-query is en de A een direct, volledig antwoord van 40–80 woorden. **Eerst antwoord, dan onderbouwing**.

## Lengte

- Leestijd 6–8 minuten = **1100 tot 1500 woorden** in `blocks` (excl. FAQ). Korter dan 1000 woorden is te dun om een onderwerp echt af te maken.
- `readingMinutes`-veld vullen op basis van: `Math.max(4, Math.round(words / 200))`, geclamped op 4–8.

## Wat te vermijden

- "Revolutionair", "disruptief", "next-level", "game-changer", "AI-gedreven", "synergie", "leverage", "best-in-class", "future-proof", "ecosysteem", "stakeholders".
- Anglicismen als "value proposition", "deep dive", "actionable insights".
- **Verzonnen cijfers.** Geen percentages, besparingen, doorlooptijden, klantaantallen of ROI-getallen die u niet uit de meegegeven context kunt halen. Een rekenvoorbeeld mag, mits u er expliciet bij schrijft dat het een aanname is die de lezer met eigen cijfers invult. Liever "een flink deel van de week" dan een percentage dat niemand kan controleren.
- **Doorlooptijdbeloftes.** FactumAI bouwt in fasen die elk eindigen in iets werkends dat de klant goedkeurt. Nooit "binnen twee weken live".
- **Em-dashes.** Gebruik een komma, een dubbele punt of een punt.
- Verzonnen klantnamen of statistieken. Gebruik alleen entiteiten uit de bestaande dataset (cases: **Pavo, TEKA Kranen** — géén andere klantnamen; branches: zoals in `branches.ts`). Verwijs bij voorkeur naar cases in generieke termen ("bij een HR-dienstverlener", "bij een kraan-inspectiebedrijf") tenzij het artikel expliciet een specifieke klant behandelt.
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
