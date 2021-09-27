const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// 抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')
// const { webpack } = require('webpack')

const purgeCssPlugin = require('purgecss-webpack-plugin')

const CompressionPLugin = require('compress-webpack-plugin')

// 对html添加内容
const htmlwebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

const resolveApp = require('./paths')
const glob = require('glob')


module.exports = {
  mode: 'production',
  optimization: {
    usedExports:true,// 标记不使用函数，
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new copyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css'
    }),
    new purgeCssPlugin({
      paths: glob.sync(`${resolveApp('./src')}/**/*`, { nodir: true }),
      safelist: function () {
        return {
          standard: ['body', 'html']
        }
      }
    }),
    new CompressionPLugin({
      test: /\.(css|js)$/,
      minRatio: 0.8,
      threshold:0
    }),
  new InlineChunkHtmlPlugin(htmlwebpackPlugin, [/runtime.*\.js/])
    // scope hoisting // 自动的
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
}
