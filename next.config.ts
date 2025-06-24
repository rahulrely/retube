import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() { // it rewrite source(beforeFiles) to destination(Files)
    return [
      {
        source: '/api/:path*', 
        destination: "https://retube2v.onrender.com/api/v1/:path*", ///api/v1/users/register
        // destination: "http://localhost:8000/api/v1/:path*", ///api/v1/users/register
      },
    ];
  },
};

export default nextConfig;