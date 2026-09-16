"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { calPopupAttrs } from "@/components/booking/config";

export function Dageraad() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  return (
    <section
      ref={ref}
      className="closing-horizon"
      aria-labelledby="closing-heading"
    >
      <motion.div
        className="closing-landscape"
        aria-hidden="true"
        style={{ y: reduced ? 0 : y }}
      >
        <Image
          src="/polder/lagen-dageraad/master.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="closing-wash" aria-hidden="true" />
      <div className="band closing-copy">
        <p className="editorial-label">Er is ruimte voor een volgende stap</p>
        <h2 id="closing-heading">
          Vandaag een gesprek.
          <br />
          <em>Morgen meer mogelijk.</em>
        </h2>
        <p>
          Dertig minuten over het werk dat uw mensen onnodig tijd kost. We
          luisteren aandachtig en denken mee. Vrijblijvend en eerlijk.
        </p>
        <div className="horizon-actions">
          <Link href="/plan" {...calPopupAttrs} className="horizon-primary">
            Laten we kennismaken <ArrowUpRight size={18} />
          </Link>
          <Link href="/scan" className="horizon-secondary">
            Eerst zelf verkennen <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <span className="closing-signature">
        Gebouwd met aandacht in West-Friesland.
      </span>
    </section>
  );
}
