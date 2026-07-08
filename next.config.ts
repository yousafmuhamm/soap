import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Legacy multi-product routes → the single-product pages.
  async redirects() {
    return [
      { source: "/collection", destination: "/product", permanent: true },
      { source: "/collection/:slug", destination: "/product", permanent: true },
      { source: "/journal", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
