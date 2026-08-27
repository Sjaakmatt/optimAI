import { expect, test } from '@playwright/test';

import { zetCookiekeuze } from './hulp';

/**
 * De logostrook onder "In productie bij".
 *
 * Hij schakelt op een meting, niet op een breekpunt: past de rij, dan staat hij
 * stil; past hij niet, dan schuift hij door. Dat is precies het soort gedrag
 * dat stil kapot gaat zodra er een klant bij komt of een logo breder wordt, en
 * dan valt de rij weer uit elkaar over meerdere regels.
 *
 * Deze tests zetten de vensterbreedte zelf, dus ze draaien maar in één profiel.
 */
test.describe('logostrook', () => {
  test.skip(() => test.info().project.name !== 'desktop', 'zet de breedte zelf');

  test.beforeEach(async ({ page }) => {
    await zetCookiekeuze(page);
  });

  test('staat stil zolang de rij past', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const strook = page.locator('.logo-strook');
    await expect(strook).not.toHaveClass(/schuift/);
    await expect(page.locator('.logo-kopie')).toHaveCount(0);
  });

  test('schuift door zodra de rij te breed wordt', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 900 });
    await page.goto('/');

    const strook = page.locator('.logo-strook');
    await expect(strook).toHaveClass(/schuift/);

    // De lus loopt alleen naadloos rond als de kopie exact even breed is als
    // het origineel; de animatie schuift immers precies de helft op.
    const maten = await page.evaluate(() => {
      const rijen = [...document.querySelectorAll('.logo-strook .logo-rij')];
      return rijen.map((r) => Math.round(r.getBoundingClientRect().width));
    });
    expect(maten).toHaveLength(2);
    expect(maten[0]).toBe(maten[1]);
  });

  test('schakelt mee als het venster verandert', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const strook = page.locator('.logo-strook');
    await expect(strook).not.toHaveClass(/schuift/);

    await page.setViewportSize({ width: 700, height: 900 });
    await expect(strook).toHaveClass(/schuift/);

    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(strook).not.toHaveClass(/schuift/);
  });

  test('duwt de pagina niet breder dan het venster', async ({ page }) => {
    for (const breedte of [1440, 900, 700, 390]) {
      await page.setViewportSize({ width: breedte, height: 900 });
      await page.goto('/');
      await expect(page.locator('.logo-strook')).toBeVisible();
      const doc = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(doc, `horizontale overloop bij ${breedte}px`).toBeLessThanOrEqual(breedte);
    }
  });

  test('laat elke klant één keer aanklikbaar, ook tijdens het schuiven', async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 900 });
    await page.goto('/');
    await expect(page.locator('.logo-strook')).toHaveClass(/schuift/);

    // De kopie staat er puur voor het oog: geen tabstop, geen alt-tekst.
    const telbaar = page.locator('.logo-strook a:not([tabindex="-1"])');
    const alt = page.locator('.logo-strook img[alt=""]');
    expect(await telbaar.count()).toBe((await page.locator('.logo-strook a').count()) / 2);
    expect(await alt.count()).toBe(await telbaar.count());
  });
});
