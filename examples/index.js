// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './router'
import * as dui from '../src/index.js'
import VueRouter from 'vue-router'
import App from './app.vue'
import Header from './components/component-title.vue'

import './index.less'

Vue.config.productionTip = false
Vue.use(dui)
Vue.use(VueRouter)

Vue.component('Header', Header)

const router = new VueRouter(routes)

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
