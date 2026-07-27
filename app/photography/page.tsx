import { Suspense } from "react";
import { PhotographyBrowser } from "@/components/photography-browser";
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
      <Suspense fallback={<section className="photo-grid" />}>
        <PhotographyBrowser photographs={photographs} basePath={basePath} />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
