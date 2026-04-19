import type { Script } from '@/lib/types';

export const script_invoice_overdue: Script = {
  id: 'script_invoice_overdue',
  eventTitle: 'Factuur overdue — Klusbedrijf Molenaar',
  eventContext: 'F-2026-0312, € 1.840, 42 dagen te laat, trouwe klant',
  minutesSaved: 23,
  steps: [
    { kind: 'ticket', delay: 400 },
    { kind: 'status.update', statusText: 'Klantservice bereidt belnotitie voor', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a1',
      artifactType: 'callnote',
      meta: {
        callContext: 'Saskia op finance',
        customer: 'Klusbedrijf Molenaar — Jan Molenaar',
        phone: '06-24 77 89 13',
        date: 'Vandaag · 11:10',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Situatie',
        items: [
          'Factuur F-2026-0312 staat 42 dagen open, bedrag € 1.840',
          'Klant sinds 2019, betaalt doorgaans binnen 25 dagen',
          'Geen andere openstaande facturen, geen lopende orders',
          'Twee herinneringen geweest, derde zou juridisch van toon worden',
        ],
      },
      delay: 1600,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Toon-advies',
        items: [
          'Niet verwijtend — patroon wijst op tijdelijk probleem, niet op wanbetaling',
          'Relatiewaarde is hoog; eerder zorg tonen dan druk zetten',
          'Ruimte houden voor betalingsregeling als dat nodig blijkt',
        ],
      },
      delay: 1700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Opening',
        items: [
          '"Hoi Jan, ik belde omdat factuur van vorige maand nog openstaat — loopt alles goed bij jullie?"',
          'Daarna luisteren; niet direct over termijnen beginnen',
        ],
      },
      delay: 1700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Mogelijk vervolg',
        items: [
          'Als tijdelijk cashflow-probleem: betalingsregeling in 3 termijnen voorstellen',
          'Als vergissing: rustig oppakken, geen escalatie',
          'Bij groen licht hef ik de leverings-hold direct weer op',
        ],
      },
      delay: 1800,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a1',
      footer: 'In takenlijst Saskia · 13 min werk bespaard',
      minutesSaved: 13,
      delay: 700,
    },

    { kind: 'status.update', statusText: 'Facturatie zet leveringen zacht op hold', delay: 600 },
    { kind: 'pickup', by: 'facturatie', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a2',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Leverings-hold Klusbedrijf Molenaar (zacht)',
        date: 'Vandaag · 11:12',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Acties',
        items: [
          'Nieuwe orders voor Molenaar voorlopig niet automatisch vrijgeven',
          'Reden in systeem: "betaaltermijn in gesprek" — géén mail hierover',
          'Hold wordt automatisch opgeheven zodra Saskia groen licht geeft',
        ],
      },
      delay: 1600,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Niet doen',
        items: [
          'Geen derde herinnering versturen',
          'Geen juridische toon gebruiken voordat gesprek is geweest',
          'Klant niet via e-mail confronteren; persoonlijk contact eerst',
        ],
      },
      delay: 1500,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a2',
      footer: 'Hold actief · 10 min werk bespaard',
      minutesSaved: 10,
      delay: 700,
    },

    { kind: 'complete', totalMinutes: 23, delay: 600 },
  ],
};
