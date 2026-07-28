"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      aria-label="Back to top"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      }}
      type="button"
    >
      <i aria-hidden="true" />
      <span>Top</span>
    </button>
  );
}
