import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Dynamic server mode enabled (SSR, API Routes & Server Actions)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
      },
    ],
  },
};

export default nextConfig;
