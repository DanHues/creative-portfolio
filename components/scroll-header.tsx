"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { DiscordButton } from "@/components/discord-button";

export function ScrollHeader({
  basePath,
  floating = false,
}: {
  basePath: string;
  floating?: boolean;
}) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeContactRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const compactRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!floating) {
      compactRef.current = false;
      setCompact(false);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const nextCompact = window.scrollY > 70;
      if (nextCompact === compactRef.current) return;
      compactRef.current = nextCompact;
      setCompact(nextCompact);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [floating]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setContactOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || contactOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, contactOpen]);

  useEffect(() => {
    if (contactOpen) closeContactRef.current?.focus();
  }, [contactOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOutsideMenu = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        menuToggleRef.current?.contains(target)
      ) return;
      setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOutsideMenu);
    return () => document.removeEventListener("pointerdown", closeOutsideMenu);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const openAbout = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    const homePath = `${basePath}/`;
    if (window.location.pathname !== homePath && window.location.pathname !== basePath) return;

    const about = document.getElementById("about");
    if (!about) return;

    event.preventDefault();
    window.history.pushState(null, "", `${homePath}#about`);
    about.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      about.scrollIntoView({ behavior: "auto", block: "start" });
    }, 500);
  };
  const openContact = () => {
    setMenuOpen(false);
    setContactOpen(true);
  };
  const closeContact = () => setContactOpen(false);

  const contactModal = (
    <div className={`quick-contact-layer${contactOpen ? " is-open" : ""}`}>
      <button
        className="quick-contact-backdrop"
        type="button"
        aria-label="Close contact options"
        tabIndex={contactOpen ? 0 : -1}
        onClick={closeContact}
      />
      <section
        className="quick-contact"
        id="quick-contact"
        role="dialog"
        aria-modal="true"
        aria-hidden={!contactOpen}
        aria-labelledby="quick-contact-title"
      >
        <button
          className="quick-contact-close"
          type="button"
          aria-label="Close contact options"
          ref={closeContactRef}
          onClick={closeContact}
        />
        <Image
          className="quick-contact-logo"
          src={`${basePath}/danhuestext.png`}
          alt="DanHues"
          width={1280}
          height={360}
        />
        <p>Have an idea?</p>
        <h2 id="quick-contact-title">What’s the best way to reach me?</h2>
        <div>
          <a
            className="quick-contact-option quick-contact-email"
            href="mailto:danielhughesps@gmail.com?subject=Let%27s%20make%20something"
            onClick={closeContact}
          >
            <span>
              Email me
              <small>Projects and collaborations</small>
            </span>
          </a>
          <DiscordButton className="quick-contact-option" />
          <a
            className="quick-contact-option"
            href="https://www.instagram.com/imdanhues/"
            target="_blank"
            rel="noreferrer"
            onClick={closeContact}
          >
            <span>
              Instagram DM
              <small>Quick hellos and visual ideas</small>
            </span>
          </a>
        </div>
      </section>
    </div>
  );

  return (
    <>
    <header className={`site-header${floating ? "" : " page-static"}${compact ? " compact" : ""}${menuOpen ? " menu-open" : ""}${contactOpen ? " contact-open" : ""}`}>
      <Link className="mobile-header-logo" href="/" aria-label="DanHues home">
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
        ref={menuToggleRef}
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
      <nav ref={menuRef} id="site-navigation" aria-label="Main navigation">
        <span className="mobile-nav-label">Explore the work</span>
        <div className="nav-group nav-group-left">
          <Link href="/archive" onClick={closeMenu}>Projects</Link>
          <Link href="/journal" onClick={closeMenu}>Journal</Link>
        </div>
        <Link className="nav-wordmark" href="/" aria-label="DanHues home" onClick={closeMenu}>
          <Image
            src={`${basePath}/danhuestext.png`}
            alt="DanHues"
            width={1280}
            height={360}
            priority
          />
        </Link>
        <div className="nav-group nav-group-right">
          <Link href="/photography" onClick={closeMenu}>Photography</Link>
          <Link href="/#about" onClick={openAbout}>About</Link>
        </div>
        <button className="mobile-nav-contact" type="button" onClick={openContact}>
          Start a conversation
        </button>
      </nav>
      <button
        className="availability"
        type="button"
        aria-controls="quick-contact"
        aria-expanded={contactOpen}
        onClick={openContact}
      >
        <i /> Available for select projects
      </button>

    </header>
    {mounted && contactOpen ? createPortal(contactModal, document.body) : null}
    </>
  );
}
