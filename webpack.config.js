const path = require('path')
const webpack = require('webpack')
// const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require("extract-text-webpack-plugin")

const website = {
  publicPath: 'http://192.168.1.109:9527/'
}

module.exports = {
  entry: {
    entry: './src/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    filename: 'bundle.js',
    publicPath: website.publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },{
        test:/\.(png|jpg|gif|jpeg)$/ ,
        use:[{
            loader:'url-loader',
            options:{
                limit:5000,
                outputPath:'images/',
            }
        }]
      }, {
        test: /\.(htm|html)$/i,
        use: [{
          loader: 'html-loader'
        }]
      }, {
        test: /\.styl$/,
        use: extractTextPlugin.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "stylus-loader"
            }],
            // use style-loader in development
            // sass less 一样的步骤
            fallback: "style-loader"
        })
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
    }),
    new extractTextPlugin('css/index.css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.109',
    compress: true,
    port: 9527
  }
}