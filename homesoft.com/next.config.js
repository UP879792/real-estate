/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', '172.20.10.4', 'real-estate-7.onrender.com'],
  },
  env: {
    API_BASE_URL: 'https://real-estate-7.onrender.com',
  },
};

module.exports = nextConfig;
