'use client';

import { Howl } from 'howler';

/**
 * Subtiele geluidscues, standaard uit. Alleen afgespeeld als de
 * bezoeker de geluid-toggle heeft aangezet; nooit autoplay.
 */

let stap: Howl | null = null;
let moment: Howl | null = null;

function init() {
  stap ??= new Howl({ src: ['/ontdek-geluid/stap.wav'], volume: 0.35 });
  moment ??= new Howl({ src: ['/ontdek-geluid/moment.wav'], volume: 0.4 });
}

export function speelStap(aan: boolean) {
  if (!aan) return;
  init();
  stap!.play();
}

export function speelMoment(aan: boolean) {
  if (!aan) return;
  init();
  moment!.play();
}
