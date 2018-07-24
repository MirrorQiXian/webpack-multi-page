const webpackCommon = require('./webpack.common.js')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cfg = require('./webpack.cfg.js')
const path = require('path')
module.exports = merge(webpackCommon, {
  mode: 'production', // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','postcss-loader']
        })
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', // 将 CSS 转化成 CommonJS 模块
            'sass-loader', // 将 Sass 编译成 CSS
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `${cfg.build.assetsSubDirectory}/img/[name]-[hash:7].[ext]`,
            }
          }
        ]
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: {
          loader: 'url-loader',
          options: {
            name: `${cfg.build.assetsSubDirectory}/font/[name]-[hash:7].[ext]`,
            limit: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('./dist'),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: cfg.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new ExtractTextPlugin({
      filename: `${cfg.build.assetsSubDirectory}/css/[name].css`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
  ]
})