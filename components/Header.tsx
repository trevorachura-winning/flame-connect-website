"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesktopMegaNavigation, MobileMegaNavigation } from "./MegaNavigation";
import styles from "./MegaNavigation.module.css";
import { BrandLogo } from "./BrandLogo";
import { Icon } from "./Icons";

export function Header({
  ribbon,
}: {
  ribbon?: { text: string; href: string; linkText: string } | null;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ribbonVisible, setRibbonVisible] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (ribbon && sessionStorage.getItem("fc-ribbon-dismissed") !== "1") {
      setRibbonVisible(true);
    }
  }, [ribbon]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    if (drawerOpen) closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close drawer on route change and Escape
  useEffect(() => setDrawerOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  // Keep keyboard focus inside the open mobile drawer, and return it to the
  // launcher on Escape. Regular route changes close the drawer separately.
  useEffect(() => {
    if (!drawerOpen) return;
    const trapTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !drawerRef.current) return;
      const available = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((node) => node.getClientRects().length > 0);
      if (available.length === 0) return;
      const first = available[0];
      const last = available[available.length - 1];
      if (!drawerRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapTab);
    return () => document.removeEventListener("keydown", trapTab);
  }, [drawerOpen]);

  const dismissRibbon = () => {
    setRibbonVisible(false);
    sessionStorage.setItem("fc-ribbon-dismissed", "1");
  };

  return (
    <>
      {ribbon && ribbonVisible && (
        <div className="ribbon" role="region" aria-label="Announcement">
          <div className="container ribbon-inner">
            <span className="ribbon-dot" aria-hidden="true" />
            <span>
              {ribbon.text}{" "}
              <Link href={ribbon.href}>{ribbon.linkText}</Link>
            </span>
            <button className="ribbon-close" onClick={dismissRibbon} aria-label="Dismiss announcement">
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>
      )}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Flame Connect home">
            <span className="brand-lockup">
              <BrandLogo height={44} priority />
            </span>
          </Link>

          <DesktopMegaNavigation />

          <div className="header-actions">
            <Link href="/contact" className="btn btn-outline btn-sm header-talk">
              Talk to us
            </Link>
            <Link href="/assessment" className="btn btn-primary btn-sm">
              <span className="header-cta-text">Free AI assessment</span>
              <span className="only-compact">AI assessment</span>
            </Link>
            <button
              ref={menuBtnRef}
              className={`menu-btn ${styles.mobileTrigger}`}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && <div className="drawer-backdrop open" onClick={() => { setDrawerOpen(false); menuBtnRef.current?.focus(); }} />}
      <div
        ref={drawerRef}
        className={`drawer${drawerOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-head">
          <span className="brand">
            <span className="brand-lockup">
              <BrandLogo height={38} />
            </span>
          </span>
          <button
            ref={closeBtnRef}
            className="menu-btn"
            aria-label="Close menu"
            onClick={() => {
              setDrawerOpen(false);
              menuBtnRef.current?.focus();
            }}
          >
            <Icon name="x" size={20} />
          </button>
        </div>
        <MobileMegaNavigation onNavigate={() => setDrawerOpen(false)} />

        <div className="drawer-cta">
          <Link href="/assessment" className="btn btn-primary">
            Take the free AI assessment
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Talk to us
          </Link>
          <Link className="drawer-signin" href="/services">
            Explore our service lines
          </Link>
        </div>
      </div>
    </>
  );
}
