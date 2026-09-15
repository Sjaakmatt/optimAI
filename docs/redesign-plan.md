# Redesign-plan factumai.nl (september 2026)

## Uitgangspunten uit het interview

| Onderwerp | Keuze |
|---|---|
| Kleur | Donker (bijna zwart) met warme schemergloed in de hero; amber/koper als accent |
| Landschap | Bos met bomen én Nederlands polderlandschap, beide gebouwd, keuze na het zien |
| Typografie | Strakke sans-serif (Inter met optische maat), IBM Plex Mono alleen voor kleine labels |
| Scope | Hele site: tokens, header, footer, homepage nieuw, overige pagina's in de nieuwe huisstijl |
| Mailagent | Gescript, gevoed uit de demo-mailscripts (retour servies, eettafel, dubbel betaald) |
| Foto | Onder de hero, vrijstaand uitgesneden en versmolten met de achtergrond; nieuwe foto volgt |
| Projectstrook | Per case een gecodeerde visual (Pavo, TEKA, B_inT, Praktijk de Driehoek) |
| Naam | FactumAI |
| Hero-kop | Nieuw, kort |
| CTA | Plan een gesprek (pill), secundair: zie de agent werken |
| Aanspreekvorm | u |
| Beweging | Rijk maar rustig; reduced-motion gerespecteerd |
| Terugkerende secties | Logostrook, aanpak + drie afspraken, ontdek-band |

## Homepage-opbouw

1. Hero: chip, kop (per regel opkomend), subregel, pill-CTA, product-frame met de mailagent dat uit het landschap oprijst. Landschap in 5 lagen (lucht, gloed, verre rij, middenrij, voorgrond) met parallax op scroll en muis, mist die drijft.
2. Logostrook "In productie bij".
3. Live mailagent: inbox links, verwerking in het midden (opzoeken, beleid, overweging), conceptantwoord dat wordt getypt, "klaar voor verzenden" met goedkeurknop.
4. Wie: portret + korte tekst van Sjaak.
5. Projectstrook: horizontaal scrollend, vier visuals.
6. Aanpak in vijf stappen + drie afspraken.
7. Ontdek-band en slot-CTA.

## Techniek

- Tokens in `app/globals.css`; oude tokennamen blijven bestaan maar wijzen naar de nieuwe kleuren, zodat alle 70+ bestanden in één keer meegaan. Daarna per pagina opschonen.
- Landschap: procedureel gegenereerde SVG-silhouetten (deterministisch, geen hydration-verschil), parallax via `motion`.
- Mailagent: adapter `lib/mailagent/` vertaalt demo-scripts naar een compacte afspeellijst; speelt af met `IntersectionObserver`.
- Landschapsvariant: `?landschap=polder` op de homepage voor de vergelijking.

## Scroll-craft laag (toegevoegd na de eerste bouw)

Op aanwijzing van de scroll-craft-skill (nateherkai/scroll-craft) is de homepage
als scrollverhaal uitgewerkt in plaats van als reeks secties.

**Grammatica:** filmisch in één beweging. Eén lineair argument met één boog
(schemering → dageraad), vaste minimale balk met woordmerk en één knop, geen
hoofdstuknummers, geen zijsprongen. De andere grammatica's passen niet: geen
lange leestekst (editorial), geen tool als hoofdinhoud (live surface, de
mailagent is een scène en niet de hele pagina), geen doorlopende cameravlucht
(te zwaar en te kwetsbaar op telefoons).

**Signature move:** hetzelfde gelaagde landschap opent de pagina bij zonsondergang
en sluit hem bij zonsopgang. Vanavond komt de mail binnen, morgen staat het
antwoord klaar. De bezoeker vertelt: "die site waar de zon ondergaat achter de
bomen en als je onderaan bent is hij weer op en is het werk gedaan."

**Gevoelscurve (één regel per akte):**

| # | Akte | Gevoel | Wat het veroorzaakt |
|---|---|---|---|
| 1 | Hero | rust, herkenning | schemering, het einde van een werkdag; de kop komt regel voor regel op |
| 2 | Mailagent | nieuwsgierigheid → vertrouwen | een echte mail, de agent zoekt op en typt; u drukt zelf op versturen |
| 3 | Logo's | geruststelling | vier bedrijven waar dit al draait, geen animatie |
| 4 | Wat hij doet | helderheid | vastgepind, drie punten die één voor één oplichten |
| 5 | Wie | nabijheid | een mens, vrijstaand, geen kader |
| 6 | Projecten | bewijs | de strook reist zijwaarts onder de hand |
| 7 | Aanpak + afspraken | zekerheid, stilte | tekst op ruimte, geen kaarten, geen beweging: de stilte vóór de piek |
| 8 | Dageraad | opluchting | de zon komt op boven hetzelfde landschap; de pagina houdt hier stil |

**Piek:** de dageraad. Hij krijgt de meeste ruimte (halve viewport aan lucht en
land onder de kop) en de stilste akte ervoor.

**Apparaten per akte:** parallax-lagen (hero), live surface (mailagent),
stilstaand (logo's), pin + oplichten (wat hij doet), flow + verschijnen (wie),
pan op scroll (projecten), flow (aanpak, afspraken), parallax-lagen + resolutie
(dageraad). Geen apparaat twee keer achter elkaar.

**Taste-floor toegepast:** eyebrows nog op twee secties, geen drie gelijke
icoonkaarten, geen scroll-pijl, korrel op de luchtgradiënten, Geist in plaats
van Inter, pillen alleen voor knoppen en chips.

**Niet gedaan:** de scroll-craft engine zelf (vanilla `data-sc-*`) is niet
ingebouwd; de site draait op `motion` en had die apparaten al. De
verificatie-harness (`shoot.mjs`) is niet gedraaid; wel handmatige contact
sheets op 1440 en 400 breed.

## Polder als fotolagen (15 september)

De getekende silhouetten zijn vervangen door fotorealistische platen, naar de
referentiefoto (molen links, rietkraag vooraan, water dat de lucht spiegelt):

| Laag | Bestand | Herkomst | Beweging |
|---|---|---|---|
| Lucht + water | `public/polder/lucht-schemer.webp`, `lucht-dageraad.webp` | gegenereerd (Runway, nano-banana-pro), dageraad als variant op dezelfde compositie | diepte 0,06 |
| Molen op de dijk, boerderij, knotwilgen | `public/polder/molen.webp` | gegenereerd op wit, uitgesneden via luminantie (alfa = 1 − helderheid, kleur ontmengd van wit); de dijk vervaagt aan de uiteinden | diepte 0,26, met gespiegelde reflectie in het water |
| Riet | `public/polder/riet.webp` | idem | diepte 0,62, wiegt 0,35° heen en weer |

Segmentatie (SAM) gaf gaten in de roeden en de pluimen; luminantie-keying
op een witte plaat houdt die fijne details heel. Component: `PolderFoto.tsx`.
De bosvariant (`?landschap=bos`) blijft als getekende terugvaloptie bestaan.

### Laagcontract hero (scroll-craft hero-depth, 15 september)

| # | Vlak | Blijft achter bij scroll | Muis | Rol |
|---|---|---|---|---|
| 1 | Lucht en water | 31% | 6 px | verre omgeving |
| 2 | Molen op de dijk + spiegeling | 22% | 12 px | middenvlak links |
| 3 | Nevel over het water | 18%, drijft zelf | 10 px | atmosfeer |
| 4 | Knotwilgen op de nabije oever | 14% | 16 px | middenvlak rechts |
| 5 | Rietkraag | 6% | 22 px | voorgrond |
| 6 | Riet vooraan, onscherp, alleen aan de zijkanten | 0% (rijdt mee) | 34 px | occlusie; het midden blijft open voor de kop |
| – | Kop, subregel, knoppen | 20% | – | het onderwerp: zakt bij scrollen achter het riet weg, zoals het scherm bij fora |

Elk vlak is onder zijn silhouet dichtgevuld; de vloer vervaagt boven alle
lagen naar de pagina. Op telefoons staat het landschap als eigen band onder
de knoppen en zakt de kop niet.

## Hero als 2.5D-scène (15 september, tweede ronde)

De losse platen (lucht, molen, wilgen, riet apart gegenereerd) gaven schaal-
en grondcontactfouten: de dijk hing in de lucht, het riet was te groot. Nu is
er één masterfoto per lichtstand (schemering, dageraad; zelfde compositie) die
met `scripts/polder-lagen.py` in lagen wordt gesplitst:

| Laag | Hoe losgemaakt | Blijft achter bij scroll |
|---|---|---|
| ver (lucht, horizon, water) | de hele foto, achter de andere lagen bijgevuld met interpolatie per rij en een nevelband | 30% |
| dijk (molen, boerderij, wilgen, dijkband, spiegeling) | helderheidsmasker in een venster rond de horizon, gaten gedicht, spiegeling om de waterlijn erbij | 22% |
| nevel | aparte plaat, drijft | 18% |
| riet | Depth Anything V2: diepte ≥ 0,40 en donkerder dan de omgeving | 8% |
| voor (oever, riet vooraan) | diepte ≥ 0,70 | 0% |

Alle lagen zijn hetzelfde canvas en worden identiek geschaald, dus ze liggen
altijd op elkaar. Dieptekaart: Depth Anything V2 Small, lokaal via
transformers. Controles: `scratch/randen.py` (geen lange rechte randen behalve
horizon en waterlijn), Playwright-meting (lucht ≥ 45% van de hero, riet raakt
de knoppen niet, spreiding tussen de lagen ≥ 120 px bij scroll 500).

## Diepte en beweging door de hele site (15 september, derde ronde)

Per sectie één apparaat, nooit twee keer hetzelfde na elkaar:

| Sectie | Apparaat | Diepte |
|---|---|---|
| Hero | vijf fotolagen met verschillende snelheid, kop zakt achter het riet | ja |
| In productie bij | stil (rust na de hero) | nee |
| Wat een agent doet | vastgepind; drie punten lichten op; podium met drie werkbank-fragmenten die naar voren komen en terugwijken | ja: kaarten op drie dieptes |
| Wie | portret met drie snelheden: gloed 60 px, portret 30 px, nevel 40 px tegen | ja |
| Projecten | rail reist zijwaarts; visual in elke kaart schuift 6% tegen de rail in | ja |
| Aanpak | lijn tekent zich met het scrollen, nummers lichten op; kop per woord | nee |
| Afspraken | wipe van links naar rechts, drie na elkaar | nee |
| Ontdek | verschijnen | nee |
| Dageraad | vijf fotolagen bij zonsopgang, resolutie | ja |

Grond: de achtergrondkleur drijft mee met de scroll (warmer bij het portret,
koeler richting de dageraad). Binnenpagina's: gelaagde luchtband boven de kop
(parallax, vervaagt bij scrollen) en secties die opkomen zodra ze in beeld
zijn (`SectieOnthulling`), zonder JavaScript of met reduced motion staat alles er.

Controles: geen horizontale overflow op 400 en 1440 px op twaalf routes;
transforms per `[data-vlak]` op zes scrollposities; reduced motion: alle
h2/p/li zichtbaar na scrollen.
