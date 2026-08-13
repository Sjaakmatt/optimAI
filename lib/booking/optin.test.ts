// Tests voor de dubbele opt-in.
//
// Het gaat hier om de beslissingen die bepalen of er wél of géén afspraak in de
// agenda van Sjaak belandt: is deze link nog geldig, is hij al gebruikt, en kan
// een token dat niet uit een van onze mails komt ergens toe leiden.

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { bepaalVervaltijd, hashToken, zoekAanvraag, type Aanvraag } from './aanvraag';
import { beoordeelAanvraag } from './flow';

const NU = new Date('2026-06-01T09:00:00.000Z');

function aanvraag(overrides: Partial<Aanvraag> = {}): Aanvraag {
  return {
    id: 'c1',
    status: 'WACHT',
    start: '2026-06-03T10:00:00.000Z',
    eind: '2026-06-03T10:20:00.000Z',
    naam: 'Anna Bakker',
    email: 'anna@voorbeeld.nl',
    bedrijf: null,
    aanleiding: null,
    bron: 'agenda',
    conversationId: null,
    afspraakId: null,
    expiresAt: '2026-06-02T09:00:00.000Z',
    ...overrides,
  };
}

describe('beoordeling van een opt-in link', () => {
  it('laat een verse, onbevestigde aanvraag door naar het boeken', () => {
    assert.equal(beoordeelAanvraag(aanvraag(), NU), 'boeken');
  });

  it('boekt niet nog een keer als de aanvraag al bevestigd is', () => {
    // Mensen klikken de link nog eens, en mailclients doen dat ook. Twee
    // afspraken uit één aanvraag is het echte risico hier.
    assert.equal(beoordeelAanvraag(aanvraag({ status: 'BEVESTIGD' }), NU), 'al-bevestigd');
  });

  it('weigert een link waarvan de geldigheid voorbij is', () => {
    const oud = aanvraag({ expiresAt: '2026-06-01T08:59:59.000Z' });
    assert.equal(beoordeelAanvraag(oud, NU), 'verlopen');
  });

  it('weigert precies op het moment dat de link vervalt', () => {
    const grens = aanvraag({ expiresAt: NU.toISOString() });
    assert.equal(beoordeelAanvraag(grens, NU), 'verlopen');
  });

  it('weigert een aanvraag waarvan het gesprek al begonnen is', () => {
    // De token kan nog geldig zijn terwijl het moment al voorbij is; dan valt er
    // niets meer te bevestigen.
    const begonnen = aanvraag({
      start: '2026-06-01T08:00:00.000Z',
      expiresAt: '2026-06-02T09:00:00.000Z',
    });
    assert.equal(beoordeelAanvraag(begonnen, NU), 'verlopen');
  });

  it('weigert een aanvraag die eerder is vervallen', () => {
    assert.equal(beoordeelAanvraag(aanvraag({ status: 'VERVALLEN' }), NU), 'verlopen');
  });
});

describe('vervaltijd van de link', () => {
  it('houdt de normale geldigheidsduur aan', () => {
    const uit = bepaalVervaltijd(NU, '2026-06-10T10:00:00.000Z', 24);
    assert.equal(uit.toISOString(), '2026-06-02T09:00:00.000Z');
  });

  it('vervalt nooit later dan de afspraak zelf', () => {
    // Een moment van over drie uur: dan is 24 uur geldigheid zinloos.
    const uit = bepaalVervaltijd(NU, '2026-06-01T12:00:00.000Z', 24);
    assert.equal(uit.toISOString(), '2026-06-01T12:00:00.000Z');
  });
});

describe('token', () => {
  it('slaat niet de token zelf op maar de hash ervan', () => {
    const token = 'a'.repeat(64);
    const hash = hashToken(token);
    assert.notEqual(hash, token);
    assert.match(hash, /^[0-9a-f]{64}$/);
    assert.equal(hash, hashToken(token), 'zelfde token, zelfde hash');
    assert.notEqual(hash, hashToken('b'.repeat(64)));
  });

  it('raakt de database niet bij een token die geen token kan zijn', async () => {
    // Zonder Supabase-configuratie gooit de opzoeklaag. Dat deze aanroepen
    // gewoon null teruggeven, bewijst dat de vormcontrole ervóór zit.
    for (const onzin of ['', 'nonsense', 'a'.repeat(63), 'A'.repeat(64), `${'a'.repeat(63)}z`]) {
      assert.equal(await zoekAanvraag(onzin), null, `had null moeten zijn voor "${onzin}"`);
    }
  });
});
