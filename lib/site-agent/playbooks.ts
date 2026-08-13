// Playbookblokken per paginatype. Wordt achter het systeembericht geplakt.
//
// De sleutel komt uit de request, maar wordt hier tegen een vaste lijst
// gelegd: vrije tekst uit een request komt nooit in de prompt terecht. Een
// onbekende sleutel valt terug op `home`.
//
// De branchenaam wordt evenmin uit de URL overgenomen. Hij wordt opgezocht in
// BRANCHES (lib/data/branches.ts) op basis van het paginapad; staat de branche
// daar niet in, dan gebruiken we het blok zonder branchenaam.

import { BRANCHES } from '@/lib/data/branches';

export const PLAYBOOK_SLEUTELS = ['prijs', 'branche', 'dienst', 'blog', 'cases', 'home'] as const;

export type PlaybookSleutel = (typeof PLAYBOOK_SLEUTELS)[number];

export function isPlaybookSleutel(waarde: string): waarde is PlaybookSleutel {
  return (PLAYBOOK_SLEUTELS as readonly string[]).includes(waarde);
}

const BLOKKEN: Record<PlaybookSleutel, string> = {
  prijs:
    'De bezoeker kijkt naar wat het kost. Hoge koopintentie, maar ook risico dat hij alleen ' +
    'een bedrag wil. Opening: "Je bent aan het kijken wat zoiets kost. Eerlijk: dat hangt zo ' +
    'aan het proces dat een getal hier je zou misleiden. Waar zou je het op inzetten?" Ga snel ' +
    'door naar de drie kernvragen en stuur eerder dan gemiddeld aan op de afspraak.',

  branche:
    'De bezoeker staat op de branchepagina voor [BRANCHE]. Opening: verwijs naar een proces dat ' +
    'in die branche typisch knelt volgens de kennisbank, en vraag of dat bij hen ook zo werkt. ' +
    'Nooit een cijfer of een klantnaam noemen. Vraag: "Herken je dat, of zit de tijd bij jullie ' +
    'ergens anders?"',

  dienst:
    'De bezoeker leest over een specifieke dienst. Opening: "Je leest over deze dienst. Werkt ' +
    'dat bij jullie nu handmatig, of zit er al iets omheen dat het half doet?" De naadvraag ' +
    'werkt hier het beste.',

  blog:
    'Lage koopintentie, meestal oriëntatie. Niet meteen kwalificeren. Opening: "Als je hier een ' +
    'concrete vraag over hebt, stel hem gerust." Pas doorstoten naar de kernvragen als de ' +
    'bezoeker zelf over zijn eigen situatie begint.',

  cases:
    'De bezoeker checkt of je te vertrouwen bent. Opening: "Als je wilt weten hoe dit in de ' +
    'praktijk loopt, vraag maar door. Ik verzin geen resultaten, dus wat ik niet weet zeg ik ' +
    'ook." Speel op openheid, niet op overtuigen.',

  home: 'Onbekende intentie. Opening: "Waar ben je naar op zoek?" Kort houden, laat de bezoeker richting geven.',
};

/** Geeft het playbookblok, met de branchenaam ingevuld als die is meegegeven. */
export function playbookBlok(sleutel: PlaybookSleutel, branche?: string): string {
  const blok = BLOKKEN[sleutel];
  if (sleutel !== 'branche') return blok;
  return blok.replace('[BRANCHE]', branche && branche.length > 0 ? branche : 'deze branche');
}

/**
 * Zoekt het branchelabel op bij een paginapad. Alleen paden die exact matchen
 * met een bekende branche leveren een naam op; alles daarbuiten geeft undefined
 * zodat er niets uit de URL in de prompt kan lekken.
 */
export function brancheUitPad(paginaPad: string): string | undefined {
  const match = paginaPad.match(/^\/branches\/([a-z0-9-]+)\/?$/i);
  if (!match) return undefined;
  const slug = match[1].toLowerCase();
  return BRANCHES.find((b) => b.slug === slug)?.label;
}
