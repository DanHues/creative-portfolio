"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

type ProjectStoryHeroProps = {
  basePath: string;
  category: string;
  summary: string;
  title: string;
};

export function ProjectStoryHero({
  basePath,
  category,
  summary,
  title,
}: ProjectStoryHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const style = {
    "--story-art": `url("${basePath}/danhues-banner.png")`,
  } as CSSProperties;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frameId = 0;

    const update = () => {
      frameId = 0;
      if (reducedMotion.matches) {
        hero.style.setProperty("--story-shift", "0px");
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const progress = Math.max(
        -1,
        Math.min(1, -bounds.top / Math.max(bounds.height, 1)),
      );
      hero.style.setProperty("--story-shift", `${(progress * 110).toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="project-story-hero" ref={heroRef} style={style}>
      <div className="project-story-art" aria-hidden="true" />
      <div className="project-story-title">
        <p>{category}</p>
        <h1>{title}</h1>
        <p className="project-story-summary">{summary}</p>
      </div>
    </div>
  );
}
