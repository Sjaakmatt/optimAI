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
