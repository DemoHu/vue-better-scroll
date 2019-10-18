<!--
 * @Author: Siwen
 * @Date: 2019-10-18 10:52:04
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-18 16:48:26
 * @Description: 
 -->
<template>
  <div :ref="scrollRef" :style="{ 'height': height }" class="better-scroll-root">
    <div v-if="pulldown && openLoading" class="pulldown-tip">
      <span class="tip-content">{{ pulldownTip.text }}</span>
    </div>
    <slot></slot>
    <div v-if="pullup && openLoading" class="pullup-tip">
      <span class="tip-content">{{ pullupTip.text }}</span>
    </div>
  </div>
</template>
   
<script>
import BScroll from 'better-scroll'
   
export default {
  name: 'scroll',
  props: {
    scrollRef: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '300px'
    },
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 3
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 滚动方向
     */
    direction: {
      type: String,
      default: 'vertical' // 'vertical' or 'horizental'
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    openLoading: { //是否开启上拉下拉加载刷新
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    loadingUp: { //是否上拉加载
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    loadingDown: { //是否下拉刷新
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  computed: {
    pulldownTip() {
      return {
        text: this.loadingDown ? '刷新中' : ''
      }
    },
    pullupTip() {
      return {
        text: this.loadingUp ? '加载中' : '暂无更多'
      }
    }
  },
  watch: {
    data(newData, oldData) { // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      setTimeout(() => { this.refresh() }, this.refreshDelay)
    }
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  destroyed() {
    this.scroll = null
  },
  methods: {
    initScroll() {
      if (!this.$refs[this.scrollRef]) return
      this.scroll = new BScroll(this.$refs[this.scrollRef], {
        probeType: this.probeType,
        scrollX: this.direction === 'horizental',
        scrollY: this.direction === 'vertical',
        click: this.click
      })
      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.openLoading && this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('pullup', true)
          }
        })
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchEnd', pos => {
          // 下拉动作
          if (this.openLoading && pos.y > 50) {
            this.$emit('pulldown', true)
          }
        })
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>
<style lang='scss'>
  $cube-size: 10px; // 项目中用了scss，没用的话，替换掉样式中的变量即可
  .better-scroll-root {
    overflow: hidden;
    background-color: rgba(7, 17, 27, 0.7);
    .pulldown-tip {
      width: 100%;
      color: #fcfcfc;
      text-align: center;
      z-index: 1;
    }
    .pullup-tip {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #fcfcfc;
      text-align: center;
      z-index: 1;
    }
    @keyframes rotate{
      0%{
        transform:rotateX(0deg) rotateY(0deg);
      }
      50%{
        transform:rotateX(360deg) rotateY(0deg);
      }
      100%{
        transform:rotateX(360deg) rotateY(360deg);
      }
    }
  }
</style>
