function some(arr, fn) {
  let result = false
  for (const value of object) {
    result = fn(value)
    if (result) {
      break
    }
  }
  return result
}


function sum(a, b, c) {
  return a + b + c
}

let curried = curry(sum)

console.log(curried(1)(2, 3))
console.log(curried(1, 2, 3))
console.log(curried(1)(2)(3))

// function curry(func) {
//   return function curriedFn(...args) {
//     if (args.length < func.length) {
//       return function () {
//         return curriedFn(args.concat(Array.from(arguments)))
//       }
//     } 
//     return func(...args)
//   }
// }

function curry(func) {
  return function curriedFn(...args) {
    if (args.length < func.length) {
      return function () {
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }
    return  func(...args)
  }
}