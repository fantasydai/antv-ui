import Vue from 'vue'
import ActionSheetComponent from './ActionSheet.vue'

const defaultprops = {
    options: [],
    cancelButtonIndex: '',
    destructiveButtonIndex: '',
    title: '',
    message: '',
    maskClosable: ''
}

const ActionSheetConstructor = Vue.extend(ActionSheetComponent)

const ActionSheetQueue = []

const init = (propsData)=>{
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

  const ActionSheet = {
    showActionSheet(props={}){
        let lastOptions = Object.assign({}, defaultPorps, options)
        let actionSheet
    }
  }