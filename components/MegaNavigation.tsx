"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOP_NAV, FOOTER_NAV, type NavItem } from "../content/navigation";
import { PRODUCTS, STATUS_LABEL } from "../content/products";
import styles from "./MegaNavigation.module.css";

type Group = "Products" | "Services";
type OpenGroup = Group | null;

function isGroup(label: string): label is Group {
  return label === "Products" || label === "Services";
}

type MegaNavLink = NavItem & { status?: string };

function entries(group: Group): MegaNavLink[] {
  if (group === "Products") {
    return PRODUCTS.map((product) => ({
      label: product.name,
      href: `/products/${product.slug}`,
      status: STATUS_LABEL[product.status],
    }));
  }
  return FOOTER_NAV.find((section) => section.heading === group)?.items ?? [];
}

const GROUP_INFO: Record<Group, { heading: string; introduction: string; allHref: string }> = {
  Products: {
    heading: "Explore our products",
    introduction: "Flame OS for business growth and Flame Academy for digital skills. Both are launching soon.",
    allHref: "/products",
  },
  Services: {
    heading: "How we can help",
    introduction: "Practical support for digital communications, business AI and leadership.",
    allHref: "/services",
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
        const split = Math.ceil(links.length / 2);
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
                    <span className={styles.eyebrow}>Flame Connect</span>
                    <strong>{info.heading}</strong>
                    <p>{info.introduction}</p>
                  </div>
                  <Link href={info.allHref} className={styles.panelAll} onClick={() => setOpen(null)}>
                    View all {group.toLowerCase()} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div className={styles.panelColumns}>
                  {[links.slice(0, split), links.slice(split)].map((column, i) => (
                    <div className={styles.panelColumn} key={i}>
                      {column.map((link) => (
                        <Link
                          className={styles.panelLink}
                          href={link.href}
                          key={link.href}
                          onClick={() => setOpen(null)}
                          aria-current={active(link.href) ? "page" : undefined}
                        >
                          <span className={styles.linkLabel}>{link.label}{link.status && <small className={styles.productStatus}>{link.status}</small>}</span>
                          <span aria-hidden="true">↗</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <div className={styles.panelFoot}>
                  <span>Practical AI for African progress.</span>
                  <Link href="/contact?intent=consultation" onClick={() => setOpen(null)}>
                    Discuss your challenge <span aria-hidden="true">↗</span>
                  </Link>
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
            {item.label} <span aria-hidden="true">↗</span>
          </Link>
        )
      )}
      <Link href="/contact" onClick={onNavigate}>
        Contact <span aria-hidden="true">↗</span>
      </Link>
    </nav>
  );
}
