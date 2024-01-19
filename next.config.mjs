/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "api.getwemap.com",
          pathname: "**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;