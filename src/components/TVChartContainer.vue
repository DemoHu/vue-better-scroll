<!--
 * @Author: Siwen
 * @Date: 2019-10-15 10:39:18
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 14:49:55
 * @Description: 
 -->
<template>
  <div :id="containerId" class="TVChartContainer"></div>
</template>

<script>
import { widget } from '../charting_library.min.js'
import Socket from './TradeView/datafeeds/socket.js'
import Datafeeds from './/TradeView/datafeeds/datafees.js'
export default {
  props: {
    containerId: {
      default: 'tv_chart_container',
      type: String
    }
  },
  data() {
    return {
      widget: null,
      socket: new Socket(),
      datafeeds: new Datafeeds(this),
      symbol: null,
      interval: '5',
      cacheData: {},
      lastTime: null,
      getBarTimer: null,
      isLoading: true
    }
  },
  created() {
    this.socket.doOpen()
    this.socket.on('open', () => {
      this.socket.send({ cmd: 'req', args: [`candle.M5.btcusdt}`, 440, parseInt(Date.now() / 1000)] })
    })
    this.socket.on('message', this.onMessage)
  },
  methods: {
    /* 初始化 */
    init(symbol = 'BTCUSDT', interval = '5') {
      const widgetOptions = {
        symbol: symbol,
        interval: interval,
        datafeed: this.datafeeds,
        container_id: this.containerId,
        library_path: '/charting_library/',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        loading_screen: { backgroundColor: '#202438' }, //加载背景色
        // drawings_access: { type: 'white', tools: [{ name: 'Regression Trend' }] },
        widget_bar: {
          'datawindow': false,
          'details': false,
          'watchlist': false,
          'watchlist_settings': { 'default_symbols': [] }
        },
        disabled_features: this.disabled_features(),
        overrides: this.overrides(),
        custom_css_url: './css/tradingview_black.css',
        enabled_features: ['hide_last_na_study_output'], // 关闭成交量的n/a
        fullscreen: false,
        // timeframe: '0.5m',
        timezone: 'Asia/Shanghai',
        locale: 'zh',
        debug: false,
        // preset: 'mobile',
        width: '100%',
        height: 300
      }
      this.$nextTick(() => {
        if (!this.widget) {
          this.widget = new widget(widgetOptions)
          this.onChartReady()
          this.symbol = symbol
          this.interval = interval
        }
      })
    },
    sendMessage(data) {
      if (this.socket.checkOpen()) {
        this.socket.send(data)
      } else {
        this.socket.on('open', () => {
          this.socket.send(data)
        })
      }
    },
    unSubscribe(interval) {
      if (interval < 60) {
        this.sendMessage({ cmd: 'unsub', args: [`candle.M${interval}.${this.symbol.toLowerCase()}`, 440, parseInt(Date.now() / 1000)] })
      } else if (interval >= 60) {
        this.sendMessage({ cmd: 'unsub', args: [`candle.H${interval / 60}.${this.symbol.toLowerCase()}`, 440, parseInt(Date.now() / 1000)] })
      } else {
        this.sendMessage({ cmd: 'unsub', args: [`candle.D1.${this.symbol.toLowerCase()}`, 207, parseInt(Date.now() / 1000)] })
      }
    },
    subscribe() {
      if (this.interval < 60) {
        this.sendMessage({ cmd: 'sub', args: [`candle.M${this.interval}.${this.symbol.toLowerCase()}`] })
      } else if (this.interval >= 60) {
        this.sendMessage({ cmd: 'sub', args: [`candle.H${this.interval / 60}.${this.symbol.toLowerCase()}`] })
      } else {
        this.sendMessage({ cmd: 'sub', args: [`candle.D1.${this.symbol.toLowerCase()}`] })
      }
    },
    onMessage(data) {
      // console.log(data)
      if (data.data && data.data.length) {
        const list = []
        const ticker = `${this.symbol}-${this.interval}`
        data.data.forEach(function(element) {
          list.push({
            time: this.interval !== 'D' || this.interval !== '1D' ? element.id * 1000 : element.id,
            open: element.open,
            high: element.high,
            low: element.low,
            close: element.close,
            volume: element.quote_vol
          })
        }, this)
        this.cacheData[ticker] = list
        this.lastTime = list[list.length - 1].time
        this.subscribe()
      }
      if (data.type && data.type.indexOf(this.symbol.toLowerCase()) !== -1) {
        // console.log(' >> sub:', data.type)
        this.datafeeds.barsUpdater.updateData()
        const ticker = `${this.symbol}-${this.interval}`
        const barsData = {
          time: data.id * 1000,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
          volume: data.quote_vol
        }
        if (barsData.time >= this.lastTime && this.cacheData[ticker] && this.cacheData[ticker].length) {
          this.cacheData[ticker][this.cacheData[ticker].length - 1] = barsData
        }
      }
    },
    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
      // console.log(' >> :', rangeStartDate, rangeEndDate)
      if (this.interval !== resolution) {
        this.unSubscribe(this.interval)
        this.interval = resolution
        if (resolution < 60) {
          this.sendMessage({ cmd: 'req', args: [`candle.M${this.interval}.${this.symbol.toLowerCase()}`, 440, parseInt(Date.now() / 1000)] })
        } else if (resolution >= 60) {
          this.sendMessage({ cmd: 'req', args: [`candle.H${this.interval / 60}.${this.symbol.toLowerCase()}`, 440, parseInt(Date.now() / 1000)] })
        } else {
          this.sendMessage({ cmd: 'req', args: [`candle.D1.${this.symbol.toLowerCase()}`, 800, parseInt(Date.now() / 100)] })
        }
      }
      const ticker = `${this.symbol}-${this.interval}`
      if (this.cacheData[ticker] && this.cacheData[ticker].length) {
        this.isLoading = false
        const newBars = []
        this.cacheData[ticker].forEach(item => {
          if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
            newBars.push(item)
          }
        })
        onLoadedCallback(newBars)
      } else {
        const self = this
        this.getBarTimer = setTimeout(() => {
          self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
        }, 10)
      }
    },


    
    /* 创建按钮 */
    onChartReady() {
      const thats = this.widget
      const studies = []
      const resolution = this.interval
      const chartType = (localStorage.getItem('tradingview.chartType') || '1') * 1
      const mas = [ //MA线
        { day: 5, color: '#821f68' }, 
        { day: 10, color: '#5c7798' }, 
        { day: 30, color: '#397d51' }
      ]
      const buttons = [ //刻度按钮
        { label: '1m', resolution: '1', chartType: 1 }, 
        { label: '5m', resolution: '5', chartType: 1 }, 
        { label: '15m', resolution: '15', chartType: 1 }, 
        { label: '1h', resolution: '60', chartType: 1 }, 
        { label: '1D', resolution: '1D', chartType: 1 }, 
        { label: '1W', resolution: '7D', chartType: 1 },
        { label: '分时', resolution: '1', chartType: 3 }
        // { label: '1M', resolution: '1M', chartType: 1 }
      ]
      this.widget.selectedIntervalButton = null
      this.widget.onChartReady(() => {
        const chart = this.widget.chart()
        mas.forEach(item => {
          const id = chart.createStudy('Moving Average', false, false, [item.day], null, { 'Plot.color': item.color })
          studies.push(id)
        })
        createButton(buttons)
        thats.chart().setChartType(chartType)
        toggleStudy(chartType)
      })
      function createButton(buttons) {
        for (var i = 0; i < buttons.length; i++) {
          (function(button) {
            const buttonDom = thats.createButton()
            buttonDom.setAttribute('title', button.label)
            buttonDom.classList.add('mydate')
            buttonDom.textContent = button.label
            buttonDom.addEventListener('click', function(e) {
              if (this.parentNode.classList.contains('active')) {
                return false
              }
              localStorage.setItem('tradingview.resolution', button.resolution)
              localStorage.setItem('tradingview.chartType', button.chartType)
              const $active = this.parentNode.parentNode.parentNode.querySelector('.active')
              $active.className = $active.className.replace(/(\sactive|active\s)/, '')
              this.parentNode.parentNode.className += ' active'
              thats.chart().setResolution(button.resolution, function onReadyCallback() {})
              if (button.chartType !== thats.chart().chartType()) {
                thats.chart().setChartType(button.chartType)
                toggleStudy(button.chartType)
              }
            })
            buttonDom.parentNode.parentNode.classList.add('my-group')
            if (button.resolution === resolution && button.chartType === chartType) {
              buttonDom.parentNode.parentNode.classList.add('active')
            }
          })(buttons[i])
        }
      }
      function toggleStudy(chartType) {
        var state = chartType === 3 ? 0 : 1
        for (var i = 0; i < studies.length; i++) {
          thats.chart().getStudyById(studies[i]).setVisible(state)
        }
      }
    },
    /* K线样式 */
    overrides() {
      const style = {
        up: '#03C087',
        down: '#E76D42',
        bg: '#202438',
        grid: '#30384f',
        cross: '#23283D',
        border: '#C5CFD5',
        lineColor: '#30384d',
        text: '#8C9FAD',
        areatop: 'rgba(71, 78, 112, 0.1)',
        areadown: 'rgba(71, 78, 112, 0.02)',
        line: '#737375'
      }
      return {
        'paneProperties.topMargin': 20,
        // 'paneProperties.bottomMargin': 1,
        'volumePaneSize': 'tiny', //成交量高度 可以的值 large medium small tiny
        'scalesProperties.lineColor': style.lineColor,
        'scalesProperties.textColor': style.text,
        'paneProperties.background': style.bg,
        'paneProperties.vertGridProperties.color': style.grid,
        'paneProperties.horzGridProperties.color': style.grid,
        'paneProperties.crossHairProperties.color': style.cross,
        'paneProperties.legendProperties.showLegend': false, //默认隐藏图例
        'paneProperties.legendProperties.showStudyArguments': true,
        'paneProperties.legendProperties.showStudyTitles': true,
        'paneProperties.legendProperties.showStudyValues': true,
        'paneProperties.legendProperties.showSeriesTitle': true,
        'paneProperties.legendProperties.showSeriesOHLC': true,
        'mainSeriesProperties.candleStyle.upColor': style.up,
        'mainSeriesProperties.candleStyle.downColor': style.down,
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': true,
        'mainSeriesProperties.candleStyle.borderColor': style.border,
        'mainSeriesProperties.candleStyle.borderUpColor': style.up,
        'mainSeriesProperties.candleStyle.borderDownColor': style.down,
        'mainSeriesProperties.candleStyle.wickUpColor': style.up,
        'mainSeriesProperties.candleStyle.wickDownColor': style.down,
        'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.hollowCandleStyle.upColor': style.up,
        'mainSeriesProperties.hollowCandleStyle.downColor': style.down,
        'mainSeriesProperties.hollowCandleStyle.drawWick': true,
        'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
        'mainSeriesProperties.hollowCandleStyle.borderColor': style.border,
        'mainSeriesProperties.hollowCandleStyle.borderUpColor': style.up,
        'mainSeriesProperties.hollowCandleStyle.borderDownColor': style.down,
        'mainSeriesProperties.hollowCandleStyle.wickColor': style.line,
        'mainSeriesProperties.haStyle.upColor': style.up,
        'mainSeriesProperties.haStyle.downColor': style.down,
        'mainSeriesProperties.haStyle.drawWick': true,
        'mainSeriesProperties.haStyle.drawBorder': true,
        'mainSeriesProperties.haStyle.borderColor': style.border,
        'mainSeriesProperties.haStyle.borderUpColor': style.up,
        'mainSeriesProperties.haStyle.borderDownColor': style.down,
        'mainSeriesProperties.haStyle.wickColor': style.border,
        'mainSeriesProperties.haStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.upColor': style.up,
        'mainSeriesProperties.barStyle.downColor': style.down,
        'mainSeriesProperties.barStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.dontDrawOpen': false,
        'mainSeriesProperties.lineStyle.color': style.border,
        'mainSeriesProperties.lineStyle.linewidth': 1,
        'mainSeriesProperties.lineStyle.priceSource': 'close',
        'mainSeriesProperties.areaStyle.color1': style.areatop,
        'mainSeriesProperties.areaStyle.color2': style.areadown,
        'mainSeriesProperties.areaStyle.linecolor': style.border,
        'mainSeriesProperties.areaStyle.linewidth': 1,
        'mainSeriesProperties.areaStyle.priceSource': 'close'
      }
    },
    /* 关闭小部件 */
    disabled_features() {
      return [
        'adaptive_logo',
        'use_localstorage_for_settings', //本地存储
        'header_indicators', //指标
        'left_toolbar', //指标
        'header_settings', //设置
        'border_around_the_chart', //边框
        'header_symbol_search', //搜索部件
        'header_saveload', //保存下载部件
        'header_interval_dialog_button', //时间单位部件
        'header_resolutions', //分时部件
        'header_chart_type', //图表类型部件
        'header_compare', //对比部件
        'header_undo_redo', //撤销部件
        'header_screenshot', //截图部件
        'timeframes_toolbar', //底部部件
        'volume_force_overlay' //成交量默认单独显示在下方
      ]
    },
    destroyed() {
      if (this.widget !== null) {
        this.widget.remove()
        this.widget = null
      }
    }
  }
}
</script>
