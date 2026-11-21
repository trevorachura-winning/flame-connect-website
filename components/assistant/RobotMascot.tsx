import s from "../../styles/assistant.module.css";

/** Original Flame Connect help robot: navy head, orange antenna glow, blinking eyes. */
export function RobotMascot({ size = 44 }: { size?: number }) {
  return (
    <svg className={s.mascot} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <line x1="32" y1="6" x2="32" y2="15" stroke="#07111F" strokeWidth="3" strokeLinecap="round" />
      <circle className={s.bulb} cx="32" cy="6" r="4.5" fill="#F4511E" />
      <rect x="9" y="14" width="46" height="36" rx="14" fill="#07111F" />
      <rect x="15" y="20" width="34" height="22" rx="9" fill="#13243E" />
      <g className={s.eyes}>
        <rect x="21" y="26" width="7" height="9" rx="3.5" fill="#8FB0FF" />
        <rect x="36" y="26" width="7" height="9" rx="3.5" fill="#8FB0FF" />
      </g>
      <path d="M26 38 q6 4 12 0" fill="none" stroke="#F4511E" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="4" y="26" width="6" height="12" rx="3" fill="#F4511E" />
      <rect x="54" y="26" width="6" height="12" rx="3" fill="#F4511E" />
      <rect x="22" y="50" width="20" height="8" rx="4" fill="#07111F" />
    </svg>
  );
}
