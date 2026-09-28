import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: process.env.NODE_ENV === "production" ? "https://farmatk-2150f.web.app" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
