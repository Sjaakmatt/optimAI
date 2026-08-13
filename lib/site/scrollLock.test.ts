// Het scrollslot, met nadruk op het geval dat in productie misging: twee
// vensters die elkaar overlappen en in de verkeerde volgorde sluiten.

import { strict as assert } from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { _diepte, _herstelVoorTest, vergrendelScroll } from './scrollLock';

/** Minimale DOM-stand-in; de module raakt alleen body.style.overflow aan. */
function zetDomOp(overflow: string): void {
  (globalThis as unknown as { document: unknown }).document = {
    body: { style: { overflow } },
  };
}

function huidigeOverflow(): string {
  return (globalThis as unknown as { document: { body: { style: { overflow: string } } } })
    .document.body.style.overflow;
}

describe('scrollslot', () => {
  beforeEach(() => {
    _herstelVoorTest();
    zetDomOp('');
  });

  it('vergrendelt en laat weer los', () => {
    const ontgrendel = vergrendelScroll();
    assert.equal(huidigeOverflow(), 'hidden');
    ontgrendel();
    assert.equal(huidigeOverflow(), '');
  });

  it('houdt vast zolang er nog een venster open is', () => {
    const eerste = vergrendelScroll();
    const tweede = vergrendelScroll();
    assert.equal(_diepte(), 2);

    eerste();
    assert.equal(huidigeOverflow(), 'hidden', 'nog een venster open, dus nog op slot');

    tweede();
    assert.equal(huidigeOverflow(), '', 'laatste venster dicht, dus weer scrollbaar');
  });

  it('laat los in omgekeerde sluitvolgorde', () => {
    // Dit is het geval dat stukging. Met de oude aanpak — elk venster onthoudt
    // zelf de vorige waarde — zette het laatste venster 'hidden' terug, omdat
    // dát de waarde was toen het openging. Scrollen bleef daarna kapot tot een
    // refresh.
    const agenda = vergrendelScroll();
    const menu = vergrendelScroll();

    agenda();
    menu();

    assert.equal(huidigeOverflow(), '', 'scrollen moet het weer doen');
    assert.equal(_diepte(), 0);
  });

  it('respecteert een overflow die er al stond', () => {
    zetDomOp('clip');
    const ontgrendel = vergrendelScroll();
    assert.equal(huidigeOverflow(), 'hidden');
    ontgrendel();
    assert.equal(huidigeOverflow(), 'clip', 'de oorspronkelijke waarde hoort terug te komen');
  });

  it('telt een dubbele ontgrendeling maar één keer', () => {
    // React kan een cleanup twee keer aanroepen. Zou dat de teller onder nul
    // trekken, dan laat een nog open venster het slot te vroeg los.
    const eerste = vergrendelScroll();
    const tweede = vergrendelScroll();

    eerste();
    eerste();
    assert.equal(huidigeOverflow(), 'hidden', 'het tweede venster staat nog open');

    tweede();
    assert.equal(huidigeOverflow(), '');
  });

  it('doet niets zonder DOM', () => {
    delete (globalThis as unknown as { document?: unknown }).document;
    const ontgrendel = vergrendelScroll();
    assert.equal(typeof ontgrendel, 'function');
    ontgrendel();
  });
});
