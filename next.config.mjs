/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io"
      }
    ]
  }
};

export default nextConfig;