/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ! DO NOT COMMIT !
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
