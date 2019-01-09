import Button from './pages/button.vue'
import List from './pages/list.vue'
import Checkbox from './pages/checkbox.vue'
import Switch from './pages/switch.vue'
import Toast from './pages/toast.vue'
import Drawer from './pages/drawer.vue'
import Navbar from './pages/navbar.vue'
import Popover from './pages/popover.vue'
import Badge from './pages/badge.vue'
import PickerView from './pages/pickerView.vue'
import Modal from './pages/modal.vue'
import ActionSheet from './pages/actionSheet.vue'

export default {
  routes: [
    {
      path: '/button',
      name: 'Button',
      component: Button
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/checkbox',
      name: 'Checkbox',
      component: Checkbox
    }, {
      path: '/switch',
      name: 'Switch',
      component: Switch
    }, {
      path: '/drawer',
      name: 'Drawer',
      component: Drawer
    }, {
      path: '/navbar',
      name: 'Navbar',
      component: Navbar
    }, {
      path: '/popover',
      name: 'Popover',
      component: Popover
    }, {
      path: '/badge',
      name: 'Badge',
      component: Badge
    }, {
      path: '/pickerView',
      name: 'PickerView',
      component: PickerView
    }, {
      path: '/toast',
      name: 'Toast',
      component: Toast
    }, {
      path: '/modal',
      name: 'Modal',
      component: Modal
    }, {
      path: '/actionSheet',
      name: 'ActionSheet',
      component: ActionSheet
    }
  ]
}
