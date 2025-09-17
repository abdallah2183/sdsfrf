/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // لـ Docker
  images: { domains: ['localhost'] },
};

module.exports = nextConfig;
