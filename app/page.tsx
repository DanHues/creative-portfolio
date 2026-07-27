import Link from "next/link";
import { getPosts, getProjects } from "@/lib/content";

const disciplines = [
  "Photography",
  "Minecraft worlds",
  "Video & social",
  "Brand consulting",
  "Videography",
  "Development",
  "3D design",
  "3D printing",
];

export default function Home() {
  const featured = getProjects().filter((project) => project.featured).slice(0, 3);
  const latestPost = getPosts()[0];
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Home">
          YOUR NAME<span>®</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/archive">Archive</Link>
          <Link href="/journal">Journal</Link>
          <a href="#about">About</a>
        </nav>
        <a className="availability" href="mailto:hello@example.com">
          <i /> Available for select projects
        </a>
      </header>

      <section className="hero">
        <p className="eyebrow">Multidisciplinary creative · Based everywhere</p>
        <h1>
          I make <em>worlds,</em>
          <br />
          images &amp; ideas
          <br />
          worth <span>remembering.</span>
        </h1>
        <div className="hero-foot">
          <p>
            I work across physical and digital space—bringing the same curiosity
            to a photograph, a server, a brand, a film, or an object.
          </p>
          <a className="round-link" href="#featured" aria-label="See selected work">
            ↓
          </a>
        </div>
      </section>

      <section className="ticker" aria-label="Creative disciplines">
        <div>
          {[...disciplines, ...disciplines].map((item, index) => (
            <span key={`${item}-${index}`}>{item} ✦</span>
          ))}
        </div>
      </section>

      <section className="featured section-shell" id="featured">
        <div className="section-heading">
          <p>Selected work</p>
          <p>2022—Now</p>
        </div>
        {featured.map((project, index) => (
          <article className="project" key={project.slug}>
            <div className={`project-visual ${project.accent}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className="visual-mark" />
            </div>
            <div className="project-copy">
              <p className="project-meta">{project.category}</p>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <Link href={`/archive/${project.slug}`}>View project <span>↗</span></Link>
            </div>
          </article>
        ))}
        <div className="archive-callout">
          <p>There’s more where that came from.</p>
          <Link href="/archive">Explore the full archive <span>↗</span></Link>
        </div>
      </section>

      <section className="about" id="about">
        <p className="eyebrow">A practice without borders</p>
        <div>
          <h2>I don’t fit neatly into one box. That’s the point.</h2>
          <div className="about-copy">
            <p>
              My work lives in the overlap: between storytelling and systems,
              aesthetics and utility, internet culture and the real world.
            </p>
            <p>
              I collaborate with people who care deeply about what they make.
              Sometimes that means directing a visual story. Sometimes it means
              building the thing that story lives inside.
            </p>
          </div>
        </div>
      </section>

      <section className="journal-preview section-shell">
        <div className="section-heading">
          <p>From the journal</p>
          <Link href="/journal">Read all thoughts ↗</Link>
        </div>
        <Link className="essay-feature" href={`/journal/${latestPost.slug}`}>
          <div className="essay-art"><span>∞</span></div>
          <div>
            <p className="project-meta">Latest note · {latestPost.readTime} read</p>
            <h2>{latestPost.title}</h2>
            <p>{latestPost.summary}</p>
          </div>
        </Link>
      </section>

      <footer>
        <p>Have a strange idea?</p>
        <a href="mailto:hello@example.com">Let’s make it real. ↗</a>
        <div>
          <span>© 2026 Your Name</span>
          <span>Instagram · YouTube · TikTok</span>
        </div>
      </footer>
    </main>
  );
}
