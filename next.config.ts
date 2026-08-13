import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // De kennisbank van de site-agent wordt op runtime van schijf gelezen
  // (lib/site-agent/kennisbank.ts). Zonder deze regel kan de tracing die
  // bestanden missen en valt de agent op Vercel om terwijl hij lokaal werkt.
  outputFileTracingIncludes: {
    '/api/v1/site-agent/**': ['./content/site-agent/**/*'],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/diensten",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/kennis",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/kennis/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
