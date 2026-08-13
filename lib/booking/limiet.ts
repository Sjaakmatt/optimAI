// Rem op de publieke agenda-endpoints.
//
// Boeken is de gevoeligste actie op de site: het zet iets in de agenda van een
// mens en stuurt een mail zijn kant op. Zonder rem kan één bezoeker een dag
// volplempen. We tellen daarom per IP, met dezelfde atomaire teller als de
// site-agent (lib/site-agent/ratelimit.ts) — één telmechanisme, één plek waar
// de vensters staan.
//
// Slots opvragen is goedkoper maar niet gratis: elke aanvraag is een call naar
// Graph. Die krijgt een ruimere rem.
//
// Faalt de teller, dan laten we het opvragen door en weigeren we het boeken.
// Lezen zonder zicht op misbruik is te overzien; schrijven niet.

import { hashIp, hoogOp } from '@/lib/site-agent/ratelimit';

export const LIMIET_SLOTS_PER_IP = Number(process.env.BOEKING_LIMIET_SLOTS ?? '60');
export const VENSTER_SLOTS_SECONDEN = 60 * 60;

export const LIMIET_BOEKINGEN_PER_IP = Number(process.env.BOEKING_LIMIET_BOEKINGEN ?? '3');
export const VENSTER_BOEKINGEN_SECONDEN = 24 * 60 * 60;

export interface LimietResultaat {
  toegestaan: boolean;
  melding?: string;
}

export async function magSlotsOpvragen(ipHash: string): Promise<LimietResultaat> {
  const stand = await hoogOp('agenda-slots', ipHash, VENSTER_SLOTS_SECONDEN);
  if (stand !== null && stand > LIMIET_SLOTS_PER_IP) {
    return {
      toegestaan: false,
      melding: 'Er zijn vanaf dit netwerk veel aanvragen gedaan. Probeer het later opnieuw.',
    };
  }
  return { toegestaan: true };
}

export const LIMIET_BOEKINGEN_PER_EMAIL = Number(process.env.BOEKING_LIMIET_PER_EMAIL ?? '3');

/**
 * Mag er een aanvraag gedaan worden? Telt per IP én per mailadres.
 *
 * Die tweede teller is er omdat het aanvragen een mail naar een adres stuurt
 * dat de aanvrager zelf kiest. Alleen op IP tellen laat een botnet één postbus
 * volgooien met opt-in mails; op mailadres tellen zet daar een rem op, ongeacht
 * waar het vandaan komt. Het adres wordt gehasht: voor een teller is de
 * identiteit niet nodig.
 */
export async function magBoeken(ipHash: string, email: string): Promise<LimietResultaat> {
  const stand = await hoogOp('agenda-boeking', ipHash, VENSTER_BOEKINGEN_SECONDEN);
  if (stand === null) {
    return {
      toegestaan: false,
      melding:
        'Ik kan de afspraak nu niet vastleggen. Probeer het zo nog eens, of mail naar info@factumai.nl.',
    };
  }
  if (stand > LIMIET_BOEKINGEN_PER_IP) {
    return {
      toegestaan: false,
      melding:
        'Er staan al een paar afspraken vanaf dit netwerk. Mail even naar info@factumai.nl, dan regelen we het persoonlijk.',
    };
  }

  const perEmail = await hoogOp(
    'agenda-boeking-email',
    hashIp(email.trim().toLowerCase()),
    VENSTER_BOEKINGEN_SECONDEN,
  );
  if (perEmail !== null && perEmail > LIMIET_BOEKINGEN_PER_EMAIL) {
    return {
      toegestaan: false,
      melding:
        'Er zijn vandaag al een paar aanvragen naar dit mailadres gestuurd. Kijk even in je inbox, of mail naar info@factumai.nl.',
    };
  }

  return { toegestaan: true };
}
