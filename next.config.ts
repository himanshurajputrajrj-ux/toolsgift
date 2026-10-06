import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the module-resolution/tracing root to this project directory so
  // lockfiles found elsewhere on the machine (e.g. the user home directory)
  // are not picked up.
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=(), payment=(), browsing-topics=()" },
        { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'" },
      ],
    },
  ],
};

export default nextConfig;
