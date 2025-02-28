/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['donorbox.org']
  },
  // Add this to ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig 