import Link from "next/link";
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
      <section className="archive-grid">
        <div className="filters">
          {["All work", "Image", "Film", "Worlds", "Brands", "Objects", "Code"].map(
            (filter) => <span key={filter}>{filter}</span>,
          )}
        </div>
        {projects.map((project, index) => (
          <Link
            className="archive-row"
            href={`/archive/${project.slug}`}
            key={project.slug}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{project.title}</h2>
            <p>{project.category}</p>
            <span>{project.year} ↗</span>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
