import Link from "next/link";
import { CyclingWords } from "@/components/cycling-words";
import { CyclingVisuals } from "@/components/cycling-visuals";
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
  { name: "Adin Ross", href: "/archive?tag=Video" },
  { name: "Club Obsidian", href: "/archive?tag=Minecraft" },
  { name: "TikTok", href: "/archive?tag=Video" },
  { name: "Jamie Levine Photography", href: "/photography" },
  { name: "SkyCastleToys", href: "/archive/object-no-four" },
  { name: "Dream", href: "/archive/minecraft-world" },
  { name: "EmpoweredProsthetics", href: "/archive/object-no-four" },
  { name: "Rising Phoenix Forums", href: "/archive?tag=Development" },
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
            <span className="making-line">
              I make <CyclingWords />
            </span>
            <strong>
              worth <mark>remembering.</mark>
            </strong>
          </h1>
          <p className="hero-summary">
            I work across physical and digital space—bringing the same curiosity
            to a photograph, a server, a brand, a film, or an object.
          </p>
        </div>

        <CyclingVisuals basePath={basePath} />

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
        <div className="about-objects" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="about-portrait">
          <img
            src="https://avatars.githubusercontent.com/u/43981251?v=4"
            alt="Portrait of DanHues"
          />
          <span>DanHues · behind the work</span>
        </div>
        <div className="about-content">
          <p className="eyebrow">Creativity without limit</p>
          <h2>
            I don’t fit neatly into one box.
            <strong>That’s the point.</strong>
          </h2>
          <div className="about-copy">
            <p>
              I’m a multidisciplinary creative working in the overlap between
              storytelling and systems, aesthetics and utility, internet
              culture and the physical world—building the image, object,
              experience, or space a story needs.
            </p>
          </div>
          <div className="collaborators">
            <h3>People, teams &amp; worlds I’ve worked with</h3>
            <div className="client-marquee">
              <div className="client-track">
                {[...clients, ...clients].map((client, index) => (
                  <Link href={client.href} key={`${client.name}-${index}`}>
                    {client.name} <i>✦</i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="throughline">
        <div className="throughline-copy">
          <p className="eyebrow">How I got here</p>
          <h2>I started by building worlds. Then I kept going.</h2>
          <p>
            At 16, I built a Minecraft server that grew into one of the era’s
            largest independent networks—more than 1,000 people online at once
            and over a million unique joins. That first world became a company,
            a community, and the foundation for how I create today.
          </p>
          <p>
            From there I built servers for brands and creators, grew my own
            TikTok audience, edited ads through one of TikTok’s earliest creator
            programs, and kept making physical experiments—including a
            record-setting printable whistle downloaded more than half a
            million times.
          </p>
          <p className="throughline-lens">
            I also photograph live culture for the love of it—more than 20 local
            bands, Mei Semones, John Roseboro, Big Culture Arts Festival, and
            Sunshine Pony Con so far, with Mare Faire next.
          </p>
        </div>
        <div className="throughline-signals" aria-label="A snapshot of DanHues' creative practice">
          <div>
            <strong>1M+</strong>
            <span>unique Minecraft joins</span>
          </div>
          <div>
            <strong>250K+</strong>
            <span>TikTok followers</span>
          </div>
          <div>
            <strong>8M+</strong>
            <span>likes generated</span>
          </div>
          <div>
            <strong>500K+</strong>
            <span>product downloads</span>
          </div>
        </div>
      </section>

      <section className="journal-preview section-shell">
        <div className="section-heading">
          <p>A more personal archive</p>
          <Link href="/journal">Read all thoughts ↗</Link>
        </div>
        <div className="journal-heading">
          <h2>Peek into my mind.</h2>
          <p>
            A quieter, one-on-one space for the things I’m noticing,
            questioning, learning, and trying not to forget.
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
