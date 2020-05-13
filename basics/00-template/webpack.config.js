const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
        publicPath: '/public/js'
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
                      presets: ['@babel/env']
                    }
                }
            }
        ]
    },
    devServer: {
      contentBase: __dirname + '/public',
      inline: true,
      hot: true,
      host: "localhost"
    }
};
