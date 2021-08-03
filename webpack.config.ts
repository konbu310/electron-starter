const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = [
  // Main
  {
    name: "main",
    mode: isProduction ? "production" : "development",
    target: "electron-main",
    devtool: isProduction ? "hidden-nosources-source-map" : "eval-source-map",
    entry: path.join(__dirname, "src/main/main.ts"),
    context: __dirname,
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
          exclude: /node_modules/,
          use: [
            {
              loader: "thread-loader",
              options: {
                name: "main-ts-loader-pool",
                workers: 2,
                workerParallelJobs: 80,
                workerNodeArgs: ["--max-old-space-size=512"],
              },
            },
            {
              loader: "esbuild-loader",
              options: {
                loader: "ts",
                minify: isProduction,
                target: "es2020",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, "node_modules")],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["dist/main.js", "dist/main.js.map"],
      }),
    ].filter(Boolean),
  },
  // Renderer
  {
    name: "renderer",
    mode: isProduction ? "production" : "development",
    target: "electron-renderer",
    devtool: isProduction ? "hidden-nosources-source-map" : "eval-source-map",
    entry: path.join(__dirname, "src/renderer/index.tsx"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "renderer.js",
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "thread-loader",
              options: {
                name: "main-ts-loader-pool",
                workers: 2,
                workerParallelJobs: 80,
                workerNodeArgs: ["--max-old-space-size=512"],
              },
            },
            {
              loader: "esbuild-loader",
              options: {
                loader: "ts",
                minify: isProduction,
                target: "es2020",
              },
            },
          ],
        },
        {
          test: /.tsx$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "thread-loader",
              options: {
                name: "renderer-ts-loader-pool",
                workers: 2,
                workerParallelJobs: 80,
                workerNodeArgs: ["--max-old-space-size=512"],
              },
            },
            {
              loader: "esbuild-loader",
              options: {
                loader: "tsx",
                minify: isProduction,
                target: "es2020",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, "node_modules")],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
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
  // Preload
  {
    name: "preload",
    mode: isProduction ? "production" : "development",
    target: "electron-preload",
    entry: path.join(__dirname, "src/common/preload.ts"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "preload.js",
    },
    devtool: isProduction ? "hidden-nosources-source-map" : "eval-source-map",
    module: {
      rules: [
        {
          test: /.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "thread-loader",
              options: {
                name: "preload-ts-loader-pool",
                workers: 2,
                workerParallelJobs: 80,
                workerNodeArgs: ["--max-old-space-size=512"],
              },
            },
            {
              loader: "esbuild-loader",
              options: {
                loader: "ts",
                minify: isProduction,
                target: "es2020",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, "node_modules")],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "dist/preload.js",
          "dist/preload.js.map",
        ],
      }),
    ].filter(Boolean),
  },
];
