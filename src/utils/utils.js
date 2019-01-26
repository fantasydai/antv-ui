function isPromise (obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
function getRect (el) {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}
function deepCopy (arr) {
  var obj = arr instanceof Array ? [] : {}
  for (var item in arr) {
    if (typeof arr[item] === 'object') {
      obj[item] = deepCopy(arr[item])
    } else {
      obj[item] = arr[item]
    }
  }
  return obj
}

export {
  isPromise,
  getRect,
  deepCopy
}
