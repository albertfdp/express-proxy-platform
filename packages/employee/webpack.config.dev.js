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
    publicPath: `http://localhost:${appConfig.port}`,
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [new HtmlWebpackPlugin()],

  devServer: {
    contentBase: './dist',
    quiet: true,
    noInfo: true,
    historyApiFallback: true,
    port: appConfig.port,
  },
};
