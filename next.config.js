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
  }

