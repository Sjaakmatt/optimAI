"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getCalApi } from "./calLoader";
import { trackEvent } from "@/lib/analytics/gtag";
import { verbergZwevendeKnoppen } from "@/lib/site-agent/pad-naar-playbook";

let bookingListenerAttached = false;

/**
 * Laadt de Cal-embed alvast en registreert het booking-event voor analytics.
 *
 * Rendert zelf niets meer. De zwevende "Plan gesprek"-knop linksonder is eruit:
 * twee zwevende knoppen in beeld lieten de bezoeker kiezen tussen praten en
 * plannen, terwijl de agent dat gesprek juist moet voeren en zelf een afspraak
 * of terugbelverzoek voorstelt. Eén ingang converteert beter dan twee die om
 * dezelfde aandacht vragen.
 *
 * De embed vooraf laden blijft wél nodig: de agent opent de Cal-popup via
 * `boekAfspraak`, en zonder dit staat de bezoeker naar een laadscherm te kijken
 * op het moment dat hij net ja heeft gezegd. De inline Cal-knoppen elders op de
 * site (o.a. /plan) leunen er ook op.
 */
export function CalProvider() {
  const pathname = usePathname();
  // Gedeeld met de site-agent, zodat de twee zwevende knoppen niet op
  // verschillende pagina's los van elkaar opduiken.
  const hideFloating = verbergZwevendeKnoppen(pathname);

  useEffect(() => {
    if (hideFloating) return;
    getCalApi()
      .then((ns) => {
        // Eén keer een booking-event registreren voor analytics (no-op zonder
        // toestemming; trackEvent guardt op window.gtag).
        if (bookingListenerAttached) return;
        bookingListenerAttached = true;
        ns("on", {
          action: "bookingSuccessful",
          callback: () => trackEvent("book_intro", { source: "floating" }),
        });
      })
      .catch((err) => {
        console.warn("[cal] embed init failed:", err);
      });
  }, [hideFloating]);

  useEffect(() => {
    if (hideFloating) return;
    // Intercept before Next Link navigates: otherwise /plan opens a second modal.
    const openFromLink = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-cal-link]")
          : null;
      const calLink = target?.dataset.calLink;
      if (!calLink) return;
      event.preventDefault();
      event.stopPropagation();
      getCalApi()
        .then((ns) =>
          ns("modal", {
            calLink,
            config: { layout: "month_view", theme: "dark" },
          }),
        )
        .catch(() => {
          window.location.assign("/plan");
        });
    };
    document.addEventListener("click", openFromLink, true);
    return () => document.removeEventListener("click", openFromLink, true);
  }, [hideFloating]);

  return null;
}
