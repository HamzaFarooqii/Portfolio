import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance optimizations for production */
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
