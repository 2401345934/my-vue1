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
  // 设置 __ob__ 的 可枚举  防止递归爆栈
  Object.defineProperty(value, '__ob__', {
    value: this,
    //  防止递归爆栈
    enumerable: false,
    writable: true,
    configurable: true
  })
  // 把 value.__ob__ 挂一个 dep 用来收集依赖
  value.__ob__.dep = new Dep()

  // 数组
  if (Array.isArray(value)) {
    // 如果是数组 响应式 处理
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

// 监听数组的每个项
Observer.prototype.observeArray = function (arr) {
  for (let k in arr) {
    observe(k)
  }
}

export default Observer

