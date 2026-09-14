/** Brand mark — flame F monogram drawn as inline SVG (no raster needed). */
export function FlameMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="fm-grad" x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#93300A" />
          <stop offset="0.55" stopColor="#E9521D" />
          <stop offset="1" stopColor="#FFB020" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22.5" fill="#071B52" />
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="rgba(255,176,32,.35)" strokeWidth="1.5" />
      <path
        d="M24.5 8.5c1.6 5.2 6.4 8 6.4 14a7 7 0 0 1-14 0c0-2.5 1.1-4.5 2.6-6.4.4 2 1.4 3 3 3.5-.9-3.6.1-7.9 2-11.1Z"
        fill="url(#fm-grad)"
      />
      <path d="M16 30.5h16M19.5 35h9" stroke="#FFD9C8" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
