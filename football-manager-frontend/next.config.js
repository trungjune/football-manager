/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Cấu hình cho Next.js 15
  experimental: {
    // Kích hoạt React 19 features
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Kích hoạt Server Components
    serverComponents: true,
    // Tối ưu hóa bundle
    optimizeCss: true,
    // Tối ưu hóa hình ảnh
    optimizeImages: true,
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