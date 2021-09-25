const path = require('path');

// 工作目录
const appDir = process.cwd()

const resolveApp = (relationPath) => {
  return path.resolve(appDir, relationPath)
}

module.exports = resolveApp
