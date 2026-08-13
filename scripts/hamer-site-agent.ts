// Hamert het chat-endpoint om te zien of de begrenzing echt dichtgaat.
//
//   npx tsx scripts/hamer-site-agent.ts                      lokaal
//   npx tsx scripts/hamer-site-agent.ts https://factumai.nl   tegen productie
//
// Wat je wilt zien: de eerste paar verzoeken komen door (200), daarna 429 op de
// sessielimiet, en met --parallel ook 429 op de botdetectie. Krijg je overal
// 200, dan staat de begrenzing niet aan; krijg je overal 503, dan staat de
// agent uit (SITE_AGENT_ENABLED).
//
// Let op: elk verzoek dat doorkomt kost een echte modelcall. Draai dit niet
// eindeloos tegen productie.

const basis = process.argv[2] ?? 'http://localhost:3000';
const parallel = process.argv.includes('--parallel');
const AANTAL = Number(process.env.HAMER_AANTAL ?? '15');

function nieuweSessie(): string {
  return crypto.randomUUID();
}

interface Uitkomst {
  status: number;
  melding: string;
}

async function stuur(sessionId: string, nummer: number): Promise<Uitkomst> {
  try {
    const res = await fetch(`${basis}/api/v1/site-agent/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        paginaPad: '/',
        bericht: `Testbericht ${nummer} van het hamerscript.`,
        playbook: 'home',
      }),
    });

    if (res.headers.get('content-type')?.includes('text/event-stream')) {
      // Stream meteen sluiten; we meten de begrenzing, niet het antwoord.
      await res.body?.cancel();
      return { status: res.status, melding: 'stream geopend' };
    }

    const body = (await res.json().catch(() => ({}))) as { error?: string };
    return { status: res.status, melding: body.error ?? '' };
  } catch (err) {
    return { status: 0, melding: err instanceof Error ? err.message : 'netwerkfout' };
  }
}

async function main(): Promise<void> {
  const sessionId = nieuweSessie();
  console.log(`Doel:    ${basis}`);
  console.log(`Sessie:  ${sessionId}`);
  console.log(`Modus:   ${parallel ? 'parallel (test ook de botdetectie)' : 'serieel'}\n`);

  const nummers = Array.from({ length: AANTAL }, (_, i) => i + 1);
  const uitkomsten: Uitkomst[] = [];

  if (parallel) {
    uitkomsten.push(...(await Promise.all(nummers.map((n) => stuur(sessionId, n)))));
  } else {
    for (const n of nummers) uitkomsten.push(await stuur(sessionId, n));
  }

  uitkomsten.forEach((u, i) => {
    console.log(`  ${String(i + 1).padStart(2)}  ${u.status}  ${u.melding.slice(0, 90)}`);
  });

  const perStatus = new Map<number, number>();
  for (const u of uitkomsten) perStatus.set(u.status, (perStatus.get(u.status) ?? 0) + 1);

  console.log('\nSamenvatting:');
  for (const [status, aantal] of [...perStatus].sort((a, b) => a[0] - b[0])) {
    console.log(`  ${status}: ${aantal}`);
  }

  const geweigerd = perStatus.get(429) ?? 0;
  if (geweigerd === 0) {
    console.log('\nLET OP: niets geweigerd. Staat de begrenzing wel aan?');
    process.exit(1);
  }
  console.log(`\nOK: ${geweigerd} verzoeken geweigerd door de begrenzing.`);
}

void main();
