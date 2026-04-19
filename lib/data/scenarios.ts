import type { DemoEvent } from '@/lib/types';

export const SCENARIOS: DemoEvent[] = [
  {
    id: 's1',
    scriptId: 'script_order_new',
    type: 'order.new',
    label: 'Order — Bouwbedrijf Jansma',
    context: 'Nieuwe order van €4.280, drie regels, levering in 3 werkdagen',
    payload: {
      klant: 'Bouwbedrijf Jansma BV',
      regio: 'Enkhuizen',
      regels: [
        { artikel: 'Gipsplaten 12,5mm 260x120', aantal: 48, prijs: 12.40 },
        { artikel: 'Metal stud profiel 50mm', aantal: 120, prijs: 4.20 },
        { artikel: 'Isolatiewol 100mm rol', aantal: 25, prijs: 58.00 },
      ],
      gewenste_levering: '3 werkdagen',
    },
    timestamp: 0,
  },
  {
    id: 's2',
    scriptId: 'script_inquiry',
    type: 'order.inquiry',
    label: 'Offerteaanvraag — Gemeente Hoorn',
    context: 'Aanbesteding renovatie Westfries Lyceum fase 2, indicatie €28.000',
    payload: {
      klant: 'Gemeente Hoorn — Onderhoud',
      project: 'Renovatie Westfries Lyceum, fase 2',
      indicatie: 'circa €28.000',
      bijzonderheid: 'Aanbesteding, binnen 48u reageren',
    },
    timestamp: 0,
  },
  {
    id: 's3',
    scriptId: 'script_complaint',
    type: 'mail.complaint',
    label: 'Klacht — Aannemersbedrijf De Boer',
    context: '6 van 40 gipsplaten met hoekschade in order 2026-0418',
    payload: {
      klant: 'Aannemersbedrijf De Boer',
      order: 'ORD-2026-0418',
      probleem: '6 van de 40 gipsplaten met hoekschade',
      toon: 'geïrriteerd maar redelijk',
    },
    timestamp: 0,
  },
  {
    id: 's4',
    scriptId: 'script_stock_low',
    type: 'stock.low',
    label: 'Voorraadsignaal — Isolatiewol 100mm',
    context: 'Huidig 18 rollen, minimum 30, seizoen stijgend',
    payload: {
      artikel: 'Isolatiewol 100mm rol',
      huidig: 18,
      min: 30,
      lopende_orders: 25,
      hoofdleverancier: 'Rockwool Benelux',
    },
    timestamp: 0,
  },
  {
    id: 's5',
    scriptId: 'script_supplier_delay',
    type: 'supplier.delay',
    label: 'Vertraging — Saint-Gobain (3 dagen)',
    context: 'Raakt twee lopende orders richting Hoogkarspel en Wervershoof',
    payload: {
      leverancier: 'Saint-Gobain NL',
      betreft: 'Gipsplaten INK-2026-0089',
      vertraging: '3 werkdagen',
      impact_orders: ['ORD-2026-0421', 'ORD-2026-0424'],
    },
    timestamp: 0,
  },
  {
    id: 's6',
    scriptId: 'script_question',
    type: 'mail.question',
    label: 'Vraag — Schildersbedrijf Visser',
    context: 'Technische specs brandwerende gipsplaat EI 60',
    payload: {
      klant: 'Schilder- & Bouwbedrijf Visser',
      vraag: 'Welke brandwerende gipsplaat voldoet aan EI 60 voor woningscheidende wand?',
    },
    timestamp: 0,
  },
  {
    id: 's7',
    scriptId: 'script_invoice_overdue',
    type: 'invoice.overdue',
    label: 'Factuur overdue — Klusbedrijf Molenaar',
    context: 'F-2026-0312 · € 1.840 · 42 dagen te laat · 2 herinneringen geweest',
    payload: {
      klant: 'Klusbedrijf Molenaar',
      factuur: 'F-2026-0312',
      bedrag: 1840.00,
      dagen_te_laat: 42,
      eerdere_herinneringen: 2,
    },
    timestamp: 0,
  },
  {
    id: 's8',
    scriptId: 'script_shipment_issue',
    type: 'shipment.issue',
    label: 'Verzending — Vertraging A7',
    context: 'Rit VD-4418 ±90 min vertraagd door ongeluk A7, 4 leveringen geraakt',
    payload: {
      transporteur: 'Van Dijk Transport',
      ritnummer: 'VD-4418',
      impact: '4 leveringen uitgesteld',
      oorzaak: 'Ongeluk A7 richting Sneek',
    },
    timestamp: 0,
  },
];

export const SCENARIO_BY_ID = SCENARIOS.reduce<Record<string, DemoEvent>>((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {});
