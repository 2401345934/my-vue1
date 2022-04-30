import compilerAttribute from "./compilerAttribute.js"
import compilerTextNode from "./compilerTextNode.js"

export default function compilerNode (nodes, vm) {
  // 处理所有节点
  for (let node of nodes) {
    // 元素节点
    if (node.nodeType === 1) {
      // 编译节点的各个属性
      compilerAttribute(node, vm)
      //  递归
      compilerNode(Array.from(node.childNodes), vm)
    } else if (node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)) {
      //  文本节点  解析 {{}}
      compilerTextNode(node, vm)
    }
  }
}