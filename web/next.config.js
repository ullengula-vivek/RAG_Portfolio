/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // or 'export' if you want static
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static exports
  },
  // Add this if you have environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

export default nextConfig