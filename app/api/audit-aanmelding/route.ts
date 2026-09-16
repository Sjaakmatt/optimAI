import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { AUDIT_TERMS_VERSION, isAuditCampaignOpen, validateAuditApplication } from '@/lib/audit-campaign';

export const runtime = 'nodejs';

const MAX_REQUEST_BYTES = 16_384;
const DELIVERY_ERROR = 'We konden de ontvangst niet bevestigen. Probeer het opnieuw of mail uw aanmelding naar info@factumai.nl.';

export async function POST(request: Request) {
  if (!isAuditCampaignOpen()) {
    return NextResponse.json({ ok: false, error: 'De aanmeldronde is gesloten. Neem contact op via info@factumai.nl om andere mogelijkheden te bespreken.' }, { status: 410 });
  }
  let body: unknown;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, 'utf8') > MAX_REQUEST_BYTES) {
      return NextResponse.json({ ok: false, error: 'Uw aanmelding is te lang. Kort de beschrijving in.' }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: 'De aanmelding kon niet worden gelezen. Probeer het opnieuw.' }, { status: 400 });
  }

  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const website = (body as Record<string, unknown>).website;
    if (website !== undefined && (typeof website !== 'string' || website.trim())) {
      return NextResponse.json({ ok: false, error: 'De aanmelding kon niet worden verwerkt. Mail ons via info@factumai.nl.' }, { status: 422 });
    }
  }

  const result = validateAuditApplication(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors, error: result.error }, { status: 422 });
  }

  if ((body as Record<string, unknown>).voorwaardenVersie !== AUDIT_TERMS_VERSION) {
    return NextResponse.json({ ok: false, error: 'De deelnameafspraken zijn bijgewerkt. Vernieuw deze pagina, lees de afspraken opnieuw en verstuur daarna uw aanmelding.' }, { status: 409 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'Het formulier is tijdelijk niet beschikbaar. Mail uw aanmelding naar info@factumai.nl.' }, { status: 503 });
  }

  const fields = result.fields;
  const to = process.env.CONTACT_TO_EMAIL?.trim() || 'info@factumai.nl';
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || 'website@factumai.nl';
  // Identical retries share a provider key, so a lost response does not send two emails.
  const applicationKey = createHash('sha256').update(JSON.stringify([AUDIT_TERMS_VERSION, fields])).digest('hex');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'Idempotency-Key': `audit-${applicationKey}`,
      },
      signal: AbortSignal.timeout(12_000),
      body: JSON.stringify({
        from: `FactumAI Aanmeldingen <${from}>`,
        to: [to],
        reply_to: fields.email,
        subject: `Aanmelding kosteloze AI-audit · ${fields.bedrijf}`,
        text: [
          'Aanmelding: drie bedrijven, drie processen per bedrijf',
          '',
          `Naam: ${fields.naam}`,
          `Bedrijf: ${fields.bedrijf}`,
          `E-mail: ${fields.email}`,
          `Vestigingsplaats: ${fields.plaats}`,
          `Telefoon: ${fields.telefoon || 'Niet opgegeven'}`,
          '',
          'Welk werk kost tijd?',
          fields.werkzaamheden,
          '',
          `Akkoord met deelnameafspraken: ja (versie ${AUDIT_TERMS_VERSION})`,
          'Voorwaarden: https://factumai.nl/gratis-ai-audit#deelnamevoorwaarden',
          'Aanmelden is geen bevestiging van selectie. Geen aankoop- of publicatieverplichting.',
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: DELIVERY_ERROR }, { status: 502 });
    }
    const delivery = await response.json() as { id?: unknown };
    if (!delivery || typeof delivery.id !== 'string' || !delivery.id) {
      return NextResponse.json({ ok: false, error: DELIVERY_ERROR }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    // Do not log the provider response, request body, or contact details.
    return NextResponse.json({ ok: false, error: DELIVERY_ERROR }, { status: 502 });
  }
}
