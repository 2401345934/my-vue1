import observe from "./observe.js"

/**
 * @description: 数组响应式
 * @param {*}
 * @return {*}
 * @author: alan
 */
const arrayProto = Array.prototype
const arrMethods = Object.create(arrayProto)
const methodsToPath = ['push', 'pop', 'shirt', 'splice', 'sort', 'reverse', 'unshift']
methodsToPath.forEach(method => {
  Object.defineProperty(arrMethods, method, {
    value: function (...rest) {
      const ret = arrayProto[method].apply(this, rest)
      const ob = this.__ob__
      console.log('arr  reactive()')
      let inserted
      // 获取新增元素
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = rest
          break;
        case "splice":
          inserted = rest.slice(2)
          break;
      }
      if (inserted) ob.observeArray(inserted)
      ob.dep.notify()
      return ret
    },
    configurable: true,
    writable: true,
    enumerable: false,
  })
})


export default function (arr) {
  arr.__proto__ = arrMethods
}


