import type { Script } from '@/lib/types';

// Website-chat · "Waar blijft mijn bestelling?" (WISMO). De agent zoekt de
// order op in het ERP, haalt de live status bij PostNL op, verifieert de klant
// en antwoordt in de chat met een concrete nieuwe datum.
export const script_chat_wismo: Script = {
  id: 'script_chat_wismo',
  eventTitle: 'Website-chat — Waar blijft mijn bestelling?',
  eventContext: 'WISMO in de live chat · order opzoeken in ERP + track & trace bij PostNL',
  minutesSaved: 21,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'De Dirigent leest de chat', delay: 600 },
    { kind: 'pickup', by: 'orchestrator', delay: 600 },
    {
      kind: 'reasoning',
      delay: 800,
      reasoning: {
        text:
          'Vraag over een orderstatus. Website-chat handelt af; Bestellingen zoekt de order op in het ERP en haalt de track & trace op bij de vervoerder.',
        by: 'orchestrator',
      },
    },

    { kind: 'status.update', statusText: 'Website-chat pakt het gesprek op', delay: 700 },
    { kind: 'pickup', by: 'orders', delay: 600 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Identiteit geverifieerd',
        value: 'Ordernummer + naam kloppen met het account van Sanne de Wit',
        by: 'orders',
        tone: 'policy',
      },
    },

    { kind: 'status.update', statusText: 'Bestellingen zoekt de order op in het ERP', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'ERP · order opgezocht',
        value: 'VNK-2026-08841 · verzonden 18 juli · PostNL 3SVNK0293847',
        by: 'voorraad',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 900,
      check: {
        label: 'PostNL Track & Trace',
        value: 'Zending hangt 2 dagen vast in sorteercentrum Utrecht · nieuwe verwachting: morgen vóór 17:00',
        by: 'voorraad',
        tone: 'log',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Pakket is onderweg maar vertraagd bij PostNL, buiten de schuld van de klant. Eerlijk de nieuwe datum geven, de tracking meesturen en een kleine attentie aanbieden voor het ongemak.',
        by: 'orders',
      },
    },

    { kind: 'status.update', statusText: 'Website-chat antwoordt in de chat', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'whatsapp',
      meta: {
        channelLabel: 'Website-chat · vonk.nl',
        customer: 'Sanne de Wit',
        phone: 'Live chat · geverifieerd',
        reasoning: [
          'Concreet zijn: het echte spoor en de nieuwe datum, geen vaag "we kijken ernaar"',
          'Tracking-link meesturen zodat Sanne het zelf kan volgen',
          'Kleine attentie (€ 5 tegoed) omdat de vertraging bij de vervoerder ligt',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'customer',
        text: 'Waar blijft mijn hanglamp (VNK-2026-08841)? Al 5 dagen niks gehoord.',
        time: '14:12',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'us',
        text:
          'Hoi Sanne! Ik heb je bestelling er even bij gepakt. Je hanglamp Fenn is op 18 juli verzonden met PostNL, maar de zending is helaas blijven hangen in het sorteercentrum. Nieuwe verwachte bezorging: morgen vóór 17:00.',
        time: '14:12',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'us',
        text:
          'Je kunt hem live volgen via deze track & trace: postnl.nl/3SVNK0293847. Vervelend dat het langer duurt, dat ligt niet aan jou. Ik zet € 5 tegoed op je account voor het ongemak.',
        time: '14:13',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'customer',
        text: 'Ah top, fijn dat het duidelijk is. Dan wacht ik morgen af. Dank!',
        time: '14:14',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Beantwoord in de chat · 12 min werk bespaard',
      minutesSaved: 12,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { orders: 1 } },

    { kind: 'status.update', statusText: 'Bestellingen plant een proactieve controle', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 600,
      artifactId: 'a2',
      artifactType: 'calendar-item',
      meta: {
        reasoning: [
          'Belofte gedaan: morgen bezorgd. Zelf controleren voorkomt een tweede boze vraag',
          'Als PostNL het weer niet haalt, kunnen we Sanne vóór zijn met een bericht',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 800,
      artifactId: 'a2',
      target: 'slot',
      slot: {
        wanneer: 'Morgen · 17:15',
        duur: '5 min',
        voor: 'Bestellingen',
        onderwerp: 'Controle levering Sanne de Wit · VNK-2026-08841',
        details: [
          'Track & trace opnieuw ophalen bij PostNL',
          'Geleverd? Dan afsluiten. Niet geleverd? Sanne proactief informeren',
          '€ 5 tegoed staat klaar op het account',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a2',
      footer: 'In agenda gezet · 5 min werk bespaard',
      minutesSaved: 5,
    },
    {
      kind: 'workitem.create',
      delay: 300,
      workitem: {
        artifactId: 'a2',
        department: 'voorraad',
        kind: 'followup',
        title: 'Morgen: levering Sanne bevestigen',
        subtitle: 'Track & trace checken · proactief melden bij nieuwe vertraging',
        reference: 'VNK-2026-08841 · PostNL 3SVNK0293847',
        actionLabel: 'Gecontroleerd',
        systemTarget: 'ERP + PostNL',
      },
    },

    { kind: 'complete', delay: 700, totalMinutes: 21 },
  ],
};
