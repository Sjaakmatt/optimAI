import type { Script } from '@/lib/types';

export const script_stock_low: Script = {
  id: 'script_stock_low',
  eventTitle: 'Voorraadsignaal — Isolatiewol 100mm',
  eventContext: 'Huidig 18 rollen · minimum 30 · verbruik 4,2 rollen per werkdag',
  minutesSaved: 48,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Voorraad analyseert verbruik', delay: 600 },
    { kind: 'pickup', by: 'voorraad', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Verbruiksanalyse 30 dagen',
        value: 'Gemiddeld 4,2 rollen per werkdag · trend stijgend (voorjaarsseizoen)',
        by: 'voorraad',
        tone: 'inventory',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Beleid #vor-3',
        value: 'Aanbevolen bestelhoeveelheid op basis van 6 weken dekking',
        by: 'voorraad',
        tone: 'policy',
      },
    },

    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Voorstel spoedaanvulling Isolatiewol 100mm',
        date: 'Vandaag · 08:15',
        reasoning: [
          '4 werkdagen dekking is krap — onder veiligheidsmarge',
          '80 rollen = 6 weken bij huidig verbruik (in lijn met beleid)',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Situatie',
        items: [
          '18 rollen op locatie C-02 · minimum ligt op 30',
          '25 rollen gereserveerd voor lopende orders · dekking krap 4 werkdagen',
          'Verbruik 30 dagen: 4,2 rollen/dag · trend stijgend',
        ],
      },
    },

    { kind: 'status.update', statusText: 'Inkoop vergelijkt twee leveranciers', delay: 700 },
    { kind: 'pickup', by: 'inkoop', delay: 600 },
    {
      kind: 'check',
      delay: 600,
      check: {
        label: 'Rockwool Benelux',
        value: '€ 58,00/rol · 2 werkdagen levertijd',
        by: 'inkoop',
        tone: 'pricing',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Knauf Insulation',
        value: '€ 56,20/rol · 5 werkdagen levertijd · € 144 goedkoper',
        by: 'inkoop',
        tone: 'pricing',
      },
    },
    {
      kind: 'reasoning',
      delay: 800,
      reasoning: {
        text:
          'Tijd weegt zwaarder dan € 144 prijsverschil. Rockwool kiezen — sluiten dichter aan op huidige planning.',
        by: 'inkoop',
      },
    },

    {
      kind: 'artifact.fill',
      delay: 700,
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Afweging leveranciers',
        items: [
          'Rockwool Benelux — € 58,00/rol · 2 werkdagen',
          'Knauf Insulation — € 56,20/rol · 5 werkdagen',
          'Krappe dekking → Rockwool ondanks € 144 hoger',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Voorstel',
        items: [
          'Bestellen: 80 rollen bij Rockwool (6 weken dekking)',
          'Totaal € 4.640 excl. BTW · binnen inkoop-mandaat',
          'Zodra bevestiging binnen: voorraad en planning bijwerken',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Memo klaar · 12 min werk bespaard',
      minutesSaved: 12,
    },

    { kind: 'status.update', statusText: 'Inkoop verstuurt de bestelling', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'inkoop@nordveld.nl',
        to: 'orders@rockwool-benelux.nl',
        subject: 'Bestelling INK-2026-0133 · 80 rollen Isolatiewol 100mm',
        date: 'Vandaag · 08:18',
        reasoning: [
          'Reguliere bestelling, niet urgent — dus geen telefoontje extra',
          'Levering vrijdag voor 12:00 zodat we maandag schoon starten',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1000,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Beste team Rockwool,',
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Graag een bestelling voor 80 rollen Isolatiewol 100mm (RW-100-120). Levering vrijdag voor 12:00 op ons adres aan de Westelijke Randweg zou ons het beste uitkomen.',
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Prijs € 58,00 per rol conform lopend contract. Referentie: INK-2026-0133. Bevestiging graag per ommegaande.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Alvast dank.',
    },
    {
      kind: 'artifact.fill',
      delay: 1100,
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Groet,\n\nNordveld Inkoop\ninkoop@nordveld.nl · 0228-554100',
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a2',
      footer: 'Verstuurd · 08:19 · 12 min werk bespaard',
      minutesSaved: 12,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'status.update', statusText: 'Voorraad zet aankomende mutatie alvast in systeem', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a3',
      artifactType: 'stock-mutation',
      meta: {
        reasoning: [
          'Mutatie staat klaar als "in transit" — pas op vrijdag wordt definitief geboekt',
          'Maakt forecasting op orders-systeem accurater (lopende offertes zien aankomende voorraad)',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 700,
      artifactId: 'a3',
      target: 'stock-delta',
      stockDelta: {
        artikel: 'Isolatiewol 100mm rol (verwacht vrijdag)',
        was: 18,
        wordt: 93,
        unit: 'rollen',
        reden: 'Inkomende bestelling INK-2026-0133 · 75 rollen netto na verbruik',
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a3',
      footer: 'In transit · 8 min werk bespaard',
      minutesSaved: 8,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { stockMutations: 1 } },

    { kind: 'status.update', statusText: 'Verzending plant ontvangst-rit alvast', delay: 700 },
    { kind: 'pickup', by: 'verzending', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a4',
      artifactType: 'calendar-item',
      meta: {
        reasoning: [
          'Mensen op de loskade alvast vrijhouden — voorkomt loswachten van Rockwool-vrachtwagen',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a4',
      target: 'slot',
      slot: {
        wanneer: 'Vrijdag · 11:00 – 12:00',
        duur: '60 min',
        voor: 'Magazijn West',
        onderwerp: 'Ontvangst Rockwool-zending (80 rollen)',
        details: [
          'Locatie: loskade 2',
          'Twee man · vorkheftruck reserveren',
          'Naar locatie C-02 transporteren',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a4',
      footer: 'Geblokkeerd · 8 min werk bespaard',
      minutesSaved: 8,
    },

    { kind: 'complete', delay: 700, totalMinutes: 48 },
  ],
};
