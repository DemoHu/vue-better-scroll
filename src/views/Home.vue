<!--
 * @Author: Siwen
 * @Date: 2019-10-15 18:10:49
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 18:23:12
 * @Description: 
 -->
<template>
  <div class="home">
    <trade-view ref="trade"></trade-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import TradeView from '@/components/TVChartContainer.vue'
import Tabbar from '@/components/Tabbar.vue'

export default {
  name: 'home',
  inject: ['reload'],
  components: {
    TradeView,
    Tabbar
  },
  data() {
    return {
      lang: true
    }
  },
  mounted() {
    this.$refs.trade.init('BTCUSDT', 5)
  },
  methods: {
    
  }
}
</script>
