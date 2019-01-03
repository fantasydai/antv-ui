import Button from './pages/button.vue'
import List from './pages/list.vue'
import Checkbox from './pages/checkbox.vue'
import Switch from './pages/switch.vue'
import Toast from './pages/toast.vue'
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
