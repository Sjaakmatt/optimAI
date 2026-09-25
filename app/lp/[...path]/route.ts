import { proxyLandingRequest } from '@/lib/ads/landing-proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 20;

export async function GET(request: Request) { return proxyLandingRequest(request); }
export async function HEAD(request: Request) { return proxyLandingRequest(request); }
export async function POST(request: Request) { return proxyLandingRequest(request); }
