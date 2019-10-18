/*
 * @Author: Siwen
 * @Date: 2019-08-14 16:49:43
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 09:43:13
 * @Description: 接口中心
 */
import axios from './request'

export const getUserInfo = () => {
  return axios.post('/user/userInfo')
}
