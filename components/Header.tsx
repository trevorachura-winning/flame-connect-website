"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOP_NAV } from "../content/navigation";
import { FlameMark } from "./FlameMark";
import { Icon } from "./Icons";

export function Header({
  exploreHref,
  signin,
  ribbon,
}: {
  exploreHref: string;
  signin: { href: string; external: boolean };
  ribbon?: { text: string; href: string; linkText: string } | null;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ribbonVisible, setRibbonVisible] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const dismissRibbon = () => {
    setRibbonVisible(false);
    sessionStorage.setItem("fc-ribbon-dismissed", "1");
  };

  const signinLink = signin.external ? (
    <a className="header-signin" href={signin.href}>
      Sign in
    </a>
  ) : (
    <Link className="header-signin" href={signin.href}>
      Sign in
    </Link>
  );

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
          <Link href="/" className="brand" aria-label="Flame Connect — home">
            <FlameMark size={40} />
            <span className="brand-word">
              <b>Flame Connect</b>
              <span>AI Centre of Change</span>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Primary">
            {TOP_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            {signinLink}
            <Link href={exploreHref} className="btn btn-primary btn-sm">
              <span className="header-cta-text">Explore free tools</span>
              <span aria-hidden="true" className="only-compact">Tools</span>
            </Link>
            <button
              ref={menuBtnRef}
              className="menu-btn"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && <div className="drawer-backdrop open" onClick={() => setDrawerOpen(false)} />}
      <div
        className={`drawer${drawerOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-head">
          <span className="brand">
            <FlameMark size={34} />
            <span className="brand-word">
              <b>Flame Connect</b>
              <span>AI Centre of Change</span>
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
        <nav aria-label="Mobile">
          {TOP_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
              <Icon name="arrow-right" size={18} />
            </Link>
          ))}
          <Link href="/contact">Contact <Icon name="arrow-right" size={18} /></Link>
        </nav>
        <div className="drawer-cta">
          <Link href={exploreHref} className="btn btn-primary">
            Explore free tools
          </Link>
          {signin.external ? (
            <a className="drawer-signin" href={signin.href}>
              Sign in
            </a>
          ) : (
            <Link className="drawer-signin" href={signin.href}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
