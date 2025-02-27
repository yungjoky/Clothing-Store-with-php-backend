/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.trace.moe', 'i.trace.moe'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.trace.moe',
      },
    ],
  },
};

export default nextConfig;
