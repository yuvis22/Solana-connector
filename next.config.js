/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  assetPrefix: ".",
  images: {
    unoptimized: true,
  },
  basePath: "",
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    // Add rule for handling wallet adapter
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    // Optimize chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          // Merge all chunks into a single chunk
          commons: {
            name: "commons",
            chunks: "all",
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
    };

    return config;
  },
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
