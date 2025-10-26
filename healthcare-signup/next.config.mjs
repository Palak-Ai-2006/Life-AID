/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Domain configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? '/healthcare' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/healthcare' : '',
  // Turbopack configuration
  turbopack: {},
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    return config
  },
}

export default nextConfig
