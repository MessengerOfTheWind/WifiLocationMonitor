<template>
  <div class="left-chart-1">
    <div class="lc1-header">人员分布</div>
    <div class="lc1-details" ref="test">
      人员总数<span>{{ personNum }}</span>
    </div>
    <dv-capsule-chart class="lc1-chart" :config="config" />
    <dv-charts class="lc2-chart" id="box" ref="box" :option="option" />
    <dv-decoration-2 style="height: 10px" />
  </div>
</template>

<script>
import WebSocketService from '@/utils/ws.js'
import * as echarts from 'echarts'

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
    setEchartsOptions () {
      // 生成ECharts，使用 this.$refs 获取 DOM 元素
      this.chart = echarts.init(document.querySelector('#box'))
      this.chart.setOption(this.option)
    },
    /** WebSocket获取人员列表 */
    getPersonDistributionPieWs (wsService) {
      // 等待 WebSocket 连接成功后发送消息
      if (wsService.isConnected) {
        wsService.sendMessage('给我人员列表数据')
      } else {
        console.warn('WebSocket 连接尚未建立')
      }
      // 监听 WebSocket 返回的消息
      wsService.handleMessage = (data) => {
        const response = JSON.parse(data)
        console.log(response)
        // 设置饼图的数据
        this.option.series[0].data = response.rows
        console.log(this.option.series[0].data)

        // 计算人员总数
        this.personNum = response.rows.reduce((total, item) => total + item.value, 0)

        // 更新 ECharts 图表
        this.setEchartsOptions()
      }
    }
  },

  mounted () {
    // WebSocket 请求
    const wsService = new WebSocketService(
      'ws://127.0.0.1:7070/personDistributionDonutCWs'
    )
    // 连接 WebSocket
    wsService.connect(() => {
    // WebSocket 连接成功后立即获取一次数据
      this.getPersonDistributionPieWs(wsService)
    })

    // 每10秒更新一次数据
    this.intervalId = setInterval(() => {
      this.getPersonDistributionPieWs(wsService)
    }, 1000)
  },

  beforeDestroy () {
    // 清除定时器
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
}
</style>
