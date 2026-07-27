import { Suspense } from "react";
import { ArchiveBrowser } from "@/components/archive-browser";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getProjects } from "@/lib/content";

export default function Archive() {
  const projects = getProjects();

  return (
    <main>
      <SiteHeader />
      <section className="page-intro">
        <p className="eyebrow">The work, collected</p>
        <h1>Archive</h1>
        <p>
          A growing record of experiments, commissions, collaborations,
          obsessions, and things made simply because they needed to exist.
        </p>
      </section>
      <Suspense fallback={<section className="archive-grid" />}>
        <ArchiveBrowser projects={projects} />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
