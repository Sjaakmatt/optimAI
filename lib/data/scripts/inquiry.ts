import type { Script } from '@/lib/types';

export const script_inquiry: Script = {
  id: 'script_inquiry',
  eventTitle: 'Offerte — Gemeente Hoorn',
  eventContext: 'Aanbesteding renovatie Westfries Lyceum fase 2, 48u deadline',
  minutesSaved: 78,
  steps: [
    { kind: 'ticket', delay: 400 },
    { kind: 'status.update', statusText: 'Sales bouwt de offerte op', delay: 600 },
    { kind: 'pickup', by: 'sales', delay: 900 },

    {
      kind: 'artifact.start',
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
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Gipsplaten brandwerend EI 60, 12,5mm',
        aantal: 340,
        prijs: 18.90,
        totaal: 6426.00,
      },
      delay: 1400,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Rockwool isolatieplaat 100mm',
        aantal: 180,
        prijs: 32.50,
        totaal: 5850.00,
      },
      delay: 1300,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Metal stud profiel 75mm, incl. bevestiging',
        aantal: 420,
        prijs: 6.80,
        totaal: 2856.00,
      },
      delay: 1300,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Kitwerk, schroeven, hoekprofielen (staffel)',
        aantal: 1,
        prijs: 1920.00,
        totaal: 1920.00,
      },
      delay: 1300,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Arbeid: plaatsing incl. stelwerk',
        aantal: 128,
        prijs: 72.00,
        totaal: 9216.00,
      },
      delay: 1300,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'line',
      line: {
        omschrijving: 'Transport en plaatsbezoek (2 tranches)',
        aantal: 1,
        prijs: 872.00,
        totaal: 872.00,
      },
      delay: 1300,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a1',
      footer: 'Klaar voor directie-review · 78 min werk bespaard',
      minutesSaved: 78,
      delay: 800,
    },

    { kind: 'complete', totalMinutes: 78, delay: 600 },
  ],
};
