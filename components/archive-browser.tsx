"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Project } from "@/lib/content";

const filters = ["All", "Photography", "Minecraft", "Video", "Brand", "Videography", "Development", "3D"];

export function ArchiveBrowser({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const active = searchParams.get("tag") || "All";
  const filtered = active === "All"
    ? projects
    : projects.filter((project) =>
        `${project.category} ${project.title} ${project.summary}`
          .toLowerCase()
          .includes(active.toLowerCase()),
      );

  return (
    <section className="archive-grid">
      <div className="filters" aria-label="Filter projects">
        {filters.map((filter) => (
          <Link
            className={active === filter ? "active" : ""}
            href={filter === "All" ? "/archive" : `/archive?tag=${encodeURIComponent(filter)}`}
            key={filter}
          >
            {filter === "All" ? "All work" : filter}
          </Link>
        ))}
      </div>
      <p className="filter-status">
        Showing <strong>{active === "All" ? "everything" : active}</strong>
      </p>
      {filtered.map((project, index) => (
        <Link className="archive-row" href={`/archive/${project.slug}`} key={project.slug}>
          <div className={`archive-thumb project-visual ${project.accent}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div className="visual-mark" />
          </div>
          <div className="archive-row-copy">
            <h2>{project.title}</h2>
            <div className="archive-row-meta">
              <p>{project.category}</p>
              <span>{project.year}</span>
            </div>
          </div>
        </Link>
      ))}
      {filtered.length === 0 ? (
        <div className="empty-filter">
          <p>That corner of the archive is waiting for its first story.</p>
          <Link href="/archive">See everything instead</Link>
        </div>
      ) : null}
    </section>
  );
}
