
const path = require('path')
const htmlwebpackPlugin = require('html-webpack-plugin')
const resolveApp = require('./paths');
// const vueLoaderPlugin= require('vue-loader/lib/plugin')
const { merge } = require('webpack-merge')

// 添加dll
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 导入其他配置
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

// 定义对象保存base信息
const baseConfig = (isProduction) => {
  return {
    entry: {
      // './src/index.js',
      // main1: { import: './src/main1.js', dependOn: 'shared' },
      // shared: ['lodash', 'jquery']
      index: './src/index.js'
    }, // 没有报错 相对路径
    resolve: {
      extensions: ['.js', '.json', '.ts', '.jsx', '.vue'],
      alias: {
        '@': resolveApp('./src'),
      },
    },
    // 对外暴露的包 cdn
    // externals: {
    //   lodash: '_'
    // },
    output: {
      filename: 'js/[name].[contenthash:6].build.js',
      path: resolveApp('./dist'),
      // chunkFilename: 'js/chunk_[name].js'
      // publicPath: '/',
      // webpack5 assets 全局
      // assetModuleFilename:'img/[name].[hash:4][ext]'
    },
    // 优化
    optimization: {
      runtimeChunk:true,
      // chunkIds: 'deterministic',
      // 去除注释
     
      // splitChunks: {
      //   chunks: 'all' // asyc initial all
      // }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            // 'style-loader',
            isProduction ? MiniCssExtractPlugin.loader: 'style-loader',
            {
              loader: 'css-loader',
              // 在工作中找到css，往前处理
              options: {
                importLoaders: 1,
                esModule: false,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        },
        {
          test: /\.(png|svg|gif|jpe?g)$/,
          // webpack4
          // use: [{
          //   loader: 'url-loader',
          //   options: {
          //     name: 'img/[name].[hash:6].[ext]',
          //     limit: 25 * 1024
          //     // outputPath: 'img'
          //   }
          // }]
          type: 'asset',
          generator: {
            filename: 'img/[name].[hash:4][ext]',
          },
          parser: {
            dataUrlCondition: {
              maxSize: 30 * 1024,
            },
          },
        },
        {
          test: /\.(ttf|woff2?)$/,
          type: 'asset/resource',
          generator: {
            filename: 'font/[name].[hash:3][ext]',
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        // {
        //   test: /\.vue$/,
        //   use: ['vue-loader'],
        // },
        {
          test: /\.ts$/,
          use: ['ts-loader'],
        },
      ],
    },
    plugins: [
      new htmlwebpackPlugin({
        title: 'html-webpack-plugin',
        template: './public/index.html',
      }),
      // new vueLoaderPlugin()
  
      // dll 库的使用
      // new webpack.DllReferencePlugin({
      //   context: resolveApp('./'),
      //   manifest: resolveApp('./dll/react.manifest.json')
      // }),
      // new AddAssetHtmlPlugin({
      //   outputPath: 'js',
      //   filepath: resolveApp('./dll/dll_react.js')
      // })
  
      
    ],
  }
}

module.exports = (env) => {
  const isProduction = env.production

  // 一局当前的打包信息来合并配置

  process.env.NODE_ENV = isProduction ? 'production': 'development'

  const config = isProduction ? prodConfig : devConfig

  const mergeConfig = merge(baseConfig(isProduction), config)

  return  mergeConfig
}
