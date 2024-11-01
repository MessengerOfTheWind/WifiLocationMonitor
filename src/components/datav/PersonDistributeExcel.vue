<template>
  <div id="scroll-board">
    <!-- <div class="lc1-details">人员总数<span>5000</span></div> -->
    <dv-scroll-board id="box" :config="config" />
  </div>
</template>

<script>
import { store } from '@/utils/store.js'

export default {
  name: 'ScrollBoard',
  data () {
    return {
      config: {
        header: ['姓名', '区域', '位置'],
        data: [],
        index: true,
        columnWidth: [40, 80, 100],
        align: ['center'],
        rowNum: 8,
        headerBGC: '#1981f6',
        headerHeight: 50,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  },
  methods: {
    updateChart (data) {
    // 清空原有数据
      const result = []
      // 遍历每个用户数据
      data.forEach(item => {
        const userName = item.userName
        const areaName = item.areaName
        const coordinates = item.userXyz.split(',')
        const xyValue = `${coordinates[0].trim()}, ${coordinates[1].trim()}`
        // 构建结果数组
        result.push([userName, areaName, xyValue])
      })
      this.config.data = result
      this.config = { ...this.config }
    // 在这里可以进一步处理 result，比如更新图表数据
    }
  },
  mounted () {
    // this.initializeChart()
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
#scroll-board {
  width: 100%;
  box-sizing: border-box;
  // margin-left: 20px;
  margin-top: 10px;
  height: 100%;
  overflow: hidden;
}
.lc1-details {
    height: 40px;
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

</style>
