import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getPhotography } from "@/lib/content";

export default function Photography() {
  const photographs = getPhotography();
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <main>
      <SiteHeader />
      <section className="page-intro photo-intro">
        <p className="eyebrow">Concerts · Conventions · People · Products</p>
        <h1>Photography</h1>
        <p>
          The loud rooms, quiet details, fleeting expressions, and carefully
          made things I wanted to hold onto.
        </p>
      </section>
      <section className="photo-grid" aria-label="Photography archive">
        {photographs.map((photo) => (
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
              <h2>{photo.title}</h2>
              <p>
                {photo.category}
                <br />
                {photo.location} · {photo.year}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
