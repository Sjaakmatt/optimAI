import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

interface CalAttendee {
  email: string;
  name?: string;
  timeZone?: string;
}

interface CalBookingPayload {
  triggerEvent: string;
  payload?: {
    title?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    additionalNotes?: string;
    attendees?: CalAttendee[];
    organizer?: { name?: string; email?: string };
    rescheduleUid?: string;
    uid?: string;
    bookerUrl?: string;
  };
}

const DATE_FMT = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Amsterdam',
});

function verifyCalSignature(
  rawBody: string,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature) return false;
  const computed = createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(computed, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function firstName(full: string | undefined): string {
  if (!full) return 'daar';
  return full.trim().split(/\s+/)[0];
}

async function sendBookingFollowUp(
  payload: NonNullable<CalBookingPayload['payload']>,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info('[cal-webhook] RESEND_API_KEY not set, skipping follow-up mail');
    return;
  }

  const attendee = payload.attendees?.[0];
  if (!attendee?.email) {
    console.info('[cal-webhook] no attendee email, skipping follow-up');
    return;
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? 'website@factumai.nl';
  const replyTo = process.env.CONTACT_TO_EMAIL ?? 'info@factumai.nl';
  const dateStr = payload.startTime
    ? DATE_FMT.format(new Date(payload.startTime))
    : 'binnenkort';

  const text =
    `Beste ${firstName(attendee.name)},\n\n` +
    `Top, ik heb ${dateStr} in mijn agenda staan voor onze kennismaking. ` +
    `De Google Meet-link zit in de agenda-uitnodiging die u zojuist heeft gekregen.\n\n` +
    `Een paar dingen om te weten:\n\n` +
    `· Het gesprek duurt ongeveer 30 minuten.\n` +
    `· Geen voorbereiding nodig — vertel gewoon waar uw mensen tijd aan kwijt zijn.\n` +
    `· Past het toch niet meer? In de uitnodiging staat een rescheduling-link.\n\n` +
    `Tot dan,\n` +
    `Sjaak ter Veld\n` +
    `FactumAI\n\n` +
    `—\n` +
    `Hoogkarspel · 06-10 55 56 58 · info@factumai.nl`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `Sjaak ter Veld <${from}>`,
      to: [attendee.email],
      reply_to: replyTo,
      subject: `Bedankt — kennismaking ${dateStr}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error('[cal-webhook] Resend failed:', res.status, await res.text());
  }
}

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[cal-webhook] CAL_WEBHOOK_SECRET not configured');
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-cal-signature-256');

  if (!verifyCalSignature(rawBody, signature, secret)) {
    return NextResponse.json({ ok: false, error: 'invalid signature' }, { status: 401 });
  }

  let body: CalBookingPayload;
  try {
    body = JSON.parse(rawBody) as CalBookingPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  if (body.triggerEvent === 'BOOKING_CREATED' && body.payload) {
    try {
      await sendBookingFollowUp(body.payload);
    } catch (err) {
      // Slik fouten in: Cal retry-en zou anders dubbele mails opleveren.
      console.error('[cal-webhook] follow-up mail exception:', err);
    }
  }

  return NextResponse.json({ ok: true });
}
