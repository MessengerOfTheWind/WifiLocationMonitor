<template>
  <div class="container"
       @mousedown="startRotate"
       @mouseup="endRotate"
       @mouseleave="endRotate"
       @mousemove="rotateBackground">
    <div class="positioning" :style="{ transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)` }">
      <svg class="background-svg" preserveAspectRatio="xMidYMid meet">
        <image href="@/components/datav/img/firstFloor1.svg" class="img"/>
        <circle v-for="(person, index) in positions"
                :key="index"
                :cx="convertX(person.x)"
                :cy="convertY(person.y)"
                r="5"
                :fill="getColor(index)" />
      </svg>
    </div>
  </div>
</template>

<script>
import { store } from '@/utils/store.js'
export default {
  data () {
    return {
      // 初始数据
      svgWidth: 0,
      svgHeight: 0,
      realWidth: 43.168, // 实际宽度 (米)
      realHeight: 31.247, // 实际高度 (米
      isDragging: false,
      lastX: 0,
      lastY: 0,
      rotationX: 36.5, // 初始X旋转角度
      rotationY: -27, // 初始Y旋转角度
      positions: [],
      colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'magenta'] // 颜色数组
    }
  },
  methods: {
    // 获取SVG的像素大小
    setSvgDimensions () {
      const svgElement = this.$el.querySelector('.background-svg')
      if (svgElement) {
        this.svgWidth = svgElement.clientWidth
        this.svgHeight = svgElement.clientHeight
      }
    },
    // 获取颜色
    getColor (index) {
      const color = this.colors[index % this.colors.length]
      console.log('Color for index', index, 'is', color)
      return color
    },
    // 坐标转换方法
    convertX (x) {
      return (x / this.realWidth) * this.svgWidth
    },
    convertY (y) {
      return (y / this.realHeight) * this.svgHeight
    },
    // 其他方法保持不变
    // 定义一个函数，将 userXyz 转换为 positions 格式
    parsePositions (rows) {
      return rows.map(row => {
        const [x, y] = row.userXyz.split(',').map(coord => parseFloat(coord.trim()))
        return { x, y, userName: row.userName }
      })
    },
    updatePersonLocation (data) {
      // const filteredRows = data.filter(row => row.areaName === '大区域测试')
      // const positionList = this.parsePositions(filteredRows)
      const positionList = this.parsePositions(data)
      // console.log(positionList)
      this.positions = positionList
    },
    startRotate (event) {
      this.isDragging = true
      this.lastX = event.clientX
      this.lastY = event.clientY
    },
    endRotate () {
      this.isDragging = false
    },
    rotateBackground (event) {
      if (this.isDragging) {
        const deltaX = event.clientX - this.lastX
        const deltaY = event.clientY - this.lastY

        this.rotationY += deltaX * 0.5 // 调整旋转速度
        this.rotationX -= deltaY * 0.5 // 注意取负值以实现自然的上下翻转

        this.lastX = event.clientX
        this.lastY = event.clientY
      }
    }
  },
  mounted () {
    // 设置SVG像素大小
    this.setSvgDimensions()
    setTimeout(() => {
      if (Array.isArray(store.PersonData) && store.PersonData.length > 0) {
        this.updatePersonLocation(store.PersonData)
      }
      this.intervalId = setInterval(() => {
        this.updatePersonLocation(store.PersonData)
      }, 10000)
    }, 1000) // 延迟 2 秒
  },
  watch: {
    svgWidth () {
      // 确保在SVG大小变化时更新位置
      this.updatePersonLocation(store.PersonData)
    },
    svgHeight () {
      // 同上
      this.updatePersonLocation(store.PersonData)
    }
  }
}
</script>

<style lang="less">
.container {
  perspective: 1000px; /* 设置透视距离 */
  cursor: grab; /* 鼠标变为手型 */
  display: flex; /* 启用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 让容器占满视窗高度 */
}

.positioning {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 690px;
  height: 500px; /* 设置固定高度 */
  position: relative;
  transition: transform 0.1s; /* 增加过渡效果 */
}

.background-svg {
  width: 100%;
  height: 100%;
  display: block;
  .img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }
}
</style>
