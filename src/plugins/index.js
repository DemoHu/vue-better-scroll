/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-04-24 11:35:44
 * @LastEditTime: 2019-10-18 10:24:07
 * @Description: 第三方插件载入
 */

import Vue from 'vue'
// import 'lib-flexible' //rem适配方案
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
import { Icon, Toast, Dialog, List, Loading, Tab, Tabs, Picker, Popup } from 'vant'
Vue.use(Icon)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(List)
Vue.use(Loading)
Vue.use(Tab).use(Tabs)
Vue.use(Picker)
Vue.use(Popup)

