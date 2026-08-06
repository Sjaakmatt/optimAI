/**
 * IndexNow setup voor FactumAI.
 *
 * IndexNow is een open protocol (Bing, Yandex, Seznam, Naver, Yep, Mojeek)
 * waarmee je proactief signaleert dat URLs nieuw of gewijzigd zijn.
 * Versnelt indexering, vooral bij Bing, wat ChatGPT-search voedt.
 *
 * De key is geen geheim; hij dient alleen als ownership-token. Je hebt
 * een matchend bestand op /<key>.txt nodig om te bewijzen dat je het
 * domein bezit. Wijzigen mag, dan ook het pad in app/ aanpassen.
 */
export const INDEXNOW_KEY = 'f4c8a2e9d6b3791058acfe2d40b9c317';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';
export const INDEXNOW_KEY_LOCATION = `${SITE}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
