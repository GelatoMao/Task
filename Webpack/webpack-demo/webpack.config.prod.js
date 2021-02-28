const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.config.base')

module.exports = {
  ...base,
  mode: 'production',
  plugins: [...base.plugins, new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css',  // contenthash设置缓存文件
  })],
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};


