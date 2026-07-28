"use client";

import { useEffect, useRef } from "react";

export function AboutPortrait({ basePath }: { basePath: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frameId = 0;
    let visible = false;

    const update = () => {
      frameId = 0;
      if (!visible || reducedMotion.matches) {
        image.style.setProperty("--portrait-shift", "0px");
        return;
      }

      const bounds = frame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const portraitCenter = bounds.top + bounds.height / 2;
      const shift = Math.max(
        -34,
        Math.min(34, (viewportCenter - portraitCenter) * 0.075),
      );

      image.style.setProperty("--portrait-shift", `${shift.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        requestUpdate();
      },
      { rootMargin: "15% 0px" },
    );

    observer.observe(frame);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    requestUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="about-portrait" ref={frameRef}>
      <img
        ref={imageRef}
        src={`${basePath}/dan-about.svg`}
        alt="Portrait of DanHues"
      />
      <span>DanHues · behind the work</span>
    </div>
  );
}
