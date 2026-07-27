"use client";

import { useEffect, useState } from "react";

const words = [
  "worlds",
  "products",
  "videos",
  "photos",
  "brands",
  "experiences",
  "strange ideas",
];

export function CyclingWords() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => {
        setLeaving(current);
        return (current + 1) % words.length;
      });
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (leaving === null) return;
    const timeout = window.setTimeout(() => setLeaving(null), 650);
    return () => window.clearTimeout(timeout);
  }, [leaving]);

  return (
    <span className="cycling-window" aria-label={words.join(", ")}>
      <span className="cycling-list" aria-hidden="true">
        {words.map((word, index) => (
          <span
            className={`${index === active ? "is-active" : ""}${index === leaving ? " is-leaving" : ""}`}
            key={word}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
