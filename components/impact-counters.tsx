"use client";

import { useEffect, useRef, useState } from "react";

const counters = [
  { target: 1, label: "million+ unique Minecraft joins" },
  { target: 100, label: "million+ social engagements" },
  { target: 10, label: "million+ likes generated" },
  { target: 1, label: "million+ product downloads" },
];

export function ImpactCounters() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hasPlayed.current = true;
      setProgress(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasPlayed.current) return;
        hasPlayed.current = true;
        const startedAt = performance.now();
        const duration = 1500;

        const tick = (now: number) => {
          const elapsed = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 3);
          setProgress(eased);
          if (elapsed < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="throughline-signals"
      aria-label="A snapshot of DanHues' creative impact"
      ref={rootRef}
    >
      {counters.map((counter) => {
        const value =
          progress === 1
            ? String(counter.target)
            : counter.target === 1
              ? (counter.target * progress).toFixed(1)
              : String(Math.round(counter.target * progress));

        return (
          <div key={counter.label}>
            <strong>{value}M+</strong>
            <span>{counter.label.replace("million+ ", "")}</span>
          </div>
        );
      })}
    </div>
  );
}
