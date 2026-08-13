// Eén plek die bepaalt of de pagina achter een venster mag scrollen.
//
// Waarom niet gewoon per venster `document.body.style.overflow` opslaan en
// terugzetten: dat werkt alleen zolang er nooit twee vensters tegelijk open
// staan. Overlappen ze, dan gaat het stuk, en het gaat stil stuk:
//
//   1. Agenda opent  → onthoudt '',       zet 'hidden'
//   2. Menu opent    → onthoudt 'hidden', zet 'hidden'
//   3. Agenda sluit  → zet terug naar ''  → de pagina scrollt achter het menu
//   4. Menu sluit    → zet terug naar 'hidden'  → scrollen blijft kapot
//
// Na stap 4 helpt alleen een refresh. Dat is bereikbaar in het echt: de
// agendaknop staat óók in het mobiele menu.
//
// Deze teller lost het op door de vraag om te draaien. Niet "wat stond er toen
// ik openging", maar "is er nog iets open". De oorspronkelijke waarde wordt één
// keer bewaard, bij het eerste slot, en pas teruggezet als het laatste venster
// dicht is.

let diepte = 0;
let oorspronkelijk: string | null = null;

/**
 * Zet het scrollslot erop. Geeft de functie terug die het er weer af haalt.
 *
 * Bedoeld voor gebruik in een effect-cleanup:
 *
 *     useEffect(() => vergrendelScroll(), []);
 *
 * Twee keer ontgrendelen vanuit hetzelfde slot telt maar één keer, zodat een
 * dubbel aangeroepen cleanup de teller niet onder nul trekt en het slot niet te
 * vroeg loslaat.
 */
export function vergrendelScroll(): () => void {
  if (typeof document === 'undefined') return () => {};

  if (diepte === 0) oorspronkelijk = document.body.style.overflow;
  diepte += 1;
  document.body.style.overflow = 'hidden';

  let losgelaten = false;
  return () => {
    if (losgelaten) return;
    losgelaten = true;
    diepte = Math.max(0, diepte - 1);
    if (diepte > 0) return;
    document.body.style.overflow = oorspronkelijk ?? '';
    oorspronkelijk = null;
  };
}

/** Alleen voor tests: brengt de module terug naar de begintoestand. */
export function _herstelVoorTest(): void {
  diepte = 0;
  oorspronkelijk = null;
}

/** Alleen voor tests: hoeveel vensters houden het slot nu vast. */
export function _diepte(): number {
  return diepte;
}
