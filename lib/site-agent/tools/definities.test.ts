// Wat het model over de tools te horen krijgt, moet kloppen met wat ze doen.
//
// Deze test bestaat om één concrete fout: bij een merge kwam de teams-versie
// van de boekAfspraak-omschrijving in de cal-stand terecht. Het model las toen
// dat er een bevestigingsmail uitgaat en dat `start`, `naam` en `email`
// verplicht waren — terwijl checkBeschikbaarheid in die stand geen enkel moment
// teruggeeft. Verplichte velden die niet eerlijk te vullen zijn, zijn een
// uitnodiging aan het model om iets te verzinnen.

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { BOEK_AFSPRAAK_DEFINITIE } from './boekAfspraak';
import { TOOL_DEFINITIES } from './index';

const teams = process.env.NEXT_PUBLIC_BOEKING_PROVIDER === 'teams';

function verplicht(): string[] {
  const schema = BOEK_AFSPRAAK_DEFINITIE.input_schema as { required?: string[] };
  return schema.required ?? [];
}

describe('boekAfspraak-definitie', () => {
  it('vraagt alleen om velden die de agent ook echt kan hebben', () => {
    if (teams) {
      // Met de eigen agenda komt de starttijd uit checkBeschikbaarheid en
      // vraagt de agent zelf naam en mailadres.
      assert.deepEqual(verplicht().sort(), ['email', 'naam', 'start']);
    } else {
      // Met Cal.com kan de agent geen moment kiezen en vraagt de kalender zelf
      // om een mailadres.
      assert.deepEqual(verplicht(), ['aanleiding']);
    }
  });

  it('belooft geen bevestigingsmail als er geen bevestigingsmail is', () => {
    const tekst = BOEK_AFSPRAAK_DEFINITIE.description ?? '';
    if (teams) {
      assert.match(tekst, /bevestigingsmail/);
      assert.match(tekst, /nog NIET in de agenda/);
    } else {
      assert.ok(
        !tekst.includes('bevestigingsmail'),
        'de cal-stand stuurt geen bevestigingsmail vanuit deze tool',
      );
      assert.match(tekst, /widget/);
    }
  });
});

describe('toollijst', () => {
  it('heeft geen dubbele namen', () => {
    const namen = TOOL_DEFINITIES.map((t) => t.name);
    assert.equal(new Set(namen).size, namen.length, `dubbele tool in ${namen.join(', ')}`);
  });

  it('bevat de agenda-tools', () => {
    const namen = TOOL_DEFINITIES.map((t) => t.name);
    assert.ok(namen.includes('checkBeschikbaarheid'));
    assert.ok(namen.includes('boekAfspraak'));
  });
});
