import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.symspacelabs.com',
        port: '',
        pathname: '/file/**',
      },
      {
        protocol: 'https',
        hostname: 'media.symspacelabs.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;