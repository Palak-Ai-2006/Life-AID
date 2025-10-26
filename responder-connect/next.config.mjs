/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Domain configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? '/responder' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/responder' : '',
  // Turbopack configuration (Next.js 16 default)
  turbopack: {},
  // Keep webpack for build compatibility
  webpack: (config) => {
    // Resolve mapbox-gl worker files
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Enable source maps for mapbox-gl
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    }

    return config
  },
}

export default nextConfig
