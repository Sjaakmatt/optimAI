// Outputcontrole van de site-agent. Een prompt is een verzoek, geen garantie:
// alles wat de agent absoluut niet mag zeggen wordt hier in de uitvoer
// gecontroleerd, voordat er een letter bij de bezoeker komt.
//
// Streaming: we bufferen per zin en geven een zin pas door nadat hij is
// gecontroleerd. De keuze voor zinsniveau boven "hele respons controleren en
// dan pas streamen" is bewust. Per zin blijft het gesprek leven (de bezoeker
// ziet de tekst opbouwen) terwijl er nooit een geblokkeerde zin op het scherm
// verschijnt die we daarna zouden moeten terugtrekken. Nadeel is dat een
// overtreding die over twee zinnen heen loopt pas bij de tweede zin opvalt; de
// eerste zin is dan al verzonden. Daarom draait `controleerTekst` aan het eind
// nog een keer over de volledige respons, als vangnet voor de opslag en de
// meting.
//
// Bij een treffer: het bericht niet tonen, één keer opnieuw genereren met een
// systeemnotitie die zegt wat er misging, en bij een tweede treffer terugvallen
// op VEILIGE_TERUGVAL.

export type RegelId = 'bedrag' | 'doorlooptijd' | 'besparing' | 'eu_claim' | 'klantnaam';

export interface Overtreding {
  regel: RegelId;
  /** Korte Nederlandse uitleg; gaat naar blokReden, het event en de hergeneratie. */
  reden: string;
  /** Het stuk tekst dat de regel raakte, voor de meting in de werkbak. */
  fragment: string;
}

export interface ControleResultaat {
  toegestaan: boolean;
  overtredingen: Overtreding[];
}

export interface ControleOpties {
  /** Klantnamen die niet publiek genoemd mogen worden, uit de kennisbank. */
  geheimeKlantnamen?: readonly string[];
}

/** De vaste tekst waarop we terugvallen als ook de hergeneratie de controle niet haalt. */
export const VEILIGE_TERUGVAL =
  'Daar wil ik niet naar gokken. Ik leg het voor aan Sjaak, dan heb je morgen een antwoord ' +
  'dat klopt. Op welk mailadres mag dat?';

// Nederlandse telwoorden en hoeveelheidsaanduidingen. "een paar" en "enkele"
// horen erbij, want "een paar duizend euro" en "zo'n twee weken" zijn precies
// de formuleringen waarmee een model een hard getal probeert te ontwijken.
const HOEVEELHEID =
  '\\d+(?:[.,]\\d+)?|een|één|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf|twaalf|' +
  'dertien|veertien|vijftien|zestien|zeventien|achttien|negentien|twintig|dertig|veertig|' +
  'vijftig|zestig|zeventig|tachtig|negentig|honderd|paar|enkele|aantal';

interface Regel {
  id: RegelId;
  reden: string;
  patroon: RegExp;
  /**
   * Optionele uitzondering: als deze op de directe omgeving van de treffer past,
   * telt de treffer niet. Nodig omdat sommige toegestane zinnen dezelfde woorden
   * gebruiken als de verboden variant.
   */
  uitzondering?: RegExp;
}

const OMGEVING_TEKENS = 45;

const REGELS: Regel[] = [
  {
    id: 'bedrag',
    reden: 'noemt een bedrag of een geldbedrag-aanduiding',
    patroon: new RegExp(`€|\\bEUR\\b|\\beuro'?s?\\b|\\b\\d+(?:[.,]\\d+)?\\s*k\\b|\\b(?:${HOEVEELHEID})\\s+duizend\\b|\\bduizenden\\b`, 'i'),
  },
  {
    id: 'doorlooptijd',
    reden: 'doet een toezegging over doorlooptijd',
    // Eenheden waarin een opleverbelofte wordt uitgedrukt. "dagen" en "jaar"
    // staan er bewust niet bij: die dragen ook feiten die wél mogen ("minimaal
    // 30 dagen van tevoren", "7 jaar fiscale bewaarplicht").
    patroon: new RegExp(
      `\\b(?:${HOEVEELHEID})\\s*(?:(?:à|tot|of|-)\\s*(?:${HOEVEELHEID})\\s*)?` +
        '(?:weken|week|maanden|maand|werkdagen|werkdag|kwartalen|kwartaal)\\b',
      'i',
    ),
    // "met een maand opzeggen" en "maandcontract" gaan over het contractmodel,
    // niet over opleveren. Die moeten er wel doorheen, want ze staan in het
    // vaste antwoord op de prijsvraag.
    uitzondering: /opzeg|maandcontract|maandelijks|per maand|abonnement|contract/i,
  },
  {
    id: 'doorlooptijd',
    reden: 'doet een toezegging over wanneer iets klaar of live is',
    patroon: /\b(?:live|klaar|opgeleverd|geleverd|draaiend|werkend)\s+(?:in|binnen|over|na)\b/i,
  },
  {
    id: 'besparing',
    reden: 'noemt een percentage, besparing of terugverdientijd',
    patroon: /%|\bprocent\b|\bbespaar|\bbespar|\bterugverdien/i,
  },
  {
    id: 'eu_claim',
    reden: 'claimt ten onrechte dat data volledig in de EU blijft',
    // Totaliteit plus regio plus een blijf-werkwoord, met de regio vóór het
    // werkwoord ("alle data die in Europa blijft"). De goedgekeurde formulering
    // ("Opslag en verwerking van de gegevens staan in de EU") mist de
    // totaliteit en komt er daarom wel doorheen.
    patroon:
      /\b(?:alles|alle|al\s+(?:je|uw|de)|volledig|volledige|helemaal|niets|nergens)\b[^.!?]{0,80}\b(?:EU|Europa|Europese Unie|Nederland)\b[^.!?]{0,40}\b(?:blijft|blijven|staat|staan|verlaat|verlaten|buiten)\b/i,
  },
  {
    id: 'eu_claim',
    reden: 'claimt ten onrechte dat data volledig in de EU blijft',
    // Dezelfde claim in de andere woordvolgorde: "alle gegevens staan in
    // Europa", "er gaat niets buiten de EU".
    patroon:
      /\b(?:alles|alle|al\s+(?:je|uw|de)|volledig|volledige|helemaal|niets|nergens)\b[^.!?]{0,80}\b(?:blijft|blijven|staat|staan|verlaat|verlaten|buiten)\b[^.!?]{0,40}\b(?:EU|Europa|Europese Unie|Nederland)\b/i,
  },
  {
    id: 'eu_claim',
    reden: 'claimt ten onrechte dat data binnen de EU blijft',
    patroon: /\b(?:data|gegevens)\b[^.!?]{0,40}\b(?:blijft|blijven)\b[^.!?]{0,25}\b(?:binnen|in)\b[^.!?]{0,20}\b(?:EU|Europa|Europese Unie|Nederland)\b/i,
  },
  {
    id: 'eu_claim',
    reden: 'claimt ten onrechte dat data binnen de EU blijft',
    patroon: /\b(?:blijft|blijven)\b[^.!?]{0,25}\b(?:binnen|in)\b[^.!?]{0,20}\b(?:de\s+)?(?:EU|Europa|Europese Unie)\b/i,
  },
];

function escapeRegex(waarde: string): string {
  return waarde.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Klantnaam-regels worden per aanroep gebouwd, want de blokkeerlijst komt uit
 * de kennisbank. Naast de volledige naam controleren we het eerste woord ervan
 * als dat minstens vier letters heeft: een model dat lekt, lekt meestal met de
 * merknaam en niet met de volledige tenaamstelling.
 */
function klantnaamRegels(namen: readonly string[]): Regel[] {
  const regels: Regel[] = [];
  const gezien = new Set<string>();

  for (const naam of namen) {
    const schoon = naam.trim();
    if (!schoon) continue;

    const varianten = [schoon];
    const eersteWoord = schoon.split(/\s+/)[0];
    if (eersteWoord && eersteWoord.length >= 4 && eersteWoord !== schoon) {
      varianten.push(eersteWoord);
    }

    for (const variant of varianten) {
      const sleutel = variant.toLowerCase();
      if (gezien.has(sleutel)) continue;
      gezien.add(sleutel);
      regels.push({
        id: 'klantnaam',
        reden: `noemt de klantnaam "${variant}" die niet is vrijgegeven`,
        patroon: new RegExp(`\\b${escapeRegex(variant)}\\b`, 'i'),
      });
    }
  }

  return regels;
}

function raaktUitzondering(tekst: string, index: number, lengte: number, uitzondering: RegExp): boolean {
  const start = Math.max(0, index - OMGEVING_TEKENS);
  const eind = Math.min(tekst.length, index + lengte + OMGEVING_TEKENS);
  return uitzondering.test(tekst.slice(start, eind));
}

/**
 * Controleert een stuk tekst tegen alle regels. Geeft álle overtredingen terug
 * en niet alleen de eerste, zodat de hergeneratie-notitie compleet is.
 */
export function controleerTekst(tekst: string, opties: ControleOpties = {}): ControleResultaat {
  const overtredingen: Overtreding[] = [];
  const alleRegels = [...REGELS, ...klantnaamRegels(opties.geheimeKlantnamen ?? [])];

  for (const regel of alleRegels) {
    const treffer = regel.patroon.exec(tekst);
    if (!treffer) continue;
    if (regel.uitzondering && raaktUitzondering(tekst, treffer.index, treffer[0].length, regel.uitzondering)) {
      continue;
    }
    overtredingen.push({ regel: regel.id, reden: regel.reden, fragment: treffer[0].trim() });
  }

  return { toegestaan: overtredingen.length === 0, overtredingen };
}

/** Korte, opslagbare samenvatting van wat er misging. Gaat naar blokReden. */
export function beschrijfOvertredingen(overtredingen: readonly Overtreding[]): string {
  return overtredingen.map((o) => `${o.regel}: ${o.reden} ("${o.fragment}")`).join('; ');
}

/**
 * De systeemnotitie voor de tweede poging. Bewust concreet: het model moet
 * weten wát er fout ging, anders herhaalt het dezelfde fout in andere woorden.
 */
export function bouwHergeneratieNotitie(overtredingen: readonly Overtreding[]): string {
  const punten = overtredingen.map((o) => `- ${o.reden} (het ging mis bij: "${o.fragment}")`);
  return [
    'Je vorige antwoord is tegengehouden door de outputcontrole en is niet aan de bezoeker',
    'getoond. Wat er misging:',
    ...punten,
    '',
    'Schrijf het antwoord opnieuw zonder die elementen. Verzin geen vervangend getal en geen',
    'omschrijving die hetzelfde suggereert. Als de vraag niet te beantwoorden is zonder wat',
    'hierboven staat, zeg dan eerlijk dat je er niet naar wilt gokken en dat je het aan Sjaak',
    'voorlegt, en vraag om een mailadres.',
  ].join('\n');
}

export interface SluisResultaat {
  /** Zinnen die de controle hebben gehaald en doorgegeven mogen worden. */
  zinnen: string[];
  /** Gevuld zodra een zin is tegengehouden; de aanroeper stopt dan de stream. */
  overtredingen: Overtreding[];
}

const ZINSEINDE = /(?<=[.!?…])\s+|\n+/;

/**
 * Boven deze lengte wacht de sluis niet op het einde van de zin maar geeft hij
 * alvast door tot het laatste woord. Zonder dit verschijnt een lange zin pas in
 * één klap, en dat leest als haperen.
 */
const EAGER_VANAF_TEKENS = 70;

/**
 * Hoeveel al doorgegeven tekst er bij de controle van het volgende stuk
 * meegaat. Nodig omdat een overtreding over de knip heen kan lopen: "een paar"
 * in het ene stuk en "duizend euro" in het volgende.
 */
const OVERLAP_TEKENS = 60;

/**
 * Buffert een tekststroom en laat alleen gecontroleerde stukken door. Zodra een
 * stuk een regel raakt, stopt de sluis: alles daarna wordt niet meer
 * doorgegeven en de aanroeper hergenereert. Wat al bij de bezoeker stond wordt
 * dan ingetrokken; daar is het herstart-signaal voor.
 */
export class ZinnenSluis {
  private buffer = '';
  private gesloten = false;
  /** Staart van wat al is doorgegeven, voor de overlapcontrole. */
  private staart = '';

  constructor(private readonly opties: ControleOpties = {}) {}

  /**
   * Controleert een stuk samen met de staart van het vorige, zodat een patroon
   * dat over de knip loopt alsnog wordt gezien.
   */
  private controleerMetOverlap(stuk: string): ControleResultaat {
    const resultaat = controleerTekst(this.staart + stuk, this.opties);
    if (resultaat.toegestaan) {
      const samen = this.staart + stuk;
      this.staart = samen.slice(-OVERLAP_TEKENS);
    }
    return resultaat;
  }

  /**
   * Zoekt een veilige knip in een te lang geworden buffer: het laatste
   * spatie-teken, zodat we nooit midden in een woord afbreken.
   */
  private eagerKnip(): number {
    if (this.buffer.length <= EAGER_VANAF_TEKENS) return -1;
    const knip = this.buffer.lastIndexOf(' ', EAGER_VANAF_TEKENS);
    return knip > 0 ? knip + 1 : -1;
  }

  get isGesloten(): boolean {
    return this.gesloten;
  }

  voeg(delta: string): SluisResultaat {
    if (this.gesloten) return { zinnen: [], overtredingen: [] };

    this.buffer += delta;
    const zinnen: string[] = [];

    // Eerst alles tot en met een zinseinde, daarna zolang de rest te lang wordt
    // ook stukken tot het laatste woord. Zo blijft de tekst doorlopen in plaats
    // van per hele zin te verspringen.
    for (;;) {
      const match = ZINSEINDE.exec(this.buffer);
      const grens = match && match.index !== undefined ? match.index + match[0].length : this.eagerKnip();
      if (grens <= 0) break;

      const stuk = this.buffer.slice(0, grens);
      this.buffer = this.buffer.slice(grens);

      if (!stuk.trim()) {
        zinnen.push(stuk);
        continue;
      }

      const controle = this.controleerMetOverlap(stuk);
      if (!controle.toegestaan) {
        this.gesloten = true;
        return { zinnen, overtredingen: controle.overtredingen };
      }
      zinnen.push(stuk);
    }

    return { zinnen, overtredingen: [] };
  }

  /** Sluit de stroom af en controleert wat er nog in de buffer staat. */
  restant(): SluisResultaat {
    if (this.gesloten || !this.buffer.trim()) {
      this.buffer = '';
      return { zinnen: [], overtredingen: [] };
    }

    const zin = this.buffer;
    this.buffer = '';

    const controle = this.controleerMetOverlap(zin);
    if (!controle.toegestaan) {
      this.gesloten = true;
      return { zinnen: [], overtredingen: controle.overtredingen };
    }
    return { zinnen: [zin], overtredingen: [] };
  }
}
