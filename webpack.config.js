const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // 项目的入口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,  // 处理 .scss 文件
        use: ['style-loader', 'css-loader', 'sass-loader'],  // 添加 sass-loader
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,  // 处理图片文件
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',  // 输出图片时的文件名格式
              outputPath: 'images',          // 输出到 dist/images 目录下
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true, // 支持 BrowserRouter 的刷新和路由
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),  // 从项目根目录加载 index.html
    }),
  ],
  mode: 'development',
};
