
let docStyle = document.documentElement.style || document.body.style
let browserEngine
let translate3d = false

if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
  browserEngine = 'presto'
} else if ('MozAppearance' in docStyle) {
  browserEngine = 'gecko'
} else if ('WebkitAppearance' in docStyle) {
  browserEngine = 'webkit'
} else if (typeof navigator.cpuClass === 'string') {
  browserEngine = 'trident'
}

let stylePrefix = { trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-' }[browserEngine]

let vendorPrefix = { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }[browserEngine]

let helperElem = document.createElement('div')
let perspectiveProperty = vendorPrefix + 'Perspective'
let transformProperty = vendorPrefix + 'Transform'
let transformStyleName = stylePrefix + 'transform'
let transitionProperty = vendorPrefix + 'Transition'
let transitionStyleName = stylePrefix + 'transition'
let transitionEndProperty = vendorPrefix.toLowerCase() + 'TransitionEnd'

if (helperElem.style[perspectiveProperty] !== undefined) {
  translate3d = true
}

let getTranslate = function (element) {
  let result = { left: 0, top: 0 }
  if (element === null || element.style === null) return result

  let transform = element.style[transformProperty]
  let matches = transform.match(/translate(3d)?\(\s*(-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px.*\)/)
  if (matches) {
    result.left = +matches[1]
    result.top = +matches[3]
  }
  return result
}
let cancelTranslateElement = function (element) {
  if (element === null || element.style === null) return
  let transformValue = element.style[transformProperty]
  if (transformValue) {
    transformValue = transformValue.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g, '')
    element.style[transformProperty] = transformValue
  }
}
let createTranslateElement = function (element, x, y) {
  if (x === null && y === null) return

  if (element === null || element === undefined || element.style === null) return

  if (!element.style[transformProperty] && x === 0 && y === 0) return

  if (x === null || y === null) {
    let translate = getTranslate(element)
    if (x === null) {
      x = translate.left
    }
    if (y === null) {
      y = translate.top
    }
  }
  cancelTranslateElement(element)

  if (translate3d) {
    element.style[transformProperty] +=
        ' translate(' + (x ? x + 'px' : '0px') + ',' + (y ? y + 'px' : '0px') + ') translateZ(0px)'
  } else {
    element.style[transformProperty] += ' translate(' + (x ? x + 'px' : '0px') + ',' + (y ? y + 'px' : '0px') + ')'
  }
}

export default {
  transformProperty: transformProperty,
  transformStyleName: transformStyleName,
  transitionProperty: transitionProperty,
  transitionStyleName: transitionStyleName,
  transitionEndProperty: transitionEndProperty,
  getElementTranslate: getTranslate,
  translateElement: createTranslateElement,
  cancelTranslateElement: createTranslateElement
}
