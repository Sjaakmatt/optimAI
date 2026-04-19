import type { DemoEvent } from '@/lib/types';

export const SCENARIOS: DemoEvent[] = [
  {
    id: 's1',
    scriptId: 'script_order_new',
    type: 'order.new',
    label: 'Nieuwe order — Bouwbedrijf Jansma (€4.280)',
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
    label: 'Offerteaanvraag — Renovatie Westfries Lyceum',
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
    label: 'Klacht — Aannemer De Boer (beschadigde levering)',
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
    label: 'Voorraad laag — Isolatiewol 100mm (min. niveau)',
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
    label: 'Leverancier — Vertraging Saint-Gobain (3 dagen)',
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
    label: 'Vraag — Technische specs brandwerende platen',
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
    label: 'Factuur overdue — Klusbedrijf Molenaar (42 dagen)',
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
    label: 'Verzending — Vertraging transporteur A7',
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
