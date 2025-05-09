/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["emilistapi.vercel.app", "res.cloudinary.com"],
    unoptimized: true,
  },
  trailingSlash: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
