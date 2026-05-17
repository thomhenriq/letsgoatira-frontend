import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kbxrfnmvvinkuohjevzx.supabase.co'
      }
    ]
  }
};

export default nextConfig;
