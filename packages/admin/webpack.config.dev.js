const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJson = require('./package.json');

module.exports = {
  mode: 'development',

  entry: {
    app: ['./src/index.js'],
  },

  devtool: 'inline-source-map',

  output: {
    filename: '[name].js',
    publicPath: `http://localhost:${packageJson.application.port}`,
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [new HtmlWebpackPlugin()],

  devServer: {
    quiet: true,
    noInfo: true,
    historyApiFallback: true,
    port: packageJson.application.port,
  },
};
