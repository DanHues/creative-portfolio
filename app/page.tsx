import Link from "next/link";
import { AboutPortrait } from "@/components/about-portrait";
import { CyclingWords } from "@/components/cycling-words";
import { DiscordButton } from "@/components/discord-button";
import { SocialIcon } from "@/components/social-icon";
import { DraggableMarquee } from "@/components/draggable-marquee";
import { ImpactCounters } from "@/components/impact-counters";
import { JournalReveal } from "@/components/journal-reveal";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { TagList } from "@/components/tag-list";
import { getPosts, getProjects } from "@/lib/content";
import { CREATIVE_TAGS } from "@/lib/tags";

const disciplines = CREATIVE_TAGS.map((label) => ({
  label,
  href: `/archive?tag=${encodeURIComponent(label)}`,
}));

const clients = [
  { name: "Adin Ross", href: "/archive?tag=Video%20Editing" },
  { name: "Club Obsidian", href: "/archive?tag=Minecraft%20Servers" },
  { name: "GridCraft", href: "/archive?tag=Minecraft%20Servers" },
  { name: "High School Esports League", href: "/archive?tag=Game%20Development" },
  { name: "PlayVS", href: "/archive?tag=Game%20Development" },
  { name: "Sueco", href: "/archive?tag=Minecraft%20Servers" },
  { name: "TikTok", href: "/archive?tag=Social%20Media%20Marketing" },
  { name: "Jamie Levine Photography", href: "/photography" },
  { name: "SkyCastleToys", href: "/archive/object-no-four" },
  { name: "Dream", href: "/archive/minecraft-world" },
  { name: "EmpoweredProsthetics", href: "/archive/object-no-four" },
  { name: "Rising Phoenix Forums", href: "/archive?tag=Server%20Infrastructure" },
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
          <p className="eyebrow">
            Hi, I’m Daniel Hughes and I make
          </p>
          <h1 className="cycling-headline">
            <span className="making-line">
              <CyclingWords />
            </span>
            <strong>
              worth <mark>remembering.</mark>
            </strong>
          </h1>
          <p className="hero-summary">
            Whether it&apos;s physical or digital, I bring ideas to life
            through creative action.
          </p>
        </div>

      </section>

      <div className="ticker-region">
        <p className="ticker-title">Things I do</p>
        <div className="ticker-stack">
          <i className="ticker-block ticker-block-one" />
          <i className="ticker-block ticker-block-two" />
          <section className="ticker" aria-label="Creative disciplines">
            <DraggableMarquee speed={43} trackClassName="ticker-track">
              {[...disciplines, ...disciplines].map((item, index) => (
                <Link href={item.href} key={`${item.label}-${index}`}>
                  {item.label} <span>✦</span>
                </Link>
              ))}
            </DraggableMarquee>
          </section>
        </div>
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
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <TagList tags={project.tags} />
              <Link className="explore-project" href={`/archive/${project.slug}`}>
                <span>
                  Explore this project
                  <small>See the story, process &amp; details</small>
                </span>
                <i aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
        <div className="archive-callout">
          <p>Every experiment deserves a place to live.</p>
          <Link href="/archive">
            Explore the full archive <span aria-hidden="true" />
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
        <AboutPortrait basePath={basePath} />
        <div className="about-content">
          <p className="eyebrow">Elsewhere online</p>
          <h2 className="about-social-title">Find me around the internet.</h2>
          <div className="social-dock">
            <p>Choose a platform.</p>
            <div className="social-links">
              <a
                href="https://www.tiktok.com/@danhues"
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon platform="tiktok" />
                <span>
                  TikTok
                  <small>@danhues</small>
                </span>
              </a>
              <a
                href="https://www.youtube.com/@imdanhues"
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon platform="youtube" />
                <span>
                  YouTube
                  <small>@imdanhues</small>
                </span>
              </a>
              <a
                href="https://www.instagram.com/imdanhues/"
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon platform="instagram" />
                <span>
                  Instagram
                  <small>@imdanhues</small>
                </span>
              </a>
              <DiscordButton className="social-discord" compact />
            </div>
          </div>
        </div>
      </section>

      <section className="client-showcase" aria-labelledby="client-showcase-title">
        <h2 id="client-showcase-title">Teams I’ve worked with</h2>
        <div className="client-marquee">
          <DraggableMarquee speed={62} trackClassName="client-track">
            {[...clients, ...clients].map((client, index) => (
              <span className="client-item" key={`${client.name}-${index}`}>
                <Link href={client.href}>{client.name}</Link>
                <i aria-hidden="true">✦</i>
              </span>
            ))}
          </DraggableMarquee>
        </div>
      </section>

      <section className="throughline">
        <div className="throughline-copy">
          <p className="eyebrow">How I got here</p>
          <h2>I started by building worlds.</h2>
          <p>
            At 16, I started a Minecraft server that grew into one of the era’s
            largest independent networks, reaching over a million unique joins.
            It created the foundation for how I work and create today.
          </p>
          <p>
            From there, I built worlds, systems, and products for companies and
            creators, grew my own social media brand, and helped coordinate one
            of TikTok’s earliest creator programs.
          </p>
        </div>
        <div className="numbers-panel">
          <p>Okay, let’s talk numbers.</p>
          <ImpactCounters />
        </div>
      </section>

      <section className="journal-preview section-shell">
        <JournalReveal>
          <div className="journal-heading">
            <div className="journal-tarot">
              <span className="tarot-index">XVII · The inner room</span>
              <i aria-hidden="true">☾</i>
              <h2>Peek into my mind.</h2>
              <p>A journal of my perspective.</p>
              <Link href="/journal">Open the journal</Link>
            </div>
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
                <TagList tags={post.tags} className="journal-card-tags" linked={false} />
                <span className="page-link">Turn the page</span>
              </Link>
            ))}
          </div>
        </JournalReveal>
      </section>

      <SiteFooter />
    </main>
  );
}
