
/**
 * @description: 数组响应式
 * @param {*}
 * @return {*}
 * @author: alan
 */
// 拿到 Array.prototype 的所有属性
const arrayProto = Array.prototype

const arrMethods = Object.create(arrayProto)
// 增强数组的 7个方法
const methodsToPath = ['push', 'pop', 'shirt', 'splice', 'sort', 'reverse', 'unshift']
methodsToPath.forEach(method => {
  // 监听数组的 7个方法
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

// 给数组的 __proto__ 重新设置
export default function (arr) {
  arr.__proto__ = arrMethods
}


