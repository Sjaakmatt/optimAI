// De zinnen waarmee de agent zich meldt, per pagina.
//
// Twee soorten, met opzet gescheiden:
//   - haakjeVoorPad()  → één regel in de bubbel. Moet in een oogopslag te lezen
//                        zijn en aanzetten tot antwoorden.
//   - openingVoorPad() → het eerste bericht ín het paneel. Mag langer en mag
//                        uitleggen.
// Eerder was dat één tekst, en dan staat er een alinea in een bubbel die niemand
// leest.
//
// Geen imports, net als pad-naar-playbook.ts. Dit draait in de client-bundel; de
// branchedata uit lib/data/branches.ts meeslepen zou die bundel opblazen voor
// veertien regels tekst. Vandaar een letterlijke map op slug in plaats van een
// lookup in die data. Komt er een branche bij, dan valt hij terug op de
// algemene branchezin — niet stuk, wel minder scherp.
//
// WAT HIER NIET IN MAG: bedragen, doorlooptijden, besparingspercentages en
// klantnamen. De outputcontrole (lib/site-agent/guardrails.ts) blokkeert die in
// alles wat de agent zegt. Een bubbel die "bespaar 15 uur per week" belooft
// terwijl de agent dat vervolgens niet mag bevestigen, verkoopt één klik en
// verliest het gesprek erna.
//
// De vorm die werkt: benoem één herkenbare handeling, en stel er een vraag over.
// Niet "wij automatiseren uw processen", maar de handeling zelf.

import { playbookVoorPad, type PlaybookPad } from './pad-naar-playbook';

/** Haakjes per branche-slug, gelijk aan de slugs in lib/data/branches.ts. */
const BRANCHE_HAAKJES: Record<string, string> = {
  groothandel: 'Orders overtypen uit de mail naar je pakket. Loopt dat bij jullie ook zo?',
  installatietechniek: "Werkbonnen die 's avonds nog ingevoerd moeten worden. Speelt dat bij jullie?",
  'transport-logistiek': 'Eén incident kost meer telefoontjes dan de rit zelf. Herkenbaar?',
  'zakelijke-dienstverlening': 'Bij elke intake opnieuw dezelfde gegevens uitvragen. Hoe doen jullie dat nu?',
  bouw: 'Meerwerk dat pas bij de eindafrekening ter sprake komt. Bekend?',
  zorg: 'Rapportage die na de dienst nog moet gebeuren. Hoe is dat bij jullie geregeld?',
  productie: 'Orders die blijven hangen tussen mail, planning en de werkvloer. Herkenbaar?',
  detailhandel: 'Dezelfde klantvraag twintig keer per dag beantwoorden. Hoe vangen jullie dat op?',
  accountancy: 'Stukken najagen bij klanten die niet aanleveren. Wie doet dat bij jullie?',
  advocatuur: 'Een dossier doorspitten om één ding terug te vinden. Herkenbaar?',
  makelaardij: 'Bezichtigingen inplannen en aanvragen beantwoorden. Wie houdt dat bij?',
  agrarisch: "Registratie en administratie die er 's avonds bij komt. Speelt dat?",
  'e-commerce': "Retouren en 'waar blijft mijn pakket'. Hoeveel mail levert dat per dag op?",
  horeca: 'Reserveringen en vragen via vier kanalen tegelijk. Hoe houden jullie dat bij?',
};

/** Haakjes per dienst-slug onder /diensten. */
const DIENST_HAAKJES: Record<string, string> = {
  'ai-agent-laten-bouwen': 'Weet je al welk proces je zou willen laten overnemen, of zoek je dat nog uit?',
  'ai-agents-voor-bedrijven': 'Welk proces zou jij als eerste uit handen geven?',
  'ai-automatisering': 'Wat doen jullie nu handmatig dat elke week hetzelfde is?',
  'ai-implementatie': 'Zit de vraag bij jullie in wát je automatiseert, of in het ingevoerd krijgen?',
};

/** Terugval per playbook, als de pagina geen eigen zin heeft. */
const PLAYBOOK_HAAKJES: Record<PlaybookPad, string> = {
  prijs: 'Wat het kost hangt aan het proces. Waar zou je het op inzetten?',
  branche: 'Welk proces kost bij jullie wekelijks de meeste tijd?',
  dienst: 'Welk proces zou jij als eerste uit handen geven?',
  blog: 'Speelt dit bij jullie ook? Vertel eens hoe het nu loopt.',
  cases: 'Benieuwd of dit bij jullie zou werken? Vraag maar door.',
  home: 'Welk proces kost bij jullie wekelijks de meeste tijd?',
};

/** Het eerste bericht ín het paneel. Mag uitleggen, in tegenstelling tot het haakje. */
const OPENINGEN: Record<PlaybookPad, string> = {
  prijs:
    'Je bent aan het kijken wat zoiets kost. Eerlijk: dat hangt zo aan het proces dat een getal hier je zou misleiden. Waar zou je het op inzetten?',
  branche:
    'Je kijkt naar wat we in deze branche doen. Vertel eens waar bij jullie de meeste tijd in gaat zitten, dan kan ik zeggen of dit erbij past.',
  dienst:
    'Je leest over een van onze diensten. Werkt dat bij jullie nu handmatig, of zit er al iets omheen dat het half doet?',
  blog: 'Als je hier een concrete vraag over hebt, stel hem gerust.',
  cases:
    'Als je wilt weten hoe dit in de praktijk loopt, vraag maar door. Ik verzin geen resultaten, dus wat ik niet weet zeg ik ook.',
  home: 'Waar ben je naar op zoek?',
};

/** Pakt de slug direct achter een prefix, of null op de overzichtspagina zelf. */
function slugNa(pad: string, prefix: string): string | null {
  if (!pad.startsWith(`${prefix}/`)) return null;
  const rest = pad.slice(prefix.length + 1).split('/')[0];
  return rest || null;
}

/**
 * De regel in de bubbel. Zo specifiek als de pagina toelaat: op een
 * branchepagina de handeling uit die branche, daarboven de algemene vraag.
 */
export function haakjeVoorPad(pad: string): string {
  const p = pad.toLowerCase().replace(/\/+$/, '') || '/';

  const branche = slugNa(p, '/branches');
  if (branche && BRANCHE_HAAKJES[branche]) return BRANCHE_HAAKJES[branche];

  const dienst = slugNa(p, '/diensten');
  if (dienst && DIENST_HAAKJES[dienst]) return DIENST_HAAKJES[dienst];

  return PLAYBOOK_HAAKJES[playbookVoorPad(p)];
}

/** Het openingsbericht in het paneel. */
export function openingVoorPad(pad: string): string {
  return OPENINGEN[playbookVoorPad(pad)];
}
