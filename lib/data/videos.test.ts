// De koppeling met het dashboard, met nadruk op wat er moet gebeuren als die
// koppeling het niet doet: de site hoort dan de oude lijst te tonen, niet een
// lege pagina.

import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';

import { FALLBACK_VIDEOS, getVideos } from './videos';

const ECHTE_FETCH = globalThis.fetch;
const ECHTE_URL = process.env.FACTUMAI_DASHBOARD_URL;

function antwoord(body: unknown, status = 200): void {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })) as typeof fetch;
}

function eenVideo(overschrijf: Record<string, unknown> = {}) {
  return {
    id: 'cuid1',
    titel: 'Uw mailbox, ondersteund door een agent.',
    slug: 'mail-automation',
    omschrijving: null,
    durationSec: 98,
    src: 'https://x.supabase.co/storage/v1/object/public/site-videos/a.mp4',
    poster: 'https://x.supabase.co/storage/v1/object/public/site-videos/a.jpg',
    uitgelicht: true,
    categorie: { naam: 'In de praktijk', slug: 'in-de-praktijk' },
    ...overschrijf,
  };
}

afterEach(() => {
  globalThis.fetch = ECHTE_FETCH;
  if (ECHTE_URL === undefined) delete process.env.FACTUMAI_DASHBOARD_URL;
  else process.env.FACTUMAI_DASHBOARD_URL = ECHTE_URL;
});

describe('getVideos', () => {
  it('zet het dashboard-antwoord om naar de vorm van de componenten', async () => {
    process.env.FACTUMAI_DASHBOARD_URL = 'https://dashboard.test';
    antwoord({ videos: [eenVideo()] });

    const { videos, categorieen, bron } = await getVideos();

    assert.equal(bron, 'dashboard');
    assert.equal(videos.length, 1);
    assert.equal(videos[0].id, 'mail-automation');
    assert.equal(videos[0].title, 'Uw mailbox, ondersteund door een agent.');
    // 98 seconden is 1:38 — hetzelfde formaat dat in de oude lijst stond.
    assert.equal(videos[0].duration, '1:38');
    assert.equal(videos[0].category, 'In de praktijk');
    assert.deepEqual(categorieen, [{ naam: 'In de praktijk', slug: 'in-de-praktijk' }]);
  });

  it('valt terug op de oude lijst zonder dashboard-URL', async () => {
    delete process.env.FACTUMAI_DASHBOARD_URL;
    const { videos, bron } = await getVideos();
    assert.equal(bron, 'fallback');
    assert.equal(videos.length, FALLBACK_VIDEOS.length);
  });

  it('valt terug als het dashboard een foutstatus geeft', async () => {
    process.env.FACTUMAI_DASHBOARD_URL = 'https://dashboard.test';
    antwoord({ error: 'kapot' }, 503);
    const { bron } = await getVideos();
    assert.equal(bron, 'fallback');
  });

  it('valt terug als het dashboard onbereikbaar is', async () => {
    process.env.FACTUMAI_DASHBOARD_URL = 'https://dashboard.test';
    globalThis.fetch = (async () => {
      throw new Error('ECONNREFUSED');
    }) as typeof fetch;
    const { bron } = await getVideos();
    assert.equal(bron, 'fallback');
  });

  it('toont de oude video’s als de bibliotheek leeg is', async () => {
    // Anders is /videos ineens leeg zodra iemand de laatste video op Concept
    // zet — een lege pagina is erger dan een verouderde.
    process.env.FACTUMAI_DASHBOARD_URL = 'https://dashboard.test';
    antwoord({ videos: [] });
    const { bron, videos } = await getVideos();
    assert.equal(bron, 'fallback');
    assert.equal(videos.length, FALLBACK_VIDEOS.length);
  });

  it('slaat een rij zonder bruikbare src of titel over', async () => {
    process.env.FACTUMAI_DASHBOARD_URL = 'https://dashboard.test';
    antwoord({
      videos: [eenVideo(), eenVideo({ src: null, slug: 'stuk' }), eenVideo({ titel: '  ', slug: 'leeg' })],
    });
    const { videos } = await getVideos();
    assert.equal(videos.length, 1);
  });

  it('verdraagt een video zonder categorie, poster of duur', async () => {
    process.env.FACTUMAI_DASHBOARD_URL = 'https://dashboard.test';
    antwoord({
      videos: [eenVideo({ categorie: null, poster: null, durationSec: null })],
    });
    const { videos, categorieen } = await getVideos();
    assert.equal(videos[0].category, null);
    assert.equal(videos[0].poster, null);
    assert.equal(videos[0].duration, '');
    assert.deepEqual(categorieen, []);
  });

  it('houdt de volgorde van de categorieën aan zoals het dashboard ze stuurt', async () => {
    process.env.FACTUMAI_DASHBOARD_URL = 'https://dashboard.test';
    antwoord({
      videos: [
        eenVideo({ slug: 'a', categorie: { naam: 'Tweede', slug: 'tweede' } }),
        eenVideo({ slug: 'b', categorie: { naam: 'Eerste', slug: 'eerste' } }),
        eenVideo({ slug: 'c', categorie: { naam: 'Tweede', slug: 'tweede' } }),
      ],
    });
    const { categorieen } = await getVideos();
    assert.deepEqual(
      categorieen.map((c) => c.slug),
      ['tweede', 'eerste'],
    );
  });
});
