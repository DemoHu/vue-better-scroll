/*
* @Author: Siwen
* @Date: 2019-08-02 11:23:38
 * @LastEditors: Siwen
 * @LastEditTime: 2019-08-02 16:14:44
* @Description: laya音乐管理
*/
import store from '@/store.js'
const bgMusic = require('@/assets/audio/bgmusic.mp3')

/**初始化并播放背景音乐 */
export const init = () => {
  const script = document.createElement('script')
  script.src = 'https://center.xye009.com/public/laya.core.min.js'
  script.async = 'async'
  document.body.appendChild(script)
  script.onload = () => {
    if (window.Laya) {
      window.Laya.init(0, 0)
      window.Laya.SoundManager.musicMuted = store.state.musicStatus
      window.Laya.SoundManager.setMusicVolume(0.3)
      window.Laya.SoundManager.setSoundVolume(0.3)
      window.Laya.SoundManager.playMusic(bgMusic, 0)
    }
  }
}

/**播放音效
 * @param musicUrl 音源
 * @param loops 播放次数
 */
export const playSound = (musicUrl, loops = 1) => {
  window.Laya && window.Laya.SoundManager.playSound(musicUrl, loops)
}
