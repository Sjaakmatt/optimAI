import type { Script } from '@/lib/types';

export const script_inquiry: Script = {
  id: 'script_inquiry',
  eventTitle: 'Offerte — Gemeente Hoorn',
  eventContext: 'Aanbesteding renovatie Westfries Lyceum fase 2 · 48u deadline',
  minutesSaved: 96,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Sales leest het bestek door', delay: 600 },
    { kind: 'pickup', by: 'sales', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Klantgeschiedenis Hoorn',
        value: '3 projecten sinds 2022 · 28 dagen gemiddeld betaalgedrag · gewonnen op prijs+tijd',
        by: 'sales',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Vergelijkbaar project Purmerend (2024)',
        value: '12% marge · gewonnen · klant tevreden · referentie bruikbaar',
        by: 'sales',
        tone: 'dossier',
      },
    },

    { kind: 'status.update', statusText: 'Inkoop checkt actuele leveranciersprijzen', delay: 600 },
    { kind: 'pickup', by: 'inkoop', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Saint-Gobain prijslijst per 1 april',
        value: 'Brandwerende platen −3,2% t.o.v. Q1 · gunstig moment',
        by: 'inkoop',
        tone: 'pricing',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Rockwool prijslijst',
        value: 'Stabiel · isolatieplaat 100mm € 32,50/m²',
        by: 'inkoop',
        tone: 'pricing',
      },
    },

    { kind: 'status.update', statusText: 'Sales bepaalt marge', delay: 700 },
    { kind: 'pickup', by: 'sales', delay: 600 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'Beleid #sal-2',
        value: 'Marge ondergrens overheidswerk 11% · advies 13% voor buffer',
        by: 'sales',
        tone: 'policy',
      },
    },
    {
      kind: 'reasoning',
      delay: 800,
      reasoning: {
        text:
          '13% marge i.p.v. 12% — bestek heeft hoge brandeisen, materiaalkosten kunnen tegenvallen. Eindprijs blijft onder de indicatie van € 28k.',
        by: 'sales',
      },
    },

    { kind: 'status.update', statusText: 'Facturatie checkt betaalvoorwaarden overheid', delay: 700 },
    { kind: 'pickup', by: 'facturatie', delay: 600 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'Beleid #fac-3',
        value: 'Overheidsklanten standaard 30 dagen netto · geen aanbetaling',
        by: 'facturatie',
        tone: 'policy',
      },
    },

    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'quote',
      meta: {
        quoteNumber: 'OF-2026-0087',
        projectName: 'Renovatie Westfries Lyceum — fase 2',
        customer: 'Gemeente Hoorn · Afdeling Onderhoud',
        date: 'Vandaag · 10:42',
        terms: '30 dagen netto · levering in 2 tranches',
        validity: '14 dagen',
        approvalStatus: 'Wacht op akkoord directie (> € 25.000)',
        reasoning: [
          'Marge 13% · 1 punt boven beleid voor buffer materiaalprijzen',
          '2 tranches: scheelt klant opslag op locatie, scheelt ons piek in transport',
          'Goedkeuring directie automatisch aangevraagd boven € 25.000',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Gipsplaten brandwerend EI 60, 12,5mm',
        aantal: 340,
        prijs: 18.90,
        totaal: 6426.00,
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Rockwool isolatieplaat 100mm',
        aantal: 180,
        prijs: 32.50,
        totaal: 5850.00,
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Metal stud profiel 75mm, incl. bevestiging',
        aantal: 420,
        prijs: 6.80,
        totaal: 2856.00,
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Kitwerk, schroeven, hoekprofielen (staffel)',
        aantal: 1,
        prijs: 1920.00,
        totaal: 1920.00,
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Arbeid: plaatsing incl. stelwerk',
        aantal: 128,
        prijs: 72.00,
        totaal: 9216.00,
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Transport en plaatsbezoek (2 tranches)',
        aantal: 1,
        prijs: 872.00,
        totaal: 872.00,
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Wacht op akkoord directie · 78 min werk bespaard',
      minutesSaved: 78,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a1',
        department: 'sales',
        kind: 'approval',
        title: 'Directie-akkoord offerte Hoorn',
        subtitle: 'Bedrag boven mandaat (€ 25.000) · verzenden na akkoord',
        reference: 'OF-2026-0087',
        amount: '€ 27.140 excl. BTW',
        actionLabel: 'Akkoord geven',
        systemTarget: 'Mail naar Gemeente Hoorn',
      },
    },

    { kind: 'status.update', statusText: 'Begeleidende mail klaargezet', delay: 700 },
    { kind: 'pickup', by: 'klantservice', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'sales@nordveld.nl',
        to: 'aanbestedingen@hoorn.nl',
        subject: 'Offerte OF-2026-0087 · Renovatie Westfries Lyceum fase 2',
        date: 'Klaar voor verzending na directie-akkoord',
        reasoning: [
          'Toon: formeel maar warm — overheidsstijl met eigen handtekening',
          'Verwijst naar Purmerend-referentie zodat continuïteit zichtbaar is',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1000,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Geacht aanbestedingsteam,',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Hierbij onze offerte voor de renovatie van het Westfries Lyceum, fase 2. We hebben uw bestek nauwkeurig doorgenomen en aangesloten op de brandwerende eisen die u stelt (EI 60).',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Onze prijs komt uit op € 27.140 excl. BTW, met levering in twee tranches en standaard betaaltermijn van 30 dagen. Net als bij het Purmerendse project (2024) leveren we materiaal én plaatsing in één traject.',
    },
    {
      kind: 'artifact.fill',
      delay: 1300,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Het volledige offertedocument vindt u in de bijlage. Bij vragen ben ik bereikbaar — graag tot een eventuele toelichting.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Met vriendelijke groet,\n\nMartijn (Nordveld Sales)\nsales@nordveld.nl · 0228-554100',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a2',
      footer: 'Wacht op directie-akkoord · 12 min werk bespaard',
      minutesSaved: 12,
    },

    { kind: 'status.update', statusText: 'Agenda-item voor directie-review', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a3',
      artifactType: 'calendar-item',
      meta: {
        reasoning: [
          'Boven mandaat-grens: directie moet kort kijken voor verzending',
          '10 min ingepland — alleen check, geen herstructurering',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a3',
      target: 'slot',
      slot: {
        wanneer: 'Vandaag · 16:00 – 16:10',
        duur: '10 min',
        voor: 'Directie',
        onderwerp: 'Akkoord offerte OF-2026-0087 (€ 27.140)',
        details: [
          'Bedrag boven directie-mandaat (€ 25.000)',
          'Marge 13% · materiaalmix met buffer',
          'Voor 18:00 vandaag akkoord = nog binnen 24u na aanvraag',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a3',
      footer: 'In agenda directie · 6 min werk bespaard',
      minutesSaved: 6,
    },

    { kind: 'complete', delay: 700, totalMinutes: 96 },
  ],
};
