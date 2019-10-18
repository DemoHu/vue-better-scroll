/*
 * @Author: Siwen
 * @Date: 2019-10-15 18:10:49
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 17:06:58
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'
process.env.NODE_ENV !== 'production' && Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', meta: {}, component: () => import('@/views/Home.vue') },
    { path: '/hold', name: 'hold', meta: {}, component: () => import('@/views/Hold.vue') },
    { path: '/entrust', name: 'entrust', meta: {}, component: () => import('@/views/Entrust.vue') },
    { path: '/center', name: 'center', meta: {}, component: () => import('@/views/Center.vue') },
    { path: '/assets', name: 'assets', meta: {}, component: () => import('@/views/Assets.vue') },
    { path: '*', component: () => import('@/views/404.vue') }
  ]
})
