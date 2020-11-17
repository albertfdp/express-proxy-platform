const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appConfig = require('./app.config');

module.exports = {
  mode: 'development',

  entry: {
    app: ['./src/index.js'],
  },

  devtool: 'inline-source-map',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [new HtmlWebpackPlugin()],

  devServer: {
    contentBase: './dist',
    port: appConfig.port,
  },
};
