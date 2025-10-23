import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "http://localhost:3000",   // ✅ Your local Next.js dev server
    "http://192.168.1.34:3000" // ✅ Your LAN IP (if accessing from mobile or another device)
  ],
};

export default nextConfig;
