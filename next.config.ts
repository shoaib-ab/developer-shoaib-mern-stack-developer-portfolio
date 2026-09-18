import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Increase the body size limit to support file uploads (resumes up to 16MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "16mb",
    },
  },
};

export default nextConfig;
