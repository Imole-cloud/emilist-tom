/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["emilistapi.vercel.app", "res.cloudinary.com"],
    unoptimized: true,
  },
  output: 'standalone',
  trailingSlash: true,
  swcMinify: true,
};

module.exports = nextConfig;
