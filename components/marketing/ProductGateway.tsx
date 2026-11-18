import Link from "next/link";
import { StatusBadge } from "../StatusBadge";
import { Icon } from "../Icons";
import { STATUS_LABEL, type Product, type ProductStatus } from "../../content/products";
import s from "../../styles/marketing/marketing.module.css";

/**
 * Compact product index for marketing pages. Statuses and counts are derived
 * from content/products.ts at render time — this component never states a
 * status of its own, so it cannot drift from the public status board.
 */
export function ProductGateway({ products }: { products: readonly Product[] }) {
  const order: ProductStatus[] = ["live", "pilot", "development"];
  const counts = order
    .map((status) => ({ status, n: products.filter((p) => p.status === status).length }))
    .filter((c) => c.n > 0);

  return (
    <div>
      <ul className={s.productList} aria-label="Flame product family">
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`} className={s.productRow}>
              <span className={s.productName}>{product.name}</span>
              <StatusBadge status={product.status} />
              <span className={s.productPurpose}>
                {product.purpose}
                <span className={s.productGo} aria-hidden="true">
                  <Icon name="arrow-right" size={14} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className={s.statusSummary}>
        <span className={s.kickerMuted}>Status today</span>
        {counts.map((c) => (
          <span key={c.status}>
            {c.n} {STATUS_LABEL[c.status].toLowerCase()}
          </span>
        ))}
        <Link href="/trust" className="text-link">
          Status board <Icon name="arrow-right" size={14} />
        </Link>
      </p>
    </div>
  );
}
