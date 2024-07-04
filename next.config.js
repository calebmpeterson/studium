/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 1024 * 192, // 192kB
  },
};

module.exports = nextConfig;
