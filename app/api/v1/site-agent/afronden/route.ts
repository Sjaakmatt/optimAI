// POST /api/v1/site-agent/afronden
//
// Afronding van een gesprek. De widget roept dit aan als de bezoeker het
// paneel sluit; de cron doet hetzelfde voor gesprekken die vijftien minuten
// stil zijn, en het chat-endpoint zet de status zelf op AFGEROND bij de
// berichtlimiet.
//
// De scoring draait hier, niet in het chat-endpoint: een bezoeker hoeft er niet
// op te wachten en het mag ook gebeuren als hij de pagina al heeft verlaten.
// Daarom is deze route geschikt voor sendBeacon.

import { z } from 'zod';

import { siteAgentAan } from '@/lib/site-agent/config';
import { haalConversatie } from '@/lib/site-agent/db';
import { logEvent } from '@/lib/site-agent/events';
import { scoorGesprek } from '@/lib/site-agent/scoring';

export const runtime = 'nodejs';
export const maxDuration = 60;

const Invoer = z.object({ sessionId: z.string().uuid() });

export async function POST(request: Request) {
  if (!siteAgentAan()) return Response.json({ ok: true, overgeslagen: 'uit' });

  let ruw: unknown;
  try {
    ruw = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const gevalideerd = Invoer.safeParse(ruw);
  if (!gevalideerd.success) return Response.json({ ok: false }, { status: 422 });

  try {
    const conversatie = await haalConversatie(gevalideerd.data.sessionId);
    // Onbekend of al afgerond: stil ok. De widget mag dit meerdere keren sturen.
    if (!conversatie || conversatie.status !== 'OPEN') return Response.json({ ok: true });

    const beoordeling = await scoorGesprek(conversatie);
    return Response.json({ ok: true, score: beoordeling?.score ?? null });
  } catch (err) {
    console.error('[site-agent] afronden faalde:', err);
    void logEvent({
      categorie: 'llm_decision',
      type: 'error',
      bericht: 'Afronden van gesprek faalde',
      metadata: { fout: err instanceof Error ? err.message : 'onbekend' },
    });
    // De bezoeker merkt hier niets van; de cron probeert het later opnieuw.
    return Response.json({ ok: false }, { status: 503 });
  }
}
