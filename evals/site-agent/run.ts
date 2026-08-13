// Evaluatieharnas voor de site-agent.
//
//   npm run eval                    alle tien de gevallen
//   npm run eval -- --geval 3       alleen geval 3
//   npm run eval -- --verbose       ook de transcripten
//
// Wat dit wél doet: de echte systeemprompt, de echte kennisbank, de echte
// tooldefinities en de echte outputcontrole, tegen het echte model.
//
// Wat dit niet doet: de database aanraken. Tools worden herkend en vastgelegd
// maar niet uitgevoerd; ze krijgen een vast antwoord terug. Zo test dit de
// agentlogica en niet de CRM-schrijfacties, en kun je het draaien zonder
// Supabase.

import Anthropic from '@anthropic-ai/sdk';

import { ZinnenSluis, type RegelId } from '@/lib/site-agent/guardrails';
import { laadKennisbank } from '@/lib/site-agent/kennisbank';
import { bouwSysteembericht, SITE_AGENT_MODEL } from '@/lib/site-agent/prompt';
import { brancheUitPad, playbookVoorPagina } from '@/lib/site-agent/playbooks';
import { TOOL_DEFINITIES } from '@/lib/site-agent/tools';
import { beoordeelGeval, type Beurt, type Gesprek, type ToolAanroep } from './asserties';
import { GEVALLEN, type Geval } from './fixtures';

const MAX_TOOLBEURTEN = 4;

/**
 * Vaste antwoorden op tools, zodat het gesprek doorloopt zonder iets weg te
 * schrijven. Bewust neutraal geformuleerd: ze mogen het gedrag van de agent
 * niet sturen.
 */
const TOOL_ANTWOORDEN: Record<string, string> = {
  maakLead: 'De lead is vastgelegd in het CRM.',
  boekAfspraak:
    'De agenda staat nu open in de widget. Zeg kort dat de bezoeker een moment kan kiezen. ' +
    'Noem geen datum en geen tijdstip.',
  stuurSamenvatting:
    'De procesnotitie staat als concept in de werkbak. Er is niets verstuurd. Zeg tegen de ' +
    'bezoeker dat Sjaak er eerst overheen kijkt.',
  escaleerNaarSjaak:
    'De vraag staat in de werkbak bij Sjaak. Zeg tegen de bezoeker dat hij een antwoord krijgt ' +
    'dat klopt, en gok zelf niets.',
};

async function voerGeval(client: Anthropic, geval: Geval): Promise<Gesprek> {
  const kennisbank = laadKennisbank();
  const playbook = playbookVoorPagina(geval.paginaPad);
  const systeem = bouwSysteembericht(playbook, brancheUitPad(geval.paginaPad));

  const berichten: Anthropic.MessageParam[] = [];
  const beurten: Beurt[] = [];
  const toolAanroepen: ToolAanroep[] = [];
  const geblokkeerd: RegelId[] = [];

  for (const bezoekersbeurt of geval.beurten) {
    berichten.push({ role: 'user', content: bezoekersbeurt });
    beurten.push({ rol: 'bezoeker', tekst: bezoekersbeurt });

    for (let ronde = 0; ronde < MAX_TOOLBEURTEN; ronde++) {
      const antwoord = await client.messages.create({
        model: SITE_AGENT_MODEL,
        max_tokens: 4000,
        thinking: { type: 'adaptive' },
        output_config: { effort: 'low' },
        system: systeem,
        tools: TOOL_DEFINITIES,
        messages: berichten,
      });

      const tekst = antwoord.content
        .filter((blok): blok is Anthropic.TextBlock => blok.type === 'text')
        .map((blok) => blok.text)
        .join('');

      // Dezelfde sluis als in productie, zodat we zien wat er tegengehouden
      // zou zijn. In het harnas laten we het gesprek wel doorlopen.
      if (tekst.trim()) {
        const sluis = new ZinnenSluis({ geheimeKlantnamen: kennisbank.geheimeKlantnamen });
        const resultaat = sluis.voeg(tekst);
        const rest = sluis.restant();
        for (const overtreding of [...resultaat.overtredingen, ...rest.overtredingen]) {
          geblokkeerd.push(overtreding.regel);
        }
        beurten.push({ rol: 'agent', tekst });
      }

      const toolBlokken = antwoord.content.filter(
        (blok): blok is Anthropic.ToolUseBlock => blok.type === 'tool_use',
      );
      if (toolBlokken.length === 0) break;

      berichten.push({ role: 'assistant', content: antwoord.content });
      const resultaten: Anthropic.ToolResultBlockParam[] = [];
      for (const blok of toolBlokken) {
        toolAanroepen.push({ naam: blok.name, invoer: blok.input });
        resultaten.push({
          type: 'tool_result',
          tool_use_id: blok.id,
          content: TOOL_ANTWOORDEN[blok.name] ?? 'Uitgevoerd.',
        });
      }
      berichten.push({ role: 'user', content: resultaten });
    }
  }

  return { beurten, toolAanroepen, geblokkeerd, geheimeKlantnamen: kennisbank.geheimeKlantnamen };
}

async function main(): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      'ANTHROPIC_API_KEY ontbreekt. Het evaluatieharnas praat met het echte model; zonder ' +
        'sleutel kan het niet draaien.',
    );
    process.exit(1);
  }

  const argumenten = process.argv.slice(2);
  const verbose = argumenten.includes('--verbose');
  const gevalIndex = argumenten.indexOf('--geval');
  const selectie =
    gevalIndex !== -1 && argumenten[gevalIndex + 1]
      ? GEVALLEN.filter((_, i) => String(i + 1) === argumenten[gevalIndex + 1])
      : GEVALLEN;

  if (selectie.length === 0) {
    console.error('Geen geval gevonden met dat nummer.');
    process.exit(1);
  }

  const client = new Anthropic();
  let geslaagd = 0;

  for (const geval of selectie) {
    process.stdout.write(`\n${geval.naam}\n`);
    let gesprek: Gesprek;
    try {
      gesprek = await voerGeval(client, geval);
    } catch (err) {
      console.error(`  FOUT tijdens uitvoeren: ${err instanceof Error ? err.message : err}`);
      continue;
    }

    const resultaat = beoordeelGeval(geval.naam, gesprek, geval.asserties);
    if (resultaat.gelukt) geslaagd += 1;

    for (const assertie of resultaat.asserties) {
      console.log(`  ${assertie.gelukt ? 'ok  ' : 'FOUT'} ${assertie.naam} — ${assertie.uitleg}`);
    }

    if (verbose || !resultaat.gelukt) {
      console.log('  --- transcript ---');
      for (const beurt of gesprek.beurten) {
        console.log(`  ${beurt.rol === 'bezoeker' ? '>' : '<'} ${beurt.tekst.replace(/\n/g, '\n    ')}`);
      }
      if (gesprek.toolAanroepen.length > 0) {
        console.log(`  tools: ${gesprek.toolAanroepen.map((t) => t.naam).join(', ')}`);
      }
    }
  }

  console.log(`\n${geslaagd} van ${selectie.length} gevallen geslaagd.`);
  process.exit(geslaagd === selectie.length ? 0 : 1);
}

void main();
