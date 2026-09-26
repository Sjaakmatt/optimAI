import assert from 'node:assert/strict';
import { test } from 'node:test';
import { proxyLandingRequest } from './landing-proxy';

const env = { VERCEL: '1', LANDING_PROXY_SECRET: 'test-only-proxy-secret-at-least-32-characters', PUBLIC_SITE_ORIGIN: 'https://factumai.nl', FACTUMAI_ADS_ORIGIN: 'https://factumai-ads.terveldholding.workers.dev' };
const ip = '203.0.113.12';
const request = (path = '/lp/minder-handwerk/', init: RequestInit = {}) => new Request(`https://factumai.nl${path}`, { ...init, headers: { 'x-vercel-forwarded-for': ip, ...init.headers } });
const post = (headers: Record<string, string> = {}, body = 'name=Test&formToken=signed') => request('/lp/minder-handwerk/submit', { method: 'POST', headers: { Origin: 'https://factumai.nl', 'Content-Type': 'application/x-www-form-urlencoded', ...headers }, body });
function fakeFetch(response: () => Response | Promise<Response> = () => new Response('<h1>Pagina</h1>', { headers: { 'Content-Type': 'text/html' } })) {
  const calls: { url: URL; options: RequestInit }[] = [];
  const fetcher: typeof fetch = async (input, options) => { calls.push({ url: new URL(String(input)), options: options ?? {} }); return response(); };
  return { calls, fetcher };
}

test('public HTML retains security headers while cache and cookies are suppressed', async () => {
  const fake = fakeFetch(() => new Response('<h1>Live</h1>', { headers: { 'Content-Type': 'text/html', 'Set-Cookie': 'secret=should-not-leak', 'Content-Security-Policy': "form-action 'self'", 'Cache-Control': 'public, max-age=3600', 'x-factumai-proxy-secret': 'never-return' } }));
  const response = await proxyLandingRequest(request(), { env, ...fake });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('set-cookie'), null);
  assert.equal(response.headers.get('x-factumai-proxy-secret'), null);
  assert.equal(response.headers.get('content-security-policy'), "form-action 'self'");
  assert.equal(await response.text(), '<h1>Live</h1>');
  assert.equal(fake.calls[0].options.redirect, 'manual');
  assert.equal(fake.calls[0].options.cache, 'no-store');
});

test('only UTM query keys reach the fixed worker and values are bounded', async () => {
  const fake = fakeFetch();
  await proxyLandingRequest(request(`/lp/minder-handwerk/?utm_source=google&utm_campaign=${'a'.repeat(250)}&redirect=https://evil.test&secret=oops&utm_source=forged`), { env, ...fake });
  const url = fake.calls[0].url;
  assert.equal(url.origin, env.FACTUMAI_ADS_ORIGIN);
  assert.equal(url.searchParams.get('utm_source'), 'google');
  assert.equal(url.searchParams.get('utm_campaign')?.length, 200);
  assert.equal(url.searchParams.size, 2);
});

test('path traversal, encoded paths, admin routes and wrong methods never reach the worker', async () => {
  const fake = fakeFetch();
  for (const path of ['/api/leads', '/lp/ab', '/lp/a--b', '/lp/%61bc', '/lp/abc%2Fsubmit', '/lp/abc/extra', '/lp/abc/../../api/leads']) {
    const response = await proxyLandingRequest(request(path), { env, ...fake });
    assert.equal(response.status, 404, path);
  }
  for (const [path, method] of [['/lp/abc', 'POST'], ['/lp/abc/submit', 'GET'], ['/lp/abc/bedankt', 'POST'], ['/lp/abc', 'DELETE']]) {
    assert.equal((await proxyLandingRequest(request(path, { method }), { env, ...fake })).status, 405);
  }
  assert.equal(fake.calls.length, 0);
});

test('missing configuration or trusted platform IP fails closed', async () => {
  const fake = fakeFetch();
  for (const environment of [{ ...env, LANDING_PROXY_SECRET: '' }, { ...env, VERCEL: '' }, { ...env, FACTUMAI_ADS_ORIGIN: 'https://worker.test/api' }, { ...env, PUBLIC_SITE_ORIGIN: 'http://factumai.nl' }]) {
    assert.equal((await proxyLandingRequest(request(), { env: environment, ...fake })).status, 503);
  }
  for (const value of ['', '203.0.113.1, 203.0.113.2', 'not-an-ip', 'fe80::1%eth0']) {
    assert.equal((await proxyLandingRequest(request('/lp/abc', { headers: { 'x-vercel-forwarded-for': value, 'x-forwarded-for': ip } }), { env, ...fake })).status, 503);
  }
  assert.equal(fake.calls.length, 0);
});

test('browser Origin must match the configured production origin and request origin', async () => {
  const fake = fakeFetch();
  for (const value of ['', 'null', 'https://evil.test', 'https://factumai.nl.evil.test', 'https://factumai.nl/']) {
    assert.equal((await proxyLandingRequest(post({ Origin: value }), { env, ...fake })).status, 403);
  }
  const preview = new Request('https://preview.vercel.app/lp/minder-handwerk/submit', post());
  assert.equal((await proxyLandingRequest(preview, { env, ...fake })).status, 403);
  assert.equal(fake.calls.length, 0);
});

test('forwarded secret and IP are regenerated; browser cookies, auth and forged headers are dropped', async () => {
  const fake = fakeFetch(() => new Response(null, { status: 303, headers: { Location: '/lp/minder-handwerk/bedankt' } }));
  const response = await proxyLandingRequest(post({ Cookie: 'admin=session', Authorization: 'Bearer visitor', 'x-factumai-proxy-secret': 'forged', 'x-factumai-visitor-ip': '192.0.2.1', 'x-forwarded-for': '192.0.2.2' }), { env, ...fake });
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), '/lp/minder-handwerk/bedankt');
  const headers = new Headers(fake.calls[0].options.headers);
  assert.equal(headers.get('x-factumai-proxy-secret'), env.LANDING_PROXY_SECRET);
  assert.equal(headers.get('x-factumai-visitor-ip'), ip);
  assert.equal(headers.get('origin'), 'https://factumai.nl');
  for (const key of ['cookie', 'authorization', 'x-forwarded-for', 'x-vercel-forwarded-for']) assert.equal(headers.get(key), null);
  assert.equal(new TextDecoder().decode(fake.calls[0].options.body as ArrayBuffer), 'name=Test&formToken=signed');
});

test('IPv6 addresses are canonicalized before forwarding', async () => {
  const fake = fakeFetch();
  await proxyLandingRequest(request('/lp/abc', { headers: { 'x-vercel-forwarded-for': '2001:0db8:0000:0000:0000:0000:0000:0001' } }), { env, ...fake });
  assert.equal(new Headers(fake.calls[0].options.headers).get('x-factumai-visitor-ip'), '2001:db8::1');
});

test('POST type and body limits apply even with a forged small Content-Length', async () => {
  const fake = fakeFetch();
  assert.equal((await proxyLandingRequest(post({ 'Content-Type': 'application/json' }), { env, ...fake })).status, 415);
  assert.equal((await proxyLandingRequest(post({ 'Content-Length': '65537' }), { env, ...fake })).status, 413);
  assert.equal((await proxyLandingRequest(post({ 'Content-Length': '1' }, 'x'.repeat(65537)), { env, ...fake })).status, 413);
  assert.equal(fake.calls.length, 0);
});

test('only the exact relative confirmation redirect is allowed', async () => {
  for (const location of ['https://evil.test', '//evil.test', '/api/leads', '/lp/another/bedankt', '/lp/minder-handwerk/bedankt?secret=1']) {
    const fake = fakeFetch(() => new Response(null, { status: 303, headers: { Location: location } }));
    const response = await proxyLandingRequest(post(), { env, ...fake });
    assert.equal(response.status, 502, location);
    assert.equal(response.headers.get('location'), null);
  }
  const fake = fakeFetch(() => new Response(null, { status: 307, headers: { Location: '/lp/minder-handwerk/bedankt' } }));
  assert.equal((await proxyLandingRequest(post(), { env, ...fake })).status, 502);
});

test('HEAD returns headers without a body and preserves upstream not-found', async () => {
  const fake = fakeFetch(() => new Response(null, { status: 404, headers: { 'Content-Type': 'text/html' } }));
  const response = await proxyLandingRequest(request('/lp/abc/bedankt', { method: 'HEAD' }), { env, ...fake });
  assert.equal(response.status, 404);
  assert.equal(await response.text(), '');
});

test('timeouts and upstream errors do not expose exception details or secrets', async () => {
  const fetcher: typeof fetch = async (_input, options) => new Promise((_resolve, reject) => options?.signal?.addEventListener('abort', () => reject(new Error(`secret=${env.LANDING_PROXY_SECRET}`))));
  const response = await proxyLandingRequest(request(), { env, fetcher, timeoutMs: 5 });
  assert.equal(response.status, 502);
  assert.equal((await response.text()).includes(env.LANDING_PROXY_SECRET), false);
});

test('the visitor user agent is forwarded bounded, only for aggregate view counting', async () => {
  const fake = fakeFetch();
  await proxyLandingRequest(request('/lp/minder-handwerk/', { headers: { 'User-Agent': `Mozilla/5.0 ${'x'.repeat(400)}` } }), { env, ...fake });
  const headers = new Headers(fake.calls[0].options.headers);
  assert.equal(headers.get('x-factumai-visitor-ua')?.length, 300);
  assert.ok(headers.get('x-factumai-visitor-ua')?.startsWith('Mozilla/5.0 '));
  const none = fakeFetch();
  await proxyLandingRequest(request('/lp/minder-handwerk/'), { env, ...none });
  assert.equal(new Headers(none.calls[0].options.headers).get('x-factumai-visitor-ua'), null);
});
