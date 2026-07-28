"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ScrollHeader({ basePath }: { basePath: string }) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 70);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${compact ? " compact" : ""}${menuOpen ? " menu-open" : ""}`}>
      <Link className="wordmark" href="/" aria-label="DanHues home">
        <Image
          src={`${basePath}/danhuestext.png`}
          alt="DanHues"
          width={1280}
          height={360}
          priority
        />
      </Link>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <button
        className="nav-backdrop"
        type="button"
        aria-label="Close navigation"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
      <nav id="site-navigation" aria-label="Main navigation">
        <span className="mobile-nav-label">Explore the work</span>
        <Link href="/archive" onClick={closeMenu}>Projects</Link>
        <Link href="/journal" onClick={closeMenu}>Journal</Link>
        <Link href="/photography" onClick={closeMenu}>Photography</Link>
        <Link href="/#about" onClick={closeMenu}>About</Link>
        <a className="mobile-nav-contact" href="mailto:hello@example.com" onClick={closeMenu}>
          Start a conversation
        </a>
      </nav>
      <a className="availability" href="mailto:hello@example.com">
        <i /> Available for select projects
      </a>
    </header>
  );
}
