const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    host: '0.0.0.0',
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html',
      favicon: __dirname + '/public/favicon.svg',
      inject: 'body',
    }),
  ],
  output: {
    publicPath: '',
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1, modules: true },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /\.module\.css$/],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          esModule: false,
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
    ],
  },
};
