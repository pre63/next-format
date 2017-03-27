// webpack.config.js
// const webpack = require('webpack')
const path = require('path')

module.exports = {
  target: 'node',
  context: path.resolve(__dirname, './src'),
  entry: {
    main: './main.js',
  },
  output: {
    path: path.join(__dirname, '/bin'),
    filename: 'program.js',
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
}
