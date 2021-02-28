const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config.base')

module.exports = {
  // 将base中的内容继承过来
  ...base,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  mode: 'development',
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
};


