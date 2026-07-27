import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getPosts, getProjects } from "@/lib/content";

const disciplines = [
  { label: "Photography", href: "/photography?tag=All" },
  { label: "Minecraft worlds", href: "/archive?tag=Minecraft" },
  { label: "Video & social", href: "/archive?tag=Video" },
  { label: "Brand consulting", href: "/archive?tag=Brand" },
  { label: "Videography", href: "/archive?tag=Videography" },
  { label: "Development", href: "/archive?tag=Development" },
  { label: "3D design", href: "/archive?tag=3D" },
  { label: "3D printing", href: "/archive?tag=3D" },
];

export default function Home() {
  const featured = getProjects().filter((project) => project.featured).slice(0, 3);
  const latestPost = getPosts()[0];
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">DanHues · Multidisciplinary creative</p>
          <h1>
            I make <em>things</em>
            <br />
            across <span>worlds</span>
            <br />
            worth <strong>remembering.</strong>
          </h1>
          <p className="hero-summary">
            I work across physical and digital space—bringing the same curiosity
            to a photograph, a server, a brand, a film, or an object.
          </p>
        </div>

        <figure className="brand-poster">
          <Image
            src={`${basePath}/danhues-banner.png`}
            alt="DanHues hand-lettered logo surrounded by layered pink and purple forms"
            width={854}
            height={480}
            priority
          />
          <figcaption>
            <span>Curiosity in every medium</span>
            <span>Est. forever learning</span>
          </figcaption>
        </figure>

        <a className="round-link" href="#featured" aria-label="See selected work">
          ↓
        </a>
      </section>

      <section className="ticker" aria-label="Creative disciplines">
        <div className="ticker-track">
          {[...disciplines, ...disciplines].map((item, index) => (
            <Link href={item.href} key={`${item.label}-${index}`}>
              {item.label} <span>✦</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured section-shell" id="featured">
        <div className="section-heading">
          <p>Selected work</p>
          <p>Best of the archive · 2022—Now</p>
        </div>
        {featured.map((project, index) => (
          <article className="project" key={project.slug}>
            <div className={`project-polaroid polaroid-${index + 1}`}>
              <div className={`project-visual ${project.accent}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="visual-mark" />
              </div>
              <div className="polaroid-caption">
                <span>DanHues archive</span>
                <span>{project.year}</span>
              </div>
            </div>
            <div className={`project-copy project-box project-box-${index + 1}`}>
              <div className="project-tags">
                {project.category.split(" · ").map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <Link className="explore-project" href={`/archive/${project.slug}`}>
                <span>
                  Explore this project
                  <small>See the story, process &amp; details</small>
                </span>
                <i>↗</i>
              </Link>
            </div>
          </article>
        ))}
        <div className="archive-callout">
          <p>Every experiment deserves a place to live.</p>
          <Link href="/archive">
            Explore the full archive <span>↗</span>
          </Link>
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
          <div className="essay-art">
            <span>∞</span>
          </div>
          <div>
            <p className="project-meta">Latest note · {latestPost.readTime} read</p>
            <h2>{latestPost.title}</h2>
            <p>{latestPost.summary}</p>
          </div>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
