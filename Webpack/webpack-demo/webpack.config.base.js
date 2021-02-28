const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.[contenthash].js'
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'My App',
    template: 'src/assets/index.html'
  })],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.styl$/i,
        loader: ["style-loader", "css-loader", "stylus-loader"], // compiles stylus to CSS
      },
      {
        test: /\.less$/i,
        loader: ["style-loader", "css-loader", "less-loader"], // compiles Less to CSS
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS 
          // 将字符串改成对象 使用dart-scss去编译
          {
            loader: 'sass-loader',
            options: { implementation: require('dart-sass') }
          }
        ],
      },
    ],
  },
};


