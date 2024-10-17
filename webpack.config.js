const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // 项目的入口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
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
    static: path.join(__dirname, 'dist'),  // 修改 static 文件夹为 dist
    compress: true,
    port: 3000,
    historyApiFallback: true, // 支持 BrowserRouter 的刷新和路由
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),  // 生成 index.html
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',  // 從 public 文件夹复制资源
          to: '.',         // 複製到 dist 根目錄
          globOptions: {
            ignore: ['**/index.html'],  // 忽略複製 index.html
          },
        },
      ],
    }),
  ],
  mode: 'development',
};