import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aj-lms-practice.fly.storage.tigris.dev",
      },
    ],
  },
};

export default nextConfig;
