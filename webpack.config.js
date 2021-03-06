const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsConfigWebpackPlugin = require("ts-config-webpack-plugin");
const path = require("path");
require("dotenv").config();

// ______________________________________________________
//
// @ Webpack Config
//
module.exports = (env = { prod: false }) => [
  // ______________________________________________________
  //
  // @ Main Process
  //
  {
    name: "main",
    mode: env.prod ? "production" : "development",
    target: "electron-main",
    devtool: env.prod ? "" : "source-map",
    entry: path.join(__dirname, "src/main/main.ts"),
    node: {
      __dirname: false,
      __filename: false
    },
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "main.js"
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["dist/main.js", "dist/main.js.map"]
      }),
      new TsConfigWebpackPlugin()
    ]
  },
  // ______________________________________________________
  //
  // @ Renderer Process
  //
  {
    name: "renderer",
    mode: env.prod ? "production" : "development",
    target: "electron-renderer",
    devtool: env.prod ? "" : "source-map",
    entry: path.join(__dirname, "src/renderer/index.tsx"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "renderer.js"
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "dist/renderer.js",
          "dist/renderer.js.map",
          "dist/index.html"
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/template/index.html"
      }),
      new TsConfigWebpackPlugin()
    ]
  }
];
