// Tests voor de boekingslaag. Het zwaartepunt ligt bij `boekAfspraakIn`: dat is
// het enige stuk van de site dat op verzoek van een anonieme bezoeker iets in
// de agenda van een mens zet, en de controle dáár is wat voorkomt dat een
// verzonnen of verlopen tijdstip erdoorheen glipt.

import { strict as assert } from 'node:assert';
import { afterEach, describe, it, mock } from 'node:test';

import { SlotBezetFout, boekAfspraakIn, groepeerPerDag, omschrijfMoment } from './agenda';

process.env.FACTUMAI_MCP_SCHEDULING_URL ??= 'https://scheduling.example/mcp';

interface McpAanroep {
  tool: string;
  argumenten: Record<string, unknown>;
}

/**
 * Zet een nep-MCP neer die vaste slots teruggeeft en boekingen onthoudt.
 * We onderscheppen `fetch`, want dat is de enige naad tussen deze laag en de
 * buitenwereld.
 */
function nepMcp(slots: Array<{ start: string; end: string }>) {
  const aanroepen: McpAanroep[] = [];

  mock.method(globalThis, 'fetch', async (_url: unknown, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body ?? '{}'));

    if (body.method === 'initialize') {
      return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: {} }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    const tool = body.params?.name as string;
    const argumenten = body.params?.arguments as Record<string, unknown>;
    aanroepen.push({ tool, argumenten });

    const resultaat =
      tool === 'find_available_slots'
        ? slots.map((s) => ({ resourceId: 'sjaak', resourceName: 'Sjaak', ...s }))
        : {
            id: 'event-1',
            start: argumenten.start,
            end: argumenten.end,
            onlineMeeting: { joinUrl: 'https://teams.microsoft.com/l/meetup-join/x' },
          };

    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        id: body.id,
        result: { content: [{ type: 'text', text: JSON.stringify(resultaat) }] },
      }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    );
  });

  return aanroepen;
}

const SLOT = { start: '2026-06-03T10:00:00.000Z', end: '2026-06-03T10:20:00.000Z' };
const TWEEDE_SLOT = { start: '2026-06-03T10:30:00.000Z', end: '2026-06-03T10:50:00.000Z' };

const GEGEVENS = {
  naam: 'Anna Bakker',
  email: 'anna@voorbeeld.nl',
  bron: 'test',
};

afterEach(() => {
  mock.restoreAll();
});

describe('boekAfspraakIn', () => {
  it('boekt op een moment dat vrij is, als Teams-meeting met de bezoeker erbij', async () => {
    const aanroepen = nepMcp([SLOT, TWEEDE_SLOT]);

    const boeking = await boekAfspraakIn({ ...GEGEVENS, start: SLOT.start, bedrijf: 'Bakker BV' });

    assert.equal(boeking.afspraakId, 'event-1');
    assert.equal(boeking.start, SLOT.start);
    assert.equal(boeking.joinUrl, 'https://teams.microsoft.com/l/meetup-join/x');

    const boek = aanroepen.find((a) => a.tool === 'create_appointment');
    assert.ok(boek, 'er had geboekt moeten worden');
    assert.equal(boek.argumenten.start, SLOT.start);
    assert.equal(boek.argumenten.isOnlineMeeting, true);
    assert.deepEqual(boek.argumenten.attendees, [
      { email: 'anna@voorbeeld.nl', name: 'Anna Bakker' },
    ]);
    assert.match(String(boek.argumenten.subject), /Anna Bakker/);
  });

  it('weigert een tijdstip dat niet in de vrije momenten voorkomt', async () => {
    const aanroepen = nepMcp([SLOT]);

    await assert.rejects(
      () => boekAfspraakIn({ ...GEGEVENS, start: '2026-06-03T23:00:00.000Z' }),
      SlotBezetFout,
    );
    assert.equal(
      aanroepen.some((a) => a.tool === 'create_appointment'),
      false,
      'er mag niets geboekt zijn',
    );
  });

  it('weigert een tijdstip dat net binnen een vrij venster valt maar geen slotstart is', async () => {
    // Een aanvaller die vijf minuten opschuift, schuift daarmee ook het einde
    // op en loopt dus in de afspraak erna. Alleen een exacte slotstart telt.
    const aanroepen = nepMcp([SLOT]);

    await assert.rejects(
      () => boekAfspraakIn({ ...GEGEVENS, start: '2026-06-03T10:05:00.000Z' }),
      SlotBezetFout,
    );
    assert.equal(
      aanroepen.some((a) => a.tool === 'create_appointment'),
      false,
    );
  });

  it('weigert onzin als starttijd zonder de MCP lastig te vallen', async () => {
    const aanroepen = nepMcp([SLOT]);

    await assert.rejects(() => boekAfspraakIn({ ...GEGEVENS, start: 'morgen' }), SlotBezetFout);
    assert.equal(aanroepen.length, 0, 'de MCP had niet aangeroepen moeten worden');
  });

  it('boekt in de duur van het slot en niet in een duur uit het verzoek', async () => {
    const aanroepen = nepMcp([SLOT]);

    await boekAfspraakIn({ ...GEGEVENS, start: SLOT.start });

    const boek = aanroepen.find((a) => a.tool === 'create_appointment');
    assert.equal(boek?.argumenten.end, SLOT.end);
  });
});

describe('presentatie van momenten', () => {
  it('groepeert slots per kalenderdag in Nederlandse tijd', () => {
    const dagen = groepeerPerDag([
      SLOT,
      TWEEDE_SLOT,
      { start: '2026-06-04T07:00:00.000Z', end: '2026-06-04T07:20:00.000Z' },
    ]);

    assert.equal(dagen.length, 2);
    assert.equal(dagen[0].datum, '2026-06-03');
    assert.equal(dagen[0].slots.length, 2);
    assert.equal(dagen[0].slots[0].label, '12:00');
    assert.equal(dagen[1].datum, '2026-06-04');
    assert.equal(dagen[1].slots[0].label, '09:00');
  });

  it('rekent een moment om naar de Nederlandse wandklok', () => {
    // Zomertijd: 10:00 UTC is 12:00 in Amsterdam.
    assert.equal(omschrijfMoment(SLOT.start), 'woensdag 3 juni om 12:00');
    // Wintertijd: 10:00 UTC is dan 11:00.
    assert.equal(omschrijfMoment('2026-12-02T10:00:00.000Z'), 'woensdag 2 december om 11:00');
  });
});
