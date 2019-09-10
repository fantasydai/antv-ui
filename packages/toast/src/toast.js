/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-10 19:04:28
 * @LastEditTime: 2019-09-10 19:04:28
 * @LastEditors: your name
 */
import Vue from 'vue'
import toastVue from './toast.vue'

const ToastConstructor = Vue.extend(toastVue)

let toastList = []

const removeToast = e => {
  e.target.parentNode && e.target.parentNode.removeChild(e.target)
}

ToastConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeToast)
  toastList = toastList.filter(toast => {
    return toast
  })
}

ToastConstructor.prototype.hide = function () {
  this.close()
}

const _init = () => {
  if (toastList.length) {
    let toast = toastList[0]
    toastList.splice(0, 1)
    return toast
  }
  return new ToastConstructor({
    el: document.createElement('div')
  })
}

const Toast = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }
  let duration = options.duration === undefined ? 2000 : options.duration

  let toast = _init()
  toastList.push(toast)
  clearTimeout(toast.timer)
  toast.content = options.content || ''
  toast.position = options.position || 'middle'
  toast.icon = options.icon || ''
  toast.image = options.image || ''
  toast.mask = options.mask === undefined ? true : options.mask

  document.body.appendChild(toast.$el)
  toast.visible = true
  if (duration > 0) {
    toast.timer = setTimeout(() => {
      toast.close()
    }, duration)
  }
  return toast
}
export default Toast
