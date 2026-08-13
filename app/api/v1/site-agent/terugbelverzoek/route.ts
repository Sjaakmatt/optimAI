// POST /api/v1/site-agent/terugbelverzoek
//
// De bezoeker heeft in de widget "ja" gezegd op het terugbelaanbod en zijn
// gegevens plus akkoord ingevuld. Hier landen ze.
//
// Het model komt hier niet aan te pas. Dat is de kern van het ontwerp: de agent
// besluit wánneer het aanbod komt, maar de gegevens en de toestemming lopen
// buiten de LLM om. Zo staat er een vaste, aantoonbare tekst tegenover wat we
// vastleggen, en valideert een schema het telefoonnummer in plaats van een
// taalmodel.
//
// Er gaat hiervandaan niets naar de bezoeker. Het verzoek komt als PENDING in
// de werkbak; bellen doet een mens.

import { z } from 'zod';

import { siteAgentAan } from '@/lib/site-agent/config';
import { consentRegel } from '@/lib/site-agent/consent';
import { haalConversatie, werkConversatieBij } from '@/lib/site-agent/db';
import { logEvent, maskeerEmail } from '@/lib/site-agent/events';
import { notificatieKanaal } from '@/lib/site-agent/notify';
import { TELEFOON_PATROON, normaliseerTelefoon } from '@/lib/site-agent/telefoon';
import {
  maakInteractie,
  maakLeadAan,
  maakReviewItem,
  werkLeadBij,
  zoekLeadOpEmail,
} from '@/lib/site-agent/tools/crm';

export const runtime = 'nodejs';
export const maxDuration = 30;

const Invoer = z.object({
  sessionId: z.string().uuid(),
  naam: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  telefoon: z.string().trim().regex(TELEFOON_PATROON, 'ongeldig telefoonnummer'),
  // Moet letterlijk true zijn. Geen toestemming, geen verzoek.
  akkoord: z.literal(true),
  aanleiding: z.string().max(500).optional(),
  // Honeypot, net als op de andere publieke routes.
  bedrijfsnaam: z.string().optional(),
});

export async function POST(request: Request) {
  if (!siteAgentAan()) {
    return Response.json({ ok: false, error: 'De agent staat uit.' }, { status: 503 });
  }

  let ruw: unknown;
  try {
    ruw = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const gevalideerd = Invoer.safeParse(ruw);
  if (!gevalideerd.success) {
    return Response.json(
      { ok: false, error: 'Controleer je mailadres en telefoonnummer.' },
      { status: 422 },
    );
  }
  const invoer = gevalideerd.data;

  // Honeypot ingevuld: stil ok teruggeven, niets vastleggen.
  if (invoer.bedrijfsnaam) return Response.json({ ok: true });

  try {
    const conversatie = await haalConversatie(invoer.sessionId);
    if (!conversatie) {
      return Response.json({ ok: false, error: 'Onbekend gesprek' }, { status: 404 });
    }

    const telefoon = normaliseerTelefoon(invoer.telefoon);
    const nu = new Date().toISOString();
    const consentText = consentRegel();

    // Toestemming hoort bij de persoon, niet bij dit ene verzoek: hij gaat op de
    // lead, zodat "mochten we deze persoon bellen?" te beantwoorden is zonder
    // afgehandelde werkbak-items door te spitten.
    const consent = {
      consentContact: true,
      consentAt: nu,
      consentText,
    } as const;

    let leadId = conversatie.leadId;
    if (!leadId) {
      const bestaand = await zoekLeadOpEmail(invoer.email);
      leadId = bestaand?.id ?? null;
    }

    if (leadId) {
      await werkLeadBij(leadId, {
        contactNaam: invoer.naam,
        contactEmail: invoer.email,
        contactTelefoon: telefoon,
        ...consent,
      });
    } else {
      leadId = await maakLeadAan({
        // De agent heeft de bedrijfsnaam op dit punt vaak nog niet; die vult hij
        // later bij via maakLead. Liever een eerlijke plaatshouder dan een
        // verzonnen naam.
        bedrijfsnaam: invoer.naam,
        contactNaam: invoer.naam,
        contactEmail: invoer.email,
        contactTelefoon: telefoon,
        nextStepSuggestion: 'Bellen — de bezoeker heeft zelf om contact gevraagd.',
        ...consent,
      });
    }

    await werkConversatieBij(conversatie.id, { leadId });

    await maakInteractie({
      leadId,
      subject: 'Terugbelverzoek via de site-agent',
      body:
        `${invoer.aanleiding ? `Aanleiding: ${invoer.aanleiding}\n` : ''}` +
        `Telefoon: ${telefoon}\n` +
        `Toestemming gegeven op ${nu}:\n${consentText}`,
    });

    // In de werkbak, zodat het verzoek zichtbaar blijft tot iemand het oppakt.
    // Level ESCALATION: iemand vraagt er zelf om gebeld te worden, dat is het
    // sterkste signaal dat de agent kan opleveren.
    await maakReviewItem({
      kind: 'site_agent_callback',
      domain: 'sales',
      level: 'ESCALATION',
      summary: `Terugbelverzoek: ${invoer.naam}${invoer.aanleiding ? ` · ${invoer.aanleiding}` : ''}`,
      proposed: {
        naam: invoer.naam,
        email: invoer.email,
        telefoon,
        aanleiding: invoer.aanleiding ?? null,
        toestemming: consentText,
        toestemmingOp: nu,
        paginaPad: conversatie.paginaPad,
        bron: 'site-agent',
      },
      grounding: {
        conversatieId: conversatie.id,
        leadId,
      },
    });

    void logEvent({
      categorie: 'user_action',
      bericht: 'Terugbelverzoek vastgelegd',
      metadata: {
        conversatieId: conversatie.id,
        leadId,
        email: maskeerEmail(invoer.email),
        telefoon: '***',
        toestemming: true,
      },
    });

    // Signaal aan Sjaak. Faalt het kanaal, dan staat het verzoek nog steeds in
    // de werkbak — het gaat niet verloren omdat de mail hapert.
    void notificatieKanaal().stuur({
      urgent: true,
      onderwerp: `Terugbelverzoek · ${invoer.naam}`,
      tekst:
        `${invoer.naam} wil gebeld worden.\n\n` +
        `${invoer.aanleiding ? `Aanleiding: ${invoer.aanleiding}\n` : ''}` +
        `Telefoon: ${telefoon}\n` +
        `Mail: ${invoer.email}\n` +
        `Pagina: ${conversatie.paginaPad}\n\n` +
        `Toestemming: ${consentText}`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[site-agent] terugbelverzoek faalde:', err);
    void logEvent({
      categorie: 'user_action',
      type: 'error',
      bericht: 'Terugbelverzoek vastleggen faalde',
      metadata: { fout: err instanceof Error ? err.message : 'onbekend' },
    });
    return Response.json(
      { ok: false, error: 'Er ging iets mis. Mail gerust naar info@factumai.nl.' },
      { status: 500 },
    );
  }
}
