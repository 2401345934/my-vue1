
/**
 * @description: 把 配置项中的 data 代理的  vue 实例上面  方便 this.xxx 访问
 * @param {*} target  vue 实例
 * @param {*} sourserKey 源头 key
 * @param {*} key  每一项的key
 * @return {*}
 * @author: alan
 */
export default function proxy (target, sourserKey, key) {
  Object.defineProperty(target, key, {
    get () {
      // 代理 当访问 this.data.xxx  直接返回 this._xxx 上面的data
      return target[sourserKey][key]
    },
    set (newV) {
      // 代理 当 更新新的值的时候   直接 赋值给 this._xxx 上面的 属性
      target[sourserKey][key] = newV
    }
  })
}