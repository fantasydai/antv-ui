import Button from '../packages/button/index'
import {ListItem, List} from '../packages/list/index'
import CheckboxItem from '../packages/checkbox/index'
import CheckList from '../packages/checklist/index'
import Switch from '../packages/switch/index'
import Toast from '../packages/toast/index'

import './assets/icon/iconfont.css'

const version = '0.1.0'

const install = function (Vue) {
  if (install.installed) {
    return false
  }
  Vue.component(Button.name, Button)
  Vue.component(ListItem.name, ListItem)
  Vue.component(List.name, List)
  Vue.component(CheckboxItem.name, CheckboxItem)
  Vue.component(CheckList.name, CheckList)
  Vue.component(Switch.name, Switch)

  Vue.$Toast = Vue.prototype.$Toast = Toast
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  version,
  Button,
  ListItem
}
