const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlwebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')
const vueLoaderPlugin= require('vue-loader/dist/plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.jsx', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'source-map',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    // webpack5 assets 全局
    // assetModuleFilename:'img/[name].[hash:4][ext]'
  },
  target: 'web',
  devServer: {
    hot: true,
    hotOnly: true, // 组件互不干扰
    port: 4000,
    open: false,
    compress: true, // 压缩资源
    // historyApiFallback: true, // 解决刷新404
    // publicPath: '/lg',
    // contentBase: path.resolve(__dirname, 'public'),
    // watchContentBase: true,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
    new CleanWebpackPlugin(),
    new htmlwebpackPlugin({
      title: 'html-webpack-plugin',
      template: './public/index.html',
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
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
    new vueLoaderPlugin()
  ],
}

/**
 * [ext]: 扩展名
 * [name]: 文件名
 * [hash]: 文件内容
 * [contenthash]:
 * [hash:<length>]
 * [path]
 */
