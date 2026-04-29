/** @type {import('next').NextConfig} */
const backendBaseUrl = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [],
  },
  env: {
    // Use same-origin proxy by default to avoid browser CORS/network issues.
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendBaseUrl}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
