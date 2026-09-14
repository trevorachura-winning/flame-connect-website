import { AmbientVideo } from "./AmbientVideo";

/**
 * Flame OS illustrative interface.
 * Per the brief: until real product screens are stable, show *labelled*
 * wireframe-quality visuals — never deceptive "finished product" mockups.
 */
export function OsMock({
  rows = [
    { label: "Assess", bar: 82, value: "Readiness profile" },
    { label: "Learn", bar: 64, value: "Pathway started" },
    { label: "Improve", bar: 47, value: "Workflow mapped" },
    { label: "Implement", bar: 28, value: "Pilot running" },
  ],
}: {
  rows?: { label: string; bar: number; value: string }[];
}) {
  return (
    <div className="os-stage">
      <AmbientVideo src="/videos/ember-loop.mp4" poster="/videos/ember-poster.jpg" />
      <span className="os-label">Illustrative interface — not a finished product</span>
      <div className="os-inner">
        <div className="os-window">
          <div className="os-titlebar">
            <i /><i /><i />
            <span>Flame OS · concept view</span>
          </div>
          <div className="os-body">
            {rows.map((r) => (
              <div key={r.label}>
                <div className="os-row">
                  <b>{r.label}</b>
                  <span style={{ fontSize: "0.78rem", color: "var(--ink-faint)" }}>{r.value}</span>
                </div>
                <div className="os-bar" role="img" aria-label={`${r.label} illustrative progress`}>
                  <i style={{ width: `${r.bar}%` }} />
                </div>
              </div>
            ))}
            <p className="os-note">
              Live product screens replace this concept view once interfaces are stable and verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
