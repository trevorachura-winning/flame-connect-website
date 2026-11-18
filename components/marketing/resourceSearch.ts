import type { Article, ArticleCategory } from "../../content/articles";

/**
 * Pure filter used by ResourcesExplorer. Kept framework-free so it can be
 * unit-tested with `node --test` (tests/marketing).
 * Every whitespace-separated term must appear in the title, summary,
 * category or a section heading (case-insensitive).
 */
export function filterArticles<T extends Pick<Article, "title" | "summary" | "category" | "sections">>(
  articles: readonly T[],
  category: ArticleCategory | null,
  query: string
): T[] {
  const q = query.trim().toLowerCase();
  const terms = q ? q.split(/\s+/) : [];
  return articles.filter((a) => {
    if (category && a.category !== category) return false;
    if (!terms.length) return true;
    const haystack = [a.title, a.summary, a.category, ...a.sections.map((x) => x.heading)]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
