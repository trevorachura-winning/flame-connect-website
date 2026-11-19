import Link from "next/link";
import { Icon } from "../../Icons";
import m from "../../../styles/marketing/motion.module.css";

/** Three clear conversion routes: consultation (primary), products, insights. */
export function PathwayCards({
  paths,
}: {
  paths: readonly { title: string; copy: string; href: string; cta: string; primary?: boolean }[];
}) {
  return (
    <ul className={`${m.paths} list-plain`}>
      {paths.map((p) => (
        <li key={p.href} style={{ display: "grid" }}>
          <Link href={p.href} className={`${m.path}${p.primary ? ` ${m.pathPrimary}` : ""}`}>
            <h3>{p.title}</h3>
            <p>{p.copy}</p>
            <span className={m.pathGo}>
              {p.cta} <Icon name="arrow-right" size={18} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
