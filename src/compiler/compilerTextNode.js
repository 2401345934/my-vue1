import Watcher from "../watcher.js"
export default function compilerTextNode (node, vm) {
  const key = RegExp.$1.trim()
  function cb () {
    const value = vm[key]
    node.textContent = typeof value === 'object' ? JSON.stringify(value) : value
  }
  // 执行
  new Watcher(cb)
}