/**
 * 为什么需要防抖节流
 * 在一些高频率事件处罚的场景下我们不希望对应的事件处理函数多次执行
 * 场景：
 * 滚动事件
 * 输入的模糊匹配
 * 轮播图切换
 * 点击操作
 * 。。。
 * 浏览器默认情况下都会有自己的监听事件间隔（4-6ms），如果检测到多次事件的监听执行，那么久会造成不必要的资源浪费
 *
 * 
 * 防抖：对于高频率的操作来说，我们只希望一次点击，可以人为是第一次或者最后一次
 * 节流：对于高频操作，我们可以自己来设置频率，让本来会执行很多次的事件触发，按着我们定义的频率减少触发的次数
 */

/**
 *
 *
 * @author 金桔
 * @param {*} timer 时间
 * @param {*} fn  事件
 * @param {*} immediate 控制执行第一次还是最后一次  false执行最后一次
 */
function debounce(timer, fn, immediate = false) {
  if (typeof fn !== 'function') throw new Error('fn 不是一个函数')
  if (typeof timer === 'undefined') timer = 300
  if (typeof timer === 'boolean') {
    immediate = timer
    timer = 300
  }
  if (typeof immediate !== 'boolean') immediate = false
  let time = null
  return function proxy(...args) {
    let self = this
    let init = immediate && !time
    clearTimeout(time)
    time = setTimeout(() => {
      time = null
     !immediate ? fn.call(self, ...args) : null
    }, timer);
    // 如果当前传递进来的是 ture 就表示需要立即执行
    // 如果想要实现旨在第一次执行，
    init ? fn.call(self, ...args) : null
  }
}

function throttle(fn, wait) {
  if (typeof fn !== 'function') throw new Error('fn 必须是一个函数')
  if (typeof wait === 'undefined') wait = 400
  let previous = 0 // 定义变量记录上一次执行时的时间
  let timer = null // 用来管理定时器
  return function proxy(...args) {
    let self = this
    let now = new Date() // 定义变量记录当前次执行的时刻时间点
    let interval = wait - (now - previous)
    if (interval <= 0) {
      clearTimeout(timer)
      timer = null
      // 非高频词操作
      fn.call(self, ...args)
      previous = new Date()
    } else if (!timer) {
      //
      // 这试一次高频词操作
      // 定时器延时
      timer = setTimeout(() => {
        clearTimeout(timer) // 这个只是吧系统中的定时器清除了， 但是timer的值还在
        timer = null
        fn.call(self, ...args)
        previous = new Date()
      }, interval);
    }
  }
}