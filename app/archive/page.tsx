import { Suspense } from "react";
import { ArchiveBrowser } from "@/components/archive-browser";
import { ProjectHero } from "@/components/project-hero";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getProjects } from "@/lib/content";

export default function Archive() {
  const projects = getProjects();
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <main>
      <SiteHeader />
      <ProjectHero basePath={basePath} />
      <section className="archive-lead">
        <p>
          A growing record of experiments, commissions, collaborations,
          obsessions, and things made simply because they needed to exist.
        </p>
      </section>
      <Suspense fallback={<section className="archive-grid" />}>
        <ArchiveBrowser basePath={basePath} projects={projects} />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
