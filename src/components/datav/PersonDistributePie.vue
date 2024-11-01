<template>
  <div class="left-chart-1">
    <div class="lc1-header">人员分布</div>
    <div class="lc1-details">
      人员总数<span>{{ personNum }}</span>
    </div>
    <!-- <dv-capsule-chart class="lc1-chart" :config="config" /> -->
    <dv-charts class="lc2-chart" id="box" :option="option" />
    <dv-decoration-2 style="height: 10px" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { store } from '@/utils/store.js'

export default {
  name: 'LeftChart1',
  data () {
    return {
      chart: null,
      personNum: 0,
      option: {
        series: [
          {
            type: 'pie',
            data: [],
            radius: ['45%', '65%'],
            padding: [5, 10], // 增加内边距
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)'
            }
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b']
      }
    }
  },
  methods: {
    initializeChart () {
      this.chart = echarts.init(document.querySelector('#box'))
      this.chart.setOption(this.option)
    },
    updateChart (data) {
      const areaCountMap = data.reduce((acc, item) => {
        acc[item.areaName] = (acc[item.areaName] || 0) + 1
        return acc
      }, {})

      const newList = Object.keys(areaCountMap).map(areaName => ({
        name: areaName,
        value: areaCountMap[areaName]
      }))
      this.option.series[0].data = newList
      this.personNum = newList.reduce((sum, item) => sum + item.value, 0)
      this.chart.setOption(this.option)
    }
  },
  mounted () {
    setTimeout(() => {
      this.initializeChart()
      if (Array.isArray(store.PersonData) && store.PersonData.length > 0) {
        this.updateChart(store.PersonData)
      }
      this.intervalId = setInterval(() => {
        this.updateChart(store.PersonData)
      }, 10000)
    }, 1000) // 延迟 2 秒
  },
  beforeDestroy () {
    if (this.chart) this.chart.dispose()
  }
}
</script>

<style lang="less">
.left-chart-1 {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  .lc1-header {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .lc1-details {
    font-size: 16px;
    text-indent: 20px;
    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }
}
</style>
