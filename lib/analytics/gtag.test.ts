import { strict as assert } from 'node:assert';
import { after, before, beforeEach, describe, it } from 'node:test';

let tags: typeof import('./gtag');
const oldGaId = process.env.NEXT_PUBLIC_GA_ID;
const oldAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');

before(async () => {
  process.env.NEXT_PUBLIC_GA_ID = 'G-TEST';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456';
  tags = await import('./gtag');
});

after(() => {
  if (oldGaId === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
  else process.env.NEXT_PUBLIC_GA_ID = oldGaId;
  if (oldAdsId === undefined) delete process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  else process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = oldAdsId;
  if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow);
  else Reflect.deleteProperty(globalThis, 'window');
  if (oldDocument) Object.defineProperty(globalThis, 'document', oldDocument);
  else Reflect.deleteProperty(globalThis, 'document');
});

function commands(): unknown[][] {
  return (window.dataLayer ?? []).map((command) => Array.from(command as ArrayLike<unknown>));
}

describe('Google consent tijdens dezelfde browsersessie', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        location: { href: 'https://factumai.nl/contact' },
        localStorage: { getItem: () => null },
      },
    });
    Object.defineProperty(globalThis, 'document', {
      configurable: true, value: { title: 'Contact' },
    });
  });

  it('maakt zonder toestemming geen Google-queue of meetevents', () => {
    tags.syncGoogleConsent(null);
    tags.syncGoogleConsent({ analytics: false, marketing: false });
    tags.pageview('/contact');
    tags.trackEvent('contact_submit');
    assert.equal(window.gtag, undefined);
    assert.equal(window.dataLayer, undefined);
    assert.equal((window as unknown as Record<string, unknown>)['ga-disable-G-TEST'], true);
  });

  it('zet denied defaults en de keuze vóór enige config klaar', () => {
    tags.syncGoogleConsent({ analytics: true, marketing: false });
    const calls = commands();
    assert.deepEqual(calls[0], ['consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    }]);
    assert.deepEqual(calls[2], ['consent', 'update', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    }]);
    assert.deepEqual(calls[3], ['config', 'G-TEST', { send_page_view: false }]);
    assert.equal(calls.some((call) => call[0] === 'event'), false);
  });

  it('blokkeert onmiddellijk na intrekken, ook met oude toestemming in opslag', () => {
    window.localStorage.getItem = () => '{"analytics":true,"marketing":true}';
    tags.syncGoogleConsent({ analytics: true, marketing: true });
    tags.pageview('/contact');
    tags.trackEvent('contact_submit');
    const eventsBefore = commands().filter((call) => call[0] === 'event').length;
    assert.equal(eventsBefore, 2);

    tags.syncGoogleConsent({ analytics: false, marketing: false });
    tags.pageview('/bedankt');
    tags.trackEvent('contact_submit');
    assert.equal(commands().filter((call) => call[0] === 'event').length, eventsBefore);
    assert.equal((window as unknown as Record<string, unknown>)['ga-disable-G-TEST'], true);
    assert.deepEqual(tags.currentGoogleConsent(), { analytics: false, marketing: false });
    assert.deepEqual(commands().at(-1), ['consent', 'update', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    }]);
  });

  it('meet geen Analytics-events met alleen marketingtoestemming', () => {
    tags.syncGoogleConsent({ analytics: false, marketing: true });
    tags.pageview('/contact');
    tags.trackEvent('contact_submit');
    assert.deepEqual(commands().filter((call) => call[0] === 'config'), [['config', 'AW-123456']]);
    assert.equal(commands().some((call) => call[0] === 'event'), false);
  });

  it('configureert een later toegevoegde categorie eenmalig en kan opnieuw toestemming geven', () => {
    tags.syncGoogleConsent({ analytics: true, marketing: false });
    tags.syncGoogleConsent({ analytics: true, marketing: true });
    tags.syncGoogleConsent({ analytics: false, marketing: false });
    tags.syncGoogleConsent({ analytics: true, marketing: false });
    tags.syncGoogleConsent({ analytics: true, marketing: false });
    assert.equal(commands().filter((call) => call[0] === 'config' && call[1] === 'G-TEST').length, 1);
    assert.equal(commands().filter((call) => call[0] === 'config' && call[1] === 'AW-123456').length, 1);
    assert.equal(commands().filter((call) => call[0] === 'consent' && call[1] === 'update').length, 4);
    assert.equal((window as unknown as Record<string, unknown>)['ga-disable-G-TEST'], false);
    tags.trackEvent('contact_submit', { send_to: 'AW-123456' });
    assert.deepEqual(commands().at(-1), ['event', 'contact_submit', { send_to: 'G-TEST' }]);
  });

  it('onthoudt intrekken ook wanneer localStorage niet beschikbaar is', () => {
    window.localStorage.getItem = () => { throw new Error('blocked'); };
    tags.syncGoogleConsent({ analytics: true, marketing: true });
    tags.syncGoogleConsent({ analytics: false, marketing: false });
    assert.deepEqual(tags.currentGoogleConsent(), { analytics: false, marketing: false });
    tags.trackEvent('contact_submit');
    assert.equal(commands().some((call) => call[0] === 'event'), false);
  });

  it('is veilig bij server-rendering', () => {
    Reflect.deleteProperty(globalThis, 'window');
    tags.syncGoogleConsent({ analytics: true, marketing: true });
    tags.pageview('/contact');
    tags.trackEvent('contact_submit');
    assert.equal(tags.currentGoogleConsent(), null);
  });
});
