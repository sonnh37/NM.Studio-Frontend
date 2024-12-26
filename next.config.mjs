// const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Tắt ESLint trong build
  },
  // webpack: (config, { isServer }) => {
  //   // Cấu hình alias cho yjs
  //   if (!isServer) {
  //     config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
  //   }
    
  //   return config;
  // },
};

export default nextConfig;
