/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // NEXT_OUTPUT=export produces a fully static demo build in out/ (no server needed
  // beyond any static file host; /api routes are excluded by scripts/build-static.mjs).
  ...(isExport ? { output: "export", trailingSlash: true } : {}),
  // Preview/sandbox hosts allowed to talk to the dev server (Next 15 dev-origin protection).
  allowedDevOrigins: ["*.e2b.app", "*.arena.ai", "*.arena-ai.com"],
  images: {
    ...(isExport ? { unoptimized: true } : {}),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1600],
  },
  async headers() {
    if (isExport) return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
