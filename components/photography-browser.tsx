"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PhotoStory } from "@/lib/content";

function resolveImage(path: string, basePath: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}

function PhotoAlbum({
  album,
  index,
  basePath,
}: {
  album: PhotoStory;
  index: number;
  basePath: string;
}) {
  const photos = album.images?.length
    ? album.images
    : album.image
      ? [{ image: album.image, alt: album.alt, caption: "" }]
      : [];
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const lightboxTouchStart = useRef<number | null>(null);
  const current = photos[active];

  function move(direction: number) {
    if (photos.length < 2) return;
    setActive((position) => (position + direction + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, photos.length]);

  const lightbox = lightboxOpen && current
    ? createPortal(
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${album.title} slideshow`}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="photo-lightbox-stage"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              lightboxTouchStart.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (lightboxTouchStart.current === null) return;
              const distance = (event.changedTouches[0]?.clientX ?? lightboxTouchStart.current)
                - lightboxTouchStart.current;
              if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
              lightboxTouchStart.current = null;
            }}
          >
            <button
              className="photo-lightbox-close"
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close slideshow"
              autoFocus
            >
              <i aria-hidden="true" />
            </button>
            <img
              src={resolveImage(current.image, basePath)}
              alt={current.alt || album.alt}
              key={`lightbox-${album.slug}-${active}`}
            />
            {photos.length > 1 ? (
              <>
                <button
                  className="photo-lightbox-arrow previous"
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={`Previous photo in ${album.title}`}
                >
                  <i aria-hidden="true" />
                </button>
                <button
                  className="photo-lightbox-arrow next"
                  type="button"
                  onClick={() => move(1)}
                  aria-label={`Next photo in ${album.title}`}
                >
                  <i aria-hidden="true" />
                </button>
              </>
            ) : null}
            <div className="photo-lightbox-footer">
              <span>{String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
              <p>{current.caption || album.title}</p>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <article className="photo-album">
        <div
          className="photo-album-gallery"
          onTouchStart={(event) => {
            touchStart.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
            if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          {current ? (
            <button
              className="photo-album-open"
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Open ${album.title} photo ${active + 1} in full-screen slideshow`}
            >
              <img
                src={resolveImage(current.image, basePath)}
                alt={current.alt || album.alt}
                key={`${album.slug}-${active}`}
              />
              <span>View full photo</span>
            </button>
          ) : (
            <div className="photo-album-placeholder">
              <span>Album awaiting photographs</span>
            </div>
          )}
          <div className="photo-album-number">
            {String(index + 1).padStart(2, "0")}
          </div>
          {photos.length > 1 ? (
            <div className="photo-album-controls">
              <button type="button" onClick={() => move(-1)} aria-label={`Previous photo in ${album.title}`}>
                <i aria-hidden="true" />
              </button>
              <span>{String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => move(1)} aria-label={`Next photo in ${album.title}`}>
                <i aria-hidden="true" />
              </button>
            </div>
          ) : (
            <span className="photo-album-count">{photos.length ? "01 / 01" : "00 / 00"}</span>
          )}
          {current?.caption ? <p className="photo-album-caption">{current.caption}</p> : null}
        </div>

        <div className="photo-album-copy">
          <p className="photo-album-meta">
            {album.category} &middot; {album.location} &middot; {album.year}
          </p>
          <h2>{album.title}</h2>
          <p>{album.description || "A photography album from the archive."}</p>
          <div className="photo-album-footer">
            <span>{photos.length} {photos.length === 1 ? "photograph" : "photographs"}</span>
            <div className="photo-album-actions">
              <Link href={`/photography/${album.slug}`}>
                Open the photoshoot <i aria-hidden="true" />
              </Link>
              <a
                href={album.instagram || "https://www.instagram.com/hues.dan/"}
                target="_blank"
                rel="noreferrer"
              >
                View on Instagram
              </a>
            </div>
          </div>
        </div>
      </article>
      {lightbox}
    </>
  );
}

export function PhotographyBrowser({
  photographs,
  basePath,
}: {
  photographs: PhotoStory[];
  basePath: string;
}) {
  const searchParams = useSearchParams();
  const categories = ["All", ...Array.from(new Set(photographs.map((photo) => photo.category)))];
  const active = searchParams.get("category") || "All";
  const filtered = active === "All"
    ? photographs
    : photographs.filter((photo) => photo.category.toLowerCase() === active.toLowerCase());

  return (
    <section className="photo-catalogue" aria-label="Photography portfolio">
      <header className="photo-catalogue-heading">
        <div className="photo-category-filters" aria-label="Filter photography albums">
          {categories.map((category) => (
            <Link
              className={active === category ? "active" : ""}
              href={category === "All" ? "/photography" : `/photography?category=${encodeURIComponent(category)}`}
              key={category}
            >
              {category}
            </Link>
          ))}
        </div>
      </header>

      <div className="photo-album-list">
        {filtered.map((album, index) => (
          <PhotoAlbum album={album} basePath={basePath} index={index} key={album.slug} />
        ))}
        {filtered.length === 0 ? (
          <div className="empty-filter photo-empty">
            <p>This shelf is waiting for its first album.</p>
            <Link href="/photography">See every album</Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
