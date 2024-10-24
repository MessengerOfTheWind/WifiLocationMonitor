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
      rotationX: 36.5, // 初始X旋转角度
      rotationY: -27, // 初始Y旋转角度
      positions: [
        { x: 0, y: 0 },
        { x: 300, y: 500 },
        { x: 600, y: 500 }
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
        this.rotationX -= deltaY * 0.5 // 注意取负值以实现自然的上下翻转

        this.lastX = event.clientX
        this.lastY = event.clientY
      }
    },
    convertX (x) {
      return x // 根据实际情况调整
    },
    convertY (y) {
      return y // 根据实际情况调整
    }
  }
}
</script>

<style lang="less">
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
  .img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }
}
</style>
