// Onderhoudsmodus: met ONDERHOUD_MODUS=true gaat elke paginaweergave naar
// /onderhoud, met een 503 en een Retry-After zodat zoekmachines later terugkomen
// in plaats van de tijdelijke pagina te onthouden. De API, assets en de
// bestanden voor zoekmachines lopen gewoon door. Zie lib/onderhoud.ts voor de
// beslissing en docs/onderhoud.md voor het gebruik.

import { NextResponse, type NextRequest } from 'next/server';
import {
  ONDERHOUD_COOKIE,
  ONDERHOUD_PAD,
  ONDERHOUD_QUERY,
  ONDERHOUD_RETRY_AFTER_SECONDEN,
  beslisOnderhoud,
  onderhoudActief,
} from '@/lib/onderhoud';

export function middleware(request: NextRequest) {
  const actief = onderhoudActief();
  if (!actief) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;
  const besluit = beslisOnderhoud({
    actief,
    pad: pathname,
    sleutel: process.env.ONDERHOUD_SLEUTEL,
    cookie: request.cookies.get(ONDERHOUD_COOKIE)?.value,
    query: searchParams.get(ONDERHOUD_QUERY) ?? undefined,
  });

  if (besluit.soort === 'doorlaten') return NextResponse.next();

  if (besluit.soort === 'vrijstellen') {
    const schoon = request.nextUrl.clone();
    schoon.searchParams.delete(ONDERHOUD_QUERY);
    const antwoord = NextResponse.redirect(schoon);
    antwoord.cookies.set(ONDERHOUD_COOKIE, besluit.cookie, {
      httpOnly: true,
      sameSite: 'lax',
      secure: request.nextUrl.protocol === 'https:',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return antwoord;
  }

  const doel = request.nextUrl.clone();
  doel.pathname = ONDERHOUD_PAD;
  doel.search = '';
  return NextResponse.rewrite(doel, {
    status: 503,
    headers: {
      'Retry-After': String(ONDERHOUD_RETRY_AFTER_SECONDEN),
      'Cache-Control': 'no-store',
    },
  });
}

export const config = {
  // Alles behalve de Next-interne routes en bestanden met een extensie; de
  // fijnere uitzonderingen (api, onderhoudspagina) zitten in lib/onderhoud.ts.
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
