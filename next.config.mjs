/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/waitlist',
        destination: 'https://cafedeawaitlist.vercel.app/join',
        permanent: false,
      },
      {
        source: '/waitlist/:path*',
        destination: 'https://cafedeawaitlist.vercel.app/join',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
