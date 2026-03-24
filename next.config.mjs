/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ["ik.imagekit.io"],
  },
};

export default nextConfig;
