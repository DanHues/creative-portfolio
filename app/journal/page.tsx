import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { formatDate, getPosts } from "@/lib/content";

export default function Journal() {
  const notes = getPosts();
  const basePath = process.env.PAGES_BASE_PATH || "";

  return (
    <main className="journal-home">
      <SiteHeader />
      <section className="page-intro journal-intro">
        <div className="journal-intro-card">
          <span className="journal-card-index">XVII &middot; The inner room</span>
          <div className="journal-masthead">
            <Image
              className="journal-masthead-avatar"
              src={`${basePath}/dan-about.svg`}
              alt="Daniel Hughes"
              width={220}
              height={240}
              priority
            />
            <div className="journal-masthead-copy">
              <h1>Journal</h1>
              <p>
                Thoughts on creativity, technology, attention, life, and
                whatever else keeps tapping me on the shoulder.
              </p>
            </div>
            <nav className="journal-masthead-socials" aria-label="Find Daniel elsewhere">
              <a
                href="https://www.tiktok.com/@danhues"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.2 3v11.1a3.8 3.8 0 1 1-3.3-3.8" />
                  <path d="M13.2 3c.5 3.1 2.4 4.8 5.3 5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@imdanhues"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="12" rx="4" />
                  <path d="m10 9 5 3-5 3Z" className="social-icon-fill" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/imdanhues/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.2" cy="6.9" r=".8" className="social-icon-fill" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </section>
      <section className="journal-list">
        <div className="journal-list-heading">
          <p>Latest entries</p>
          <span>A journal of my perspective</span>
        </div>
        {notes.map((post, index) => (
          <Link href={`/journal/${post.slug}`} className="note" key={post.slug}>
            <p>
              Note {String(index + 1).padStart(3, "0")} &middot;{" "}
              {formatDate(post.date)}
            </p>
            <h2>{post.title}</h2>
            <p className="note-summary">{post.summary}</p>
            <span>{post.readTime}</span>
          </Link>
        ))}
      </section>
      <SiteFooter journal />
    </main>
  );
}
