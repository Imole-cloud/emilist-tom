/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["emilistapi.vercel.app", "res.cloudinary.com"],
    unoptimized: true,
  },
  output: 'export',
  distDir: '.next',
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
