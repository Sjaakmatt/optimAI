// Directe notificatie naar het team, achter een kleine interface zodat het kanaal
// later te wisselen is zonder de tools aan te raken. Mail via Resend is de
// veilige default, want dat draait al in deze repo (zie app/api/contact).
//
// Let op de grens uit de opdracht: dit kanaal is een intern signaal,
// geen uitgaande inhoud naar een prospect. Alles wat richting de bezoeker gaat
// loopt via de werkbak.

export interface Notificatie {
  onderwerp: string;
  tekst: string;
  /** Urgent zet de melding bovenaan; gebruikt bij een HOT-score. */
  urgent?: boolean;
}

export interface NotificatieKanaal {
  naam: string;
  stuur(notificatie: Notificatie): Promise<boolean>;
}

class ResendKanaal implements NotificatieKanaal {
  readonly naam = 'resend';

  async stuur(notificatie: Notificatie): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY;
    const naar = process.env.SITE_AGENT_NOTIFICATIE_EMAIL ?? process.env.CONTACT_TO_EMAIL ?? 'info@factumai.nl';
    const van = process.env.CONTACT_FROM_EMAIL ?? 'website@factumai.nl';

    if (!apiKey) {
      console.info('[site-agent] geen RESEND_API_KEY, notificatie niet verstuurd');
      return false;
    }

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: `FactumAI Site-agent <${van}>`,
          to: [naar],
          subject: `${notificatie.urgent ? '[HOT] ' : ''}${notificatie.onderwerp}`,
          text: notificatie.tekst,
        }),
      });
      if (!res.ok) {
        console.error('[site-agent] notificatie faalde:', res.status, await res.text());
        return false;
      }
      return true;
    } catch (err) {
      console.error('[site-agent] notificatie exception:', err);
      return false;
    }
  }
}

/** Kanaal voor omgevingen zonder Resend; logt in plaats van te versturen. */
class LogKanaal implements NotificatieKanaal {
  readonly naam = 'log';

  async stuur(notificatie: Notificatie): Promise<boolean> {
    console.info('[site-agent] notificatie (geen kanaal geconfigureerd):', notificatie.onderwerp);
    return false;
  }
}

let kanaal: NotificatieKanaal | null = null;

export function notificatieKanaal(): NotificatieKanaal {
  if (!kanaal) kanaal = process.env.RESEND_API_KEY ? new ResendKanaal() : new LogKanaal();
  return kanaal;
}

/** Alleen voor tests: vervang het kanaal. */
export function zetNotificatieKanaal(vervanger: NotificatieKanaal | null): void {
  kanaal = vervanger;
}
