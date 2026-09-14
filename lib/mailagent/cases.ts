import type { CheckTone, DemoEvent, Script, ScriptStep } from '@/lib/types';
import { SCENARIOS } from '@/lib/data/scenarios';
import { SCRIPTS } from '@/lib/data/scripts';

/**
 * De mailagent op de homepage speelt dezelfde mails af als de Werkbank-demo.
 * Dit bestand vertaalt een demo-scenario plus zijn script naar een compacte
 * afspeellijst: de binnenkomende mail, de stappen die de agent zichtbaar zet
 * (opzoeken, beleid, overweging) en het antwoord dat hij schrijft.
 *
 * Alleen de e-mailscenario's doen mee; chat en social hebben hun eigen plek
 * in de demo.
 */

export type MailStap =
  | { kind: 'check'; label: string; value: string; tone: CheckTone }
  | { kind: 'reasoning'; text: string };

export interface MailAntwoord {
  van: string;
  aan: string;
  onderwerp: string;
  alineas: string[];
}

export interface MailCase {
  id: string;
  afzender: { naam: string; email: string; initialen: string };
  onderwerp: string;
  ontvangen: string;
  preview: string;
  body: string[];
  systemen: string[];
  stappen: MailStap[];
  antwoord: MailAntwoord;
  minutenBespaard: number;
}

const ONTVANGEN: Record<string, string> = {
  s2: '09:41',
  s4: '11:08',
  s7: '13:52',
};

function initialen(naam: string): string {
  return naam
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((d) => d[0]?.toUpperCase() ?? '')
    .join('');
}

function splitsAfzender(from: string): { naam: string; email: string } {
  const [naam, email] = from.split(' · ');
  return { naam: naam?.trim() ?? from, email: email?.trim() ?? '' };
}

/** De systemen die in de checks langskomen ("ERP · order opgezocht" → ERP). */
function systemenUit(stappen: MailStap[]): string[] {
  const gezien = new Set<string>();
  for (const s of stappen) {
    if (s.kind !== 'check') continue;
    const bron = s.label.split(' · ')[0]?.trim();
    if (!bron || /^beleid/i.test(bron)) continue;
    gezien.add(bron);
  }
  return [...gezien];
}

function vertaal(event: DemoEvent, script: Script): MailCase | null {
  const stappen: MailStap[] = [];
  let antwoord: MailAntwoord | null = null;
  let mailId: string | null = null;
  let minuten = 0;

  for (const stap of script.steps as ScriptStep[]) {
    if (stap.kind === 'check' && stap.check && !antwoord) {
      stappen.push({ kind: 'check', label: stap.check.label, value: stap.check.value, tone: stap.check.tone });
    } else if (stap.kind === 'reasoning' && stap.reasoning && !antwoord) {
      stappen.push({ kind: 'reasoning', text: stap.reasoning.text });
    } else if (stap.kind === 'artifact.start' && stap.artifactType === 'email' && !antwoord) {
      mailId = stap.artifactId ?? null;
      antwoord = {
        van: String(stap.meta?.from ?? ''),
        aan: String(stap.meta?.to ?? ''),
        onderwerp: String(stap.meta?.subject ?? ''),
        alineas: [],
      };
    } else if (stap.kind === 'artifact.fill' && stap.artifactId === mailId && stap.paragraph && antwoord) {
      antwoord.alineas.push(stap.paragraph);
    } else if (stap.kind === 'artifact.done' && stap.artifactId === mailId) {
      minuten = stap.minutesSaved ?? 0;
      break;
    }
  }

  if (!antwoord || antwoord.alineas.length === 0) return null;

  const { naam, email } = splitsAfzender(event.from ?? '');
  const body = event.body ?? [];

  return {
    id: event.id,
    afzender: { naam, email, initialen: initialen(naam) },
    onderwerp: event.subject ?? event.label,
    ontvangen: ONTVANGEN[event.id] ?? '10:00',
    preview: body[1] ?? body[0] ?? event.context,
    body,
    systemen: systemenUit(stappen),
    stappen,
    antwoord,
    minutenBespaard: minuten || script.minutesSaved,
  };
}

export const MAIL_CASES: MailCase[] = SCENARIOS.filter((s) => s.channel === 'email')
  .map((s) => {
    const script = SCRIPTS[s.scriptId];
    return script ? vertaal(s, script) : null;
  })
  .filter((c): c is MailCase => c !== null);
