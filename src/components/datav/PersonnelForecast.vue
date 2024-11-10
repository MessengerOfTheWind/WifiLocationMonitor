<template>
    <div ref="chart" style="width: 100%; height: 300px;"></div>
</template>

<script>
import * as echarts from 'echarts'
import { store } from '@/utils/store.js'

export default {
  data () {
    return {
      chart: null,
      groupedData: {},
      initData: [],
      areaData: [],
      areaCountMap: {},
      nowtime: {},
      oneDay: 3600 * 1000,
      oneHour: 3600 * 1000,
      oneSecond: 1000,
      numbers: [-1, -2, 0, 1, 2]
    }
  },
  methods: {
    randomData (areaName) {
      this.nowtime[areaName] = new Date(+this.nowtime[areaName] + this.oneSecond)
      var randomIndex = Math.floor(Math.random() * this.numbers.length)
      this.areaCountMap[areaName] = this.areaCountMap[areaName] + this.numbers[randomIndex]
      if (this.areaCountMap[areaName] < 0) {
        this.areaCountMap[areaName] += 2
      }
      const now = this.nowtime[areaName]
      return {
        name: this.nowtime[areaName].toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
          // [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') + now.getMinutes() + ':' + now.getSeconds(),
          Math.round(this.areaCountMap[areaName])
        ]
      }
    },
    initChart () {
      // 把得到的数据变成name和value的list
      this.areaCountMap = this.initData.reduce((acc, item) => {
        acc[item.areaName] = (acc[item.areaName] || 0) + 1
        return acc
      }, {})

      const newList = Object.keys(this.areaCountMap).map(areaName => ({
        areaName: areaName,
        value: this.areaCountMap[areaName]
      }))
      this.areaData = newList
      // 初始化每个区域的预测人数
      const tNow = new Date()
      this.areaData.forEach(item => {
        const areaName = item.areaName
        if (!this.groupedData[areaName]) {
          this.groupedData[areaName] = []
        }
        // 初始化时间
        this.nowtime[areaName] = new Date(tNow)
        // console.log(this.nowtime[areaName])
      })
      this.chart = echarts.init(this.$refs.chart)
      // Generate initial data
      for (let i = 0; i < 10; i++) {
        this.areaData.forEach(item => {
          const areaName = item.areaName
          this.groupedData[areaName].push(this.randomData(areaName))
        })
      }
      // 定义数据
      const colorPalette = [
        '#ff5733', '#33ff57', '#3357ff', '#ff33aa', '#aaff33',
        '#ff9933', '#33ccff', '#cc33ff', '#ffcc33', '#33ffaa',
        '#ff3333', '#33aaff', '#aa33ff', '#ff6633', '#33ffcc'
      ]
      const tSeries = Object.keys(this.groupedData).map((areaName, index) => ({
        name: areaName,
        type: 'line',
        showSymbol: true,
        data: this.groupedData[areaName],
        lineStyle: {
          color: colorPalette[index % colorPalette.length] // Cycle through colors
        },
        textStyle: {
          color: '#fff'
        }
      }))

      const option = {
        title: {
          text: '人员分布预测',
          textStyle: {
            color: '#fff',
            fontSize: 20
          },
          left: 'center'
        },
        legend: {
          top: '15%',
          textStyle: {
            color: '#fff' // 设置图例文本颜色为白色
          },
          type: 'scroll', // 启用滚动模式，适用于图例项较多的情况
          width: '80%' // 限制图例区域的宽度，超出时换行显示
        },
        tooltip: {
          trigger: 'axis'
          // formatter: (params) => {
          //   params = params[0]
          //   const date = new Date(params.name)
          //   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${params.value[1]}`
          // },
          // axisPointer: {
          //   animation: false
          // }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff', // 横坐标标签颜色
            fontSize: 10, // 横坐标标签字体大小
            formatter: (value) => {
              const date = echarts.time.format(value, '{mm}\'{ss}\'\'')
              return date
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff', // 横坐标标签颜色
            fontSize: 12 // 横坐标标签字体大小
          }
        },
        series: tSeries
      }
      this.chart.setOption(option)
      // Update chart data at intervals
      this.interval1 = setInterval(() => {
        // const currentTime = new Date() // 重置为当前时间
        for (let i = 0; i < 1; i++) {
          this.areaData.forEach(item => {
            const areaName = item.areaName
            // this.nowtime[areaName] = currentTime // 更新每个区域的时间
            this.groupedData[areaName].shift()
            this.groupedData[areaName].push(this.randomData(areaName))
          })
        }
        const newTSeries = Object.keys(this.groupedData).map((areaName, index) => ({
          data: this.groupedData[areaName]
        }))
        // console.log(this.data2)
        this.chart.setOption({
          series: newTSeries
        })
      }, 2000)
    },
    updateData () {
      this.initData = []
      this.groupedData = {}
      this.areaData = []
      this.areaCountMap = {}
      this.nowtime = {}
    }
  },
  mounted () {
    // this.initializeChart()
    setTimeout(() => {
      if (Array.isArray(store.PersonData) && store.PersonData.length > 0) {
        this.initData = store.PersonData
        this.initChart()
      }
      // 使用一个更长的间隔时间，并仅更新数据而不重启图表
      this.intervalId = setInterval(() => {
        clearInterval(this.interval1)
        this.updateData() // 用于只更新数据
        setTimeout(() => {
          this.initData = store.PersonData
          this.initChart()
        }, 2000) // 2000 毫秒等于 2 秒
      }, 15000)
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
    clearInterval(this.interval1)
  }
}
</script>

<style scoped>
/* Add any specific styles here */
</style>
