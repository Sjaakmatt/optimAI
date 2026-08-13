// Bevestigingsmail na een boeking in de eigen agenda.
//
// De agenda-uitnodiging zelf komt al vanuit de mailbox sjaak@factumai.com:
// Graph stuurt die naar de genodigde, met de Teams-link erin. Deze mail is de
// menselijke kant ernaast — dezelfde toon als de mail die de Cal.com-webhook
// stuurde, zodat de bezoeker niets mist als de uitnodiging in de spam belandt.
//
// Een mislukte mail mag de boeking niet ongedaan maken: de afspraak stáát dan
// al in de agenda. We loggen en laten het verder gaan.

import { omschrijfMoment } from './agenda';

function voornaam(volledig: string): string {
  const eerste = volledig.trim().split(/\s+/)[0];
  return eerste || 'daar';
}

export interface BevestigingsMail {
  naam: string;
  email: string;
  start: string;
  joinUrl: string | null;
  duurMinuten: number;
}

export async function stuurBevestiging(invoer: BevestigingsMail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info('[agenda] RESEND_API_KEY niet gezet, bevestigingsmail overgeslagen');
    return;
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? 'website@factumai.nl';
  const replyTo = process.env.BOEKING_REPLY_TO ?? 'sjaak@factumai.com';
  const moment = omschrijfMoment(invoer.start);

  const text =
    `Beste ${voornaam(invoer.naam)},\n\n` +
    `Top, ik heb ${moment} in mijn agenda staan voor onze kennismaking. ` +
    `De Teams-link zit in de agenda-uitnodiging die u zojuist heeft gekregen` +
    (invoer.joinUrl ? `, en staat hieronder ook.` : `.`) +
    `\n\n` +
    (invoer.joinUrl ? `Deelnemen: ${invoer.joinUrl}\n\n` : '') +
    `Een paar dingen om te weten:\n\n` +
    `· Het gesprek duurt ongeveer ${invoer.duurMinuten} minuten.\n` +
    `· Geen voorbereiding nodig, vertel gewoon waar uw mensen tijd aan kwijt zijn.\n` +
    `· Past het toch niet meer? Antwoord op de agenda-uitnodiging of mail me even.\n\n` +
    `Tot dan,\n` +
    `Sjaak ter Veld\n` +
    `FactumAI\n\n` +
    `---\n` +
    `Hoogkarspel · 06-10 55 56 58 · sjaak@factumai.com`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `Sjaak ter Veld <${from}>`,
        to: [invoer.email],
        reply_to: replyTo,
        subject: `Bevestiging kennismaking ${moment}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error('[agenda] Resend faalde:', res.status, await res.text());
    }
  } catch (err) {
    console.error('[agenda] bevestigingsmail gooide:', err);
  }
}
