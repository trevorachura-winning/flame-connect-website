import Link from "next/link";
import type { Product } from "../content/products";
import { StatusBadge } from "./StatusBadge";
import { Icon } from "./Icons";

export function ProductCard({ product, flame = false }: { product: Product; flame?: boolean }) {
  return (
    <article className="card lift product-card">
      <div className="product-top">
        <span className={`product-glyph${flame ? " flame" : ""}`} aria-hidden="true">
          {product.name.replace("Flame ", "").slice(0, 1)}
        </span>
        <StatusBadge status={product.status} />
      </div>
      <h3>{product.name}</h3>
      <p>{product.purpose}</p>
      <div className="card-foot">
        <Link href={`/products/${product.slug}`} className="text-link">
          Learn more <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </article>
  );
}
