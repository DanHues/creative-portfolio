"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

export function ProjectHero({ basePath }: { basePath: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const introStyle = {
    "--archive-art": `url("${basePath}/danhues-banner.png")`,
  } as CSSProperties;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frameId = 0;
    let visible = true;

    const update = () => {
      frameId = 0;
      if (!visible || reducedMotion.matches) {
        hero.style.setProperty("--project-parallax", "0px");
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const progress =
        (window.innerHeight - bounds.top) /
          (window.innerHeight + bounds.height) -
        0.5;
      const shift = Math.max(-42, Math.min(42, progress * 84));
      hero.style.setProperty("--project-parallax", `${shift.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      requestUpdate();
    });

    observer.observe(hero);
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
    <section
      className="page-intro project-intro"
      ref={heroRef}
      style={introStyle}
    >
      <div className="project-hero-backdrop" aria-hidden="true">
        <div className="project-parallax-art" />
      </div>
      <div className="project-intro-copy">
        <p className="eyebrow">The work, collected</p>
        <h1>Projects</h1>
      </div>
    </section>
  );
}
