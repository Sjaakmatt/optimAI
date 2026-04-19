import type { Script } from '@/lib/types';

export const script_shipment_issue: Script = {
  id: 'script_shipment_issue',
  eventTitle: 'Verzending — Vertraging A7',
  eventContext: 'Rit VD-4418 ±90 min vertraagd door ongeluk · 4 klanten geraakt',
  minutesSaved: 78,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Verzending splitst de rit op klant-niveau', delay: 600 },
    { kind: 'pickup', by: 'verzending', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Rit VD-4418 details',
        value: 'Drachten 10:30 · Joure 11:30 · Sneek 12:30 · Bolsward 13:30 · ±90 min vertraging',
        by: 'verzending',
        tone: 'log',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Bakker Transport beschikbaarheid',
        value: '2e wagen vrij vanaf 10:30 · prijs € 165 · binnen mandaat #ver-3 (€ 200)',
        by: 'verzending',
        tone: 'planning',
      },
    },

    {
      kind: 'reasoning',
      delay: 800,
      reasoning: {
        text:
          'Bakker overneemt Sneek + Bolsward — die twee landen dan nog op tijd. Drachten + Joure krijgen vertraging, maar pro-actief gemeld voorkomt klacht.',
        by: 'verzending',
      },
    },

    { kind: 'status.update', statusText: 'Inkoop regelt 2e wagen via Bakker', delay: 700 },
    { kind: 'pickup', by: 'inkoop', delay: 600 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'Mandaat goedgekeurd',
        value: '€ 165 · binnen #ver-3 (max € 200) · geen tussenkomst directie nodig',
        by: 'inkoop',
        tone: 'policy',
      },
    },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Opdracht Bakker Transport · overname 2 leveringen VD-4418',
        date: 'Vandaag · 10:08',
        reasoning: [
          'Twee wagens nodig om vertragingsschade te beperken',
          '€ 165 meerkosten kost minder dan een verloren klantrelatie',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Wat',
        items: [
          'Tweede wagen Bakker neemt Sneek en Bolsward over',
          'Ophalen over 20 minuten bij ons distributiecentrum',
          'Meerkosten € 165 · binnen mandaat tot € 200',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Effect',
        items: [
          'Sneek en Bolsward landen binnen oorspronkelijk slot',
          'Drachten en Joure ±90 min vertraging via Van Dijk',
          'Beide getroffen klanten worden pro-actief geïnformeerd',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Opdracht gegeven · 12 min werk bespaard',
      minutesSaved: 12,
    },

    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'transport-plan',
      meta: {
        routeName: 'Herplanning · Bakker (2e wagen)',
        vehicle: 'Bakker · bestelbus',
        driver: 'Bakker zelf',
        totalKm: '64 km',
        reasoning: [
          'Bakker rijdt direct vanaf ons DC, andere route dan A7-file',
          'Bolsward laatste stop · loopt wel parallel met Van Dijk maar niet via A7',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a2',
      target: 'stop',
      stop: {
        tijd: '10:30',
        plaats: 'Distributiecentrum',
        klant: 'Vertrek (overname)',
        artikelen: 'Bakker laadt: Sneek-zending + Bolsward-zending',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a2',
      target: 'stop',
      stop: {
        tijd: '12:25',
        plaats: 'Sneek',
        klant: 'Van der Zwaag',
        artikelen: 'Originele zending',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a2',
      target: 'stop',
      stop: {
        tijd: '13:20',
        plaats: 'Bolsward',
        klant: 'Bouwbedrijf Postma',
        artikelen: 'Originele zending',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a2',
      footer: 'Bakker bevestigt · 8 min werk bespaard',
      minutesSaved: 8,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { routesPlanned: 1 } },

    { kind: 'status.update', statusText: 'Klantservice informeert Drachten', delay: 700 },
    { kind: 'pickup', by: 'klantservice', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a3',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'planning@bouwfriesland.nl',
        subject: 'Uw levering vanochtend · ±90 minuten later',
        date: 'Vandaag · 10:14',
        reasoning: [
          'Pro-actief informeren — eigen melding scoort beter dan klacht achteraf',
          'Reden uitleggen (file, ongeluk) zodat geen vertrouwensbreuk',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1000,
      artifactId: 'a3',
      target: 'paragraph',
      paragraph: 'Beste team Bouw Friesland,',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a3',
      target: 'paragraph',
      paragraph:
        'Een korte melding: er is een ongeluk op de A7 richting Sneek waardoor onze chauffeur stilstaat. We verwachten dat uw levering in Drachten ongeveer 90 minuten later aankomt dan gepland (nieuwe inschatting: rond 12:00).',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a3',
      target: 'paragraph',
      paragraph:
        'Excuus voor het ongemak — dit was buiten onze invloed, maar we wilden het u eerder laten weten dan dat u er zelf achter komt.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a3',
      target: 'paragraph',
      paragraph: 'Groet,\n\nSjoerd · Nordveld Klantenservice',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a3',
      footer: 'Verstuurd · 10:14 · 6 min werk bespaard',
      minutesSaved: 6,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Korte mail naar Sneek (geruststelling)', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a4',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'werk@vanderzwaag.nl',
        subject: 'Uw levering in Sneek · gewoon op tijd',
        date: 'Vandaag · 10:15',
        reasoning: [
          'Korte mail — niet verontrustend laten klinken',
          'Wel even melden dat een andere wagen komt zodat de portier niet verbaasd is',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a4',
      target: 'paragraph',
      paragraph: 'Beste Wytse,',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a4',
      target: 'paragraph',
      paragraph:
        'Korte heads-up: er staat een file op de A7 door een ongeluk, dus we hebben een tweede wagen ingezet om uw levering op tijd in Sneek te krijgen. De wagen ziet er anders uit dan u gewend bent (Bakker Transport), chauffeur heeft onze pakbon bij zich.',
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a4',
      target: 'paragraph',
      paragraph: 'Alles verder bij het oude. Fijne dag.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a4',
      target: 'paragraph',
      paragraph: 'Groet,\n\nSjoerd · Nordveld Klantenservice',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a4',
      footer: 'Verstuurd · 10:15 · 5 min werk bespaard',
      minutesSaved: 5,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Bolsward via WhatsApp (snel kanaal)', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a5',
      artifactType: 'whatsapp',
      meta: {
        customer: 'Bouwbedrijf Postma — Bolsward',
        phone: '+31 6 48 21 09 33',
        reasoning: [
          'Postma reageert sneller op WhatsApp dan e-mail',
          'Korte boodschap, één herkenningspunt (chauffeur Bakker)',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a5',
      target: 'message',
      message: {
        from: 'us',
        text:
          'Hoi Herman, korte melding: door een ongeluk op de A7 hebben we een tweede wagen ingezet. Jullie levering in Bolsward haalt de oorspronkelijke tijd (13:30) gewoon. Andere vrachtwagen dan normaal — Bakker Transport, chauffeur heeft onze pakbon.',
        time: '10:18',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1800,
      artifactId: 'a5',
      target: 'message',
      message: {
        from: 'customer',
        text: 'Top, dank voor het seintje. We zijn klaar om aan te pakken.',
        time: '10:19',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a5',
      footer: 'Afgeleverd · klant bevestigd · 11 min werk bespaard',
      minutesSaved: 11,
    },

    { kind: 'status.update', statusText: 'Joure krijgt mail met opvang-aanbod', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a6',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'info@timmerwerknoordoost.nl',
        subject: 'Uw levering in Joure · ±90 min later',
        date: 'Vandaag · 10:21',
        reasoning: [
          'Joure heeft strakke planning — opvang-optie bieden voor als het niet uitkomt',
          'Tussentijdse rit morgenochtend kan, kost ons weinig extra',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a6',
      target: 'paragraph',
      paragraph: 'Beste Klaas,',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a6',
      target: 'paragraph',
      paragraph:
        'File op de A7 door een ongeluk: uw levering in Joure komt ongeveer 90 minuten later aan dan afgesproken — nieuwe verwachting rond 13:00. Onze chauffeur staat stil, we kunnen er op dit moment niet omheen.',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a6',
      target: 'paragraph',
      paragraph:
        'Als dit niet uitkomt — laat het weten, dan rijden we een tussenrit morgenochtend. Excuses voor het ongemak.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a6',
      target: 'paragraph',
      paragraph: 'Groet,\n\nSjoerd · Nordveld Klantenservice',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a6',
      footer: 'Verstuurd · 10:21 · 18 min werk bespaard',
      minutesSaved: 18,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'complete', delay: 700, totalMinutes: 78 },
  ],
};
