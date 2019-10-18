/*
 * @Author: Siwen
 * @Date: 2019-08-23 10:17:56
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 18:07:37
 * @Description: store
 */
import Vue from 'vue'
import Vuex from 'vuex'
process.env.NODE_ENV !== 'production' && Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: localStorage.getItem('lang'),
    login: JSON.parse((localStorage.getItem('isLogin'))) || false,
    myInfo: JSON.parse((localStorage.getItem('myInfo'))) || {
      nickName: '未登录'
    }
  },
  mutations: {
    SET_LANG(state, type) {
      localStorage.setItem('lang', type)
      state.lang = type
    },
    SET_LOGIN(state, obj) {
      localStorage.setItem('isLogin', obj)
      state.login = obj
    },
    SET_INFO(state, info) {
      localStorage.setItem('myInfo', JSON.stringify(info))
      state.myInfo = info
    }
  }
})
