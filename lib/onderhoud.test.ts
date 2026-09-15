import { test } from 'node:test';
import assert from 'node:assert/strict';
import { beslisOnderhoud, isVrijgesteldPad, onderhoudActief } from './onderhoud';

const SLEUTEL = 'zwaluw-1234';

test('onderhoudActief: alleen true/1/aan zetten de modus aan', () => {
  assert.equal(onderhoudActief({}), false);
  assert.equal(onderhoudActief({ ONDERHOUD_MODUS: '' }), false);
  assert.equal(onderhoudActief({ ONDERHOUD_MODUS: 'false' }), false);
  assert.equal(onderhoudActief({ ONDERHOUD_MODUS: 'uit' }), false);
  assert.equal(onderhoudActief({ ONDERHOUD_MODUS: 'true' }), true);
  assert.equal(onderhoudActief({ ONDERHOUD_MODUS: ' TRUE ' }), true);
  assert.equal(onderhoudActief({ ONDERHOUD_MODUS: '1' }), true);
  assert.equal(onderhoudActief({ ONDERHOUD_MODUS: 'aan' }), true);
});

test('vrijgestelde paden: onderhoudspagina, assets, api en zoekmachinebestanden', () => {
  for (const pad of [
    '/onderhoud',
    '/_next/static/chunks/main.js',
    '/_next/image?url=x',
    '/api/v1/site-agent/cron',
    '/api/cal-webhook',
    '/polder/lagen-dageraad/ver.webp',
    '/portret-cutout.webp',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.webmanifest',
    '/opengraph-image',
    '/icon.png',
    '/favicon.ico',
    '/f4c8a2e9d6b3791058acfe2d40b9c317.txt',
  ]) {
    assert.equal(isVrijgesteldPad(pad), true, pad);
  }
  for (const pad of ['/', '/diensten', '/kennis/ai-agent', '/scan', '/onderhoud/iets', '/v1.2']) {
    assert.equal(isVrijgesteldPad(pad), false, pad);
  }
});

test('modus uit: alles doorlaten', () => {
  assert.deepEqual(
    beslisOnderhoud({ actief: false, pad: '/', sleutel: SLEUTEL, cookie: undefined, query: undefined }),
    { soort: 'doorlaten' },
  );
});

test('modus aan: gewone pagina naar onderhoud, vrijgesteld pad door', () => {
  assert.deepEqual(
    beslisOnderhoud({ actief: true, pad: '/diensten', sleutel: undefined, cookie: undefined, query: undefined }),
    { soort: 'onderhoud' },
  );
  assert.deepEqual(
    beslisOnderhoud({ actief: true, pad: '/api/cal-webhook', sleutel: undefined, cookie: undefined, query: undefined }),
    { soort: 'doorlaten' },
  );
});

test('juiste sleutel in de query stelt vrij en zet de cookie', () => {
  assert.deepEqual(
    beslisOnderhoud({ actief: true, pad: '/', sleutel: SLEUTEL, cookie: undefined, query: SLEUTEL }),
    { soort: 'vrijstellen', cookie: SLEUTEL },
  );
});

test('geldige cookie laat door, verkeerde cookie of query niet', () => {
  assert.deepEqual(
    beslisOnderhoud({ actief: true, pad: '/kennis', sleutel: SLEUTEL, cookie: SLEUTEL, query: undefined }),
    { soort: 'doorlaten' },
  );
  assert.deepEqual(
    beslisOnderhoud({ actief: true, pad: '/kennis', sleutel: SLEUTEL, cookie: 'zwaluw-1235', query: undefined }),
    { soort: 'onderhoud' },
  );
  assert.deepEqual(
    beslisOnderhoud({ actief: true, pad: '/kennis', sleutel: SLEUTEL, cookie: undefined, query: 'fout' }),
    { soort: 'onderhoud' },
  );
});

test('zonder of met te korte sleutel is er geen vrijstelling, ook niet met een lege query', () => {
  assert.deepEqual(
    beslisOnderhoud({ actief: true, pad: '/', sleutel: undefined, cookie: '', query: '' }),
    { soort: 'onderhoud' },
  );
  assert.deepEqual(
    beslisOnderhoud({ actief: true, pad: '/', sleutel: 'kort', cookie: 'kort', query: 'kort' }),
    { soort: 'onderhoud' },
  );
});
