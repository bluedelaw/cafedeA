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
        source: '/:path*',
        has: [{ type: 'host', value: 'www.cafedea.ca' }],
        destination: 'https://cafedea.ca/:path*',
        permanent: true,
      },
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
