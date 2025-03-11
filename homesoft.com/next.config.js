/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', '172.20.10.4', 'real-estate-7.onrender.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
  },
  env: {
    API_BASE_URL: 'https://real-estate-7.onrender.com',
  },
};

module.exports = nextConfig;
