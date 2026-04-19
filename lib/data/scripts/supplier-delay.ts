import type { Script } from '@/lib/types';

export const script_supplier_delay: Script = {
  id: 'script_supplier_delay',
  eventTitle: 'Vertraging — Saint-Gobain (3 dagen)',
  eventContext: 'INK-2026-0089 drie dagen later · raakt 2 lopende orders',
  minutesSaved: 67,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Orders inventariseert wat dit raakt', delay: 600 },
    { kind: 'pickup', by: 'orders', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Impact-analyse',
        value: 'ORD-2026-0421 (Hoogkarspel · 80 platen wo) · ORD-2026-0424 (Wervershoof · 45 platen do)',
        by: 'orders',
        tone: 'log',
      },
    },

    { kind: 'status.update', statusText: 'Voorraad checkt eigen dekking', delay: 600 },
    { kind: 'pickup', by: 'voorraad', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Eigen voorraad gipsplaten',
        value: '120 platen op A-12 · Wervershoof 100% dekking · Hoogkarspel 50 van 80',
        by: 'voorraad',
        tone: 'inventory',
      },
    },

    {
      kind: 'reasoning',
      delay: 800,
      reasoning: {
        text:
          'Wervershoof helemaal uit voorraad op datum. Hoogkarspel splitsen: 50 platen wo + 30 platen vrij. Pro-actief informeren — voorkomt verrassingen.',
        by: 'orders',
      },
    },

    { kind: 'status.update', statusText: 'Klantservice schrijft Wervershoof', delay: 700 },
    { kind: 'pickup', by: 'klantservice', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'planning@koopmans-timmer.nl',
        subject: 'Uw levering donderdag · alles bij het oude',
        date: 'Vandaag · 09:22',
        reasoning: [
          'Korte heads-up: voorkomt zorgen als Saint-Gobain-nieuws hen ook bereikt',
          'Geen lange uitleg — Jelle houdt van bondig',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1000,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Beste Jelle,',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Korte heads-up: Saint-Gobain heeft ons drie dagen vertraging gemeld op een levering gipsplaten. Voor jullie order verandert er niets — we leveren donderdag de 45 platen zoals afgesproken, gewoon uit onze eigen voorraad.',
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Wilde je dit laten weten zodat je niet schrikt als je iets leest over vertraging bij ons.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Groet,\n\nSjoerd · Nordveld Klantenservice\nklantenservice@nordveld.nl',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Verstuurd · 09:22 · 7 min werk bespaard',
      minutesSaved: 7,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Klantservice stelt Hoogkarspel-voorstel op', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'werk@bouwcombinatie-hoogkarspel.nl',
        subject: 'Order 2026-0421 · voorstel levering in 2 ritten',
        date: 'Vandaag · 09:24',
        reasoning: [
          'Voorstel: woensdag 50 platen, vrijdag 30 platen — geen meerkosten',
          'Hoogkarspel kan met 50 platen al de begane grond starten',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1000,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Beste Gerard,',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Saint-Gobain heeft drie dagen vertraging gemeld op een inkomende zending. Jullie order van 80 platen kunnen we daardoor niet in één keer op woensdag leveren zoals gepland.',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Voorstel: woensdag leveren we 50 platen uit onze eigen voorraad — genoeg om de scheidingswanden op de begane grond mee te starten. De resterende 30 platen rijden we vrijdag rechtstreeks achteraan. Geen extra kosten.',
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Schikt dat? Laat het even weten, dan zetten we het definitief in de planning.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Groet,\n\nSjoerd · Nordveld Klantenservice\nklantenservice@nordveld.nl',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a2',
      footer: 'Verstuurd · 09:24 · 16 min werk bespaard',
      minutesSaved: 16,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Voorraad reserveert vast 95 platen', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a3',
      artifactType: 'stock-mutation',
      meta: {
        reasoning: [
          'Reservering, niet afboeking — pas afboeken bij ophalen',
          '95 platen apart zetten zorgt dat een andere order ze niet wegtrekt',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 700,
      artifactId: 'a3',
      target: 'stock-delta',
      stockDelta: {
        artikel: 'Gipsplaten 12,5mm (vrij)',
        was: 120,
        wordt: 25,
        unit: 'platen',
        reden: '45 voor Wervershoof + 50 voor Hoogkarspel · vervangt Saint-Gobain-tekort',
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a3',
      footer: 'Reservering geboekt · 6 min werk bespaard',
      minutesSaved: 6,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { stockMutations: 1 } },

    { kind: 'status.update', statusText: 'Inkoop legt incident-patroon vast', delay: 700 },
    { kind: 'pickup', by: 'inkoop', delay: 600 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'Incident-historie Saint-Gobain',
        value: 'Q2 2026: 3e melding · Q1: 1 · Q4 2025: 0 · trend ongunstig',
        by: 'inkoop',
        tone: 'log',
      },
    },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a4',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Vertragings-incident Saint-Gobain · 3e dit kwartaal',
        date: 'Vandaag · 09:28',
        reasoning: [
          'Patroon-detectie: niet één incident, maar trend',
          'Strategisch gesprek nodig — automatisch oppakken kan niet',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a4',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Patroon',
        items: [
          'Q2 2026: 3 vertragings-meldingen (Q1: 1, Q4 2025: 0)',
          'Gemiddelde vertraging loopt van 1 naar 3 werkdagen',
          'Ditmaal directe impact op 2 klantorders, opgelost uit voorraad',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a4',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Voorstel',
        items: [
          'Agenda-punt volgende kwartaal-review met accountmanager Saint-Gobain',
          'Strategisch gesprek — te belangrijk voor automatisch escalatie-bericht',
          'Tot die tijd: extra buffervoorraad overwegen voor brandwerende platen',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a4',
      footer: 'Opgenomen voor Q-review · 23 min werk bespaard',
      minutesSaved: 23,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a4',
        department: 'inkoop',
        kind: 'review',
        title: 'Q-review Saint-Gobain agenderen',
        subtitle: '3e incident dit kwartaal · gesprek met accountmanager',
        reference: 'Incident-log Q2',
        actionLabel: 'Afspraak inplannen',
        systemTarget: 'CRM + agenda',
      },
    },

    { kind: 'status.update', statusText: 'Verzending plant gesplitste rit', delay: 700 },
    { kind: 'pickup', by: 'verzending', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a5',
      artifactType: 'transport-plan',
      meta: {
        routeName: 'Splitsing rit Hoogkarspel · 2 momenten',
        vehicle: 'Bakwagen 12-ton',
        driver: 'Bakker',
        totalKm: '38 km (woe) + 28 km (vr)',
        reasoning: [
          'Twee ritten i.p.v. één — onvermijdelijk gevolg van vertraging',
          'Vrijdag-rit combineert met Rockwool-ontvangst (zelfde wagen kan terugrijden geladen)',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a5',
      target: 'stop',
      stop: {
        tijd: 'Wo 10:30',
        plaats: 'Hoogkarspel',
        klant: 'Bouwcombinatie',
        artikelen: '50 platen (uit eigen voorraad)',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a5',
      target: 'stop',
      stop: {
        tijd: 'Do 09:00',
        plaats: 'Wervershoof',
        klant: 'Koopmans Timmerwerk',
        artikelen: '45 platen (uit eigen voorraad)',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a5',
      target: 'stop',
      stop: {
        tijd: 'Vr 11:00',
        plaats: 'Hoogkarspel (2e rit)',
        klant: 'Bouwcombinatie',
        artikelen: '30 resterende platen (zodra Saint-Gobain landt)',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a5',
      footer: 'Rit-splitsing klaar · 15 min werk bespaard',
      minutesSaved: 15,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { routesPlanned: 2 } },

    { kind: 'complete', delay: 700, totalMinutes: 67 },
  ],
};
