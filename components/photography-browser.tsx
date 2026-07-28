"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { PhotoStory } from "@/lib/content";
import { CREATIVE_TAGS } from "@/lib/tags";
import { TagList } from "@/components/tag-list";

const filters = ["All", ...CREATIVE_TAGS];

export function PhotographyBrowser({
  photographs,
  basePath,
}: {
  photographs: PhotoStory[];
  basePath: string;
}) {
  const searchParams = useSearchParams();
  const active = searchParams.get("tag") || "All";
  const filtered = active === "All"
    ? photographs
    : photographs.filter((photo) =>
        photo.tags.some((tag) => tag.toLowerCase() === active.toLowerCase()),
      );

  return (
    <>
      <div className="filters photo-filters" aria-label="Filter photography">
        {filters.map((filter) => (
          <Link
            className={active === filter ? "active" : ""}
            href={filter === "All" ? "/photography" : `/photography?tag=${encodeURIComponent(filter)}`}
            key={filter}
          >
            {filter}
          </Link>
        ))}
      </div>
      <section className="photo-grid" aria-label="Photography archive">
        {filtered.map((photo) => (
          <figure className="photo-card" key={photo.slug}>
            <div className="photo-frame">
              {photo.image ? (
                <img
                  src={photo.image.startsWith("/") ? `${basePath}${photo.image}` : photo.image}
                  alt={photo.alt}
                />
              ) : null}
            </div>
            <figcaption>
              <div>
                <h2>{photo.title}</h2>
                <TagList tags={photo.tags} className="photo-card-tags" />
              </div>
              <p>{photo.location} · {photo.year}</p>
            </figcaption>
          </figure>
        ))}
        {filtered.length === 0 ? (
          <div className="empty-filter photo-empty">
            <p>This photography shelf is ready for its first frame.</p>
            <Link href="/photography">See all photography</Link>
          </div>
        ) : null}
      </section>
    </>
  );
}
