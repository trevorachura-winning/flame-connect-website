import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { Icon } from "./Icons";
import { NewsletterForm } from "./NewsletterForm";
import { FOOTER_NAV } from "../content/navigation";
import { SITE } from "../lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="band-top">
          <div className="footer-brand">
            <span className="brand">
              <span className="brand-lockup">
                <BrandLogo height={44} withStrapline={false} />
              </span>
            </span>
            <p>{SITE.shortDescription}</p>
            <NewsletterForm />
            <div style={{ marginTop: "1.3rem", display: "grid", gap: "0.6rem" }}>
              <span className="loc" style={{ fontSize: "0.86rem", color: "#9fb0dd", display: "inline-flex", gap: "0.45rem", alignItems: "center" }}>
                <Icon name="map-pin" size={16} /> {SITE.officeLocation} · {SITE.homeLocationLine}
              </span>
              <div className="footer-social" style={{ marginTop: "0.4rem" }}>
                {SITE.social.linkedin && (
                  <a href={SITE.social.linkedin} aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
                )}
                {SITE.social.x && (
                  <a href={SITE.social.x} aria-label="X (Twitter)"><Icon name="xsocial" size={18} /></a>
                )}
                {SITE.social.youtube && (
                  <a href={SITE.social.youtube} aria-label="YouTube"><Icon name="external" size={18} /></a>
                )}
                {SITE.social.github && (
                  <a href={SITE.social.github} aria-label="GitHub — learn in public">
                    <Icon name="github" size={18} />
                  </a>
                )}
                <Link href="/contact" aria-label="Contact us"><Icon name="mail" size={18} /></Link>
              </div>
            </div>
          </div>
          <nav className="footer-cols" aria-label="Footer">
            {FOOTER_NAV.map((col) => (
              <div className="footer-col" key={col.heading}>
                <h3>{col.heading}</h3>
                <ul>
                  {col.items.map((item) => (
                    <li key={item.href}>
                      {item.href.startsWith("http") ? (
                        <a href={item.href}>
                          {item.label}
                        </a>
                      ) : (
                        <Link href={item.href}>{item.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {year} {SITE.legalName ?? SITE.name}. All rights reserved.</span>
          <span>
            {SITE.legalName
              ? SITE.legalName
              : "Registered company name shown here once confirmed — see our Trust page."}
          </span>
          <span style={{ display: "inline-flex", gap: "1.2rem" }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/trust">Responsible AI</Link>
            <Link href="/contact">Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
