const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlwebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool:false,
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
    // webpack5 assets 全局
    // assetModuleFilename:'img/[name].[hash:4][ext]'
  },
  target: 'web',
  devServer: {
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          // 在工作中找到css，往前处理
          options: {
            importLoaders: 1,
            esModule:false
          }
        }, 'postcss-loader'],
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
          filename:'img/[name].[hash:4][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024
          }
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:3][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlwebpackPlugin({
      title: 'html-webpack-plugin',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    })
  ]
}

/**
 * [ext]: 扩展名
 * [name]: 文件名
 * [hash]: 文件内容
 * [contenthash]:
 * [hash:<length>]
 * [path] 
 */