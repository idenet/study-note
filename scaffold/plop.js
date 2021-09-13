/**
 * plop 入口文件，导出一个函数
 * 此函数接受一个plop对象，永裕创建生成器任务
 */

module.exports = plop => {
  plop.setGenarator('component', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'MyComponent'
      }
    ],
    actions: [
      {
        type: 'add', //添加一个全新的文件
        path: 'src/components/{{name}}/{{name}}.js',
        templateFile: 'plop-template/components.hbs'
      },
      {
        type: 'add', //添加一个全新的文件
        path: 'src/components/{{name}}/{{name}}.css',
        templateFile: 'plop-template/components.css.hbs'
      }
    ]
  })
}