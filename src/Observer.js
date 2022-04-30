import defineReactive from "./defineReactive.js"
import Dep from "./dep.js"
import observe from "./observe.js"
import protoArgument from "./protoArgument.js"
/**
 * @description: 处理响应式 数组 对象
 * @param {*} value
 * @return {*}
 * @author: alan
 */
function Observer (value) {
  Object.defineProperty(value, '__ob__', {
    value: this,
    //  防止递归爆栈
    enumerable: false,
    writable: true,
    configurable: true
  })
  value.__ob__.dep = new Dep()

  // 数组
  if (Array.isArray(value)) {
    protoArgument(value)
    this.observeArray(value)
  } else {
    // 对象
    this.walk(value)

  }
}

/**
 * @description: 循环给对象的每个元素增加响应式
 * @param {*} obj
 * @return {*}
 * @author: alan
 */
Observer.prototype.walk = function (obj) {
  for (let k in obj) {
    defineReactive(obj, k, obj[k])
  }
}

Observer.prototype.observeArray = function (arr) {
  for (let k in arr) {
    observe(k)
  }
}

export default Observer

