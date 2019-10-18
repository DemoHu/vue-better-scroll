<!--
 * @Author: Siwen
 * @Date: 2019-10-17 16:47:42
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-18 17:01:34
 * @Description: 资产页面
 -->
<template>
  <div class="assets">
    <better-scroll
      scroll-ref="wrapper"
      :data="dataList"
      class="wrapper">
      <div class='list_box'>
        <div v-for="(item, index) in dataList" :key="index" class="list_row">
          {{ item.name }}: {{ item.code }}
        </div>
      </div>
    </better-scroll>
    <tabbar />
  </div>
</template>
  
<script>
import Tabbar from '@/components/Tabbar.vue'    
import BetterScroll from '@/components/BetterScroll.vue'
export default {
  name: 'assets',
  components: {
    Tabbar,
    BetterScroll
  },
  data() {
    return {
      dataList: [
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '中国', code: '+86' },
        { name: '美国', code: '+99' }
      ]
    }
  },
  created() {},
  methods: {
    
  }
}
</script>
<style lang='scss'>

</style>
