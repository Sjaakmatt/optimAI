import assert from 'node:assert/strict';
import { test } from 'node:test';
import { MAIL_CASES } from './cases';

test('elke e-mail uit de demo levert een afspeelbare case', () => {
  assert.ok(MAIL_CASES.length >= 3, `verwacht minstens 3 mails, kreeg ${MAIL_CASES.length}`);
  for (const c of MAIL_CASES) {
    assert.ok(c.afzender.naam.length > 0, `${c.id}: afzender ontbreekt`);
    assert.ok(c.body.length > 0, `${c.id}: body ontbreekt`);
    assert.ok(c.stappen.length >= 2, `${c.id}: te weinig stappen`);
    assert.ok(c.antwoord.alineas.length >= 3, `${c.id}: antwoord te kort`);
    assert.ok(c.minutenBespaard > 0, `${c.id}: bespaarde minuten ontbreken`);
  }
});

test('de stappen komen vóór het antwoord en bevatten een overweging', () => {
  for (const c of MAIL_CASES) {
    assert.ok(c.stappen.some((s) => s.kind === 'reasoning'), `${c.id}: geen overweging`);
    assert.ok(c.stappen.some((s) => s.kind === 'check'), `${c.id}: geen check`);
    assert.ok(c.systemen.length >= 1, `${c.id}: geen systemen herkend`);
  }
});
