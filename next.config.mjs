/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["shiki"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
