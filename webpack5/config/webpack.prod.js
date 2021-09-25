const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// 抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')
// const { webpack } = require('webpack')



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

    // scope hoisting // 自动的
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
}
