// Tests voor de padmapping en de maskering. Klein, maar deze twee bepalen wel
// welk playbook er in de prompt komt en wat er in de logs belandt.

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { playbookVoorPad, verbergZwevendeKnoppen } from './pad-naar-playbook';
import { maskeerEmail } from './events';

describe('paginapad naar playbook', () => {
  it('herkent de branchepagina', () => {
    assert.equal(playbookVoorPad('/branches/groothandel'), 'branche');
    assert.equal(playbookVoorPad('/branches'), 'branche');
  });

  it('herkent diensten en oplossingen als dienstpagina', () => {
    assert.equal(playbookVoorPad('/diensten'), 'dienst');
    assert.equal(playbookVoorPad('/diensten/ai-automatisering'), 'dienst');
    assert.equal(playbookVoorPad('/oplossingen/offertes-automatiseren'), 'dienst');
  });

  it('herkent de kennisbank als blog', () => {
    assert.equal(playbookVoorPad('/kennis'), 'blog');
    assert.equal(playbookVoorPad('/kennis/guardrails-niet-een-rem-maar-een-kompas'), 'blog');
  });

  it('herkent cases en over ons als vertrouwenspagina', () => {
    assert.equal(playbookVoorPad('/cases/teka-kranen-inspectie'), 'cases');
    assert.equal(playbookVoorPad('/over/sjaak-ter-veld'), 'cases');
  });

  it('behandelt de uitlegpagina en de rekentools als koopintentie', () => {
    assert.equal(playbookVoorPad('/info'), 'prijs');
    assert.equal(playbookVoorPad('/tools/ai-roi-calculator'), 'prijs');
  });

  it('valt terug op home bij een onbekend pad', () => {
    assert.equal(playbookVoorPad('/'), 'home');
    assert.equal(playbookVoorPad('/iets-wat-niet-bestaat'), 'home');
  });

  it('negeert een afsluitende slash en hoofdletters', () => {
    assert.equal(playbookVoorPad('/Kennis/'), 'blog');
    assert.equal(playbookVoorPad('/INFO'), 'prijs');
  });
});

describe('zichtbaarheid van de zwevende knoppen', () => {
  it('verbergt ze op de conversie- en juridische pagina\'s', () => {
    for (const pad of ['/contact', '/plan', '/demo', '/privacy', '/subverwerkers']) {
      assert.equal(verbergZwevendeKnoppen(pad), true, pad);
    }
  });

  it('verbergt ze op de aanvraag- en ontdekpagina\'s', () => {
    assert.equal(verbergZwevendeKnoppen('/aanvraag/groothandel'), true);
    assert.equal(verbergZwevendeKnoppen('/ontdek'), true);
  });

  it('toont ze op de gewone marketingpagina\'s', () => {
    for (const pad of ['/', '/diensten', '/kennis', '/branches/bouw', '/cases']) {
      assert.equal(verbergZwevendeKnoppen(pad), false, pad);
    }
  });
});

describe('maskering van persoonsgegevens in logs', () => {
  it('houdt het domein leesbaar en de rest niet', () => {
    assert.equal(maskeerEmail('sjaak@factumai.nl'), 'sj***@factumai.nl');
  });

  it('gaat om met een kort lokaal deel', () => {
    const gemaskeerd = maskeerEmail('a@b.nl');
    assert.ok(gemaskeerd && !gemaskeerd.startsWith('a@'), gemaskeerd ?? 'null');
  });

  it('geeft null terug zonder invoer', () => {
    assert.equal(maskeerEmail(null), null);
    assert.equal(maskeerEmail(undefined), null);
  });

  it('lekt niets bij een waarde die geen mailadres is', () => {
    assert.equal(maskeerEmail('geen-mailadres'), '***');
  });
});
