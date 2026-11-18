import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flame Connect",
    short_name: "Flame Connect",
    description: "Flame Connect — Digitizing Africa.",
    start_url: "/",
    display: "browser",
    background_color: "#07111F",
    theme_color: "#07111F",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
