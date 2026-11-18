"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { InsightCard } from "../InsightCard";
import { Icon } from "../Icons";
import { Reveal } from "../Reveal";
import { filterArticles } from "./resourceSearch";
import type { Article, ArticleCategory } from "../../content/articles";
import s from "../../styles/marketing/marketing.module.css";
import m from "../../styles/marketing/motion.module.css";
import { SplitText } from "./motion/SplitText";
import { SpotlightGroup } from "./motion/SpotlightGroup";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/**
 * Resources index: category filter (URL-driven, so /resources?category=…
 * deep links keep working), instant client-side search across title, summary
 * and section headings, and a featured lead piece. Works without JS as a
 * plain, fully linked list; search is a progressive enhancement.
 */
export function ResourcesExplorer({
  articles,
  categories,
}: {
  articles: Article[];
  categories: readonly ArticleCategory[];
}) {
  const params = useSearchParams();
  const active = categories.find((c) => c === params.get("category")) ?? null;
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const counts = useMemo(() => {
    const m = new Map<ArticleCategory, number>();
    for (const a of articles) m.set(a.category, (m.get(a.category) ?? 0) + 1);
    return m;
  }, [articles]);

  const shown = filterArticles(articles, active, query);

  const featured = !active && !q ? shown[0] : undefined;
  const rest = featured ? shown.slice(1) : shown;

  return (
    <>
      <section className={`page-hero motif ${m.scope}`}>
        <div className={`container ${m.heroIntro}`}>
          <span className={`eyebrow ${m.rise}`}>Resources</span>
          <h1 className="display-1">
            <SplitText text="Useful ideas for the work in front of you." accent="in front of you." delayMs={80} />
          </h1>
          <p className={`lede ${m.rise}`} style={{ "--i": 8 } as CSSProperties}>
            Practical guides, field notes, research and perspectives on AI, digital communication,
            business growth and transformation in African contexts. Written to be used, not just read.
          </p>
          <div className={`${s.toolbar} ${m.rise}`} style={{ "--i": 9 } as CSSProperties}>
            <div className={s.search} role="search">
              <span className={s.searchIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4.5 4.5" />
                </svg>
              </span>
              <label htmlFor="resource-search" className="sr-only">
                Search resources
              </label>
              <input
                id="resource-search"
                type="search"
                placeholder="Search by topic — e.g. readiness, workflow, sales"
                value={query}
                onChange={(e: { currentTarget: HTMLInputElement }) => setQuery(e.currentTarget.value)}
                autoComplete="off"
                enterKeyHint="search"
              />
            </div>
            <nav aria-label="Resource categories" className={s.chips}>
              <Link
                href="/resources"
                className={`chip chip-link${!active ? " on" : ""}`}
                aria-current={!active ? "page" : undefined}
              >
                All <span className={s.count}>{articles.length}</span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/resources?category=${encodeURIComponent(cat)}`}
                  className={`chip chip-link${active === cat ? " on" : ""}`}
                  aria-current={active === cat ? "page" : undefined}
                >
                  {cat} <span className={s.count}>{counts.get(cat) ?? 0}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="section tight" aria-labelledby="resource-results">
        <div className="container">
          <h2 id="resource-results" className="sr-only">
            {active ? `${active}` : "All resources"}
          </h2>
          <p className={s.resultLine} aria-live="polite">
            {q
              ? `${shown.length} ${shown.length === 1 ? "piece matches" : "pieces match"} “${query.trim()}”${active ? ` in ${active}` : ""}.`
              : `${shown.length} ${shown.length === 1 ? "piece" : "pieces"}${active ? ` in ${active}` : ""}, newest first.`}
          </p>

          {featured && (
            <Reveal>
              <article className={`${s.featured} ${m.scope}`} aria-labelledby="featured-title">
                <div>
                  <span className={s.featuredKicker}>Latest · {featured.category}</span>
                  <h2 id="featured-title">
                    <Link href={`/resources/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p>{featured.summary}</p>
                  <div className={s.featuredMeta}>
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readingTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.author.name}</span>
                  </div>
                </div>
                <div className={s.featuredAside}>
                  <p>
                    Every piece ends with actions you can take and the limits of what we know.
                  </p>
                  <Link href={`/resources/${featured.slug}`} className={`btn btn-primary ${s.wrapBtn}`}>
                    Read the piece <Icon name="arrow-right" size={18} />
                  </Link>
                </div>
              </article>
            </Reveal>
          )}

          {shown.length === 0 ? (
            <div className="pending-block">
              <h3>{q ? "No pieces match that search yet" : "Nothing in this category yet"}</h3>
              <p>
                {q
                  ? "Try a broader word, or suggest the topic — the best resources start as real problems."
                  : active === "Research"
                    ? "Longer research is in progress. We publish when the evidence is ready, not to fill a slot — subscribe and it will reach you honestly labelled."
                    : "More is coming. Try another category meanwhile."}
              </p>
              {q && (
                <p style={{ marginTop: "1rem" }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setQuery("")}>
                    Clear search
                  </button>
                </p>
              )}
            </div>
          ) : (
            <SpotlightGroup className={s.cols3}>
              {rest.map((article, i) => (
                <Reveal key={article.slug} delay={(i % 3) * 0.06}>
                  <div className={m.spot} data-spotlight="" style={{ borderRadius: "var(--radius-m)", height: "100%" }}>
                    <InsightCard article={article} />
                  </div>
                </Reveal>
              ))}
            </SpotlightGroup>
          )}
        </div>
      </section>
    </>
  );
}
