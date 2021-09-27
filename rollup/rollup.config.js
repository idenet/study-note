import json from 'rollup-plugin-json' // 打包json
import resolve from 'rollup-plugin-node-resolve' // 打包node模块
import commonJS from 'rollup-plugin-commonjs'

export default {
  input: ['src/index.js', 'src/album.js'],
  output: {
    file: 'dist',
    format: 'amd',
  },
  // plugins: [json(), resolve()],
}
