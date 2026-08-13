// POST /api/v1/site-agent/chat, het gesprekseindpunt van de site-agent.
//
// Volgorde is bewust: rate limiting gaat vóór alles wat geld kost, daarna pas
// de database en pas daarna Anthropic. De berichtgeschiedenis komt uit de
// database en niet van de client; de client stuurt alleen het nieuwe bericht.
//
// De respons is een SSE-stream met drie soorten events:
//   { type: 'delta',  tekst }    een gecontroleerde zin
//   { type: 'klaar' }            einde van het antwoord
//   { type: 'fout',   melding }  nette Nederlandse melding, geen stacktrace
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
import { isPlaybookSleutel, brancheUitPad, type PlaybookSleutel } from '@/lib/site-agent/playbooks';
import { controleerLimieten, boekKosten } from '@/lib/site-agent/ratelimit';
import { logEvent } from '@/lib/site-agent/events';
import {
  haalBerichten,
  haalOfMaakConversatie,
  hashUserAgent,
  slaBerichtOp,
  telBerichten,
  verhoogVerbruik,
  werkConversatieBij,
} from '@/lib/site-agent/db';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Harde grenzen per gesprek, zodat één sessie niet oneindig door kan tikken. */
const MAX_BERICHTEN_PER_GESPREK = 30;
const MAX_INPUTTOKENS_PER_GESPREK = 60_000;
const MAX_UITVOER_TOKENS = 4_000;

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
  stopReden: string | null;
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
  let stopReden: string | null = null;
  let overtredingen: Overtreding[] = [];
  let afgebroken = false;

  const stream = anthropic().messages.stream({
    model: SITE_AGENT_MODEL,
    max_tokens: MAX_UITVOER_TOKENS,
    // Adaptief denken met lage effort: genoeg om tools straks goed te kiezen,
    // zonder de latency van een uitgebreide redenering bij een kort antwoord.
    thinking: { type: 'adaptive' },
    output_config: { effort: 'low' },
    system: opties.systeem,
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
        stopReden = event.delta.stop_reason ?? stopReden;
        continue;
      }

      // Alleen zichtbare tekst gaat door de sluis; denkblokken nooit.
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        const resultaat = sluis.voeg(event.delta.text);
        for (const zin of resultaat.zinnen) {
          tekst += zin;
          opties.opZin(zin);
        }
        if (resultaat.overtredingen.length > 0) {
          overtredingen = resultaat.overtredingen;
          // De rest van het antwoord willen we niet meer: stoppen scheelt
          // tokens en voorkomt dat er nog iets doorglipt.
          afgebroken = true;
          stream.abort();
          break;
        }
      }
    }

    if (overtredingen.length === 0) {
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

  return { tekst, overtredingen, verbruik, stopReden };
}

export async function POST(request: Request) {
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

  const playbook: PlaybookSleutel = isPlaybookSleutel(invoer.playbook) ? invoer.playbook : 'home';

  let conversatieId: string;
  let berichten: Anthropic.MessageParam[];
  let verbruiktTotNu: number;

  try {
    // 2. Gesprek ophalen of aanmaken.
    const conversatie = await haalOfMaakConversatie({
      sessionId: invoer.sessionId,
      paginaPad: invoer.paginaPad,
      playbook,
      referrer: request.headers.get('referer'),
      userAgentHash: hashUserAgent(request.headers.get('user-agent')),
    });
    conversatieId = conversatie.id;
    verbruiktTotNu = conversatie.totaalTokens;

    // 3. Harde grenzen per gesprek.
    const aantal = await telBerichten(conversatie.id);
    if (aantal >= MAX_BERICHTEN_PER_GESPREK || verbruiktTotNu >= MAX_INPUTTOKENS_PER_GESPREK) {
      await werkConversatieBij(conversatie.id, { status: 'AFGEROND' });
      return Response.json(
        {
          ok: false,
          error:
            'Dit gesprek is lang genoeg geworden om er een keer echt over door te praten. ' +
            'Plan een gesprek met Sjaak, of mail naar info@factumai.nl.',
        },
        { status: 409 },
      );
    }

    // 4. Bezoekersbericht opslaan, dan de geschiedenis uit de database halen.
    await slaBerichtOp({ conversationId: conversatie.id, rol: 'user', inhoud: invoer.bericht });
    const geschiedenis = await haalBerichten(conversatie.id);
    berichten = geschiedenis.map((b) => ({ role: b.rol, content: b.inhoud }));
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
      const sluitAf = () => {
        if (gesloten) return;
        gesloten = true;
        controller.close();
      };

      const start = Date.now();
      let verbruik = leegVerbruik();

      try {
        // Eerste poging.
        let poging = await genereer({
          systeem,
          berichten,
          geheimeKlantnamen: kennisbank.geheimeKlantnamen,
          opZin: (zin) => stuur({ type: 'delta', tekst: zin }),
        });
        verbruik = poging.verbruik;

        if (poging.overtredingen.length > 0) {
          const eerste = poging.overtredingen;
          await slaBerichtOp({
            conversationId: conversatieId,
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
              conversatie_id: conversatieId,
              playbook,
              regels: eerste.map((o) => o.regel),
              fragmenten: eerste.map((o) => o.fragment),
            },
          });

          // Wat al verzonden is intrekken, en één keer opnieuw met een notitie.
          stuur({ type: 'herstart' });

          const systeemMetNotitie = [
            ...systeem,
            { type: 'text' as const, text: bouwHergeneratieNotitie(eerste) },
          ];

          poging = await genereer({
            systeem: systeemMetNotitie,
            berichten,
            geheimeKlantnamen: kennisbank.geheimeKlantnamen,
            opZin: (zin) => stuur({ type: 'delta', tekst: zin }),
          });
          verbruik = telOp(verbruik, poging.verbruik);

          if (poging.overtredingen.length > 0) {
            const tweede = poging.overtredingen;
            await slaBerichtOp({
              conversationId: conversatieId,
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
                conversatie_id: conversatieId,
                playbook,
                regels: tweede.map((o) => o.regel),
                fragmenten: tweede.map((o) => o.fragment),
              },
            });

            stuur({ type: 'herstart' });
            stuur({ type: 'delta', tekst: VEILIGE_TERUGVAL });
            await slaBerichtOp({
              conversationId: conversatieId,
              rol: 'assistant',
              inhoud: VEILIGE_TERUGVAL,
            });
            stuur({ type: 'klaar' });
            return;
          }
        }

        // Vangnet over de volledige respons: een overtreding die over twee
        // zinnen heen liep is per zin niet zichtbaar.
        const volledig = controleerTekst(poging.tekst, {
          geheimeKlantnamen: kennisbank.geheimeKlantnamen,
        });

        await slaBerichtOp({
          conversationId: conversatieId,
          rol: 'assistant',
          inhoud: poging.tekst,
          geblokkeerd: !volledig.toegestaan,
          blokReden: volledig.toegestaan ? null : beschrijfOvertredingen(volledig.overtredingen),
        });

        if (!volledig.toegestaan) {
          void logEvent({
            categorie: 'compliance',
            type: 'warning',
            bericht: `Outputcontrole zag pas bij de volledige respons een treffer · ${volledig.overtredingen
              .map((o) => o.regel)
              .join(', ')}`,
            metadata: {
              poging: 'volledig',
              conversatie_id: conversatieId,
              regels: volledig.overtredingen.map((o) => o.regel),
            },
          });
        }

        stuur({ type: 'klaar' });
      } catch (err) {
        console.error('[site-agent] generatie faalde:', err);
        void logEvent({
          categorie: 'llm',
          type: 'error',
          bericht: 'Generatie faalde',
          metadata: {
            conversatie_id: conversatieId,
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
        const tokens = verbruik.invoer + verbruik.cacheGelezen + verbruik.cacheGeschreven;

        void verhoogVerbruik(conversatieId, tokens, kosten).catch((err) =>
          console.error('[site-agent] verbruik bijwerken faalde:', err),
        );
        void boekKosten(kosten);
        void logEvent({
          categorie: 'llm',
          bericht: `Claude chat · playbook=${playbook}`,
          metadata: {
            model: SITE_AGENT_MODEL,
            conversatie_id: conversatieId,
            playbook,
            duration_ms: Date.now() - start,
            input_tokens: verbruik.invoer,
            output_tokens: verbruik.uitvoer,
            cache_read_tokens: verbruik.cacheGelezen,
            cache_create_tokens: verbruik.cacheGeschreven,
            cost_usd: Number(kosten.toFixed(6)),
          },
        });

        sluitAf();
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
