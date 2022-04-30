import compilerAttribute from "./compilerAttribute.js"
import compilerTextNode from "./compilerTextNode.js"

export default function compilerNode (nodes, vm) {
  for (let node of nodes) {
    if (node.nodeType === 1) {
      compilerAttribute(node, vm)
      // 编译节点的各个属性
      compilerNode(Array.from(node.childNodes), vm)
    } else if (node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)) {
      //  文本节点  解析 {{}}
      compilerTextNode(node, vm)
    }
  }
}