const presets = [
  [
    '@babel/preset-env',
    {
      // false 不对当前的js处理做polyfill的填充
      // usage 一局用户源代码当中所使用的到的新语法进行填充
      // entry 依据我们当前删选出来的游览器决定填充什么
      useBuiltIns: 'usage',
      corejs: 3
    }
  ]
]

const plugins = []

// 依据打包模式来决定plugin的值

const isProdctuino = process.env.NOFE_ENV  === 'prodction'

if (!isProdctuino) {
  // plugins.push(['react-refresh/babel'])
}

module.exports = {
  presets,
  plugins
}
