# Hero: wind in de polder

De camera blijft stil. De wieken draaien 100 graden over de scrollhoogte van de hero. De spiegeling draait mee rond hetzelfde geprojecteerde draaipunt. Twee mistbanken bewegen bij omlaag scrollen naar rechts (480 en 760 scènepixels over de herohoogte). Het riet gebruikt de oorspronkelijke fotografische uitsneden en buigt zacht in de wind. Tekst en notitie hebben geen extra scrolltransformatie. De pauzeknop is verwijderd; verminderde beweging blijft gerespecteerd.

## Assets

Gebruikt: ingebouwde imagegen-tool; bestaande originelen behouden. WebP-export via Sharp.

- `public/polder/molen-zonder-wieken.webp`: achtergrond met molenromp, zonder vast ingebakken wieken en voorgrondriet.
- `public/polder/wieken-fotorealistisch.webp`: fotografische houten rotor; wit wordt via multiply-blending opgenomen in het landschap. De SVG verzorgt alleen positionering en rotatie.

### Prompt achtergrond

Edit this exact landscape photograph for a website animation background. Remove ONLY all four windmill sails/blades and their reflected sails in the water. Keep the windmill tower/body/cap and the exact hub location intact, reconstruct the small tower areas behind the blades. Fill removed blade pixels with matching sky/water. Also remove the foreground reeds at the very bottom, filling with matching water; those are animated separately. Absolutely preserve framing, camera, dimensions/aspect, horizon, all buildings, mill body position, color and dusk light, water. No new objects, no movement, no text. Output entire landscape, unchanged composition.

### Prompt wieken

Create a photorealistic photographic cutout asset of ONLY a traditional Dutch wooden windmill's four bare lattice sails/blades attached to a small central wooden axle hub. Exactly four sails at 90 degree intervals, one pointing exactly up, right, down, left. Front elevation, perfectly centered hub at center of square canvas, equal blade lengths, whole rotor visible with 4% margin at tips. Historically realistic Dutch windmill dark weathered wooden beams and delicate thin wooden lattice grid, no cloth, no canvas, no solid paddles. Subtle warm dusk rimlight, dark brown charcoal wood with natural grain and irregularities, high fine photographic detail. Every blade has a long structural beam with narrow lattice on ONE side; identical rotational symmetry. Isolated on perfectly pure WHITE (#FFFFFF) background, pure white showing through all lattice holes. No tower, no landscape, no reflections, no ground shadow, no border, no text. Asset will be composited with multiply blending over a dusk landscape, white must be uniform.

## Controle

Productiebuild inclusief types en lint geslaagd. In de browser zijn veranderende wiekrotaties en afzonderlijk veranderende mist- en riettransformaties vastgesteld. Mobiele compositie bij 390×844 gecontroleerd, zonder horizontale overflow. SVG-rotatie wordt rechtstreeks op de groepen toegepast om het draaipunt van wieken en spiegeling gelijk te houden.

Laatste controle: productiebuild geslaagd. Bij scroll van 0 naar 278,5 pixels verschoof de nabije mist van 5,4 naar 254,4 scènepixels naar rechts; tekst en notitie bleven zonder transform. Fotografisch riet visueel gecontroleerd, pauzeknop afwezig.

## Vaste dijkmist verwijderd

De huidige achtergrond is `public/polder/molen-zonder-vaste-mist.webp`, bewerkt met de ingebouwde imagegen-tool. Alle opvallende mist langs de dijk komt nu uit de verschuivende SVG-groep. Vier losse mistflarden volgen de oever. Browsercontrole: dijkmist verschoof bij scrollen van 5,6 naar 140,6 scènepixels rechts; productiebuild geslaagd.

Prompt: Precisely edit this landscape photograph: REMOVE ALL the stationary low mist/fog/smoke along the entire dike shoreline, especially the pale horizontal strip at the left beneath the house and windmill, and across the center/right shoreline. Restore clear dark grassy/reedy shoreline and clean calm water with reflections where mist was. No fog anywhere in resulting image. Absolutely preserve the EXACT framing, aspect ratio, windmill body position and shape (NO sails), house, trees, sky, sunset colors and all existing reflections. No foreground reeds. This is a registered animation background: do not move or resize ANY object, do not crop, do not add anything. Only remove the shoreline fog. Photorealistic.
