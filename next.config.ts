import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.datasolace.com',
        port: '',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'staging-cms.datasolace.com',
        port: '',
        pathname: '/api/media/file/**',
      },
    ],
  },
};

export default nextConfig;
