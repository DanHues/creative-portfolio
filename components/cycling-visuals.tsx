"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";

const visuals = [
  { label: "Products", note: "3D design · Physical objects", href: "/archive/object-no-four", style: "object" },
  { label: "Worlds", note: "Minecraft · Worldbuilding", href: "/archive/minecraft-world", style: "world" },
  { label: "Marketing", note: "Marketing · Social Media Marketing", href: "/archive?tag=Marketing", style: "brand" },
  { label: "Experiences", note: "Digital · Physical", href: "/archive", style: "experience" },
  { label: "Videos", note: "Video Editing · Social Media Marketing", href: "/archive?tag=Video%20Editing", style: "video" },
  { label: "Stories", note: "Ideas · Narrative", href: "/journal", style: "ideas" },
  { label: "Games", note: "Game Development · Community", href: "/archive?tag=Game%20Development", style: "world" },
  { label: "Photography", note: "Concerts · Conventions", href: "/photography", style: "photo" },
  { label: "Strange ideas", note: "Experiments · Curiosity", href: "/archive", style: "ideas" },
  { label: "Events", note: "Culture · Live moments", href: "/photography", style: "photo" },
  { label: "Development", note: "Game Development · Systems", href: "/archive?tag=Game%20Development", style: "experience" },
  { label: "Servers", note: "Server Infrastructure · Communities", href: "/archive?tag=Server%20Infrastructure", style: "world" },
  { label: "Brands", note: "Brand Consulting · Identity", href: "/archive?tag=Brand%20Consulting", style: "brand" },
];

export function CyclingVisuals({ basePath }: { basePath: string }) {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [firefoxMode, setFirefoxMode] = useState(false);

  useEffect(() => {
    if (navigator.userAgent.includes("Firefox")) {
      setFirefoxMode(true);
    }
    const delay = navigator.userAgent.includes("Firefox") ? 2400 : 2000;
    const interval = window.setInterval(() => {
      if (
        document.hidden ||
        document.documentElement.classList.contains("is-scrolling")
      ) {
        return;
      }
      setActive((current) => {
        setLeaving(current);
        return (current + 1) % visuals.length;
      });
    }, delay);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (leaving === null) return;
    const timeout = window.setTimeout(() => setLeaving(null), 680);
    return () => window.clearTimeout(timeout);
  }, [leaving]);

  return (
    <div className="cycling-visuals" aria-label="A shuffling deck of featured disciplines">
      <div className="cycling-visual-deck">
        {visuals.map((visual, index) => {
          const offset = (index - active + visuals.length) % visuals.length;
          if (firefoxMode && offset > 0 && index !== leaving) return null;
          if (offset > 4 && index !== leaving) return null;
          const style = {
            "--deck-offset": Math.min(offset, 4),
            "--deck-z": visuals.length - offset,
          } as CSSProperties;

          return (
            <Link
              className={`cycling-visual-card${index === active ? " is-active" : ""}${index === leaving ? " is-leaving" : ""}`}
              href={visual.href}
              key={visual.label}
              style={style}
              aria-hidden={offset > 2}
              tabIndex={offset === 0 ? 0 : -1}
            >
              <div className={`cycling-art cycling-art-${visual.style}`}>
                {visual.style === "brand" || visual.style === "ideas" ? (
                  <Image
                    src={`${basePath}/danhues-banner.png`}
                    alt=""
                    width={854}
                    height={480}
                    priority={index === 4}
                  />
                ) : (
                  <>
                    <i />
                    <i />
                    <i />
                  </>
                )}
              </div>
              <div className="cycling-visual-caption">
                <strong>{visual.label}</strong>
                <span>{visual.note}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
