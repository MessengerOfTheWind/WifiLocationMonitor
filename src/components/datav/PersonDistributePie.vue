<template>
  <div class="left-chart-1">
    <div class="lc1-header">人员分布</div>
    <div class="lc1-details" ref="test">人员总数<span>{{personNum}}</span></div>
    <dv-capsule-chart class="lc1-chart" :config="config" />
    <dv-charts class="lc2-chart" id="box" ref="box" :option="option"/>
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
import { getPersonDistributionDonut } from '@/api/screen.js'
import * as echarts from 'echarts'

export default {
  name: 'LeftChart1',
  data () {
    return {
      chart: ' ',
      personNum: 0,
      option: {
        series: [
          {
            type: 'pie',
            data: [],
            radius: ['60%', '90%'],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              labelLineEndLength: 10,
              formatter: '{percent}%\n{name}',
              style: {
                fontSize: 13,
                fill: '#fff'
              }
            }
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b']
      }
    }
  },
  methods: {
    setEchartsOptions () { // 生成ECharts
      console.log(111)
      this.chart = echarts.init(document.querySelector('#box'))
      this.chart.setOption(this.option)
    },
    /** 查询部门列表 */
    getPersonDistributionPie () {
      this.loading = true
      getPersonDistributionDonut().then(response => {
        this.option.series[0].data = response.rows
        // 初始化人数
        this.personNum = 0
        for (let index = 0; index < response.rows.length; index++) {
          this.personNum += response.rows[index].value
        }
        this.setEchartsOptions()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  mounted () {
    // Automatically execute getPersonDistributionPie every 10 seconds
    this.getPersonDistributionPie() // Call it once immediately on load
    // debugger
    this.intervalId = setInterval(this.getPersonDistributionPie, 3000) // 10000ms = 10 seconds
  },
  beforeDestroy () {
    // Clear the interval when the component is destroyed to avoid memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style lang="less">
.left-chart-1 {
  width: 100%;
  height: 50%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc1-chart {
    flex: 1;
  }

  // .lc2-chart {
  //   height: 200px;
  // }
}
</style>
