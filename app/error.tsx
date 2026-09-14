"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "44rem", textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>Something went wrong</span>
        <h1 className="display-2" style={{ margin: "1rem 0" }}>The page hit a problem on our side.</h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          Try again — if it keeps happening, use the contact page and we will fix it.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={reset}>Try again</button>
          <a className="btn btn-outline" href="/contact">Contact us</a>
        </div>
      </div>
    </section>
  );
}
