"use client";

import { useEffect, useRef } from "react";
import { useTransform, type MotionValue } from "motion/react";

/** All elements share one photographic coordinate system, including the reflection. */
export function PolderMotion({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const angle = useTransform(progress, [0, 1], [-8, 92]);
  const sails = useRef<SVGGElement>(null);
  const reflection = useRef<SVGGElement>(null);
  const fogFar = useRef<SVGGElement>(null);
  const fogNear = useRef<SVGGElement>(null);
  useEffect(() => {
    const update = (value: number) => {
      const p = reduced ? 0 : value;
      fogFar.current?.setAttribute("transform", `translate(${p * 480} 0)`);
      fogNear.current?.setAttribute("transform", `translate(${p * 760} 0)`);
    };
    update(progress.get());
    return progress.on("change", update);
  }, [progress, reduced]);
  useEffect(() => {
    const update = (value: number) => {
      const transform = `rotate(${reduced ? -8 : value})`;
      sails.current?.setAttribute("transform", transform);
      reflection.current?.setAttribute("transform", transform);
    };
    update(angle.get());
    return angle.on("change", update);
  }, [angle, reduced]);
  return (
    <svg
      className="polder-motion"
      viewBox="0 0 1679 937"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="polder-fog">
          <stop stopColor="#e4d8c9" stopOpacity=".65" />
          <stop offset="1" stopColor="#e4d8c9" stopOpacity="0" />
        </radialGradient>
        <filter id="polder-reflection">
          <feGaussianBlur stdDeviation="1.3 2.5" />
        </filter>
      </defs>
      <image
        href="/polder/molen-zonder-vaste-mist.webp"
        width="1679"
        height="937"
      />
      <g
        transform="translate(493 358) scale(.76 1)"
        style={{ mixBlendMode: "multiply" }}
      >
        <g ref={sails} className="polder-sails" transform="rotate(-8)">
          <Sails />
        </g>
      </g>
      <g
        transform="translate(493 694) scale(.76 -.94)"
        style={{ mixBlendMode: "multiply" }}
        opacity=".46"
        filter="url(#polder-reflection)"
      >
        <g ref={reflection} transform="rotate(-8)">
          <Sails />
        </g>
      </g>
      <g ref={fogFar} className="polder-fog polder-fog-far">
        <ellipse cx="100" cy="579" rx="230" ry="22" fill="url(#polder-fog)" />
        <ellipse cx="405" cy="558" rx="245" ry="25" fill="url(#polder-fog)" />
        <ellipse cx="750" cy="539" rx="200" ry="18" fill="url(#polder-fog)" />
        <ellipse cx="1130" cy="534" rx="380" ry="23" fill="url(#polder-fog)" />
      </g>
      <g ref={fogNear} className="polder-fog polder-fog-near">
        <ellipse cx="670" cy="615" rx="440" ry="40" fill="url(#polder-fog)" />
        <ellipse cx="1510" cy="590" rx="300" ry="30" fill="url(#polder-fog)" />
      </g>
      <g transform="translate(0 937)">
        <g className="polder-reed-photo">
          <svg
            x="0"
            y="-287"
            width="1679"
            height="287"
            viewBox="0 650 1679 287"
            overflow="hidden"
          >
            <image href="/polder/lagen/riet.webp" width="1679" height="937" />
            <image href="/polder/lagen/voor.webp" width="1679" height="937" />
          </svg>
        </g>
      </g>
    </svg>
  );
}

function Sails() {
  return (
    <image
      href="/polder/wieken-fotorealistisch.webp"
      x="-138.4"
      y="-137.5"
      width="280"
      height="280"
    />
  );
}
