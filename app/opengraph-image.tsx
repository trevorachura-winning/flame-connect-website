import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Flame Connect — Practical AI for African progress";

export const runtime = "nodejs";
export const dynamic = "force-static";

export default async function OgImage() {
  const hero = await readFile(path.join(process.cwd(), "public", "images", "home-hero.jpg"));
  const heroUri = `data:image/jpeg;base64,${hero.toString("base64")}`;
  // Mark comes from the canonical brand file — update
  // public/brand/flame-connect-mark.svg and the OG card follows automatically.
  const markFile = await readFile(
    path.join(process.cwd(), "public", "brand", "flame-connect-mark.svg"),
    "utf8"
  );
  const markSvg = (px: number) =>
    `data:image/svg+xml,${encodeURIComponent(
      markFile
        .replace(/<\?xml[\s\S]*?\?>/, "") // satori rejects the XML prolog in data-URI SVGs
        .replace(/<!--[\s\S]*?-->/g, "")
        .trim()
        .replace("<svg ", `<svg width="${px}" height="${px}" `)
    )}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "linear-gradient(140deg, #0F1D33 0%, #07111F 62%, #04090F 100%)",
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
            background: "radial-gradient(circle, rgba(244,81,30,.42), transparent 65%)",
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
            <img src={markSvg(64)} width={64} height={64} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: "#F4511E" }}>Flame Connect</span>
              <span style={{ fontSize: 15, letterSpacing: 4, color: "#A9BBDF", textTransform: "uppercase" }}>
                AI Centre of Change
              </span>
            </div>
          </div>
          <span style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Practical AI for <span style={{ color: "#F4511E" }}>African progress.</span>
          </span>
          <span style={{ fontSize: 24, color: "#C5D4F5", lineHeight: 1.4 }}>
            Services, practical tools, learning and community — Uganda outward to Africa.
          </span>
          <span style={{ fontSize: 18, color: "#FFD9C8" }}>Assess. Learn. Improve. Implement.</span>
        </div>
        <div style={{ display: "flex", width: "40%", height: "100%", overflow: "hidden" }}>
          <img src={heroUri} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.92 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
