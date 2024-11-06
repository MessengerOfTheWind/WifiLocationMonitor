<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div class="mh-left"></div>
        <div class="mh-middle">室内人员定位分布</div>
        <div class="mh-right">
          <dv-border-box-2
            style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;"
          >
            综合管理台
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <dv-border-box-3 class="left-chart-container">
         <person-distribute-pie />
         <person-distribute-excel />
        </dv-border-box-3>

        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-3 class="rmctc-left-container">

              <Center-Cmp />

            </dv-border-box-3>

            <div class="rmctc-right-container">
              <dv-border-box-3 class="rmctc-chart-1">

                <!-- <Right-Chart-1 /> -->
                <person-density />
              </dv-border-box-3>

              <dv-border-box-4 class="rmctc-chart-2" :reverse="true">

                <!-- <Right-Chart-2 /> -->
                <!-- <top-right-cmp /> -->
                <person-minute />
              </dv-border-box-4>
            </div>
          </div>

          <dv-border-box-4 class="rmc-bottom-container">

            <Bottom-Charts />

          </dv-border-box-4>
        </div>
      </dv-border-box-1>

    </dv-full-screen-container>
  </div>
</template>

<script>

// import LeftChart2 from './LeftChart2'
// import LeftChart3 from './LeftChart3'

import CenterCmp from './CenterCmp'
import PersonDistributePie from './PersonDistributePie.vue'
import PersonDistributeExcel from './PersonDistributeExcel.vue'
import BottomCharts from './BottomCharts'
import PersonDensity from './PersonDensity.vue'
import TopRightCmp from './TopRightCmp.vue'
import { store } from '@/utils/store.js'
import WebSocketService from '@/utils/ws.js'
import PersonMinute from './PersonMinute.vue'

export default {
  name: 'DataView',
  components: {
    CenterCmp,
    PersonDistributePie,
    PersonDistributeExcel,
    BottomCharts,
    PersonDensity,
    TopRightCmp,
    PersonMinute
  },
  // data () {
  // ,
  //   PersonMinute  return {}
  // },
  methods: {
    startDataFetchInterval (wsService) {
      this.intervalId = setInterval(() => {
        this.getPersonDistributionPieWs(wsService)
      }, 1000)
    },
    reqDataConvertThisData (data) {
      // 确保 data 是数组类型
      if (!Array.isArray(data)) {
        console.error('Expected data to be an array:', data)
        return
      }
      // console.log('1')
      // 更新 Vuex 中的数据
      store.PersonData = data
      // console.log(this.$store.state.personData)
      // console.log(store.PersonData)
    },
    getPersonDistributionPieWs (wsService) {
      if (wsService.isConnected) {
        wsService.sendMessage('给我人员列表数据')
      } else {
        console.warn('WebSocket 连接尚未建立')
      }
      // ...
      wsService.handleMessage = (data) => {
        // console.log(data);
        const response = JSON.parse(data)
        // console.log(response)
        this.reqDataConvertThisData(response.rows)
      }
    }
  },
  mounted () {
    // WebSocket 请求
    const wsService = new WebSocketService(
      'ws://120.27.111.189:7070/personDistributionDonutCWs'
    )
    // 连接 WebSocket
    wsService.connect(() => {
      // WebSocket 连接成功后立即获取一次数据
      this.getPersonDistributionPieWs(wsService)
      this.startDataFetchInterval(wsService)
    })
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg15.jpg');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
  }

  .main-container {
    height: calc(~"100% - 80px");

    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-chart-container {
    width: 22%;
    padding: 10px;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 78%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 65%;
    display: flex;
  }

  .rmctc-left-container {
    width: 65%;
  }

  .rmctc-right-container {
    width: 35%;
  }

  .rmc-bottom-container {
    height: 35%;
  }

  .rmctc-chart-1, .rmctc-chart-2 {
    height: 50%;
  }

}
</style>
