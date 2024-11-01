<template>
  <div class="bottom-charts">
    <div class="bc-chart-three-item">
      <personnel-forecast />
    </div>
    <div class="bc-chart-item">
      <div class="bcci-header">1小时后人员统计</div>
      <dv-active-ring-chart :config="config4" />
      <Label-Tag :config="labelConfig" />
    </div>

  </div>
</template>

<script>
import PersonnelForecast from './PersonnelForecast.vue'
import { store } from '@/utils/store.js'

export default {
  name: 'BottomCharts',
  components: {
    PersonnelForecast
  },
  data () {
    return {
      config4: {
        data: [
          // {
          //   name: '区域1',
          //   value: 156
          // },
          // {
          //   name: '区域2',
          //   value: 415
          // }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '65%',
        activeRadius: '70%'
      }
    }
  },
  methods: {
    updateChart (data) {
      const areaCountMap = data.reduce((acc, item) => {
        acc[item.areaName] = (acc[item.areaName] || 0) + 1
        return acc
      }, {})
      const numbers = [-1, -2, 0, 1, 2]
      var randomIndex = Math.floor(Math.random() * numbers.length)
      const numAdd = numbers[randomIndex]
      const newList = Object.keys(areaCountMap).map(areaName => ({
        name: areaName,
        value: (areaCountMap[areaName] + numAdd) < 0
          ? (areaCountMap[areaName] + numAdd + 2)
          : (areaCountMap[areaName] + numAdd)
      }))
      this.config4.data = newList
      this.config4 = { ...this.config4 }
    }
  },
  mounted () {
    setTimeout(() => {
      if (Array.isArray(store.PersonData) && store.PersonData.length > 0) {
        this.updateChart(store.PersonData)
      }
      this.intervalId = setInterval(() => {
        this.updateChart(store.PersonData)
      }, 10000)
    }, 1000) // 延迟 2 秒
  }
}
</script>

<style lang="less">
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .bc-chart-three-item{
    width: 70%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .bc-chart-item {
    width: 25%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .bcci-header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }

  .dv-active-ring-chart {
    height: calc(~"100% - 80px");
  }

  .label-tag {
    height: 30px;
  }

  .active-ring-name {
    font-size: 18px !important;
  }

  .decoration-1, .decoration-2, .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
</style>
