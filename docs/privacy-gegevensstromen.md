# Privacyverklaring en gegevensstromen

Gecontroleerd op 25 september 2026. De publieke tekst staat in `app/privacy/page.tsx` (versie 1.3). Deze notitie onderscheidt bestaand bedrijfsbeleid van technisch aangetoonde uitvoering; zij is geen verklaring dat alle AVG-verplichtingen zijn afgerond.

## Gecontroleerde aanvulling

- FactumAI Ads: verplichte naam/e-mail/wensen; optioneel bedrijf/telefoon/budget. Opslag in Cloudflare D1 met EU-jurisdictie. Campagne, pagina/revisie, vier UTM-labels en handmatige opvolgstatus met historie worden bij de aanvraag bewaard. Geen Meta/Google-conversie-upload, trackingpixel of automatische CRM-sync. R2 bevat campagnebriefings, geen automatische kopie van aanvragen.
- De bestaande website heeft wél een eigen CRM-route: chatgesprekken kunnen door Anthropic worden samengevat en gekwalificeerd, waarna contactgegevens en samenvatting naar de Supabase-relatieadministratie gaan. Dat is een afzonderlijke stroom van FactumAI Ads.
- Chat: gesprek/berichten verlopen na 90 dagen volgens `lib/site-agent/db.ts`; agentgebeurtenissen krijgen standaard een vervaldatum na 180 dagen volgens `lib/site-agent/events.ts`.
- Terugbelverzoek: vaste toestemmingsverklaring met versie, tekst en tijdstip. Versie 2 vervangt de onjuiste absolute belofte dat geen gegevens met derden worden gedeeld. Historische tekstkopieën in interacties blijven staan; geen migratie van bestaande toestemming.
- Afspraakfunctie: productie-UI op `/plan` toont Cal.com met Teams als vergaderlocatie. De code bevat daarnaast een omschakelbare eigen agenda; bij activeren daarvan moet de verklaring opnieuw worden gecontroleerd.
- Website: Vercel Analytics en Speed Insights; Google Analytics achter voorafgaande toestemming. Google Ads is optioneel configureerbaar, maar was bij deze controle niet als actieve marketingcategorie zichtbaar. Publieke Ads-landingspagina’s krijgen de Next.js-layout/widgets/tags niet mee.
- Contactformulier: privacy-informatie bij het versturen toegevoegd. Geen verplichte algemene privacytoestemming ingevoerd voor het beantwoorden van een aanvraag.

## Uitvoering van bewaarbeleid: nog te regelen/controleren

De termijn van maximaal één jaar voor niet-klantaanvragen is bestaand gepubliceerd bedrijfsbeleid. Deze aanvulling verduidelijkt de start als ontvangst en past dezelfde termijn toe op Ads-aanvragen, herkomst en opvolging. Er is hiervoor nog geen automatische opschoning in FactumAI Ads. Er zijn geen productiegegevens verwijderd.

- [ ] Periodiek verwijderen van verlopen aanvragen en gekoppelde historie regelen, met uitzondering voor actuele klantadministratie en werkelijk toepasselijke wettelijke plichten. Neem mailbox, Ads D1, CRM-interacties en afspraakregistraties mee.
- [ ] Chatcron in productie controleren en de aparte dashboard-opruiming van AgentEvent verifiëren. Een `expiresAt`-veld is geen bewijs dat opschoning draait.
- [ ] De bestaande 24-maandentermijn voor scans, 12 maanden voor basisstatistieken en maximaal 14 maanden voor GA controleren tegen database- en providerinstellingen.
- [ ] Concrete bewaartermijnen voor infrastructurele requestlogs bij Vercel/Cloudflare vastleggen; geen absolute claim dat IP-adressen nergens worden bewaard. De Ads-app bewaart alleen een HMAC-afgeleide IP-teller, ongeveer 24–48 uur na laatste vensterstart; providers kunnen afzonderlijke logs hebben.
- [ ] Bestaande bedrijfsclaims over Supabase-regio, contracten, DPF-dekking/SCC's en transfer impact assessments onderbouwen met accountinstellingen en contractdocumenten. Codecontrole bewijst die afspraken niet.
- [ ] Belangenafweging documenteren voor zakelijke opvolging, beperkte interne herkomstmeting en AI-ondersteunde chatkwalificatie.

Automatische verwijdering, gewijzigde cookiecategorieën, Meta/Google-conversie-upload, remarketing, CRM-sync uit Ads of nieuwe videoproviders eerst beoordelen en vervolgens verklaring en informatie bij het formulier gelijktijdig aanpassen.

## Bronnen voor de formulering

- [AVG artikel 13 en artikel 12](https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32016R0679): informatie over doelen, grondslagen, ontvangers, bewaring, rechten, verplichte gegevens en reactietermijnen.
- [AP: bewaren van persoonsgegevens](https://autoriteitpersoonsgegevens.nl/nl/over-privacy/persoonsgegevens/bewaren-van-persoonsgegevens): geen algemene vaste bewaartermijn voor elke aanvraag; noodzaak en uitvoering onderbouwen.
- [EDPB richtsnoeren 2/2019](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines-art_6-1-b-adopted_after_public_consultation_en.pdf): noodzakelijke stappen op verzoek van de betrokkene vóór een overeenkomst.
- [AP: trackingcookies](https://autoriteitpersoonsgegevens.nl/themas/internet-slimme-apparaten/cookies/tracking-cookies): voorafgaande toestemming voor tracking.
- [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/), [Cal.com privacy-informatie](https://cal.com/privacy), [Vercel Analytics](https://vercel.com/docs/analytics/privacy-policy), [Vercel Speed Insights](https://vercel.com/docs/speed-insights/privacy-policy): dienstverleners en reikwijdte van hun gepubliceerde informatie.
