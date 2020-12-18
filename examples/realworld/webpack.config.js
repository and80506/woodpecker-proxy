var path = require('path')
var fs = require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var isLogEnv = process.env.BUILD_ENV === 'log'

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '',
    filename: isLogEnv ? 'bundle.log.js' : 'bundle.js',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '.'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
              ],
            },
          },
        ],
      },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.html$/, loader: 'html-loader' },
    ],
  },
  plugins: isLogEnv
    ? []
    : [
        new HtmlWebpackPlugin({
          templateParameters: {
            woodpeckerLog: fs
              .readFileSync(require.resolve('woodpecker-proxy'))
              .toString()
              .replace(/\n/g, ' ')
              .replace(/\/\*.*\*\//g, ' ')
              .replace(/\s+/g, ' ')
              .trim(),
          },
          template: 'public/index.ejs',
        }),
      ],
}
