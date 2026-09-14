import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Flame Connect — Practical AI for African progress";

export const runtime = "nodejs";

const flameSvg = (sizePx: number) => {
  const grad = `<defs><linearGradient id="g" x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#93300A"/><stop offset=".55" stop-color="#E9521D"/><stop offset="1" stop-color="#FFB020"/></linearGradient></defs>`;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${sizePx}" height="${sizePx}" viewBox="0 0 48 48">${grad}<circle cx="24" cy="24" r="23" fill="none" stroke="rgba(255,176,32,.4)" stroke-width="1.2"/><path d="M24.5 8.5c1.6 5.2 6.4 8 6.4 14a7 7 0 0 1-14 0c0-2.5 1.1-4.5 2.6-6.4.4 2 1.4 3 3 3.5-.9-3.6.1-7.9 2-11.1Z" fill="url(#g)"/><path d="M16 30.5h16M19.5 35h9" stroke="#FFD9C8" stroke-width="2.2" stroke-linecap="round"/></svg>`
  )}`;
};

export default async function OgImage() {
  const heroPath = path.join(process.cwd(), "public", "images", "home-hero.jpg");
  const hero = await readFile(heroPath);
  const heroUri = `data:image/jpeg;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "linear-gradient(140deg, #0B2F88 0%, #071B52 62%, #0A1740 100%)",
          color: "#fff",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-120px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(233,82,29,.42), transparent 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px",
            width: "60%",
            height: "100%",
            gap: "22px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img src={flameSvg(64)} width={64} height={64} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 800 }}>Flame Connect</span>
              <span style={{ fontSize: 15, letterSpacing: 4, color: "#9FB0DD", textTransform: "uppercase" }}>
                AI Centre of Change
              </span>
            </div>
          </div>
          <span style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Practical AI for <span style={{ color: "#FFB020" }}>African progress.</span>
          </span>
          <span style={{ fontSize: 24, color: "#C9D6F5", lineHeight: 1.4 }}>
            Services, practical tools, learning and community — built in Uganda for African work.
          </span>
          <span style={{ fontSize: 18, color: "#FFD9C8" }}>flameconnect · Assess. Learn. Improve. Implement.</span>
        </div>
        <div style={{ display: "flex", width: "40%", height: "100%", overflow: "hidden" }}>
          <img
            src={heroUri}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.92 }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
