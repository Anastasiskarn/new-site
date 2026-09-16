import type { NextConfig } from "next";
const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  webpack(webpackConfig) {
    // @splinetool/runtime points `new URL("../libs/draco/...", import.meta.url)` at decoder files the package does
    // not ship, which webpack would try to bundle as assets. Leave those URLs to the runtime; the homepage robot
    // scene (components/robot-companion) never needs the Draco decoder.
    webpackConfig.module.rules.push({
      test: /[\\/]node_modules[\\/]@splinetool[\\/]runtime[\\/]/,
      parser: { url: false },
    });
    return webpackConfig;
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aianchor.online" }],
        destination: "https://aianchor.online/:path*/",
        permanent: true,
      },
      ...["en", "gr"].map((lang) => ({
        source: `/${lang}/gdpr`,
        destination: `/${lang}/dpa/`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
export default config;
