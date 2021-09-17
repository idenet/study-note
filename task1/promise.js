/*
1. Promise就是一个累，在执行这个类的时候，需要传递一个执行器进去 执行器会立即执行
2. Promise有三种状态，分别为 fulfilled  reject pending
3. pending -> fulfilled
   pending -> reject
    一旦状态确定就不可更改
4. resolve : fulfilled
   reject : reject
5. then方法内部做的事情就是调用成功和失败方法
6. then成功和失败会有参数
*/

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    // this指向
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  status = PENDING
  value = undefined
  reason = undefined

  successCallback = []
  failCallback = []

  resolve = value => {
    if(this.status != PENDING) return
    // 将状态改成成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在
    // this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) {
      this.successCallback.shift()()
    }
  }

  reject = reason => {
    if(this.status != PENDING) return
    this.status = REJECTED
    //保存失败之后的原因
    this.reason = reason
    // this.failCallback && this.failCallback(this.reason)
    while (this.failCallback.length) {
      this.failCallback.shift()()
    }
  }

  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => {
      throw reason
    }
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status == FULFILLED) {
        // 异步执行 获取promise2
        setTimeout(() => {
         try {
          let x = successCallback(this.value)
          resolvePromise(promise2, x, resolve, reject)
         } catch (error) {
           reject(e) 
         }
        }, 0);
      }else if(this.status == REJECTED) {
        setTimeout(() => {
          try {
           let x = failCallback(this.reason)
           resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(e) 
          }
         }, 0);
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
             let x = successCallback(this.value)
             resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(e) 
            }
           }, 0);
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
             let x = failCallback(this.reason)
             resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(e) 
            }
           }, 0);
        })
      }
    })
    return promise2
  }

  finally(callback) {
    return this.then((value) => {
      return MyPromise.resolve(callback()).then(() => value)
      // callback()
      // return value
    }, (reason) => {
      return MyPromise.resolve(callback()).then(() => reason)
    })
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  static all(array) {
    let result = []
    let index = 0

    return new Promise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        if (index == array.length) {
          resolve(result)
        }
      }
  
      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          addData(i, array[i])
        }
      }
      resolve(result)
    })
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  if (x instanceof MyPromise) {
    // promise对象
    // x.then(value => resolve(value), reason => reject(value))
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}