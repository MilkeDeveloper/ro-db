/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: ('static.ragnaplace.com'),
          port: '',
          pathname: ('/bro/item/**'),
        },
        
      ],
      
    },

    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://ragnapi.com/api/v1/re-newal/monsters/:path*'
        }
      ]
    }
  }

