const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: { /* ES6 파일을 ES5형태로 변환해서 bundle.js 를 만듦 */
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/public/js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(public)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
    ],
  },
  plugins: [ /* ES5 파일을 그대로 사용할 경우를 위해 public/js에 복사 */
    new CopyPlugin({
      patterns: [
        { from: 'src/js/index.js', to: './' },
      ],
    }),
  ],
  devServer: {
    contentBase: __dirname + '/public',
    inline: true,
    hot: true,
    host: 'localhost',
  },
};
