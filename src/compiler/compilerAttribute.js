import Watcher from "../watcher.js"

export default function compilerAttribute (node, vm) {
  const attrs = Array.from(node.attributes)
  for (let attr of attrs) {
    const { name, value } = attr
    if (name.match(/v-on:click/)) {
      compilerVOn(node, value, vm)
    } else if (name.match(/v-bind/)) {
      compilerVBind(node, name, value, vm)
    } else if (name.match(/v-model/)) {
      compilerVModel(node, value, vm)
    }
  }

}

/**
 * @description: v-click 原理
 * @param {*} node
 * @param {*} method
 * @param {*} vm
 * @return {*}
 * @author: alan
 */
function compilerVOn (node, method, vm) {
  node.addEventListener("click", function (...args) {
    vm.$options.methods[method].apply(vm, args)
  })
}



/**
 * @description: v-bind 原理
 * @param {*} node
 * @param {*} method
 * @param {*} vm
 * @return {*}
 * @author: alan
 */
function compilerVBind (node, attrName, attrValue, vm) {
  node.removeAttribute(attrName)
  attrName = attrName.replace(/v-bind:/, '')
  function cb () {
    node.textContent = vm[attrValue]
    node.setAttribute(attrName, vm[attrValue])
  }
  new Watcher(cb)
}


/**
 * @description: v-model 原理
 * @param {*} node
 * @param {*} method
 * @param {*} vm
 * @return {*}
 * @author: alan
 */
function compilerVModel (node, key, vm) {
  let { type, tagName } = node
  tagName = tagName.toLowerCase()
  if (tagName === 'input' && type === 'text') {
    node.value = vm[key]
    node.addEventListener("input", function () {
      vm[key] = node.value
    })
  } else if (tagName === 'input' && type === 'checkbox') {
    node.checked = vm[key]
    node.addEventListener("change", function () {
      vm[key] = node.checked
    })
  } else if (tagName === 'select') {
    node.value = vm[key]
    node.addEventListener("change", function () {
      vm[key] = node.value
    })
  }
}