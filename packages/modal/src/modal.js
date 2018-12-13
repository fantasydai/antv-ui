import Vue from 'vue'
import ModalComponent from './Modal.vue'

const CONFIRM_DEFAULT_TEXT = '确定'
const CANCEL_DEFAULT_TEXT = '取消'

let defaultPorps = {
  title: '提示',
  message: '',
  visible: false,
  closable: false,
  maskClosable: false,
  transparent: false,
  footer: [{text: '我知道了', onPress: function () { this.visible = false }}],
  onClose: () => {}
}

const AlertModalConstructor = Vue.extend(ModalComponent)

const modalQueue = []

const init = (constructor, props) => {
  if (constructor) {
    return new constructor({
      ...props
    }).$mount(document.createElement('div'))
  }
}

const Modal = {
  alert (options = {}) {
    const modal = init(AlertModalConstructor, defaultPorps)
    document.body.appendChild(modal.$el)
    modal.visible = true
  }
}

export default Modal
