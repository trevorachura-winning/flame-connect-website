import Link from "next/link";
import { Icon } from "../components/Icons";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "44rem", textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>404</span>
        <h1 className="display-1" style={{ margin: "1rem 0" }}>This page moved — or never existed.</h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          Nothing here should be a dead end. Pick a working path below, or tell us what you were
          looking for and we will point you at it.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/products" className="btn btn-outline">Explore free tools <Icon name="arrow-right" size={16} /></Link>
          <Link href="/contact" className="btn btn-outline">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
