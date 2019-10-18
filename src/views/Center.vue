<!--
 * @Author: Siwen
 * @Date: 2019-10-15 18:10:49
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 16:48:00
 * @Description: 个人中心
 -->
<template>
  <div class="user_center">
    个人中心
    <tabbar></tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from '@/components/Tabbar.vue'

export default {
  name: 'center',
  components: {
    Tabbar
  },
  data() {
    return {
    }
  },
  mounted() {
    
  }
}
</script>
