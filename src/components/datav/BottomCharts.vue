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
import LabelTag from './LabelTag'
import PersonnelForecast from './PersonnelForecast.vue'

export default {
  name: 'BottomCharts',
  components: {
    LabelTag,
    PersonnelForecast
  },
  data () {
    return {
      config4: {
        data: [
          {
            name: '区域1',
            value: 156
          },
          {
            name: '区域2',
            value: 415
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '65%',
        activeRadius: '70%'
      },

      labelConfig: {
        data: ['区域一', '区域二']
      }
    }
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
