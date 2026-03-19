import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows importing images from /public directly
  images: {
    unoptimized: false,
  },
  // Enable static export for Cloudflare Pages deploy (uncomment if needed)
  // output: "export",
};

export default nextConfig;
