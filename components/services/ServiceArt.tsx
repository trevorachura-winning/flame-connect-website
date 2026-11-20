/**
 * Original line illustrations for the service sub-offerings (20–21 Nov 2026).
 * Drawn in the brand palette; every moving part is a CSS class so motion can
 * be switched off for people who prefer reduced motion.
 */
import type { ReactNode } from "react";
import s from "../../styles/service-explorer.module.css";

export type ServiceArtKey =
  | "design"
  | "video"
  | "photo"
  | "print"
  | "copy"
  | "ai-content"
  | "erp"
  | "automation"
  | "payments"
  | "dashboards"
  | "assistant"
  | "support";

const INK = "var(--ink, #111827)";
const FLAME = "#F4511E";
const BLUE = "#153A8A";
const SOFT = "#E9EEF8";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label={label} className={s.art}>
      <rect x="1" y="1" width="318" height="218" rx="22" fill="#F7F9FD" stroke="#E3E8F2" />
      {children}
    </svg>
  );
}

export function ServiceArt({ kind, label }: { kind: ServiceArtKey; label: string }) {
  switch (kind) {
    case "design":
      return (
        <Frame label={label}>
          <rect x="54" y="40" width="150" height="120" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
          <circle className={s.pop} cx="104" cy="92" r="26" fill={FLAME} opacity="0.9" />
          <rect className={`${s.pop} ${s.d2}`} x="112" y="98" width="62" height="42" rx="6" fill={BLUE} opacity="0.85" />
          <path className={s.draw} d="M66 140 C 96 110, 130 150, 190 60" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <g className={s.float}>
            <path d="M206 132 l34 -34 l12 12 l-34 34 z" fill="#fff" stroke={INK} strokeWidth="2" />
            <path d="M206 132 l-6 18 l18 -6" fill={FLAME} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          </g>
          {[FLAME, BLUE, "#0B1830", "#F6B28F"].map((c, i) => (
            <circle key={c} className={`${s.pop} ${s[`d${i + 1}` as "d1"]}`} cx={236 + (i % 2) * 26} cy={50 + Math.floor(i / 2) * 26} r="9" fill={c} />
          ))}
        </Frame>
      );
    case "video":
      return (
        <Frame label={label}>
          <rect x="60" y="54" width="150" height="96" rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
          <path d="M210 82 l42 -22 v84 l-42 -22 z" fill={SOFT} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path className={s.pulse} d="M124 82 l30 20 l-30 20 z" fill={FLAME} />
          <circle className={s.blink} cx="80" cy="70" r="5" fill={FLAME} />
          <rect x="60" y="170" width="200" height="8" rx="4" fill={SOFT} />
          <rect className={s.progress} x="60" y="170" width="200" height="8" rx="4" fill={FLAME} />
          <circle className={s.playhead} cx="60" cy="174" r="8" fill="#fff" stroke={FLAME} strokeWidth="3" />
        </Frame>
      );
    case "photo":
      return (
        <Frame label={label}>
          <rect x="70" y="62" width="180" height="110" rx="16" fill="#fff" stroke={INK} strokeWidth="2" />
          <rect x="96" y="48" width="44" height="18" rx="5" fill={SOFT} stroke={INK} strokeWidth="2" />
          <circle cx="160" cy="117" r="38" fill={SOFT} stroke={INK} strokeWidth="2" />
          <g className={s.spin} style={{ transformOrigin: "160px 117px" }}>
            {[0, 60, 120, 180, 240, 300].map((r) => (
              <path key={r} d="M160 117 L160 87 A30 30 0 0 1 186 102 z" fill={r % 120 === 0 ? BLUE : "#2A4FA3"} opacity="0.9" transform={`rotate(${r} 160 117)`} />
            ))}
          </g>
          <circle cx="160" cy="117" r="11" fill="#0B1830" />
          <circle className={s.flash} cx="226" cy="80" r="7" fill={FLAME} />
        </Frame>
      );
    case "print":
      return (
        <Frame label={label}>
          <g className={s.float}>
            <rect x="58" y="52" width="104" height="120" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
            <rect x="72" y="68" width="76" height="40" rx="6" fill={BLUE} />
            <path d="M80 98 q14 -22 30 -6 t32 -10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <rect x="72" y="118" width="60" height="6" rx="3" fill={INK} opacity="0.7" />
            <rect x="72" y="132" width="44" height="6" rx="3" fill={INK} opacity="0.35" />
          </g>
          <path d="M190 84 h70 l-8 92 h-54 z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M206 84 v-10 a19 19 0 0 1 38 0 v10" fill="none" stroke={INK} strokeWidth="2" />
          <circle className={s.pop} cx="225" cy="130" r="18" fill={FLAME} />
          <rect className={`${s.pop} ${s.d2}`} x="180" y="44" width="56" height="34" rx="5" fill="#fff" stroke={INK} strokeWidth="2" transform="rotate(-8 208 61)" />
        </Frame>
      );
    case "copy":
      return (
        <Frame label={label}>
          <rect x="70" y="36" width="180" height="150" rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} className={`${s.type} ${s[`d${i + 1}` as "d1"]}`} x="90" y={60 + i * 22} width={i === 4 ? 80 : 140} height="8" rx="4" fill={i === 0 ? FLAME : INK} opacity={i === 0 ? 1 : 0.55} />
          ))}
          <rect className={s.blink} x="176" y="146" width="3" height="16" fill={FLAME} />
        </Frame>
      );
    case "ai-content":
      return (
        <Frame label={label}>
          {[0, 1, 2].map((i) => (
            <g key={i} className={`${s.cycle} ${s[`c${i + 1}` as "c1"]}`}>
              <rect x={52 + i * 76} y="70" width="64" height="84" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
              <circle cx={84 + i * 76} cy="100" r="14" fill={[FLAME, BLUE, "#0B1830"][i]} />
              <rect x={64 + i * 76} y="126" width="40" height="6" rx="3" fill={INK} opacity="0.4" />
            </g>
          ))}
          <path className={s.twinkle} d="M262 52 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5 z" fill={FLAME} />
          <path className={`${s.twinkle} ${s.d3}`} d="M60 40 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" fill={BLUE} />
          <path d="M150 178 h20" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <circle cx="160" cy="190" r="6" fill="none" stroke={INK} strokeWidth="2" />
        </Frame>
      );
    case "erp": {
      const mods = [
        [80, 56, "Finance"],
        [240, 56, "Staff"],
        [80, 164, "Stock"],
        [240, 164, "Clients"],
      ] as const;
      return (
        <Frame label={label}>
          {mods.map(([x, y]) => (
            <path key={`${x}${y}`} className={s.flow} d={`M160 110 L${x} ${y}`} stroke={FLAME} strokeWidth="2.5" strokeDasharray="6 8" />
          ))}
          <circle cx="160" cy="110" r="30" fill={BLUE} />
          <circle className={s.ring} cx="160" cy="110" r="30" fill="none" stroke={BLUE} strokeWidth="2" />
          <path d="M148 110 h24 M160 98 v24" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          {mods.map(([x, y, t], i) => (
            <g key={t} className={`${s.pop} ${s[`d${i + 1}` as "d1"]}`}>
              <rect x={x - 38} y={y - 17} width="76" height="34" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill={INK} fontFamily="inherit">{t}</text>
            </g>
          ))}
        </Frame>
      );
    }
    case "automation":
      return (
        <Frame label={label}>
          <path d="M70 110 H250" stroke={SOFT} strokeWidth="6" strokeLinecap="round" />
          {[70, 160, 250].map((x, i) => (
            <g key={x}>
              <rect x={x - 28} y="84" width="56" height="52" rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
              {i === 0 && <path d="M60 104 h20 M60 116 h14" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />}
              {i === 1 && <circle cx="160" cy="110" r="10" fill="none" stroke={BLUE} strokeWidth="3" className={s.spin} style={{ transformOrigin: "160px 110px" }} strokeDasharray="10 6" />}
              {i === 2 && <path d="M238 110 l9 9 l17 -19" fill="none" stroke={FLAME} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={s.draw} />}
            </g>
          ))}
          <circle className={s.travel} cx="70" cy="160" r="7" fill={FLAME} />
          <path d="M70 160 H250" stroke={FLAME} strokeWidth="2" strokeDasharray="4 6" opacity="0.5" />
          <text x="160" y="58" textAnchor="middle" fontSize="12" fill={INK} opacity="0.6" fontFamily="inherit">Approve once, runs every time</text>
        </Frame>
      );
    case "payments":
      return (
        <Frame label={label}>
          <rect x="112" y="30" width="96" height="164" rx="16" fill="#fff" stroke={INK} strokeWidth="2" />
          <rect x="146" y="40" width="28" height="5" rx="2.5" fill={INK} opacity="0.4" />
          <circle className={s.pop} cx="160" cy="100" r="26" fill={FLAME} />
          <path className={s.draw} d="M148 100 l9 9 l16 -18" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="130" y="140" width="60" height="7" rx="3.5" fill={INK} opacity="0.55" />
          <rect x="138" y="155" width="44" height="6" rx="3" fill={INK} opacity="0.3" />
          {[0, 1, 2].map((i) => (
            <circle key={i} className={`${s.coin} ${s[`d${i + 1}` as "d1"]}`} cx={236 + i * 14} cy={150 - i * 22} r="11" fill="#F6B28F" stroke={INK} strokeWidth="1.5" />
          ))}
          <path className={s.flow} d="M84 120 h28" stroke={BLUE} strokeWidth="3" strokeDasharray="5 6" />
          <rect x="44" y="104" width="40" height="32" rx="8" fill={BLUE} />
        </Frame>
      );
    case "dashboards":
      return (
        <Frame label={label}>
          <rect x="50" y="36" width="220" height="150" rx="14" fill="#fff" stroke={INK} strokeWidth="2" />
          {[52, 78, 64, 98, 86].map((h, i) => (
            <rect key={i} className={`${s.bar} ${s[`d${i + 1}` as "d1"]}`} x={76 + i * 36} y={164 - h} width="22" height={h} rx="5" fill={i === 3 ? FLAME : BLUE} opacity={i === 3 ? 1 : 0.8} style={{ transformOrigin: `0 164px` }} />
          ))}
          <path className={s.draw} d="M80 100 L116 82 L152 92 L188 60 L224 70" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle className={s.pulse} cx="188" cy="60" r="5" fill={FLAME} />
        </Frame>
      );
    case "assistant":
      return (
        <Frame label={label}>
          <g className={`${s.pop} ${s.d1}`}>
            <rect x="56" y="46" width="150" height="40" rx="14" fill={SOFT} />
            <rect x="70" y="62" width="100" height="8" rx="4" fill={INK} opacity="0.5" />
          </g>
          <g className={`${s.pop} ${s.d2}`}>
            <rect x="112" y="98" width="150" height="40" rx="14" fill={BLUE} />
            <rect x="126" y="114" width="110" height="8" rx="4" fill="#fff" opacity="0.85" />
          </g>
          <g className={`${s.pop} ${s.d3}`}>
            <rect x="56" y="150" width="78" height="32" rx="14" fill={SOFT} />
            {[0, 1, 2].map((i) => (
              <circle key={i} className={`${s.dot} ${s[`d${i + 1}` as "d1"]}`} cx={78 + i * 17} cy="166" r="4.5" fill={INK} opacity="0.55" />
            ))}
          </g>
          <path className={s.twinkle} d="M262 50 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5 z" fill={FLAME} />
        </Frame>
      );
    case "support":
      return (
        <Frame label={label}>
          <g className={s.spin} style={{ transformOrigin: "140px 112px" }}>
            <circle cx="140" cy="112" r="34" fill="none" stroke={BLUE} strokeWidth="14" strokeDasharray="14 10" />
            <circle cx="140" cy="112" r="20" fill="#fff" stroke={INK} strokeWidth="2" />
          </g>
          <g className={s.spinBack} style={{ transformOrigin: "206px 82px" }}>
            <circle cx="206" cy="82" r="20" fill="none" stroke={FLAME} strokeWidth="10" strokeDasharray="9 7" />
          </g>
          <path className={s.draw} d="M190 150 l12 12 l26 -28" fill="none" stroke={FLAME} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </Frame>
      );
  }
}
