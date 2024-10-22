<template>
  <div class="container"
       @mousedown="startRotate"
       @mouseup="endRotate"
       @mouseleave="endRotate"
       @mousemove="rotateBackground">
    <div class="positioning" :style="{ transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)` }">
      <svg class="background-svg" viewBox="0 0 1218.67 884.2" preserveAspectRatio="xMidYMid meet">
        <image href="./img/firstFloor.svg" width="100%" height="100%" />
        <circle v-for="(person, index) in positions"
                :key="index"
                :cx="convertX(person.x)"
                :cy="convertY(person.y)"
                r="5"
                fill="red" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDragging: false,
      lastX: 0,
      lastY: 0,
      rotationX: 0,
      rotationY: 0,
      positions: [
        { x: 0, y: 0 }, // 示例人员位置
        { x: 300, y: 500 },
        { x: 600, y: 500 }
        // 继续添加人员位置
      ]
    }
  },
  methods: {
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
        this.rotationX -= deltaY * 0.5 // 调整旋转速度，注意取负值以实现自然的上下翻转

        this.lastX = event.clientX
        this.lastY = event.clientY
      }
    },
    convertX (x) {
      // 将 x 坐标转换为 SVG 中的相应坐标
      return x // 根据实际情况调整
    },
    convertY (y) {
      // 将 y 坐标转换为 SVG 中的相应坐标
      return y // 根据实际情况调整
    }
  }
}
</script>

<style scoped>
.container {
  perspective: 1000px; /* 设置透视距离 */
  cursor: grab; /* 鼠标变为手型 */
}

.positioning {
  display: flex;
  width: 690px;
  height: 500px; /* 设置固定高度 */
  position: relative;
  transition: transform 0.1s; /* 增加过渡效果 */
}

.background-svg {
  width: 100%;
  height: 100%; /* 确保自适应 */
  display: block; /* 确保没有多余的空白 */
}
</style>
