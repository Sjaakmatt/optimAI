import { useMotionValue } from 'motion/react';
import { Podium } from 'factumai-demo';

// Het podium leest een MotionValue 0..1: de mail is actief rond 1/6, de
// checks rond 1/2, het antwoord rond 5/6. Zonder scroll staat de waarde vast.

/** In rust (niet gepind): de drie fragmenten gestapeld, de mail vooraan, de rest wijkt terug. */
export function InRust() {
  const progress = useMotionValue(0);
  return (
    <div style={{ maxWidth: 460 }}>
      <Podium progress={progress} gepind={false} />
    </div>
  );
}

/** Gepind, begin van de scroll: de binnengekomen mail staat vooraan. */
export function MailVooraan() {
  const progress = useMotionValue(1 / 6);
  return (
    <div style={{ maxWidth: 460 }}>
      <Podium progress={progress} gepind />
    </div>
  );
}

/** Gepind, halverwege: wat de agent heeft opgezocht en getoetst komt naar voren. */
export function ChecksVooraan() {
  const progress = useMotionValue(0.5);
  return (
    <div style={{ maxWidth: 460 }}>
      <Podium progress={progress} gepind />
    </div>
  );
}

/** Gepind, einde van de scroll: het conceptantwoord met de knop "Goedkeuren en versturen". */
export function AntwoordVooraan() {
  const progress = useMotionValue(5 / 6);
  return (
    <div style={{ maxWidth: 460 }}>
      <Podium progress={progress} gepind />
    </div>
  );
}

/** Naast de kop over wat een agent doet: tekst links, het podium rechts. */
export function NaastKop() {
  const progress = useMotionValue(0.5);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)', gap: 40, alignItems: 'center' }}>
      <div>
        <div className="eyebrow mb-3">Wat een agent doet</div>
        <h2 className="font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)]">
          Hij leest, zoekt op
          <br />
          en zet het antwoord klaar.
        </h2>
        <p className="mt-5 text-[15.5px] leading-[1.65] text-[var(--fg-dim)]">
          Een klant vraagt waar zijn bestelling blijft. De agent vindt de order, kijkt naar de bezorgstatus en schrijft een
          antwoord. U leest mee en keurt goed.
        </p>
      </div>
      <Podium progress={progress} gepind />
    </div>
  );
}
