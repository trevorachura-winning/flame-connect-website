import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Icon } from "../../../components/Icons";
import { JsonLd } from "../../../components/JsonLd";
import { ARTICLES, getArticle, getProduct, getService, sortedArticles } from "../../../lib/content";
import { pageMetadata, articleJsonLd } from "../../../lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seo.title,
    description: article.seo.description,
    path: `/resources/${article.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const relatedProduct = article.relatedProductSlug ? getProduct(article.relatedProductSlug) : undefined;
  const relatedService = article.relatedServiceSlug ? getService(article.relatedServiceSlug) : undefined;
  const more = sortedArticles().filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <section className="page-hero white" style={{ paddingBottom: "1.5rem" }}>
        <div className="container" style={{ maxWidth: "56rem" }}>
          <Breadcrumbs items={[{ name: "Resources", href: "/resources" }, { name: article.category, href: `/resources?category=${encodeURIComponent(article.category)}` }]} />
          <span className="eyebrow">{article.category}</span>
          <h1 className="display-2" style={{ marginTop: "0.8rem" }}>{article.title}</h1>
          <p className="lede" style={{ marginTop: "0.9rem" }}>{article.summary}</p>
          <div className="article-meta" style={{ marginTop: "1.2rem" }}>
            <span><b>{article.author.name}</b> · {article.author.role}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ paddingTop: "1.5rem" }}>
        <div className="container article-grid">
          <article className="prose">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="callout">
              <h3>Actions you can take</h3>
              <ul>
                {article.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>

            <div className="callout" style={{ borderLeftColor: "var(--navy)" }}>
              <h3>Limits — what stays uncertain</h3>
              <ul>
                {article.limits.map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>
            </div>
            <JsonLd data={articleJsonLd({ title: article.title, description: article.summary, slug: article.slug, date: article.date, category: article.category })} />
          </article>

          <aside className="article-aside">
            {(relatedProduct || relatedService) && (
              <div className="aside-card">
                <span className="eyebrow" style={{ fontSize: "0.7rem" }}>Related</span>
                {relatedProduct && (
                  <>
                    <h3 style={{ marginTop: "0.6rem" }}>{relatedProduct.name}</h3>
                    <p>{relatedProduct.purpose}</p>
                    <Link href={`/products/${relatedProduct.slug}`} className="text-link">
                      Explore the tool <Icon name="arrow-right" size={15} />
                    </Link>
                  </>
                )}
                {relatedService && (
                  <div style={{ marginTop: relatedProduct ? "1.2rem" : "0.6rem" }}>
                    <h3>{relatedService.name}</h3>
                    <p>{relatedService.proposition}</p>
                    <Link href={`/services/${relatedService.slug}`} className="text-link">
                      Explore the service <Icon name="arrow-right" size={15} />
                    </Link>
                  </div>
                )}
              </div>
            )}
            <div className="aside-card">
              <h3>Talk it through</h3>
              <p>Bring this topic into a consultation — we will apply it to your context.</p>
              <Link href="/contact?intent=consultation" className="btn btn-primary btn-sm">
                Book a consultation
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section paper2 tight">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Keep reading</span>
            <h2 className="display-3">More from Resources</h2>
          </div>
          <div className="grid cols-2">
            {more.map((a) => (
              <article key={a.slug} className="card lift insight-card">
                <div className="meta">
                  <span className="cat">{a.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{a.readingTime}</span>
                </div>
                <h3><Link href={`/resources/${a.slug}`}>{a.title}</Link></h3>
                <p>{a.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
