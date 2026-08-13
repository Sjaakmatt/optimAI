import { defineConfig, devices } from '@playwright/test';

/**
 * Browsertests voor de site-agent-widget.
 *
 * Waarom een echte browser en geen componenttests: de fouten die we hier tot nu
 * toe hadden zaten allemaal in overgangen en in browserstate. Een wolkje dat
 * wegbleef door een sessionStorage-vlag uit een eerdere paginaweergave, en een
 * klik die in een ander scherm eindigde dan hij beloofde. Elk onderdeel klopte
 * op zichzelf; de naad ertussen niet. Dat vind je alleen door echt te klikken.
 *
 * Deze suite raakt geen enkele externe dienst. Het chat-endpoint wordt in de
 * test onderschept (zie e2e/hulp.ts), dus er gaat niets naar Anthropic of
 * Supabase en de tests kosten niets.
 */
export default defineConfig({
  testDir: './e2e',
  // De widget werkt met timers van seconden. Ruim genoeg, maar niet eindeloos:
  // een test die hangt moet falen en niet de hele run ophouden.
  timeout: 30_000,
  expect: { timeout: 10_000 },
  // Falen op een vergeten .only, zodat een halve run niet als groen doorgaat.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],

  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'on-first-retry',
    /**
     * Draai tegen een Chromium die er al staat, als PLAYWRIGHT_CHROMIUM_PATH
     * gezet is. Sommige ontwikkelomgevingen hebben een browser voorgeïnstalleerd
     * met een ander buildnummer dan deze Playwright-versie verwacht; zonder deze
     * uitweg wil hij dan alsnog honderden megabytes downloaden.
     *
     * In CI blijft de variabele leeg en gebruikt Playwright zijn eigen browser,
     * zodat daar wél de versie draait die bij deze release hoort.
     */
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : undefined,
  },

  /**
   * Beide profielen draaien op Chromium. Bewust geen iPhone-preset: die kiest
   * WebKit, en dan hangt de suite aan een tweede browser-download in CI voor
   * een verschil dat hier niet wordt getest. Wat we wél willen is het mobiele
   * formaat — daar viel het ons het eerst op en heeft de widget de minste
   * ruimte — en dat levert Pixel 5 met dezelfde engine.
   */
  projects: [
    { name: 'mobiel', use: { ...devices['Pixel 5'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],

  /**
   * Draait de echte productiebuild. Niet `next dev`: die gedraagt zich anders
   * (dubbele effects in StrictMode, andere bundling) en dan test je iets wat
   * bezoekers nooit zien.
   *
   * De site-agent staat standaard aan; alleen de sleutels ontbreken, en die
   * heeft deze suite niet nodig omdat het endpoint wordt onderschept.
   */
  webServer: {
    command: 'npm run build && npm run start -- --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
