// Playbookblokken per paginatype, uit content/site-agent/playbooks/.
//
// Het blok wordt achter het systeembericht geplakt, buiten het gecachte deel,
// zodat alle pagina's dezelfde cache-prefix delen.
//
// Twee dingen komen nooit ongefilterd uit de request in de prompt:
//
//   1. De sleutel wordt server-side uit het paginapad afgeleid
//      (pad-naar-playbook.ts) en tegen een vaste lijst gelegd. Een onbekend pad
//      valt terug op `home`.
//   2. De branchenaam komt uit BRANCHES (lib/data/branches.ts), opgezocht op de
//      slug in het pad. Staat de branche daar niet in, dan gebruiken we het blok
//      zonder naam.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { BRANCHES } from '@/lib/data/branches';
import { splitsBestand } from './frontmatter';
import { playbookVoorPad, type PlaybookPad } from './pad-naar-playbook';

const PLAYBOOK_MAP = join(process.cwd(), 'content', 'site-agent', 'playbooks');

export const PLAYBOOK_SLEUTELS = ['prijs', 'branche', 'dienst', 'blog', 'cases', 'home'] as const;

export type PlaybookSleutel = PlaybookPad;

export function isPlaybookSleutel(waarde: string): waarde is PlaybookSleutel {
  return (PLAYBOOK_SLEUTELS as readonly string[]).includes(waarde);
}

const cache = new Map<PlaybookSleutel, string>();

function leesBlok(sleutel: PlaybookSleutel): string {
  const gecached = cache.get(sleutel);
  if (gecached !== undefined && process.env.NODE_ENV !== 'development') return gecached;

  const ruw = readFileSync(join(PLAYBOOK_MAP, `${sleutel}.md`), 'utf8');
  const { body } = splitsBestand(ruw);
  const tekst = body.replace(/<!--[\s\S]*?-->/g, '').replace(/\n{3,}/g, '\n\n').trim();

  cache.set(sleutel, tekst);
  return tekst;
}

/** Geeft het playbookblok, met de branchenaam ingevuld als die is meegegeven. */
export function playbookBlok(sleutel: PlaybookSleutel, branche?: string): string {
  const blok = leesBlok(sleutel);
  if (sleutel !== 'branche') return blok;
  return blok.replace('[BRANCHE]', branche && branche.length > 0 ? branche : 'deze branche');
}

/**
 * Zoekt het branchelabel op bij een paginapad. Alleen paden die matchen met een
 * bekende branche leveren een naam op; alles daarbuiten geeft undefined, zodat
 * er niets uit de URL in de prompt kan lekken.
 */
export function brancheUitPad(paginaPad: string): string | undefined {
  const match = paginaPad.match(/^\/branches\/([a-z0-9-]+)\/?$/i);
  if (!match) return undefined;
  const slug = match[1].toLowerCase();
  return BRANCHES.find((b) => b.slug === slug)?.label;
}

/**
 * De sleutel voor dit paginapad. Dit is de bron van waarheid; wat de client
 * meestuurt wordt genegeerd.
 */
export function playbookVoorPagina(paginaPad: string): PlaybookSleutel {
  return playbookVoorPad(paginaPad);
}
