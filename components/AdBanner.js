"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * AdSense slot ids for the "ad between year sections" placement used by every
 * semester page (Jharkhand Diploma Sem 1–6 and B.Tech Sem 1–4).
 *   index 0 -> slot shown after the newest year container (e.g. below 2025/2026)
 *   index 1 -> slot after the next container (e.g. below 2024/2025)
 *   index 2 -> slot after the third container (e.g. below 2023/2024)
 * The page guard also stops before the last year container, so an ad is never the
 * final element of the papers section. Append more ids here to cover further gaps.
 */
export const YEAR_GAP_AD_SLOTS = ["6247445156", "8194031779", "8948710243"];

const AdBanner = ({ slot, yearGap, format = "auto", layout = "" }) => {
  const resolvedSlot = slot || (typeof yearGap === 'number' ? YEAR_GAP_AD_SLOTS[yearGap] : undefined);
  const insRef = useRef(null);
  const pushed = useRef(false); // ← guard against double-push on remount
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!resolvedSlot || pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}

    const timer = setTimeout(() => {
      if (insRef.current) {
        const status = insRef.current.getAttribute("data-ad-status");
        if (status === "unfilled") setHidden(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [resolvedSlot]);

  if (!resolvedSlot || hidden) return null;

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: 'block', textAlign: layout ? 'center' : undefined }}
      data-ad-client="ca-pub-9939857316410378"
      data-ad-slot={resolvedSlot}
      data-ad-format={format}
      data-ad-layout={layout || undefined}
      data-full-width-responsive={layout ? undefined : "true"}
    />
  );
};

export default AdBanner;
