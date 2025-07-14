const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/Comments.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devServer: {
    static: "./dist",
    port: 8000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Notes",
      template: "./src/Comments.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ESLintPlugin({
      extensions: ["js"],
      exclude: ["node_modules/**", "dist/**", "**/*.config.js"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
};
