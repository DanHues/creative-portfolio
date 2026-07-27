import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="DanHues home">
        <Image src="/danhuestext.png" alt="DanHues" width={1280} height={360} priority />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/archive">Projects</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/photography">Photography</Link>
        <Link href="/#about">About</Link>
      </nav>
      <a className="availability" href="mailto:hello@example.com">
        <i /> Available for select projects
      </a>
    </header>
  );
}

export function SiteFooter({ journal = false }: { journal?: boolean }) {
  return (
    <footer>
      <p>{journal ? "Want to keep in touch?" : "Have a strange idea?"}</p>
      <a href="mailto:hello@example.com">
        {journal ? "Say hello." : "Let’s make it real."} ↗
      </a>
      <div>
        <span>© 2026 DanHues</span>
        <span>Photography · Worlds · Film · Design · Code</span>
      </div>
    </footer>
  );
}
