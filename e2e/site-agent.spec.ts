import { expect, test } from '@playwright/test';

import { WACHTTIJD_MS, stelWidgetIn } from './hulp';

/**
 * De widget van de site-agent, geklikt in een echte browser.
 *
 * Elk van deze tests dekt iets dat in productie daadwerkelijk misging. Dat is
 * geen toeval maar de opzet: de fouten zaten niet in losse functies maar in de
 * naad tussen twee stukken die apart klopten, en in browserstate die een
 * paginaweergave overleefde. Daar komt geen unit test bij.
 */

const WOLKJE = /FACTUMAI · AI-AGENT/i;

/** Ruim boven de wachttijd, zodat een trage build de test niet laat wapperen. */
const RUIM = WACHTTIJD_MS + 4_000;

test.describe('de knop', () => {
  test('staat er, en is de enige zwevende knop', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/');

    await expect(page.getByRole('button', { name: /Stel je vraag aan de AI-agent/i })).toBeVisible();
    // De Cal-knop linksonder is eruit; twee zwevende knoppen lieten de bezoeker
    // kiezen tussen praten en plannen.
    await expect(page.getByRole('button', { name: 'Plan gesprek', exact: true })).toHaveCount(0);
  });

  test('opent het paneel', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/');

    await page.getByRole('button', { name: /Stel je vraag aan de AI-agent/i }).click();
    await expect(page.getByRole('dialog', { name: /agent van FactumAI/i })).toBeVisible();
  });
});

test.describe('het wolkje', () => {
  test('verschijnt vanzelf, met de zin van die pagina', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/branches/bouw');

    const wolkje = page.getByText(WOLKJE);
    await expect(wolkje).toBeVisible({ timeout: RUIM });
    await expect(page.getByText(/Meerwerk dat pas bij de eindafrekening/i)).toBeVisible();
  });

  test('toont een andere pagina een andere zin', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/branches/horeca?agent=nu');

    await expect(page.getByText(/Reserveringen en vragen via vier kanalen/i)).toBeVisible();
  });

  test('komt niet terug nadat de bezoeker hem wegklikt', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/');

    await expect(page.getByText(WOLKJE)).toBeVisible({ timeout: RUIM });
    await page.getByRole('button', { name: 'Niet nu' }).click();
    await expect(page.getByText(WOLKJE)).toHaveCount(0);

    // Een echte "nee" geldt de rest van de sessie, ook op een andere pagina.
    // Deze vlag overleeft een paginawissel; dat is precies waar hij eerder te
    // hardnekkig in was.
    await page.goto('/branches/bouw');
    await page.waitForTimeout(RUIM);
    await expect(page.getByText(WOLKJE)).toHaveCount(0);
  });

  test('komt wél terug op een volgende pagina als de bezoeker alleen keek', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/');

    // Paneel openen en meteen sluiten zonder iets te zeggen. Dat zette eerder
    // de rem erop voor de hele sessie, waardoor juist deze bezoeker — wel
    // nieuwsgierig, nog niet overtuigd — nooit meer een zetje kreeg.
    await page.getByRole('button', { name: /Stel je vraag aan de AI-agent/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Gesprek sluiten' }).click();

    await page.goto('/branches/bouw');
    await expect(page.getByText(WOLKJE)).toBeVisible({ timeout: RUIM });
  });

  test('verschijnt meteen met ?agent=nu, ook na wegklikken', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/');
    await expect(page.getByText(WOLKJE)).toBeVisible({ timeout: RUIM });
    await page.getByRole('button', { name: 'Niet nu' }).click();

    // De testschakelaar moet de sessievlaggen negeren, anders is hij nutteloos
    // op het moment dat je hem nodig hebt.
    await page.goto('/?agent=nu');
    await expect(page.getByText(WOLKJE)).toBeVisible();
  });
});

test.describe('van wolkje naar gesprek', () => {
  test('neemt de vraag mee waar de bezoeker op klikte', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/?agent=nu');

    const vraag = 'Welk proces kost bij jullie wekelijks de meeste tijd?';
    await expect(page.getByText(vraag)).toBeVisible();

    await page.getByRole('button', { name: /Antwoord geven/i }).click();

    // De kern: je klikt op "Antwoord geven" en belandt in een gesprek dat met
    // diezelfde vraag begint. Eerder stond er in het paneel een ándere vraag en
    // leverde de klik niets op behalve een geopend, leeg scherm.
    const paneel = page.getByRole('dialog');
    await expect(paneel).toBeVisible();
    await expect(paneel.getByText(vraag)).toBeVisible();
  });

  test('toont koud via de knop juist de langere opening', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/');

    await page.getByRole('button', { name: /Stel je vraag aan de AI-agent/i }).click();

    const paneel = page.getByRole('dialog');
    await expect(paneel.getByText('Waar ben je naar op zoek?')).toBeVisible();
    // Die bezoeker heeft het wolkje nooit gezien, dus die vraag hoort er niet.
    await expect(paneel.getByText(/Welk proces kost bij jullie wekelijks/i)).toHaveCount(0);
  });
});

test.describe('snelle antwoorden', () => {
  test('staan onder de opening en verdwijnen na gebruik', async ({ page }) => {
    const verstuurd: Array<Record<string, unknown>> = [];
    await stelWidgetIn(page, { verstuurd });
    await page.goto('/branches/bouw');

    await page.getByRole('button', { name: /Stel je vraag aan de AI-agent/i }).click();

    const chip = page.getByRole('button', { name: 'Meerwerk vastleggen', exact: true });
    await expect(chip).toBeVisible();
    await expect(page.getByRole('button', { name: 'Iets anders', exact: true })).toBeVisible();

    await chip.click();

    // Wat op de knop staat is wat er verstuurd wordt: anders leest het
    // transcript raar en kan de scoring er niets mee.
    await expect.poll(() => verstuurd.length).toBeGreaterThan(0);
    expect(verstuurd[0].bericht).toBe('Meerwerk vastleggen');

    // Daarna sturen ze het gesprek niet meer maar staan ze in de weg.
    await expect(chip).toHaveCount(0);
  });

  test('verschillen per pagina', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/branches/horeca');
    await page.getByRole('button', { name: /Stel je vraag aan de AI-agent/i }).click();

    await expect(page.getByRole('button', { name: 'Reserveringen bijhouden', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Meerwerk vastleggen', exact: true })).toHaveCount(0);
  });
});

test.describe('terugbelverzoek', () => {
  test('toont de ja/nee-keuze op het signaal van de agent', async ({ page }) => {
    await stelWidgetIn(page, {
      antwoord: ['Dat klinkt herkenbaar.'],
      signaal: { naam: 'terugbellen', payload: { aanleiding: 'meerwerk vastleggen' } },
    });
    await page.goto('/branches/bouw');

    await page.getByRole('button', { name: /Stel je vraag aan de AI-agent/i }).click();
    await page.getByRole('button', { name: 'Meerwerk vastleggen', exact: true }).click();

    await expect(page.getByText(/Zal ik zorgen dat we je hierover bellen/i)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ja, graag' })).toBeVisible();
  });

  test('vraagt pas om gegevens na een ja, en toont de toestemming', async ({ page }) => {
    await stelWidgetIn(page, {
      antwoord: ['Dat klinkt herkenbaar.'],
      signaal: { naam: 'terugbellen', payload: { aanleiding: 'meerwerk' } },
    });
    await page.goto('/branches/bouw');

    await page.getByRole('button', { name: /Stel je vraag aan de AI-agent/i }).click();
    await page.getByRole('button', { name: 'Meerwerk vastleggen', exact: true }).click();
    await page.getByRole('button', { name: 'Ja, graag' }).click();

    await expect(page.getByPlaceholder('Telefoonnummer')).toBeVisible();
    // De toestemmingstekst is een belofte aan de bezoeker en moet zichtbaar
    // zijn op het moment dat hij hem geeft, niet verstopt achter een link.
    await expect(page.getByText(/mag contact met mij opnemen over dit gesprek/i)).toBeVisible();
  });
});

test.describe('transparantie', () => {
  test('noemt zichzelf een AI-agent, en geen persoonsnaam', async ({ page }) => {
    await stelWidgetIn(page);
    await page.goto('/?agent=nu');

    // AI Act: de bubbel mag niet als mens overkomen.
    await expect(page.getByText(WOLKJE)).toBeVisible();

    await page.getByRole('button', { name: /Antwoord geven/i }).click();
    const paneel = page.getByRole('dialog');
    await expect(paneel.getByText(/Dit is een AI-agent van FactumAI/i)).toBeVisible();
    await expect(paneel.getByText(/\bSjaak\b/)).toHaveCount(0);
  });
});
