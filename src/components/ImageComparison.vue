<template>
  <div class="image-comparison-container" :style="{
    left: `${positionProps.left}px`,
    top: `${positionProps.top}px`,
    height: `${positionProps.height}px`,
    width: `${width}px`
  }">
    <div style="height: 100%; width: 100%; overflow: hidden;">
      <div class="image-wrapper" :style="{ width: `${positionProps.maxWidth}px` }">
        <img :src="props.imageUrl" alt="">
      </div>
    </div>
    <div class="handler">
      ◀ ▶
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  positionProps: {
    type: Object,
    default: () => ({
      left: 0,
      top: 0,
      height: 0,
      width: 0,
      maxWidth: 0
    })
  },
  imageUrl: String
})

watch(props.positionProps, (newVal) => {
  width.value = newVal.width
})

const positionProps = props.positionProps

const width = ref(positionProps.width)

const moveHandler = (e) => {
  const newWidth = e.clientX - positionProps.left
  if (newWidth < 0) {
    width.value = 0
  } else if (newWidth > positionProps.maxWidth) {
    width.value = positionProps.maxWidth
  } else {
    width.value = newWidth
  }
}

const handlerOperate = e => {
  e.preventDefault()
  window.addEventListener('mousemove', moveHandler)
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', moveHandler)
  })
}

onMounted(() => {
  const handler = document.querySelector('.handler')

  handler.addEventListener('mousedown', handlerOperate)
})

onUnmounted(() => {
  const handler = document.querySelector('.handler')

  handler.removeEventListener('mousedown', handlerOperate)
})
</script>

<style scoped>
.image-comparison-container {
  position: absolute;
  z-index: 2;
}

.image-comparison-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: -1px;
  height: 100%;
  width: 2px;
  background: white;

}

.image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.handler {
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  font-size: 8px;
  line-height: 20px;
  text-align: center;
  color: white;
  background: var(--system-bg);
  cursor: e-resize;
  z-index: 1;
}
</style>