// Genereert de twee subtiele UI-geluidjes voor /ontdek als kleine
// wav-bestanden in public/ontdek-geluid/. Eenmalig draaien:
//   node scripts/maak-geluiden.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const RATE = 44100;

function wav(samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write('WAVEfmt ', 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(RATE, 24);
  buf.writeUInt32LE(RATE * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(n * 2, 40);
  samples.forEach((s, i) => buf.writeInt16LE(Math.max(-1, Math.min(1, s)) * 32767, 44 + i * 2));
  return buf;
}

function toon(freqs, dur, vol = 0.22) {
  const n = Math.round(RATE * dur);
  return Array.from({ length: n }, (_, i) => {
    const t = i / RATE;
    const env = Math.exp(-5.5 * t) * Math.min(1, t * 300);
    let s = 0;
    for (const [f, w] of freqs) s += Math.sin(2 * Math.PI * f * t) * w;
    return s * env * vol;
  });
}

mkdirSync('public/ontdek-geluid', { recursive: true });
// zachte plok: agent klaar met een stap
writeFileSync('public/ontdek-geluid/stap.wav', wav(toon([[520, 0.6], [780, 0.25]], 0.22)));
// warme tweeklank: het pauze/mens-beslist-moment
writeFileSync(
  'public/ontdek-geluid/moment.wav',
  wav(toon([[392, 0.5], [588, 0.3], [784, 0.15]], 0.5, 0.2)),
);
console.log('geluiden geschreven');
