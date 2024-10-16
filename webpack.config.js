const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js", // 项目的入口文件
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/Monster-dict/", // 将输出目录设置为 build
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "babel-plugin-styled-components",
              "@babel/plugin-proposal-nullish-coalescing-operator",
              "@babel/plugin-proposal-optional-chaining",
            ],
          },
        },
      },
      {
        test: /\.scss$/, // 处理 .scss 文件
        use: ["style-loader", "css-loader", "sass-loader"], // 添加 sass-loader
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // 处理图片文件
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]", // 输出图片时的文件名格式
              outputPath: "images", // 输出到 build/images 目录下
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "build"), // 修改 static 文件夹为 build
    compress: true,
    port: 3000,
    historyApiFallback: true, // 支持 BrowserRouter 的刷新和路由
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"), // 生成 index.html
      publicPath: "/Monster-dict/",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public", // 从 public 文件夹复制资源
          to: ".", // 复制到 build 根目录
          globOptions: {
            ignore: ["**/index.html"], // 忽略复制 index.html
          },
        },
      ],
    }),

    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify('/Monster-dict'), // 定义 PUBLIC_URL
    }),
  ],
  mode: "development",
};
