// 此文件作为蛾子generator的核心入口
// 需要导出一个继承自yeoman generator的类型
// yeoman generator在工作时会自动调用我们在此类型中定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing() {
    // yeoman 自动在生成文件阶段调用此方法
    // 我们这里尝试往项目中写入文件
    // this.fs.write(
    //   this.destinationPath('temp.txt'),
    //   Math.random().toString()
    // )

  }
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'your project name',
        default: this.appname
      }
    ]).then(answers => {
      this.answers = answers
    })
  }
}