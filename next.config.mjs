/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
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
