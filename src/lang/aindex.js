/*
 * @Author: Siwen
 * @Date: 2019-10-17 17:40:02
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-18 09:43:11
 * @Description: 国际化
 */
import Vue from 'vue'
import store from '@/store'
// import { Locale } from 'vant'
// import vant-zhCN from 'vant/lib/locale/lang/zh-CN'
// Locale.use('en-US', vant-zhCN)
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zhCN from './zh-CN'
import enUS from './en-US'
const i18n = new VueI18n({
  locale: store.state.lang || 'zhCN',
  messages: {
    zhCN,
    enUS
  }
})
// this.$i18n.locale = '对应语言'
// this.$store.commit('SET_LANG', this.$i18n.locale)

export default i18n
