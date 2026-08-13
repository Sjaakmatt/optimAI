// De zes tools van de site-agent, plus de uitvoerder die de agent aanroept.
//
// Elke aanroep wordt gelogd met invoer en uitvoer, met persoonsgegevens
// gemaskeerd zoals de repo dat elders ook doet (zie lib/scan voor het patroon
// van niet-blokkerende logging).

import type Anthropic from '@anthropic-ai/sdk';

import { logEvent, maskeerEmail } from '../events';
import { BIED_TERUGBELAANBOD_DEFINITIE, biedTerugbelaanbod } from './biedTerugbelaanbod';
import { BOEK_AFSPRAAK_DEFINITIE, boekAfspraak } from './boekAfspraak';
import { CHECK_BESCHIKBAARHEID_DEFINITIE, checkBeschikbaarheid } from './checkBeschikbaarheid';
import { ESCALEER_DEFINITIE, escaleerNaarMens } from './escaleerNaarMens';
import { MAAK_LEAD_DEFINITIE, maakLead } from './maakLead';
import { STUUR_SAMENVATTING_DEFINITIE, stuurSamenvatting } from './stuurSamenvatting';
import type { ToolContext, ToolUitvoer } from './types';

export type { ToolContext, ToolUitvoer, ToolSignaal } from './types';

export const TOOL_DEFINITIES: Anthropic.Tool[] = [
  MAAK_LEAD_DEFINITIE,
  BIED_TERUGBELAANBOD_DEFINITIE,
  CHECK_BESCHIKBAARHEID_DEFINITIE,
  BOEK_AFSPRAAK_DEFINITIE,
  STUUR_SAMENVATTING_DEFINITIE,
  ESCALEER_DEFINITIE,
];

type ToolFunctie = (invoer: unknown, ctx: ToolContext) => Promise<ToolUitvoer>;

const TOOLS: Record<string, ToolFunctie> = {
  maakLead,
  biedTerugbelaanbod,
  checkBeschikbaarheid,
  boekAfspraak,
  stuurSamenvatting,
  escaleerNaarMens,
};

/** Sleutels waarvan de waarde nooit onbewerkt in een logregel mag komen. */
const GEVOELIG = new Set(['email', 'contactEmail', 'contactTelefoon']);

/** Maakt een logbare kopie: mailadressen gemaskeerd, lange velden ingekort. */
function maskeerPayload(invoer: unknown): Record<string, unknown> {
  if (typeof invoer !== 'object' || invoer === null) return {};
  const uit: Record<string, unknown> = {};

  for (const [sleutel, waarde] of Object.entries(invoer as Record<string, unknown>)) {
    if (typeof waarde !== 'string') {
      uit[sleutel] = waarde;
      continue;
    }
    if (GEVOELIG.has(sleutel)) {
      uit[sleutel] = sleutel === 'contactTelefoon' ? '***' : maskeerEmail(waarde);
      continue;
    }
    // Vrije tekst kan alsnog persoonsgegevens bevatten; we loggen de lengte en
    // niet de inhoud. De volledige tekst staat bij het reviewitem.
    uit[sleutel] = waarde.length > 120 ? `[${waarde.length} tekens]` : waarde;
  }

  return uit;
}

export interface ToolResultaat {
  toolUseId: string;
  naam: string;
  uitvoer: ToolUitvoer;
  gelukt: boolean;
}

/**
 * Voert één toolaanroep uit. Een falende tool gooit niet door naar het gesprek:
 * het model krijgt een nette melding terug en kan het anders proberen of
 * eerlijk zeggen dat het niet lukte.
 */
export async function voerToolUit(
  naam: string,
  toolUseId: string,
  invoer: unknown,
  ctx: ToolContext,
): Promise<ToolResultaat> {
  const start = Date.now();
  const tool = TOOLS[naam];

  if (!tool) {
    return {
      toolUseId,
      naam,
      gelukt: false,
      uitvoer: { voorModel: `De tool ${naam} bestaat niet.` },
    };
  }

  try {
    const uitvoer = await tool(invoer, ctx);
    void logEvent({
      categorie: 'user_action',
      bericht: `Tool ${naam} uitgevoerd`,
      metadata: {
        tool: naam,
        conversatie_id: ctx.conversatieId,
        duration_ms: Date.now() - start,
        invoer: maskeerPayload(invoer),
        uitvoer: uitvoer.voorModel.slice(0, 200),
        signaal: uitvoer.signaal?.naam ?? null,
      },
    });
    return { toolUseId, naam, uitvoer, gelukt: true };
  } catch (err) {
    const melding = err instanceof Error ? err.message : 'onbekende fout';
    console.error(`[site-agent] tool ${naam} faalde:`, melding);
    void logEvent({
      categorie: 'user_action',
      type: 'error',
      bericht: `Tool ${naam} faalde`,
      metadata: {
        tool: naam,
        conversatie_id: ctx.conversatieId,
        duration_ms: Date.now() - start,
        invoer: maskeerPayload(invoer),
        fout: melding,
      },
    });
    return {
      toolUseId,
      naam,
      gelukt: false,
      uitvoer: {
        voorModel:
          'Dat lukte technisch niet. Zeg tegen de bezoeker dat je het bij een collega neerlegt en ' +
          'vraag om een mailadres als je dat nog niet hebt.',
      },
    };
  }
}
