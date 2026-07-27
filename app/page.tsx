import Image from "next/image";
import Link from "next/link";
import { CyclingWords } from "@/components/cycling-words";
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

const clients = [
  "Adin Ross",
  "Club Obsidian",
  "TikTok",
  "Jamie Levine Photography",
  "SkyCastleToys",
  "Dream",
  "EmpoweredProsthetics",
  "Rising Phoenix Forums",
];

export default function Home() {
  const featured = getProjects().filter((project) => project.featured).slice(0, 3);
  const journalPages = getPosts().slice(0, 3);
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">DanHues · Multidisciplinary creative</p>
          <h1 className="cycling-headline">
            <span>I make</span>
            <CyclingWords />
            <strong>worth remembering.</strong>
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

      <div className="ticker-stack">
        <i className="ticker-block ticker-block-one" />
        <i className="ticker-block ticker-block-two" />
        <section className="ticker" aria-label="Creative disciplines">
          <div className="ticker-track">
            {[...disciplines, ...disciplines].map((item, index) => (
              <Link href={item.href} key={`${item.label}-${index}`}>
                {item.label} <span>✦</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

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
        <p className="eyebrow">Creativity without limit</p>
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
          <div className="collaborators">
            <p>People, teams &amp; worlds I’ve worked with</p>
            <div className="client-marquee">
              <div className="client-track">
                {[...clients, ...clients].map((client, index) => (
                  <span key={`${client}-${index}`}>
                    {client} <i>✦</i>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="journal-preview section-shell">
        <div className="section-heading">
          <p>Pages from my journal</p>
          <Link href="/journal">Read all thoughts ↗</Link>
        </div>
        <div className="journal-heading">
          <h2>Loose pages from my head.</h2>
          <p>
            Small definitions for the things I’m noticing, questioning,
            learning, and trying not to forget.
          </p>
        </div>
        <div className="journal-pages">
          {journalPages.map((post, index) => (
            <Link
              className={`journal-page journal-page-${index + 1}`}
              href={`/journal/${post.slug}`}
              key={post.slug}
            >
              <div className={`journal-snapshot snapshot-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="project-meta">{post.readTime} read · a personal note</p>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <span className="page-link">Turn the page ↗</span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
