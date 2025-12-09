import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

    if (!backend) {
      throw new Error("NEXT_PUBLIC_BACKEND_DOMAIN is not defined");
    }

    return [{ source: "/api/:path*", destination: `${backend}/:path*` }];
  },
};

export default nextConfig;
