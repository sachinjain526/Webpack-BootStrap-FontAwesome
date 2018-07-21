var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: "development",
  watch: true,
  resolve: {
    extensions: ['.js', '.scss']
  },
  entry: "./app/js/main.js",// it can be multiple file. For multiple file use array with proper path
  output: {// this is for output where you want to put your file after complete build process
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {// here we will load some external resource. which we are using to build our project
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,// it will find all js 
        use: "babel-loader",// which will perform some functioanlity during build process.
        exclude: path.resolve(__dirname, "node_modules")// expect this 
      }, {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
        exclude: path.resolve(__dirname, "node_modules")// expect this 
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './app/assets',
      to: 'assets'
    }]),
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      chunksSortMode: 'dependency'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 5000,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
}