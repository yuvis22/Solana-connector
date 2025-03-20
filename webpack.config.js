const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/popup.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      vm: require.resolve("vm-browserify"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name(module, chunks, cacheGroupKey) {
        const allChunksNames = chunks.map((item) => item.name).join("~");
        return `chunk-${allChunksNames}`;
      },
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
};
