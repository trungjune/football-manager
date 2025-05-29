/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Cấu hình cho Next.js 14
  experimental: {
    // Kích hoạt Server Actions
    serverActions: true,
    // Tối ưu hóa bundle
    optimizePackageImports: ['@ant-design/icons', '@heroicons/react'],
    // Tối ưu hóa fonts
    optimizeFonts: true,
  },
  // Cấu hình image domains
  images: {
    domains: ['localhost', 'my-football-manager.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Cấu hình headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;