<template>
  <div class="editor-container">
    <div v-show="hasUploaded" class="preview-box">
      <img id="editorImg" src="@/assets/login.jpg" alt="preview" />
      <canvas ref="maskCanvas" style="position: absolute; opacity: 0.5"></canvas>
    </div>
    <el-upload v-show="!hasUploaded" :http-request="customUpload" class="upload-demo" drag multiple>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import Drawer from '@/utils/drawLine'

import { uploadImg } from '@/api'

const maskCanvas = ref(null)

const hasUploaded = reactive(false)

onMounted(() => {
  const canvas = maskCanvas.value
  const img = document.getElementById('editorImg')
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
  }

  const drawer = new Drawer(canvas.getContext('2d'))

  canvas.addEventListener('mousedown', (e) => {
    drawer.beginDraw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  })

  canvas.addEventListener('mousemove', (e) => {
    drawer.drawing(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  })

  canvas.addEventListener('mouseup', () => {
    drawer.endDraw()
  })
})

const customUpload = ({ file }) => {
  const form = new FormData()
  form.append('file', file)
  form.append('filename', file.name)

  uploadImg(form)
}
</script>

<style scoped>
.editor-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  user-select: none;
}

.preview-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* background-color: white; */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
  background-position: top;
}

.preview-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
}
</style>
