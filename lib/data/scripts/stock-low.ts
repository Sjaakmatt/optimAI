import type { Script } from '@/lib/types';

export const script_stock_low: Script = {
  id: 'script_stock_low',
  eventTitle: 'Voorraadsignaal — Isolatiewol 100mm',
  eventContext: 'Huidig 18 rollen, minimum 30, verbruik 4,2 rollen per werkdag',
  minutesSaved: 30,
  steps: [
    { kind: 'ticket', delay: 400 },
    { kind: 'status.update', statusText: 'Voorraad analyseert verbruik', delay: 600 },
    { kind: 'pickup', by: 'voorraad', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a1',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Voorstel spoedaanvulling Isolatiewol 100mm',
        date: 'Vandaag · 08:15',
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
          '18 rollen op locatie C-02, minimum ligt op 30',
          '25 rollen gereserveerd voor lopende orders — dekking krap vier werkdagen',
          'Verbruik afgelopen 30 dagen: gemiddeld 4,2 rollen per werkdag (stijgende trend)',
        ],
      },
      delay: 1500,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Afweging leveranciers',
        items: [
          'Rockwool Benelux — € 58,00 per rol, levertijd 2 werkdagen',
          'Knauf Insulation — € 56,20 per rol, levertijd 5 werkdagen',
          'Bij krappe dekking weegt tijd zwaarder dan € 144 prijsverschil',
        ],
      },
      delay: 1700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Voorstel',
        items: [
          'Bestellen 80 rollen bij Rockwool (6 weken dekking)',
          'Totaal € 4.640 excl. BTW — binnen inkoop-mandaat',
          'Zodra bevestiging binnen is: voorraad en planning bijwerken',
        ],
      },
      delay: 1700,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a1',
      footer: 'Klaar voor inkoop · 12 min werk bespaard',
      minutesSaved: 12,
      delay: 700,
    },

    { kind: 'status.update', statusText: 'Inkoop zet de bestelling uit', delay: 600 },
    { kind: 'pickup', by: 'inkoop', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'inkoop@nordveld.nl',
        to: 'orders@rockwool-benelux.nl',
        subject: 'Bestelling INK-2026-0133 — 80 rollen Isolatiewol 100mm',
        date: 'Vandaag · 08:18',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Beste team Rockwool,',
      delay: 900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Graag een bestelling voor 80 rollen Isolatiewol 100mm (artikel RW-100-120). Levering vrijdag voor 12:00 op ons adres aan de Westelijke Randweg zou ons het beste uitkomen — onze voorraad zakt anders onder veilig niveau voor twee lopende projecten.',
      delay: 1800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Prijs € 58,00 per rol conform lopend contract. Referentie: INK-2026-0133. Bevestiging graag per ommegaande.',
      delay: 1500,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Alvast dank.',
      delay: 1200,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Groet,\n\nNordveld Inkoop\ninkoop@nordveld.nl · 0228-554100',
      delay: 1200,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a2',
      footer: 'Verstuurd · 08:19 · 18 min werk bespaard',
      minutesSaved: 18,
      delay: 700,
    },

    { kind: 'complete', totalMinutes: 30, delay: 600 },
  ],
};
