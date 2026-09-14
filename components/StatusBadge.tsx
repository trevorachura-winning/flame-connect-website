import type { ProductStatus } from "../content/products";
import { STATUS_LABEL } from "../content/products";

export function StatusBadge({ status }: { status: ProductStatus }) {
  return <span className={`status ${status}`}>{STATUS_LABEL[status]}</span>;
}
