<!--
 * @Author: Siwen
 * @Date: 2019-08-26 11:36:39
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 18:35:08
 * @Description: tabbar
 -->
<template>
  <div class="tabbar">
    <div class="footer_box">
      <div
        v-for="(item, index) in routerList"
        :key="index"
        :class="{ 'item_tabbar_active':item.url == $route.path }"
        class="item_tabbar"
      >
        <router-link :to="item.url" exact>
          <i :class="[item.url === $route.path ? item.icon2 : item.icon1, item.url === $route.path ? 'active' : '']" class="iconfont"></i>
          <p class="tabbar-label" :class="{ 'active':item.url === $route.path }">{{ item.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {}
  },
  computed: {
    routerList() {
      return [
        {
          url: '/',
          name: this.$t('tabbar.home'),
          icon1: 'icon-home',
          icon2: 'icon-home-active'
        },
        {
          url: '/hold',
          name: this.$t('tabbar.hold'),
          icon1: 'icon-chicang',
          icon2: 'icon-chicang-active'
        },
        {
          url: '/entrust',
          name: this.$t('tabbar.entrust'),
          icon1: 'icon-weituo',
          icon2: 'icon-weituo-active'
        },
        {
          url: '/assets',
          name: this.$t('tabbar.assets'),
          icon1: 'icon-my',
          icon2: 'icon-my-active'
        }
      ]
    }
  }
}
</script>
<style lang='scss'>
.tabbar {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  .footer_box {
    margin: 0 auto;
    width: 100%;
    height: 55px;
    background-color: #242a40;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item_tabbar {
      color: #9ba1b5;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        .iconfont {
          font-size: 24px;
          &.active {
            color: #e5eaf8;
          }
        }
        .tabbar-label{
          font-size: 8px;
          &.active {
            color: #e5eaf8;
          }
        }
      }
    }
  }
}
</style>
