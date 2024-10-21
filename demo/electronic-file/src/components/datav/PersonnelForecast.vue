<template>
    <div ref="chart" style="width: 100%; height: 300px;"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data () {
    return {
      chart: null,
      data: [],
      data2: [],
      now: new Date(),
      now2: new Date(),
      oneDay: 3600 * 1000,
      oneHour: 3600 * 1000,
      value: 100,
      value2: 60,
      numbers: [-10, -5, 0, 5, 10],
      numbers2: [-8, -4, 0, 4, 8]
    }
  },
  methods: {
    randomData () {
      this.now = new Date(+this.now + this.oneHour)
      var randomIndex = Math.floor(Math.random() * this.numbers.length)
      this.value = this.value + this.numbers[randomIndex]
      return {
        name: this.now.toString(),
        value: [
          [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/') + ' ' + this.now.getHours() + ':00',
          Math.round(this.value)
        ]
      }
    },
    randomData2 () { // 新的随机数据生成方法
      this.now2 = new Date(+this.now2 + this.oneHour)
      var randomIndex = Math.floor(Math.random() * this.numbers2.length)
      this.value2 = this.value2 + this.numbers2[randomIndex]
      return {
        name: this.now.toString(),
        value: [
          [this.now2.getFullYear(), this.now2.getMonth() + 1, this.now2.getDate()].join('/') + ' ' + this.now2.getHours() + ':00',
          Math.round(this.value2)
        ]
      }
    },
    initChart () {
      this.chart = echarts.init(this.$refs.chart)
      // Generate initial data
      for (let i = 0; i < 10; i++) {
        this.data.push(this.randomData())
        this.data2.push(this.randomData2())
      }
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
        series: [
          {
            name: '区域1',
            type: 'line',
            showSymbol: true,
            data: this.data,
            textStyle: {
              color: '#fff'
            }
          },
          {
            name: '区域2', // 新的折线名称
            type: 'line',
            showSymbol: true,
            data: this.data2, // 新折线的数据
            textStyle: {
              color: '#fff'
            }
          }
        ]
      }
      this.chart.setOption(option)

      // Update chart data at intervals
      this.interval1 = setInterval(() => {
        for (let i = 0; i < 1; i++) {
          this.data.shift()
          this.data.push(this.randomData())
          this.data2.shift()
          this.data2.push(this.randomData2())
        }
        // console.log(this.data2)
        this.chart.setOption({
          series: [
            {
              data: this.data
            },
            {
              data: this.data2 // 也更新新折线的数据
            }
          ]
        })
      }, 5000)
      this.interval2 = setInterval(() => {
        this.data = []
        this.data2 = []
        this.now = this.now2 = new Date()
        for (let i = 0; i < 10; i++) {
          this.data.push(this.randomData())
          this.data2.push(this.randomData2())
        }
      }, 20000)
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>

<style scoped>
/* Add any specific styles here */
</style>
