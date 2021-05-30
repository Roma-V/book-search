const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const BASE_PATH = process.env.BASE_PATH || '/';


module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: BASE_PATH,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
              cacheDirectory: true,
              plugins: ['@babel/plugin-transform-runtime']
          }
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // {
      //   test: /\.css$/,
      //   loaders: ['style-loader', 'css-loader'],
      // }
    ],
  },
  resolve: {
    extensions: ["*", '.tsx', '.ts', ".js", ".jsx"],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
