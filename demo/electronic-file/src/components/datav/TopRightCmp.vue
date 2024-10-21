<template>
  <div class="top-right-cmp">
    <div class="chart-name">
      <div class="lc1-header">区域碳排放</div>
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-charts :option="option" class="carbon-emissions" />
  </div>
</template>

<script>
import { color } from 'echarts'
export default {
  name: 'TopRightCmp',
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              name: '区域1',
              color: '#ff5ca9'
            },
            {
              name: '区域2',
              color: '#00db95'
            }
          ],
          textStyle: {
            fill: '#fff'
          },
          top: '18%'
        },
        xAxis: {
          data: [
            '10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07'
          ],
          axisLine: {
            style: {
              stroke: '#fff'
            }
          },
          axisLabel: {
            style: {
              fill: '#fff'
            },
            color: '#fff', // 横坐标标签颜色
            fontSize: 14 // 横坐标标签字体大小
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          data: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: '#fff'
            }
          },
          axisLabel: {
            style: {
              fill: '#fff'
            },
            color: '#fff', // 横坐标标签颜色
            fontSize: 14 // 横坐标标签字体大小
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 8
        },
        series: [
          {
            name: '区域1',
            data: [
              2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5
            ],
            type: 'line',
            lineStyle: {
              stroke: '#ff5ca9'
            },
            lineArea: {
              show: true,
              gradient: ['rgba(255, 92, 169, 0.6)', 'rgba(255, 92, 169, 0)']
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#ff5ca9',
                stroke: 'transparent'
              }
            }
          },
          {
            name: '区域2',
            data: [
              1.3, 2.3, 5.3, 5.3, 6.3, 5.3, 1.3
            ],
            type: 'line',
            smooth: true,
            lineArea: {
              show: true,
              gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
            },
            lineStyle: {
              lineDash: [5, 5],
              stroke: '#00db95'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#00db95',
                stroke: 'transparent'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.top-right-cmp {
  width: 100%;
  height: 100%;
  // position: relative;
  // padding: 0 50px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 0px 30px;
  // margin-top: -20px;

  .chart-name {
    position: absolute;
    // right: 70px;
    text-align: right;
    font-size: 20px;
    top: 0px;
    right: 30%;

    .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-bottom: 0px;
  }
  }
  .carbon-emissions {
    // margin-top: 50px;
    flex: 1;
    height: 100%;
    // width: 100%;
  }
}

</style>
