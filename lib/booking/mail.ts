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
import { TOKEN_GELDIG_UREN } from './aanvraag';

function voornaam(volledig: string): string {
  const eerste = volledig.trim().split(/\s+/)[0];
  return eerste || 'daar';
}

async function verstuur(opties: {
  aan: string;
  onderwerp: string;
  tekst: string;
  /** Voor de logregel als het misgaat. */
  soort: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[agenda] RESEND_API_KEY niet gezet, ${opties.soort} overgeslagen`);
    return;
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? 'website@factumai.nl';
  const replyTo = process.env.BOEKING_REPLY_TO ?? 'sjaak@factumai.com';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `Sjaak ter Veld <${from}>`,
      to: [opties.aan],
      reply_to: replyTo,
      subject: opties.onderwerp,
      text: opties.tekst,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export interface OptInMail {
  naam: string;
  email: string;
  start: string;
  duurMinuten: number;
  /** De volledige bevestigingslink, inclusief token. */
  bevestigUrl: string;
}

/**
 * De mail die de afspraak nog níét bevestigt. Zonder de klik hierin komt er
 * niets in de agenda, dus de link is de kern van deze mail en moet er niet
 * tussen de plichtplegingen verdwijnen.
 *
 * Deze mail mag wél gooien: mislukt hij, dan is er geen bevestigingsweg en moet
 * de bezoeker dat weten in plaats van te wachten op iets dat nooit komt.
 */
export async function stuurOptIn(invoer: OptInMail): Promise<void> {
  const moment = omschrijfMoment(invoer.start);

  const tekst =
    `Beste ${voornaam(invoer.naam)},\n\n` +
    `U wilt ${moment} kennismaken. Nog één klik en het staat vast:\n\n` +
    `${invoer.bevestigUrl}\n\n` +
    `Zolang u die link niet volgt, staat er niets in de agenda. Dat is met opzet: ` +
    `zo kan niemand op uw mailadres een afspraak vastleggen.\n\n` +
    `De link is ${TOKEN_GELDIG_UREN} uur geldig. Daarna kunt u gewoon een nieuw moment kiezen ` +
    `op factumai.nl.\n\n` +
    `Het gesprek duurt ongeveer ${invoer.duurMinuten} minuten en gaat via Microsoft Teams. ` +
    `De uitnodiging met de link krijgt u zodra u heeft bevestigd.\n\n` +
    `Was u dit niet? Dan hoeft u niets te doen — negeer deze mail.\n\n` +
    `Tot dan,\n` +
    `Sjaak ter Veld\n` +
    `FactumAI\n\n` +
    `---\n` +
    `Hoogkarspel · 06-10 55 56 58 · sjaak@factumai.com`;

  await verstuur({
    aan: invoer.email,
    onderwerp: `Bevestig je kennismaking op ${moment}`,
    tekst,
    soort: 'opt-in mail',
  });
}

export interface BevestigingsMail {
  naam: string;
  email: string;
  start: string;
  joinUrl: string | null;
  duurMinuten: number;
}

export async function stuurBevestiging(invoer: BevestigingsMail): Promise<void> {
  const moment = omschrijfMoment(invoer.start);

  const tekst =
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
    await verstuur({
      aan: invoer.email,
      onderwerp: `Bevestiging kennismaking ${moment}`,
      tekst,
      soort: 'bevestigingsmail',
    });
  } catch (err) {
    // Deze mail mag de boeking niet ongedaan maken: de afspraak stáát al in de
    // agenda en de uitnodiging is al vanuit de mailbox vertrokken.
    console.error('[agenda] bevestigingsmail faalde:', err);
  }
}
