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
      numbers: [-1, -2, 0, 1, 2]
    }
  },
  methods: {
    randomData (areaName) {
      this.nowtime[areaName] = new Date(+this.nowtime[areaName] + this.oneHour)
      var randomIndex = Math.floor(Math.random() * this.numbers.length)
      this.areaCountMap[areaName] = this.areaCountMap[areaName] + this.numbers[randomIndex]
      if (this.areaCountMap[areaName] < 0) {
        this.areaCountMap[areaName] += 2
      }
      const now = this.nowtime[areaName]
      return {
        name: this.nowtime[areaName].toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') + ' ' + now.getHours() + ':00',
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
            fontSize: 30
          },
          left: 'center'
        },
        legend: {
          top: '15%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            params = params[0]
            const date = new Date(params.name)
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${params.value[1]}`
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff', // 横坐标标签颜色
            fontSize: 14 // 横坐标标签字体大小
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
            fontSize: 14 // 横坐标标签字体大小
          }
        },
        series: tSeries
      }
      this.chart.setOption(option)
      // Update chart data at intervals
      this.interval1 = setInterval(() => {
        for (let i = 0; i < 1; i++) {
          this.areaData.forEach(item => {
            const areaName = item.areaName
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
      }, 5000)
    }
  },
  mounted () {
    // this.initializeChart()
    setTimeout(() => {
      if (Array.isArray(store.PersonData) && store.PersonData.length > 0) {
        this.initData = store.PersonData
        this.initChart()
      }
      this.intervalId = setInterval(() => {
        this.initData = store.PersonData
        this.groupedData = {}
        this.areaData = []
        this.areaCountMap = {}
        this.nowtime = {}
        // this.chart = null
        this.initChart()
      }, 15000)
    }, 1000) // 延迟 2 秒
  }
}
</script>

<style scoped>
/* Add any specific styles here */
</style>
