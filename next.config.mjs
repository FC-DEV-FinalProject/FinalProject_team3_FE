/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['msw'],
  sassOptions: {
    includePaths: ['./shared/styles'],
    prependData: `
    @import "@/shared/styles/base/variables";
    @import "@/shared/styles/base/mixins";
    @import "@/shared/styles/base/functions";
  `,
  },
  async rewrites() {
    return [
      {
        source: '/api/users/:path*',
        destination: 'http://15.164.90.102:8081/api/users/:path*',
      },
      {
        source: '/login',
        destination: 'http://15.164.90.102:8081/login',
      },
      {
        source: '/api/:path*',
        destination: 'http://15.164.90.102:8081/api/:path*',
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/browser', alias: false })
      } else {
        config.resolve.alias['msw/browser'] = false
      }
    } else {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/node', alias: false })
      } else {
        config.resolve.alias['msw/node'] = false
      }
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
          },
        },
      ],
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fastcampus-team3.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
