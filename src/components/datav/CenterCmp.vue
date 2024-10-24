<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width: 200px; height: 50px" />
      <!-- <div class="title">{{areaName}}分布</div> -->
      <div class="dropdown">
        <el-select v-model="value" @change="updateComponent" placeholder="选择区域">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.areaName"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <dv-decoration-1 style="width: 200px; height: 50px" />
    </div>

    <div class="cc-details">
      <!-- <person-location></person-location> -->
      <component :is="value" />
    </div>
  </div>
</template>

<script>
import LabelTag from './LabelTag'
import PersonLocation from '@/person_location_svg_components/PersonLocation.vue'
import AreaExhibition from '@/person_location_svg_components/AreaExhibition.vue'

export default {
  name: 'CenterCmp',
  components: {
    LabelTag,
    PersonLocation,
    AreaExhibition
  },
  data () {
    return {
      areaName: '大厅',
      options: [
        {
          value: 'person-location',
          areaName: '展厅'
        },
        {
          value: 'area-exhibition',
          areaName: '客厅'
        }
      ],
      value: 'person-location',
      currentComponent: null
    }
  },
  methods: {
    updateComponent (value) {
      // 根据选择的值更新当前组件
      this.currentComponent = value === 'person-location' ? 'PersonLocation' : 'area-exhibition'
    }
  }
}
</script>

<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;

  .cc-header {
    // margin-left: 70px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    .title {
      margin-left: 70px;
    }
    .dropdown {
      .el-select {
        margin-left: 50px;
        width: 200px;
        // height: 70px;
        color: #fff;
      }
    }
    // margin-bottom: 40px;
  }

  .el-input__inner {
     background-color: transparent;
     border: 1px solid #26365c;
     color: #fff;
     font-size: 30px;
     text-align: center;
  }
  .el-select .el-input__inner:focus {
    border-color: #0e2d5a;
  }

  .transparent-select:focus {
    outline: none; /* 去掉聚焦时的边框 */
  }

  .cc-details {
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;
    .choose-area {
      // text-align: left;
    }
  }
  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;

    .ccmc-middle {
      width: 50%;
      height: 90%;

      .active-ring-name {
        font-size: 20px !important;
      }
    }

    .ccmc-left,
    .ccmc-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;

      span {
        font-size: 40px;
        font-weight: bold;
      }

      .station-info {
        height: 80px;
        display: flex;
        align-items: center;
      }
    }

    .ccmc-left {
      align-items: flex-end;

      span {
        margin-left: 20px;
      }
    }

    .ccmc-right {
      align-items: flex-start;

      span {
        margin-right: 20px;
      }
    }
  }

  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
