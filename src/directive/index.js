/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-04-24 11:33:56
 * @LastEditTime: 2019-04-24 11:34:05
 * @Description: 自定义指令
 */
import Vue from 'vue'
// 禁止输入指令
Vue.directive('enterNumber', { //只能输入正整数
  inserted: function(el) {
    el.addEventListener('keypress', function(e) {
      e = e || window.event
      const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      const re = /\d/
      if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    })
  }
})
Vue.directive('enterNumber2', { //只能输入正数(包括小数)
  inserted: function(el) {
    el.addEventListener('keypress', function(e) {
      e = e || window.event
      const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      const re = /\d/
      if (charcode === 46) {
        if (el.value.includes('.')) {
          e.preventDefault()
        }
        return
      } else if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    })
  }
})
