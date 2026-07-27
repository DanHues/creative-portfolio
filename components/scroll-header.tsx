"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ScrollHeader({ basePath }: { basePath: string }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 70);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header${compact ? " compact" : ""}`}>
      <Link className="wordmark" href="/" aria-label="DanHues home">
        <Image
          src={`${basePath}/danhuestext.png`}
          alt="DanHues"
          width={1280}
          height={360}
          priority
        />
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
