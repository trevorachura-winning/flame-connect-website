export function JsonLd({ data }: { data: object }) {
  // Escape "<" so a "</script>" sequence can never terminate the tag early:
  // JSON-LD content is trusted (static repo content) but defense-in-depth is free.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
