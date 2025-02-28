/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['donorbox.org']
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