# Immersive redesign — september 2026

## Visuele richting

Een rustige Nederlandse schemerwereld, met leigrijs, grijsgroen, mauve en warm kalkwit. De homepage wisselt atmosferische landschappen af met glas, een uitgesneden portret en lichte projectkaarten. Serif accenten geven de grote koppen een persoonlijk karakter.

Fora (https://fora.so) was de referentie voor de rustige typografie, atmosferische overgangen en gelaagde compositie. De bestaande eigen landschapsbeelden blijven behouden; er zijn geen beeldbestanden van de referentiesite overgenomen.

## Beweging en interactie

- De hero gebruikt één intacte landschapsplaat. De molen, horizon en reflecties kunnen niet meer uit elkaar schuiven. Het landschap beweegt maximaal 64 px; de voorste notitie beweegt 34 px in de andere richting.
- Het slotlandschap meet zijn eigen positie in de pagina en beweegt maximaal 48 px. Het reageert niet meer op de globale scrollpositie bovenaan de homepage.
- De achtergrondkleur wordt niet meer bij elke scrollbeweging op het root-element herschreven.
- De twee secties van 260 schermprocent met vastgepinde inhoud zijn vervangen door natuurlijke secties en een interactief werkvoorbeeld.
- Video’s scrollen horizontaal via trackpad, touch, knoppen of pijltoetsen. Verticale paginascroll wordt niet onderschept.
- Video’s laden pas na een bewuste afspeelactie. Er is één speler tegelijk. Escape en de sluitknop verwijderen de speler en herstellen de focus.
- Reduced motion schakelt de landschapsbeweging en hovertransities uit; de inhoud blijft beschikbaar.
- De chatknop blijft aanwezig. Op de homepage verschijnt de automatische uitnodiging niet meer over het ontwerp.

## Video’s toevoegen

1. Exporteer een verticale H.264 MP4 met AAC-audio, bij voorkeur 720 × 1280 en `faststart`.
2. Zet de webversie en een JPG-poster in `public/videos/`.
3. Voeg een item toe aan `lib/data/videos.ts`: `id`, `title`, `category`, `duration`, `src`, `poster`.
4. Controleer de poster, afspeelduur en eventuele ingebakken ondertiteling in de browser.

De vier huidige clips komen uit de door Sjaak aangewezen map `videos_socials/Archief`. De originele bestanden zijn niet gewijzigd. De webversies beslaan samen circa 27 MB, tegenover circa 309 MB voor de bronnen. Die 27 MB wordt niet bij het openen van de homepage geladen.

## Bestanden

- `app/home.css`: homepagecompositie, kleurvlakken, kaarten en responsieve stijlen.
- `app/globals.css`: gedeelde kleuren voor de binnenpagina’s.
- `components/home/Hero.tsx` en `Dageraad.tsx`: intacte landschappen met beperkte beweging.
- `components/home/VideoCarousel.tsx`: videocarrousel en toegankelijke dialoog.
- `components/home/WatHijDoet.tsx`: drie interactieve voorbeelden, ook via toetsenbord.
- `components/home/Projecten.tsx`: projectoverzicht met gelaagde illustraties.

De agenda-loader is gecorrigeerd naar de `init`-instructie. Boekingslinks worden vóór de Next-router afgehandeld, zodat één klik niet twee Cal-vensters opent. De externe Cal-dienst en de beschikbaarheid van afspraken blijven afhankelijk van de bestaande configuratie en verbinding.

## Uitgevoerde controles

- Productiebuild: geslaagd, 191 pagina’s gegenereerd; TypeScript en lintcontrole geslaagd.
- Bestaande tests: 129 geslaagd, 0 mislukt.
- Browser: desktop, 768 px tablet, 390 px mobiel en 320 px smal mobiel visueel gecontroleerd.
- Alle vier MP4’s bereiken `readyState=4` in de productiepreview, zonder mediafout.
- Sluitknop, Escape, focusherstel, horizontaal scrollen en de interactieve werkvoorbeelden gecontroleerd.
- Geen horizontale documentoverflow op de gecontroleerde schermbreedtes.
- Cal-klik opent één iframe en houdt de huidige route vast. De externe agenda-inhoud bleef in deze browseromgeving laden; een daadwerkelijke boeking is niet uitgevoerd.

De productiepreview draait lokaal via `npm run start -- --hostname 127.0.0.1 --port 3100`. De wijzigingen staan op `codex/immersive-redesign`; er is niet naar GitHub of productie gepubliceerd.

## Videobibliotheek en casecarrousel

- `/videos` toont alle items uit `lib/data/videos.ts`, met zoeken op titel en categorie. Homepage en bibliotheek gebruiken dezelfde kaarten en videospeler. Nieuwe items in de gedeelde lijst verschijnen op beide plekken; alleen bestanden in de lokale archiefmap zetten importeert ze nog niet.
- De homepage en footer linken naar het complete video-overzicht; de route staat ook in de sitemap.
- Cases staan in een horizontale carrousel met pijlen, swipe, scroll-snap en toetsenbordbediening. De hoogtes verspringen 70 px op desktop en 40 px op mobiel. De gekantelde illustraties zijn behouden.
- De achtergrond van de cases is nu een gedempt saliegroen verloop.
- Gecontroleerd: productiebuild inclusief lint/TypeScript; zoekresultaat en lege zoekopdracht, afspelen na filteren en focusherstel; desktop- en mobiele weergave van bibliotheek en carrousel.

## Scrollverhalen en covers (vervolg)

- De praktijkvoorbeelden wisselen tijdens normaal verticaal scrollen. De scène blijft onder de header staan zolang deze volledig in het venster past; tabs en toetsenbord blijven beschikbaar.
- Het persoonlijke deel begint met Sjaak en wisselt vervolgens naar Danny, met diens bestaande foto en profielgegevens.
- `useScrollSteps` meet de scènehoogte met ResizeObserver. Op korte schermen en bij verminderde beweging vervalt het vastzetten en is de inhoud via de tabs bereikbaar. De vaste headerafstand wordt onafhankelijk van de actieve CSS-modus gemeten om schakelen rond de hoogtegrens te voorkomen.
- Onderkant team en bovenkant cases zijn beide afgerond (38 px desktop, 24 px mobiel), met een smalle tussenruimte.
- Herohoogte: 850 px desktop, 780 px mobiel; het landschap begint hoger zodat er minder lucht overblijft.
- Nieuwe covers komen uit de bestaande MP4’s: kennismaken 37,7 s, mail 52,15 s, audit 1,5 s, AI-angst 54,5 s. Nieuwe bestandsnamen voorkomen verouderde afbeeldingscaches. De afspeelknop staat naast het gezicht.
- Productiebuild inclusief lint en TypeScript geslaagd. Visueel gecontroleerd op desktop en 390 × 844; scrollwissels voor voorbeelden en team bevestigd. Bij 320 × 640 schakelt de vaste scène uit; geen horizontale documentoverflow. Geen browserfouten of waarschuwingen.

## Gelijke vrijstaande teamportretten

- Sjaaks portret is vervangen door de aangeleverde `IMG_6435.jpeg`; Danny gebruikt zijn bestaande originele foto.
- Na expliciet akkoord zijn beide achtergronden lokaal verwijderd met Apple Vision (`VNGenerateForegroundInstanceMaskRequest`), met behoud van de oorspronkelijke fotografie. De gegenereerde imagegen-pogingen zijn niet gebruikt omdat deze geen echte transparantie bevatten.
- Definitieve assets: `public/sjaak-portrait-cutout.webp` en `public/danny-portrait-cutout.webp`, lossless WebP met gecontroleerd alfakanaal (0–255).
- Beide homepageportretten gebruiken dezelfde transparante opmaak en vervaging; het kader van Danny is verwijderd. De gedeelde teamgegevens gebruiken dezelfde nieuwe assets op de over-ons- en profielpagina’s.
- Productiebuild inclusief lint en TypeScript geslaagd. Beide afbeeldingen geladen en op desktop/mobiel visueel gecontroleerd; geen horizontale overloop.

## Meer diepte in de hero

De hero gebruikt opnieuw vier bestaande polderlagen: verte, dijk, riet en voorgrond. Lokale scrollvoortgang wordt met een gedempte veer afgevlakt; iedere laag heeft een begrensde eigen verplaatsing. De verte en dijk bewegen vrijwel gelijk om de spiegeling te behouden. De voorgrond staat hoger in beeld. Muisbeweging geeft op desktop een kleine extra verschuiving; touch wordt niet onderschept. Zachte nevel beweegt alleen wanneer de hero zichtbaar is. Bij verminderde beweging blijven alle lagen stil.

Gecontroleerd: productiebuild (inclusief types/lint), desktop voor en na scrollen, mobiel 390×844 zonder horizontale overflow, vier verschillende scrolltransformaties en geen browserfouten tijdens die controle.

### Ook beweging zonder interactie

Na feedback dat de beweging nauwelijks zichtbaar was: een doorlopende camerabeweging (2–8% zoom in 12 seconden), onafhankelijk wiegend voorgrondriet en snellere nevel toegevoegd. De pauzeknop stopt alle beweging; de voorkeur voor verminderde beweging blijft gerespecteerd. In de browser zijn verschillende transformaties gemeten zonder scrollen en pauzeren/hervatten gecontroleerd. Productiebuild geslaagd.

De bovenstaande camera- en lagenproeven zijn vervangen door afzonderlijke objectanimaties: fotografische wieken, mistbanken en riet. Zie `docs/hero-wind-assets.md` voor de huidige uitvoering en assetprompts.
