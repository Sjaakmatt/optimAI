import type { Script } from '@/lib/types';

// Social · DM met een voorraadvraag. De agent raadpleegt de PIM voor de
// productstatus en het inkoopsysteem voor de verwachte binnenkomst, en biedt
// een voorraadmelding plus een alternatief aan.
export const script_social_restock: Script = {
  id: 'script_social_restock',
  eventTitle: 'Social, DM: komt dit terug op voorraad?',
  eventContext: 'Voorraadvraag in DM · PIM raadplegen en ETA uit het inkoopsysteem halen',
  minutesSaved: 13,
  steps: [
    { kind: 'ticket', delay: 400 },

    { kind: 'status.update', statusText: 'Social pakt de DM op', delay: 600 },
    { kind: 'pickup', by: 'verzending', delay: 700 },

    { kind: 'status.update', statusText: 'Kennisbank raadpleegt de PIM', delay: 700 },
    { kind: 'pickup', by: 'inkoop', delay: 600 },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'PIM · productstatus',
        value: 'Vloerkleed Vinga 160×230 oker · uitverkocht · variant grijs is wél leverbaar',
        by: 'inkoop',
        tone: 'inventory',
      },
    },
    {
      kind: 'check',
      delay: 800,
      check: {
        label: 'Inkoopsysteem · ETA',
        value: 'Nieuwe batch oker verwacht in week 32 (±2,5 week) · 120 stuks besteld bij leverancier',
        by: 'inkoop',
        tone: 'inventory',
      },
    },

    {
      kind: 'reasoning',
      delay: 900,
      reasoning: {
        text:
          'Eerlijke datum geven en een voorraadmelding aanbieden zodat ze niet steeds hoeft te checken. De grijze variant noemen als alternatief, zonder te pushen.',
        by: 'verzending',
      },
    },

    { kind: 'status.update', statusText: 'Social antwoordt in de DM', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a1',
      artifactType: 'whatsapp',
      meta: {
        channelLabel: 'Instagram · DM',
        customer: '@home.by.lot',
        phone: 'Direct message',
        reasoning: [
          'Concrete week noemen in plaats van "binnenkort"',
          'Voorraadmelding aanbieden zodat we het initiatief houden',
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
        text: 'Het vloerkleed Vinga (oker, 160x230) is overal uitverkocht 😍 komt die nog terug?',
        time: '13:24',
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
          'Hoi Lot! Goed nieuws: de oker komt terug. Er ligt een nieuwe batch gepland voor week 32, dus over zo’n 2,5 week. Wil je dat ik je een seintje geef zodra hij er weer is? Dan zet ik een voorraadmelding voor je klaar.',
        time: '13:26',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1600,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'customer',
        text: 'Ja graag! En stiekem twijfel ik ook over grijs, is die er wel?',
        time: '13:27',
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1500,
      artifactId: 'a1',
      target: 'message',
      message: {
        from: 'us',
        text:
          'De grijze ligt op voorraad en is morgen te bezorgen. Ik stuur je even beide op een rijtje, dan kies je rustig. Melding voor de oker staat hoe dan ook klaar. 🌾',
        time: '13:28',
      },
    },
    {
      kind: 'artifact.done',
      delay: 700,
      artifactId: 'a1',
      footer: 'Beantwoord in DM · 9 min werk bespaard',
      minutesSaved: 9,
    },
    { kind: 'cockpit.tick', delay: 200, cockpit: { routesPlanned: 1 } },

    { kind: 'status.update', statusText: 'Kennisbank stelt de voorraadmelding in', delay: 700 },
    {
      kind: 'artifact.start',
      delay: 700,
      artifactId: 'a2',
      artifactType: 'memo',
      meta: {
        memoSubject: 'Voorraadmelding · Vinga oker voor @home.by.lot',
        date: 'Vandaag · 13:29',
        reasoning: [
          'Melding gekoppeld aan de ETA uit het inkoopsysteem, gaat automatisch af bij binnenkomst',
          'Zo hoeft de klant niet te checken en wij niet handmatig na te bellen',
        ],
      },
    },
    {
      kind: 'artifact.fill',
      delay: 1200,
      artifactId: 'a2',
      target: 'bullet-section',
      bulletSection: {
        heading: 'Ingesteld',
        items: [
          'Voorraadmelding: Vinga 160×230 oker · trigger op binnenkomst batch week 32',
          'Bericht gaat via Instagram-DM zodra het artikel weer live staat',
          'Grijze variant als alternatief doorgestuurd',
        ],
      },
    },
    {
      kind: 'artifact.done',
      delay: 600,
      artifactId: 'a2',
      footer: 'Melding actief · 4 min werk bespaard',
      minutesSaved: 4,
    },

    { kind: 'complete', delay: 700, totalMinutes: 13 },
  ],
};
