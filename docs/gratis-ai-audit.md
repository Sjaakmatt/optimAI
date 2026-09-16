# Kosteloze AI-auditronde

Pagina: `/gratis-ai-audit`. De reguliere auditpagina linkt naar deze ronde; de pagina staat ook in de sitemap.

## Aanbod

- Drie geselecteerde MKB-bedrijven in Noord-Holland, ieder drie afgebakende processen.
- Intake (20 minuten), voorbereiding, één dagdeel op locatie, beknopt rapport en adviesgesprek (45 minuten).
- Reiskosten binnen Noord-Holland inbegrepen. Geen afnameverplichting, verplichte review of publicatie.
- FactumAI kiest op geschiktheid. Het aantal aanmeldingen is geen teller voor de beschikbare plaatsen.

## Aanmeldingen ontvangen

`POST /api/audit-aanmelding` verstuurt een e-mail via de bestaande Resend-configuratie:

- `RESEND_API_KEY`: vereist, met een geverifieerd afzenderdomein bij Resend.
- `CONTACT_FROM_EMAIL`: standaard `website@factumai.nl`.
- `CONTACT_TO_EMAIL`: standaard `info@factumai.nl`.

Onderwerp: `Aanmelding kosteloze AI-audit · [bedrijf]`. Reply-to is het opgegeven e-mailadres. De e-mail bevat de gegevens en de geaccepteerde versie van de deelnameafspraken. Er wordt geen nieuwsbriefinschrijving gedaan en geen bevestigingsmail naar de deelnemer gestuurd. De website toont de ontvangstbevestiging nadat Resend een bericht-id teruggeeft; dit is geen bewijs van bezorging in de inbox.

Zonder mailconfiguratie of bij een verzendprobleem verschijnt een foutmelding met e-maillink. De ingevulde gegevens blijven staan voor een nieuwe poging. Test de backend met `node --import tsx --test lib/audit-campaign.test.ts`; de mailprovider wordt onderschept, dus deze tests versturen geen echte e-mails.

## De ronde sluiten

Zet `AI_AUDIT_CAMPAIGN_OPEN=false` en voer een nieuwe deployment uit nadat de drie bedrijven zijn geselecteerd. De pagina toont dan een gesloten ronde met een verwijzing naar de reguliere audit. De API weigert ook een inzending vanuit een eerder geopend formulier. Leeg of `true` opent de ronde.

De sluiting is handmatig: er is geen verzonnen resterende-plekkenteller of automatische selectie na drie inzendingen. De pagina belooft geen sluitingsdatum of vaste reactietermijn.

Bij wijzigingen aan de deelnameafspraken ook `AUDIT_TERMS_VERSION` in `lib/audit-campaign.ts` aanpassen. De oorspronkelijke tekst is terug te vinden in de Git-versie van de pagina. Volg voor ontvangen aanmeldingen de bewaartermijn in de privacyverklaring; de mailbox wordt niet automatisch opgeschoond door deze route.
