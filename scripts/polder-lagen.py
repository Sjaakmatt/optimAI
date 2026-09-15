#!/usr/bin/env python3
"""
Splitst één masterfoto van de polder in lagen voor de hero (2.5D).

  1. Depth Anything V2 (small) schat de diepte per pixel.
  2. De molen met boerderij, wilgen en de dijk worden als één stuk grond
     losgemaakt met een helderheidsmasker binnen een venster rond de horizon
     (silhouet tegen de lichte lucht); de dieptekaart alleen mist de dunne
     wieken.
  3. Het riet komt uit de dieptekaart: nabij (riet) en vooraan (oever).
  4. De verre plaat (lucht, horizon, water) wordt achter de losgemaakte lagen
     bijgevuld met inpainting, zodat er bij het uit elkaar schuiven geen gat valt.

Gebruik:
  python3 scripts/polder-lagen.py <master.png> --uit public/polder/lagen
"""
import argparse
import json
import os
import sys

import numpy as np
from PIL import Image


def diepte(master: Image.Image) -> np.ndarray:
    from transformers import pipeline

    pipe = pipeline(task="depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf")
    d = np.asarray(pipe(master)["depth"], dtype=np.float32)
    d = (d - d.min()) / max(1e-6, d.max() - d.min())
    if d.shape != (master.height, master.width):
        d = np.asarray(Image.fromarray((d * 255).astype(np.uint8)).resize(master.size, Image.BILINEAR), dtype=np.float32) / 255.0
    return d


def blur(m: np.ndarray, straal: int) -> np.ndarray:
    import cv2

    k = max(1, straal * 2 + 1)
    return cv2.GaussianBlur(m.astype(np.float32), (k, k), 0)


def vul_achter(rgb: np.ndarray, gat: np.ndarray, straal: int = 9) -> np.ndarray:
    import cv2

    m = (gat > 0.5).astype(np.uint8) * 255
    if m.sum() == 0:
        return rgb
    h, w = m.shape
    klein = cv2.resize(rgb, (w // 2, h // 2), interpolation=cv2.INTER_AREA)
    mk = cv2.resize(m, (w // 2, h // 2), interpolation=cv2.INTER_NEAREST)
    gevuld = cv2.resize(cv2.inpaint(klein, mk, straal, cv2.INPAINT_TELEA), (w, h), interpolation=cv2.INTER_CUBIC)
    uit = rgb.copy()
    uit[m > 0] = gevuld[m > 0]
    return uit


def vul_horizontaal(rgb: np.ndarray, gat: np.ndarray, zacht: int = 6) -> np.ndarray:
    """Vult gaten per rij door lineair te mengen tussen de pixels links en
    rechts van het gat. Lucht, horizon en water zijn horizontaal vrijwel
    egaal, dus dit geeft een schone band zonder de vlekken van inpainting."""
    import cv2

    m = gat > 0.5
    uit = rgb.astype(np.float32).copy()
    h, w = m.shape
    x = np.arange(w)
    yy = np.arange(h)
    # Rijen die helemaal gat zijn (de dijkband over de volle breedte) eerst
    # verticaal vullen, per kolom tussen de dichtstbijzijnde goede rijen.
    vol = m.all(axis=1)
    if vol.any():
        goede_rijen = yy[~vol]
        for c in range(3):
            for xk in range(w):
                uit[vol, xk, c] = np.interp(yy[vol], goede_rijen, uit[goede_rijen, xk, c])
        m = m & ~vol[:, None]
    for y in range(h):
        rij = m[y]
        if not rij.any():
            continue
        goed = ~rij
        if not goed.any():
            continue
        for c in range(3):
            uit[y, rij, c] = np.interp(x[rij], x[goed], uit[y, goed, c])
    # Het gevulde deel sterk horizontaal vervagen: lucht, horizon en water zijn
    # in de breedte egaal, en zo verdwijnen zowel strepen als schimmen in een
    # zachte nevelband. Dit deel ligt in rust achter de dijk; alleen een smalle
    # strook ervan komt bij het schuiven in beeld.
    m_oorspronkelijk = gat > 0.5
    zachtbeeld = cv2.GaussianBlur(uit, (0, 0), sigmaX=zacht * 12, sigmaY=zacht)
    breed = cv2.dilate(m_oorspronkelijk.astype(np.uint8), np.ones((9, 9), np.uint8)) > 0
    zachtmasker = cv2.GaussianBlur(breed.astype(np.float32), (0, 0), 4)[..., None]
    uit = uit * (1 - zachtmasker) + zachtbeeld * zachtmasker
    return np.clip(uit, 0, 255).astype(np.uint8)


def bewaar(pad: str, rgb: np.ndarray, alfa: np.ndarray) -> None:
    Image.fromarray(np.dstack([rgb, (np.clip(alfa, 0, 1) * 255).astype(np.uint8)]), "RGBA").save(pad, quality=84, method=6)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("master")
    ap.add_argument("--uit", default="public/polder/lagen")
    ap.add_argument("--breedte", type=int, default=2200)
    ap.add_argument("--horizon", type=float, default=0.545, help="y van de dijkvoet als deel van de hoogte")
    ap.add_argument("--dijk-top", type=float, default=0.18, help="y waarboven niets meer bij de dijk hoort")
    ap.add_argument("--dijk-drempel", type=float, default=0.42, help="luminantie (0..1) waaronder een pixel silhouet is")
    ap.add_argument("--riet-diepte", type=float, default=0.40)
    ap.add_argument("--voor-diepte", type=float, default=0.70)
    ap.add_argument("--lokaal", type=float, default=0.10, help="hoeveel donkerder dan de omgeving een silhouet moet zijn")
    ap.add_argument("--dijk-diepte", type=float, default=0.05, help="diepte (0..1) waarboven een pixel in het venster bij de dijk hoort")
    a = ap.parse_args()

    master = Image.open(a.master).convert("RGB")
    if master.width > a.breedte:
        master = master.resize((a.breedte, int(a.breedte * master.height / master.width)), Image.LANCZOS)
    os.makedirs(a.uit, exist_ok=True)
    master.save(os.path.join(a.uit, "master.webp"), quality=84, method=6)
    rgb = np.asarray(master).astype(np.uint8)
    h, w = rgb.shape[:2]
    lum = (0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]) / 255.0
    yy = np.arange(h)[:, None] / h

    d = diepte(master)
    Image.fromarray((d * 255).astype(np.uint8)).save(os.path.join(a.uit, "diepte.png"))

    import cv2

    # Silhouetten zijn plaatselijk veel donkerder dan hun omgeving (de lucht
    # of het water). Een vaste drempel pakt ook donkere wolken; het verschil
    # met een sterk vervaagde versie van het beeld niet.
    omgeving = blur(lum, 40)
    donker = lum < omgeving - a.lokaal

    # --- dijk: silhouet tegen de lucht binnen het venster, plus de dijkband zelf
    venster = (yy >= a.dijk_top) & (yy <= a.horizon + 0.012)
    # Donker tegen de lucht, óf volgens de dieptekaart dichterbij dan de lucht
    # (het dak van de boerderij vangt randlicht en is niet donker genoeg).
    silhouet = venster & ((donker & (lum < a.dijk_drempel)) | (d >= a.dijk_diepte))
    band = (yy >= a.horizon - 0.045) & (yy <= a.horizon + 0.012)
    dijk = (silhouet | (band & (lum < a.dijk_drempel + 0.08))).astype(np.float32)

    dijk = cv2.morphologyEx(dijk, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    # Gaten in de romp (randlicht is niet donker) dichten: alles wat vanaf de
    # bovenrand van het venster niet bereikbaar is, hoort bij het silhouet.
    venster2 = np.broadcast_to(venster, (h, w))
    vrij = ((dijk < 0.5) & venster2).astype(np.uint8)
    n, labels = cv2.connectedComponents(vrij, connectivity=4)
    eerste_rij = int(np.argmax(venster2.any(axis=1)))
    bovenrand = np.unique(labels[eerste_rij, :])
    bereikbaar = np.isin(labels, bovenrand)
    dijk[(vrij > 0) & ~bereikbaar] = 1.0
    dijk_alfa = np.clip(blur(dijk, 2) * 1.6, 0, 1)
    # De spiegeling blijft in het water (de verre plaat): een uitgesneden
    # spiegeling sluit nooit precies aan op de echte en wordt hakkelig.
    # Wel neemt de dijk een strook water onder zich mee, uitlopend naar
    # doorzichtig: als hij bij het scrollen iets omhoog schuift, zit er dan
    # geen harde rand tussen dijkvoet en water maar een zachte overgang in
    # dezelfde tinten.
    y0, y1 = a.horizon + 0.012, a.horizon + 0.075
    strook = np.clip((y1 - yy) / (y1 - y0), 0, 1) * ((yy > y0 - 0.005) & (yy < y1))
    dijk_alfa = np.maximum(dijk_alfa, np.broadcast_to(strook, (h, w)).astype(np.float32))
    # dichtgevuld onder het silhouet tot iets onder de horizon (grondcontact)
    onder = (yy > a.horizon - 0.02) & (yy <= a.horizon + 0.03)
    kolom_heeft = (dijk_alfa > 0.5).any(axis=0)[None, :]
    dijk_alfa = np.maximum(dijk_alfa, (onder & kolom_heeft).astype(np.float32) * blur((onder & kolom_heeft).astype(np.float32), 3))

    # --- riet (nabij) en oever (vooraan) uit de diepte, alleen onder de horizon
    onder_horizon = yy > a.horizon + 0.02
    riet = ((d >= a.riet_diepte) & onder_horizon & donker).astype(np.float32)
    voor = ((d >= a.voor_diepte) & onder_horizon & donker).astype(np.float32)
    riet = cv2.morphologyEx(riet, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
    voor = cv2.morphologyEx(voor, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
    # De verre plaat is een volledig beeld, dus onder het riet hoeft niets
    # dichtgevuld: wat tussen de stengels zichtbaar is, is echt het water erachter.
    riet_alfa = np.clip(blur(riet, 2) * 1.4, 0, 1)
    voor_alfa = np.clip(blur(voor, 2) * 1.4, 0, 1)

    # --- verre plaat: alles, bijgevuld waar dijk en riet stonden. Het gat wordt
    # eerst verbreed (randlicht en zachte randen mee), anders blijft een schim
    # van de molen staan die bij het schuiven dubbel wordt.
    gat = np.maximum(np.maximum(dijk_alfa, riet_alfa), voor_alfa)
    gat = cv2.dilate((gat > 0.25).astype(np.uint8), np.ones((17, 17), np.uint8)).astype(np.float32)
    ver = vul_horizontaal(rgb, gat)
    # riet-laag zelf bijgevuld waar de oever ervoor staat (anders gat bij verschuiven)
    riet_rgb = vul_horizontaal(rgb, cv2.dilate((voor_alfa > 0.25).astype(np.uint8), np.ones((9, 9), np.uint8)).astype(np.float32), 4)

    Image.fromarray(ver).save(os.path.join(a.uit, "ver.webp"), quality=84, method=6)
    bewaar(os.path.join(a.uit, "dijk.webp"), rgb, dijk_alfa)
    bewaar(os.path.join(a.uit, "riet.webp"), riet_rgb, riet_alfa)
    bewaar(os.path.join(a.uit, "voor.webp"), rgb, voor_alfa)

    def contrast(alfa):
        sel = alfa > 0.5
        return float((lum * 255)[sel].std()) if sel.any() else 0.0

    stats = {
        "ver": {"contrast_std": float((lum * 255)[yy[:, 0] < a.horizon - 0.06].std())},
        "dijk": {"aandeel": float((dijk_alfa > 0.5).mean()), "contrast_std": contrast(dijk_alfa)},
        "riet": {"aandeel": float((riet_alfa > 0.5).mean()), "contrast_std": contrast(riet_alfa)},
        "voor": {"aandeel": float((voor_alfa > 0.5).mean()), "contrast_std": contrast(voor_alfa)},
        "horizon": a.horizon,
    }
    with open(os.path.join(a.uit, "stats.json"), "w") as f:
        json.dump(stats, f, indent=2)
    print(json.dumps(stats, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
