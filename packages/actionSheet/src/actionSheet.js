import Vue from 'vue'
import ActionSheetComponent from './ActionSheet.vue'

const defaultProps = {
  options: [],
  cancelButtonIndex: '',
  destructiveButtonIndex: '',
  title: '',
  message: '',
  maskClosable: true,
  visible: false
}

const ActionSheetConstructor = Vue.extend(ActionSheetComponent)

const ActionSheetQueue = []

const init = (propsData) => {
  return new ActionSheetConstructor({
    propsData,
    el: document.createElement('div')
  })
}

const getExistActionSheet = (props) => {
  let actionSheet = ActionSheetQueue[0]
  if (actionSheet.originProps) {
    for (const prop in actionSheet.originProps) {
      if (actionSheet.originProps.hasOwnProperty(prop) && actionSheet[prop]) {
        actionSheet[prop] = undefined
      }
    }
  }
  for (const prop in props) {
    actionSheet.originProps = props
    if (props.hasOwnProperty(prop)) {
      actionSheet[prop] = props[prop]
    }
  }
  return actionSheet
}

const createdActionSheet = function (options) {
  let lastOptions = Object.assign({}, defaultProps, options)
  let actionSheet
  if (ActionSheetQueue.length) {
    actionSheet = getExistActionSheet(lastOptions)
  } else {
    actionSheet = init(lastOptions)
    ActionSheetQueue.push(actionSheet)
    document.body.appendChild(actionSheet.$el)
  }
  actionSheet.visible = true
}

const ActionSheet = {
  showActionSheet (options = {}) {
    options.type = 'default'
    createdActionSheet(options)
  },
  showShareActionSheet (options = {}) {
    options.type = 'share'
    createdActionSheet(options)
  }
}

export default ActionSheet
