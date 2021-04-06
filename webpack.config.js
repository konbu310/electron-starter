const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = [
  // Main Process
  {
    name: "main",
    mode: isProduction ? "production" : "development",
    target: "electron-main",
    devtool: isProduction ? undefined : "eval-source-map",
    entry: path.join(__dirname, "src/main/main.ts"),
    node: {
      __dirname: false,
      __filename: false,
    },
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["dist/main.js", "dist/main.js.map"],
      }),
    ].filter(Boolean),
  },
  // Renderer Process
  {
    name: "renderer",
    mode: isProduction ? "production" : "development",
    target: "electron-renderer",
    devtool: isProduction ? undefined : "eval-source-map",
    entry: path.join(__dirname, "src/renderer/index.tsx"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "renderer.js",
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "dist/renderer.js",
          "dist/renderer.js.map",
          "dist/index.html",
        ],
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/template/index.html",
      }),
    ].filter(Boolean),
  },
];
