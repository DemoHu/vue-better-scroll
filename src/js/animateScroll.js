/*
 * @Author: Siwen
 * @Date: 2019-07-24 15:21:44
 * @LastEditors: Siwen
 * @LastEditTime: 2019-08-07 10:07:19
 * @Description: js函数
 */

/**
 * 函数防抖
 * @param {Function} func 执行函数
 * @param {Number} delay  间隔时间
 * @return Function
 */
export const debounce = (func, delay) => {
  let lastTime = null
  let timeout
  return function() {
    const context = this
    const now = new Date()
    if (now - lastTime - delay > 0) {
      setTimeout(() => {
        func.apply(context, arguments)
      }, delay)
    } else {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        func.apply(context, arguments)
      }, delay)
    }
    lastTime = now
  }
}
/**
 * @description: scrollView滚动动画
 * @param {NodeList | String} scrollView scroll节点
 * @param {Object} options 选项
 * @return: 
 */
export const scrollViewTo = (scrollView, options) => {
  const { y, callback } = options
  let { duration } = options
  if (duration === undefined) duration = 300
  scrollView = scrollView instanceof Object ? scrollView : document.querySelector(scrollView)
  // 创建动画
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 17)
    }
  }
  // 获取当前scrollView滚动位置
  var scrollTop = scrollView.scrollTop
  const stepCount = Math.ceil(duration / 17)
  const stepY = Math.ceil((y - scrollTop) / stepCount)
  let leftStepCount = stepCount
  // 添加动画算法
  var step = () => {
    leftStepCount--
    if (leftStepCount > 0) {
      const scrollValue = scrollView.scrollTop + stepY
      if (scrollView.scrollTo) {
        scrollView.scrollTo(0, scrollValue)
      } else {
        scrollView.scrollTop = scrollValue
      }
      requestAnimationFrame(step)
    } else {
      if (scrollView.scrollTo) {
        scrollView.scrollTo(0, y)
      } else {
        scrollView.scrollTop = y
      }
      callback && callback()
    }
  }
  step()
}
/**
 * @description: 获取是否在底部
 * @param {NodeList | String} scrollView scroll节点
 * @return: 
 */
export const getScrollisBottom = (scrollView) => {
  const scrollHeight = scrollView.scrollHeight
  const scrollTop = scrollView.scrollTop
  const clientHeight = scrollView.clientHeight
  return scrollHeight - (scrollTop + clientHeight) === 0 ? true : false
}
