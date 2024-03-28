/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // Redirect /book/chapter:verse to /book/chapter#verse
        source: "/:book/:chapter\\::verse",
        destination: "/:book/:chapter#:verse",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
