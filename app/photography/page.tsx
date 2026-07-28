import Image from "next/image";
import { Suspense } from "react";
import { PhotographyBrowser } from "@/components/photography-browser";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getPhotography } from "@/lib/content";

export default function Photography() {
  const photographs = getPhotography();
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <main className="photography-home">
      <SiteHeader />
      <section className="photo-portfolio-hero">
        <div className="photo-hero-art">
          <Image
            src={`${basePath}/photography-hero-daniel.jpg`}
            alt="Daniel Hughes operating a camera beside a concert crowd"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="photo-hero-copy">
          <p className="eyebrow">Daniel Hughes &middot; Behind the lens</p>
          <h1><span>Photography</span></h1>
          <p>
            Concerts, conventions, portraits, products, and the moments between
            them.
          </p>
          <div className="photo-hero-actions">
            <a
              className="photo-email-cta"
              href="mailto:danielhughesps@gmail.com?subject=Photography%20inquiry"
            >
              Email me <i aria-hidden="true" />
            </a>
            <nav aria-label="Photography social links">
              <a
                href="https://www.instagram.com/hues.dan/"
                target="_blank"
                rel="noreferrer"
                aria-label="Photography on Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.2" cy="6.9" r=".8" className="social-icon-fill" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@danhues"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.2 3v11.1a3.8 3.8 0 1 1-3.3-3.8" />
                  <path d="M13.2 3c.5 3.1 2.4 4.8 5.3 5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@imdanhues"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="12" rx="4" />
                  <path d="m10 9 5 3-5 3Z" className="social-icon-fill" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </section>
      <Suspense fallback={<section className="photo-grid" />}>
        <PhotographyBrowser photographs={photographs} basePath={basePath} />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
