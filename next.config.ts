import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Abaikan error ESLint saat build (misalnya di Vercel)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
