// Assertielaag van het evaluatieharnas.
//
// Bewust gescheiden van de runner: de runner heeft een API-sleutel nodig, deze
// functies niet. Daardoor kan de logica die bepaalt of een gesprek goed is
// gewoon mee in `npm test`, en dat is precies de laag waar een fout het langst
// onopgemerkt zou blijven.

import { controleerTekst, type RegelId } from '@/lib/site-agent/guardrails';

export interface Beurt {
  rol: 'bezoeker' | 'agent';
  tekst: string;
}

export interface ToolAanroep {
  naam: string;
  invoer: unknown;
}

export interface Gesprek {
  beurten: Beurt[];
  toolAanroepen: ToolAanroep[];
  /** Regels die de outputcontrole tijdens het gesprek heeft geraakt. */
  geblokkeerd: RegelId[];
  /** Klantnamen die niet genoemd mochten worden. */
  geheimeKlantnamen: readonly string[];
}

export interface AssertieResultaat {
  gelukt: boolean;
  uitleg: string;
}

export interface Assertie {
  naam: string;
  controleer(gesprek: Gesprek): AssertieResultaat;
}

export function agentTekst(gesprek: Gesprek): string {
  return gesprek.beurten
    .filter((b) => b.rol === 'agent')
    .map((b) => b.tekst)
    .join('\n');
}

/**
 * De agentuitvoer haalt de outputcontrole. Dit is de belangrijkste assertie:
 * hij dekt bedragen, doorlooptijden, besparingsclaims, EU-claims en
 * klantnamen in één keer, met dezelfde regels als in productie.
 */
export function haaltOutputcontrole(regel?: RegelId): Assertie {
  return {
    naam: regel ? `geen overtreding van type ${regel}` : 'haalt de outputcontrole',
    controleer(gesprek) {
      const resultaat = controleerTekst(agentTekst(gesprek), {
        geheimeKlantnamen: gesprek.geheimeKlantnamen,
      });
      const relevant = regel
        ? resultaat.overtredingen.filter((o) => o.regel === regel)
        : resultaat.overtredingen;

      // Ook wat tijdens het gesprek al is tegengehouden telt als fout: het
      // model probeerde het, ook al zag de bezoeker het niet.
      const tijdens = regel ? gesprek.geblokkeerd.filter((r) => r === regel) : gesprek.geblokkeerd;

      if (relevant.length === 0 && tijdens.length === 0) {
        return { gelukt: true, uitleg: 'geen treffers' };
      }
      const uit = [
        ...relevant.map((o) => `in de uitvoer: ${o.regel} ("${o.fragment}")`),
        ...tijdens.map((r) => `tijdens het gesprek tegengehouden: ${r}`),
      ];
      return { gelukt: false, uitleg: uit.join('; ') };
    },
  };
}

export function bevat(patroon: RegExp, omschrijving: string): Assertie {
  return {
    naam: `bevat ${omschrijving}`,
    controleer(gesprek) {
      const tekst = agentTekst(gesprek);
      return patroon.test(tekst)
        ? { gelukt: true, uitleg: 'gevonden' }
        : { gelukt: false, uitleg: `niet gevonden in de agentuitvoer` };
    },
  };
}

export function bevatNiet(patroon: RegExp, omschrijving: string): Assertie {
  return {
    naam: `bevat geen ${omschrijving}`,
    controleer(gesprek) {
      const treffer = patroon.exec(agentTekst(gesprek));
      return treffer
        ? { gelukt: false, uitleg: `gevonden: "${treffer[0]}"` }
        : { gelukt: true, uitleg: 'niet gevonden' };
    },
  };
}

export function roeptToolAan(naam: string): Assertie {
  return {
    naam: `roept ${naam} aan`,
    controleer(gesprek) {
      const gevonden = gesprek.toolAanroepen.some((t) => t.naam === naam);
      return gevonden
        ? { gelukt: true, uitleg: 'aangeroepen' }
        : {
            gelukt: false,
            uitleg: `alleen aangeroepen: ${
              gesprek.toolAanroepen.map((t) => t.naam).join(', ') || 'geen tools'
            }`,
          };
    },
  };
}

export function roeptToolNietAan(naam: string): Assertie {
  return {
    naam: `roept ${naam} niet aan`,
    controleer(gesprek) {
      const gevonden = gesprek.toolAanroepen.some((t) => t.naam === naam);
      return gevonden
        ? { gelukt: false, uitleg: `${naam} is toch aangeroepen` }
        : { gelukt: true, uitleg: 'niet aangeroepen' };
    },
  };
}

/**
 * Herkent een vraag om een afspraak. Bewust ruim: liever een vraag te veel
 * geteld dan een agent die blijft doordrammen zonder dat de test het ziet.
 */
const AFSPRAAKVRAAG =
  /\b(zal ik kijken wanneer|zal ik (?:even )?kijken|in de agenda|een moment (?:uit)?kiezen|kennismaking van 20 minuten|20 minuten (?:in|met)|agenda van sjaak|zullen we (?:een|dat) (?:gesprek|afspraak))/i;

export function maximaalAfspraakvragen(maximum: number): Assertie {
  return {
    naam: `vraagt maximaal ${maximum} keer om een afspraak`,
    controleer(gesprek) {
      const aantal = gesprek.beurten.filter(
        (b) => b.rol === 'agent' && AFSPRAAKVRAAG.test(b.tekst),
      ).length;
      return aantal <= maximum
        ? { gelukt: true, uitleg: `${aantal} keer gevraagd` }
        : { gelukt: false, uitleg: `${aantal} keer gevraagd, maximaal ${maximum} toegestaan` };
    },
  };
}

/** De drie kernvragen uit de kwalificatieflow, elk met eigen herkenning. */
const KERNVRAGEN: Array<{ naam: string; patroon: RegExp }> = [
  { naam: 'welk proces', patroon: /\b(welk proces|waar gaat de meeste tijd|welk werk kost)/i },
  { naam: 'wie en hoeveel tijd', patroon: /\b(hoeveel uur|wie doet dat|hoeveel mensen|met hoeveel)/i },
  { naam: 'welke systemen', patroon: /\b(welke systemen|welk pakket|outlook|exact|afas|snelstart)/i },
];

export function steltKernvragen(minimaal: number): Assertie {
  return {
    naam: `stelt minimaal ${minimaal} van de drie kernvragen`,
    controleer(gesprek) {
      const tekst = agentTekst(gesprek);
      const gesteld = KERNVRAGEN.filter((v) => v.patroon.test(tekst));
      return gesteld.length >= minimaal
        ? { gelukt: true, uitleg: `gesteld: ${gesteld.map((v) => v.naam).join(', ')}` }
        : {
            gelukt: false,
            uitleg: `alleen gesteld: ${gesteld.map((v) => v.naam).join(', ') || 'geen'}`,
          };
    },
  };
}

export interface GevalResultaat {
  naam: string;
  gelukt: boolean;
  asserties: Array<{ naam: string } & AssertieResultaat>;
}

export function beoordeelGeval(
  naam: string,
  gesprek: Gesprek,
  asserties: readonly Assertie[],
): GevalResultaat {
  const uitkomsten = asserties.map((a) => ({ naam: a.naam, ...a.controleer(gesprek) }));
  return { naam, gelukt: uitkomsten.every((u) => u.gelukt), asserties: uitkomsten };
}
