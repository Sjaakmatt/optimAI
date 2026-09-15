import { Opkomend } from 'factumai-demo';
import { Uitgeanimeerd } from '../preview-lib/Uitgeanimeerd';

const KOP = 'font-display text-[30px] leading-[1.06] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[48px]';

/**
 * Canoniek: een sectiekop als h2 met twee regels, de tweede als serif-accent.
 * Zonder `inView` komt de tekst direct bij het laden op (eindstand zichtbaar).
 */
export function Sectiekop() {
  return (
    <Uitgeanimeerd>
    <div className="band py-10">
      <Opkomend as="h2" className={KOP} regels={['Van eerste gesprek', <em key="accent">naar dagelijks gemak.</em>]} />
    </div>
    </Uitgeanimeerd>
  );
}

/**
 * `perWoord`: elke regel wordt woord voor woord onthuld. Alleen voor pure
 * tekstregels (geen elementen).
 */
export function PerWoord() {
  return (
    <Uitgeanimeerd>
    <div className="band py-10">
      <Opkomend
        as="h2"
        perWoord
        className={KOP}
        regels={['Een digitale collega', 'die mails afhandelt en offertes opvolgt.']}
      />
    </div>
    </Uitgeanimeerd>
  );
}

/**
 * `inView`: opkomen zodra de kop in beeld schuift (zo staat hij in Aanpak en
 * Afspraken). Met `vertraging` van 0.2s na het eyebrow-label erboven.
 */
export function InBeeld() {
  return (
    <Uitgeanimeerd>
    <div className="band py-10">
      <div className="eyebrow mb-3">Drie afspraken</div>
      <Opkomend as="h2" inView vertraging={0.2} className={KOP} regels={['Drie afspraken.', 'Geen kleine lettertjes.']} />
    </div>
    </Uitgeanimeerd>
  );
}

/**
 * Als alinea (`as="p"`): drie korte regels lopende tekst in de gedimde kleur,
 * regel voor regel.
 */
export function AlsAlinea() {
  return (
    <Uitgeanimeerd>
    <div className="band py-10">
      <Opkomend
        as="p"
        className="max-w-[52ch] text-[17px] leading-[1.65] text-[var(--fg-dim)]"
        regels={[
          'Het eerste gesprek is altijd vrijblijvend.',
          'Past een agent bij uw werk, dan volgt een voorstel:',
          'één agent, vaste prijs per fase.',
        ]}
      />
    </div>
    </Uitgeanimeerd>
  );
}
