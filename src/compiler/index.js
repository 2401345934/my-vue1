import compilerNode from "./compilerNode.js"

export default function mount (vm) {
  let { el } = vm.$options
  el = document.querySelector(el)
  // 拿到 挂在节点的所有子节点
  compilerNode(Array.from(el.childNodes), vm)
}