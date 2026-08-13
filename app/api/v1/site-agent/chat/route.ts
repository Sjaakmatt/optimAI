// POST /api/v1/site-agent/chat, het gesprekseindpunt van de site-agent.
//
// Volgorde is bewust: rate limiting gaat vóór alles wat geld kost, daarna pas
// de database en pas daarna Anthropic. De berichtgeschiedenis komt uit de
// database en niet van de client; de client stuurt alleen het nieuwe bericht.
//
// De respons is een SSE-stream met vier soorten events:
//   { type: 'delta',   tekst }            een gecontroleerde zin
//   { type: 'herstart' }                  outputcontrole greep in, tekst intrekken
//   { type: 'signaal', naam, payload }    actie voor de widget, bv. de agenda
//   { type: 'klaar' }                     einde van het antwoord
//   { type: 'fout',    melding }          nette Nederlandse melding
//
// Streaming loopt per zin door de outputcontrole (lib/site-agent/guardrails.ts).
// Bij een treffer stoppen we de stream, gooien het antwoord weg en genereren
// één keer opnieuw met een systeemnotitie. Raakt ook die de controle, dan gaat
// de vaste veilige tekst naar de bezoeker.

import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import {
  VEILIGE_TERUGVAL,
  ZinnenSluis,
  beschrijfOvertredingen,
  bouwHergeneratieNotitie,
  controleerTekst,
  type Overtreding,
} from '@/lib/site-agent/guardrails';
import { laadKennisbank } from '@/lib/site-agent/kennisbank';
import { bouwSysteembericht, berekenKosten, SITE_AGENT_MODEL } from '@/lib/site-agent/prompt';
import {
  brancheUitPad,
  playbookVoorPagina,
  type PlaybookSleutel,
} from '@/lib/site-agent/playbooks';
import { controleerLimieten, boekKosten } from '@/lib/site-agent/ratelimit';
import { PLAFOND_MELDING, plafondBereikt, siteAgentAan } from '@/lib/site-agent/config';
import { logEvent } from '@/lib/site-agent/events';
import { TOOL_DEFINITIES, voerToolUit, type ToolContext } from '@/lib/site-agent/tools';
import {
  haalBerichten,
  haalLaatsteBerichtTijd,
  haalOfMaakConversatie,
  hashUserAgent,
  slaBerichtOp,
  telBerichten,
  verhoogVerbruik,
  type Conversatie,
} from '@/lib/site-agent/db';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Harde grenzen per gesprek, zodat één sessie niet oneindig door kan tikken. */
const MAX_BERICHTEN_PER_GESPREK = 30;
const MAX_INPUTTOKENS_PER_GESPREK = 60_000;
const MAX_UITVOER_TOKENS = 4_000;
/** Hoeveel keer het model achter elkaar tools mag aanroepen binnen één beurt. */
const MAX_TOOLBEURTEN = 4;
/** Minimale tijd tussen twee berichten. Simpele botdetectie, geen fingerprinting. */
const MIN_TUSSENTIJD_MS = 1_500;

const Invoer = z.object({
  sessionId: z.string().uuid(),
  paginaPad: z.string().max(300),
  bericht: z.string().min(1).max(2000),
  playbook: z.string().max(40),
  // Honeypot: mensen zien dit veld niet. Ingevuld betekent bot.
  bedrijfsnaam: z.string().optional(),
});

interface Verbruik {
  invoer: number;
  uitvoer: number;
  cacheGelezen: number;
  cacheGeschreven: number;
}

interface Generatie {
  tekst: string;
  overtredingen: Overtreding[];
  verbruik: Verbruik;
  /** Null als we de stream hebben afgebroken op een overtreding. */
  bericht: Anthropic.Message | null;
}

function leegVerbruik(): Verbruik {
  return { invoer: 0, uitvoer: 0, cacheGelezen: 0, cacheGeschreven: 0 };
}

function telOp(a: Verbruik, b: Verbruik): Verbruik {
  return {
    invoer: a.invoer + b.invoer,
    uitvoer: a.uitvoer + b.uitvoer,
    cacheGelezen: a.cacheGelezen + b.cacheGelezen,
    cacheGeschreven: a.cacheGeschreven + b.cacheGeschreven,
  };
}

let clientCache: Anthropic | null = null;
function anthropic(): Anthropic {
  if (!clientCache) clientCache = new Anthropic();
  return clientCache;
}

/**
 * Eén generatie: streamt het antwoord, laat elke afgeronde zin door de
 * outputcontrole en geeft doorgelaten zinnen door aan `opZin`. Stopt zodra een
 * zin een regel raakt.
 */
async function genereer(opties: {
  systeem: ReturnType<typeof bouwSysteembericht>;
  berichten: Anthropic.MessageParam[];
  geheimeKlantnamen: readonly string[];
  opZin: (zin: string) => void;
}): Promise<Generatie> {
  const sluis = new ZinnenSluis({ geheimeKlantnamen: opties.geheimeKlantnamen });
  const verbruik = leegVerbruik();
  let tekst = '';
  let overtredingen: Overtreding[] = [];
  let afgebroken = false;

  const stream = anthropic().messages.stream({
    model: SITE_AGENT_MODEL,
    max_tokens: MAX_UITVOER_TOKENS,
    // Adaptief denken met lage effort: genoeg om de juiste tool te kiezen,
    // zonder de latency van een uitgebreide redenering bij een kort antwoord.
    thinking: { type: 'adaptive' },
    output_config: { effort: 'low' },
    system: opties.systeem,
    tools: TOOL_DEFINITIES,
    messages: opties.berichten,
  });

  try {
    for await (const event of stream) {
      if (event.type === 'message_start') {
        const gebruik = event.message.usage;
        verbruik.invoer += gebruik.input_tokens ?? 0;
        verbruik.cacheGelezen += gebruik.cache_read_input_tokens ?? 0;
        verbruik.cacheGeschreven += gebruik.cache_creation_input_tokens ?? 0;
        continue;
      }

      if (event.type === 'message_delta') {
        verbruik.uitvoer += event.usage.output_tokens ?? 0;
        continue;
      }

      // Alleen zichtbare tekst gaat door de sluis; denkblokken nooit, en de
      // argumenten van een toolaanroep evenmin.
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        const resultaat = sluis.voeg(event.delta.text);
        for (const zin of resultaat.zinnen) {
          tekst += zin;
          opties.opZin(zin);
        }
        if (resultaat.overtredingen.length > 0) {
          overtredingen = resultaat.overtredingen;
          afgebroken = true;
          stream.abort();
          break;
        }
      }
    }

    if (!afgebroken) {
      const rest = sluis.restant();
      for (const zin of rest.zinnen) {
        tekst += zin;
        opties.opZin(zin);
      }
      overtredingen = rest.overtredingen;
    }
  } catch (err) {
    // Een afgebroken stream gooit; dat is hier de bedoeling en geen fout.
    if (!afgebroken) throw err;
  }

  const bericht = afgebroken || overtredingen.length > 0 ? null : await stream.finalMessage();
  return { tekst, overtredingen, verbruik, bericht };
}

function bouwTranscript(berichten: Anthropic.MessageParam[]): string {
  return berichten
    .map((b) => {
      const inhoud =
        typeof b.content === 'string'
          ? b.content
          : b.content
              .map((blok) => ('type' in blok && blok.type === 'text' ? blok.text : ''))
              .filter(Boolean)
              .join(' ');
      return inhoud ? `${b.role === 'user' ? 'Bezoeker' : 'Agent'}: ${inhoud}` : '';
    })
    .filter(Boolean)
    .join('\n');
}

export async function POST(request: Request) {
  // Schakelaar vóór alles. Staat de agent uit, dan bestaat dit endpoint
  // feitelijk niet en kost het ook niets.
  if (!siteAgentAan()) {
    return Response.json(
      { ok: false, error: 'De agent staat op dit moment uit. Mail gerust naar info@factumai.nl.' },
      { status: 503 },
    );
  }

  let ruw: unknown;
  try {
    ruw = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const gevalideerd = Invoer.safeParse(ruw);
  if (!gevalideerd.success) {
    return Response.json({ ok: false, error: 'Ongeldige aanvraag' }, { status: 422 });
  }
  const invoer = gevalideerd.data;

  // Honeypot: stilzwijgend ok, geen model-call.
  if (invoer.bedrijfsnaam && invoer.bedrijfsnaam.trim().length > 0) {
    return Response.json({ ok: true });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'onbekend';

  // 1. Begrenzen vóór er iets naar Anthropic gaat.
  const limiet = await controleerLimieten({ sessionId: invoer.sessionId, ip });
  if (!limiet.toegestaan) {
    return Response.json({ ok: false, error: limiet.melding }, { status: 429 });
  }

  // 1b. Dagelijks kostenplafond over alle gesprekken samen.
  if (await plafondBereikt()) {
    void logEvent({
      categorie: 'system',
      type: 'warning',
      bericht: 'Dagelijks kostenplafond bereikt, site-agent weigert nieuwe berichten',
      metadata: { playbook: invoer.playbook },
    });
    return Response.json({ ok: false, error: PLAFOND_MELDING }, { status: 429 });
  }

  // Server-side bepaald uit het paginapad. Wat de client in `playbook` zet
  // wordt genegeerd; het veld blijft alleen bestaan omdat de widget het nog
  // meestuurt.
  const playbook: PlaybookSleutel = playbookVoorPagina(invoer.paginaPad);

  let conversatie: Conversatie;
  let geschiedenis: Anthropic.MessageParam[];

  try {
    // 2. Gesprek ophalen of aanmaken.
    conversatie = await haalOfMaakConversatie({
      sessionId: invoer.sessionId,
      paginaPad: invoer.paginaPad,
      playbook,
      referrer: request.headers.get('referer'),
      userAgentHash: hashUserAgent(request.headers.get('user-agent')),
    });

    // 3. Harde grenzen per gesprek.
    const aantal = await telBerichten(conversatie.id);
    if (aantal >= MAX_BERICHTEN_PER_GESPREK || conversatie.totaalTokens >= MAX_INPUTTOKENS_PER_GESPREK) {
      // Bewust géén status-update hier. De grens wordt gehandhaafd door de
      // telling hierboven, die bij elk verzoek opnieuw draait — de status doet
      // daar niets aan. Zette je hem hier op AFGEROND, dan viel het gesprek
      // buiten beide scoringspaden: `afronden` slaat alles over dat niet OPEN
      // is, en de cron zoekt alleen naar OPEN. Het gesprek bleef dan voorgoed
      // ongescoord, en juist bezoekers die de limiet halen zijn de interessante.
      //
      // Alleen scoorGesprek() sluit een gesprek af, want dat is de enige plek
      // die status en score in één keer zet. Zie lib/site-agent/scoring.ts.
      //
      // Geen kale foutmelding: dit is het moment waarop het gesprek genoeg heeft
      // opgeleverd om het aan een mens over te dragen. De widget toont deze tekst
      // als bericht van de agent, met een knop naar de agenda.
      return Response.json(
        {
          ok: false,
          actie: 'afspraak',
          error:
            'We hebben genoeg gedeeld om hier echt over door te praten. In 20 minuten nemen we ' +
            'minuten met je door hoe dit bij jullie zou werken. Zal ik zijn agenda openen?',
        },
        { status: 409 },
      );
    }

    // 3b. Botdetectie: twee berichten vlak achter elkaar komen niet van iemand
    //     die zit te typen. Samen met het honeypot-veld is dit genoeg; verder
    //     gaan we niet, want fingerprinting zou een consentvraag opleveren.
    const vorige = await haalLaatsteBerichtTijd(conversatie.id);
    if (vorige !== null && Date.now() - vorige < MIN_TUSSENTIJD_MS) {
      return Response.json(
        { ok: false, error: 'Rustig aan. Stuur je bericht zo nog een keer.' },
        { status: 429 },
      );
    }

    // 4. Bezoekersbericht opslaan, dan de geschiedenis uit de database halen.
    await slaBerichtOp({ conversationId: conversatie.id, rol: 'user', inhoud: invoer.bericht });
    const opgeslagen = await haalBerichten(conversatie.id);
    // Lege inhoud weren: de API weigert een bericht met een leeg tekstblok, en
    // één rare rij mag een heel gesprek niet onbruikbaar maken.
    geschiedenis = opgeslagen
      .filter((b) => b.inhoud.trim().length > 0)
      .map((b) => ({ role: b.rol, content: b.inhoud }));
  } catch (err) {
    console.error('[site-agent] voorbereiding faalde:', err);
    return Response.json(
      {
        ok: false,
        error:
          'Er ging iets mis aan onze kant. Probeer het zo nog eens, of mail ons op info@factumai.nl.',
      },
      { status: 503 },
    );
  }

  const kennisbank = laadKennisbank();
  const systeem = bouwSysteembericht(playbook, brancheUitPad(invoer.paginaPad));

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let gesloten = false;
      const stuur = (payload: Record<string, unknown>) => {
        if (gesloten) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        } catch {
          gesloten = true;
        }
      };

      const start = Date.now();
      let verbruik = leegVerbruik();
      const berichten = [...geschiedenis];
      let leadId = conversatie.leadId;
      let toolAanroepen = 0;

      /**
       * Genereert één antwoord inclusief de hergeneratie bij een treffer.
       * Geeft null terug als ook de tweede poging faalde; dan is de veilige
       * terugval al naar de bezoeker gestuurd.
       */
      const genereerMetControle = async (): Promise<Generatie | null> => {
        let poging = await genereer({
          systeem,
          berichten,
          geheimeKlantnamen: kennisbank.geheimeKlantnamen,
          opZin: (zin) => stuur({ type: 'delta', tekst: zin }),
        });
        verbruik = telOp(verbruik, poging.verbruik);

        if (poging.overtredingen.length === 0) return poging;

        const eerste = poging.overtredingen;
        await slaBerichtOp({
          conversationId: conversatie.id,
          rol: 'assistant',
          inhoud: poging.tekst,
          geblokkeerd: true,
          blokReden: beschrijfOvertredingen(eerste),
        });
        void logEvent({
          categorie: 'compliance',
          type: 'warning',
          bericht: `Outputcontrole greep in (poging 1) · ${eerste.map((o) => o.regel).join(', ')}`,
          metadata: {
            poging: 1,
            conversatie_id: conversatie.id,
            playbook,
            regels: eerste.map((o) => o.regel),
            fragmenten: eerste.map((o) => o.fragment),
          },
        });

        stuur({ type: 'herstart' });

        poging = await genereer({
          systeem: [...systeem, { type: 'text' as const, text: bouwHergeneratieNotitie(eerste) }],
          berichten,
          geheimeKlantnamen: kennisbank.geheimeKlantnamen,
          opZin: (zin) => stuur({ type: 'delta', tekst: zin }),
        });
        verbruik = telOp(verbruik, poging.verbruik);

        if (poging.overtredingen.length === 0) return poging;

        const tweede = poging.overtredingen;
        await slaBerichtOp({
          conversationId: conversatie.id,
          rol: 'assistant',
          inhoud: poging.tekst,
          geblokkeerd: true,
          blokReden: beschrijfOvertredingen(tweede),
        });
        void logEvent({
          categorie: 'compliance',
          type: 'error',
          bericht: `Outputcontrole greep opnieuw in, teruggevallen op vaste tekst · ${tweede
            .map((o) => o.regel)
            .join(', ')}`,
          metadata: {
            poging: 2,
            conversatie_id: conversatie.id,
            playbook,
            regels: tweede.map((o) => o.regel),
            fragmenten: tweede.map((o) => o.fragment),
          },
        });

        stuur({ type: 'herstart' });
        stuur({ type: 'delta', tekst: VEILIGE_TERUGVAL });
        await slaBerichtOp({
          conversationId: conversatie.id,
          rol: 'assistant',
          inhoud: VEILIGE_TERUGVAL,
        });
        return null;
      };

      try {
        for (let beurt = 0; beurt < MAX_TOOLBEURTEN; beurt++) {
          const poging = await genereerMetControle();
          if (!poging || !poging.bericht) break;

          const toolBlokken = poging.bericht.content.filter(
            (blok): blok is Anthropic.ToolUseBlock => blok.type === 'tool_use',
          );

          // Vangnet over de volledige respons: een overtreding die over twee
          // zinnen heen liep is per zin niet zichtbaar.
          const volledig = controleerTekst(poging.tekst, {
            geheimeKlantnamen: kennisbank.geheimeKlantnamen,
          });

          // Een beurt die alleen een tool aanroept levert geen tekst op. Zo'n
          // bericht slaan we niet op: het zou als lege assistant-turn in de
          // geschiedenis komen en de volgende call laten falen op lege content.
          // De toolaanroep zelf staat al in de events en bij het reviewitem.
          if (poging.tekst.trim()) {
            await slaBerichtOp({
              conversationId: conversatie.id,
              rol: 'assistant',
              inhoud: poging.tekst,
              toolCalls:
                toolBlokken.length > 0
                  ? toolBlokken.map((b) => ({ naam: b.name, id: b.id }))
                  : undefined,
              geblokkeerd: !volledig.toegestaan,
              blokReden: volledig.toegestaan ? null : beschrijfOvertredingen(volledig.overtredingen),
            });
          }

          if (!volledig.toegestaan) {
            void logEvent({
              categorie: 'compliance',
              type: 'warning',
              bericht: `Outputcontrole zag pas bij de volledige respons een treffer · ${volledig.overtredingen
                .map((o) => o.regel)
                .join(', ')}`,
              metadata: {
                poging: 'volledig',
                conversatie_id: conversatie.id,
                regels: volledig.overtredingen.map((o) => o.regel),
              },
            });
          }

          if (toolBlokken.length === 0) break;

          // Het volledige assistant-bericht terug, inclusief denkblokken: die
          // horen bij deze beurt en mogen niet worden weggelaten.
          berichten.push({ role: 'assistant', content: poging.bericht.content });

          const ctx: ToolContext = {
            conversatieId: conversatie.id,
            sessionId: invoer.sessionId,
            paginaPad: invoer.paginaPad,
            leadId,
            transcript: bouwTranscript(berichten),
          };

          const resultaten: Anthropic.ToolResultBlockParam[] = [];
          for (const blok of toolBlokken) {
            toolAanroepen += 1;
            const resultaat = await voerToolUit(blok.name, blok.id, blok.input, ctx);

            if (resultaat.uitvoer.signaal) {
              stuur({
                type: 'signaal',
                naam: resultaat.uitvoer.signaal.naam,
                payload: resultaat.uitvoer.signaal.payload,
              });
            }
            if (resultaat.uitvoer.leadId) leadId = resultaat.uitvoer.leadId;

            resultaten.push({
              type: 'tool_result',
              tool_use_id: blok.id,
              content: resultaat.uitvoer.voorModel,
              is_error: !resultaat.gelukt,
            });
          }

          berichten.push({ role: 'user', content: resultaten });
        }

        stuur({ type: 'klaar' });
      } catch (err) {
        console.error('[site-agent] generatie faalde:', err);
        void logEvent({
          categorie: 'llm',
          type: 'error',
          bericht: 'Generatie faalde',
          metadata: {
            conversatie_id: conversatie.id,
            fout: err instanceof Error ? err.message : 'onbekend',
          },
        });
        stuur({
          type: 'fout',
          melding:
            'Er ging iets mis aan onze kant. Probeer het zo nog eens, of mail ons op info@factumai.nl.',
        });
      } finally {
        const kosten = berekenKosten(verbruik);
        // Alleen verse tokens tellen mee in totaalTokens, want dat getal
        // bewaakt de gesprekslimiet. De gecachte systeemprompt wordt élke beurt
        // opnieuw gelezen; die meetellen zou de limiet na een beurt of acht
        // laten afgaan terwijl het gesprek nog nergens is. De volledige kosten,
        // cache-tokens incluis, staan in kostenUsd.
        const tokens = verbruik.invoer + verbruik.uitvoer;

        void verhoogVerbruik(conversatie.id, tokens, kosten).catch((err) =>
          console.error('[site-agent] verbruik bijwerken faalde:', err),
        );
        void boekKosten(kosten);
        void logEvent({
          categorie: 'llm',
          bericht: `Claude chat · playbook=${playbook} tools=${toolAanroepen}`,
          metadata: {
            model: SITE_AGENT_MODEL,
            conversatie_id: conversatie.id,
            playbook,
            tool_calls: toolAanroepen,
            duration_ms: Date.now() - start,
            input_tokens: verbruik.invoer,
            output_tokens: verbruik.uitvoer,
            cache_read_tokens: verbruik.cacheGelezen,
            cache_create_tokens: verbruik.cacheGeschreven,
            cost_usd: Number(kosten.toFixed(6)),
          },
        });

        if (!gesloten) {
          gesloten = true;
          controller.close();
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
