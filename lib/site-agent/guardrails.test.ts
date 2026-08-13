// Unittests voor de outputcontrole. Twee soorten gevallen zijn hier gelijk
// belangrijk: wat geblokkeerd móét worden, en wat er juist doorheen moet. Een
// guardrail die de vaste antwoorden uit de prompt tegenhoudt is net zo kapot
// als een guardrail die een bedrag doorlaat, want dan komt het gesprek stil te
// liggen op een zin die we zelf hebben goedgekeurd.

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import {
  VEILIGE_TERUGVAL,
  ZinnenSluis,
  beschrijfOvertredingen,
  bouwHergeneratieNotitie,
  controleerTekst,
  type RegelId,
} from './guardrails';

const GEHEIME_KLANTEN = ['Pavo', 'TEKA Kranen'];

function controleer(tekst: string) {
  return controleerTekst(tekst, { geheimeKlantnamen: GEHEIME_KLANTEN });
}

function verwachtGeblokkeerd(tekst: string, regel: RegelId): void {
  const resultaat = controleer(tekst);
  assert.equal(
    resultaat.toegestaan,
    false,
    `had geblokkeerd moeten worden op ${regel}: ${JSON.stringify(tekst)}`,
  );
  assert.ok(
    resultaat.overtredingen.some((o) => o.regel === regel),
    `verwachtte regel ${regel}, kreeg ${resultaat.overtredingen.map((o) => o.regel).join(', ')}`,
  );
}

function verwachtToegestaan(tekst: string): void {
  const resultaat = controleer(tekst);
  assert.equal(
    resultaat.toegestaan,
    true,
    `had er doorheen moeten komen, geblokkeerd op ${beschrijfOvertredingen(resultaat.overtredingen)}: ${JSON.stringify(tekst)}`,
  );
}

describe('outputcontrole, bedragen', () => {
  it('blokkeert een omschreven bedrag zonder cijfers', () => {
    verwachtGeblokkeerd('Reken op een paar duizend euro voor zoiets.', 'bedrag');
  });

  it('blokkeert een bedrag met eurosymbool', () => {
    verwachtGeblokkeerd('Dat kost ongeveer € 12.000 aan implementatie.', 'bedrag');
  });

  it('blokkeert de k-notatie', () => {
    verwachtGeblokkeerd('Denk aan 15k voor de bouw.', 'bedrag');
  });

  it('blokkeert de valutacode', () => {
    verwachtGeblokkeerd('De fee ligt rond 8000 EUR.', 'bedrag');
  });

  it('blokkeert een bandbreedte in euro', () => {
    verwachtGeblokkeerd('Tussen de tien en twintig duizend, afhankelijk van de scope.', 'bedrag');
  });
});

describe('outputcontrole, doorlooptijd', () => {
  it('blokkeert een omschreven doorlooptijd zonder "binnen"', () => {
    verwachtGeblokkeerd("Dat hebben we in zo'n twee weken staan.", 'doorlooptijd');
  });

  it('blokkeert een toezegging in weken', () => {
    verwachtGeblokkeerd('We leveren binnen zes weken op.', 'doorlooptijd');
  });

  it('blokkeert een toezegging in werkdagen', () => {
    verwachtGeblokkeerd('In tien werkdagen staat het er.', 'doorlooptijd');
  });

  it('blokkeert een toezegging in maanden', () => {
    verwachtGeblokkeerd('Reken op drie maanden voor het hele traject.', 'doorlooptijd');
  });

  it('blokkeert "live in"', () => {
    verwachtGeblokkeerd('Je bent live in het najaar.', 'doorlooptijd');
  });

  it('blokkeert "klaar in"', () => {
    verwachtGeblokkeerd('De eerste agent is klaar in de tweede sprint.', 'doorlooptijd');
  });
});

describe('outputcontrole, besparingsclaims', () => {
  it('blokkeert een percentage in woorden', () => {
    verwachtGeblokkeerd('Dat scheelt je vijftig procent minder werk.', 'besparing');
  });

  it('blokkeert een percentage in tekens', () => {
    verwachtGeblokkeerd('Je haalt er zeker 30% winst uit.', 'besparing');
  });

  it('blokkeert een besparingsclaim', () => {
    verwachtGeblokkeerd('Dat bespaart je een hoop administratie.', 'besparing');
  });

  it('blokkeert het woord besparing', () => {
    verwachtGeblokkeerd('De besparing zit vooral in het overtypen.', 'besparing');
  });

  it('blokkeert een terugverdienclaim', () => {
    verwachtGeblokkeerd('De terugverdientijd is korter dan je denkt.', 'besparing');
  });
});

describe('outputcontrole, EU-claim', () => {
  it('blokkeert "alle gegevens staan in Europa"', () => {
    verwachtGeblokkeerd('Alle gegevens staan in Europa, daar hoef je niet bang voor te zijn.', 'eu_claim');
  });

  it('blokkeert "al je data blijft binnen Nederland"', () => {
    verwachtGeblokkeerd('Al je data blijft binnen Nederland.', 'eu_claim');
  });

  it('blokkeert de korte variant zonder totaliteitswoord', () => {
    verwachtGeblokkeerd('Data blijft binnen de EU.', 'eu_claim');
  });

  it('blokkeert "er gaat niets buiten de EU"', () => {
    verwachtGeblokkeerd('Er gaat niets buiten de EU.', 'eu_claim');
  });

  it('blokkeert de volledig-variant', () => {
    verwachtGeblokkeerd('De verwerking is volledig Europees en blijft in de EU.', 'eu_claim');
  });
});

describe('outputcontrole, klantnamen', () => {
  it('blokkeert een niet-vrijgegeven klantnaam', () => {
    verwachtGeblokkeerd('Dit hebben we eerder voor Pavo gebouwd.', 'klantnaam');
  });

  it('blokkeert de merknaam uit een samengestelde klantnaam', () => {
    verwachtGeblokkeerd('TEKA draait hier al een tijd mee.', 'klantnaam');
  });

  it('laat de klantnaam door zodra hij is vrijgegeven', () => {
    const resultaat = controleerTekst('Dit hebben we voor Pavo gebouwd.', {
      geheimeKlantnamen: ['TEKA Kranen'],
    });
    assert.equal(resultaat.toegestaan, true);
  });
});

describe('outputcontrole, wat er juist doorheen moet', () => {
  it('laat een jaartal door', () => {
    verwachtToegestaan('We werken sinds 2024 met deze aanpak.');
  });

  it('laat een aantal processtappen door', () => {
    verwachtToegestaan('Het is een proces van vier stappen.');
  });

  it('laat de opzegtermijn uit het prijsantwoord door', () => {
    verwachtToegestaan('Het maandcontract kun je met een maand opzeggen.');
  });

  it('laat het volledige vaste prijsantwoord door', () => {
    verwachtToegestaan(
      'Ik noem geen bedragen, want die hangen echt van het proces af en een gok helpt je ' +
        'niet. Wat ik wel kan zeggen: het is een vaste implementatiefee plus een maandelijkse ' +
        'dienst, apart van elkaar, en het maandcontract kun je met een maand opzeggen. De ' +
        'hoogte hoor je van Sjaak, daar is die 20 minuten voor.',
    );
  });

  it('laat de kernvraag over uren per week door', () => {
    verwachtToegestaan('Wie doet dat nu, en hoeveel uur per week gaat daarin zitten?');
  });

  it('laat de goedgekeurde datalocatie-formulering door', () => {
    verwachtToegestaan(
      'Opslag en verwerking van de gegevens staan in de EU. De taalmodelcalls gaan naar ' +
        'Anthropic in de Verenigde Staten, dat staat in onze sub-verwerkerslijst en daar ' +
        'liggen Standard Contractual Clauses onder.',
    );
  });

  it('laat de bewaartermijn voor sub-verwerkers door', () => {
    verwachtToegestaan('Klanten horen het minimaal 30 dagen van tevoren.');
  });

  it('laat de fiscale bewaarplicht door', () => {
    verwachtToegestaan('De financiële administratie bewaren we 7 jaar.');
  });

  it('laat de systeemvraag met pakketnamen door', () => {
    verwachtToegestaan('Welke systemen zitten eromheen? Outlook, Exact, AFAS of eigen bouw?');
  });

  it('laat de veilige terugval zelf door', () => {
    // Cruciaal: zou de terugval zelf geblokkeerd worden, dan houdt het gesprek
    // op met een lege respons.
    verwachtToegestaan(VEILIGE_TERUGVAL);
  });
});

describe('zinnensluis', () => {
  it('geeft complete zinnen door en houdt de laatste in de buffer', () => {
    const sluis = new ZinnenSluis({ geheimeKlantnamen: GEHEIME_KLANTEN });
    const eerste = sluis.voeg('Dat is een goede vraag. Wat ');
    assert.deepEqual(eerste.zinnen.map((z) => z.trim()), ['Dat is een goede vraag.']);
    assert.equal(eerste.overtredingen.length, 0);

    const rest = sluis.restant();
    assert.deepEqual(rest.zinnen.map((z) => z.trim()), ['Wat']);
  });

  it('stopt zodra een zin een regel raakt en houdt die zin binnen', () => {
    const sluis = new ZinnenSluis({ geheimeKlantnamen: GEHEIME_KLANTEN });
    const resultaat = sluis.voeg('Dat kan zeker. Reken op 15k. En dan draait het.');

    assert.deepEqual(resultaat.zinnen.map((z) => z.trim()), ['Dat kan zeker.']);
    assert.equal(resultaat.overtredingen.length, 1);
    assert.equal(resultaat.overtredingen[0].regel, 'bedrag');
    assert.equal(sluis.isGesloten, true);
  });

  it('geeft niets meer door nadat de sluis dicht is', () => {
    const sluis = new ZinnenSluis();
    sluis.voeg('Het kost € 5.000. ');
    const daarna = sluis.voeg('Maar dat is bij benadering. ');
    assert.deepEqual(daarna.zinnen, []);
    assert.deepEqual(sluis.restant().zinnen, []);
  });

  it('controleert ook het restant zonder afsluitende punt', () => {
    const sluis = new ZinnenSluis();
    const tijdensStream = sluis.voeg('Prima. Dat is helder');
    // De eerste zin is compleet en gaat er meteen uit; de tweede staat nog in
    // de buffer omdat er geen zinseinde achter zit.
    assert.deepEqual(tijdensStream.zinnen.map((z) => z.trim()), ['Prima.']);
    const rest = sluis.restant();
    assert.deepEqual(rest.zinnen.map((z) => z.trim()), ['Dat is helder']);

    const tweede = new ZinnenSluis();
    tweede.voeg('Prima. Dat scheelt 40%');
    const restant = tweede.restant();
    assert.equal(restant.zinnen.length, 0);
    assert.equal(restant.overtredingen[0].regel, 'besparing');
  });

  it('geeft een lange zin in stukken door in plaats van in één klap', () => {
    // Anders verspringt de tekst per hele zin en leest dat als haperen.
    const sluis = new ZinnenSluis();
    const lang =
      'Dat hangt echt af van het proces dat je wilt aanpakken en van de systemen die eromheen staan, ' +
      'dus daar wil ik niet zomaar iets over roepen.';
    const resultaat = sluis.voeg(lang);
    assert.ok(
      resultaat.zinnen.length > 1,
      `verwachtte meerdere stukken, kreeg er ${resultaat.zinnen.length}`,
    );
  });

  it('ziet een overtreding die over de knip heen loopt', () => {
    // "een paar" en "duizend" kunnen in verschillende stukken belanden; de
    // overlapcontrole moet dat alsnog vangen.
    const sluis = new ZinnenSluis();
    const lang =
      'Ik wil hier heel eerlijk over zijn en niet zomaar wat roepen, maar een paar duizend zegt je niets.';
    let overtredingen = 0;
    for (const teken of lang) overtredingen += sluis.voeg(teken).overtredingen.length;
    overtredingen += sluis.restant().overtredingen.length;
    assert.equal(overtredingen, 1, 'de overtreding over de knip heen is gemist');
  });

  it('houdt de doorgegeven tekst intact over de stukken heen', () => {
    const sluis = new ZinnenSluis();
    const lang =
      'Je leest over onze aanpak en ik ben benieuwd of het bij jullie nu handmatig gaat of dat er al iets omheen zit.';
    const stukken = [...sluis.voeg(lang).zinnen, ...sluis.restant().zinnen];
    assert.equal(stukken.join(''), lang);
  });

  it('werkt over losse deltas heen zoals bij streaming', () => {
    const sluis = new ZinnenSluis();
    const stukjes = ['Dat ', 'duurt ', 'ongeveer ', 'drie ', 'weken', '. Klaar.'];
    let overtredingen = 0;
    for (const stukje of stukjes) {
      overtredingen += sluis.voeg(stukje).overtredingen.length;
    }
    assert.equal(overtredingen, 1);
  });
});

describe('hulpfuncties', () => {
  it('beschrijft overtredingen opslagbaar', () => {
    const { overtredingen } = controleer('Reken op 15k.');
    const tekst = beschrijfOvertredingen(overtredingen);
    assert.match(tekst, /bedrag/);
    assert.match(tekst, /15k/);
  });

  it('bouwt een hergeneratie-notitie die zegt wat er misging', () => {
    const { overtredingen } = controleer('Dat bespaart je 30%.');
    const notitie = bouwHergeneratieNotitie(overtredingen);
    assert.match(notitie, /outputcontrole/);
    assert.match(notitie, /percentage/);
    assert.match(notitie, /Sjaak/);
  });
});
