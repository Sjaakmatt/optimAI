// Kennisbank van de site-agent: losse markdownbestanden in content/site-agent/
// die samen het feitelijke fundament onder de agent vormen. Alles wat de agent
// beweert moet hierin terug te vinden zijn; wat hier niet staat, zegt hij niet.
//
// Voor versie één laden we de hele publieke kennisbank in het systeembericht,
// met prompt caching op dat blok. Bij dit volume is dat goedkoper en
// betrouwbaarder dan retrieval. Groeit de kennisbank boven de 30.000 tokens,
// dan waarschuwt deze module en moeten we retrieval bespreken.
//
// Twee dingen zijn hier bewust in code geregeld in plaats van in de prompt:
//
//   1. Klantnamen. Een klantblok komt alleen in de context als de klant in de
//      frontmatter op `publiekTeNoemen: true` staat. Staat de vlag op false of
//      ontbreekt de klant in de frontmatter, dan wordt het blok eruit geknipt
//      en komt de naam op de blokkeerlijst voor de outputcontrole. Fail closed.
//   2. Redactie-notities. HTML-commentaar wordt verwijderd, zodat er interne
//      aantekeningen in de bestanden kunnen staan die de agent nooit ziet.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const KENNISBANK_MAP = join(process.cwd(), 'content', 'site-agent');

/** Boven deze grens is alles-in-context niet meer verstandig. */
export const TOKEN_WAARSCHUWINGSGRENS = 30_000;

/** Ruwe schatting: Nederlands proza zit rond de 3,5 tekens per token. */
const TEKENS_PER_TOKEN = 3.5;

export interface KlantVlag {
  naam: string;
  publiekTeNoemen: boolean;
}

export interface KennisBlok {
  id: string;
  publiek: boolean;
  laatstBijgewerkt: string;
  inhoud: string;
}

export interface Kennisbank {
  blokken: KennisBlok[];
  /** De samengestelde tekst zoals die in het systeembericht komt. */
  tekst: string;
  /** Namen die de agent mag noemen. */
  publiekeKlantnamen: string[];
  /** Namen die de outputcontrole moet blokkeren. */
  geheimeKlantnamen: string[];
  tekens: number;
  geschatteTokens: number;
}

interface Frontmatter {
  scalars: Record<string, string>;
  klanten: KlantVlag[];
}

interface GesplitstBestand {
  frontmatter: Frontmatter;
  body: string;
}

const FRONTMATTER_PATROON = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const KLANTBLOK_PATROON = /<!--\s*klant:\s*([^>]*?)\s*-->([\s\S]*?)<!--\s*\/klant\s*-->/g;
const HTML_COMMENTAAR = /<!--[\s\S]*?-->/g;

/**
 * Frontmatter-parser voor de subset die wij gebruiken: scalaire sleutels plus
 * één lijst van objecten (`klanten`). Bewust geen volledige YAML-parser, dat
 * zou een dependency zijn voor vier veldtypes. Onbekende structuren worden
 * genegeerd in plaats van geraden.
 */
function parseFrontmatter(raw: string): Frontmatter {
  const scalars: Record<string, string> = {};
  const klanten: KlantVlag[] = [];
  let inKlantenlijst = false;

  for (const regel of raw.split(/\r?\n/)) {
    if (!regel.trim() || regel.trim().startsWith('#')) continue;

    const inspringing = regel.length - regel.trimStart().length;
    const inhoud = regel.trim();

    if (inspringing === 0) {
      inKlantenlijst = false;
      const scheiding = inhoud.indexOf(':');
      if (scheiding === -1) continue;
      const sleutel = inhoud.slice(0, scheiding).trim();
      const waarde = inhoud.slice(scheiding + 1).trim();
      if (sleutel === 'klanten' && waarde === '') {
        inKlantenlijst = true;
        continue;
      }
      scalars[sleutel] = ontdoeVanQuotes(waarde);
      continue;
    }

    if (!inKlantenlijst) continue;

    // "- naam: Pavo" start een nieuw item, "  publiekTeNoemen: false" vult aan.
    const isNieuwItem = inhoud.startsWith('- ');
    const paar = isNieuwItem ? inhoud.slice(2).trim() : inhoud;
    const scheiding = paar.indexOf(':');
    if (scheiding === -1) continue;
    const sleutel = paar.slice(0, scheiding).trim();
    const waarde = ontdoeVanQuotes(paar.slice(scheiding + 1).trim());

    if (isNieuwItem) klanten.push({ naam: '', publiekTeNoemen: false });
    const huidig = klanten[klanten.length - 1];
    if (!huidig) continue;
    if (sleutel === 'naam') huidig.naam = waarde;
    if (sleutel === 'publiekTeNoemen') huidig.publiekTeNoemen = waarde === 'true';
  }

  return { scalars, klanten };
}

function ontdoeVanQuotes(waarde: string): string {
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

function splitsBestand(ruw: string): GesplitstBestand {
  const match = ruw.match(FRONTMATTER_PATROON);
  if (!match) {
    return { frontmatter: { scalars: {}, klanten: [] }, body: ruw };
  }
  return {
    frontmatter: parseFrontmatter(match[1]),
    body: ruw.slice(match[0].length),
  };
}

interface KlantFilterResultaat {
  body: string;
  publiek: string[];
  geheim: string[];
}

/**
 * Knipt klantblokken weg waarvan de naam niet expliciet als publiek te noemen
 * is gemarkeerd. Een blok zonder bijbehorende frontmatter-vlag geldt als
 * geheim: liever een blok te veel weggelaten dan een naam te veel genoemd.
 */
function filterKlantblokken(body: string, vlaggen: KlantVlag[]): KlantFilterResultaat {
  const publiek: string[] = [];
  const geheim: string[] = [];

  const vlagPerNaam = new Map<string, boolean>();
  for (const vlag of vlaggen) {
    if (!vlag.naam) continue;
    vlagPerNaam.set(vlag.naam.toLowerCase(), vlag.publiekTeNoemen);
  }

  const gefilterd = body.replace(KLANTBLOK_PATROON, (_geheel, naamRuw: string, inhoud: string) => {
    const naam = naamRuw.trim();
    const magPubliek = vlagPerNaam.get(naam.toLowerCase()) === true;
    if (magPubliek) {
      publiek.push(naam);
      return inhoud;
    }
    geheim.push(naam);
    return '';
  });

  // Namen die wel in de frontmatter staan maar (nog) geen blok hebben, tellen
  // ook mee: staat de vlag op false, dan mag de naam sowieso niet vallen.
  for (const vlag of vlaggen) {
    if (!vlag.naam) continue;
    if (vlag.publiekTeNoemen) {
      if (!publiek.includes(vlag.naam)) publiek.push(vlag.naam);
    } else if (!geheim.includes(vlag.naam)) {
      geheim.push(vlag.naam);
    }
  }

  return { body: gefilterd, publiek, geheim };
}

function normaliseerWitregels(tekst: string): string {
  return tekst.replace(/\n{3,}/g, '\n\n').trim();
}

function leesBestanden(): string[] {
  return readdirSync(KENNISBANK_MAP)
    .filter((naam) => naam.endsWith('.md'))
    .sort();
}

function bouwKennisbank(): Kennisbank {
  const blokken: KennisBlok[] = [];
  const publiekeKlantnamen = new Set<string>();
  const geheimeKlantnamen = new Set<string>();

  for (const bestandsnaam of leesBestanden()) {
    const ruw = readFileSync(join(KENNISBANK_MAP, bestandsnaam), 'utf8');
    const { frontmatter, body } = splitsBestand(ruw);

    const id = frontmatter.scalars.id ?? bestandsnaam.replace(/\.md$/, '');
    const publiek = frontmatter.scalars.publiek === 'true';
    const laatstBijgewerkt = frontmatter.scalars.laatstBijgewerkt ?? 'onbekend';

    // Klantnamen verzamelen we uit álle bestanden, ook uit niet-publieke, zodat
    // de outputcontrole ze hoe dan ook kent.
    const gefilterd = filterKlantblokken(body, frontmatter.klanten);
    for (const naam of gefilterd.publiek) publiekeKlantnamen.add(naam);
    for (const naam of gefilterd.geheim) geheimeKlantnamen.add(naam);

    if (!publiek) continue;

    const inhoud = normaliseerWitregels(gefilterd.body.replace(HTML_COMMENTAAR, ''));
    if (!inhoud) continue;

    blokken.push({ id, publiek, laatstBijgewerkt, inhoud });
  }

  const tekst = blokken
    .map((blok) => `## Kennisbank: ${blok.id}\n(bijgewerkt ${blok.laatstBijgewerkt})\n\n${blok.inhoud}`)
    .join('\n\n---\n\n');

  const tekens = tekst.length;
  const geschatteTokens = Math.round(tekens / TEKENS_PER_TOKEN);

  if (geschatteTokens > TOKEN_WAARSCHUWINGSGRENS) {
    console.warn(
      `[site-agent] kennisbank is ongeveer ${geschatteTokens} tokens en daarmee groter dan ` +
        `de grens van ${TOKEN_WAARSCHUWINGSGRENS}. Alles-in-context wordt duur; tijd om ` +
        'retrieval te bespreken.',
    );
  }

  return {
    blokken,
    tekst,
    publiekeKlantnamen: [...publiekeKlantnamen],
    geheimeKlantnamen: [...geheimeKlantnamen],
    tekens,
    geschatteTokens,
  };
}

let cache: Kennisbank | null = null;

/**
 * De kennisbank, één keer gelezen per serverinstantie. In development lezen we
 * elke keer opnieuw, zodat een wijziging in een markdownbestand meteen zichtbaar
 * is zonder herstart.
 */
export function laadKennisbank(): Kennisbank {
  if (process.env.NODE_ENV === 'development') return bouwKennisbank();
  if (!cache) cache = bouwKennisbank();
  return cache;
}

/** Alleen voor tests: dwing een herlezing af. */
export function leegKennisbankCache(): void {
  cache = null;
}
