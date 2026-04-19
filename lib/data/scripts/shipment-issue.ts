import type { Script } from '@/lib/types';

export const script_shipment_issue: Script = {
  id: 'script_shipment_issue',
  eventTitle: 'Verzending — Vertraging A7',
  eventContext: 'Rit VD-4418 ±90 min vertraagd door ongeluk, 4 klanten geraakt',
  minutesSaved: 52,
  steps: [
    { kind: 'ticket', delay: 400 },
    { kind: 'status.update', statusText: 'Inkoop regelt tweede wagen via Bakker', delay: 600 },
    { kind: 'pickup', by: 'inkoop', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a1',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Opdracht Bakker Transport — overname 2 leveringen VD-4418',
        date: 'Vandaag · 10:08',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Wat',
        items: [
          'Tweede wagen Bakker neemt de leveringen Sneek en Bolsward over',
          'Ophalen over 20 minuten bij ons distributiecentrum',
          'Meerkosten € 165 — binnen mandaat tot € 200',
        ],
      },
      delay: 1600,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Effect',
        items: [
          'Sneek en Bolsward landen binnen oorspronkelijke slot',
          'Drachten en Joure krijgen ± 90 min vertraging via Van Dijk',
          'Beide getroffen klanten worden pro-actief geïnformeerd',
        ],
      },
      delay: 1600,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a1',
      footer: 'Opdracht gegeven · 12 min werk bespaard',
      minutesSaved: 12,
      delay: 700,
    },

    { kind: 'status.update', statusText: 'Klantservice informeert vier klanten', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'planning@bouwfriesland.nl',
        subject: 'Uw levering vanochtend — ± 90 minuten later',
        date: 'Vandaag · 10:14',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Beste team Bouw Friesland,',
      delay: 900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Een korte melding: er is een ongeluk op de A7 richting Sneek waardoor onze chauffeur stilstaat. We verwachten dat uw levering in Drachten ongeveer 90 minuten later aankomt dan gepland (nieuwe inschatting: rond 12:00).',
      delay: 1800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Excuus voor het ongemak — dit was buiten onze invloed, maar we wilden het u eerder laten weten dan dat u er zelf achter komt.',
      delay: 1500,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Groet,\n\nSjoerd · Nordveld Klantenservice',
      delay: 1100,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a2',
      footer: 'Verstuurd · 10:14 · 6 min werk bespaard',
      minutesSaved: 6,
      delay: 700,
    },

    {
      kind: 'artifact.start',
      artifactId: 'a3',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'werk@vanderzwaag.nl',
        subject: 'Uw levering in Sneek — gewoon op tijd',
        date: 'Vandaag · 10:15',
      },
      delay: 900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a3',
      target: 'paragraph',
      paragraph: 'Beste Wytse,',
      delay: 800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a3',
      target: 'paragraph',
      paragraph:
        'Korte heads-up: er staat een file op de A7 door een ongeluk, dus we hebben een tweede wagen ingezet om uw levering op tijd in Sneek te krijgen. De wagen ziet er anders uit dan u gewend bent (Bakker Transport), chauffeur heeft onze pakbon bij zich.',
      delay: 1900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a3',
      target: 'paragraph',
      paragraph: 'Alles verder bij het oude. Fijne dag.',
      delay: 1300,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a3',
      target: 'paragraph',
      paragraph: 'Groet,\n\nSjoerd · Nordveld Klantenservice',
      delay: 1100,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a3',
      footer: 'Verstuurd · 10:15 · 5 min werk bespaard',
      minutesSaved: 5,
      delay: 700,
    },

    { kind: 'status.update', statusText: 'Laatste twee klanten krijgen bericht', delay: 500 },

    {
      kind: 'artifact.start',
      artifactId: 'a4',
      artifactType: 'whatsapp',
      meta: {
        customer: 'Bouwbedrijf Postma — Bolsward',
        phone: '+31 6 48 21 09 33',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a4',
      target: 'message',
      message: {
        from: 'us',
        text:
          'Hoi Herman, korte melding: door een ongeluk op de A7 hebben we een tweede wagen ingezet. Jullie levering in Bolsward haalt de oorspronkelijke tijd (13:30) gewoon. Andere vrachtwagen dan normaal — Bakker Transport, chauffeur heeft onze pakbon.',
        time: '10:18',
      },
      delay: 1500,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a4',
      target: 'message',
      message: {
        from: 'customer',
        text: 'Top, dank voor de seintje. We zijn klaar om aan te pakken.',
        time: '10:19',
      },
      delay: 1800,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a4',
      footer: 'Afgeleverd · klant bevestigd · 11 min werk bespaard',
      minutesSaved: 11,
      delay: 700,
    },

    {
      kind: 'artifact.start',
      artifactId: 'a5',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'info@timmerwerknoordoost.nl',
        subject: 'Uw levering in Joure — ± 90 min later',
        date: 'Vandaag · 10:21',
      },
      delay: 900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a5',
      target: 'paragraph',
      paragraph: 'Beste Klaas,',
      delay: 800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a5',
      target: 'paragraph',
      paragraph:
        'File op de A7 door een ongeluk: uw levering in Joure komt ongeveer 90 minuten later aan dan afgesproken — nieuwe verwachting rond 13:00. Onze chauffeur staat stil, we kunnen er op dit moment niet omheen.',
      delay: 1800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a5',
      target: 'paragraph',
      paragraph:
        'Als dit niet uitkomt — laat het weten, dan rijden we een tussenrit morgenochtend. Excuses voor het ongemak.',
      delay: 1600,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a5',
      target: 'paragraph',
      paragraph: 'Groet,\n\nSjoerd · Nordveld Klantenservice',
      delay: 1100,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a5',
      footer: 'Verstuurd · 10:21 · 18 min werk bespaard',
      minutesSaved: 18,
      delay: 700,
    },

    { kind: 'complete', totalMinutes: 52, delay: 600 },
  ],
};
