
module.exports = {
  mode: 'development',
  devtool: "cheap-module-source-map",
  target: 'web',
  devServer: {
    hot: 'only',// 组件互不干扰
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
}
