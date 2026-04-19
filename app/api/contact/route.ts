import { NextResponse } from 'next/server';

interface ContactPayload {
  naam?: unknown;
  bedrijf?: unknown;
  email?: unknown;
  telefoon?: unknown;
  bericht?: unknown;
  // honeypot: als ingevuld, spam. Stilzwijgend ok retourneren.
  website?: unknown;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown, maxLength = 2000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function validate(body: ContactPayload) {
  const naam = sanitize(body.naam, 120);
  const bedrijf = sanitize(body.bedrijf, 160);
  const email = sanitize(body.email, 160);
  const telefoon = sanitize(body.telefoon, 40);
  const bericht = sanitize(body.bericht, 4000);

  const errors: Record<string, string> = {};
  if (!naam) errors.naam = 'Vul een naam in.';
  if (!email) errors.email = 'Vul een e-mailadres in.';
  else if (!EMAIL_REGEX.test(email)) errors.email = 'E-mailadres lijkt niet te kloppen.';
  if (!bericht) errors.bericht = 'Schrijf een kort bericht.';
  else if (bericht.length < 10) errors.bericht = 'Iets meer tekst helpt ons.';

  return {
    clean: { naam, bedrijf, email, telefoon, bericht },
    errors,
  };
}

async function sendViaResend(fields: {
  naam: string;
  bedrijf: string;
  email: string;
  telefoon: string;
  bericht: string;
}): Promise<'sent' | 'skipped' | 'error'> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? 'info@factumai.nl';
  const from = process.env.CONTACT_FROM_EMAIL ?? 'website@factumai.nl';
  if (!apiKey) return 'skipped';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `FactumAI Contact <${from}>`,
        to: [to],
        reply_to: fields.email,
        subject: `Contactformulier · ${fields.naam}${fields.bedrijf ? ` (${fields.bedrijf})` : ''}`,
        text:
          `Naam: ${fields.naam}\n` +
          `Bedrijf: ${fields.bedrijf || '·'}\n` +
          `E-mail: ${fields.email}\n` +
          `Telefoon: ${fields.telefoon || '·'}\n` +
          `\nBericht:\n${fields.bericht}\n`,
      }),
    });
    if (!res.ok) {
      console.error('Resend failed:', res.status, await res.text());
      return 'error';
    }
    return 'sent';
  } catch (err) {
    console.error('Resend exception:', err);
    return 'error';
  }
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: stilzwijgend succes bij ingevuld 'website' veld
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { clean, errors } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const result = await sendViaResend(clean);
  if (result === 'error') {
    return NextResponse.json(
      { ok: false, error: 'Mail-verzending mislukte; probeer direct info@factumai.nl.' },
      { status: 502 },
    );
  }

  if (result === 'skipped') {
    // Dev / staging: log naar console
    console.info('[contact] form submission (no RESEND_API_KEY set):', {
      from: clean.email,
      naam: clean.naam,
      bedrijf: clean.bedrijf,
      telefoon: clean.telefoon,
      bericht: clean.bericht.slice(0, 200) + (clean.bericht.length > 200 ? '…' : ''),
    });
  }

  return NextResponse.json({ ok: true, delivery: result });
}
