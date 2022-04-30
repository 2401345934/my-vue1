import compilerNode from "./compilerNode.js"

export default function mount (vm) {
  let { el } = vm.$options
  el = document.querySelector(el)
  compilerNode(Array.from(el.childNodes), vm)
}