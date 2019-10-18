/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-21 11:34:08
 * @LastEditTime: 2019-10-18 11:14:17
 * @Description: utils 工具类
 */
export default {
  /**app环境 */
  isApp() {
    const ua = navigator.userAgent
    return ua.indexOf('GameCenter/') !== -1
  },
  /**
   * 千分位格式化
   * @param {number | string} num 格式化数字
   */
  comdify(num) {
    return num.toString().replace(/\d+/, (n) => {
      return n.replace(/(\d)(?=(\d{3})+$)/g, (v) => {
        return `${v},`
      })
    })
  },
  /**
   * 倒计时
   * @param {string | number} times 剩余秒数
   * @param {function} callback 回调函数
   */
  countDown(times, callback) {
    let timer = null
    timer = setInterval(() => {
      if (times > 0) {
        let day = Math.floor(times / (60 * 60 * 24))
        let hour = Math.floor(times / (60 * 60)) - (day * 24)
        let minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60)
        let second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
        // let dayHour = (day * 24) + hour
        let hourMinute = (hour * 60) + minute
        // dayHour = `${dayHour < 10 ? '0' : ''}${dayHour}`
        hourMinute = `${hourMinute < 10 ? '0' : ''}${hourMinute}`
        day = `${day < 10 ? '0' : ''}${day}`
        hour = `${hour < 10 ? '0' : ''}${hour}`
        minute = `${minute < 10 ? '0' : ''}${minute}`
        second = `${second < 10 ? '0' : ''}${second}`
        callback(`${hourMinute}:${second}`)
        times--
      } else {
        clearInterval(timer)
        callback(false)
      }
    }, 1000)
    if (times <= 0) {
      clearInterval(timer)
      callback(false)
    }
  },
  overTime(time) {
    const a = (time % 1000).toString().substr(0, 2)
    const b = Math.floor(time / 1000)
    let m = b % 60
    m = String(m)
    m = m.length >= 2 ? m : '0' + m
    let f = Math.floor(time / (1000 * 60))
    f = String(f)
    f = f.length >= 2 ? f : '0' + f
    return f + ':' + m + '.' + a
  },
  /**
   * 将时间戳转换成格式化日期
   * @param {string | number} x 时间戳
   * @param {string} y 时间格式字符串
   */
  formatDate(x, y) {
    if (!(x instanceof Date)) {
      const date = new Date()
      date.setTime(x * 1000)
      x = date
    }
    const z = {
      y: x.getFullYear(),
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds()
    }
    sessionStorage.removeItem(z)
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, (v) => {
      return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(
        -(v.length > 2 ? v.length : 2)
      )
    })
  },
  //将日期格式转换成时间戳
  timeStamp(myDate) {
    var date = new Date(myDate)
    return date.getTime() / 1000
  },
  /**
   * 保留n位小数
   * @param {string | number} cnum 需要保留的数据
   * @param {string} cindex 保留的小数位数
   */
  toDecimal(cnum, cindex = 2) {
    const value = String(cnum)
    if (value.indexOf('.') > 0) {
      const left = value.substr(0, value.indexOf('.'))
      let right = value.substr(value.indexOf('.') + 1, value.length)
      if (right.length > cindex) {
        right = right.substr(0, cindex)
      }
      return `${left}.${right}`
    } else {
      return cnum
    }
  },
  /**加法运算 */
  accAdd(arg1, arg2) {
    let r1 = null
    let r2 = null
    let m = null
    try { r1 = arg1.toString().split('.')[1].length } catch (error) { r1 = 0 }
    try { r2 = arg2.toString().split('.')[1].length } catch (error) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  /**减法运算 */
  accSub(arg1, arg2) {
    let r1 = null
    let r2 = null
    let m = null
    let n = null
    try { r1 = arg1.toString().split('.')[1].length } catch (error) { r1 = 0 }
    try { r2 = arg2.toString().split('.')[1].length } catch (error) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  // 除法运算
  accDiv(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1 = null
    let r2 = null
    try { t1 = arg1.toString().split('.')[1].length } catch (e) { console.log() }
    try { t2 = arg2.toString().split('.')[1].length } catch (e) { console.log() }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  },
  // 乘法运算
  accMul(arg1, arg2) {
    let m = 0
    const s1 = arg1.toString()
    const s2 = arg2.toString()
    try { m += s1.split('.')[1].length } catch (e) { console.log() }
    try { m += s2.split('.')[1].length } catch (e) { console.log() }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  /**获取cookie
   * @param name cookie名
   */
  getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
    const arr = document.cookie.match(reg)
    if (arr) return decodeURI(arr[2])
    return null
  },
  /**设置cookie */
  setCookie(name, value, expiredays) {
    const exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = `${name}=${escape(value)}${expiredays == null ? '' : `;expires=${exdate.toGMTString()}`};path=/`
  },
  /**设置指定domain的cookie */
  setCookieWithDomain(name, value, domain, expiredays = 1) {
    const exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = `${name}=${escape(value)}${expiredays == null ? '' : `;expires=${exdate.toGMTString()}`};domain=${domain};path=/`
  },
  /**删除指定cookie */
  clearCookie(name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.getCookie(name)
    if (cval != null) document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`
  },
  /**删所有cookie */
  deleteCookie() {
    const keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (let i = keys.length; i >= 0; i -= 1) {
        document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`
      }
    }
  },
  /**获取url参数 */
  getQueryString(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
  },
  /* 防抖函数 */
  debounce(func, delay) {
    let timer
    return function(...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
        clearTimeout(timer)
      }, delay)
    }
  }
}
