import type { NextConfig } from "next";

const r2Origin = process.env.R2_PUBLIC_BASE_URL
  ? new URL(process.env.R2_PUBLIC_BASE_URL)
  : null;

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      ...(r2Origin
        ? [
            {
              protocol: "https" as const,
              hostname: r2Origin.hostname,
              port: "",
              pathname: "/projects/**",
              search: "",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
      },
    ],
  },
};

export default nextConfig;
