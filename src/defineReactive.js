import Dep from "./dep.js";
import observe from "./observe.js";
/**
 * @description: 实现对象的响应式 通过 defineProerty
 * @param {*} target
 * @param {*} key
 * @param {*} val
 * @return {*}
 * @author: alan
 */
function defineReactive (target, key, val) {
  const childOb = observe(val)
  const dep = new Dep()
  Object.defineProperty(target, key, {
    get () {
      // 收集依赖
      if (Dep.target) {
        dep.depend()
        // 如果有自对象 递归收集
        if (childOb) {
          childOb.dep.depend()
        }
      }
      console.log('get---------', key);
      return val
    },
    set (newV) {
      console.log('set---------', newV);
      if (newV === val) return
      val = newV
      observe(newV)
      dep.notify()

    },
  })
}


/**
 * @description: 实现 vue.set
 * @param {*} target
 * @param {*} key
 * @param {*} val
 * @return {*}
 * @author: alan
 */
export function set (target, key, val) {
  defineReactive(target, key, val)
}

export default defineReactive