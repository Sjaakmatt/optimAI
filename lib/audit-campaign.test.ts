import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { POST } from '../app/api/audit-aanmelding/route';
import { AUDIT_LIMITS, AUDIT_TERMS_VERSION, isAuditCampaignOpen, validateAuditApplication } from './audit-campaign';

const validApplication = {
  naam: '  Noor Voorbeeld  ',
  bedrijf: 'Voorbeeld BV',
  email: 'noor@example.com',
  plaats: 'Hoorn',
  telefoon: '',
  werkzaamheden: 'Wij typen iedere ochtend orders uit onze mailbox over in het ERP.',
  akkoord: true,
  website: '',
  voorwaardenVersie: AUDIT_TERMS_VERSION,
};

function request(body: unknown = validApplication) {
  return new Request('http://localhost/api/audit-aanmelding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function withMailEnvironment(fn: () => Promise<void>, key: string | undefined = 'test-provider-key') {
  const names = ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL', 'AI_AUDIT_CAMPAIGN_OPEN'] as const;
  const saved = names.map((name) => [name, process.env[name]] as const);
  const savedFetch = globalThis.fetch;
  if (key === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = key;
  process.env.CONTACT_TO_EMAIL = 'destination@example.com';
  process.env.CONTACT_FROM_EMAIL = 'website@example.com';
  delete process.env.AI_AUDIT_CAMPAIGN_OPEN;
  try {
    await fn();
  } finally {
    globalThis.fetch = savedFetch;
    for (const [name, value] of saved) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
}

describe('audit application validation', () => {
  it('accepts a scoped description without already naming three processes and trims contact fields', () => {
    const result = validateAuditApplication(validApplication);
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.fields.naam, 'Noor Voorbeeld');
      assert.equal(result.fields.telefoon, '');
    }
  });

  it('requires actual agreement and all essential application details', () => {
    const result = validateAuditApplication({ ...validApplication, naam: '', bedrijf: '', email: 'not-an-email', plaats: '', werkzaamheden: 'Orders', akkoord: 'true', telefoon: 'phone me' });
    assert.equal(result.ok, false);
    if (!result.ok) assert.deepEqual(Object.keys(result.errors).sort(), ['akkoord', 'bedrijf', 'email', 'naam', 'plaats', 'telefoon', 'werkzaamheden']);
  });

  it('rejects invalid JSON shapes and typed fields without throwing or coercing them', () => {
    for (const payload of [null, [], 3, 'text', { ...validApplication, bedrijf: { name: 'Something' } }]) {
      assert.equal(validateAuditApplication(payload).ok, false);
    }
  });

  it('rejects overlong values and header injection instead of silently changing the application', () => {
    for (const [name, max] of Object.entries(AUDIT_LIMITS)) {
      const result = validateAuditApplication({ ...validApplication, [name]: 'x'.repeat(max + 1) });
      assert.equal(result.ok, false, `${name} should reject too many characters`);
    }
    assert.equal(validateAuditApplication({ ...validApplication, bedrijf: 'Example\r\nBcc: other@example.com' }).ok, false);
    assert.equal(validateAuditApplication({ ...validApplication, email: 'noor@example.com\n' }).ok, true, 'a trailing pasted newline may be trimmed');
    assert.equal(validateAuditApplication({ ...validApplication, werkzaamheden: 'Line one\nLine two describes a process.' }).ok, true);
  });
});

describe('audit application delivery', () => {
  it('does not report success when email has not been configured', async () => {
    await withMailEnvironment(async () => {
      let called = false;
      globalThis.fetch = async () => { called = true; throw new Error('Must not send'); };
      const response = await POST(request());
      const payload = await response.json();
      assert.equal(response.status, 503);
      assert.equal(payload.ok, false);
      assert.match(payload.error, /info@factumai.nl/);
      assert.equal(called, false);
    }, '');
  });

  it('rejects malformed, null, oversized and honeypot submissions before contacting a provider', async () => {
    await withMailEnvironment(async () => {
      let called = false;
      globalThis.fetch = async () => { called = true; throw new Error('Must not send'); };
      const malformed = await POST(new Request('http://localhost/api/audit-aanmelding', { method: 'POST', body: '{bad' }));
      assert.equal(malformed.status, 400);
      for (const value of [null, { ...validApplication, akkoord: false }, { ...validApplication, website: 'spam.example' }]) {
        const response = await POST(request(value));
        assert.equal(response.status, 422);
        assert.equal((await response.json()).ok, false);
      }
      assert.equal((await POST(request({ ...validApplication, werkzaamheden: 'x'.repeat(17_000) }))).status, 413);
      assert.equal(called, false);
    });
  });

  it('honours campaign closure even when an already-open form submits', async () => {
    await withMailEnvironment(async () => {
      assert.equal(isAuditCampaignOpen(), true);
      process.env.AI_AUDIT_CAMPAIGN_OPEN = ' false ';
      assert.equal(isAuditCampaignOpen(), false);
      let called = false;
      globalThis.fetch = async () => { called = true; throw new Error('Must not send'); };
      const response = await POST(request());
      assert.equal(response.status, 410);
      assert.equal((await response.json()).ok, false);
      assert.equal(called, false);
    });
  });

  it('does not send an application accepted under stale or missing terms', async () => {
    await withMailEnvironment(async () => {
      let called = false;
      globalThis.fetch = async () => { called = true; throw new Error('Must not send'); };
      for (const voorwaardenVersie of ['old-terms-version', undefined]) {
        const response = await POST(request({ ...validApplication, voorwaardenVersie }));
        assert.equal(response.status, 409);
        const payload = await response.json();
        assert.equal(payload.ok, false);
        assert.match(payload.error, /Vernieuw deze pagina/);
        assert.equal(payload.errors, undefined);
      }
      assert.equal(called, false);
    });
  });

  it('sends the application, contact details and accepted terms version with retry deduplication', async () => {
    await withMailEnvironment(async () => {
      const keys: string[] = [];
      let calls = 0;
      globalThis.fetch = async (input, init) => {
        calls++;
        assert.equal(input, 'https://api.resend.com/emails');
        const headers = new Headers(init?.headers);
        assert.equal(headers.get('Authorization'), 'Bearer test-provider-key');
        keys.push(headers.get('Idempotency-Key')!);
        const email = JSON.parse(String(init?.body));
        assert.equal(email.reply_to, 'noor@example.com');
        assert.deepEqual(email.to, ['destination@example.com']);
        assert.match(email.from, /website@example.com/);
        assert.match(email.text, new RegExp(AUDIT_TERMS_VERSION));
        assert.match(email.text, /Hoorn/);
        assert.match(email.text, /Geen aankoop- of publicatieverplichting/);
        return new Response(JSON.stringify({ id: 'mock-delivery-123' }), { status: 200 });
      };
      for (let attempt = 0; attempt < 2; attempt++) {
        const response = await POST(request());
        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { ok: true });
      }
      assert.equal(calls, 2);
      assert.equal(keys[0], keys[1]);
      assert.match(keys[0], /^audit-[a-f0-9]{64}$/);
      assert.equal(keys[0].includes('noor'), false);
    });
  });

  it('never reports success for provider rejection, missing delivery id, or network failure', async () => {
    await withMailEnvironment(async () => {
      for (const provider of [
        async () => new Response('provider details', { status: 429 }),
        async () => new Response(JSON.stringify({}), { status: 200 }),
        async () => { throw new Error('network unavailable'); },
      ]) {
        globalThis.fetch = provider;
        const response = await POST(request());
        assert.equal(response.status, 502);
        const payload = await response.json();
        assert.equal(payload.ok, false);
        assert.doesNotMatch(payload.error, /provider details|network unavailable|test-provider-key/);
      }
    });
  });
});
