// De haakjes zijn marketingtekst op de site, maar ze staan wél naast een agent
// die bedragen, doorlooptijden en besparingsclaims niet mág uitspreken. Een
// bubbel die belooft wat de agent daarna moet ontkennen, verkoopt één klik en
// verliest het gesprek erna. Deze test bewaakt die grens.

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { haakjeVoorPad, openingVoorPad, startersVoorPad } from './haakjes';

/** Alle paden waarvoor we een eigen zin verwachten. */
const BRANCHE_SLUGS = [
  'groothandel',
  'installatietechniek',
  'transport-logistiek',
  'zakelijke-dienstverlening',
  'bouw',
  'zorg',
  'productie',
  'detailhandel',
  'accountancy',
  'advocatuur',
  'makelaardij',
  'agrarisch',
  'e-commerce',
  'horeca',
];

const DIENST_SLUGS = [
  'ai-agent-laten-bouwen',
  'ai-agents-voor-bedrijven',
  'ai-automatisering',
  'ai-implementatie',
];

describe('haakje per pagina', () => {
  it('geeft elke branchepagina een eigen zin', () => {
    const gezien = new Set<string>();
    for (const slug of BRANCHE_SLUGS) {
      const haakje = haakjeVoorPad(`/branches/${slug}`);
      assert.ok(haakje.length > 0, `geen haakje voor ${slug}`);
      assert.ok(!gezien.has(haakje), `dubbele zin bij ${slug}: ${haakje}`);
      gezien.add(haakje);
    }
  });

  it('geeft elke dienstpagina een eigen zin', () => {
    const gezien = new Set<string>();
    for (const slug of DIENST_SLUGS) {
      const haakje = haakjeVoorPad(`/diensten/${slug}`);
      assert.ok(!gezien.has(haakje), `dubbele zin bij ${slug}: ${haakje}`);
      gezien.add(haakje);
    }
  });

  it('valt terug op de playbookzin bij een onbekende slug', () => {
    // Komt er een branche bij zonder eigen zin, dan hoort dat niet stuk te gaan.
    const onbekend = haakjeVoorPad('/branches/scheepsbouw');
    assert.equal(onbekend, haakjeVoorPad('/branches'));
    assert.ok(onbekend.length > 0);
  });

  it('werkt met een afsluitende slash en met hoofdletters', () => {
    assert.equal(haakjeVoorPad('/branches/groothandel/'), haakjeVoorPad('/branches/groothandel'));
    assert.equal(haakjeVoorPad('/Branches/Groothandel'), haakjeVoorPad('/branches/groothandel'));
  });

  it('geeft de homepage en de kennisbank verschillende zinnen', () => {
    assert.notEqual(haakjeVoorPad('/'), haakjeVoorPad('/kennis/iets'));
  });
});

describe('haakjes blijven binnen de outputcontrole', () => {
  const alle = [
    ...BRANCHE_SLUGS.map((s) => haakjeVoorPad(`/branches/${s}`)),
    ...DIENST_SLUGS.map((s) => haakjeVoorPad(`/diensten/${s}`)),
    haakjeVoorPad('/'),
    haakjeVoorPad('/kennis/iets'),
    haakjeVoorPad('/cases'),
    haakjeVoorPad('/info'),
  ];

  it('noemt nergens een bedrag', () => {
    for (const zin of alle) {
      assert.ok(!/€|\beuro\b|\$/i.test(zin), `bedrag in: ${zin}`);
    }
  });

  it('belooft nergens een besparing of een percentage', () => {
    for (const zin of alle) {
      assert.ok(!/%|\bbespaar|\bbesparing|\bwinst\b|\bgratis\b/i.test(zin), `claim in: ${zin}`);
    }
  });

  it('belooft nergens een doorlooptijd', () => {
    for (const zin of alle) {
      assert.ok(
        !/\bbinnen \d|\bin \d+ (dag|dagen|week|weken|maand|maanden)\b/i.test(zin),
        `doorlooptijd in: ${zin}`,
      );
    }
  });

  it('blijft kort genoeg om in een bubbel te lezen', () => {
    for (const zin of alle) {
      assert.ok(zin.length <= 110, `te lang (${zin.length}): ${zin}`);
    }
  });
});

describe('opening in het paneel', () => {
  it('is een andere, langere tekst dan het haakje', () => {
    // Waren ze gelijk, dan stond er een alinea in de bubbel — precies wat we
    // wilden afschaffen.
    const pad = '/branches/groothandel';
    assert.notEqual(openingVoorPad(pad), haakjeVoorPad(pad));
    assert.ok(openingVoorPad(pad).length > haakjeVoorPad(pad).length);
  });
});

describe('snelle antwoorden', () => {
  it('geeft er altijd precies drie, met een uitweg als laatste', () => {
    // Drie is de grens waarbinnen iemand nog kiest in plaats van leest. En de
    // uitweg moet er zijn: wie zich niet herkent in twee processen moet niet
    // vastlopen op een rij knoppen die niet over hem gaan.
    for (const pad of ['/', '/branches/bouw', '/diensten/ai-automatisering', '/kennis/iets', '/info']) {
      const starters = startersVoorPad(pad);
      assert.equal(starters.length, 3, `verwacht drie op ${pad}`);
      assert.equal(starters[2], 'Iets anders', `geen uitweg op ${pad}`);
    }
  });

  it('geeft branchepaginas hun eigen processen', () => {
    assert.notDeepEqual(startersVoorPad('/branches/bouw'), startersVoorPad('/branches/horeca'));
    assert.ok(startersVoorPad('/branches/bouw').includes('Meerwerk vastleggen'));
  });

  it('valt terug op de playbookset bij een onbekende slug', () => {
    assert.deepEqual(startersVoorPad('/branches/scheepsbouw'), startersVoorPad('/branches'));
  });

  it('blijft kort genoeg voor een knop', () => {
    for (const pad of ['/', '/branches/zorg', '/diensten/ai-implementatie']) {
      for (const s of startersVoorPad(pad)) {
        assert.ok(s.length <= 28, `te lang voor een knop (${s.length}): ${s}`);
      }
    }
  });

  it('belooft niets dat de outputcontrole daarna blokkeert', () => {
    // De knoptekst wordt letterlijk het bericht van de bezoeker, maar hij staat
    // wel in onze eigen interface. Zelfde grens als bij de haakjes.
    const alle = ['/', '/branches/bouw', '/branches/zorg', '/diensten/ai-automatisering', '/info']
      .flatMap(startersVoorPad);
    for (const s of alle) {
      assert.ok(!/€|%|\bbespaar|\buur\b|\bweken\b/i.test(s), `claim in: ${s}`);
    }
  });
});
