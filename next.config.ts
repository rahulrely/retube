import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() { // it rewrite source(beforeFiles) to destination(Files)
    return [
      {
        source: '/api/:path*', 
        // destination: "https://machine.retube.live/api/v1/:path*", ///api/v1/users/register
        // destination: "http://localhost:8000/api/v1/:path*", ///api/v1/users/register
        destination : `${process.env.BACKEND_URL}/api/v1/:path*`
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;