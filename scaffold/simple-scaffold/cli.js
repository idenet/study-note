/**
 * node cli 引用入口文件必须要有这个的文件头
 * 如果是linux 或者macos系统下还需要修改此文件的读写权限为755
 * 具体通过chmod 755 cli.js实现修改
 */

/**
 * 1. t通过命令交互询问用户问题
 * 2. 根据用户会打结果生成文件
 * 
 */
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs');

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?'
  }
]).then(answers => {
  const tmpdir = path.join(__dirname, 'templates')
  const destDir = process.cwd()

  // 奖模板下的文件全部替换到目标目录
  fs.readdir(tmpdir, (err, file) => {
    if (err) throw err
    file.forEach(v => {
      ejs.renderFile(path.join(tmpdir, v), answers, (err, result) => {
        if (err) throw err
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})