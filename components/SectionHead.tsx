export function SectionHead({
  eyebrow,
  title,
  copy,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`section-head${center ? " center" : ""}`}>
      {eyebrow && <span className={`eyebrow${light ? " light" : ""}`}>{eyebrow}</span>}
      <h2 className="display-2">{title}</h2>
      {copy && <p className={`lede${light ? " light" : ""}`}>{copy}</p>}
    </div>
  );
}
