/*
 * @Author: Siwen
 * @Date: 2019-10-17 11:48:39
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 16:51:55
 * @Description: 
 */
/*
 * @Author: Siwen
 * @Date: 2019-10-17 11:48:39
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 13:56:51
 * @Description: 
 */
/* eslint-disable no-restricted-globals */

let desginToShowRate

function setRem() {
  const html = document.querySelector('html')
  const { width, height } = html.getBoundingClientRect()
  // 判断横屏
  if (width < height) {
    // 竖屏
    html.style.fontSize = `${width / 10}px`
    desginToShowRate = width / 750
  }
  if (width > height) {
    // 横屏
    html.style.fontSize = `${height / 10}px`
    desginToShowRate = height / 750
  }
}

setRem()
window.addEventListener('resize', () => {
  setRem()
})
window.addEventListener('DOMContentLoaded', () => setRem())

export function designPxToShow(value) {
  if (isNaN(desginToShowRate)) return value
  return desginToShowRate * value
}

export function fullscreenEnable() {
  // 注意：要在用户授权全屏后才能准确获取当前的状态
  const isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.webkitIsFullScreen ||
    document.msFullscreenEnabled
  if (isFullscreen) {
    console.log('全屏模式')
  } else {
    console.log('非全屏模式')
  }
  return isFullscreen
}

export function fullscreenElement() {
  // 注意：要在用户授权全屏后才能获取全屏的元素，否则 fullscreenEle为null
  const fullscreenEle = document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement

  return fullscreenEle
}

/* 进入全屏 */
export function requestFullScreen() {
  const de = document.documentElement
  try {
    if (de.requestFullscreen) {
      de.requestFullscreen()
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen()
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen()
    }
  } catch (error) {
    console.error('enter full screen error', error)
  }
}

/* 退出全屏 */
export function exitFullscreen() {
  const isFullscreen = fullscreenEnable()
  if (!isFullscreen) return
  const de = document
  if (de.exitFullscreen) {
    de.exitFullscreen()
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen()
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen()
  }
}

