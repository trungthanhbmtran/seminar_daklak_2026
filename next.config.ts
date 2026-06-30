import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true,
  output: 'standalone',
  // allowedDevOrigins: ['113.176.130.161'],
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
};

export default nextConfig;
