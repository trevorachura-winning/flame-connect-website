"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOP_NAV, type NavItem } from "../content/navigation";
import { PRODUCTS, STATUS_LABEL } from "../content/products";
import { SERVICES } from "../content/services";
import styles from "./MegaNavigation.module.css";

type Group = "Products" | "Services" | "About";
type OpenGroup = Group | null;

function isGroup(label: string): label is Group {
  return label === "Products" || label === "Services" || label === "About";
}

type MegaNavLink = NavItem & { status?: string; description?: string };

/** Dropdown entries come from the content registries, so copy never drifts. */
function entries(group: Group): MegaNavLink[] {
  if (group === "About") {
    return [
      { label: "About Flame Connect", href: "/about", description: "An AI Centre of Change, built in Uganda for the way Africa works." },
      { label: "Our story", href: "/our-story", description: "From a design desk in 2019 to a technology company." },
      { label: "Our team", href: "/team", description: "The people behind the change." },
    ];
  }
  if (group === "Products") {
    return PRODUCTS.map((product) => ({
      label: product.name,
      href: `/products/${product.slug}`,
      status: STATUS_LABEL[product.status],
      description: product.tagline,
    }));
  }
  return SERVICES.map((service) => ({
    label: service.name,
    href: `/services/${service.slug}`,
    description: service.proposition,
  }));
}

const GROUP_INFO: Record<
  Group,
  { heading: string; introduction: string; allHref: string; allLabel: string; foot: { text: string; label: string; href: string } }
> = {
  Products: {
    heading: "Our platforms",
    introduction: "Flame OS for business growth and Flame Academy for digital skills. Both are launching soon.",
    allHref: "/products",
    allLabel: "All products",
    foot: { text: "Be first to try them.", label: "Join early access", href: "/contact?intent=waitlist&product=flame-os" },
  },
  About: {
    heading: "Who we are",
    introduction: "Curious people, learning out loud, building technology for Uganda and then Africa.",
    allHref: "/about",
    allLabel: "About us",
    foot: { text: "Want to build with us?", label: "Talk to us", href: "/contact" },
  },
  Services: {
    heading: "Three service lines",
    introduction: "Practical support for digital communications, business AI and leadership.",
    allHref: "/services",
    allLabel: "All services",
    foot: { text: "Not sure where to start?", label: "Take the free AI readiness assessment", href: "/assessment" },
  },
};

/**
 * Uses ordinary navigation links and a separate disclosure button. Unlike an
 * ARIA 'menu', these links preserve native browser tab/keyboard behaviour.
 */
export function DesktopMegaNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState<OpenGroup>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef<Record<Group, HTMLButtonElement | null>>({
    Products: null,
    Services: null,
    About: null,
  });

  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setOpen(null);
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        triggers.current[open]?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      ref={navRef}
      className={`main-nav ${styles.desktopNav}`}
      aria-label="Primary"
      onMouseLeave={() => setOpen(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(null);
        }
      }}
    >
      {TOP_NAV.map((item) => {
        if (!isGroup(item.label)) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active(item.href) ? "active" : undefined}
              aria-current={active(item.href) ? "page" : undefined}
              onMouseEnter={() => setOpen(null)}
            >
              {item.label}
            </Link>
          );
        }
        const group = item.label;
        const visible = open === group;
        const menuId = `flame-nav-${group.toLowerCase()}`;
        const links = entries(group);
        const info = GROUP_INFO[group];

        return (
          <div
            className={styles.topGroup}
            key={item.href}
            onMouseEnter={() => setOpen(group)}
          >
            <Link
              href={item.href}
              className={active(item.href) ? "active" : undefined}
              aria-current={active(item.href) ? "page" : undefined}
              onClick={() => setOpen(null)}
            >
              {item.label}
            </Link>
            <button
              ref={(element) => {
                triggers.current[group] = element;
              }}
              type="button"
              className={styles.disclosure}
              aria-label={`Show ${group.toLowerCase()} navigation`}
              aria-expanded={visible}
              aria-controls={menuId}
              onClick={() => setOpen(visible ? null : group)}
            >
              <span className={visible ? styles.chevronOpen : styles.chevron} aria-hidden="true" />
            </button>
            {visible && (
              <div id={menuId} className={styles.megaPanel}>
                <div className={styles.panelHeader}>
                  <div>
                    <strong>{info.heading}</strong>
                    <p>{info.introduction}</p>
                  </div>
                  <Link href={info.allHref} className={styles.panelAll} onClick={() => setOpen(null)}>
                    {info.allLabel} <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <ul className={styles.panelList} role="list">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        className={styles.panelLink}
                        href={link.href}
                        onClick={() => setOpen(null)}
                        aria-current={active(link.href) ? "page" : undefined}
                      >
                        <span className={styles.linkLabel}>
                          <span className={styles.linkTitle}>
                            {link.label}
                            {link.status && <small className={styles.productStatus}>{link.status}</small>}
                          </span>
                          {link.description && <span className={styles.linkDesc}>{link.description}</span>}
                        </span>
                        <span className={styles.linkArrow} aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className={styles.panelFoot}>
                  <span>{info.foot.text}</span>
                  <span className={styles.footLinks}>
                    <Link href={info.foot.href} onClick={() => setOpen(null)}>
                      {info.foot.label} <span aria-hidden="true">→</span>
                    </Link>
                    {group === "Services" && (
                      <Link href="/contact?intent=consultation" onClick={() => setOpen(null)}>
                        Book a consultation <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/** Mobile drawer links stay visible as regular links with opt-in disclosures. */
export function MobileMegaNavigation({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<OpenGroup>(null);
  useEffect(() => setExpanded(null), [pathname]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav aria-label="Mobile">
      {TOP_NAV.map((item) =>
        isGroup(item.label) ? (
          <div className={styles.mobileGroup} key={item.href}>
            <div className={styles.mobileRow}>
              <Link
                className={styles.mobileTopLink}
                href={item.href}
                onClick={onNavigate}
                aria-current={active(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
              <button
                type="button"
                className={styles.mobileDisclosure}
                aria-label={`Show ${item.label.toLowerCase()} links`}
                aria-expanded={expanded === item.label}
                aria-controls={`flame-mobile-${item.label.toLowerCase()}`}
                onClick={() => setExpanded(isGroup(item.label) && expanded !== item.label ? item.label : null)}
              >
                <span className={expanded === item.label ? styles.chevronOpen : styles.chevron} aria-hidden="true" />
              </button>
            </div>
            {expanded === item.label && (
              <div className={styles.mobileNested} id={`flame-mobile-${item.label.toLowerCase()}`}>
                {entries(item.label).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={active(link.href) ? "page" : undefined}
                  >
                    {link.label}{link.status && <small className={styles.mobileStatus}>{link.status}</small>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}
