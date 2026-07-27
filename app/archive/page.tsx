import { Suspense } from "react";
import type { CSSProperties } from "react";
import { ArchiveBrowser } from "@/components/archive-browser";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getProjects } from "@/lib/content";

export default function Archive() {
  const projects = getProjects();
  const basePath = process.env.PAGES_BASE_PATH || "";
  const introStyle = {
    "--archive-art": `url("${basePath}/danhues-banner.png")`,
  } as CSSProperties;

  return (
    <main>
      <SiteHeader />
      <section className="page-intro project-intro" style={introStyle}>
        <div className="project-intro-copy">
          <p className="eyebrow">The work, collected</p>
          <h1>Projects</h1>
        </div>
        <div className="archive-description-bar">
          <p>
            A growing record of experiments, commissions, collaborations,
            obsessions, and things made simply because they needed to exist.
          </p>
        </div>
      </section>
      <Suspense fallback={<section className="archive-grid" />}>
        <ArchiveBrowser projects={projects} />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
