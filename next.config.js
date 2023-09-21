/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'db.irowiki.org',
          port: '',
          pathname: '/image/item/**',
        },
      ],
    },
  }

