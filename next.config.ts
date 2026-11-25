import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Dev da telefono sulla stessa rete (npm run dev → http://<IP-del-Mac>:3000):
  // Next blocca le risorse di sviluppo (HMR, chunk) per origini diverse da localhost.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
