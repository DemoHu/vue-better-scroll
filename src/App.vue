<!--
 * @Author: Siwen
 * @Date: 2019-10-15 18:10:49
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 18:04:30
 * @Description: 
 -->
<template>
  <div id="app">
    <router-view v-if="isRouterAkive" @childGetInfo="childGetInfo" />
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAkive: true
    }
  },
  created() {
    
  },
  methods: {
    /**刷新路由
     * inject: ['reload'],
     */
    reload() {
      this.isRouterAkive = false
      this.$nextTick(() => {
        this.isRouterAkive = true
      })
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        this.$api.getUserInfo().then(res => {
          this.$store.commit('SET_LOGIN', true) //更新登录状态
          this.$store.commit('SET_INFO', res) //更新登录状态
          resolve(res)
        }).catch(err => {
          this.$store.commit('SET_LOGIN', false) //更新登录状态
          this.$store.commit('SET_INFO', {
            userInfo: {
              avatar: '',
              money: '请先登录'
            }
          })
          reject(err)
        })
      })
    },
    // 子组件调用父组件方法 this.$emit('childGetInfo', {})
    childGetInfo(info) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="scss">

</style>
