/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'donorbox.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ]
  },
  // Add this to ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src')
    }
    return config
  }
}

module.exports = nextConfig 