/*
 * @Author: Siwen
 * @Date: 2019-08-23 10:38:43
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 10:07:15
 * @Description: vue配置文件
 */
'use strict'
const path = require('path')
const cdn = {
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.19.0/axios.min.js'
  ]
}
function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log('当前环境:',process.env.VUE_APP_ENV)
module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
          target: 'https://t-api.xyhj.io/v1/w/zh',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
      }
    }
  },
  configureWebpack: config => {
    config.resolve.alias["@"] = resolve("src")
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios'
      }
    } else {}
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/globalConfig.scss";
        `
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        elementUI: {
          name: 'chunk-vant', // split vant into a single package
          priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 2, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    })
  }
}