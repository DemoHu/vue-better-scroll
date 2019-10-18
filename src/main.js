/*
 * @Author: Siwen
 * @Date: 2019-04-28 16:22:09
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 18:30:16
 * @Description: main.js主文件
 */
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/styles/index.scss' // global css
import '@/plugins'
import '@/js/rem.js'
import '@/filters'
import '@/directive'
import i18n from '@/lang/aindex.js'
import api from '@/api'
import utils from '@/utils'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils

// 路由管理 ↓↓↓↓↓↓↓↓↓↓↓↓
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.login) {
    next()
    // next({ path: '/login' })
  } else {
    next()
  }
})
router.afterEach((to, from) => {})
// 路由管理 ↑↑↑↑↑↑↑↑↑↑↑↑
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
