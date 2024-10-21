<template>
  <div id="ranking-board">
    <div class="ranking-board-title">人员密度分布</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>

export default {
  name: 'RankingBoard',
  data () {
    return {
      config: {
        data: [
          {
            name: '区域1',
            value: 55
          },
          {
            name: '区域2',
            value: 120
          },
          {
            name: '区域3',
            value: 78
          },
          {
            name: '区域4',
            value: 66
          },
          {
            name: '区域5',
            value: 80
          },
          {
            name: '区域6',
            value: 90
          },
          {
            name: '区域7',
            value: 150
          }
        ],
        rowNum: 4
      }
    }
  },
  mounted () {
    this.run() // 启动数据更新
    setInterval(this.run, 3000) // 每3秒更新一次数据
  },
  methods: {
    run () {
      // 更新数据
      for (let i = 0; i < this.data.length; ++i) {
        if (Math.random() > 0.9) {
          this.data[i] += Math.round(Math.random() * 2000)
        } else {
          this.data[i] += Math.round(Math.random() * 200)
        }
      }

      // 更新图表
      this.myChart.setOption({
        series: [
          {
            type: 'bar',
            data: this.data
          }
        ]
      })
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
  }
}
</style>
