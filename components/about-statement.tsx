"use client";

import { useEffect, useRef, useState } from "react";

export function AboutStatement() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [armed, setArmed] = useState(false);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        window.requestAnimationFrame(() => setLanded(true));
        observer.disconnect();
      },
      { threshold: 0.42 },
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <h2
      className={`about-statement${armed ? " is-armed" : ""}${landed ? " is-landed" : ""}`}
      ref={headingRef}
    >
      <span>I don’t fit into one box</span>
      <strong>That’s the point.</strong>
    </h2>
  );
}
