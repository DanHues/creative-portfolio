import Link from "next/link";
import { getProjects } from "@/lib/content";

export default function Archive() {
  const projects = getProjects();
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="/">YOUR NAME<span>®</span></Link>
        <nav><Link href="/archive">Archive</Link><Link href="/journal">Journal</Link><Link href="/#about">About</Link></nav>
        <a className="availability" href="mailto:hello@example.com"><i /> Available for select projects</a>
      </header>
      <section className="page-intro">
        <p className="eyebrow">The work, collected</p>
        <h1>Archive</h1>
        <p>A growing record of experiments, commissions, collaborations, obsessions, and things made simply because they needed to exist.</p>
      </section>
      <section className="archive-grid">
        <div className="filters">
          {["All work", "Image", "Film", "Worlds", "Brands", "Objects", "Code"].map(x => <span key={x}>{x}</span>)}
        </div>
        {projects.map((project, index) => (
          <Link className="archive-row" href={`/archive/${project.slug}`} key={project.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span><h2>{project.title}</h2><p>{project.category}</p><span>{project.year} ↗</span>
          </Link>
        ))}
      </section>
      <footer><p>Have a strange idea?</p><a href="mailto:hello@example.com">Let’s make it real. ↗</a><div><span>© 2026 Your Name</span><span>Instagram · YouTube · TikTok</span></div></footer>
    </main>
  );
}
