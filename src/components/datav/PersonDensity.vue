<template>
  <div id="ranking-board">
    <div class="ranking-board-title">人员密度分布</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
import { store } from '@/utils/store.js'

export default {
  name: 'RankingBoard',
  data () {
    return {
      config: {
        data: [],
        rowNum: 6,
        style: {
          fontSize: '30px', // 设置areaName的字体大小为30px，可以根据需要调整
          color: 'white', // 设置字体颜色为白色
          fontWeight: 'bold', // 设置字体加粗
          fontFamily: 'Avenir' // 设置字体类型
        }
      }
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
  },
  methods: {
    updateChart (data) {
      // 更新数据
      const areaCountMap = data.reduce((acc, item) => {
        acc[item.areaName] = (acc[item.areaName] || 0) + 1
        return acc
      }, {})
      const newList = Object.keys(areaCountMap).map(areaName => ({
        name: areaName,
        value: areaCountMap[areaName]
      }))
      console.log(newList)
      this.config.data = newList
      this.config = { ...this.config }
    }
  }
}
</script>

<style lang="less">
#ranking-board {
  width: 100%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;
  padding: 0px 30px;

  .ranking-board-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
    .row-item {
  font-size: 10px; /* 调整为您希望的字体大小 */
  color: white; /* 字体颜色 */
  // font-weight: bold; /* 加粗 */
  font-family: Avenir, Arial, sans-serif; /* 字体类型 */
}
  }

}
</style>
