export default function proxy (target, sourserKey, key) {
  Object.defineProperty(target, key, {
    get () {
      return target[sourserKey][key]
    },
    set (newV) {
      target[sourserKey][key] = newV
    }
  })
}