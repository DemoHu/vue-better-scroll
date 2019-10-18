<!--
 * @Author: Siwen
 * @Date: 2019-08-22 13:58:38
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 17:01:19
 * @Description: 404
 -->
<template>
  <div class="wscn-http404-container">
    <h1>404</h1>
    <div class="tips">{{ message }}</div>
    <router-link to="/">返回首页</router-link>
  </div>
</template>
   
<script>
export default {
  data() {
    return {
      message: '这个页面似乎不存在...'
    }
  }
}
</script>
<style lang='scss'>
.wscn-http404-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26px;
  h1 {
    margin-top: 150px;
  }
  .tips {
    padding: 20px 0;
  }
}
</style>
