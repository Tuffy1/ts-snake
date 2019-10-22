const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = {
  devtool: "source-map",
  entry: "./src/index.ts",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    compress: true,
    port: 3000,
    hotOnly: true,
    publicPath: "http://localhost:3000"
  }
};

module.exports = config;
