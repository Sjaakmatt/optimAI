import type { Script } from '@/lib/types';

export const script_supplier_delay: Script = {
  id: 'script_supplier_delay',
  eventTitle: 'Vertraging — Saint-Gobain (3 dagen)',
  eventContext: 'INK-2026-0089 drie dagen later, raakt orders Hoogkarspel en Wervershoof',
  minutesSaved: 46,
  steps: [
    { kind: 'ticket', delay: 400 },
    { kind: 'status.update', statusText: 'Klantservice informeert Koopmans', delay: 600 },
    { kind: 'pickup', by: 'klantservice', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a1',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'planning@koopmans-timmer.nl',
        subject: 'Uw levering donderdag — alles bij het oude',
        date: 'Vandaag · 09:22',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Beste Jelle,',
      delay: 900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Korte heads-up: Saint-Gobain heeft ons drie dagen vertraging gemeld op een levering gipsplaten. Voor jullie order verandert er niets — we leveren donderdag de 45 platen zoals afgesproken, gewoon uit onze eigen voorraad.',
      delay: 1800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph: 'Wilde je dit laten weten zodat je niet schrikt als je iets leest over vertraging bij ons.',
      delay: 1400,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a1',
      target: 'paragraph',
      paragraph:
        'Groet,\n\nSjoerd · Nordveld Klantenservice\nklantenservice@nordveld.nl',
      delay: 1200,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a1',
      footer: 'Verstuurd · 09:22 · 7 min werk bespaard',
      minutesSaved: 7,
      delay: 700,
    },

    { kind: 'status.update', statusText: 'Klantservice schrijft Hoogkarspel', delay: 600 },

    {
      kind: 'artifact.start',
      artifactId: 'a2',
      artifactType: 'email',
      meta: {
        from: 'klantenservice@nordveld.nl',
        to: 'werk@bouwcombinatie-hoogkarspel.nl',
        subject: 'Order 2026-0421 — voorstel levering in 2 ritten',
        date: 'Vandaag · 09:24',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph: 'Beste Gerard,',
      delay: 900,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Saint-Gobain heeft drie dagen vertraging gemeld op een inkomende zending. Jullie order van 80 platen kunnen we daardoor niet in één keer op woensdag leveren zoals gepland.',
      delay: 1800,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Voorstel: woensdag leveren we 50 platen uit onze eigen voorraad — genoeg om de scheidingswanden op de begane grond mee te starten. De resterende 30 platen rijden we vrijdag rechtstreeks achteraan. Geen extra kosten.',
      delay: 2000,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Schikt dat? Laat het even weten, dan zetten we het definitief in de planning.',
      delay: 1400,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a2',
      target: 'paragraph',
      paragraph:
        'Groet,\n\nSjoerd · Nordveld Klantenservice\nklantenservice@nordveld.nl',
      delay: 1200,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a2',
      footer: 'Verstuurd · 09:24 · 16 min werk bespaard',
      minutesSaved: 16,
      delay: 700,
    },

    { kind: 'status.update', statusText: 'Inkoop registreert incident', delay: 600 },
    { kind: 'pickup', by: 'inkoop', delay: 900 },

    {
      kind: 'artifact.start',
      artifactId: 'a3',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Vertragings-incident Saint-Gobain — 3e dit kwartaal',
        date: 'Vandaag · 09:28',
      },
      delay: 700,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Patroon',
        items: [
          'Q2 2026: 3 vertragings-meldingen (Q1: 1, Q4 2025: 0)',
          'Gemiddelde vertraging loopt op van 1 naar 3 werkdagen',
          'Ditmaal directe impact op 2 klantorders, opgelost uit voorraad',
        ],
      },
      delay: 1500,
    },
    {
      kind: 'artifact.fill',
      artifactId: 'a3',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Voorstel',
        items: [
          'Agenda-punt volgende kwartaal-review met accountmanager Saint-Gobain',
          'Strategisch gesprek — te belangrijk voor automatische escalatie',
          'Tot die tijd: extra buffervoorraad overwegen voor brandwerende platen',
        ],
      },
      delay: 1600,
    },
    {
      kind: 'artifact.done',
      artifactId: 'a3',
      footer: 'Opgenomen voor Q-review · 23 min werk bespaard',
      minutesSaved: 23,
      delay: 700,
    },

    { kind: 'complete', totalMinutes: 46, delay: 600 },
  ],
};
