import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.ziyadbooks.net",
        pathname: "/products/**",
      },
    ],
  },
};

export default nextConfig;
