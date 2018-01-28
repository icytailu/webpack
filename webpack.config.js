const path = require('path');
module.exports = {
  entry: {
    entry: './src/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    filename: 'bundle.js'
  },
  module: {

  },
  plugins: [

  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.109',
    compress: true,
    port: 9527
  }
}