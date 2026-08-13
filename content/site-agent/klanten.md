---
id: klanten
publiek: true
laatstBijgewerkt: 2026-08-13
klanten:
  - naam: Pavo
    publiekTeNoemen: false
  - naam: TEKA Kranen
    publiekTeNoemen: false
---

<!--
REDACTIE-NOTITIE, komt niet in de context van de agent.

Alles staat op false, zoals afgesproken. Zet een klant pas op true als je
expliciet toestemming hebt om de naam in een gesprek te laten vallen. Beide
klanten hieronder staan al met naam en logo op factumai.nl/cases, dus de
toestemming ligt er waarschijnlijk al; de vlag is bewust alsnog false zodat het
jouw beslissing is en niet die van mij.

Hoe het filter werkt: een klantblok waarvan publiekTeNoemen op false staat wordt
volledig uit de context geknipt voordat de prompt wordt opgebouwd, en de naam
komt op de blokkeerlijst van de outputcontrole. De agent kan de naam dus niet
noemen, ook niet als de bezoeker hem zelf noemt of erom vraagt. Dat is een
filter in code, geen instructie in de prompt.

Zet er nooit resultaatcijfers, doorlooptijden of besparingen bij, ook niet bij
een klant die op true staat. De outputcontrole blokkeert die alsnog en dan komt
het gesprek stil te liggen op een zin die jij hier hebt neergezet.
-->

# Referenties

Als iemand naar klanten of referenties vraagt en er staat niemand op publiek te
noemen, dan is het antwoord open en zonder omhaal:

"Ik noem geen klantnamen uit mezelf, want daar wil ik eerst toestemming voor
hebben. Sjaak vertelt je in het gesprek graag bij welke bedrijven dit draait en
wat er precies is gebouwd."

Dat is geen ontwijking maar consequent gedrag: hetzelfde principe waarom de
agent ook geen bedragen noemt.

Wat wel gezegd mag worden zonder namen: FactumAI heeft agents in productie
draaien bij Nederlandse bedrijven, in uiteenlopende branches. Details van een
opdracht komen van Sjaak.

<!-- klant: Pavo -->

# Pavo

HR-dienstverlening aan Nederlandse bedrijven. Sales liep bedrijf voor bedrijf
per regio handmatig door: past dit bij ons profiel, is er mogelijk HR-behoefte,
wie is de juiste contactpersoon. Die signalen zaten verspreid over meerdere
bronnen en het proces was niet schaalbaar.

Er is een lead-agent gebouwd. Sales selecteert een gebied op een kaart, de agent
doorzoekt dat gebied op bedrijven die matchen met het klantprofiel, verzamelt per
bedrijf de signalen die op HR-behoefte wijzen en zoekt de juiste contactpersoon
erbij. Sales krijgt een samengestelde set leads en doet het gesprek in plaats van
het zoekwerk. Draait in productie.

<!-- /klant -->

<!-- klant: TEKA Kranen -->

# TEKA Kranen

Kraanverhuur en inspectie. Het rapportageproces was een keten van dubbel werk:
op locatie een foto maken, terug op kantoor uitprinten, met de hand notities op
de print, dan alles nogmaals digitaal uittekenen in het interne systeem, en tot
slot in een Word-template plakken. Voor elke inspectie opnieuw.

Dat is samen met TEKA in één digitale flow gebracht. De inspecteur maakt de foto
op locatie via een tablet en zet de annotaties direct op die foto. De agent vult
het inspectierapport vooraf in met foto, annotaties en meta-data, en het rapport
gaat rechtstreeks naar de werkvoorbereider. Draait in productie.

<!-- /klant -->
