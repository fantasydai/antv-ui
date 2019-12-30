import Lazy from './lazy'

export default {

  /*
  * install function
  * @param {Vue} vue
  * @param {object} options lazyload options
  */
 install (Vue, options = {}) {
   const lazy = new Lazy(options)

   const isVue2 = Number(Vue.version.split('.')[0]) >= 2

   Vue.prototype.$LazyLoad = lazy

   if (isVue2) {
    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy),
      update: lazy.update.bind(lazy),
      componentUpdated: lazy.lazyLoadHandler.bind(lazy),
      unbind: lazy.remove.bind(lazy)
    })
   } else {
    throw new Error('not support Vue 1.x')
   }
 }
}