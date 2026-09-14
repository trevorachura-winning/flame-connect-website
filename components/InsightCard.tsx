import Link from "next/link";
import type { Article } from "../content/articles";
import { Icon } from "./Icons";

export function InsightCard({ article }: { article: Article }) {
  return (
    <article className="card lift insight-card">
      <div className="meta">
        <span className="cat">{article.category}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </time>
        <span aria-hidden="true">·</span>
        <span>{article.readingTime}</span>
      </div>
      <h3>
        <Link href={`/resources/${article.slug}`}>{article.title}</Link>
      </h3>
      <p>{article.summary}</p>
      <div className="card-foot">
        <Link href={`/resources/${article.slug}`} className="text-link">
          Read <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </article>
  );
}
