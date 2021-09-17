const tods = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  [Symbol.iterator]: function () {
    const all = [...this.life, ...this.learn]
    let index = 0
    return {
      next: function () {
        return {
          value: all[index],
          done: index++ >= all.length
        }
      }
    }
  }
}


for (const iterator of tods) {
  console.log(iterator);
}