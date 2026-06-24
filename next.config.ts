import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true,
  output: 'standalone',
  // allowedDevOrigins: ['14.174.183.97'],
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
};

export default nextConfig;
