1. 工程化
2. 解决兼容性 css js
3. 如何实现兼容
4. 倒地要兼容那些平台


1. postcss: js 转换样式的工具
2. less(less-loader) -》css -》css-loader
3. postcss-preset-env 预设--插件集合


### webpack4 打包图片
1. img src webpack5/4的区别
   1. 使用require导入图，，此时如果不配置 esModule fals，，则需.default导出
   2. 也可以在配置当中设置 esModul：：false
   3. 采用import 方式导，，此时可以直接使用xxx
2. background url

1. url-loader base64 uri 文件当。。减少请求次数
2. file-loader 将资源拷贝到目，，分开请求
3. url-loader 内部可以调用 file-loader
4. limit 

### asset module type(webpack5)
1. asset/resource ---> file-loader(输出路径)
2. asset/inline ----> url-loader
3. asset/source ---->raw-loader /不常用
4. asset(parser) ----> limit

### 插件
- 每个插件都是一个类

1. clean-webpack-plugin 清理dist
2. babel 解决es6语法
3. polyfill 解决promise
4. webpack-dev-server

### HMR热更新
