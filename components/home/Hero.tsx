"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Check, Mail } from "lucide-react";
import { calPopupAttrs } from "@/components/booking/config";

/** One intact landscape keeps the horizon and reflections registered. Only
 * atmospheric overlays move independently; no cut edges can open on scroll. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const landscapeY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const noteY = useTransform(scrollYProgress, [0, 1], [0, -34]);

  return (
    <section ref={ref} className="horizon-hero" aria-labelledby="hero-heading">
      <motion.div
        className="horizon-landscape"
        style={{ y: reduced ? 0 : landscapeY }}
        aria-hidden="true"
      >
        <Image
          src="/polder/lagen/master.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="horizon-sky" aria-hidden="true" />
      <div className="horizon-aura" aria-hidden="true" />
      <div className="horizon-content band">
        <p className="horizon-eyebrow">
          <span /> AI-agents. Nuchter gebouwd in Nederland.
        </p>
        <h1 id="hero-heading">
          Meer ruimte voor
          <br />
          <em>het echte werk.</em>
        </h1>
        <p className="horizon-description">
          Een digitale collega die mails afhandelt, offertes opvolgt en orders
          klaarzet. Op uw manier. Met u aan het stuur.
        </p>
        <div className="horizon-actions">
          <Link href="/plan" {...calPopupAttrs} className="horizon-primary">
            Laten we kennismaken <ArrowUpRight size={18} />
          </Link>
          <Link href="#in-de-praktijk" className="horizon-secondary">
            Bekijk wat we bouwen <ArrowDown size={16} />
          </Link>
        </div>
      </div>
      <motion.div className="horizon-note" style={{ y: reduced ? 0 : noteY }}>
        <div className="horizon-note-icon">
          <Mail size={19} />
        </div>
        <div>
          <span>Terwijl u verder werkt</span>
          <strong>Antwoord staat klaar.</strong>
          <small>
            <Check size={12} /> Wacht op uw akkoord
          </small>
        </div>
        <span className="horizon-note-dot" aria-hidden="true" />
      </motion.div>
      <div className="horizon-caption">
        <span>Menselijke aandacht. Digitale slagkracht.</span>
        <a href="#in-de-praktijk" aria-label="Scroll naar de praktijk">
          Scroll om te ontdekken <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
