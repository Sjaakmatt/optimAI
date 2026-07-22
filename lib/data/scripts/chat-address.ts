import type { Script } from '@/lib/types';

// Website-chat · bezorgadres wijzigen. De agent controleert in het ERP of de
// order nog niet verzonden is, toetst het beleid, past het adres aan in het
// ordersysteem en bevestigt met een nieuwe orderbevestiging.
export const script_chat_address: Script = {
  id: 'script_chat_address',
  eventTitle: 'Website-chat — Bezorgadres wijzigen',
  eventContext: 'Adreswijziging vóór verzending · status checken in ERP, aanpassen en bevestigen',
  minutesSaved: 17,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Website-chat pakt de chat op', delay: 600 },
    { kind: 'pickup', by: 'orders', delay: 700 },
    {
      kind: 'check',
      delay: 700,
      check: {
        label: 'Identiteit geverifieerd',
        value: 'Thomas Peters · ordernummer + e-mail kloppen met het account',
        by: 'orders',
        tone: 'policy',
      },
    },

    { kind: 'status.update', statusText: 'Bestellingen checkt de orderstatus in het ERP', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'ERP · orderstatus',
        value: 'VNK-2026-08918 · betaald · picking staat gepland vanmiddag · nog geen verzendlabel',
        by: 'voorraad',
        tone: 'dossier',
      },
    },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'Beleid #ord-3',
        value: 'Adreswijziging mag zolang er nog geen verzendlabel is · dit valt binnen het venster',
        by: 'orders',
        tone: 'policy',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'De order is betaald maar nog niet verzonden, dus het adres kan nog veilig aangepast worden in het ERP. Wel het nieuwe adres teruglezen aan Thomas ter bevestiging.',
        by: 'orders',
      },
    },

    { kind: 'status.update', statusText: 'Bestellingen past het adres aan in het ordersysteem', delay: 700 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'ERP · adres bijgewerkt',
        value: 'Afleveradres → Keizersgracht 210, 1016 DX Amsterdam (werkadres) · picking-opdracht aangepast',
        by: 'voorraad',
        tone: 'log',
      },
    },

    { kind: 'status.update', statusText: 'Website-chat bevestigt in de chat', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'whatsapp',
      meta: {
        channelLabel: 'Website-chat · vonk.nl',
        customer: 'Thomas Peters',
        phone: 'Live chat · geverifieerd',
        reasoning: [
          'Direct geruststellen: het kon nog en het is al geregeld',
          'Nieuw adres letterlijk teruglezen zodat een typefout meteen opvalt',
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
        text: 'Kan mijn wandplank (VNK-2026-08918) naar mijn werkadres in plaats van thuis?',
        time: '10:47',
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
          'Zeker! Je order is nog niet verzonden, dus ik heb het adres net aangepast. Nieuwe bezorging gaat naar: Keizersgracht 210, 1016 DX Amsterdam. Klopt dat zo?',
        time: '10:48',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'customer',
        text: 'Perfect, dat klopt. Dankjewel, snel geregeld!',
        time: '10:48',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1400,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'us',
        text:
          'Graag gedaan. Je krijgt zo de bijgewerkte orderbevestiging per mail. Fijne dag!',
        time: '10:49',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Bevestigd in de chat · 9 min werk bespaard',
      minutesSaved: 9,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { orders: 1 } },

    { kind: 'status.update', statusText: 'Bestellingen stuurt de bijgewerkte bevestiging', delay: 700 },
    { kind: 'pickup', by: 'voorraad', delay: 600 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'order-confirmation',
      meta: {
        orderNumber: 'VNK-2026-08918',
        customer: 'Thomas Peters',
        date: 'Vandaag · 10:49 · adres bijgewerkt',
        deliveryDate: 'Morgen',
        deliveryWindow: 'PostNL · tussen 09:00 en 18:00',
        deliveryAddress: 'Keizersgracht 210\n1016 DX Amsterdam\n(werkadres)',
        contactRegel: 'Vragen? klantenservice@vonk.nl',
        reasoning: [
          'Nieuwe bevestiging is het bewijs voor de klant dat het adres echt is aangepast',
          'Adres komt rechtstreeks uit het bijgewerkte ERP-record, geen dubbele invoer',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 900,
      artifactId: 'a2',
      target: 'item',
      item: { artikel: 'Wandplank Rise eiken · 80 cm', aantal: 1 },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a2',
      footer: 'Verstuurd naar Thomas · 8 min werk bespaard',
      minutesSaved: 8,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { mails: 1 } },

    { kind: 'complete', delay: 700, totalMinutes: 17 },
  ],
};
