<!--
 * @Author: Siwen
 * @Date: 2019-10-18 10:22:28
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-18 16:48:51
 * @Description: 
 -->
<template>
  <div class="popup_picker">
    <van-popup v-model="show" :lock-scroll="false" position="bottom">
      <div class="popup_box">
        <better-scroll
          scroll-ref="popup-wrapper"
          :data="dataList"
          height="200px"
          class="wrapper">
          <div>
            <div v-for="(item, index) in dataList" :key="index" class="list_row" @click="select(item)">
              {{ item.name }}: {{ item.code }}
            </div>
          </div>
        </better-scroll>
      </div>
    </van-popup>
  </div>
</template>
  
<script>
import BetterScroll from '@/components/BetterScroll.vue'   
export default {
  name: 'popup_picker',
  components: {
    BetterScroll
  },
  props: {
    showPopup: {
      default: false,
      type: Boolean
    }
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
        { name: '美国', code: '+99' }
      ]
    }
  },
  computed: {
    show: {
      get() {
        return this.showPopup
      },
      set() {
        this.$emit('changeShow')
      }
    }
  },
  created() {},
  methods: {
    select(value) {
      this.$emit('changeShow', value)
    }
  }
}
</script>
<style lang='scss'>
.popup_picker {
  .popup_box {
    // height: 600px;
  }
}
</style>
