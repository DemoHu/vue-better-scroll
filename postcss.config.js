/*
 * @Author: Siwen
 * @Date: 2019-10-15 18:10:49
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 13:58:40
 * @Description: 
 */
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList:[]
    }
  }
}