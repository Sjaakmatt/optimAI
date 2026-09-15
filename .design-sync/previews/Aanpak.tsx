import { Aanpak, Afspraken } from 'factumai-demo';
import { Uitgeanimeerd } from '../preview-lib/Uitgeanimeerd';

/**
 * De aanpak in vijf stappen zoals hij in de methode-band staat: kop links,
 * genummerde lijst rechts met de lijn die zich langs de stappen tekent. In
 * rust (zonder scrollen) is de lijn deels getekend en lichten de eerste
 * nummers koper op.
 */
export function Stappenplan() {
  return (
    <Uitgeanimeerd>
    <div className="home-world">
      <div className="home-method">
        <Aanpak />
      </div>
    </div>
    </Uitgeanimeerd>
  );
}

/**
 * Zoals op de homepage: de aanpak gevolgd door de drie afspraken, samen in
 * de methode-band.
 */
export function MetAfspraken() {
  return (
    <Uitgeanimeerd>
    <div className="home-world">
      <div className="home-method">
        <Aanpak />
        <Afspraken />
      </div>
    </div>
    </Uitgeanimeerd>
  );
}
