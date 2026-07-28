"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PhotoStory } from "@/lib/content";

type Photo = NonNullable<PhotoStory["images"]>[number];

function resolveImage(path: string, basePath: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}

export function PhotoSetViewer({
  albumTitle,
  photos,
  basePath,
}: {
  albumTitle: string;
  photos: Photo[];
  basePath: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const current = active === null ? null : photos[active];

  function move(direction: number) {
    if (active === null || photos.length < 2) return;
    setActive((active + direction + photos.length) % photos.length);
  }

  useEffect(() => {
    if (active === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, photos.length]);

  const lightbox = active !== null && current
    ? createPortal(
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${albumTitle} full photo viewer`}
          onClick={() => setActive(null)}
        >
          <div
            className="photo-lightbox-stage"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStart.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStart.current === null) return;
              const distance = (event.changedTouches[0]?.clientX ?? touchStart.current)
                - touchStart.current;
              if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
              touchStart.current = null;
            }}
          >
            <button
              className="photo-lightbox-close"
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close photo viewer"
              autoFocus
            >
              <i aria-hidden="true" />
            </button>
            <img
              src={resolveImage(current.image, basePath)}
              alt={current.alt}
              key={`${current.image}-${active}`}
            />
            {photos.length > 1 ? (
              <>
                <button
                  className="photo-lightbox-arrow previous"
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={`Previous photo in ${albumTitle}`}
                >
                  <i aria-hidden="true" />
                </button>
                <button
                  className="photo-lightbox-arrow next"
                  type="button"
                  onClick={() => move(1)}
                  aria-label={`Next photo in ${albumTitle}`}
                >
                  <i aria-hidden="true" />
                </button>
              </>
            ) : null}
            <div className="photo-lightbox-footer">
              <span>{String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
              <p>{current.caption || albumTitle}</p>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div className="photo-set-grid">
        {photos.map((photo, index) => (
          <figure className="photo-set-item" key={`${photo.image}-${index}`}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Open photo ${index + 1} of ${photos.length} from ${albumTitle}`}
            >
              <img
                src={resolveImage(photo.image, basePath)}
                alt={photo.alt}
                loading={index < 3 ? "eager" : "lazy"}
              />
              <span>View larger</span>
            </button>
            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
      {lightbox}
    </>
  );
}
