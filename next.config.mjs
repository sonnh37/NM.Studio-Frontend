/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["shiki"],
  reactStrictMode: false,
  images: {
    unoptimized: true,
    path: "/",
    remotePatterns: [
      {
        protocol: "https",
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
