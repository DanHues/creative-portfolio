"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";

const visuals = [
  { label: "Worldbuilding", note: "Minecraft · Development", href: "/archive/minecraft-world", style: "world" },
  { label: "Product design", note: "3D design · Printing", href: "/archive/object-no-four", style: "object" },
  { label: "Moving image", note: "Video · Social content", href: "/archive?tag=Video", style: "video" },
  { label: "Photography", note: "Concerts · Conventions", href: "/photography", style: "photo" },
  { label: "Brand systems", note: "Identity · Consulting", href: "/archive?tag=Brand", style: "brand" },
  { label: "Experiences", note: "Digital · Physical", href: "/archive", style: "experience" },
  { label: "Strange ideas", note: "Experiments · Curiosity", href: "/archive", style: "ideas" },
];

export function CyclingVisuals({ basePath }: { basePath: string }) {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => {
        setLeaving(current);
        return (current + 1) % visuals.length;
      });
    }, 2000);

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
                <span>{visual.note} ↗</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
