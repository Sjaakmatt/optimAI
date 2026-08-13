// Frontmatter-parser voor de subset die de site-agent gebruikt: scalaire
// sleutels plus één lijst van objecten. Bewust geen volledige YAML-parser, dat
// zou een dependency zijn voor vier veldtypes. Onbekende structuren worden
// genegeerd in plaats van geraden.
//
// Gedeeld door de kennisbank en de playbooks.

export interface Frontmatter {
  scalars: Record<string, string>;
  /** Enige ondersteunde lijst: objecten onder een sleutel op inspringniveau. */
  lijst: { sleutel: string; items: Record<string, string>[] };
}

export interface GesplitstBestand {
  frontmatter: Frontmatter;
  body: string;
}

const FRONTMATTER_PATROON = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function ontdoeVanQuotes(waarde: string): string {
  const bijgesneden = waarde.trim();
  if (bijgesneden.length >= 2) {
    const eerste = bijgesneden[0];
    const laatste = bijgesneden[bijgesneden.length - 1];
    if ((eerste === '"' || eerste === "'") && eerste === laatste) {
      return bijgesneden.slice(1, -1);
    }
  }
  return bijgesneden;
}

export function parseFrontmatter(ruw: string): Frontmatter {
  const scalars: Record<string, string> = {};
  const lijst: Frontmatter['lijst'] = { sleutel: '', items: [] };
  let inLijst = false;

  for (const regel of ruw.split(/\r?\n/)) {
    if (!regel.trim() || regel.trim().startsWith('#')) continue;

    const inspringing = regel.length - regel.trimStart().length;
    const inhoud = regel.trim();

    if (inspringing === 0) {
      inLijst = false;
      const scheiding = inhoud.indexOf(':');
      if (scheiding === -1) continue;
      const sleutel = inhoud.slice(0, scheiding).trim();
      const waarde = inhoud.slice(scheiding + 1).trim();
      if (waarde === '') {
        inLijst = true;
        lijst.sleutel = sleutel;
        continue;
      }
      scalars[sleutel] = ontdoeVanQuotes(waarde);
      continue;
    }

    if (!inLijst) continue;

    // "- naam: Pavo" start een nieuw item, "  vlag: false" vult aan.
    const isNieuwItem = inhoud.startsWith('- ');
    const paar = isNieuwItem ? inhoud.slice(2).trim() : inhoud;
    const scheiding = paar.indexOf(':');
    if (scheiding === -1) continue;

    if (isNieuwItem) lijst.items.push({});
    const huidig = lijst.items[lijst.items.length - 1];
    if (!huidig) continue;
    huidig[paar.slice(0, scheiding).trim()] = ontdoeVanQuotes(paar.slice(scheiding + 1).trim());
  }

  return { scalars, lijst };
}

export function splitsBestand(ruw: string): GesplitstBestand {
  const match = ruw.match(FRONTMATTER_PATROON);
  if (!match) {
    return { frontmatter: { scalars: {}, lijst: { sleutel: '', items: [] } }, body: ruw };
  }
  return { frontmatter: parseFrontmatter(match[1]), body: ruw.slice(match[0].length) };
}
