import type { Script } from '@/lib/types';

export const script_invoice_overdue: Script = {
  id: 'script_invoice_overdue',
  eventTitle: 'Factuur overdue — Klusbedrijf Molenaar',
  eventContext: 'F-2026-0312, € 1.840, 42 dagen te laat, trouwe klant',
  minutesSaved: 38,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Facturatie pluist het klantprofiel uit', delay: 600 },
    { kind: 'pickup', by: 'facturatie', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Klantdossier Molenaar',
        value: 'Klant sinds 2019 · 47 facturen · 0 wanbetaling · normaal 25 dagen betaaltijd',
        by: 'facturatie',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Openstaand totaal',
        value: '€ 1.840 op F-2026-0312 · geen andere openstaand · kredietlimiet € 5.000',
        by: 'facturatie',
        tone: 'credit',
      },
    },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Beleid #fac-2',
        value: 'Trouwe klant + afwijkend gedrag — eerst persoonlijk contact (geen 3e herinnering)',
        by: 'facturatie',
        tone: 'policy',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Patroon wijst op tijdelijk probleem, niet op wanbetaling. Geen verwijtende mail — een persoonlijke belnotitie voor Saskia.',
        by: 'facturatie',
      },
    },

    { kind: 'status.update', statusText: 'Klantservice bereidt belnotitie voor', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a1',
      artifactType: 'callnote',
      meta: {
        callContext: 'Saskia op finance',
        customer: 'Klusbedrijf Molenaar — Jan Molenaar',
        phone: '06-24 77 89 13',
        date: 'Vandaag · 11:10',
        reasoning: [
          'Saskia kent Jan al 4 jaar — zij kan dit met één telefoontje afhandelen',
          'Belnotitie geeft toon-advies zodat ze niet hoeft te zoeken naar woorden',
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
          'Factuur F-2026-0312 staat 42 dagen open · € 1.840',
          'Klant sinds 2019 · betaalt doorgaans binnen 25 dagen',
          'Geen andere openstaande facturen, geen lopende orders',
          '2 herinneringen geweest · 3e zou juridisch worden van toon',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Toon-advies',
        items: [
          'Niet verwijtend — patroon duidt op tijdelijk probleem, niet wanbetaling',
          'Relatiewaarde hoog · eerder zorg tonen dan druk zetten',
          'Ruimte houden voor betalingsregeling als nodig blijkt',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Opening',
        items: [
          '"Hoi Jan, ik belde omdat factuur van vorige maand nog openstaat — loopt alles goed bij jullie?"',
          'Daarna luisteren · niet direct over termijnen beginnen',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1700,
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Mogelijk vervolg',
        items: [
          'Bij tijdelijk cashflow-probleem: betalingsregeling in 3 termijnen voorstellen',
          'Bij vergissing: rustig oppakken, geen escalatie',
          'Bij groen licht hef ik de leverings-hold direct weer op',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'In takenlijst Saskia · 13 min werk bespaard',
      minutesSaved: 13,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a1',
        department: 'facturatie',
        kind: 'call',
        title: 'Bellen Jan Molenaar',
        subtitle: 'Factuur F-2026-0312 · 42 dagen open · zacht contact',
        reference: 'Molenaar · 06-24 77 89 13',
        actionLabel: 'Markeer als gebeld',
        systemTarget: 'CRM-log · hold opheffen',
      },
    },

    { kind: 'status.update', statusText: 'Belafspraak alvast in agenda', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a2',
      artifactType: 'calendar-item',
      meta: {
        reasoning: [
          'Tijdslot al klaargezet zodat Saskia het alleen hoeft te bevestigen',
          '15 min ruim genoeg voor dit type gesprek',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a2',
      target: 'slot',
      slot: {
        wanneer: 'Morgen · 09:30 – 09:45',
        duur: '15 min',
        voor: 'Saskia (finance)',
        onderwerp: 'Bellen Jan Molenaar over openstaande factuur',
        details: [
          'Belnotitie KL-fin-0044 staat klaar in takenlijst',
          'Liefst direct na koffie, voordat Saskia in andere zaken zit',
          'Geblokkeerd in agenda als "telefonisch gesprek — finance"',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a2',
      footer: 'Geblokkeerd · 4 min werk bespaard',
      minutesSaved: 4,
    },

    { kind: 'status.update', statusText: 'Facturatie zet leveringen zacht op hold', delay: 700 },
    { kind: 'pickup', by: 'facturatie', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a3',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Leverings-hold Klusbedrijf Molenaar (zacht)',
        date: 'Vandaag · 11:12',
        reasoning: [
          'Niet automatisch een 3e herinnering — eerst gesprek',
          'Hold is zacht: geen mail naar klant, geen juridische taal',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Acties',
        items: [
          'Nieuwe orders Molenaar voorlopig niet automatisch vrijgeven',
          'Reden in systeem: "betaaltermijn in gesprek" · géén mail hierover',
          'Hold wordt automatisch opgeheven zodra Saskia groen licht geeft',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Niet doen',
        items: [
          'Geen derde herinnering versturen',
          'Geen juridische toon gebruiken voordat gesprek is geweest',
          'Klant niet via e-mail confronteren · persoonlijk contact eerst',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a3',
      footer: 'Hold actief · 10 min werk bespaard',
      minutesSaved: 10,
    },

    { kind: 'status.update', statusText: 'Sales krijgt heads-up voor volgend bezoek', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a4',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Heads-up sales · Molenaar (volgende bezoekronde)',
        date: 'Vandaag · 11:13',
        reasoning: [
          'Mocht Saskia’s belletje niet meteen lukken, dan pakt sales het persoonlijk op',
          'Sales mag nooit verrast worden door een betaalprobleem ter plaatse',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a4',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Voor sales (Jeroen)',
        items: [
          'Klant heeft één openstaande factuur · 42 dagen · 1e keer ooit',
          'Saskia belt morgenochtend · niet alvast benoemen tijdens bezoek',
          'Indien Saskia geen contact krijgt: zachte vraag op kantoor van Jan',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a4',
      footer: 'Genoteerd in CRM · 11 min werk bespaard',
      minutesSaved: 11,
    },

    { kind: 'complete', delay: 700, totalMinutes: 38 },
  ],
};
