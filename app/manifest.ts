import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flame Connect",
    short_name: "Flame Connect",
    description: "Practical AI for African progress.",
    start_url: "/",
    display: "browser",
    background_color: "#FBF7F0",
    theme_color: "#071B52",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
