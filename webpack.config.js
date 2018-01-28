const path = require('path')
const webpack = require('webpack')
// const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    entry: './src/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      }

    ]
  },
  plugins: [
    // new uglify(),
    new htmlPlugin({
      minify:{
        // 去掉id="box"中的引号
        removeAttributeQuotes:true
      },
      // 不会产生缓存
      hash:true,
      // 模板
      template:'./src/index.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.109',
    compress: true,
    port: 9527
  }
}