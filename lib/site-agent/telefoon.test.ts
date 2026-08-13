// Het telefoonnummer uit het terugbelformulier is het enige gegeven waar Sjaak
// echt op moet kunnen bellen. Een nummer dat door de validatie glipt of verkeerd
// genormaliseerd wordt, kost een lead zonder dat iemand het merkt.

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { TELEFOON_PATROON, normaliseerTelefoon } from './telefoon';
import { CONSENT_TEKST, consentRegel } from './consent';

describe('telefoonvalidatie', () => {
  it('accepteert de vormen die mensen echt intypen', () => {
    for (const nummer of [
      '0612345678',
      '06 12 34 56 78',
      '06-12345678',
      '+31 6 12345678',
      '(06) 1234 5678',
      '010 123 45 67',
    ]) {
      assert.ok(TELEFOON_PATROON.test(nummer), `zou moeten passen: ${nummer}`);
    }
  });

  it('weigert wat geen telefoonnummer is', () => {
    for (const onzin of ['', '123', 'bel me maar', 'test@example.com', '06123456781234567890123']) {
      assert.ok(!TELEFOON_PATROON.test(onzin), `zou niet moeten passen: ${onzin}`);
    }
  });
});

describe('telefoonnormalisatie', () => {
  it('haalt opmaak weg', () => {
    assert.equal(normaliseerTelefoon('06 12 34 56 78'), '0612345678');
    assert.equal(normaliseerTelefoon('06-1234.5678'), '0612345678');
    assert.equal(normaliseerTelefoon('(06) 1234 5678'), '0612345678');
  });

  it('maakt van 0031 een +31, zodat dezelfde persoon niet twee keer in de lijst staat', () => {
    assert.equal(normaliseerTelefoon('0031612345678'), '+31612345678');
    assert.equal(normaliseerTelefoon('0031 6 1234 5678'), '+31612345678');
  });

  it('laat een bestaande +31 met rust', () => {
    assert.equal(normaliseerTelefoon('+31 6 12345678'), '+31612345678');
  });
});

describe('toestemmingstekst', () => {
  it('noemt het doel, derden en de intrekmogelijkheid', () => {
    // Dit is de belofte aan de bezoeker. Sneuvelt een van deze drie bij een
    // herformulering, dan is het geen bruikbare toestemming meer.
    assert.match(CONSENT_TEKST, /contact met mij opnemen/i);
    assert.match(CONSENT_TEKST, /niet met derden gedeeld/i);
    assert.match(CONSENT_TEKST, /intrekken/i);
  });

  it('slaat de tekst op met een versie ervoor', () => {
    const regel = consentRegel();
    assert.match(regel, /^\[v\d+\] /);
    assert.ok(regel.includes(CONSENT_TEKST), 'de opgeslagen regel moet de tekst letterlijk bevatten');
  });
});
