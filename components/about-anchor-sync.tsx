"use client";

import { useEffect } from "react";

export function AboutAnchorSync() {
  useEffect(() => {
    if (window.location.hash !== "#about") return;

    const alignAbout = () => {
      document.getElementById("about")?.scrollIntoView({
        block: "start",
        behavior: "auto",
      });
    };

    const frame = window.requestAnimationFrame(alignAbout);
    const shortCheck = window.setTimeout(alignAbout, 180);
    const layoutCheck = window.setTimeout(alignAbout, 700);
    window.addEventListener("load", alignAbout);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(shortCheck);
      window.clearTimeout(layoutCheck);
      window.removeEventListener("load", alignAbout);
    };
  }, []);

  return null;
}
