"use client";

import { useRef } from "react";
import { PolderMotion } from "./PolderMotion";
import Link from "next/link";
import {
  useReducedMotion,
  useSpring,
  useInView,
  useScroll,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Check, Mail } from "lucide-react";
import { calPopupAttrs } from "@/components/booking/config";

/** Only landscape details respond to scroll; copy stays in normal flow. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const visible = useInView(ref);

  return (
    <section
      ref={ref}
      className="horizon-hero"
      data-moving={visible && !reduced}
      aria-labelledby="hero-heading"
    >
      <div className="horizon-depth" aria-hidden="true">
        <PolderMotion progress={progress} reduced={!!reduced} />
      </div>
      <div className="horizon-sky" aria-hidden="true" />
      <div className="horizon-aura" aria-hidden="true" />
      <div className="horizon-content band">
        <p className="horizon-eyebrow">
          <span /> AI-systemen voor MKB. Ontwikkeld met West-Fries karakter.
        </p>
        <h1 id="hero-heading">
          Meer ruimte voor
          <br />
          <em>het echte werk.</em>
        </h1>
        <p className="horizon-description">
          Een digitale collega die ondersteunt, werk voorbereidt en acties
          klaarzet. Altijd met de menselijke controle.
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
      <div className="horizon-note">
        <div className="horizon-note-icon">
          <Mail size={19} />
        </div>
        <div>
          <span>Terwijl u verder werkt</span>
          <strong>Voorstel staat klaar.</strong>
          <small>
            <Check size={12} /> Wacht op uw akkoord
          </small>
        </div>
        <span className="horizon-note-dot" aria-hidden="true" />
      </div>
      <div className="horizon-caption">
        <span>Menselijke aandacht. Digitale slagkracht.</span>
        <a href="#in-de-praktijk" aria-label="Scroll naar de praktijk">
          Scroll om te ontdekken <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
