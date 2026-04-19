import type { Script } from '@/lib/types';

export const script_order_new: Script = {
  id: 'script_order_new',
  eventTitle: 'Order — Bouwbedrijf Jansma',
  eventContext: 'Nieuwe order van €4.280, drie regels, levering Enkhuizen',
  minutesSaved: 54,
  steps: [
    { kind: 'ticket', delay: 400 },
    { kind: 'status.update', statusText: 'Orders en Voorraad pakken parallel op', delay: 600 },
    { kind: 'pickup', by: 'orders', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a1',
      artifactType: 'order-confirmation',
      meta: {
        orderNumber: 'ORD-2026-0431',
        customer: 'Bouwbedrijf Jansma BV',
        date: 'Vandaag · 14:07',
        deliveryDate: 'Dinsdag 21 april',
        deliveryWindow: '09:30 – 11:00',
        deliveryAddress: 'Industrieweg 12\n1601 MA Enkhuizen',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'item',
      item: { artikel: 'Gipsplaten 12,5mm 260×120', aantal: 48 },
      delay: 1100,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'item',
      item: { artikel: 'Metal stud profiel 50mm', aantal: 120 },
      delay: 1000,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'item',
      item: { artikel: 'Isolatiewol 100mm rol (via Rockwool, rechtstreeks)', aantal: 25 },
      delay: 1400,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a1',
      footer: 'Klaargezet · 14:08 · 18 min werk bespaard',
      minutesSaved: 18,
      delay: 700,
    },

    { kind: 'status.update', statusText: 'Klantservice schrijft bevestiging', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'orders@nordveld.nl',
        to: 'inkoop@jansma-bouw.nl',
        subject: 'Bevestiging order ORD-2026-0431',
        date: 'Vandaag · 14:09',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Beste Piet,',
      delay: 900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Je order van vandaag staat op dinsdag 21 april tussen 09:30 en 11:00 op de planning. We combineren de rit met twee andere leveringen in West-Friesland, dus je hoeft niet op een specifiek kwartier te wachten.',
      delay: 1800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'De 25 rollen isolatiewol 100mm worden rechtstreeks door Rockwool bijgeleverd — dat gaat sneller dan via ons tussenmagazijn en komt op dezelfde rit mee.',
      delay: 1600,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Bel gerust als iets eerder of later moet.',
      delay: 1400,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Groet,\n\nNordveld Orders\norders@nordveld.nl · 0228-554100',
      delay: 1200,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a2',
      footer: 'Verstuurd · 14:09 · 9 min werk bespaard',
      minutesSaved: 9,
      delay: 700,
    },

    { kind: 'complete', totalMinutes: 54, delay: 600 },
  ],
};
