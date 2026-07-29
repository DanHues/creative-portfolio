import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotoSetViewer } from "@/components/photo-set-viewer";
import { SiteHeader } from "@/components/site-header";
import { SubpageControls } from "@/components/subpage-controls";
import { formatDate, getPhotography, getPhotoStory } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPhotography().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = getPhotoStory(slug);
  if (!album) return {};
  return {
    title: `${album.title} — Photography by Daniel Hughes`,
    description: album.description,
  };
}

export default async function PhotographyStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = getPhotoStory(slug);
  if (!album) notFound();

  const basePath = process.env.PAGES_BASE_PATH || "";
  const photos = album.images?.length
    ? album.images
    : album.image
      ? [{ image: album.image, alt: album.alt, caption: "" }]
      : [];
  const displayedDate = album.date ? formatDate(album.date) : album.year;
  const heroPhotos = photos.slice(0, 6);

  return (
    <main className="photography-story-page">
      <SiteHeader />
      <SubpageControls backHref="/photography" backLabel="Back to Photography" />

      <article className="photo-story">
        <header className="photo-story-head">
          <div className="photo-story-hero-slideshow" aria-hidden="true">
            {heroPhotos.map((photo, index) => (
              <img
                className="photo-story-hero-slide"
                src={`${basePath}${photo.image}`}
                alt=""
                key={photo.image}
                style={{
                  animationDelay: `${index * 6}s`,
                  animationDuration: `${Math.max(heroPhotos.length, 1) * 6}s`,
                }}
              />
            ))}
          </div>
          <p className="eyebrow">Photography archive</p>
          <h1>{album.title}</h1>

          <dl className="photo-story-facts">
            <div>
              <dt>Date</dt>
              <dd>{displayedDate}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{album.location}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{album.category}</dd>
            </div>
          </dl>

          <div className="photo-story-actions">
            <a
              className="photo-story-primary"
              href={`mailto:danielhughesps@gmail.com?subject=${encodeURIComponent(`Photography inquiry: ${album.title}`)}`}
            >
              Request more information
            </a>
            <a
              href={album.instagram || "https://www.instagram.com/hues.dan/"}
              target="_blank"
              rel="noreferrer"
            >
              View on Instagram
            </a>
          </div>
        </header>

        <section className="photo-story-note" aria-labelledby="photo-story-note-title">
          <h2 id="photo-story-note-title">The story behind the photographs</h2>
          <p>{album.story || album.description}</p>
        </section>

        <section className="photo-story-gallery" aria-label={`${album.title} photographs`}>
          <PhotoSetViewer albumTitle={album.title} photos={photos} basePath={basePath} />
        </section>

        <section className="photo-story-contact">
          <p className="eyebrow">Need coverage?</p>
          <h2>What should we remember?</h2>
          <p>Concerts, conventions, events, portraits, and projects that deserve to be remembered properly.</p>
          <a href="mailto:danielhughesps@gmail.com?subject=Photography%20inquiry">
            Request availability
          </a>
        </section>
      </article>
    </main>
  );
}
