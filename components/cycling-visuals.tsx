"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="cycling-visuals">
      <div className="cycling-visual-list">
        {[...visuals, visuals[0]].map((visual, index) => (
          <Link className="cycling-visual-card" href={visual.href} key={`${visual.label}-${index}`}>
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
        ))}
      </div>
    </div>
  );
}
