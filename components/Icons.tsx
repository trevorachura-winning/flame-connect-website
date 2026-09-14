import type { ReactElement, SVGProps } from "react";

export type IconName =
  | "arrow-right" | "arrow-up-right" | "check" | "plus" | "menu" | "x"
  | "external" | "shield" | "spark" | "gauge" | "workflow" | "megaphone"
  | "compass" | "users" | "book" | "chart" | "flask" | "lock" | "eye"
  | "globe" | "linkedin" | "github" | "xsocial" | "mail" | "map-pin"
  | "handshake" | "graduation" | "target" | "layers";

const PATHS: Record<IconName, ReactElement> = {
  "arrow-right": <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  "arrow-up-right": <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  x: <><path d="m5 5 14 14" /><path d="m19 5-14 14" /></>,
  external: <><path d="M13 5h6v6" /><path d="M19 5 9 15" /><path d="M19 13.5V19H5V5h5.5" /></>,
  shield: <><path d="M12 3 5 5.8v5.4c0 4.5 3 8.2 7 9.8 4-1.6 7-5.3 7-9.8V5.8L12 3Z" /><path d="m9 11.5 2.2 2.2L15.5 9" /></>,
  spark: <><path d="M12 3v3" /><path d="M12 18v3" /><path d="M3 12h3" /><path d="M18 12h3" /><path d="m5.6 5.6 2.1 2.1" /><path d="m16.3 16.3 2.1 2.1" /><path d="m18.4 5.6-2.1 2.1" /><path d="m7.7 16.3-2.1 2.1" /></>,
  gauge: <><path d="M5 19a9 9 0 1 1 14 0" /><path d="m12 13 4-5" /><circle cx="12" cy="13" r="1.4" /></>,
  workflow: <><rect x="3" y="3" width="5.5" height="5.5" rx="1.2" /><rect x="15.5" y="15.5" width="5.5" height="5.5" rx="1.2" /><path d="M8.5 5.75h6A3.5 3.5 0 0 1 18 9.25v6.25" /></>,
  megaphone: <><path d="M4 10v4l3 .5V9.5L4 10Z" /><path d="M7 9.5 18 5v14l-11-4.5" /><path d="M9 15.5 10 19a2 2 0 0 0 4 0" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19.5c.7-3.2 2.8-5 5.5-5s4.8 1.8 5.5 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.6c2.3.2 3.7 1.7 4.2 4.4" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" /></>,
  chart: <><path d="M4 4v16h16" /><path d="M8 15v-4" /><path d="M12 15V7" /><path d="M16 15v-2" /></>,
  flask: <><path d="M10 3h4" /><path d="M10 3v5.5L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.5V3" /><path d="M7.5 14.5h9" /></>,
  lock: <><rect x="5.5" y="10.5" width="13" height="9.5" rx="1.8" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.6" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.8 2.6 4 5.7 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.7-4-9s1.2-6.4 4-9Z" /></>,
  linkedin: <><rect x="3.5" y="9" width="3.6" height="11" rx="0.6" /><circle cx="5.3" cy="5.4" r="2" /><path d="M10.5 9h3.4v1.8c.6-1.1 1.9-2 3.7-2 2.7 0 3.9 1.7 3.9 4.8V20h-3.6v-5.7c0-1.6-.6-2.6-1.9-2.6-1.4 0-2 1-2 2.6V20h-3.5V9Z" /></>,
  github: <path d="M12 3a9 9 0 0 0-2.85 17.55c.45.08.62-.2.62-.44v-1.7c-2.5.55-3-1.07-3-1.07-.41-1.04-1-1.32-1-1.32-.82-.55.06-.54.06-.54.9.06 1.38.93 1.38.93.8 1.38 2.11.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.1-.23-.4-1.15.08-2.4 0 0 .76-.24 2.48.92a8.6 8.6 0 0 1 4.52 0c1.72-1.16 2.48-.92 2.48-.92.48 1.25.18 2.17.09 2.4.58.63.92 1.44.92 2.42 0 3.46-2.1 4.22-4.11 4.44.32.28.6.83.6 1.68v2.49c0 .24.17.53.63.44A9 9 0 0 0 12 3Z" />,
  xsocial: <path d="M4 4l7.2 9.3L4.5 20h2.3l5.5-5.5L16.6 20H20l-7.4-9.6L18.9 4h-2.3l-4.8 5L7.4 4H4Z" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="1.8" /><path d="m4 7 8 6 8-6" /></>,
  "map-pin": <><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" /></>,
  handshake: <><path d="m8.5 12.5 3.2 3.1a1.6 1.6 0 0 0 2.4-2" /><path d="m4 7 4.5-2L12 7.5 20 7l1 8-5 4-3.5-3.5" /><path d="M4 7v8l4 3 4.5-2.4" /></>,
  graduation: <><path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z" /><path d="M6.5 11.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5" /><path d="M21.5 9v5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m4.5 12.5 7.5 4.2 7.5-4.2" /><path d="m4.5 16.5 7.5 4.2 7.5-4.2" /></>,
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.8,
  ...rest
}: { name: IconName; size?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="ic"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
