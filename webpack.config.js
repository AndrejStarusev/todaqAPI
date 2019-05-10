
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const env = require('yargs').argv.env;

const optimization = {};
const devServer = {
  port: 3000,
  historyApiFallback: {
    index: './index.html'
  },
  inline: true
};

if (env === 'build') {
  devServer.contentBase = __dirname + '/build';
  optimization.minimizer = [new UglifyJsPlugin()];
}

const config = {
    entry: { app: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader:'babel-loader',
          },
          exclude:  [/node_modules/, /build/],
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
    ],
    resolve: {
      extensions: ['.js']
    },
    devServer,
    optimization,
}

module.exports = config;