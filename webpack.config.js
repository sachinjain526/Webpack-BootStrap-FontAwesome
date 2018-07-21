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
        },
        {
          loader: "css-loader"
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        },
        {
          loader: "sass-loader"
        }],
        exclude: path.resolve(__dirname, "node_modules")// expect this 
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }
        ]
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