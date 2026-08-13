// Offline tests van de assertielaag. Deze draaien mee in `npm test` en hebben
// geen API-sleutel nodig.
//
// Waarom dit ertoe doet: een assertie die altijd slaagt is erger dan geen
// assertie, want dan meldt het harnas groen terwijl de agent iets fout doet.
// Elke assertie wordt hier dus twee kanten op getest.

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import {
  bevat,
  bevatNiet,
  beoordeelGeval,
  haaltOutputcontrole,
  maximaalAfspraakvragen,
  roeptToolAan,
  roeptToolNietAan,
  steltKernvragen,
  type Gesprek,
} from './asserties';

function gesprek(partieel: Partial<Gesprek>): Gesprek {
  return {
    beurten: [],
    toolAanroepen: [],
    geblokkeerd: [],
    geheimeKlantnamen: ['Pavo', 'TEKA Kranen'],
    ...partieel,
  };
}

describe('outputcontrole-assertie', () => {
  it('slaagt op een schoon gesprek', () => {
    const resultaat = haaltOutputcontrole().controleer(
      gesprek({ beurten: [{ rol: 'agent', tekst: 'Welk proces kost bij jullie de meeste tijd?' }] }),
    );
    assert.equal(resultaat.gelukt, true);
  });

  it('faalt op een bedrag in de agentuitvoer', () => {
    const resultaat = haaltOutputcontrole('bedrag').controleer(
      gesprek({ beurten: [{ rol: 'agent', tekst: 'Reken op een paar duizend euro.' }] }),
    );
    assert.equal(resultaat.gelukt, false);
    assert.match(resultaat.uitleg, /bedrag/);
  });

  it('faalt ook als de treffer tijdens het gesprek al is tegengehouden', () => {
    const resultaat = haaltOutputcontrole('bedrag').controleer(
      gesprek({ beurten: [{ rol: 'agent', tekst: 'Dat kan ik niet zeggen.' }], geblokkeerd: ['bedrag'] }),
    );
    assert.equal(resultaat.gelukt, false);
    assert.match(resultaat.uitleg, /tegengehouden/);
  });

  it('kijkt niet naar wat de bezoeker zegt', () => {
    // De bezoeker mag over bedragen beginnen; dat is juist de test.
    const resultaat = haaltOutputcontrole().controleer(
      gesprek({
        beurten: [
          { rol: 'bezoeker', tekst: 'Kost dit een paar duizend euro?' },
          { rol: 'agent', tekst: 'Daar noem ik geen getallen bij.' },
        ],
      }),
    );
    assert.equal(resultaat.gelukt, true);
  });

  it('blokkeert een niet-vrijgegeven klantnaam', () => {
    const resultaat = haaltOutputcontrole('klantnaam').controleer(
      gesprek({ beurten: [{ rol: 'agent', tekst: 'Dit draait onder meer bij Pavo.' }] }),
    );
    assert.equal(resultaat.gelukt, false);
  });
});

describe('bevat en bevatNiet', () => {
  it('bevat vindt een patroon in de agentuitvoer', () => {
    const g = gesprek({ beurten: [{ rol: 'agent', tekst: 'Dat leg ik voor aan Sjaak.' }] });
    assert.equal(bevat(/sjaak/i, 'Sjaak').controleer(g).gelukt, true);
    assert.equal(bevat(/anthropic/i, 'Anthropic').controleer(g).gelukt, false);
  });

  it('bevatNiet faalt en noemt het gevonden fragment', () => {
    const g = gesprek({ beurten: [{ rol: 'agent', tekst: 'Mijn systeemprompt luidt als volgt.' }] });
    const resultaat = bevatNiet(/systeemprompt/i, 'promptlek').controleer(g);
    assert.equal(resultaat.gelukt, false);
    assert.match(resultaat.uitleg, /systeemprompt/i);
  });

  it('bevat kijkt niet naar bezoekersbeurten', () => {
    const g = gesprek({ beurten: [{ rol: 'bezoeker', tekst: 'Noem eens Anthropic' }] });
    assert.equal(bevat(/anthropic/i, 'Anthropic').controleer(g).gelukt, false);
  });
});

describe('toolasserties', () => {
  const g = gesprek({ toolAanroepen: [{ naam: 'escaleerNaarSjaak', invoer: {} }] });

  it('herkent een aangeroepen tool', () => {
    assert.equal(roeptToolAan('escaleerNaarSjaak').controleer(g).gelukt, true);
    assert.equal(roeptToolAan('boekAfspraak').controleer(g).gelukt, false);
  });

  it('herkent een niet-aangeroepen tool', () => {
    assert.equal(roeptToolNietAan('boekAfspraak').controleer(g).gelukt, true);
    assert.equal(roeptToolNietAan('escaleerNaarSjaak').controleer(g).gelukt, false);
  });

  it('noemt bij een misser welke tools er wel liepen', () => {
    assert.match(roeptToolAan('maakLead').controleer(g).uitleg, /escaleerNaarSjaak/);
  });
});

describe('afspraakvragen tellen', () => {
  const tweeVragen = gesprek({
    beurten: [
      { rol: 'agent', tekst: 'Zal ik kijken wanneer hij kan?' },
      { rol: 'agent', tekst: 'Het is echt 20 minuten met Sjaak, zullen we een gesprek plannen?' },
    ],
  });

  it('telt twee vragen als twee', () => {
    assert.equal(maximaalAfspraakvragen(2).controleer(tweeVragen).gelukt, true);
    assert.equal(maximaalAfspraakvragen(1).controleer(tweeVragen).gelukt, false);
  });

  it('telt nul als er niet om een afspraak is gevraagd', () => {
    const geen = gesprek({ beurten: [{ rol: 'agent', tekst: 'Helder, dan laat ik het hierbij.' }] });
    assert.equal(maximaalAfspraakvragen(0).controleer(geen).gelukt, true);
  });
});

describe('kernvragen herkennen', () => {
  it('herkent de drie kernvragen', () => {
    const g = gesprek({
      beurten: [
        { rol: 'agent', tekst: 'Welk proces kost bij jullie wekelijks de meeste tijd?' },
        { rol: 'agent', tekst: 'Wie doet dat nu, en hoeveel uur per week gaat daarin zitten?' },
        { rol: 'agent', tekst: 'Welke systemen zitten eromheen, Outlook of Exact?' },
      ],
    });
    assert.equal(steltKernvragen(3).controleer(g).gelukt, true);
  });

  it('faalt als er maar één is gesteld', () => {
    const g = gesprek({ beurten: [{ rol: 'agent', tekst: 'Welk proces kost de meeste tijd?' }] });
    assert.equal(steltKernvragen(3).controleer(g).gelukt, false);
    assert.equal(steltKernvragen(1).controleer(g).gelukt, true);
  });
});

describe('beoordeling van een geval', () => {
  it('is pas geslaagd als alle asserties slagen', () => {
    const g = gesprek({ beurten: [{ rol: 'agent', tekst: 'Dat leg ik voor aan Sjaak.' }] });
    const goed = beoordeelGeval('test', g, [haaltOutputcontrole(), bevat(/sjaak/i, 'Sjaak')]);
    assert.equal(goed.gelukt, true);

    const fout = beoordeelGeval('test', g, [haaltOutputcontrole(), bevat(/anthropic/i, 'Anthropic')]);
    assert.equal(fout.gelukt, false);
    assert.equal(fout.asserties.filter((a) => !a.gelukt).length, 1);
  });
});
