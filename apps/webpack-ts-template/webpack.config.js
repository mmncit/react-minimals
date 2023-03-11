const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
  const extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx"];
  const mainFields = ["browser", "module", "main"];

  const { mode = "development" } = argv;
  const prod = mode === "production";

  const config = {
    entry: { index: path.resolve(__dirname, "/src/index") },
    resolve: {
      extensions,
      mainFields,
      plugins: [new TsconfigPathsPlugin({ extensions, mainFields })],
    },
    output: {
      path: path.resolve(__dirname, "public", "build"),
      filename: "[name].js",
      chunkFilename: "[name].[id].js",
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            /**
             * MiniCssExtractPlugin doesn't support HMR.
             * For developing, use 'style-loader' instead.
             * */
            prod ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.tsx?$/,
          // use: 'ts-loader',
          exclude: /(node_modules)/,
          use: [
            {
              loader: "ts-loader",
              options: { transpileOnly: true },
            },
          ],
        },
        {
          test: /\.(png|jpg|svg|json|ico)$/,
          use: [{ loader: "url-loader" }],
        },
      ],
    },
    mode,
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    devtool: prod ? false : "source-map",
    devServer: {
      writeToDisk: true,
      port: 9000,
    },
  };
  return config;
};
