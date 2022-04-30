import mount from "./compiler/index.js"
import { set } from "./defineReactive.js"
import initData from "./initData.js"
export default function Vue (options) {
  this._init(options)

}

Vue.prototype._init = function (options) {
  // 拿到所有的配置项 挂在 Vue 实例上
  this.$options = options
  // 处理配置项
  initData(this)

  if (this.$options.el) {
    this.$mount()
  }
}

Vue.prototype.$mount = function () {
  mount(this)
}
Vue.prototype.$set = set
