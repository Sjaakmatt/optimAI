"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Native document scrolling; the scene only sticks when it fits the viewport. */
export function useScrollSteps(count: number) {
  const track = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const outer = track.current;
    const inner = scene.current;
    if (!outer || !inner) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const measure = () => {
      outer.style.setProperty("--scene-height", `${inner.offsetHeight}px`);
      const top =
        parseFloat(getComputedStyle(inner).getPropertyValue("--story-top")) ||
        0;
      setEnabled(
        !reduced.matches && inner.offsetHeight + top + 24 <= window.innerHeight,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    window.addEventListener("resize", measure);
    reduced.addEventListener("change", measure);
    measure();
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (outer.dataset.scrollEnabled !== "true") return;
        const top =
          parseFloat(getComputedStyle(inner).getPropertyValue("--story-top")) ||
          0;
        const distance = outer.offsetHeight - inner.offsetHeight;
        const progress = Math.max(
          0,
          Math.min(1, (top - outer.getBoundingClientRect().top) / distance),
        );
        setActive(Math.round(progress * (count - 1)));
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
      reduced.removeEventListener("change", measure);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const select = useCallback(
    (index: number) => {
      setActive(index);
      if (!enabled || !track.current || !scene.current) return;
      const top =
        parseFloat(
          getComputedStyle(scene.current).getPropertyValue("--story-top"),
        ) || 0;
      const distance = track.current.offsetHeight - scene.current.offsetHeight;
      window.scrollTo({
        top:
          window.scrollY +
          track.current.getBoundingClientRect().top -
          top +
          (distance * index) / (count - 1),
        behavior: "smooth",
      });
    },
    [count, enabled],
  );

  return { track, scene, active, enabled, select };
}
