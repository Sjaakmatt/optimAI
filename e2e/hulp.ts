import type { Page, Route } from '@playwright/test';

/**
 * Gedeelde hulp voor de widget-tests.
 *
 * De rode draad: geen enkele test mag een echte modelcall doen. Dat kost geld,
 * maakt de suite traag en laat hem falen op dingen die niets met de widget te
 * maken hebben. Het chat-endpoint wordt daarom onderschept en beantwoord met
 * een vaste stream.
 */

/** De widget meldt zich na deze tijd; iets ruimer genomen dan de code zelf. */
export const WACHTTIJD_MS = 6_000;

/**
 * Bouwt een SSE-antwoord zoals het echte endpoint dat streamt.
 *
 * De vorm staat in app/api/v1/site-agent/chat/route.ts: events van het type
 * delta, signaal en klaar, elk als `data: {json}` met een lege regel erachter.
 * Wijkt die vorm ooit af, dan valt deze helper om — en dat is precies de
 * bedoeling, want dan klopt de test niet meer met de werkelijkheid.
 */
export function bouwStream(stukken: string[], signaal?: { naam: string; payload?: unknown }): string {
  const regels = stukken.map((tekst) => `data: ${JSON.stringify({ type: 'delta', tekst })}\n\n`);
  if (signaal) {
    regels.push(
      `data: ${JSON.stringify({ type: 'signaal', naam: signaal.naam, payload: signaal.payload ?? {} })}\n\n`,
    );
  }
  regels.push(`data: ${JSON.stringify({ type: 'klaar' })}\n\n`);
  return regels.join('');
}

export interface Beurt {
  antwoord?: string[];
  signaal?: { naam: string; payload?: unknown };
}

export interface OnderscheppenOpties {
  antwoord?: string[];
  signaal?: { naam: string; payload?: unknown };
  /**
   * Antwoord per beurt, op volgorde. Nodig zodra een test afhangt van wat de
   * agent de tweede keer doet, bijvoorbeeld een terugbelaanbod dat na een
   * afwijzing opnieuw komt. Is de lijst op, dan blijft de laatste beurt gelden.
   * Staat dit gevuld, dan winnen deze beurten van `antwoord` en `signaal`.
   */
  beurten?: Beurt[];
  /** Alle berichten die de widget naar het endpoint stuurde. */
  verstuurd?: Array<Record<string, unknown>>;
}

/**
 * Vangt het chat-endpoint af. Vult `opties.verstuurd` met wat de widget
 * verstuurde, zodat een test kan controleren dat een tik op een snelle antwoord
 * ook echt dat bericht verstuurt.
 */
export async function onderscheptChat(page: Page, opties: OnderscheppenOpties = {}): Promise<void> {
  const standaard = ['Helder. Hoeveel mensen zijn daar bij jullie mee bezig?'];
  const beurten: Beurt[] =
    opties.beurten && opties.beurten.length > 0
      ? opties.beurten
      : [{ antwoord: opties.antwoord ?? standaard, signaal: opties.signaal }];
  let teller = 0;

  await page.route('**/api/v1/site-agent/chat', async (route: Route) => {
    const body = route.request().postDataJSON() as Record<string, unknown> | null;
    if (body && opties.verstuurd) opties.verstuurd.push(body);

    const beurt = beurten[Math.min(teller, beurten.length - 1)];
    teller += 1;

    await route.fulfill({
      status: 200,
      headers: { 'content-type': 'text/event-stream; charset=utf-8', 'cache-control': 'no-cache' },
      body: bouwStream(beurt.antwoord ?? standaard, beurt.signaal),
    });
  });
}

/**
 * De afrond-route wordt via sendBeacon aangeroepen bij het sluiten. Zonder deze
 * afvang komt er een 500 uit (geen database in de testomgeving) en dat vervuilt
 * de console-uitvoer van elke test die het paneel sluit.
 */
export async function onderscheptAfronden(page: Page): Promise<void> {
  await page.route('**/api/v1/site-agent/afronden', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
  );
}

/**
 * Zet een cookiekeuze klaar, zodat de banner niet verschijnt.
 *
 * Dit is geen truc om iets weg te moffelen. De banner staat op `z-[200]` en
 * bedekt onderaan het scherm precies de hoek waar de widget zit, dus zonder
 * keuze test je de banner in plaats van de widget.
 *
 * Wel iets om te weten: een bezoeker die voor het eerst komt heeft die banner
 * dus óók over de chatknop staan tot hij kiest. Dat is een echt aandachtspunt
 * voor de conversie, niet iets dat deze helper oplost.
 */
export async function zetCookiekeuze(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'factumai.consent.v2',
      JSON.stringify({ analytics: false, marketing: false }),
    );
  });
}

/** Alles wat de widget nodig heeft om te draaien zonder externe diensten. */
export async function stelWidgetIn(page: Page, opties: OnderscheppenOpties = {}): Promise<void> {
  await zetCookiekeuze(page);
  await onderscheptChat(page, opties);
  await onderscheptAfronden(page);
}
