<template>
  <div id="scroll-board">
    <!-- <div class="lc1-details">人员总数<span>5000</span></div> -->
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'ScrollBoard',
  data () {
    return {
      config: {
        header: ['姓名', '区域', '位置'],
        data: [
          ['黄凯', '区域1', '5'],
          ['黄凯', '区域1', '13'],
          ['黄凯', '区域1', '6'],
          ['黄凯', '区域1', '2'],
          ['黄凯', '区域1', '1'],
          ['黄凯', '区域1', '3'],
          ['黄凯', '区域1', '4'],
          ['黄凯', '区域1', '2'],
          ['黄凯', '区域1', '5']
        ],
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
