/*
 * @Author: Siwen
 * @Date: 2019-10-15 18:10:49
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 09:59:16
 * @Description: 
 */
module.exports = {
  presets: [
      '@vue/app',
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
}