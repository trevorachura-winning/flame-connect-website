import Link from "next/link";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

/** One strong question, one primary action — max two CTAs, per the brief. */
export function CTABand({
  question = "What are you trying to change?",
  copy = "Tell us the problem, workflow or opportunity you are working on. We will help you identify the most useful next step — a service, a tool, a learning path or a focused pilot.",
  primary = { label: "Book a consultation", href: "/contact?intent=consultation" },
  secondary = { label: "Explore free tools", href: "/products" },
}: {
  question?: string;
  copy?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="band motif">
      <div className="container cta-band">
        <Reveal>
          <h2 className="display-2" style={{ maxWidth: "40rem", marginInline: "auto" }}>{question}</h2>
          <p className="lede light">{copy}</p>
          <div className="hero-actions">
            <Link href={primary.href} className="btn btn-primary">
              {primary.label} <Icon name="arrow-right" size={18} />
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn-ghost">
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
