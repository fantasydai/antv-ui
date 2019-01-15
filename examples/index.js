// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './router'
import * as dui from '../src/index.js'
import VueRouter from 'vue-router'

import './index.less'

Vue.config.productionTip = false
Vue.use(dui)
Vue.use(VueRouter)

const router = new VueRouter(routes)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render (h) {
    return <router-view />
  }
})

router.beforeEach((route, redirect, next) => {
  document.title = route.meta.title || document.title
  next()
})
