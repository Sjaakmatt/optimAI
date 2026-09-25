import { strict as assert } from 'node:assert';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';

import { POST } from '../../app/api/v1/site-agent/terugbelverzoek/route';
import { CONSENT_VERSIE } from './consent';

const aanvraag = {
  sessionId: '00000000-0000-4000-8000-000000000001',
  naam: 'Testbezoeker',
  email: 'test@example.com',
  telefoon: '0612345678',
  akkoord: true,
};

function verzoek(body: Record<string, unknown>) {
  return new Request('https://factumai.nl/api/v1/site-agent/terugbelverzoek', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('terugbelverzoek: toestemming bij een oudere geopende pagina', () => {
  const vorigeSchakelaar = process.env.SITE_AGENT_ENABLED;
  let providerRequests = 0;

  beforeEach(() => {
    process.env.SITE_AGENT_ENABLED = 'true';
    providerRequests = 0;
    mock.method(globalThis, 'fetch', () => {
      providerRequests += 1;
      throw new Error('Geen database- of providerverzoek toegestaan tijdens validatie');
    });
  });

  afterEach(() => {
    if (vorigeSchakelaar === undefined) delete process.env.SITE_AGENT_ENABLED;
    else process.env.SITE_AGENT_ENABLED = vorigeSchakelaar;
    mock.restoreAll();
  });

  it('weigert ontbrekende, oude en ongeldige versies vóór gegevensverwerking', async () => {
    for (const consentVersie of [undefined, CONSENT_VERSIE - 1, CONSENT_VERSIE + 1, String(CONSENT_VERSIE), null]) {
      const response = await POST(verzoek({ ...aanvraag, consentVersie }));
      assert.equal(response.status, 409);
      const body = await response.json();
      assert.equal(body.ok, false);
      assert.match(body.error, /vernieuw deze pagina/i);
    }
    assert.equal(providerRequests, 0);
  });

  it('laat de actuele versie door naar de bestaande honeypotcontrole', async () => {
    const response = await POST(verzoek({ ...aanvraag, consentVersie: CONSENT_VERSIE, bedrijfsnaam: 'bot' }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(providerRequests, 0);
  });

  it('vereist nog steeds uitdrukkelijk akkoord bij de actuele versie', async () => {
    const response = await POST(verzoek({ ...aanvraag, akkoord: false, consentVersie: CONSENT_VERSIE }));
    assert.equal(response.status, 422);
    assert.equal(providerRequests, 0);
  });
});
