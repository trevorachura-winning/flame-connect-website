import { Icon } from "./Icons";

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div style={{ display: "grid", gap: "0.7rem" }}>
      {items.map((f) => (
        <details className="faq-item" key={f.question}>
          <summary>
            {f.question}
            <Icon name="plus" size={18} />
          </summary>
          <div className="faq-body">{f.answer}</div>
        </details>
      ))}
    </div>
  );
}
