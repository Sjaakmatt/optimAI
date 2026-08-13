// Het agendablok in de prompt moet passen bij de agenda die daadwerkelijk
// draait.
//
// Dit is geen cosmetisch punt. Met Cal.com kan de agent niet in de agenda
// kijken; zegt de prompt dan tóch "noem twee of drie momenten", dan krijgt het
// model twee tegenstrijdige instructies — de prompt zegt noemen, de tool zegt
// dat er niets te zien is. Dat is precies de ruimte waarin een model iets
// aannemelijks verzint, en een verzonnen tijdstip is hier het ergste wat er kan
// gebeuren.

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { bouwSysteembericht } from './prompt';

function stabieleTekst(): string {
  return bouwSysteembericht('home').map((blok) => blok.text).join('\n\n');
}

describe('agendablok in het systeembericht', () => {
  it('laat geen placeholder in de prompt staan', () => {
    assert.ok(!stabieleTekst().includes('{{AGENDA}}'), 'placeholder niet ingevuld');
  });

  it('past bij de agenda die draait', () => {
    const tekst = stabieleTekst();
    const teams = process.env.NEXT_PUBLIC_BOEKING_PROVIDER === 'teams';

    if (teams) {
      // Eigen agenda: de agent mag momenten noemen en echt aanvragen, maar mag
      // niet zeggen dat de afspraak al vaststaat.
      assert.match(tekst, /Noem twee of drie momenten/);
      assert.match(tekst, /nooit "je afspraak staat"/);
    } else {
      // Cal.com: de agent kan niets zien, dus geen datum en geen tijdstip.
      assert.match(tekst, /Je kunt zelf niet zien welke momenten vrij zijn/);
      assert.ok(
        !tekst.includes('Noem twee of drie momenten'),
        'de prompt vraagt om momenten te noemen die de agent niet kan zien',
      );
    }
  });

  it('noemt checkBeschikbaarheid in beide standen', () => {
    // De tool bestaat altijd; alleen wat hij oplevert verschilt.
    assert.match(stabieleTekst(), /checkBeschikbaarheid/);
  });
});
